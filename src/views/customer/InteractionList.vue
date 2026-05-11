<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-bold text-gray-800 dark:text-white">交互记录</h2>
        <p class="text-gray-500 dark:text-gray-400 mt-1">查看与客户的交互历史</p>
      </div>
      <div class="flex gap-3">
        <NButton v-if="selectedIds.length > 0" type="error" @click="handleBatchDelete">
          <Trash class="w-4 h-4 mr-2" />
          批量删除 ({{ selectedIds.length }})
        </NButton>
        <NButton v-if="selectedIds.length > 0" @click="showBatchStatusModal = true">
          修改状态
        </NButton>
        <NButton v-if="selectedIds.length > 0" @click="handleBatchExport">
          导出
        </NButton>
        <NButton type="primary" @click="handleAdd" class="bg-blue-500 hover:bg-blue-600">
          <Add class="w-4 h-4 mr-2" />
          添加记录
        </NButton>
      </div>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div class="p-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex flex-wrap gap-4 items-center">
          <div class="flex-1 min-w-[200px]">
            <NInput
              v-model:value="searchKeyword"
              placeholder="搜索客户名称、联系人或交互内容"
              class="w-full"
              @keyup.enter="handleSearch"
            />
          </div>
          <NSelect
            v-model:value="typeFilter"
            placeholder="交互类型"
            class="w-40"
            :options="typeOptions"
          />
          <NSelect
            v-model:value="operatorFilter"
            placeholder="记录人"
            class="w-40"
            :options="operatorOptions"
          />
          <NSelect
            v-model:value="statusFilter"
            placeholder="状态"
            class="w-40"
            :options="statusOptions"
          />
          <NButton type="primary" @click="handleSearch">搜索</NButton>
          <NButton @click="handleReset">重置</NButton>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full" ref="tableRef">
          <thead>
            <tr class="bg-gray-50 dark:bg-gray-700">
              <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400 w-12">
                <NCheckbox v-model:checked="isAllSelected" @update:checked="handleSelectAll" />
              </th>
              <th 
                class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400 cursor-col-resize min-w-[120px]"
                :style="{ width: columnWidths.customerName + 'px' }"
                @mousedown="startResize('customerName', $event)"
              >
                客户名称
              </th>
              <th 
                class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400 cursor-col-resize min-w-[100px]"
                :style="{ width: columnWidths.contactName + 'px' }"
                @mousedown="startResize('contactName', $event)"
              >
                联系人
              </th>
              <th 
                class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400 cursor-col-resize min-w-[100px]"
                :style="{ width: columnWidths.type + 'px' }"
                @mousedown="startResize('type', $event)"
              >
                交互类型
              </th>
              <th 
                class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400 cursor-col-resize min-w-[200px]"
                :style="{ width: columnWidths.content + 'px' }"
                @mousedown="startResize('content', $event)"
              >
                交互内容
              </th>
              <th 
                class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400 cursor-col-resize min-w-[140px]"
                :style="{ width: columnWidths.interactionTime + 'px' }"
                @mousedown="startResize('interactionTime', $event)"
              >
                交互时间
              </th>
              <th 
                class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400 cursor-col-resize min-w-[100px]"
                :style="{ width: columnWidths.operator + 'px' }"
                @mousedown="startResize('operator', $event)"
              >
                记录人
              </th>
              <th 
                class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400 cursor-col-resize min-w-[100px]"
                :style="{ width: columnWidths.status + 'px' }"
                @mousedown="startResize('status', $event)"
              >
                状态
              </th>
              <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400 w-48 sticky right-0 bg-gray-50 dark:bg-gray-700 z-10">
                操作
              </th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="interaction in interactionList" 
              :key="interaction.id" 
              class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <td class="py-3 px-4">
                <NCheckbox 
                  :checked="selectedIds.includes(interaction.id)" 
                  @update:checked="(checked) => handleSelect(interaction.id, checked)" 
                />
              </td>
              <td class="py-3 px-4 text-sm text-gray-800 dark:text-gray-200" :style="{ width: columnWidths.customerName + 'px' }">
                {{ interaction.customerName || '未知客户' }}
              </td>
              <td class="py-3 px-4 text-sm text-gray-800 dark:text-gray-200" :style="{ width: columnWidths.contactName + 'px' }">
                {{ interaction.contactName || '-' }}
              </td>
              <td class="py-3 px-4" :style="{ width: columnWidths.type + 'px' }">
                <span :class="getTypeClass(interaction.type)" class="px-2 py-1 rounded-full text-xs">
                  {{ getTypeText(interaction.type) }}
                </span>
              </td>
              <td class="py-3 px-4 text-sm text-gray-800 dark:text-gray-200 truncate" :style="{ width: columnWidths.content + 'px', maxWidth: columnWidths.content + 'px' }" :title="interaction.content">
                {{ interaction.content }}
              </td>
              <td class="py-3 px-4 text-sm text-gray-800 dark:text-gray-200" :style="{ width: columnWidths.interactionTime + 'px' }">
                {{ formatDate(interaction.interactionTime) }}
              </td>
              <td class="py-3 px-4 text-sm text-gray-800 dark:text-gray-200" :style="{ width: columnWidths.operator + 'px' }">
                {{ interaction.operator || '-' }}
              </td>
              <td class="py-3 px-4" :style="{ width: columnWidths.status + 'px' }">
                <span :class="getStatusClass(interaction.status)" class="px-2 py-1 rounded-full text-xs">
                  {{ getStatusText(interaction.status) }}
                </span>
              </td>
              <td class="py-3 px-4 sticky right-0 bg-white dark:bg-gray-800 z-10">
                <div class="flex gap-2">
                  <NButton size="small" type="primary" @click="handleView(interaction)">
                    <Eye class="w-4 h-4 mr-1" />
                    查看
                  </NButton>
                  <NButton size="small" type="info" @click="handleEdit(interaction)">
                    <Pencil class="w-4 h-4 mr-1" />
                    编辑
                  </NButton>
                  <NPopconfirm @positive-click="() => handleDelete(interaction.id)">
                    <template #trigger>
                      <NButton size="small" type="error">
                        <Trash class="w-4 h-4" />
                      </NButton>
                    </template>
                    确定要删除该交互记录吗？
                  </NPopconfirm>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <span class="text-sm text-gray-500 dark:text-gray-400">
          共 {{ pagination.total }} 条数据
        </span>
        <NPagination
          v-model:page="pagination.page"
          v-model:page-size="pagination.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="pagination.total"
          @update:page="handlePageChange"
          @update:page-size="handlePageSizeChange"
        />
      </div>
    </div>

    <NModal v-model:show="showModal" preset="card" :title="isEdit ? '编辑交互记录' : '添加交互记录'" style="width: 500px;">
      <NForm :model="formData" label-placement="left" label-width="100px">
        <NFormItem label="客户名称" :rule="[{ required: true, message: '请选择客户' }]">
          <NSelect 
            v-model:value="formData.customerId" 
            placeholder="请选择客户" 
            :options="customerOptions.filter(c => c.value)"
            @update:value="handleCustomerChange"
          />
        </NFormItem>
        <NFormItem label="联系人">
          <NSelect 
            v-model:value="formData.contactId" 
            placeholder="请选择联系人" 
            :options="filteredContactOptions"
            :disabled="!formData.customerId"
            @update:value="handleContactChange"
          />
        </NFormItem>
        <NFormItem label="电话">
          <NInput v-model:value="formData.phone" placeholder="自动带出联系人电话" />
        </NFormItem>
        <NFormItem label="邮箱">
          <NInput v-model:value="formData.email" placeholder="自动带出联系人邮箱" />
        </NFormItem>
        <NFormItem label="交互类型" :rule="[{ required: true, message: '请选择交互类型' }]">
          <NSelect 
            v-model:value="formData.type" 
            placeholder="请选择交互类型" 
            :options="typeOptions.filter(t => t.value)"
          />
        </NFormItem>
        <NFormItem label="交互内容" :rule="[{ required: true, message: '请输入交互内容' }]">
          <NInput v-model:value="formData.content" placeholder="请输入交互内容" textarea :rows="4" />
        </NFormItem>
        <NFormItem label="交互时间" :rule="[{ required: true, message: '请选择交互时间' }]">
          <NInput v-model:value="formData.interactionTime" type="datetime-local" />
        </NFormItem>
        <NFormItem label="记录人" :rule="[{ required: true, message: '请输入记录人' }]">
          <NInput v-model:value="formData.operator" placeholder="请输入记录人" />
        </NFormItem>
        <NFormItem label="状态">
          <NSelect v-model:value="formData.status" :options="statusOptions.filter(s => s.value)" placeholder="请选择状态" />
        </NFormItem>
      </NForm>
      <div class="flex justify-end gap-3 mt-4">
        <NButton @click="showModal = false">取消</NButton>
        <NButton type="primary" :loading="submitLoading" @click="handleSubmit">确定</NButton>
      </div>
    </NModal>

    <NModal v-model:show="showBatchStatusModal" preset="card" title="批量修改状态" style="width: 400px;">
      <NForm :model="batchStatusForm" label-placement="left" label-width="80px">
        <NFormItem label="状态" :rule="[{ required: true, message: '请选择状态' }]">
          <NSelect v-model:value="batchStatusForm.status" :options="statusOptions.filter(s => s.value)" placeholder="请选择状态" />
        </NFormItem>
      </NForm>
      <div class="flex justify-end gap-3 mt-4">
        <NButton @click="showBatchStatusModal = false">取消</NButton>
        <NButton type="primary" :loading="batchLoading" @click="handleBatchUpdateStatus">确定</NButton>
      </div>
    </NModal>

    <NModal v-model:show="showDetailModal" preset="card" title="交互记录详情" style="width: 500px;">
      <div v-if="currentDetail" class="space-y-4">
        <div class="flex justify-between py-2 border-b border-gray-200">
          <span class="text-gray-500">客户名称</span>
          <span class="font-medium">{{ currentDetail.customerName }}</span>
        </div>
        <div class="flex justify-between py-2 border-b border-gray-200">
          <span class="text-gray-500">联系人</span>
          <span class="font-medium">{{ currentDetail.contactName || '-' }}</span>
        </div>
        <div class="flex justify-between py-2 border-b border-gray-200">
          <span class="text-gray-500">电话</span>
          <span class="font-medium">{{ currentDetail.phone || '-' }}</span>
        </div>
        <div class="flex justify-between py-2 border-b border-gray-200">
          <span class="text-gray-500">邮箱</span>
          <span class="font-medium">{{ currentDetail.email || '-' }}</span>
        </div>
        <div class="flex justify-between py-2 border-b border-gray-200">
          <span class="text-gray-500">交互类型</span>
          <span class="font-medium">{{ getTypeText(currentDetail.type) }}</span>
        </div>
        <div class="flex justify-between py-2 border-b border-gray-200">
          <span class="text-gray-500">交互内容</span>
          <span class="font-medium">{{ currentDetail.content }}</span>
        </div>
        <div class="flex justify-between py-2 border-b border-gray-200">
          <span class="text-gray-500">交互时间</span>
          <span class="font-medium">{{ formatDate(currentDetail.interactionTime) }}</span>
        </div>
        <div class="flex justify-between py-2 border-b border-gray-200">
          <span class="text-gray-500">记录人</span>
          <span class="font-medium">{{ currentDetail.operator }}</span>
        </div>
        <div class="flex justify-between py-2">
          <span class="text-gray-500">状态</span>
          <span :class="getStatusClass(currentDetail.status)" class="px-2 py-1 rounded-full text-xs">
            {{ getStatusText(currentDetail.status) }}
          </span>
        </div>
      </div>
      <div class="flex justify-end mt-4">
        <NButton @click="showDetailModal = false">关闭</NButton>
      </div>
    </NModal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { 
  NButton, NInput, NSelect, NPagination, NModal, NForm, NFormItem, 
  NCheckbox, NPopconfirm 
} from 'naive-ui'
import { Add, Search, Pencil, Trash, Eye } from '@vicons/ionicons5'
import { getInteractions, createInteraction, updateInteraction, deleteInteraction } from '@/api/interaction'
import { getCustomers } from '@/api/customer'
import { getContacts } from '@/api/contact'
import { message } from '@/utils/message'

const searchKeyword = ref('')
const typeFilter = ref('')
const operatorFilter = ref('')
const statusFilter = ref('')
const loading = ref(false)
const interactionList = ref<any[]>([])
const tableRef = ref<HTMLTableElement | null>(null)

const typeOptions = [
  { label: '全部类型', value: '' },
  { label: '电话', value: 'phone' },
  { label: '邮件', value: 'email' },
  { label: '拜访', value: 'visit' },
  { label: '会议', value: 'meeting' },
  { label: '其他', value: 'other' }
]

const statusOptions = [
  { label: '全部状态', value: '' },
  { label: '已完成', value: 'completed' },
  { label: '进行中', value: 'in_progress' },
  { label: '待跟进', value: 'pending' }
]

const operatorOptions = [
  { label: '全部记录人', value: '' },
  { label: '张三', value: '张三' },
  { label: '李四', value: '李四' },
  { label: '王五', value: '王五' }
]

const customerOptions = ref<any[]>([])
const contactOptions = ref<any[]>([])
const allCustomers = ref<any[]>([])
const allContacts = ref<any[]>([])

const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0
})

const columnWidths = reactive({
  customerName: 150,
  contactName: 120,
  type: 100,
  content: 250,
  interactionTime: 140,
  operator: 100,
  status: 100
})

const resizeColumn = ref<string>('')
const startX = ref(0)
const startWidth = ref(0)

const showModal = ref(false)
const isEdit = ref(false)
const submitLoading = ref(false)
const currentEditId = ref<number | null>(null)

const showBatchStatusModal = ref(false)
const batchLoading = ref(false)
const batchStatusForm = reactive({
  status: ''
})

const showDetailModal = ref(false)
const currentDetail = ref<any>(null)

const selectedIds = ref<number[]>([])

const formData = reactive({
  customerId: '',
  contactId: '',
  type: '',
  content: '',
  interactionTime: '',
  operator: '',
  status: 'completed',
  phone: '',
  email: ''
})

const isAllSelected = computed(() => {
  return interactionList.value.length > 0 && selectedIds.value.length === interactionList.value.length
})

const filteredContactOptions = computed(() => {
  if (!formData.customerId) {
    return []
  }
  const customerId = parseInt(formData.customerId)
  return allContacts.value
    .filter((contact: any) => contact.customerId === customerId)
    .map((contact: any) => ({
      label: contact.name,
      value: contact.id.toString()
    }))
})

const handleCustomerChange = (customerId: string) => {
  formData.contactId = ''
  formData.phone = ''
  formData.email = ''
}

const handleContactChange = (contactId: string) => {
  if (!contactId) {
    formData.phone = ''
    formData.email = ''
    return
  }
  const contact = allContacts.value.find((c: any) => c.id.toString() === contactId)
  if (contact) {
    formData.phone = contact.phone || ''
    formData.email = contact.email || ''
  }
}

const typeMap: Record<string, { text: string; class: string }> = {
  'phone': { text: '电话', class: 'bg-blue-100 text-blue-700' },
  'email': { text: '邮件', class: 'bg-green-100 text-green-700' },
  'visit': { text: '拜访', class: 'bg-yellow-100 text-yellow-700' },
  'meeting': { text: '会议', class: 'bg-purple-100 text-purple-700' },
  'other': { text: '其他', class: 'bg-gray-100 text-gray-700' }
}

const statusMap: Record<string, { text: string; class: string }> = {
  'completed': { text: '已完成', class: 'bg-green-100 text-green-700' },
  'in_progress': { text: '进行中', class: 'bg-blue-100 text-blue-700' },
  'pending': { text: '待跟进', class: 'bg-yellow-100 text-yellow-700' }
}

const getTypeText = (type: string) => {
  return typeMap[type]?.text || type || '未知'
}

const getTypeClass = (type: string) => {
  return typeMap[type]?.class || 'px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700'
}

const getStatusText = (status: string) => {
  return statusMap[status]?.text || status || '未知'
}

const getStatusClass = (status: string) => {
  return statusMap[status]?.class || 'px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700'
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  if (dateStr.includes('T')) {
    return dateStr.replace('T', ' ')
  }
  return dateStr
}

const startResize = (column: string, event: MouseEvent) => {
  resizeColumn.value = column
  startX.value = event.clientX
  startWidth.value = columnWidths[column as keyof typeof columnWidths]
  document.addEventListener('mousemove', onResize)
  document.addEventListener('mouseup', stopResize)
}

const onResize = (event: MouseEvent) => {
  if (!resizeColumn.value) return
  const deltaX = event.clientX - startX.value
  const newWidth = Math.max(80, startWidth.value + deltaX)
  columnWidths[resizeColumn.value as keyof typeof columnWidths] = newWidth
}

const stopResize = () => {
  resizeColumn.value = ''
  document.removeEventListener('mousemove', onResize)
  document.removeEventListener('mouseup', stopResize)
}

const handleSearch = () => {
  pagination.page = 1
  loadInteractions()
}

const handleReset = () => {
  searchKeyword.value = ''
  typeFilter.value = ''
  operatorFilter.value = ''
  statusFilter.value = ''
  pagination.page = 1
  loadInteractions()
}

const handlePageChange = (page: number) => {
  pagination.page = page
  selectedIds.value = []
  loadInteractions()
}

const handlePageSizeChange = (pageSize: number) => {
  pagination.pageSize = pageSize
  pagination.page = 1
  selectedIds.value = []
  loadInteractions()
}

const handleSelectAll = (checked: boolean) => {
  if (checked) {
    selectedIds.value = interactionList.value.map(item => item.id)
  } else {
    selectedIds.value = []
  }
}

const handleSelect = (id: number, checked: boolean) => {
  if (checked) {
    selectedIds.value.push(id)
  } else {
    selectedIds.value = selectedIds.value.filter(item => item !== id)
  }
}

const handleAdd = () => {
  isEdit.value = false
  currentEditId.value = null
  const now = new Date()
  const dateStr = now.toISOString().slice(0, 16)
  Object.assign(formData, { customerId: '', contactId: '', type: '', content: '', interactionTime: dateStr, operator: '', status: 'completed', phone: '', email: '' })
  showModal.value = true
}

const handleEdit = (row: any) => {
  isEdit.value = true
  currentEditId.value = row.id
  Object.assign(formData, {
    customerId: row.customerId?.toString() || '',
    contactId: row.contactId?.toString() || '',
    type: row.type,
    content: row.content,
    interactionTime: row.interactionTime ? row.interactionTime.replace(' ', 'T').slice(0, 16) : '',
    operator: row.operator,
    status: row.status || 'completed',
    phone: row.phone || '',
    email: row.email || ''
  })
  showModal.value = true
}

const handleView = (interaction: any) => {
  currentDetail.value = interaction
  showDetailModal.value = true
}

const handleSubmit = async () => {
  if (!formData.customerId) {
    message.error('请选择客户')
    return
  }
  if (!formData.type) {
    message.error('请选择交互类型')
    return
  }
  if (!formData.content) {
    message.error('请输入交互内容')
    return
  }
  if (!formData.interactionTime) {
    message.error('请选择交互时间')
    return
  }
  if (!formData.operator) {
    message.error('请输入记录人')
    return
  }

  submitLoading.value = true
  try {
    let interactionTime = formData.interactionTime
    if (interactionTime) {
      const [date, time] = interactionTime.split('T')
      interactionTime = `${date} ${time}:00`
    }
    const submitData = {
      ...formData,
      interactionTime,
      customerId: parseInt(formData.customerId),
      contactId: formData.contactId ? parseInt(formData.contactId) : null
    }
    if (isEdit.value && currentEditId.value) {
      await updateInteraction(currentEditId.value, submitData)
      message.success('修改成功')
    } else {
      await createInteraction(submitData)
      message.success('添加成功')
    }
    showModal.value = false
    loadInteractions()
  } catch (error: any) {
    message.error(error.message || '操作失败')
  } finally {
    submitLoading.value = false
  }
}

const handleDelete = async (id: number) => {
  try {
    await deleteInteraction(id)
    message.success('删除成功')
    loadInteractions()
  } catch (error: any) {
    message.error(error.message || '删除失败')
  }
}

const handleBatchDelete = async () => {
  if (selectedIds.value.length === 0) {
    message.warning('请选择要删除的记录')
    return
  }

  try {
    for (const id of selectedIds.value) {
      await deleteInteraction(id)
    }
    message.success(`成功删除 ${selectedIds.value.length} 条记录`)
    selectedIds.value = []
    loadInteractions()
  } catch (error: any) {
    message.error(error.message || '批量删除失败')
  }
}

const handleBatchUpdateStatus = async () => {
  if (!batchStatusForm.status) {
    message.error('请选择状态')
    return
  }
  if (selectedIds.value.length === 0) {
    message.warning('请选择要修改的记录')
    return
  }

  batchLoading.value = true
  try {
    for (const id of selectedIds.value) {
      await updateInteraction(id, { status: batchStatusForm.status })
    }
    message.success(`成功修改 ${selectedIds.value.length} 条记录状态`)
    showBatchStatusModal.value = false
    selectedIds.value = []
    batchLoading.value = false
    loadInteractions()
  } catch (error: any) {
    message.error(error.message || '批量修改状态失败')
    batchLoading.value = false
  }
}

const handleBatchExport = () => {
  const headers = ['客户名称', '联系人', '交互类型', '交互内容', '交互时间', '记录人', '状态']
  const rows = interactionList.value
    .filter(item => selectedIds.value.includes(item.id))
    .map(item => [
      item.customerName || '',
      item.contactName || '',
      getTypeText(item.type),
      item.content,
      formatDate(item.interactionTime),
      item.operator || '',
      getStatusText(item.status)
    ])
  
  const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n')
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `交互记录_${new Date().toISOString().split('T')[0]}.csv`
  link.click()
}

const loadCustomerOptions = async () => {
  try {
    const response = await getCustomers({
      pageNum: 1,
      pageSize: 1000
    })
    const data = response as any
    allCustomers.value = data.list || []
    customerOptions.value = [
      { label: '全部', value: '' },
      ...allCustomers.value.map((customer: any) => ({
        label: customer.name,
        value: customer.id.toString()
      }))
    ]
  } catch (error) {
    allCustomers.value = [
      { id: 1, name: '北京科技有限公司' },
      { id: 2, name: '上海贸易集团' },
      { id: 3, name: '广州制造公司' },
      { id: 4, name: '深圳科技有限公司' },
      { id: 5, name: '杭州互联网公司' }
    ]
    customerOptions.value = [
      { label: '全部', value: '' },
      ...allCustomers.value.map((customer: any) => ({
        label: customer.name,
        value: customer.id.toString()
      }))
    ]
  }
}

const loadContactOptions = async () => {
  try {
    const response = await getContacts({
      page: 1,
      size: 1000
    })
    const data = response as any
    allContacts.value = data.list || []
    contactOptions.value = [
      { label: '全部', value: '' },
      ...allContacts.value.map((contact: any) => ({
        label: contact.name,
        value: contact.id.toString()
      }))
    ]
  } catch (error) {
    allContacts.value = [
      { id: 1, name: '张经理' },
      { id: 2, name: '李助理' },
      { id: 3, name: '王总' },
      { id: 4, name: '陈经理' },
      { id: 5, name: '刘总' }
    ]
    contactOptions.value = [
      { label: '全部', value: '' },
      ...allContacts.value.map((contact: any) => ({
        label: contact.name,
        value: contact.id.toString()
      }))
    ]
  }
}

const loadInteractions = async () => {
  loading.value = true
  try {
    const response = await getInteractions({
      page: pagination.page,
      size: pagination.pageSize,
      keyword: searchKeyword.value || undefined,
      type: typeFilter.value || undefined,
      operator: operatorFilter.value || undefined,
      status: statusFilter.value || undefined
    })
    const data = response as any
    interactionList.value = data.list.map((item: any) => ({
      ...item,
      customerName: item.customerName || '未知客户',
      contactName: item.contactName || '',
      status: item.status || 'completed'
    }))
    pagination.total = data.total
  } catch (error) {
    interactionList.value = [
      { id: 1, customerId: 1, customerName: '北京科技有限公司', contactId: 1, contactName: '张经理', type: 'phone', content: '电话沟通产品需求，客户对企业版套餐感兴趣', interactionTime: '2024-01-15 14:30:00', operator: '张三', status: 'completed', createdAt: '2024-01-15' },
      { id: 2, customerId: 2, customerName: '上海贸易集团', contactId: 3, contactName: '王总', type: 'visit', content: '上门拜访，介绍新产品功能', interactionTime: '2024-01-14 10:00:00', operator: '李四', status: 'completed', createdAt: '2024-01-14' },
      { id: 3, customerId: 3, customerName: '广州制造公司', contactId: 4, contactName: '陈经理', type: 'email', content: '发送产品报价单，包含详细价格和服务条款', interactionTime: '2024-01-13 16:45:00', operator: '张三', status: 'completed', createdAt: '2024-01-13' },
      { id: 4, customerId: 4, customerName: '深圳科技有限公司', contactId: 5, contactName: '刘总', type: 'meeting', content: '线上会议，演示系统功能，客户反馈良好', interactionTime: '2024-01-12 09:30:00', operator: '王五', status: 'completed', createdAt: '2024-01-12' },
      { id: 5, customerId: 1, customerName: '北京科技有限公司', contactId: 2, contactName: '李助理', type: 'phone', content: '跟进订单进度，确认发货时间', interactionTime: '2024-01-11 11:20:00', operator: '张三', status: 'in_progress', createdAt: '2024-01-11' }
    ]
    pagination.total = 80
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  console.log('InteractionList mounted')
  await loadCustomerOptions()
  await loadContactOptions()
  console.log('calling loadInteractions')
  await loadInteractions()
})

onUnmounted(() => {
  document.removeEventListener('mousemove', onResize)
  document.removeEventListener('mouseup', stopResize)
})
</script>