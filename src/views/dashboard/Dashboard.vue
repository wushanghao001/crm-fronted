<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-bold text-gray-800 dark:text-white">管理首页</h2>
      <div class="flex gap-2">
        <NSelect v-model:value="timeRange" :options="timeRangeOptions" style="width: 120px;" />
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 dark:text-gray-400 text-sm">系统总用户数</p>
            <p class="text-3xl font-bold text-gray-800 dark:text-white mt-1">{{ overview.totalUsers }}</p>
            <p class="text-gray-400 text-xs mt-1">今日新增：{{ overview.todayNewUsers }}</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
            <People class="w-6 h-6 text-blue-500" />
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 dark:text-gray-400 text-sm">客户总数</p>
            <p class="text-3xl font-bold text-gray-800 dark:text-white mt-1">{{ overview.totalCustomers }}</p>
            <p class="text-gray-400 text-xs mt-1">今日新增：{{ overview.todayNewCustomers }}</p>
          </div>
          <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
            <Briefcase class="w-6 h-6 text-green-500" />
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 dark:text-gray-400 text-sm">销售机会总数</p>
            <p class="text-3xl font-bold text-gray-800 dark:text-white mt-1">{{ overview.totalOpportunities }}</p>
            <p class="text-gray-400 text-xs mt-1">今日新增：{{ overview.todayNewOpportunities }}</p>
          </div>
          <div class="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
            <TrendingUp class="w-6 h-6 text-yellow-500" />
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 dark:text-gray-400 text-sm">总成交单数</p>
            <p class="text-3xl font-bold text-gray-800 dark:text-white mt-1">{{ overview.totalOrders }}</p>
            <p class="text-gray-400 text-xs mt-1">本月成交：{{ overview.monthOrders }}</p>
          </div>
          <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
            <Cart class="w-6 h-6 text-purple-500" />
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">销售漏斗</h3>
          <NTooltip>
            <template #trigger>
              <span class="text-gray-400 cursor-help">ⓘ</span>
            </template>
            <div class="text-sm leading-relaxed">
              <p class="font-medium mb-2">各阶段含义：</p>
              <p>• <b>线索</b>：所有跟进记录的数量</p>
              <p>• <b>跟进</b>：已进行有效沟通的客户（初步沟通、需求确认、方案报价、商务谈判、待成交）</p>
              <p>• <b>报价</b>：已进入报价阶段的客户（方案报价、商务谈判、待成交）</p>
              <p>• <b>成交</b>：最终成交的客户</p>
              <p>• <b>流失</b>：明确表示无意向或客户失联（无意向、客户失联）</p>
            </div>
          </NTooltip>
        </div>
        <v-chart class="h-64" :option="funnelChartOption" autoresize />
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">业务趋势</h3>
          <NTooltip>
            <template #trigger>
              <span class="text-gray-400 cursor-help">ⓘ</span>
            </template>
            <div class="text-sm leading-relaxed">
              <p><b>取数逻辑：</b></p>
              <p>• 按所选时间段，展示每日新增客户、机会、成交单数走势</p>
            </div>
          </NTooltip>
        </div>
        <v-chart class="h-64" :option="trendChartOption" autoresize />
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">客户行业分布</h3>
          <NTooltip>
            <template #trigger>
              <span class="text-gray-400 cursor-help">ⓘ</span>
            </template>
            <div class="text-sm leading-relaxed">
              <p><b>取数逻辑：</b></p>
              <p>• 统计所有客户的行业分布情况</p>
            </div>
          </NTooltip>
        </div>
        <v-chart class="h-64" :option="industryChartOption" autoresize />
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">最新系统日志</h3>
        <div class="space-y-3 max-h-64 overflow-y-auto">
          <div v-for="log in recentLogs" :key="log.id" class="flex items-start space-x-3 p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700">
            <div class="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
              <DocumentText class="w-4 h-4 text-blue-500" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-gray-800 dark:text-white text-sm truncate">{{ log.content || log.type }}</p>
              <p class="text-xs text-gray-400">{{ log.operator }} · {{ formatTime(log.createdAt) }}</p>
            </div>
          </div>
          <div v-if="recentLogs.length === 0" class="text-center text-gray-400 py-4">暂无日志记录</div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">待跟进机会</h3>
          <NTooltip>
            <template #trigger>
              <span class="text-gray-400 cursor-help">ⓘ</span>
            </template>
            <div class="text-sm leading-relaxed">
              <p><b>取数逻辑：</b></p>
              <p>• 筛选跟进结果为「待成交」的跟进记录</p>
              <p>• 按最新跟进时间倒序排列</p>
              <p>• 最多返回10条</p>
            </div>
          </NTooltip>
        </div>
        <div class="space-y-3 max-h-64 overflow-y-auto">
          <div v-for="item in pendingFollows" :key="item.id" class="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
                <Time class="w-4 h-4 text-yellow-500" />
              </div>
              <div>
                <p class="text-gray-800 dark:text-white text-sm">{{ item.customerName }}</p>
                <p class="text-xs text-gray-400">{{ item.content || item.followResult }}</p>
              </div>
            </div>
            <span class="text-xs text-gray-400">{{ formatTime(item.createdAt) }}</span>
          </div>
          <div v-if="pendingFollows.length === 0" class="text-center text-gray-400 py-4">暂无待跟进机会</div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">流失预警客户</h3>
        <div class="space-y-3 max-h-64 overflow-y-auto">
          <div v-for="customer in pendingCustomers" :key="customer.id" class="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                <Settings class="w-4 h-4 text-red-500" />
              </div>
              <div>
                <p class="text-gray-800 dark:text-white text-sm">{{ customer.name }}</p>
                <p class="text-xs text-gray-400">最后跟进: {{ customer.lastFollowTime ? formatTime(customer.lastFollowTime) : '暂无' }}</p>
              </div>
            </div>
            <span class="px-2 py-1 rounded text-xs bg-red-100 text-red-700">流失预警</span>
          </div>
          <div v-if="pendingCustomers.length === 0" class="text-center text-gray-400 py-4">暂无流失预警客户</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue'
import { NButton, NTooltip, NSelect, NPopconfirm } from 'naive-ui'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart, PieChart, FunnelChart, BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { People, Briefcase, TrendingUp, Cart, DocumentText, Time, Settings } from '@vicons/ionicons5'
import { useAuthStore } from '@/stores/auth'
import { message } from '@/utils/message'
import request from '@/api/request'

use([CanvasRenderer, LineChart, PieChart, FunnelChart, BarChart, GridComponent, TooltipComponent, LegendComponent])

const authStore = useAuthStore()

const timeRange = ref('month')
const timeRangeOptions = [
  { label: '今日', value: 'today' },
  { label: '本周', value: 'week' },
  { label: '本月', value: 'month' },
  { label: '本季度', value: 'quarter' }
]

const overview = reactive({
  totalUsers: 0,
  todayNewUsers: 0,
  totalCustomers: 0,
  todayNewCustomers: 0,
  totalOpportunities: 0,
  todayNewOpportunities: 0,
  totalOrders: 0,
  monthOrders: 0
})

const funnelChartOption = ref({})
const trendChartOption = ref({})
const industryChartOption = ref({})
const recentLogs = ref<any[]>([])
const pendingFollows = ref<any[]>([])
const pendingCustomers = ref<any[]>([])

const loadOverview = async () => {
  try {
    const data: any = await request.get('/dashboard/overview', { params: { timeRange: timeRange.value } })
    Object.assign(overview, data)
  } catch (error) {
    console.error('Failed to load overview:', error)
  }
}

const loadFunnel = async () => {
  try {
    const data: any = await request.get('/dashboard/funnel')
    const leads = data.leads || 0
    funnelChartOption.value = {
      tooltip: { trigger: 'item', formatter: '{b}: {c}' },
      series: [{
        type: 'funnel',
        left: '10%',
        top: 40,
        bottom: 40,
        width: '80%',
        min: 0,
        max: leads > 0 ? leads : 100,
        minSize: '0%',
        maxSize: '100%',
        sort: 'descending',
        gap: 2,
        label: { show: true, position: 'inside' },
        itemStyle: { borderColor: '#fff', borderWidth: 1 },
        data: [
          { value: data.leads || 0, name: '线索', itemStyle: { color: '#3b82f6' } },
          { value: data.contacted || 0, name: '跟进', itemStyle: { color: '#60a5fa' } },
          { value: data.quoted || 0, name: '报价', itemStyle: { color: '#93c5fd' } },
          { value: data.won || 0, name: '成交', itemStyle: { color: '#22c55e' } },
          { value: data.lost || 0, name: '流失', itemStyle: { color: '#ef4444' } }
        ]
      }]
    }
  } catch (error) {
    console.error('Failed to load funnel:', error)
  }
}

const loadTrend = async () => {
  try {
    const data: any[] = await request.get('/dashboard/trend', { params: { timeRange: timeRange.value } })
    if (data && data.length > 0) {
      trendChartOption.value = {
        tooltip: { trigger: 'axis' },
        legend: { data: ['新增客户', '新增机会', '成交单数'], top: 'top' },
        grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
        xAxis: {
          type: 'category',
          data: data.map((item: any) => {
            const date = new Date(item.date)
            return `${date.getMonth() + 1}/${date.getDate()}`
          })
        },
        yAxis: { type: 'value' },
        series: [
          { name: '新增客户', type: 'line', data: data.map((item: any) => item.customers), smooth: true },
          { name: '新增机会', type: 'line', data: data.map((item: any) => item.opportunities), smooth: true },
          { name: '成交单数', type: 'line', data: data.map((item: any) => item.orders), smooth: true }
        ]
      }
    }
  } catch (error) {
    console.error('Failed to load trend:', error)
  }
}

const loadIndustryDistribution = async () => {
  try {
    const data: any[] = await request.get('/dashboard/industry-distribution')
    if (data && data.length > 0) {
      industryChartOption.value = {
        tooltip: { trigger: 'item' },
        legend: { orient: 'vertical', right: '5%', top: 'center' },
        series: [{
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: { borderRadius: 10 },
          label: { show: false },
          emphasis: { label: { show: true, fontSize: 18 } },
          data: data.map((item: any) => ({
            value: item.value,
            name: item.name
          }))
        }]
      }
    } else {
      industryChartOption.value = {
        tooltip: { trigger: 'item' },
        series: [{
          type: 'pie',
          radius: ['40%', '70%'],
          data: [{ value: 0, name: '暂无数据' }]
        }]
      }
    }
  } catch (error) {
    console.error('Failed to load industry distribution:', error)
  }
}

const loadRecentLogs = async () => {
  try {
    const data: any[] = await request.get('/dashboard/recent-logs')
    recentLogs.value = data || []
  } catch (error) {
    console.error('Failed to load recent logs:', error)
  }
}

const loadTodos = async () => {
  try {
    const data: any = await request.get('/dashboard/todos')
    pendingFollows.value = data?.pendingFollows || []
    pendingCustomers.value = data?.pendingCustomers || []
  } catch (error) {
    console.error('Failed to load todos:', error)
  }
}

const loadAll = async () => {
  await Promise.all([
    loadOverview(),
    loadFunnel(),
    loadTrend(),
    loadIndustryDistribution(),
    loadRecentLogs(),
    loadTodos()
  ])
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

watch(timeRange, () => {
  loadAll()
})

onMounted(async () => {
  await loadAll()
})
</script>