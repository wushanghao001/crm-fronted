import request from './request'

export interface UserPerformanceData {
  totalSales: number
  wonCustomerCount: number
  followCustomerCount: number
  winRate: number
  monthTargetCompletion: number
  monthTarget: number
  currentMonthSales: number
  leads: number
  contacted: number
  quoted: number
  won: number
  lost: number
  contactRate: number
  quoteRate: number
  winRateStage: number
  totalWinRate: number
}

export interface UserPerformanceTrend {
  months: string[]
  salesData: number[]
  orderCountData: number[]
  customerSources: string[]
  sourceCounts: number[]
}

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

export interface OrderListResponse {
  list: Order[]
  total: number
  pageNum: number
  pageSize: number
}

export const getUserPerformance = (timeRange: string = 'month') => {
  return request.get<UserPerformanceData>('/user/performance', {
    params: { timeRange }
  })
}

export const getUserPerformanceTrend = (months: number = 6) => {
  return request.get<UserPerformanceTrend>('/user/performance/trend', {
    params: { months }
  })
}

export const getUserOrders = (params: {
  pageNum: number
  pageSize: number
  keyword?: string
  startDate?: string
  endDate?: string
}) => {
  return request.get<OrderListResponse>('/user/performance/orders', { params })
}

export const updateUserTarget = (monthTarget: number) => {
  return request.put('/user/performance/target', { monthTarget })
}