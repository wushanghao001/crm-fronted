<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-bold text-gray-800 dark:text-white">工作台</h2>
      <div class="flex gap-2">
        <NButton type="default" @click="handleRefresh" :loading="refreshing">
          <template #icon>
            <Refresh />
          </template>
          刷新
        </NButton>
        <NButton type="info" @click="helpModal?.open()">
          <template #icon>
            <HelpCircle />
          </template>
          帮助手册
        </NButton>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-if="authStore.user?.role === 'admin'" class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 dark:text-gray-400 text-sm">总客户数</p>
            <p class="text-3xl font-bold text-gray-800 dark:text-white mt-2">{{ statistics.customers }}</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
            <People class="w-6 h-6 text-blue-500" />
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-md transition-shadow" @click="goToCustomers">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 dark:text-gray-400 text-sm">我的客户</p>
            <p class="text-3xl font-bold text-gray-800 dark:text-white mt-2">{{ personalStats.myCustomers || 0 }}</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
            <People class="w-6 h-6 text-blue-500" />
          </div>
        </div>
      </div>

      <div v-if="authStore.user?.role !== 'admin'" class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-md transition-shadow" @click="goToPublicCustomers">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 dark:text-gray-400 text-sm">公海客户</p>
            <p class="text-3xl font-bold text-gray-800 dark:text-white mt-2">{{ personalStats.publicCustomers || 0 }}</p>
          </div>
          <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
            <PersonAdd class="w-6 h-6 text-green-500" />
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-md transition-shadow" @click="goToMyOrders">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 dark:text-gray-400 text-sm">我的订单</p>
            <p class="text-3xl font-bold text-gray-800 dark:text-white mt-2">{{ personalStats.myOrders || 0 }}</p>
          </div>
          <div class="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
            <Cart class="w-6 h-6 text-yellow-500" />
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-md transition-shadow" @click="goToPendingServices">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 dark:text-gray-400 text-sm">待处理工单</p>
            <p class="text-3xl font-bold text-gray-800 dark:text-white mt-2">{{ personalStats.pendingServices || 0 }}</p>
          </div>
          <div class="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
            <Time class="w-6 h-6 text-red-500" />
          </div>
        </div>
      </div>
    </div>

    <SalesFunnel
      v-if="funnelReady"
      :external-funnel-data="funnelData"
      :external-trend-data="trendData"
      :external-time-range="funnelTimeRange"
      :auto-load="false"
      @timeRangeChange="handleFunnelTimeRangeChange"
    />

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div v-if="authStore.user?.role === 'admin'" class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">客户趋势</h3>
        <v-chart class="h-64" :option="customerChartOption" autoresize />
      </div>

      <div v-if="authStore.user?.role === 'admin'" class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">销售排行</h3>
        <div class="space-y-3">
          <div v-for="(item, index) in salesTop" :key="index" class="flex items-center space-x-4">
            <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                 :class="index < 3 ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'">
              {{ index + 1 }}
            </div>
            <div class="flex-1">
              <p class="text-gray-800 dark:text-white font-medium">{{ item.name }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ item.product }}</p>
            </div>
            <p class="text-gray-800 dark:text-white font-bold">{{ item.amount }}</p>
          </div>
        </div>
      </div>

      <div v-if="authStore.user?.role !== 'admin'" class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">我的最近跟进</h3>
        <div class="space-y-3">
          <div v-for="(item, index) in recentInteractions" :key="index" class="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
            <div class="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <ChatboxEllipses class="w-4 h-4 text-blue-500" />
            </div>
            <div class="flex-1">
              <p class="text-gray-800 dark:text-white font-medium">{{ item.customerName }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ item.content }}</p>
            </div>
            <span class="text-xs text-gray-400">{{ item.time }}</span>
          </div>
        </div>
      </div>

      <div v-if="authStore.user?.role !== 'admin'" class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">我的待办任务</h3>
          <NButton size="small" type="primary" @click="showAddTaskModal = true">新增</NButton>
        </div>
        <div class="space-y-3">
          <div v-for="task in myTasks" :key="task.id" class="flex items-start space-x-3 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
            <input type="checkbox" :checked="task.status === 'completed'" @change="toggleTask(task)" class="w-4 h-4 rounded border-gray-300 mt-0.5" />
            <div class="flex-1 min-w-0">
              <p class="text-gray-800 dark:text-white font-medium truncate" :class="{ 'line-through text-gray-400': task.status === 'completed' }">{{ task.title }}</p>
              <p v-if="task.remark" class="text-sm text-gray-500 dark:text-gray-400 mt-1 truncate">备注: {{ task.remark }}</p>
              <div class="flex items-center gap-2 mt-2">
                <span class="text-xs text-gray-400 flex items-center gap-1">
                  <Time class="w-3 h-3" />
                  {{ task.dueDate }}
                </span>
                <span v-if="task.taskType === 'follow'" class="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded">跟进任务</span>
                <span v-else-if="task.taskType === 'personal'" class="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded">个人事务</span>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span
                class="px-2 py-1 rounded text-xs font-medium"
                :class="{
                  'bg-red-100 text-red-700': task.priority === 'high',
                  'bg-yellow-100 text-yellow-700': task.priority === 'medium',
                  'bg-green-100 text-green-700': task.priority === 'low'
                }"
              >{{ task.priority === 'high' ? '高' : task.priority === 'medium' ? '中' : '低' }}</span>
              <NButton size="tiny" type="error" @click="handleDeleteTask(task)">删除</NButton>
            </div>
          </div>
          <div v-if="myTasks.length === 0" class="text-center text-gray-400 py-4">暂无待办任务</div>
        </div>
      </div>

      <NModal v-model:show="showAddTaskModal" preset="card" title="新增任务" style="width: 400px;">
        <NForm :model="taskForm" label-placement="left" label-width="80px">
          <NFormItem label="任务标题">
            <NInput v-model:value="taskForm.title" placeholder="请输入任务标题" />
          </NFormItem>
          <NFormItem label="截止日期">
            <NDatePicker v-model:value="taskForm.dueDate" type="date" placeholder="请选择截止日期" class="w-full" />
          </NFormItem>
          <NFormItem label="优先级">
            <NSelect v-model:value="taskForm.priority" :options="priorityOptions" placeholder="请选择优先级" class="w-full" />
          </NFormItem>
        </NForm>
        <template #footer>
          <div class="flex justify-end gap-2">
            <NButton @click="showAddTaskModal = false">取消</NButton>
            <NButton type="primary" @click="handleAddTask">确定</NButton>
          </div>
        </template>
      </NModal>
    </div>

    <div v-if="authStore.user?.role === 'admin'" class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">最近客户</h3>
      <n-table :columns="columns" :data="recentCustomers" :pagination="false" />
    </div>

    <HelpModal ref="helpModal" />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Home'
})

import { ref, reactive, onMounted, onActivated, computed } from 'vue'
import { useRouter } from 'vue-router'
import { NTable, NButton, NModal, NForm, NFormItem, NInput, NSelect, NDatePicker } from 'naive-ui'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent } from 'echarts/components'
import { People, TrendingUp, Briefcase, Time, PersonAdd, Cart, ChatboxEllipses, HelpCircle, Refresh } from '@vicons/ionicons5'
import SalesFunnel from '@/components/SalesFunnel.vue'
import HelpModal from '@/components/HelpModal.vue'
import { useAuthStore } from '@/stores/auth'
import request from '@/api/request'
import { getFollowList } from '@/api/customerFollow'
import { getTaskList, createTask, deleteTask, toggleTaskStatus } from '@/api/task'
import { getFunnelData, getTrendData } from '@/api/funnel'
import { message as messageUtil } from '@/utils/message'

use([CanvasRenderer, LineChart, GridComponent, TooltipComponent])

const router = useRouter()
const authStore = useAuthStore()
const message = messageUtil

const helpModal = ref<InstanceType<typeof HelpModal> | null>(null)

const funnelLoading = ref(false)
const refreshing = ref(false)
const funnelReady = ref(false)
const statistics = reactive({
  customers: 0,
  newCustomers: 0,
  opportunities: 0,
  pendingServices: 0
})

const funnelData = ref<any>({
  leads: 0,
  contacted: 0,
  quoted: 0,
  won: 0,
  lost: 0,
  contactRate: 0,
  quoteRate: 0,
  winRate: 0,
  totalWinRate: 0
})

const trendData = ref<any>({
  dates: [],
  wonData: [],
  lostData: [],
  totalData: []
})

const funnelTimeRange = ref('week')

const personalStats = reactive({
  myCustomers: 0,
  publicCustomers: 0,
  myOrders: 0,
  pendingServices: 0
})

const myTasks = ref<any[]>([])
const showAddTaskModal = ref(false)
const taskForm = reactive({
  title: '',
  dueDate: null as number | null,
  priority: 'medium'
})

const priorityOptions = [
  { label: '高', value: 'high' },
  { label: '中', value: 'medium' },
  { label: '低', value: 'low' }
]

const recentInteractions = ref<any[]>([])

const salesTop = ref([
  { name: '张总', product: '企业版套餐', amount: '¥12,800' },
  { name: '李经理', product: '专业版套餐', amount: '¥8,600' },
  { name: '王总', product: '企业版套餐', amount: '¥12,800' },
  { name: '陈经理', product: '标准版套餐', amount: '¥3,200' },
  { name: '刘总', product: '专业版套餐', amount: '¥8,600' }
])

const recentCustomers = ref([
  { name: '北京科技有限公司', contact: '张经理', phone: '138****1234', status: '活跃', createdAt: '2024-01-15' },
  { name: '上海贸易集团', contact: '李总', phone: '139****5678', status: '活跃', createdAt: '2024-01-14' },
  { name: '广州制造公司', contact: '王经理', phone: '137****9012', status: '潜在', createdAt: '2024-01-13' },
  { name: '深圳科技有限公司', contact: '陈总', phone: '136****3456', status: '活跃', createdAt: '2024-01-12' },
  { name: '杭州互联网公司', contact: '刘经理', phone: '135****7890', status: '流失预警', createdAt: '2024-01-11' }
])

const columns = [
  { title: '客户名称', key: 'name' },
  { title: '联系人', key: 'contact' },
  { title: '联系电话', key: 'phone' },
  { title: '状态', key: 'status', render: (row: any) => {
    const statusMap: Record<string, string> = {
      '活跃': 'bg-green-100 text-green-700',
      '潜在': 'bg-yellow-100 text-yellow-700',
      '流失预警': 'bg-red-100 text-red-700'
    }
    return `<span class="px-2 py-1 rounded-full text-xs ${statusMap[row.status]}">${row.status}</span>`
  }},
  { title: '创建时间', key: 'createdAt' }
]

const customerChartOption = {
  tooltip: {
    trigger: 'axis'
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '新增客户',
      type: 'line',
      data: [120, 132, 101, 134, 190, 230, 220, 182, 191, 234, 290, 330],
      smooth: true,
      areaStyle: {
        opacity: 0.3,
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(59, 130, 246, 0.5)' },
            { offset: 1, color: 'rgba(59, 130, 246, 0.05)' }
          ]
        }
      },
      lineStyle: {
        color: '#3b82f6'
      }
    }
  ]
}

const loadPersonalStats = async () => {
  if (authStore.user?.role !== 'admin') {
    console.log('[Home] loadPersonalStats called')
    try {
      const data: any = await request.get('/stats/personal')
      console.log('[Home] loadPersonalStats response:', data)
      personalStats.myCustomers = data.myCustomers || 0
      personalStats.publicCustomers = data.publicCustomers || 0
      personalStats.myOrders = data.myOrders || 0
      personalStats.pendingServices = data.pendingServices || 0
    } catch (error) {
      console.error('Failed to load personal stats:', error)
    }
  }
}

const handleRefresh = async () => {
  refreshing.value = true
  try {
    await request.get('/home/refresh')
    await loadHomeData()
    message.success('刷新成功')
  } catch (error) {
    console.error('Failed to refresh:', error)
    message.error('刷新失败')
  } finally {
    refreshing.value = false
  }
}

const loadFunnelData = async (timeRange: string = 'week') => {
  funnelLoading.value = true
  try {
    const [funnelRes, trendRes] = await Promise.all([
      getFunnelData(timeRange),
      getTrendData(timeRange)
    ])
    if (funnelRes) {
      funnelData.value = {
        leads: funnelRes.leads ?? 0,
        contacted: funnelRes.contacted ?? 0,
        quoted: funnelRes.quoted ?? 0,
        won: funnelRes.won ?? 0,
        lost: funnelRes.lost ?? 0,
        contactRate: funnelRes.contactRate ?? 0,
        quoteRate: funnelRes.quoteRate ?? 0,
        winRate: funnelRes.winRate ?? 0,
        totalWinRate: funnelRes.totalWinRate ?? 0
      }
    }
    if (trendRes) {
      trendData.value = {
        dates: trendRes.dates || [],
        wonData: trendRes.wonData || [],
        lostData: trendRes.lostData || [],
        totalData: trendRes.totalData || []
      }
    }
  } catch (error) {
    console.error('Failed to load funnel data:', error)
  } finally {
    funnelLoading.value = false
    funnelReady.value = true
  }
}

const loadHomeData = async () => {
  if (authStore.user?.role === 'admin') return
  console.log('[Home] loadHomeData called')
  try {
    const data: any = await request.get('/home/data', { params: { timeRange: funnelTimeRange.value } })
    console.log('[Home] loadHomeData response:', data)
    
    // 个人统计数据
    if (data.personalStats) {
      personalStats.myCustomers = data.personalStats.myCustomers || 0
      personalStats.publicCustomers = data.personalStats.publicCustomers || 0
      personalStats.myOrders = data.personalStats.myOrders || 0
      personalStats.pendingServices = data.personalStats.pendingServices || 0
    }
    
    // 最近跟进记录
    if (data.recentFollows) {
      recentInteractions.value = data.recentFollows.map((item: any) => ({
        customerName: item.customerName || '未知客户',
        content: item.content || '',
        time: item.createdAt ? formatTime(item.createdAt) : ''
      }))
    }
    
    // 我的待办任务
    if (data.myTasks) {
      myTasks.value = data.myTasks.map((item: any) => ({
        id: item.id,
        title: item.title,
        remark: item.content || item.remark,
        dueDate: formatDateTime(item.dueDate),
        priority: item.priority || 'medium',
        status: item.status,
        taskType: item.taskType
      }))
    }
    
    // 销售漏斗数据
    if (data.funnelData) {
      funnelData.value = {
        leads: data.funnelData.leads || 0,
        contacted: data.funnelData.contacted || 0,
        quoted: data.funnelData.quoted || 0,
        won: data.funnelData.won || 0,
        lost: data.funnelData.lost || 0,
        contactRate: data.funnelData.contactRate || 0,
        quoteRate: data.funnelData.quoteRate || 0,
        winRate: data.funnelData.winRate || 0,
        totalWinRate: data.funnelData.totalWinRate || 0
      }
    }
    
    // 趋势数据
    if (data.trendData) {
      trendData.value = {
        dates: data.trendData.dates || [],
        wonData: data.trendData.wonData || [],
        lostData: data.trendData.lostData || [],
        totalData: data.trendData.totalData || []
      }
    }
    
    funnelReady.value = true
  } catch (error) {
    console.error('Failed to load home data:', error)
  }
}

onMounted(async () => {
  console.log('[Home] onMounted called')
  await authStore.loadUser()
  
  if (authStore.user?.role === 'admin') {
    router.push('/dashboard/admin-dashboard')
    return
  }
  
  console.log('[Home] Loading data...')
  await loadHomeData()
  console.log('[Home] Data loaded')
})

onActivated(async () => {
  console.log('[Home] onActivated called')
  // 组件从缓存中激活时，不重新加载数据
  // 数据仍然保持缓存状态
})

const goToCustomers = () => router.push('/dashboard/customers')
const goToPublicCustomers = () => router.push('/dashboard/customers?filter=public')
const goToMyOrders = () => router.push('/dashboard/orders?filter=mine')
const goToPendingServices = () => router.push('/dashboard/services?filter=my')

const handleFunnelTimeRangeChange = async (newTimeRange: string) => {
  funnelTimeRange.value = newTimeRange
  await loadFunnelData(newTimeRange)
}

const loadMyTasks = async () => {
  if (authStore.user?.role === 'admin') return
  try {
    const res: any = await getTaskList({ pageNum: 1, pageSize: 50 })
    myTasks.value = (res?.list || []).map((item: any) => ({
      id: item.id,
      title: item.title,
      remark: item.content || item.remark,
      dueDate: formatDateTime(item.dueDate),
      priority: item.priority || 'medium',
      status: item.status,
      taskType: item.taskType
    }))
  } catch (error) {
    console.error('Failed to load tasks:', error)
  }
}

const formatDateTime = (dateStr: string) => {
  if (!dateStr) return '无截止日期'
  try {
    const date = new Date(dateStr)
    if (isNaN(date.getTime())) return '无效日期'
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  } catch {
    return dateStr
  }
}

const formatDateTimeToBackend = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

const handleAddTask = async () => {
  if (!taskForm.title) {
    message.error('请输入任务标题')
    return
  }
  try {
    const dueDateStr = taskForm.dueDate ? formatDateTimeToBackend(new Date(taskForm.dueDate)) : undefined
    await createTask({
      title: taskForm.title,
      dueDate: dueDateStr,
      priority: taskForm.priority
    })
    message.success('创建成功')
    showAddTaskModal.value = false
    taskForm.title = ''
    taskForm.dueDate = null
    taskForm.priority = 'medium'
    loadMyTasks()
  } catch (error: any) {
    message.error(error.message || '创建失败')
  }
}

const handleDeleteTask = async (task: any) => {
  try {
    await deleteTask(task.id)
    message.success('删除成功')
    loadMyTasks()
  } catch (error: any) {
    message.error(error.message || '删除失败')
  }
}

const toggleTask = async (task: any) => {
  try {
    await toggleTaskStatus(task.id)
    loadMyTasks()
  } catch (error: any) {
    message.error(error.message || '更新失败')
  }
}

const loadRecentFollows = async () => {
  if (authStore.user?.role === 'admin') return
  try {
    const res: any = await getFollowList({ pageNum: 1, pageSize: 3 })
    const list = res?.list || []
    recentInteractions.value = list.map((item: any) => ({
      customerName: item.customerName || '未知客户',
      content: item.content || '',
      time: item.createdAt ? formatTime(item.createdAt) : ''
    }))
  } catch (error) {
    console.error('Failed to load recent follows:', error)
  }
}

const formatTime = (timeStr: string) => {
  if (!timeStr) return ''
  const now = new Date()
  const time = new Date(timeStr)
  const diff = now.getTime() - time.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  if (minutes < 1) return '刚刚'
  if (minutes < 60) return `${minutes}分钟前`
  if (hours < 24) return `${hours}小时前`
  if (days < 30) return `${days}天前`
  return timeStr
}
</script>
