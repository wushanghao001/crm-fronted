import request from './request'

export interface CustomerFollow {
  id?: number
  customerId: number
  followType: string
  followResult: string
  intentLevel: string
  content: string
  remark?: string
  nextFollowTime?: string | number
  attachment?: string
  remindFlag?: boolean
  followUserId?: number
  followUserName?: string
  createdAt?: string
  updatedAt?: string
}

export interface FollowListResponse {
  list: CustomerFollow[]
  total: number
  pageNum: number
  pageSize: number
}

export const getFollowList = (params: {
  customerId: number
  pageNum?: number
  pageSize?: number
  keyword?: string
  followType?: string
  followResult?: string
  intentLevel?: string
}) => {
  return request.get<FollowListResponse>('/customer/follow/list', { params })
}

export const getFollowDetail = (id: number) => {
  return request.get<CustomerFollow>(`/customer/follow/detail/${id}`)
}

export const createFollow = (data: Omit<CustomerFollow, 'id' | 'createdAt' | 'updatedAt'>) => {
  return request.post<CustomerFollow>('/customer/follow/create', data)
}

export const updateFollow = (id: number, data: Partial<CustomerFollow>) => {
  return request.put<CustomerFollow>(`/customer/follow/update/${id}`, data)
}

export const deleteFollow = (id: number) => {
  return request.delete<void>(`/customer/follow/delete/${id}`)
}