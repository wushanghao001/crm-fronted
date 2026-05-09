<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-bold text-gray-800 dark:text-white">客户管理</h2>
        <p class="text-gray-500 dark:text-gray-400 mt-1">管理所有客户信息</p>
      </div>
      <NButton v-if="listType === 'mine'" type="primary" @click="handleAdd" class="bg-blue-500 hover:bg-blue-600">
        <Add class="w-4 h-4 mr-2" />
        添加客户
      </NButton>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div class="p-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center gap-4">
          <NTabs v-model:value="listType" type="line" @update:value="handleListTypeChange">
            <NTab name="mine">我的客户</NTab>
            <NTab name="public">公海客户</NTab>
          </NTabs>
          <div class="flex items-center gap-3 flex-1 justify-end">
            <NInput
              v-model:value="searchKeyword"
              placeholder="搜索客户名称或电话"
              style="width: 300px;"
              @keyup.enter="handleSearch"
            />
            <NSelect
              v-model:value="statusFilter"
              placeholder="全部"
              style="width: 160px;"
              :options="statusOptions"
            />
            <NButton type="primary" @click="handleSearch">搜索</NButton>
            <NButton @click="handleReset">重置</NButton>
          </div>
        </div>
      </div>

      <div class="p-4">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-200">
              <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">客户名称</th>
              <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">等级</th>
              <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">联系电话</th>
              <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">邮箱</th>
              <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">地址</th>
              <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">行业</th>
              <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">规模</th>
              <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">状态</th>
              <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">创建时间</th>
              <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="customer in customerList"
              :key="customer.id"
              class="border-b border-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <td class="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">{{ customer.name }}</td>
              <td class="py-3 px-4">
                <span>{{ customer.customerLevel ? levelOptions.find(l => l.value === customer.customerLevel)?.label : '-' }}</span>
              </td>
              <td class="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{{ customer.phone }}</td>
              <td class="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{{ customer.email }}</td>
              <td class="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{{ customer.address }}</td>
              <td class="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{{ customer.industry }}</td>
              <td class="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{{ customer.scale }}</td>
              <td class="py-3 px-4 text-sm">
                <span :class="getStatusClass(customer.status)">{{ getStatusText(customer.status) }}</span>
              </td>
              <td class="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{{ customer.createdAt }}</td>
              <td class="py-3 px-4 text-sm">
                <template v-if="listType === 'mine'">
                  <NButton size="small" type="primary" @click="handleEdit(customer)" class="mr-2">编辑</NButton>
                  <NButton size="small" type="warning" @click="handleFollowUp(customer)" class="mr-2">跟进</NButton>
                  <NPopconfirm @positive-click="() => handleDeleteConfirm(customer.id)">
                    <template #trigger>
                      <NButton size="small" type="error">删除</NButton>
                    </template>
                    确定要删除该客户吗？
                  </NPopconfirm>
                </template>
                <template v-else>
                  <NButton size="small" type="success" @click="handleClaim(customer)">认领</NButton>
                </template>
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
          @update:page-size="handlePageSizeChange"
          :page-sizes="[10, 20, 50]"
          show-size-picker
        />
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
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { NButton, NInput, NSelect, NPagination, NModal, NForm, NFormItem, NPopconfirm, NTabs, NTab, useMessage } from 'naive-ui'
import { Add } from '@vicons/ionicons5'
import { getCustomers, createCustomer, updateCustomer, deleteCustomer, claimCustomer } from '@/api/customer'
import { message } from '@/utils/message'

const route = useRoute()
const router = useRouter()
const messageInst = useMessage()

const listType = ref<'mine' | 'public'>('mine')
const searchKeyword = ref('')
const statusFilter = ref('')
const loading = ref(false)
const customerList = ref<any[]>([])

const showModal = ref(false)
const isEdit = ref(false)
const submitLoading = ref(false)
const currentEditId = ref<number | null>(null)

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
  total: 0
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

const handleFollowUp = (customer: any) => {
  router.push(`/dashboard/customers/${customer.id}/follow`)
}

const getStatusText = (status: string) => {
  return statusMap[status]?.text || status
}

const getStatusClass = (status: string) => {
  return statusMap[status]?.class || 'px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700'
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
  pagination.page = page
  loadCustomers()
}

const handlePageSizeChange = (pageSize: number) => {
  pagination.pageSize = pageSize
  pagination.page = 1
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