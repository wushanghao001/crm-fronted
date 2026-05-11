<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-bold text-gray-800 dark:text-white">客户管理</h2>
        <p class="text-gray-500 dark:text-gray-400 mt-1">管理所有客户信息</p>
      </div>
      <div class="flex gap-3">
        <NButton v-if="selectedIds.length > 0 && listType === 'mine'" type="error" @click="handleBatchDelete">
          <DeleteIcon class="w-4 h-4 mr-2" />
          批量删除 ({{ selectedIds.length }})
        </NButton>
        <NButton v-if="listType === 'mine'" type="primary" @click="handleAdd" class="bg-blue-500 hover:bg-blue-600">
          <Add class="w-4 h-4 mr-2" />
          添加客户
        </NButton>
      </div>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 flex-wrap gap-4">
        <NTabs v-model:value="listType" type="line" @update:value="handleListTypeChange">
          <NTab name="mine">{{ authStore.hasRole('admin') ? '已被认领客户' : '我的客户' }}</NTab>
          <NTab name="public">公海客户</NTab>
        </NTabs>
        <div class="flex items-center gap-3" style="min-width: 480px;">
          <NInput
            v-model:value="searchKeyword"
            placeholder="搜索客户名称或电话"
            style="width: 200px;"
            @keyup.enter="handleSearch"
          />
          <NSelect
            v-model:value="statusFilter"
            placeholder="全部"
            style="width: 100px;"
            :options="statusOptions"
          />
          <NButton type="primary" @click="handleSearch">搜索</NButton>
          <NButton @click="handleReset">重置</NButton>
        </div>
      </div>

      <!-- DataTable 容器 -->
      <div class="table-container">
        <NDataTable
          ref="dataTableRef"
          :columns="columns"
          :data="customerList"
          :loading="loading"
          :pagination="false"
          :scroll-x="1500"
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

    <NModal v-model:show="showModal" preset="card" :title="isEdit ? '编辑客户' : '添加客户'" style="width: 500px;">
      <NForm :model="formData" label-placement="left" label-width="80px">
        <NFormItem label="客户名称">
          <NInput v-model:value="formData.name" placeholder="请输入客户名称" />
        </NFormItem>
        <NFormItem label="联系电话">
          <NInput v-model:value="formData.phone" placeholder="请输入联系电话" />
        </NFormItem>
        <NFormItem label="邮箱">
          <NInput v-model:value="formData.email" placeholder="请输入邮箱" />
        </NFormItem>
        <NFormItem label="地址">
          <NInput v-model:value="formData.address" placeholder="请输入地址" />
        </NFormItem>
        <NFormItem label="行业">
          <NSelect v-model:value="formData.industry" :options="industryOptions" placeholder="请选择行业" />
        </NFormItem>
        <NFormItem label="规模">
          <NSelect v-model:value="formData.scale" :options="scaleOptions" placeholder="请选择规模" />
        </NFormItem>
        <NFormItem label="状态">
          <NSelect v-model:value="formData.status" :options="statusOptions.filter(s => s.value)" placeholder="请选择状态" />
        </NFormItem>
        <NFormItem v-if="formData.status === 'churned'" label="流失原因">
          <NSelect v-model:value="formData.churnReason" :options="churnReasonOptions" placeholder="请选择流失原因" />
        </NFormItem>
        <NFormItem label="客户等级">
          <NSelect v-model:value="formData.customerLevel" :options="levelOptions" placeholder="请选择客户等级" />
        </NFormItem>
      </NForm>
      <template #footer>
        <div class="flex justify-end gap-2">
          <NButton @click="showModal = false">取消</NButton>
          <NButton type="primary" @click="handleSubmit" :loading="submitLoading">确定</NButton>
        </div>
      </template>
    </NModal>

    <NModal v-model:show="showBatchDeleteModal" preset="dialog" title="确认删除" positive-text="确定" negative-text="取消"
      @positive-click="confirmBatchDelete"
      @negative-click="showBatchDeleteModal = false"
      :loading="batchDeleteLoading">
      <template #content>
        <p>确定要删除选中的 {{ selectedIds.length }} 个客户吗？此操作不可撤销。</p>
      </template>
    </NModal>

    <NModal v-model:show="showAssignModal" preset="card" title="分配客户" style="width: 400px;">
      <NForm :model="{}" label-placement="left" label-width="80px">
        <NFormItem label="客户名称">
          <span class="text-gray-700">{{ currentAssignCustomer?.name }}</span>
        </NFormItem>
        <NFormItem label="选择用户">
          <NSelect
            v-model:value="assignUserId"
            :options="allUsers.map(u => ({ label: u.username, value: u.id }))"
            placeholder="请选择要分配的用户"
            style="width: 100%;"
          />
        </NFormItem>
      </NForm>
      <template #footer>
        <div class="flex justify-end gap-3">
          <NButton @click="showAssignModal = false">取消</NButton>
          <NButton type="primary" :loading="assignLoading" @click="confirmAssign">确认分配</NButton>
        </div>
      </template>
    </NModal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, h } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { NButton, NInput, NSelect, NPagination, NModal, NForm, NFormItem, NPopconfirm, NTabs, NTab, NDataTable, NSpace, NCard } from 'naive-ui'
import { Add, Pencil as EditIcon, ArrowBack as FollowIcon, Trash as DeleteIcon, PersonAdd as ClaimIcon, People as AssignIcon } from '@vicons/ionicons5'
import { getCustomers, createCustomer, updateCustomer, deleteCustomer, claimCustomer, batchDeleteCustomers, assignCustomer, getAllUsers } from '@/api/customer'
import { message } from '@/utils/message'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()

const listType = ref<'mine' | 'public'>('mine')
const searchKeyword = ref('')
const statusFilter = ref('')
const loading = ref(false)
const customerList = ref<any[]>([])
const dataTableRef = ref()
const selectedIds = ref<number[]>([])

const showModal = ref(false)
const showBatchDeleteModal = ref(false)
const showAssignModal = ref(false)
const isEdit = ref(false)
const submitLoading = ref(false)
const batchDeleteLoading = ref(false)
const assignLoading = ref(false)
const currentEditId = ref<number | null>(null)
const currentAssignCustomer = ref<any>(null)
const assignUserId = ref<number | null>(null)
const allUsers = ref<{ id: number; username: string; role: string }[]>([])

const formData = reactive({
  name: '',
  phone: '',
  email: '',
  address: '',
  industry: '',
  scale: '',
  status: '',
  churnReason: '',
  customerLevel: ''
})

const pagination = reactive({
  page: 1,
  pageSize: 10,
  pageCount: 1,
  total: 0,
  showSizePicker: true,
  pageSizes: [10, 20, 50, 100]
})

const statusOptions = [
  { label: '全部', value: '' },
  { label: '活跃', value: 'active' },
  { label: '潜在', value: 'potential' },
  { label: '流失预警', value: 'warning' },
  { label: '已流失', value: 'churned' }
]

const churnReasonOptions = [
  { label: '价格', value: '价格' },
  { label: '服务', value: '服务' },
  { label: '竞品', value: '竞品' },
  { label: '产品', value: '产品' },
  { label: '其他', value: '其他' }
]

const levelOptions = [
  { label: 'A级', value: 'A' },
  { label: 'B级', value: 'B' },
  { label: 'C级', value: 'C' },
  { label: 'D级', value: 'D' }
]

const scaleOptions = [
  { label: '小型', value: '小型' },
  { label: '中型', value: '中型' },
  { label: '大型', value: '大型' }
]

const industryOptions = [
  { label: '科技', value: '科技' },
  { label: '贸易', value: '贸易' },
  { label: '制造', value: '制造' },
  { label: '互联网', value: '互联网' },
  { label: '金融', value: '金融' },
  { label: '其他', value: '其他' }
]

const statusMap: Record<string, { text: string; class: string }> = {
  'active': { text: '活跃', class: 'px-2 py-1 rounded-full text-xs bg-green-100 text-green-700' },
  'potential': { text: '潜在', class: 'px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700' },
  'warning': { text: '流失预警', class: 'px-2 py-1 rounded-full text-xs bg-red-100 text-red-700' },
  'churned': { text: '已流失', class: 'px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700' }
}

const levelMap: Record<string, string> = {
  'A': 'A级',
  'B': 'B级',
  'C': 'C级',
  'D': 'D级'
}

const getStatusText = (status: string) => {
  return statusMap[status]?.text || status
}

const getStatusClass = (status: string) => {
  return statusMap[status]?.class || 'px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700'
}

const renderActions = (customer: any) => {
  if (listType.value === 'mine') {
    return h('div', { class: 'flex items-center gap-2' }, [
      h(NButton, { size: 'small', type: 'primary', onClick: () => handleEdit(customer) }, {
        default: () => '编辑',
        icon: () => h(EditIcon, { class: 'w-3 h-3 mr-1' })
      }),
      h(NButton, { size: 'small', type: 'info', onClick: () => handleFollowUp(customer) }, {
        default: () => '跟进',
        icon: () => h(FollowIcon, { class: 'w-3 h-3 mr-1' })
      }),
      h(NPopconfirm, {
        title: `确定要删除客户 ${customer.name} 吗？`,
        onPositiveClick: () => handleDeleteConfirm(customer.id)
      }, {
        trigger: () => h(NButton, { size: 'small', type: 'error' }, {
          default: () => '删除',
          icon: () => h(DeleteIcon, { class: 'w-3 h-3 mr-1' })
        })
      })
    ])
  } else {
    const buttons = []
    if (authStore.hasRole('admin')) {
      buttons.push(
        h(NButton, { size: 'small', type: 'warning', onClick: () => handleAssign(customer) }, {
          default: () => '分配',
          icon: () => h(AssignIcon, { class: 'w-3 h-3 mr-1' })
        })
      )
    }
    buttons.push(
      h(NButton, { size: 'small', type: 'success', onClick: () => handleClaim(customer) }, {
        default: () => '认领',
        icon: () => h(ClaimIcon, { class: 'w-3 h-3 mr-1' })
      })
    )
    return h('div', { class: 'flex items-center gap-2' }, buttons)
  }
}

const columns = [
  { type: 'selection', width: 50, fixed: 'left' },
  { title: '序号', key: 'index', width: 60, fixed: 'left',
    render: (row: any, index: number) => h('span', index + 1) },
  { title: '客户名称', key: 'name', width: 150, fixed: 'left', ellipsis: { tooltip: true } },
  { title: '等级', key: 'customerLevel', width: 80,
    render: (row: any) => h('span', { class: 'text-gray-600' }, levelMap[row.customerLevel] || '-') },
  { title: '联系电话', key: 'phone', width: 120, ellipsis: { tooltip: true } },
  { title: '邮箱', key: 'email', width: 180, ellipsis: { tooltip: true } },
  { title: '地址', key: 'address', width: 150, ellipsis: { tooltip: true } },
  { title: '行业', key: 'industry', width: 100 },
  { title: '规模', key: 'scale', width: 80 },
  { title: '状态', key: 'status', width: 100,
    render: (row: any) => h('span', { class: getStatusClass(row.status) }, getStatusText(row.status)) },
  { title: '创建时间', key: 'createdAt', width: 140 },
  { title: '操作', key: 'actions', width: 250, fixed: 'right',
    render: (row: any) => renderActions(row) }
]

const handleListTypeChange = (type: 'mine' | 'public') => {
  listType.value = type
  pagination.page = 1
  loadCustomers()
}

const handleClaim = async (customer: any) => {
  try {
    await claimCustomer(customer.id)
    message.success('认领成功')
    loadCustomers()
  } catch (error: any) {
    message.error(error.message || '认领失败')
  }
}

const handleAssign = async (customer: any) => {
  currentAssignCustomer.value = customer
  assignUserId.value = null
  try {
    const users = await getAllUsers()
    allUsers.value = (users as any).filter((u: any) => u.role !== 'admin')
    showAssignModal.value = true
  } catch (error: any) {
    message.error('获取用户列表失败')
  }
}

const confirmAssign = async () => {
  if (!assignUserId.value) {
    message.warning('请选择要分配的用户')
    return
  }
  try {
    assignLoading.value = true
    await assignCustomer(currentAssignCustomer.value.id, assignUserId.value)
    message.success('分配成功')
    showAssignModal.value = false
    loadCustomers()
  } catch (error: any) {
    message.error(error.message || '分配失败')
  } finally {
    assignLoading.value = false
  }
}

const handleFollowUp = (customer: any) => {
  router.push(`/dashboard/customers/${customer.id}/follow`)
}

const handleSearch = () => {
  pagination.page = 1
  loadCustomers()
}

const handleReset = () => {
  searchKeyword.value = ''
  statusFilter.value = ''
  pagination.page = 1
  loadCustomers()
}

const handlePageChange = (page: number) => {
  const totalPages = Math.ceil(pagination.total / pagination.pageSize) || 1
  if (page < 1) page = 1
  if (page > totalPages) page = totalPages
  pagination.page = page
  loadCustomers()
}

const handlePageSizeChange = (pageSize: number) => {
  pagination.pageSize = pageSize
  pagination.page = 1
  pagination.pageCount = Math.ceil(pagination.total / pagination.pageSize) || 1
  loadCustomers()
}

const handleAdd = () => {
  isEdit.value = false
  currentEditId.value = null
  Object.assign(formData, { name: '', phone: '', email: '', address: '', industry: '', scale: '', status: '', churnReason: '', customerLevel: '' })
  showModal.value = true
}

const handleEdit = (row: any) => {
  isEdit.value = true
  currentEditId.value = row.id
  Object.assign(formData, {
    name: row.name,
    phone: row.phone,
    email: row.email,
    address: row.address,
    industry: row.industry,
    scale: row.scale,
    status: row.status,
    churnReason: row.churnReason || '',
    customerLevel: row.customerLevel
  })
  showModal.value = true
}

const handleSubmit = async () => {
  if (!formData.name) {
    message.error('请输入客户名称')
    return
  }
  if (!formData.phone) {
    message.error('请输入联系电话')
    return
  }

  submitLoading.value = true
  try {
    if (isEdit.value && currentEditId.value) {
      await updateCustomer(currentEditId.value, formData)
      message.success('修改成功')
    } else {
      await createCustomer(formData)
      message.success('添加成功')
    }
    showModal.value = false
    loadCustomers()
  } catch (error: any) {
    message.error(error.message || '操作失败')
  } finally {
    submitLoading.value = false
  }
}

const handleDeleteConfirm = async (id: number) => {
  try {
    await deleteCustomer(id)
    message.success('删除成功')
    loadCustomers()
  } catch (error: any) {
    message.error(error.message || '删除失败')
  }
}

const handleCheckedRowKeysChange = (keys: number[]) => {
  selectedIds.value = keys
}

const handleBatchDelete = () => {
  if (selectedIds.value.length === 0) {
    message.warning('请选择要删除的客户')
    return
  }
  showBatchDeleteModal.value = true
}

const confirmBatchDelete = async () => {
  batchDeleteLoading.value = true
  try {
    await batchDeleteCustomers(selectedIds.value)
    message.success('批量删除成功')
    selectedIds.value = []
    showBatchDeleteModal.value = false
    loadCustomers()
  } catch (error: any) {
    message.error(error.message || '批量删除失败')
  } finally {
    batchDeleteLoading.value = false
    showBatchDeleteModal.value = false
  }
}

const loadCustomers = async () => {
  loading.value = true
  try {
    const response = await getCustomers({
      pageNum: pagination.page,
      pageSize: pagination.pageSize,
      keyword: searchKeyword.value || undefined,
      status: statusFilter.value || undefined,
      listType: listType.value
    })

    const data = (response as any) || {}
    customerList.value = (data.list || []).map((item: any) => ({
      id: item.id,
      name: item.name,
      phone: item.phone,
      email: item.email,
      address: item.address,
      industry: item.industry,
      scale: item.scale,
      status: item.status,
      customerLevel: item.customerLevel,
      createdAt: item.createdAt || item.created_at || '2024-01-01'
    }))
    pagination.total = data.total || 0
    pagination.pageCount = Math.ceil(pagination.total / pagination.pageSize) || 1
  } catch (error) {
    message.error('加载数据失败')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (route.query.filter === 'public') {
    listType.value = 'public'
  }
  loadCustomers()
})
</script>
