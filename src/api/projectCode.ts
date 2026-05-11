import request from './request'

export interface ProjectCode {
  id: number
  name: string
  code: string
  status: number
  createdAt: string
  updatedAt: string
}

export interface ProjectCodeListResponse {
  list: ProjectCode[]
  total: number
  pageNum: number
  pageSize: number
}

export const getProjectCodes = (params: { page: number; pageSize: number; keyword?: string }) => {
  return request.get<ProjectCodeListResponse>('/project-codes', { params })
}

export const getProjectCodeById = (id: number) => {
  return request.get<ProjectCode>(`/project-codes/${id}`)
}

export const createProjectCode = (data: Omit<ProjectCode, 'id' | 'createdAt' | 'updatedAt'>) => {
  return request.post<ProjectCode>('/project-codes', data)
}

export const updateProjectCode = (id: number, data: Partial<ProjectCode>) => {
  return request.put<ProjectCode>(`/project-codes/${id}`, data)
}

export const deleteProjectCode = (id: number) => {
  return request.delete(`/project-codes/${id}`)
}

export const batchDeleteProjectCodes = (ids: number[]) => {
  return request.delete('/project-codes/batch', { data: { ids } })
}

export const checkProjectCodeExists = (code: string, excludeId?: number) => {
  const params: Record<string, any> = { code }
  if (excludeId) {
    params.excludeId = excludeId
  }
  return request.get<{ exists: boolean }>('/project-codes/check-code', { params })
}