<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-bold text-gray-800 dark:text-white">服务管理</h2>
        <p class="text-gray-500 dark:text-gray-400 mt-1">管理客户服务请求</p>
      </div>
      <div class="flex gap-3">
        <NButton v-if="selectedIds.length > 0" type="error" @click="handleBatchDelete">
          <DeleteIcon class="w-4 h-4 mr-2" />
          批量删除 ({{ selectedIds.length }})
        </NButton>
        <NButton type="primary" class="bg-blue-500 hover:bg-blue-600" @click="openCreateModal">
          <Add class="w-4 h-4 mr-2" />
          创建服务单
        </NButton>
      </div>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 flex-wrap gap-4">
        <NTabs v-model:value="listType" type="line" @update:value="handleListTypeChange">
          <NTab name="all" v-if="authStore.user?.role === 'admin'">全部工单</NTab>
          <NTab name="my">待我处理</NTab>
          <NTab name="processed">已处理</NTab>
        </NTabs>
        <div class="flex items-center gap-3" style="min-width: 400px;">
          <NInput
            v-model:value="searchKeyword"
            placeholder="搜索客户名称"
            style="width: 200px;"
            @keyup.enter="handleSearch"
          />
          <NButton type="primary" @click="handleSearch">搜索</NButton>
          <NButton @click="handleReset">重置</NButton>
        </div>
      </div>

      <div class="table-container">
        <NDataTable
          ref="dataTableRef"
          :columns="columns"
          :data="serviceList"
          :loading="loading"
          :pagination="false"
          :scroll-x="1400"
          :scroll-y="500"
          :row-key="(row) => row.id"
          :checked-row-keys="selectedIds"
          @update:checked-row-keys="handleCheckedRowKeysChange"
        />

        <div class="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-700">
          <span class="text-sm text-gray-500">
            共 {{ pagination.total }} 条
          </span>
          <NPagination
            v-model:page="pagination.page"
            v-model:page-size="pagination.pageSize"
            :page-count="pagination.pageCount"
            :page-sizes="pagination.pageSizes"
            :show-size-picker="pagination.showSizePicker"
            :total="pagination.total"
            @update:page="handlePageChange"
            @update:page-size="handlePageSizeChange"
          />
        </div>
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
import { ref, reactive, onMounted, h } from 'vue'
import { useRoute } from 'vue-router'
import { NButton, NInput, NSelect, NPagination, NTabs, NTab, NModal, NForm, NFormItem, NTooltip, NDataTable } from 'naive-ui'
import { Add, Pencil as EditIcon, Trash as DeleteIcon } from '@vicons/ionicons5'
import { message } from '@/utils/message'
import { useAuthStore } from '@/stores/auth'
import { createService, updateService, deleteService, batchDeleteServices } from '@/api/service'
import { getCustomers } from '@/api/customer'
import request from '@/api/request'

const authStore = useAuthStore()
const route = useRoute()
const dataTableRef = ref()

const listType = ref<'all' | 'my' | 'processed'>('my')
const searchKeyword = ref('')
const loading = ref(false)
const selectedIds = ref<number[]>([])

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

const serviceList = ref<any[]>([])

const pagination = reactive({
  page: 1,
  pageSize: 10,
  pageCount: 1,
  total: 0,
  showSizePicker: true,
  pageSizes: [10, 20, 50, 100]
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

const getStatusText = (status: string) => statusMap[status]?.label || status
const getStatusClass = (status: string) => statusMap[status]?.class || 'px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700'
const getPriorityText = (priority: string) => priorityMap[priority]?.label || priority
const getPriorityClass = (priority: string) => priorityMap[priority]?.class || 'px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700'

const renderActions = (row: any) => {
  return h('div', { class: 'flex items-center gap-2' }, [
    h(NButton, { size: 'small', type: 'primary', onClick: () => openHandleModal(row) }, { default: () => '处理' })
  ])
}

const columns = [
  { type: 'selection', width: 50, fixed: 'left' },
  { title: '序号', key: 'index', width: 60, fixed: 'left',
    render: (row: any, index: number) => h('span', index + 1) },
  { title: '服务编号', key: 'serviceNo', width: 120, fixed: 'left', ellipsis: { tooltip: true } },
  { title: '客户名称', key: 'customerName', width: 120, ellipsis: { tooltip: true } },
  { title: '服务类型', key: 'type', width: 100,
    render: (row: any) => h('span', {}, row.type || '其他') },
  { title: '标题', key: 'title', width: 180, ellipsis: { tooltip: true } },
  { title: '描述', key: 'description', width: 150, ellipsis: { tooltip: true } },
  { title: '状态', key: 'status', width: 100,
    render: (row: any) => h('span', { class: getStatusClass(row.status) }, getStatusText(row.status)) },
  { title: '优先级', key: 'priority', width: 80,
    render: (row: any) => h('span', { class: getPriorityClass(row.priority) }, getPriorityText(row.priority)) },
  { title: '创建时间', key: 'createdAt', width: 140 },
  { title: '操作', key: 'actions', width: 100, fixed: 'right',
    render: (row: any) => renderActions(row) }
]

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
    allCustomers.value = response.list || []
    customerOptions.value = allCustomers.value.map((c: any) => ({
      label: c.name,
      value: c.id
    }))
  } catch (error) {
    console.error('加载客户列表失败', error)
  }
}

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

const handleDelete = async (id: number) => {
  try {
    await deleteService(id)
    message.success('删除成功')
    loadServiceList()
  } catch (error) {
    message.error('删除失败')
  }
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
    pagination.pageCount = Math.ceil(pagination.total / pagination.pageSize) || 1
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
  pagination.page = 1
  loadServiceList()
}

const handlePageChange = (page: number) => {
  const totalPages = Math.ceil(pagination.total / pagination.pageSize) || 1
  if (page < 1) page = 1
  if (page > totalPages) page = totalPages
  pagination.page = page
  loadServiceList()
}

const handlePageSizeChange = (pageSize: number) => {
  pagination.pageSize = pageSize
  pagination.page = 1
  pagination.pageCount = Math.ceil(pagination.total / pagination.pageSize) || 1
  loadServiceList()
}

const handleCheckedRowKeysChange = (keys: number[]) => {
  selectedIds.value = keys
}

const handleBatchDelete = () => {
  if (selectedIds.value.length === 0) {
    message.warning('请选择要删除的服务单')
    return
  }
  if (confirm(`确定要删除选中的 ${selectedIds.value.length} 个服务单吗？此操作不可撤销。`)) {
    confirmBatchDelete()
  }
}

const confirmBatchDelete = async () => {
  try {
    await batchDeleteServices(selectedIds.value)
    message.success('批量删除成功')
    selectedIds.value = []
    loadServiceList()
  } catch (error: any) {
    message.error(error.message || '批量删除失败')
  }
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

const createStatusOptions = [
  { label: '待处理', value: 'pending' },
  { label: '处理中', value: 'processing' },
  { label: '已完成', value: 'completed' },
  { label: '已关闭', value: 'closed' }
]

onMounted(() => {
  if (route.query.filter === 'my') {
    listType.value = 'my'
  }
  loadServiceList()
})
</script>

<style scoped>
.table-container {
  max-width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
}

.table-container :deep(.n-data-table) {
  min-width: 100%;
}

.table-container :deep(.n-data-table-header) {
  position: sticky;
  top: 0;
  z-index: 1;
}

.table-container :deep(.n-data-table-fixed-left) {
  z-index: 2;
}

.table-container :deep(.n-data-table-fixed-right) {
  z-index: 2;
}
</style>