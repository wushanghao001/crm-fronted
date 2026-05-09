import request from './request'

export interface Interaction {
  id: number
  customerId: number
  customerName: string
  contactId: number
  contactName: string
  type: string
  content: string
  interactionTime: string
  operator: string
  status: string
  phone?: string
  email?: string
  createdAt: string
}

export interface InteractionListResponse {
  list: Interaction[]
  total: number
  page: number
  size: number
}

export interface InteractionResponse {
  id: number
  customerId: number
  customerName: string
  contactId: number
  contactName: string
  type: string
  content: string
  interactionTime: string
  operator: string
  status: string
  createdAt: string
}

export const getInteractions = (params: { page: number; size: number; keyword?: string; type?: string; operator?: string; status?: string }) => {
  return request.get<InteractionListResponse>('/interactions', { params })
}

export const getInteractionById = (id: number) => {
  return request.get<InteractionResponse>(`/interactions/${id}`)
}

export const createInteraction = (data: Omit<Interaction, 'id' | 'createdAt' | 'customerName' | 'contactName'>) => {
  return request.post<InteractionResponse>('/interactions', data)
}

export const updateInteraction = (id: number, data: Partial<Interaction>) => {
  return request.put<InteractionResponse>(`/interactions/${id}`, data)
}

export const deleteInteraction = (id: number) => {
  return request.delete(`/interactions/${id}`)
}