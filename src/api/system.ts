import request from '@/api/request'

export interface User {
  id: number
  username: string
  email: string
  phone: string
  role: string
  roleId: number
  permissions: string
  status: string
  createdAt: string
  updatedAt: string
}

export interface UserListResponse {
  list: User[]
  total: number
  pageNum: number
  pageSize: number
}

export const getUserList = (params: {
  pageNum?: number
  pageSize?: number
  username?: string
  role?: string
  status?: string
}) => {
  return request.get<UserListResponse>('/users', { params })
}

export const getUserById = (id: number) => {
  return request.get<User>(`/users/${id}`)
}

export const createUser = (data: {
  username: string
  email: string
  phone?: string
  role: string
  status: string
  password: string
}) => {
  return request.post<User>('/users', data)
}

export const updateUser = (id: number, data: {
  username?: string
  email?: string
  phone?: string
  role?: string
  status?: string
}) => {
  return request.put<User>(`/users/${id}`, data)
}

export const deleteUser = (id: number) => {
  return request.delete<void>(`/users/${id}`)
}

export const toggleUserStatus = (id: number, status: string) => {
  return request.put<User>(`/users/${id}`, { status })
}

export const resetPassword = (id: number, password: string) => {
  return request.put<void>(`/users/${id}/reset`, { password })
}

export const assignUserRole = (id: number, roleId: number) => {
  return request.put<{ user: User; role: Role; permissions: string[] }>(`/users/${id}/role`, { roleId })
}

export interface Role {
  id: number
  name: string
  description: string
  permissions: string
  createdAt: string
}

export interface RoleListResponse {
  list: Role[]
  total: number
  pageNum: number
  pageSize: number
}

export const getRoleList = (params: {
  pageNum?: number
  pageSize?: number
  name?: string
}) => {
  return request.get<RoleListResponse>('/roles', { params })
}

export const getAllRoles = () => {
  return request.get<Role[]>('/roles/all')
}

export const getRoleById = (id: number) => {
  return request.get<Role>(`/roles/${id}`)
}

export const createRole = (data: {
  name: string
  description?: string
  permissions?: string
}) => {
  return request.post<Role>('/roles', data)
}

export const updateRole = (id: number, data: {
  name?: string
  description?: string
  permissions?: string
}) => {
  return request.put<Role>(`/roles/${id}`, data)
}

export const deleteRole = (id: number) => {
  return request.delete<void>(`/roles/${id}`)
}

export interface PermissionTree {
  id: number
  name: string
  code: string
  type: string
  parentId: number
  children?: PermissionTree[]
}

export const getPermissionTree = () => {
  return request.get<PermissionTree[]>('/roles/permissions')
}

export const saveRolePermissions = (roleId: number, permissions: string[]) => {
  return request.put<void>(`/roles/${roleId}/permissions`, { permissions })
}

export interface OperationLog {
  id: number
  operator: string
  operatorId: string
  type: string
  content: string
  ip: string
  params: string
  result: string
  status: number
  module: string
  createdAt: string
}

export interface LogListResponse {
  list: OperationLog[]
  total: number
  pageNum: number
  pageSize: number
}

export const getLogList = (params: {
  pageNum?: number
  pageSize?: number
  operator?: string
  type?: string
  startTime?: string
  endTime?: string
}) => {
  return request.get<LogListResponse>('/logs', { params })
}

export const getLogById = (id: number) => {
  return request.get<OperationLog>(`/logs/${id}`)
}
