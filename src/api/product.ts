import request from './request'

export interface Product {
  id: number
  name: string
  code: string
  category: string
  price: number
  stock: number
  description: string
  status: number
  createdAt: string
  updatedAt: string
  quantity?: number
}

export interface ProductListResponse {
  list: Product[]
  total: number
  pageNum: number
  pageSize: number
}

export interface ProductResponse {
  id: number
  name: string
  code: string
  category: string
  price: number
  stock: number
  description: string
  status: number
  createdAt: string
  updatedAt: string
}

export const getProducts = (params: { page: number; pageSize: number; keyword?: string; category?: string; status?: number }) => {
  const queryParams = {
    pageNum: params.page,
    pageSize: params.pageSize,
    keyword: params.keyword,
    category: params.category,
    status: params.status
  }
  return request.get<ProductListResponse>('/products', { params: queryParams })
}

export const getProductById = (id: number) => {
  return request.get<ProductResponse>(`/products/${id}`)
}

export const createProduct = (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
  return request.post<ProductResponse>('/products', data)
}

export const updateProduct = (id: number, data: Partial<Product>) => {
  return request.put<ProductResponse>(`/products/${id}`, data)
}

export const deleteProduct = (id: number) => {
  return request.delete(`/products/${id}`)
}

export const batchDeleteProducts = (ids: number[]) => {
  return request.delete('/products/batch', { data: { ids } })
}

export const checkCodeExists = (code: string, excludeId?: number) => {
  const params: Record<string, any> = { code }
  if (excludeId) {
    params.excludeId = excludeId
  }
  return request.get<{ exists: boolean }>('/products/check-code', { params })
}
