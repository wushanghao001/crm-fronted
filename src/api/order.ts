import request from './request'

export interface OrderItem {
  id?: number
  orderId?: number
  productId?: number
  productName: string
  productCode: string
  unitPrice: number
  quantity: number
  subtotal?: number
}

export interface Order {
  id?: number
  orderNo?: string
  customerId?: number
  customerName?: string
  contactName?: string
  phone?: string
  email?: string
  totalAmount?: number
  discountAmount?: number
  paidAmount?: number
  status?: string
  payStatus?: string
  paymentMethod?: string
  paidAt?: string
  transactionNo?: string
  remark?: string
  creatorId?: number
  createdAt?: string
  updatedAt?: string
  items?: OrderItem[]
}

export interface OrderDetail extends Order {
  items: OrderItem[]
}

export interface OrderListResponse {
  list: Order[]
  total: number
  pageNum: number
  pageSize: number
}

export interface OrderResponse extends OrderDetail {}

export const getOrders = (params: { 
  pageNum: number; 
  pageSize: number; 
  keyword?: string;
  status?: string;
  payStatus?: string;
}) => {
  const queryParams = {
    pageNum: params.pageNum,
    pageSize: params.pageSize,
    keyword: params.keyword,
    status: params.status,
    payStatus: params.payStatus
  }
  return request.get<OrderListResponse>('/orders', { params: queryParams })
}

export const getOrderById = (id: number) => {
  return request.get<OrderDetail>(`/orders/${id}`)
}

export const createOrder = (data: Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'items'> & { items?: OrderItem[] }) => {
  return request.post<OrderResponse>('/orders', data)
}

export const updateOrder = (id: number, data: Partial<Order>) => {
  return request.put<OrderResponse>(`/orders/${id}`, data)
}

export const deleteOrder = (id: number) => {
  return request.delete(`/orders/${id}`)
}

export const batchDeleteOrders = (ids: number[]) => {
  return request.delete('/orders/batch', { data: { ids } })
}

export const exportOrders = (params: {
  keyword?: string;
  status?: string;
  payStatus?: string;
}) => {
  return request.get('/orders/export', { 
    params,
    responseType: 'blob'
  })
}