import axios, { type InternalAxiosRequestConfig, type AxiosResponse } from 'axios'
import { useAuthStore } from '@/stores/auth'
import { message } from '@/utils/message'

 const baseURL = '/api'
// const baseURL = 'http://localhost:8888/api'
//const baseURL = 'https://crm-backend-upuy.onrender.com/api'

const request = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
})

request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const authStore = useAuthStore()
    if (authStore.token) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${authStore.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, message: msg, data } = response.data
    if (code !== undefined) {
      if (code !== 200) {
        message.error(msg || '请求失败')
        return Promise.reject(new Error(msg))
      }
      return data
    }
    return response.data
  },
  (error) => {
    const { response } = error
    if (response) {
      const status = response.status
      if (status === 401) {
        message.error('登录已过期，请重新登录')
        const authStore = useAuthStore()
        authStore.logout()
        window.location.href = '/login'
      } else if (status === 403) {
        message.error('暂无权限访问')
      } else {
        const msg = response.data?.message || '请求失败'
        message.error(msg)
      }
    } else {
      message.error('网络请求失败')
    }
    return Promise.reject(error)
  }
)

export default request

request.getBlob = (url: string, config?: any) => {
  return axios.get(baseURL + url, {
    ...config,
    responseType: 'blob',
    headers: {
      ...config?.headers,
      'Authorization': `Bearer ${useAuthStore().token}`
    }
  })
}
