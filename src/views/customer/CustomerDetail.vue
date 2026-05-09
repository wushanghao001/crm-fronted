<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-bold text-gray-800 dark:text-white">客户详情</h2>
        <p class="text-gray-500 dark:text-gray-400 mt-1">{{ customer.name }}</p>
      </div>
      <div class="flex space-x-4">
        <NButton type="primary" @click="handleEdit">
          <EditIcon class="w-4 h-4 mr-2" />
          编辑
        </NButton>
        <NButton @click="handleBack">
          <ArrowBack class="w-4 h-4 mr-2" />
          返回
        </NButton>
      </div>
    </div>
    
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <p class="text-gray-500 dark:text-gray-400 text-sm mb-1">客户名称</p>
          <p class="text-gray-800 dark:text-white font-medium">{{ customer.name }}</p>
        </div>
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <p class="text-gray-500 dark:text-gray-400 text-sm mb-1">联系电话</p>
          <p class="text-gray-800 dark:text-white font-medium">{{ customer.phone }}</p>
        </div>
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <p class="text-gray-500 dark:text-gray-400 text-sm mb-1">邮箱</p>
          <p class="text-gray-800 dark:text-white font-medium">{{ customer.email }}</p>
        </div>
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <p class="text-gray-500 dark:text-gray-400 text-sm mb-1">状态</p>
          <span 
            class="px-2 py-1 rounded-full text-xs"
            :class="statusClass"
          >
            {{ statusLabel }}
          </span>
        </div>
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <p class="text-gray-500 dark:text-gray-400 text-sm mb-1">行业</p>
          <p class="text-gray-800 dark:text-white font-medium">{{ customer.industry }}</p>
        </div>
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <p class="text-gray-500 dark:text-gray-400 text-sm mb-1">规模</p>
          <p class="text-gray-800 dark:text-white font-medium">{{ customer.scale }}</p>
        </div>
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <p class="text-gray-500 dark:text-gray-400 text-sm mb-1">创建时间</p>
          <p class="text-gray-800 dark:text-white font-medium">{{ customer.createdAt }}</p>
        </div>
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <p class="text-gray-500 dark:text-gray-400 text-sm mb-1">更新时间</p>
          <p class="text-gray-800 dark:text-white font-medium">{{ customer.updatedAt }}</p>
        </div>
      </div>
      
      <div class="mt-6">
        <p class="text-gray-500 dark:text-gray-400 text-sm mb-2">地址</p>
        <p class="text-gray-800 dark:text-white">{{ customer.address }}</p>
      </div>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">联系人</h3>
        <NTable :columns="contactColumns" :data="contacts" :pagination="false" />
      </div>
      
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">最近订单</h3>
        <NTable :columns="orderColumns" :data="orders" :pagination="false" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { NButton, NTable } from 'naive-ui'
import { ArrowBack, Pencil } from '@vicons/ionicons5'
import { getCustomerById } from '@/api/customer'

const customer = reactive({
  id: 0,
  name: '',
  phone: '',
  email: '',
  address: '',
  industry: '',
  scale: '',
  status: '',
  createdAt: '',
  updatedAt: ''
})

const contacts = ref([
  { name: '张经理', phone: '138****1234', position: '采购总监', email: 'zhang@company.com' },
  { name: '李助理', phone: '139****5678', position: '行政助理', email: 'li@company.com' }
])

const orders = ref([
  { orderNo: 'ORD20240115001', product: '企业版套餐', amount: '¥12,800', status: '已完成', createdAt: '2024-01-15' },
  { orderNo: 'ORD20240110002', product: '专业版套餐', amount: '¥8,600', status: '已完成', createdAt: '2024-01-10' }
])

const contactColumns = [
  { title: '姓名', key: 'name' },
  { title: '电话', key: 'phone' },
  { title: '职位', key: 'position' },
  { title: '邮箱', key: 'email' }
]

const orderColumns = [
  { title: '订单编号', key: 'orderNo' },
  { title: '产品', key: 'product' },
  { title: '金额', key: 'amount' },
  { title: '状态', key: 'status' },
  { title: '创建时间', key: 'createdAt' }
]

const statusMap: Record<string, { label: string; class: string }> = {
  'active': { label: '活跃', class: 'bg-green-100 text-green-700' },
  'potential': { label: '潜在', class: 'bg-yellow-100 text-yellow-700' },
  'warning': { label: '流失预警', class: 'bg-orange-100 text-orange-700' },
  'churned': { label: '已流失', class: 'bg-red-100 text-red-700' }
}

const statusLabel = computed(() => statusMap[customer.status]?.label || customer.status)
const statusClass = computed(() => statusMap[customer.status]?.class || 'bg-gray-100 text-gray-700')

const handleBack = () => {
  window.location.href = '/dashboard/customers'
}

const handleEdit = () => {
  const id = window.location.pathname.split('/').pop()
  window.location.href = `/dashboard/customers/${id}/edit`
}

const loadCustomer = async () => {
  const id = parseInt(window.location.pathname.split('/').pop() || '1')
  try {
    const response = await getCustomerById(id)
    Object.assign(customer, response.data)
  } catch (error) {
    console.error('加载客户信息失败', error)
    customer.id = 1
    customer.name = '北京科技有限公司'
    customer.phone = '13800138001'
    customer.email = 'contact@bjtech.com'
    customer.address = '北京市海淀区中关村大街1号科技大厦A座18层'
    customer.industry = '科技'
    customer.scale = '大型'
    customer.status = 'active'
    customer.createdAt = '2024-01-15 10:30:00'
    customer.updatedAt = '2024-01-20 14:20:00'
  }
}

onMounted(() => {
  loadCustomer()
})
</script>
