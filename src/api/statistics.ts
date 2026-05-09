import request from './request'

export const getIndustryDistribution = () => {
  return request.get('/statistics/industry-distribution')
}

export const getOverview = () => {
  return request.get('/statistics/overview')
}

export const getCustomerTrend = () => {
  return request.get('/statistics/customer-trend')
}

export const getFunnel = () => {
  return request.get('/statistics/funnel')
}

export const getSalesTop = () => {
  return request.get('/statistics/sales-top')
}

export const getChurnReason = () => {
  return request.get('/statistics/churn-reason')
}