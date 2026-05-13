import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { login as apiLogin, register as apiRegister, getUserInfo, logout as apiLogout } from '@/api/auth'
import { setLoggingOut } from '@/api/request'

export interface User {
  id: number
  username: string
  email: string
  role: string
  roleId?: number
  permissions: string[]
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || '')
  const user = ref<User | null>(null)
  const isAuthenticated = computed(() => !!token.value)

  const hasPermission = (permission: string) => {
    if (!user.value) return false
    if (user.value.role === 'admin') return true
    return user.value.permissions.includes(permission)
  }

  const hasRole = (role: string) => {
    if (!user.value) return false
    return user.value.role === role
  }

  const login = async (username: string, password: string) => {
    try {
      const response = await apiLogin(username, password)
      const data = response as any
      token.value = data.token
      user.value = data.user
      localStorage.setItem('token', token.value)
      return data
    } catch (error) {
      throw error
    }
  }

  const register = async (username: string, email: string, phone: string, password: string) => {
    try {
      const response = await apiRegister(username, email, phone, password)
      return response
    } catch (error) {
      throw error
    }
  }

  const logout = async () => {
    setLoggingOut(true)
    try {
      await apiLogout()
    } catch (e) {
      console.error('Logout API error:', e)
    } finally {
      setLoggingOut(false)
    }
    token.value = ''
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const clearSession = () => {
    token.value = ''
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const loadUser = async () => {
    if (token.value) {
      try {
        const response = await getUserInfo()
        user.value = response.user
      } catch (error) {
        console.error('Failed to load user info:', error)
      }
    }
  }

  return {
    token,
    user,
    isAuthenticated,
    hasPermission,
    hasRole,
    login,
    register,
    logout,
    clearSession,
    loadUser
  }
})
