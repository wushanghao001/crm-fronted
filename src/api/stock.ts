import request from './request'

export interface StockLog {
  id: number
  productId: number
  orderId: number
  type: string
  num: number
  beforeStock: number
  afterStock: number
  remark: string
  createTime: string
}

export interface StockLogResponse {
  list: StockLog[]
  total: number
  pageNum: number
  pageSize: number
}

export const getStockLogs = (params: { pageNum: number; pageSize: number; productId?: number }) => {
  return request.get<StockLogResponse>('/stock/logs', { params })
}

export const getStockLogsByOrderId = (orderId: number) => {
  return request.get<StockLog[]>('/stock/logs/order/' + orderId)
}

export const getLowStockProducts = () => {
  return request.get('/stock/warning')
}
