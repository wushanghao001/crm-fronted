import request from './request'

export interface Customer {
  id: number
  name: string
  phone: string
  email: string
  address: string
  industry: string
  scale: string
  status: string
  churnReason?: string
  customerLevel?: string
  createdAt: string
  updatedAt: string
}

export interface CustomerListResponse {
  list: Customer[]
  total: number
  page: number
  size: number
}

export interface CustomerResponse {
  id: number
  name: string
  phone: string
  email: string
  address: string
  industry: string
  scale: string
  status: string
  churnReason?: string
  customerLevel?: string
  createdAt: string
  updatedAt: string
}

export const getCustomers = (params: { pageNum: number; pageSize: number; keyword?: string; status?: string; listType?: string }) => {
  return request.get<CustomerListResponse>('/customers', { params })
}

export const getCustomerById = (id: number) => {
  return request.get<CustomerResponse>(`/customers/${id}`)
}

export const createCustomer = (data: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>) => {
  return request.post<CustomerResponse>('/customers', data)
}

export const updateCustomer = (id: number, data: Partial<Customer>) => {
  return request.put<CustomerResponse>(`/customers/${id}`, data)
}

export const deleteCustomer = (id: number) => {
  return request.delete(`/customers/${id}`)
}

export const claimCustomer = (id: number) => {
  return request.post<CustomerResponse>(`/customers/${id}/claim`)
}
