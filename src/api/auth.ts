import request from './request'

export interface LoginResponse {
  token: string
  user: {
    id: number
    username: string
    email: string
    role: string
    permissions: string[]
  }
}

export interface RegisterResponse {
  code: number
  message: string
  data: {
    id: number
    username: string
    email: string
  }
}

export const login = (username: string, password: string) => {
  return request.post<LoginResponse>('/auth/login', { username, password })
}

export const register = (username: string, email: string, phone: string, password: string) => {
  return request.post<RegisterResponse>('/auth/register', { username, email, phone, password })
}

export const logout = () => {
  return request.post('/auth/logout')
}

export const getUserInfo = () => {
  return request.get<{ code: number; data: { user: LoginResponse['user']; menus: any[] } }>('/auth/me')
}
