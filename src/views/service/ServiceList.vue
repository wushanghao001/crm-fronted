<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-bold text-gray-800 dark:text-white">服务管理</h2>
        <p class="text-gray-500 dark:text-gray-400 mt-1">管理客户服务请求</p>
      </div>
      <NButton type="primary" class="bg-blue-500 hover:bg-blue-600" @click="openCreateModal">
        <Add class="w-4 h-4 mr-2" />
        创建服务单
      </NButton>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div class="p-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex flex-wrap gap-4 items-center">
          <NTabs v-model:value="listType" type="line" @update:value="handleListTypeChange">
            <NTab name="all" v-if="authStore.user?.role === 'admin'">全部工单</NTab>
            <NTab name="my">待我处理</NTab>
            <NTab name="processed">已处理</NTab>
          </NTabs>
          <div class="flex flex-wrap gap-4 flex-1 justify-end">
            <div class="w-48">
              <NInput
                v-model:value="searchKeyword"
                placeholder="搜索客户名称"
                @keyup.enter="handleSearch"
              />
            </div>
            <NButton type="primary" @click="handleSearch">搜索</NButton>
            <NButton @click="handleReset">重置</NButton>
          </div>
        </div>
      </div>

      <div class="p-4">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-200">
              <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">服务编号</th>
              <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">客户名称</th>
              <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">服务类型</th>
              <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">标题</th>
              <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">描述</th>
              <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">状态</th>
              <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">优先级</th>
              <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">创建时间</th>
              <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in serviceList"
              :key="item.id"
              class="border-b border-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <td class="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">{{ item.serviceNo }}</td>
              <td class="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{{ item.customerName || '未知客户' }}</td>
              <td class="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{{ item.type }}</td>
              <td class="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{{ item.title }}</td>
              <td class="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                <NTooltip>
                  <template #trigger>
                    <span class="block max-w-[150px] truncate">{{ item.description || '-' }}</span>
                  </template>
                  {{ item.description || '无' }}
                </NTooltip>
              </td>
              <td class="py-3 px-4 text-sm">
                <span :class="getStatusClass(item.status)">{{ getStatusText(item.status) }}</span>
              </td>
              <td class="py-3 px-4 text-sm">
                <span :class="getPriorityClass(item.priority)">{{ getPriorityText(item.priority) }}</span>
              </td>
              <td class="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{{ item.createdAt }}</td>
              <td class="py-3 px-4 text-sm">
                <NButton size="small" type="primary" class="mr-2" @click="openHandleModal(item)">处理</NButton>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="p-4 flex justify-end">
        <NPagination
          v-model:page="pagination.page"
          :page-size="pagination.pageSize"
          :item-count="pagination.total"
          @update:page="handlePageChange"
        />
      </div>
    </div>

    <NModal v-model:show="showCreateModal" preset="card" title="创建服务单" style="width: 500px;">
      <NForm :model="formData" label-placement="top">
        <NFormItem label="客户名称" required>
          <NSelect v-model:value="formData.customerId" :options="customerOptions" placeholder="请选择客户" filterable @update:value="(val) => { const c = allCustomers.find(c => c.id === val); if (c) formData.customerName = c.name; }" />
        </NFormItem>
        <NFormItem label="服务类型">
          <NSelect v-model:value="formData.type" :options="serviceTypeOptions" placeholder="请选择服务类型" />
        </NFormItem>
        <NFormItem label="标题" required>
          <NInput v-model:value="formData.title" placeholder="请输入服务标题" />
        </NFormItem>
        <NFormItem label="描述">
          <NInput v-model:value="formData.description" type="textarea" placeholder="请输入服务描述" :rows="3" />
        </NFormItem>
        <NFormItem label="优先级">
          <NSelect v-model:value="formData.priority" :options="priorityOptions" placeholder="请选择优先级" />
        </NFormItem>
        <NFormItem label="状态">
          <NSelect v-model:value="formData.status" :options="createStatusOptions" placeholder="请选择状态" />
        </NFormItem>
      </NForm>
      <template #footer>
        <div class="flex justify-end gap-3">
          <NButton @click="showCreateModal = false">取消</NButton>
          <NButton type="primary" @click="handleCreate">创建</NButton>
        </div>
      </template>
    </NModal>

    <NModal v-model:show="showHandleModal" preset="card" title="处理服务单" style="width: 500px;">
      <NForm :model="handleForm" label-placement="top">
        <NFormItem label="服务编号">
          <NInput v-model:value="handleForm.serviceNo" disabled />
        </NFormItem>
        <NFormItem label="客户名称">
          <NInput v-model:value="handleForm.customerName" disabled />
        </NFormItem>
        <NFormItem label="标题">
          <NInput v-model:value="handleForm.title" disabled />
        </NFormItem>
        <NFormItem label="状态">
          <NSelect v-model:value="handleForm.status" :options="createStatusOptions" placeholder="请选择状态" />
        </NFormItem>
        <NFormItem label="处理备注">
          <NInput v-model:value="handleForm.remark" type="textarea" placeholder="请输入处理备注" :rows="3" />
        </NFormItem>
      </NForm>
      <template #footer>
        <div class="flex justify-end gap-3">
          <NButton @click="showHandleModal = false">取消</NButton>
          <NButton type="primary" @click="handleUpdate">保存</NButton>
        </div>
      </template>
    </NModal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { NButton, NInput, NSelect, NPagination, NTabs, NTab, NModal, NForm, NFormItem, NTooltip } from 'naive-ui'
import { Add } from '@vicons/ionicons5'
import { message } from '@/utils/message'
import { useAuthStore } from '@/stores/auth'
import { createService, updateService } from '@/api/service'
import { getCustomers } from '@/api/customer'

const authStore = useAuthStore()
const route = useRoute()

const listType = ref<'all' | 'my' | 'processed'>('my')
const searchKeyword = ref('')
const statusFilter = ref('')
const loading = ref(false)

const showCreateModal = ref(false)
const showHandleModal = ref(false)
const formData = reactive({
  customerId: null as number | null,
  customerName: '',
  type: '',
  title: '',
  description: '',
  priority: 'medium',
  status: 'pending'
})

const customerOptions = ref<any[]>([])
const allCustomers = ref<any[]>([])

const handleForm = reactive({
  id: null as number | null,
  serviceNo: '',
  customerName: '',
  title: '',
  status: '',
  remark: ''
})

const openHandleModal = (item: any) => {
  handleForm.id = item.id
  handleForm.serviceNo = item.serviceNo
  handleForm.customerName = item.customerName
  handleForm.title = item.title
  handleForm.status = item.status
  handleForm.remark = ''
  showHandleModal.value = true
}

const handleUpdate = async () => {
  if (!handleForm.id) return
  try {
    await updateService(handleForm.id, {
      status: handleForm.status,
      description: handleForm.remark
    })
    message.success('处理成功')
    showHandleModal.value = false
    loadServiceList()
  } catch (error) {
    message.error('处理失败')
  }
}

const loadCustomerOptions = async () => {
  try {
    const response: any = await getCustomers({ pageNum: 1, pageSize: 1000, listType: 'mine' })
    console.log('Customer response:', response)
    allCustomers.value = response.list || []
    customerOptions.value = allCustomers.value.map((c: any) => ({
      label: c.name,
      value: c.id
    }))
    console.log('Customer options:', customerOptions.value)
  } catch (error) {
    console.error('加载客户列表失败', error)
  }
}

const createStatusOptions = [
  { label: '待处理', value: 'pending' },
  { label: '处理中', value: 'processing' },
  { label: '已完成', value: 'completed' },
  { label: '已关闭', value: 'closed' }
]

const statusOptions = [
  { label: '全部', value: '' },
  { label: '待处理', value: 'pending' },
  { label: '处理中', value: 'processing' },
  { label: '已完成', value: 'completed' },
  { label: '已关闭', value: 'closed' }
]

const serviceList = ref<any[]>([])

const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0
})

const statusMap: Record<string, { label: string; class: string }> = {
  'pending': { label: '待处理', class: 'px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700' },
  'processing': { label: '处理中', class: 'px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700' },
  'completed': { label: '已完成', class: 'px-2 py-1 rounded-full text-xs bg-green-100 text-green-700' },
  'closed': { label: '已关闭', class: 'px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700' }
}

const priorityMap: Record<string, { label: string; class: string }> = {
  'high': { label: '高', class: 'px-2 py-1 rounded-full text-xs bg-red-100 text-red-700' },
  'medium': { label: '中', class: 'px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700' },
  'low': { label: '低', class: 'px-2 py-1 rounded-full text-xs bg-green-100 text-green-700' }
}

const priorityOptions = [
  { label: '高', value: 'high' },
  { label: '中', value: 'medium' },
  { label: '低', value: 'low' }
]

const serviceTypeOptions = [
  { label: '咨询', value: 'consultation' },
  { label: '售后', value: 'after_sales' },
  { label: '投诉', value: 'complaint' },
  { label: '其他', value: 'other' }
]

const openCreateModal = () => {
  loadCustomerOptions()
  showCreateModal.value = true
}

const handleCreate = async () => {
  if (!formData.customerId || !formData.title) {
    message.error('请填写必填项')
    return
  }
  try {
    await createService({
      customerId: formData.customerId,
      customerName: formData.customerName,
      type: formData.type,
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      status: formData.status
    })
    message.success('创建成功')
    showCreateModal.value = false
    Object.assign(formData, {
      customerId: null,
      customerName: '',
      type: '',
      title: '',
      description: '',
      priority: 'medium',
      status: 'pending'
    })
    loadServiceList()
  } catch (error) {
    message.error('创建失败')
  }
}

const getStatusText = (status: string) => {
  return statusMap[status]?.label || status
}

const getStatusClass = (status: string) => {
  return statusMap[status]?.class || 'px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700'
}

const getPriorityText = (priority: string) => {
  return priorityMap[priority]?.label || priority
}

const getPriorityClass = (priority: string) => {
  return priorityMap[priority]?.class || 'px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700'
}

const loadServiceList = async () => {
  loading.value = true
  try {
    const params: any = {
      pageNum: pagination.page,
      pageSize: pagination.pageSize,
      keyword: searchKeyword.value || undefined
    }

    if (listType.value === 'my') {
      params.status = 'pending,processing'
    } else if (listType.value === 'processed') {
      params.status = 'completed,closed'
    }

    const response: any = await request.get('/services', { params })
    const data = response || {}

    serviceList.value = (data.list || []).map((item: any) => ({
      id: item.id,
      serviceNo: item.serviceNo || `SRV${item.id}`,
      customerName: item.customerName || '未知客户',
      type: item.type || '其他',
      title: item.title,
      description: item.description,
      status: item.status,
      priority: item.priority,
      createdAt: item.createdAt
    }))
    pagination.total = data.total || 0
  } catch (error) {
    message.error('加载服务工单失败')
  } finally {
    loading.value = false
  }
}

const handleListTypeChange = (type: 'all' | 'my' | 'processed') => {
  listType.value = type
  pagination.page = 1
  loadServiceList()
}

const handleSearch = () => {
  pagination.page = 1
  loadServiceList()
}

const handleReset = () => {
  searchKeyword.value = ''
  statusFilter.value = ''
  pagination.page = 1
  loadServiceList()
}

const handlePageChange = (page: number) => {
  pagination.page = page
  loadServiceList()
}

import request from '@/api/request'

onMounted(() => {
  if (route.query.filter === 'my') {
    listType.value = 'my'
  }
  loadServiceList()
})
</script>