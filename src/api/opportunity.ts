import request from './request'

export interface Opportunity {
  id: number
  customerId: number
  name: string
  stage: string
  amount: number
  probability: number
  expectedCloseDate: string
  description: string
  ownerId: number
  createdAt: string
  updatedAt: string
}

export interface OpportunityListResponse {
  list: Opportunity[]
  total: number
  page: number
  size: number
}

export const getOpportunities = (params: { pageNum: number; pageSize: number; keyword?: string; stage?: string }) => {
  return request.get<OpportunityListResponse>('/opportunities', { params })
}

export const getOpportunityById = (id: number) => {
  return request.get<Opportunity>(`/opportunities/${id}`)
}

export const createOpportunity = (data: Partial<Opportunity>) => {
  return request.post<Opportunity>('/opportunities', data)
}

export const updateOpportunity = (id: number, data: Partial<Opportunity>) => {
  return request.put<Opportunity>(`/opportunities/${id}`, data)
}

export const deleteOpportunity = (id: number) => {
  return request.delete(`/opportunities/${id}`)
}

export const batchDeleteOpportunities = (ids: number[]) => {
  return request.delete('/opportunities/batch', { data: { ids } })
}