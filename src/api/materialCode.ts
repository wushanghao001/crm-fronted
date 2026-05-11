import request from './request'

export interface MaterialCode {
  id: number
  name: string
  code: string
  status: number
  createdAt: string
  updatedAt: string
}

export interface MaterialCodeListResponse {
  list: MaterialCode[]
  total: number
  pageNum: number
  pageSize: number
}

export const getMaterialCodes = (params: { page: number; pageSize: number; keyword?: string }) => {
  return request.get<MaterialCodeListResponse>('/material-codes', { params })
}

export const getMaterialCodeById = (id: number) => {
  return request.get<MaterialCode>(`/material-codes/${id}`)
}

export const createMaterialCode = (data: Omit<MaterialCode, 'id' | 'createdAt' | 'updatedAt'>) => {
  return request.post<MaterialCode>('/material-codes', data)
}

export const updateMaterialCode = (id: number, data: Partial<MaterialCode>) => {
  return request.put<MaterialCode>(`/material-codes/${id}`, data)
}

export const deleteMaterialCode = (id: number) => {
  return request.delete(`/material-codes/${id}`)
}

export const batchDeleteMaterialCodes = (ids: number[]) => {
  return request.delete('/material-codes/batch', { data: { ids } })
}

export const checkMaterialCodeExists = (code: string, excludeId?: number) => {
  const params: Record<string, any> = { code }
  if (excludeId) {
    params.excludeId = excludeId
  }
  return request.get<{ exists: boolean }>('/material-codes/check-code', { params })
}