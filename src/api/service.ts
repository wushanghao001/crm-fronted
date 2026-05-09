import request from './request'

export interface Service {
  id?: number
  serviceNo?: string
  customerId?: number
  customerName?: string
  type?: string
  title?: string
  description?: string
  status?: string
  priority?: string
  handlerId?: number
  handlerName?: string
  createdAt?: string
  updatedAt?: string
}

export const getServices = (params: any) => {
  return request.get('/services', { params })
}

export const createService = (data: Service) => {
  return request.post('/services', data)
}

export const updateService = (id: number, data: Service) => {
  return request.put(`/services/${id}`, data)
}

export const deleteService = (id: number) => {
  return request.delete(`/services/${id}`)
}