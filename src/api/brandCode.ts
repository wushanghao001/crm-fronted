import request from './request'

export interface BrandCode {
  id: number
  name: string
  code: string
  status: number
  createdAt: string
  updatedAt: string
}

export interface BrandCodeListResponse {
  list: BrandCode[]
  total: number
  pageNum: number
  pageSize: number
}

export const getBrandCodes = (params: { page: number; pageSize: number; keyword?: string }) => {
  return request.get<BrandCodeListResponse>('/brand-codes', { params })
}

export const getBrandCodeById = (id: number) => {
  return request.get<BrandCode>(`/brand-codes/${id}`)
}

export const createBrandCode = (data: Omit<BrandCode, 'id' | 'createdAt' | 'updatedAt'>) => {
  return request.post<BrandCode>('/brand-codes', data)
}

export const updateBrandCode = (id: number, data: Partial<BrandCode>) => {
  return request.put<BrandCode>(`/brand-codes/${id}`, data)
}

export const deleteBrandCode = (id: number) => {
  return request.delete(`/brand-codes/${id}`)
}

export const batchDeleteBrandCodes = (ids: number[]) => {
  return request.delete('/brand-codes/batch', { data: { ids } })
}

export const checkBrandCodeExists = (code: string, excludeId?: number) => {
  const params: Record<string, any> = { code }
  if (excludeId) {
    params.excludeId = excludeId
  }
  return request.get<{ exists: boolean }>('/brand-codes/check-code', { params })
}