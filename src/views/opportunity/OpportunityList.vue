<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-bold text-gray-800 dark:text-white">销售机会管理</h2>
        <p class="text-gray-500 dark:text-gray-400 mt-1">追踪和管理销售机会</p>
      </div>
      <div class="flex gap-3">
        <NButton v-if="selectedIds.length > 0" type="error" @click="handleBatchDelete">
          <DeleteIcon class="w-4 h-4 mr-2" />
          批量删除 ({{ selectedIds.length }})
        </NButton>
        <NButton type="primary" class="bg-blue-500 hover:bg-blue-600" @click="openAddModal">
          <Add class="w-4 h-4 mr-2" />
          添加机会
        </NButton>
      </div>
    </div>

    <div v-if="authStore.user?.role !== 'admin'" class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div class="flex items-center gap-2 mb-4">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white">我的销售漏斗</h3>
        <NTooltip>
          <template #trigger>
            <span class="text-gray-400 cursor-help">ⓘ</span>
          </template>
          <div class="text-sm leading-relaxed">
            <p class="font-medium mb-1">取数逻辑说明：</p>
            <p>• 初步接触：销售阶段为"初步接触"的机会数量</p>
            <p>• 需求确认：销售阶段为"需求确认"的机会数量</p>
            <p>• 方案报价：销售阶段为"方案报价"的机会数量</p>
            <p>• 商务谈判：销售阶段为"商务谈判"的机会数量</p>
            <p>• 签约成交：销售阶段为"签约成交"的机会数量</p>
          </div>
        </NTooltip>
      </div>
      <div class="flex items-end justify-around h-48">
        <div v-for="stage in funnelData" :key="stage.name" class="flex flex-col items-center">
          <div
            class="bg-blue-500 rounded-t-lg transition-all hover:bg-blue-600"
            :style="{ height: (stage.value / maxFunnelValue * 150) + 'px', width: '70px' }"
          >
            <div class="h-full flex items-end justify-center pb-2">
              <span class="text-white font-bold text-sm">{{ stage.value }}</span>
            </div>
          </div>
          <span class="text-gray-600 dark:text-gray-400 text-xs mt-2">{{ stage.name }}</span>
        </div>
      </div>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 flex-wrap gap-4">
        <div class="flex items-center gap-4" style="min-width: 480px;">
          <NInput
            v-model:value="searchKeyword"
            placeholder="搜索机会名称"
            style="width: 200px;"
            @keyup.enter="handleSearch"
          />
          <NSelect
            v-model:value="stageFilter"
            placeholder="销售阶段"
            style="width: 120px;"
            :options="stageOptions"
          />
          <NButton type="primary" @click="handleSearch">搜索</NButton>
          <NButton @click="handleReset">重置</NButton>
        </div>
      </div>

      <div class="table-container">
        <NDataTable
          ref="dataTableRef"
          :columns="columns"
          :data="opportunityList"
          :loading="loading"
          :pagination="false"
          :scroll-x="1200"
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

    <NModal v-model:show="showAddModal" preset="card" title="添加销售机会" style="width: 500px;">
      <NForm :model="formData" label-placement="top">
        <NFormItem label="客户名称" required>
          <NSelect v-model:value="formData.customerId" :options="customerOptions" placeholder="请选择客户" filterable @update:value="(val) => { const c = allCustomers.find(c => c.id === val); if (c) formData.customerName = c.name; }" />
        </NFormItem>
        <NFormItem label="机会名称" required>
          <NInput v-model:value="formData.name" placeholder="请输入机会名称" />
        </NFormItem>
        <NFormItem label="销售阶段">
          <NSelect v-model:value="formData.stage" :options="stageOptions.filter(s => s.value)" placeholder="请选择阶段" />
        </NFormItem>
        <NFormItem label="金额">
          <NInput v-model:value="formData.amount" type="number" placeholder="请输入金额" />
        </NFormItem>
        <NFormItem label="成功率">
          <NInput v-model:value="formData.probability" type="number" placeholder="请输入成功率%" />
        </NFormItem>
        <NFormItem label="预计成交日期">
          <NDatePicker v-model:value="formData.expectedCloseDate" type="date" placeholder="请选择日期" style="width: 100%;" />
        </NFormItem>
        <NFormItem label="描述">
          <NInput v-model:value="formData.description" type="textarea" placeholder="请输入描述" :rows="3" />
        </NFormItem>
      </NForm>
      <template #footer>
        <div class="flex justify-end gap-3">
          <NButton @click="showAddModal = false">取消</NButton>
          <NButton type="primary" @click="handleCreate">创建</NButton>
        </div>
      </template>
    </NModal>

    <NModal v-model:show="showEditModal" preset="card" title="编辑销售机会" style="width: 500px;">
      <NForm :model="editFormData" label-placement="top">
        <NFormItem label="客户名称" required>
          <NSelect v-model:value="editFormData.customerId" :options="customerOptions" placeholder="请选择客户" filterable @update:value="(val) => { const c = allCustomers.find(c => c.id === val); if (c) editFormData.customerName = c.name; }" />
        </NFormItem>
        <NFormItem label="机会名称" required>
          <NInput v-model:value="editFormData.name" placeholder="请输入机会名称" />
        </NFormItem>
        <NFormItem label="销售阶段">
          <NSelect v-model:value="editFormData.stage" :options="stageOptions.filter(s => s.value)" placeholder="请选择阶段" />
        </NFormItem>
        <NFormItem label="金额">
          <NInput v-model:value="editFormData.amount" type="number" placeholder="请输入金额" />
        </NFormItem>
        <NFormItem label="成功率">
          <NInput v-model:value="editFormData.probability" type="number" placeholder="请输入成功率%" />
        </NFormItem>
        <NFormItem label="预计成交日期">
          <NDatePicker v-model:value="editFormData.expectedCloseDate" type="date" placeholder="请选择日期" style="width: 100%;" />
        </NFormItem>
        <NFormItem label="描述">
          <NInput v-model:value="editFormData.description" type="textarea" placeholder="请输入描述" :rows="3" />
        </NFormItem>
      </NForm>
      <template #footer>
        <div class="flex justify-end gap-3">
          <NButton @click="showEditModal = false">取消</NButton>
          <NButton type="primary" @click="handleUpdate">保存</NButton>
        </div>
      </template>
    </NModal>

    <NModal v-model:show="showViewModal" preset="card" title="销售机会详情" style="width: 600px;">
      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-sm text-gray-500">机会名称</label>
            <p class="mt-1 text-gray-800 dark:text-gray-200">{{ viewData.name || '-' }}</p>
          </div>
          <div>
            <label class="text-sm text-gray-500">客户名称</label>
            <p class="mt-1 text-gray-800 dark:text-gray-200">{{ viewData.customerName || '-' }}</p>
          </div>
          <div>
            <label class="text-sm text-gray-500">销售阶段</label>
            <p class="mt-1">
              <span :class="getStageClass(viewData.stage)">{{ getStageText(viewData.stage) }}</span>
            </p>
          </div>
          <div>
            <label class="text-sm text-gray-500">金额</label>
            <p class="mt-1 text-gray-800 dark:text-gray-200">¥{{ viewData.amount || 0 }}</p>
          </div>
          <div>
            <label class="text-sm text-gray-500">成功率</label>
            <p class="mt-1 text-gray-800 dark:text-gray-200">{{ viewData.probability || 0 }}%</p>
          </div>
          <div>
            <label class="text-sm text-gray-500">预计成交日期</label>
            <p class="mt-1 text-gray-800 dark:text-gray-200">{{ viewData.expectedCloseDate || '-' }}</p>
          </div>
          <div>
            <label class="text-sm text-gray-500">创建人</label>
            <p class="mt-1 text-gray-800 dark:text-gray-200">{{ viewData.ownerName || '-' }}</p>
          </div>
          <div class="col-span-2">
            <label class="text-sm text-gray-500">描述</label>
            <p class="mt-1 text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{{ viewData.description || '暂无描述' }}</p>
          </div>
          <div>
            <label class="text-sm text-gray-500">创建时间</label>
            <p class="mt-1 text-gray-800 dark:text-gray-200">{{ viewData.createdAt || '-' }}</p>
          </div>
          <div>
            <label class="text-sm text-gray-500">更新时间</label>
            <p class="mt-1 text-gray-800 dark:text-gray-200">{{ viewData.updatedAt || '-' }}</p>
          </div>
        </div>
      </div>
      <template #footer>
        <div class="flex justify-end">
          <NButton @click="showViewModal = false">关闭</NButton>
        </div>
      </template>
    </NModal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, h } from 'vue'
import { NButton, NInput, NSelect, NPagination, NModal, NForm, NFormItem, NDatePicker, NTooltip, NDataTable, NPopconfirm } from 'naive-ui'
import { Add, Pencil as EditIcon, Trash as DeleteIcon } from '@vicons/ionicons5'
import { getOpportunities, createOpportunity, updateOpportunity, deleteOpportunity, getOpportunityById, batchDeleteOpportunities } from '@/api/opportunity'
import { message } from '@/utils/message'
import { useAuthStore } from '@/stores/auth'
import { getCustomers } from '@/api/customer'

const authStore = useAuthStore()
const dataTableRef = ref()
const searchKeyword = ref('')
const stageFilter = ref('')
const loading = ref(false)
const selectedIds = ref<number[]>([])

const showAddModal = ref(false)
const showEditModal = ref(false)
const showViewModal = ref(false)

const viewData = reactive({
  id: null as number | null,
  customerId: null as number | null,
  customerName: '',
  name: '',
  stage: '',
  amount: 0,
  probability: 0,
  expectedCloseDate: '',
  description: '',
  ownerName: '',
  createdAt: '',
  updatedAt: ''
})

const formData = reactive({
  customerId: null as number | null,
  customerName: '',
  name: '',
  stage: 'contact',
  amount: 0,
  probability: 0,
  expectedCloseDate: null as number | null,
  description: ''
})

const editFormData = reactive({
  id: null as number | null,
  customerId: null as number | null,
  customerName: '',
  name: '',
  stage: 'contact',
  amount: 0,
  probability: 0,
  expectedCloseDate: null as number | null,
  description: ''
})

const customerOptions = ref<any[]>([])
const allCustomers = ref<any[]>([])

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

const openAddModal = () => {
  loadCustomerOptions()
  showAddModal.value = true
}

const handleCreate = async () => {
  if (!formData.customerId || !formData.name) {
    message.error('请填写必填项')
    return
  }
  try {
    const expectedCloseDate = formData.expectedCloseDate ? formatDateTime(formData.expectedCloseDate) : null
    await createOpportunity({
      customerId: formData.customerId,
      name: formData.name,
      stage: formData.stage,
      amount: formData.amount,
      probability: formData.probability,
      expectedCloseDate,
      description: formData.description
    })
    message.success('添加成功')
    showAddModal.value = false
    Object.assign(formData, {
      customerId: null,
      customerName: '',
      name: '',
      stage: 'contact',
      amount: 0,
      probability: 0,
      expectedCloseDate: null,
      description: ''
    })
    loadOpportunities()
  } catch (error) {
    message.error('添加失败')
  }
}

const openEditModal = (item: any) => {
  loadCustomerOptions()
  editFormData.id = item.id
  editFormData.customerId = item.customerId
  editFormData.customerName = item.customerName
  editFormData.name = item.name
  editFormData.stage = item.stage
  editFormData.amount = item.amount
  editFormData.probability = item.probability
  editFormData.expectedCloseDate = item.expectedCloseDate ? new Date(item.expectedCloseDate).getTime() : null
  editFormData.description = item.description || ''
  showEditModal.value = true
}

const handleUpdate = async () => {
  if (!editFormData.id || !editFormData.customerId || !editFormData.name) {
    message.error('请填写必填项')
    return
  }
  try {
    const expectedCloseDate = editFormData.expectedCloseDate ? formatDateTime(editFormData.expectedCloseDate) : null
    await updateOpportunity(editFormData.id, {
      customerId: editFormData.customerId,
      name: editFormData.name,
      stage: editFormData.stage,
      amount: editFormData.amount,
      probability: editFormData.probability,
      expectedCloseDate,
      description: editFormData.description
    })
    message.success('更新成功')
    showEditModal.value = false
    loadOpportunities()
  } catch (error) {
    message.error('更新失败')
  }
}

const handleView = async (item: any) => {
  try {
    const res = await getOpportunityById(item.id) as any
    viewData.id = res.id
    viewData.customerId = res.customerId
    viewData.customerName = item.customerName || ''
    viewData.name = res.name
    viewData.stage = res.stage
    viewData.amount = res.amount
    viewData.probability = res.probability
    viewData.expectedCloseDate = res.expectedCloseDate || '-'
    viewData.description = res.description || ''
    viewData.ownerName = res.ownerName || '-'
    viewData.createdAt = res.createdAt || '-'
    viewData.updatedAt = res.updatedAt || '-'
    showViewModal.value = true
  } catch (error) {
    message.error('获取详情失败')
  }
}

const handleDelete = async (id: number) => {
  try {
    await deleteOpportunity(id)
    message.success('删除成功')
    loadOpportunities()
  } catch (error) {
    message.error('删除失败')
  }
}

const funnelData = ref([
  { name: '初步接触', value: 0 },
  { name: '需求确认', value: 0 },
  { name: '方案报价', value: 0 },
  { name: '商务谈判', value: 0 },
  { name: '签约成交', value: 0 }
])

const maxFunnelValue = computed(() => {
  return Math.max(...funnelData.value.map(d => d.value), 1)
})

const stageOptions = [
  { label: '全部', value: '' },
  { label: '初步接触', value: 'contact' },
  { label: '需求确认', value: 'requirement' },
  { label: '方案报价', value: 'proposal' },
  { label: '商务谈判', value: 'negotiation' },
  { label: '签约成交', value: 'closed' }
]

const opportunityList = ref<any[]>([])

const pagination = reactive({
  page: 1,
  pageSize: 10,
  pageCount: 1,
  total: 0,
  showSizePicker: true,
  pageSizes: [10, 20, 50, 100]
})

const stageMap: Record<string, { label: string; class: string }> = {
  'contact': { label: '初步接触', class: 'px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700' },
  'requirement': { label: '需求确认', class: 'px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700' },
  'proposal': { label: '方案报价', class: 'px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700' },
  'negotiation': { label: '商务谈判', class: 'px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-700' },
  'closed': { label: '签约成交', class: 'px-2 py-1 rounded-full text-xs bg-green-100 text-green-700' }
}

const getStageText = (stage: string) => {
  return stageMap[stage]?.label || stage
}

const getStageClass = (stage: string) => {
  return stageMap[stage]?.class || 'px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700'
}

const renderActions = (row: any) => {
  return h('div', { class: 'flex items-center gap-2' }, [
    h(NButton, { size: 'small', type: 'primary', onClick: () => handleView(row) }, { default: () => '查看' }),
    h(NButton, { size: 'small', type: 'info', onClick: () => openEditModal(row) }, { default: () => '编辑' }),
    h(NButton, { size: 'small', type: 'error', onClick: () => handleDelete(row.id) }, { default: () => '删除' })
  ])
}

const columns = [
  { type: 'selection', width: 50, fixed: 'left' },
  { title: '序号', key: 'index', width: 60, fixed: 'left',
    render: (row: any, index: number) => h('span', index + 1) },
  { title: '机会名称', key: 'name', width: 150, fixed: 'left', ellipsis: { tooltip: true } },
  { title: '客户名称', key: 'customerName', width: 120, ellipsis: { tooltip: true } },
  { title: '销售阶段', key: 'stage', width: 100,
    render: (row: any) => h('span', { class: getStageClass(row.stage) }, getStageText(row.stage)) },
  { title: '金额', key: 'amount', width: 100 },
  { title: '成功率', key: 'probability', width: 100,
    render: (row: any) => h('span', {}, `${row.probability || 0}%`) },
  { title: '预计成交', key: 'expectedCloseDate', width: 120 },
  { title: '创建人', key: 'ownerName', width: 100 },
  { title: '操作', key: 'actions', width: 180, fixed: 'right',
    render: (row: any) => renderActions(row) }
]

const formatDateTime = (timestamp: number): string => {
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

const loadOpportunities = async () => {
  loading.value = true
  try {
    const response: any = await getOpportunities({
      pageNum: pagination.page,
      pageSize: pagination.pageSize,
      keyword: searchKeyword.value || undefined,
      stage: stageFilter.value || undefined
    })

    const data = response || {}
    opportunityList.value = (data.list || []).map((item: any) => ({
      id: item.id,
      name: item.name,
      customerId: item.customerId,
      customerName: item.customerName || '未知客户',
      stage: item.stage,
      amount: item.amount,
      probability: item.probability || 0,
      expectedCloseDate: item.expectedCloseDate || '-',
      description: item.description || '',
      ownerId: item.ownerId,
      ownerName: item.ownerName || '-'
    }))
    pagination.total = data.total || 0
    pagination.pageCount = Math.ceil(pagination.total / pagination.pageSize) || 1

    updateFunnelData(data.list || [])
  } catch (error) {
    message.error('加载销售机会失败')
  } finally {
    loading.value = false
  }
}

const updateFunnelData = (list: any[]) => {
  const stageCount: Record<string, number> = {
    'contact': 0,
    'requirement': 0,
    'proposal': 0,
    'negotiation': 0,
    'closed': 0
  }

  list.forEach(item => {
    if (item.stage && stageCount[item.stage] !== undefined) {
      stageCount[item.stage]++
    }
  })

  if (authStore.user?.role !== 'admin') {
    funnelData.value = [
      { name: '初步接触', value: stageCount['contact'] || 0 },
      { name: '需求确认', value: stageCount['requirement'] || 0 },
      { name: '方案报价', value: stageCount['proposal'] || 0 },
      { name: '商务谈判', value: stageCount['negotiation'] || 0 },
      { name: '签约成交', value: stageCount['closed'] || 0 }
    ]
  }
}

const handleSearch = () => {
  pagination.page = 1
  loadOpportunities()
}

const handleReset = () => {
  searchKeyword.value = ''
  stageFilter.value = ''
  pagination.page = 1
  loadOpportunities()
}

const handlePageChange = (page: number) => {
  const totalPages = Math.ceil(pagination.total / pagination.pageSize) || 1
  if (page < 1) page = 1
  if (page > totalPages) page = totalPages
  pagination.page = page
  loadOpportunities()
}

const handlePageSizeChange = (pageSize: number) => {
  pagination.pageSize = pageSize
  pagination.page = 1
  pagination.pageCount = Math.ceil(pagination.total / pagination.pageSize) || 1
  loadOpportunities()
}

const handleCheckedRowKeysChange = (keys: number[]) => {
  selectedIds.value = keys
}

const handleBatchDelete = () => {
  if (selectedIds.value.length === 0) {
    message.warning('请选择要删除的机会')
    return
  }
  if (confirm(`确定要删除选中的 ${selectedIds.value.length} 个机会吗？此操作不可撤销。`)) {
    confirmBatchDelete()
  }
}

const confirmBatchDelete = async () => {
  try {
    await batchDeleteOpportunities(selectedIds.value)
    message.success('批量删除成功')
    selectedIds.value = []
    loadOpportunities()
  } catch (error: any) {
    message.error(error.message || '批量删除失败')
  }
}

onMounted(() => {
  loadOpportunities()
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
