<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-bold text-gray-800 dark:text-white">联系人管理</h2>
        <p class="text-gray-500 dark:text-gray-400 mt-1">管理客户联系人信息</p>
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
        <NButton v-permission="'contact:add'" type="primary" @click="handleAdd" class="bg-blue-500 hover:bg-blue-600">
          <Add class="w-4 h-4 mr-2" />
          添加联系人
        </NButton>
      </div>
    </div>
    
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div class="p-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex flex-wrap gap-4">
          <div class="flex-1 min-w-[200px]">
            <NInput
              v-model:value="searchKeyword"
              placeholder="搜索联系人姓名、电话或邮箱"
              class="w-full"
              :prefix-icon="SearchIcon"
              @keyup.enter="handleSearch"
            />
          </div>
          <NSelect
            v-model:value="customerFilter"
            placeholder="选择客户"
            class="w-48"
            :options="customerOptions"
          />
          <NSelect
            v-model:value="positionFilter"
            placeholder="选择职位"
            class="w-36"
            :options="positionOptions"
          />
          <NSelect
            v-model:value="statusFilter"
            placeholder="选择状态"
            class="w-36"
            :options="statusOptions"
          />
          <NButton type="primary" @click="handleSearch">搜索</NButton>
          <NButton @click="handleReset">重置</NButton>
        </div>
      </div>
      
      <div class="overflow-x-auto">
        <div class="min-w-[1000px]">
          <table class="w-full">
            <thead>
              <tr class="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <th class="py-3 px-4 w-12 sticky left-0 bg-gray-50 dark:bg-gray-700 z-10">
                  <NCheckbox
                    :checked="isAllSelected"
                    :indeterminate="isIndeterminate"
                    @update:checked="handleSelectAll"
                  />
                </th>
                <th 
                  class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400 cursor-col-resize min-w-[100px]"
                  :style="{ width: columnWidths.name + 'px' }"
                  @mousedown="startResize('name', $event)"
                >
                  联系人
                </th>
                <th 
                  class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400 cursor-col-resize min-w-[150px]"
                  :style="{ width: columnWidths.customerName + 'px' }"
                  @mousedown="startResize('customerName', $event)"
                >
                  所属客户
                </th>
                <th 
                  class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400 cursor-col-resize min-w-[120px]"
                  :style="{ width: columnWidths.phone + 'px' }"
                  @mousedown="startResize('phone', $event)"
                >
                  联系电话
                </th>
                <th 
                  class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400 cursor-col-resize min-w-[180px]"
                  :style="{ width: columnWidths.email + 'px' }"
                  @mousedown="startResize('email', $event)"
                >
                  邮箱
                </th>
                <th 
                  class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400 cursor-col-resize min-w-[100px]"
                  :style="{ width: columnWidths.position + 'px' }"
                  @mousedown="startResize('position', $event)"
                >
                  职位
                </th>
                <th 
                  class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400 cursor-col-resize min-w-[100px]"
                  :style="{ width: columnWidths.status + 'px' }"
                  @mousedown="startResize('status', $event)"
                >
                  状态
                </th>
                <th 
                  class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400 cursor-col-resize min-w-[120px]"
                  :style="{ width: columnWidths.createdAt + 'px' }"
                  @mousedown="startResize('createdAt', $event)"
                >
                  创建时间
                </th>
                <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400 w-48 sticky right-0 bg-gray-50 dark:bg-gray-700 z-10">
                  操作
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="contact in contactList"
                :key="contact.id"
                class="border-b border-gray-100 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <td class="py-3 px-4 sticky left-0 bg-white dark:bg-gray-800 z-10">
                  <NCheckbox
                    :checked="selectedIds.includes(contact.id)"
                    @update:checked="(checked) => handleSelect(contact.id, checked)"
                  />
                </td>
                <td class="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">{{ contact.name }}</td>
                <td class="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{{ contact.customerName || '未知客户' }}</td>
                <td class="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{{ contact.phone }}</td>
                <td class="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{{ contact.email }}</td>
                <td class="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{{ contact.position }}</td>
                <td class="py-3 px-4 text-sm">
                  <span :class="getStatusClass(contact.status)">
                    {{ getStatusText(contact.status) }}
                  </span>
                </td>
                <td class="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                  {{ formatDate(contact.createdAt) }}
                </td>
                <td class="py-3 px-4 text-sm sticky right-0 bg-white dark:bg-gray-800 z-10">
                  <div class="flex items-center gap-2">
                    <NButton size="small" type="primary" @click="handleEdit(contact)">
                      <Eye class="w-4 h-4 mr-1" />
                      查看
                    </NButton>
                    <NButton size="small" type="info" @click="handleEdit(contact)">
                      <Pencil class="w-4 h-4 mr-1" />
                      编辑
                    </NButton>
                    <NPopconfirm @positive-click="() => handleDelete(contact.id)">
                      <template #trigger>
                        <NButton size="small" type="error">
                          <Trash class="w-4 h-4" />
                        </NButton>
                      </template>
                      确定要删除该联系人吗？
                    </NPopconfirm>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          
          <div v-if="contactList.length === 0" class="py-12 text-center text-gray-400">
            暂无联系人数据
          </div>
        </div>
      </div>
      
      <div class="p-4 flex justify-between items-center border-t border-gray-200 dark:border-gray-700">
        <span class="text-sm text-gray-500">共 {{ pagination.total }} 条记录</span>
        <NPagination
          v-model:page="pagination.page"
          :page-size="pagination.pageSize"
          :item-count="pagination.total"
          @update:page="handlePageChange"
          @update:page-size="handlePageSizeChange"
          :page-sizes="[10, 20, 50, 100]"
          show-size-picker
        />
      </div>
    </div>

    <!-- 新增/编辑弹窗 -->
    <NModal v-model:show="showModal" preset="card" :title="isEdit ? '编辑联系人' : '添加联系人'" style="width: 500px;">
      <NForm :model="formData" label-placement="left" label-width="80px">
        <NFormItem label="姓名" :rule="[{ required: true, message: '请输入姓名' }]">
          <NInput v-model:value="formData.name" placeholder="请输入联系人姓名" />
        </NFormItem>
        <NFormItem label="所属客户" :rule="[{ required: true, message: '请选择客户' }]">
          <NSelect 
            v-model:value="formData.customerId" 
            placeholder="请选择所属客户" 
            :options="customerOptions.filter(c => c.value)"
          />
        </NFormItem>
        <NFormItem label="联系电话" :rule="[{ required: true, message: '请输入电话' }, { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码' }]">
          <NInput v-model:value="formData.phone" placeholder="请输入联系电话" />
        </NFormItem>
        <NFormItem label="邮箱" :rule="[{ required: true, message: '请输入邮箱' }, { type: 'email', message: '请输入正确的邮箱格式' }]">
          <NInput v-model:value="formData.email" placeholder="请输入邮箱" />
        </NFormItem>
        <NFormItem label="职位">
          <NSelect v-model:value="formData.position" :options="positionOptions.filter(p => p.value)" placeholder="请选择职位" />
        </NFormItem>
        <NFormItem label="状态">
          <NSelect v-model:value="formData.status" :options="statusOptions.filter(s => s.value)" placeholder="请选择状态" />
        </NFormItem>
        <NFormItem label="备注">
          <NInput v-model:value="formData.remark" placeholder="请输入备注" textarea :rows="3" />
        </NFormItem>
      </NForm>
      <template #footer>
        <div class="flex justify-end gap-2">
          <NButton @click="showModal = false">取消</NButton>
          <NButton type="primary" @click="handleSubmit" :loading="submitLoading">确定</NButton>
        </div>
      </template>
    </NModal>

    <!-- 批量修改状态弹窗 -->
    <NModal v-model:show="showBatchStatusModal" preset="card" title="批量修改状态" style="width: 400px;">
      <NForm :model="batchStatusForm" label-placement="left" label-width="80px">
        <NFormItem label="目标状态" :rule="[{ required: true, message: '请选择状态' }]">
          <NSelect v-model:value="batchStatusForm.status" :options="statusOptions.filter(s => s.value)" placeholder="请选择状态" />
        </NFormItem>
      </NForm>
      <template #footer>
        <div class="flex justify-end gap-2">
          <NButton @click="showBatchStatusModal = false">取消</NButton>
          <NButton type="primary" @click="handleBatchStatusUpdate" :loading="batchLoading">确定</NButton>
        </div>
      </template>
    </NModal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed, onUnmounted, onActivated } from 'vue'
import { 
  NButton, NInput, NSelect, NPagination, NModal, NForm, NFormItem, 
  NCheckbox, NPopconfirm 
} from 'naive-ui'
import { Add, Search, Pencil, Trash, Eye } from '@vicons/ionicons5'
import { getContacts, createContact, updateContact, deleteContact } from '@/api/contact'
import { getCustomers } from '@/api/customer'
import { message } from '@/utils/message'

const searchKeyword = ref('')
const customerFilter = ref('')
const positionFilter = ref('')
const statusFilter = ref('')
const loading = ref(false)
const contactList = ref<any[]>([])
const SearchIcon = Search

const showModal = ref(false)
const isEdit = ref(false)
const submitLoading = ref(false)
const currentEditId = ref<number | null>(null)

const showBatchStatusModal = ref(false)
const batchLoading = ref(false)
const batchStatusForm = reactive({
  status: ''
})

const selectedIds = ref<number[]>([])

const formData = reactive({
  name: '',
  customerId: '',
  phone: '',
  email: '',
  position: '',
  status: '',
  remark: ''
})

const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0
})

const columnWidths = reactive({
  name: 100,
  customerName: 150,
  phone: 120,
  email: 180,
  position: 100,
  status: 100,
  createdAt: 120
})

const statusOptions = [
  { label: '全部状态', value: '' },
  { label: '在职', value: 'active' },
  { label: '离职', value: 'inactive' }
]

const positionOptions = [
  { label: '全部职位', value: '' },
  { label: '总经理', value: '总经理' },
  { label: 'CEO', value: 'CEO' },
  { label: '销售总监', value: '销售总监' },
  { label: '采购总监', value: '采购总监' },
  { label: '行政助理', value: '行政助理' },
  { label: '技术负责人', value: '技术负责人' },
  { label: '财务', value: '财务' }
]

const customerOptions = ref<any[]>([])
const allCustomers = ref<any[]>([])

const isAllSelected = computed(() => {
  return contactList.value.length > 0 && selectedIds.value.length === contactList.value.length
})

const isIndeterminate = computed(() => {
  return selectedIds.value.length > 0 && selectedIds.value.length < contactList.value.length
})

const statusMap: Record<string, { text: string; class: string }> = {
  'active': { text: '在职', class: 'px-2 py-1 rounded-full text-xs bg-green-100 text-green-700' },
  'inactive': { text: '离职', class: 'px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700' }
}

const getStatusText = (status: string) => {
  return statusMap[status]?.text || status || '未知'
}

const getStatusClass = (status: string) => {
  return statusMap[status]?.class || 'px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700'
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  return dateStr.includes('T') ? dateStr.split('T')[0] : dateStr
}

const handleSearch = () => {
  console.log('handleSearch called, keyword:', searchKeyword.value)
  pagination.page = 1
  loadContacts()
}

const handleReset = () => {
  searchKeyword.value = ''
  customerFilter.value = ''
  positionFilter.value = ''
  statusFilter.value = ''
  pagination.page = 1
  loadContacts()
}

const handlePageChange = (page: number) => {
  pagination.page = page
  selectedIds.value = []
  loadContacts()
}

const handlePageSizeChange = (pageSize: number) => {
  pagination.pageSize = pageSize
  pagination.page = 1
  selectedIds.value = []
  loadContacts()
}

const handleSelectAll = (checked: boolean) => {
  if (checked) {
    selectedIds.value = contactList.value.map(item => item.id)
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
  Object.assign(formData, { name: '', customerId: '', phone: '', email: '', position: '', status: 'active', remark: '' })
  showModal.value = true
}

const handleEdit = (row: any) => {
  isEdit.value = true
  currentEditId.value = row.id
  Object.assign(formData, {
    name: row.name,
    customerId: row.customerId,
    phone: row.phone,
    email: row.email,
    position: row.position,
    status: row.status || 'active',
    remark: row.remark || ''
  })
  showModal.value = true
}

const handleSubmit = async () => {
  if (!formData.name) {
    message.error('请输入联系人姓名')
    return
  }
  if (!formData.customerId) {
    message.error('请选择所属客户')
    return
  }
  if (!formData.phone) {
    message.error('请输入联系电话')
    return
  }
  if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
    message.error('请输入正确的手机号码')
    return
  }
  if (!formData.email) {
    message.error('请输入邮箱')
    return
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    message.error('请输入正确的邮箱格式')
    return
  }

  submitLoading.value = true
  try {
    const submitData = {
      ...formData,
      customerId: parseInt(formData.customerId)
    }
    if (isEdit.value && currentEditId.value) {
      await updateContact(currentEditId.value, submitData)
      message.success('修改成功')
    } else {
      await createContact(submitData)
      message.success('添加成功')
    }
    showModal.value = false
    loadContacts()
  } catch (error: any) {
    message.error(error.message || '操作失败')
  } finally {
    submitLoading.value = false
  }
}

const handleDelete = async (id: number) => {
  try {
    await deleteContact(id)
    message.success('删除成功')
    selectedIds.value = selectedIds.value.filter(item => item !== id)
    loadContacts()
  } catch (error: any) {
    message.error(error.message || '删除失败')
  }
}

const handleBatchDelete = async () => {
  if (selectedIds.value.length === 0) {
    message.warning('请选择要删除的联系人')
    return
  }
  
  try {
    for (const id of selectedIds.value) {
      await deleteContact(id)
    }
    message.success(`成功删除 ${selectedIds.value.length} 条记录`)
    selectedIds.value = []
    loadContacts()
  } catch (error: any) {
    message.error(error.message || '批量删除失败')
  }
}

const handleBatchStatusUpdate = async () => {
  if (!batchStatusForm.status) {
    message.warning('请选择目标状态')
    return
  }
  if (selectedIds.value.length === 0) {
    message.warning('请选择要修改的联系人')
    return
  }
  
  batchLoading.value = true
  try {
    for (const id of selectedIds.value) {
      await updateContact(id, { status: batchStatusForm.status })
    }
    message.success(`成功修改 ${selectedIds.value.length} 条记录状态`)
    showBatchStatusModal.value = false
    selectedIds.value = []
    loadContacts()
  } catch (error: any) {
    message.error(error.message || '批量修改状态失败')
  } finally {
    batchLoading.value = false
  }
}

const handleBatchExport = () => {
  if (selectedIds.value.length === 0) {
    message.warning('请选择要导出的联系人')
    return
  }
  
  const headers = ['姓名', '所属客户', '联系电话', '邮箱', '职位', '状态', '创建时间']
  const rows = contactList.value
    .filter(item => selectedIds.value.includes(item.id))
    .map(item => [
      item.name,
      item.customerName || '',
      item.phone,
      item.email,
      item.position || '',
      getStatusText(item.status),
      formatDate(item.createdAt)
    ])
  
  const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n')
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `联系人_${new Date().toISOString().split('T')[0]}.csv`
  link.click()
  
  message.success(`成功导出 ${selectedIds.value.length} 条记录`)
  selectedIds.value = []
}

let resizeColumn = ''
let startX = 0
let startWidth = 0

const startResize = (column: string, event: MouseEvent) => {
  resizeColumn = column
  startX = event.clientX
  startWidth = columnWidths[column as keyof typeof columnWidths]
  document.addEventListener('mousemove', onResize)
  document.addEventListener('mouseup', stopResize)
}

const onResize = (event: MouseEvent) => {
  if (!resizeColumn) return
  const deltaX = event.clientX - startX
  const newWidth = Math.max(80, startWidth + deltaX)
  columnWidths[resizeColumn as keyof typeof columnWidths] = newWidth
}

const stopResize = () => {
  resizeColumn = ''
  document.removeEventListener('mousemove', onResize)
  document.removeEventListener('mouseup', stopResize)
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

const loadContacts = async () => {
  loading.value = true
  console.log('loadContacts called, keyword:', searchKeyword.value, 'page:', pagination.page)
  try {
    const params = {
      page: pagination.page,
      size: pagination.pageSize,
      keyword: searchKeyword.value || undefined
    }
    console.log('Request params:', params)
    const response = await getContacts(params)
    console.log('Contacts response:', response)
    const data = response as any
    if (data.list && Array.isArray(data.list)) {
      contactList.value = data.list.map((item: any) => {
        let customerName = item.customerName
        if (!customerName && item.customerId) {
          const customer = allCustomers.value.find(c => c.id === item.customerId)
          customerName = customer ? customer.name : '未知客户'
        }
        return {
          ...item,
          customerName: customerName || '未知客户',
          status: item.status || 'active'
        }
      })
      pagination.total = data.total || 0
    } else {
      console.warn('Unexpected response format:', data)
      contactList.value = []
      pagination.total = 0
    }
  } catch (error) {
    console.error('加载联系人失败', error)
    contactList.value = []
    pagination.total = 0
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  console.log('ContactList mounted')
  await loadCustomerOptions()
  console.log('calling loadContacts')
  await loadContacts()
})

onUnmounted(() => {
  document.removeEventListener('mousemove', onResize)
  document.removeEventListener('mouseup', stopResize)
})
</script>