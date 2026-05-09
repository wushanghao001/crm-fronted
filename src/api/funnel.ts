import request from './request'

export interface FunnelData {
  leads: number
  contacted: number
  quoted: number
  won: number
  lost: number
  contactRate: number
  quoteRate: number
  winRate: number
  totalWinRate: number
}

export interface TrendData {
  dates: string[]
  wonData: number[]
  lostData: number[]
  totalData: number[]
}

export interface CustomerBrief {
  id: number
  name: string
  phone: string
  industry: string
  status: string
}

export interface StageCustomersResponse {
  customers: CustomerBrief[]
  total: number
}

export const getFunnelData = (timeRange: string = 'today') => {
  return request.get<{ code: number; data: FunnelData }>('/funnel', {
    params: { timeRange }
  })
}

export const getTrendData = (timeRange: string = 'today') => {
  return request.get<{ code: number; data: TrendData }>('/funnel/trend', {
    params: { timeRange }
  })
}

export const getStageCustomers = (stage: string) => {
  return request.get<{ code: number; data: StageCustomersResponse }>('/funnel/customers', {
    params: { stage }
  })
}