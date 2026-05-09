<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-bold text-gray-800 dark:text-white">销售机会管理</h2>
        <p class="text-gray-500 dark:text-gray-400 mt-1">追踪和管理销售机会</p>
      </div>
      <NButton type="primary" class="bg-blue-500 hover:bg-blue-600" @click="openAddModal">
        <Add class="w-4 h-4 mr-2" />
        添加机会
      </NButton>
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
      <div class="p-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex flex-wrap gap-4">
          <div class="flex-1 min-w-[200px]">
            <NInput
              v-model:value="searchKeyword"
              placeholder="搜索客户名称或机会名称"
              class="w-full"
              @keyup.enter="handleSearch"
            />
          </div>
          <NSelect
            v-model:value="stageFilter"
            placeholder="销售阶段"
            class="w-40"
            :options="stageOptions"
          />
          <NButton type="primary" @click="handleSearch">搜索</NButton>
          <NButton @click="handleReset">重置</NButton>
        </div>
      </div>

      <div class="p-4">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-200">
              <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">机会名称</th>
              <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">客户名称</th>
              <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">销售阶段</th>
              <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">金额</th>
              <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">成功率</th>
              <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">预计成交</th>
              <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in opportunityList"
              :key="item.id"
              class="border-b border-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <td class="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">{{ item.name }}</td>
              <td class="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{{ item.customerName || '未知客户' }}</td>
              <td class="py-3 px-4 text-sm">
                <span :class="getStageClass(item.stage)">{{ getStageText(item.stage) }}</span>
              </td>
              <td class="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">¥{{ item.amount }}</td>
              <td class="py-3 px-4 text-sm">
                <div class="flex items-center">
                  <div class="w-16 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                    <div class="h-full bg-green-500" :style="{ width: item.probability + '%' }"></div>
                  </div>
                  <span class="ml-2 text-sm">{{ item.probability }}%</span>
                </div>
              </td>
              <td class="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{{ item.expectedCloseDate }}</td>
              <td class="py-3 px-4 text-sm">
                <NButton size="small" type="primary" class="mr-2" @click="openEditModal(item)">编辑</NButton>
                <NButton size="small" type="error" @click="handleDelete(item.id)">删除</NButton>
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
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { NButton, NInput, NSelect, NPagination, NModal, NForm, NFormItem, NDatePicker, NTooltip } from 'naive-ui'
import { Add } from '@vicons/ionicons5'
import { getOpportunities, createOpportunity, updateOpportunity, deleteOpportunity } from '@/api/opportunity'
import { message } from '@/utils/message'
import { useAuthStore } from '@/stores/auth'
import { getCustomers } from '@/api/customer'

const authStore = useAuthStore()
const searchKeyword = ref('')
const stageFilter = ref('')
const loading = ref(false)

const showAddModal = ref(false)
const showEditModal = ref(false)
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
    await createOpportunity({
      customerId: formData.customerId,
      name: formData.name,
      stage: formData.stage,
      amount: formData.amount,
      probability: formData.probability,
      expectedCloseDate: formData.expectedCloseDate ? new Date(formData.expectedCloseDate).toISOString() : null,
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
    await updateOpportunity(editFormData.id, {
      customerId: editFormData.customerId,
      name: editFormData.name,
      stage: editFormData.stage,
      amount: editFormData.amount,
      probability: editFormData.probability,
      expectedCloseDate: editFormData.expectedCloseDate ? new Date(editFormData.expectedCloseDate).toISOString() : null,
      description: editFormData.description
    })
    message.success('更新成功')
    showEditModal.value = false
    loadOpportunities()
  } catch (error) {
    message.error('更新失败')
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
  total: 0
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
      ownerId: item.ownerId
    }))
    pagination.total = data.total || 0

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
  pagination.page = page
  loadOpportunities()
}

onMounted(() => {
  loadOpportunities()
})
</script>
