import request from './request'

export const getOverview = () => {
  return request.get('/statistics/overview')
}

export const getCustomerTrend = () => {
  return request.get('/statistics/customer-trend')
}

export const getChurnReason = () => {
  return request.get('/statistics/churn-reason')
}

export const getUserSalesByTime = (timeType: string) => {
  return request.get('/statistics/user-sales', { params: { timeType } })
}

export const getProductSales = (timeType?: string) => {
  return request.get('/statistics/product-sales', { params: { timeType } })
}

export const exportReport = () => {
  return request.getBlob('/statistics/export')
}