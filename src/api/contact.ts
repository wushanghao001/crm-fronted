import request from './request'

export interface Contact {
  id: number
  customerId: number
  customerName?: string
  name: string
  phone: string
  position: string
  email: string
  remark: string
  status?: string
  createdAt: string
}

export interface ContactListResponse {
  list: Contact[]
  total: number
  page: number
  size: number
}

export interface ContactResponse {
  id: number
  customerId: number
  customerName: string
  name: string
  phone: string
  position: string
  email: string
  remark: string
  createdAt: string
}

export const getContacts = (params: { page: number; size: number; keyword?: string }) => {
  return request.get<ContactListResponse>('/contacts', {
    params: {
      pageNum: params.page,
      pageSize: params.size,
      keyword: params.keyword
    }
  })
}

export const getContactById = (id: number) => {
  return request.get<ContactResponse>(`/contacts/${id}`)
}

export const createContact = (data: Omit<Contact, 'id' | 'createdAt'>) => {
  return request.post<ContactResponse>('/contacts', data)
}

export const updateContact = (id: number, data: Partial<Contact>) => {
  return request.put<ContactResponse>(`/contacts/${id}`, data)
}

export const deleteContact = (id: number) => {
  return request.delete(`/contacts/${id}`)
}