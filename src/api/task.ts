import request from './request'

export interface Task {
  id?: number
  title: string
  content?: string
  taskType?: string
  relatedCustomerId?: number
  relatedFollowId?: number
  dueDate?: string
  priority?: string
  status?: string
  assigneeId?: number
  creatorId?: number
  createdAt?: string
  updatedAt?: string
}

export interface TaskListResponse {
  list: Task[]
  total: number
  pageNum: number
  pageSize: number
}

export const getTaskList = (params: {
  pageNum?: number
  pageSize?: number
  status?: string
}) => {
  return request.get<TaskListResponse>('/task/list', { params })
}

export const createTask = (data: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
  return request.post<Task>('/task/create', data)
}

export const updateTask = (id: number, data: Partial<Task>) => {
  return request.put<Task>(`/task/update/${id}`, data)
}

export const deleteTask = (id: number) => {
  return request.delete<void>(`/task/delete/${id}`)
}

export const toggleTaskStatus = (id: number) => {
  return request.put<Task>(`/task/toggle/${id}`)
}