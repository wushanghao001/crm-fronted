<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-bold text-gray-800 dark:text-white">个人销售业绩</h2>
      <div class="flex gap-2">
        <NSelect v-model:value="timeRange" :options="timeRangeOptions" style="width: 120px" @update:value="handleTimeRangeChange" />
      </div>
    </div>

    <div v-if="loading" class="flex items-center justify-center h-64">
      <NSpin size="large" description="加载中..." />
    </div>

    <template v-else>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 dark:text-gray-400 text-sm">总销售额</p>
              <p class="text-3xl font-bold text-gray-800 dark:text-white mt-1">¥{{ formatNumber(performance.totalSales) }}</p>
              <p class="text-gray-400 text-xs mt-1">本月: ¥{{ formatNumber(performance.currentMonthSales) }}</p>
            </div>
            <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <TrendingUp class="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 dark:text-gray-400 text-sm">成交客户数</p>
              <p class="text-3xl font-bold text-gray-800 dark:text-white mt-1">{{ performance.wonCustomerCount }}</p>
              <p class="text-gray-400 text-xs mt-1">跟进客户: {{ performance.followCustomerCount }}</p>
            </div>
            <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <People class="w-6 h-6 text-green-500" />
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <div class="flex items-center gap-1">
                <p class="text-gray-500 dark:text-gray-400 text-sm">成交率</p>
                <NPopover trigger="hover" placement="top">
                  <template #trigger>
                    <NIcon :depth="3" class="cursor-help">
                      <InformationCircleOutline />
                    </NIcon>
                  </template>
                  <div class="text-sm space-y-1 max-w-xs">
                    <p><b>成交率计算方式：</b></p>
                    <p>• 成交率 = 成交客户数 / 跟进客户数 × 100%</p>
                    <p>• 跟进客户：当前时间范围内有跟进记录的客户数（去重）</p>
                    <p>• 成交客户：跟进结果为"已成交"的客户数</p>
                  </div>
                </NPopover>
              </div>
              <p class="text-3xl font-bold text-gray-800 dark:text-white mt-1">{{ performance.winRate.toFixed(1) }}%</p>
              <p class="text-gray-400 text-xs mt-1">成交客户({{ performance.wonCustomerCount }}) / 跟进客户({{ performance.followCustomerCount }})</p>
            </div>
            <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <StatsChart class="w-6 h-6 text-purple-500" />
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-md transition-shadow" @click="showTargetDialog = true">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 dark:text-gray-400 text-sm">本月目标完成度</p>
              <p class="text-3xl font-bold text-gray-800 dark:text-white mt-1">{{ performance.monthTargetCompletion.toFixed(1) }}%</p>
              <p class="text-gray-400 text-xs mt-1">目标: ¥{{ formatNumber(performance.monthTarget) }}</p>
            </div>
            <div class="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
              <BarChart class="w-6 h-6 text-yellow-500" />
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">月度业绩趋势</h3>
          <div class="h-64">
            <v-chart class="h-full" :option="trendChartOption" autoresize />
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">客户来源分布</h3>
          <div class="h-64">
            <v-chart class="h-full" :option="sourceChartOption" autoresize />
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="flex items-center gap-2 mb-4">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">个人转化漏斗</h3>
          <NPopover trigger="hover" placement="top">
            <template #trigger>
              <NIcon :depth="3" class="cursor-help">
                <InformationCircleOutline />
              </NIcon>
            </template>
            <div class="text-sm space-y-2 max-w-md">
              <p><b>漏斗各阶段说明：</b></p>
              <p>• <b>线索</b>：当前时间范围内的跟进记录总数</p>
              <p>• <b>跟进</b>：已完成首次有效接触的记录（初步沟通、需求确认、方案报价、商务谈判、待成交）</p>
              <p>• <b>报价</b>：已进入方案报价阶段及之后的记录（方案报价、商务谈判、待成交）</p>
              <p>• <b>成交</b>：跟进结果为"已成交"的记录数</p>
              <p>• <b>流失</b>：跟进结果为"无意向"或"客户失联"的记录数</p>
              <p class="text-gray-500 mt-2">转化率计算：各阶段数量 / 上一阶段数量 × 100%</p>
            </div>
          </NPopover>
        </div>
        <div class="h-64">
          <v-chart class="h-full" :option="funnelChartOption" autoresize />
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">成交订单列表</h3>
          <div class="flex items-center gap-4">
            <NInput v-model:value="searchKeyword" placeholder="搜索客户名称/订单号" clearable style="width: 200px" />
            <NButton type="primary" @click="handleSearch">搜索</NButton>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-gray-200 dark:border-gray-700">
                <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">订单编号</th>
                <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">客户名称</th>
                <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">订单金额</th>
                <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">支付状态</th>
                <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">订单状态</th>
                <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">创建时间</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in orderList" :key="order.id" class="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                <td class="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">{{ order.orderNo || '-' }}</td>
                <td class="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">{{ order.customerName || '-' }}</td>
                <td class="py-3 px-4 text-sm text-green-600 font-medium">¥{{ order.totalAmount?.toLocaleString() || 0 }}</td>
                <td class="py-3 px-4 text-sm">
                  <NTag :type="getPayStatusType(order.payStatus)" size="small">{{ getPayStatusText(order.payStatus) }}</NTag>
                </td>
                <td class="py-3 px-4 text-sm">
                  <NTag :type="getOrderStatusType(order.status)" size="small">{{ getOrderStatusText(order.status) }}</NTag>
                </td>
                <td class="py-3 px-4 text-sm text-gray-500">{{ order.createdAt ? new Date(order.createdAt).toLocaleString() : '-' }}</td>
              </tr>
              <tr v-if="orderList.length === 0">
                <td colspan="6" class="py-8 text-center text-gray-500">暂无数据</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-4 flex items-center justify-between">
          <span class="text-sm text-gray-500">共 {{ pagination.total }} 条记录</span>
          <NPagination
            v-model:page="pagination.page"
            :page-size="pagination.pageSize"
            :total="pagination.total"
            :show-size-picker="true"
            :page-sizes="[10, 20, 50, 100]"
            @update:page="handlePageChange"
            @update:page-size="handlePageSizeChange"
          />
        </div>
      </div>
    </template>

    <NModal v-model:show="showTargetDialog" preset="card" title="设置月度目标" style="width: 400px;">
      <NForm>
        <NFormItem label="目标金额 (元)">
          <NInputNumber v-model:value="targetForm.monthTarget" :min="0" :precision="0" placeholder="请输入目标金额" style="width: 100%;" />
        </NFormItem>
      </NForm>
      <template #footer>
        <div class="flex justify-end gap-3">
          <NButton @click="showTargetDialog = false">取消</NButton>
          <NButton type="primary" @click="handleSaveTarget" :loading="savingTarget">保存</NButton>
        </div>
      </template>
    </NModal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { NSpin, NInput, NButton, NTag, NSelect, NPagination, NModal, NForm, NFormItem, NInputNumber, NPopover, NIcon, useMessage } from 'naive-ui'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart, PieChart, FunnelChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { TrendingUp, People, StatsChart, BarChart, InformationCircleOutline } from '@vicons/ionicons5'
import { getUserPerformance, getUserPerformanceTrend, getUserOrders, updateUserTarget, type UserPerformanceData, type UserPerformanceTrend, type Order } from '@/api/userPerformance'

use([CanvasRenderer, LineChart, PieChart, FunnelChart, GridComponent, TooltipComponent, LegendComponent])

const message = useMessage()

const timeRange = ref('month')
const timeRangeOptions = [
  { label: '今日', value: 'today' },
  { label: '本周', value: 'week' },
  { label: '本月', value: 'month' },
  { label: '本季度', value: 'quarter' },
  { label: '本年', value: 'year' }
]

const loading = ref(false)
const orderLoading = ref(false)
const searchKeyword = ref('')

const performance = reactive<UserPerformanceData>({
  totalSales: 0,
  wonCustomerCount: 0,
  followCustomerCount: 0,
  winRate: 0,
  monthTargetCompletion: 0,
  monthTarget: 100000,
  currentMonthSales: 0,
  leads: 0,
  contacted: 0,
  quoted: 0,
  won: 0,
  lost: 0,
  contactRate: 0,
  quoteRate: 0,
  winRateStage: 0,
  totalWinRate: 0
})

const trendData = ref<UserPerformanceTrend>({
  months: [],
  salesData: [],
  orderCountData: [],
  customerSources: [],
  sourceCounts: []
})

const orderList = ref<Order[]>([])
const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0
})

const trendChartOption = ref({})
const sourceChartOption = ref({})
const funnelChartOption = ref({})

const showTargetDialog = ref(false)
const savingTarget = ref(false)
const targetForm = reactive({
  monthTarget: 100000
})

const formatNumber = (num: number) => {
  if (num >= 10000) {
    return (num / 10000).toFixed(2) + '万'
  }
  return num.toLocaleString()
}

const loadPerformance = async () => {
  loading.value = true
  try {
    const data = await getUserPerformance(timeRange.value)
    Object.assign(performance, data)
    updateFunnelChart()
  } catch (error) {
    console.error('Failed to load performance:', error)
    message.error('加载业绩数据失败')
  } finally {
    loading.value = false
  }
}

const loadTrend = async () => {
  try {
    const data = await getUserPerformanceTrend(6)
    trendData.value = data
    updateTrendChart()
    updateSourceChart()
  } catch (error) {
    console.error('Failed to load trend:', error)
  }
}

const loadOrders = async () => {
  orderLoading.value = true
  try {
    const data = await getUserOrders({
      pageNum: pagination.page,
      pageSize: pagination.pageSize,
      keyword: searchKeyword.value || undefined
    })
    orderList.value = data.list
    pagination.total = data.total
  } catch (error) {
    console.error('Failed to load orders:', error)
    message.error('加载订单数据失败')
  } finally {
    orderLoading.value = false
  }
}

const updateTrendChart = () => {
  trendChartOption.value = {
    tooltip: {
      trigger: 'axis',
      formatter: (params: any) => {
        const data = params[0]
        return `${data.axisValue}<br/>销售额: ¥${data.value?.toLocaleString() || 0}`
      }
    },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: {
      type: 'category',
      data: trendData.value.months,
      boundaryGap: false
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: (value: number) => {
          if (value >= 10000) return (value / 10000) + '万'
          return value.toString()
        }
      }
    },
    series: [{
      name: '销售额',
      type: 'line',
      data: trendData.value.salesData,
      smooth: true,
      areaStyle: { opacity: 0.3 },
      lineStyle: { width: 3 },
      itemStyle: { color: '#3b82f6' }
    }]
  }
}

const updateSourceChart = () => {
  const sourceNames = trendData.value.customerSources.length > 0
    ? trendData.value.customerSources
    : ['暂无数据']
  const sourceValues = trendData.value.sourceCounts.length > 0
    ? trendData.value.sourceCounts
    : [1]

  sourceChartOption.value = {
    tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
    legend: { orient: 'vertical', right: '5%', top: 'center' },
    series: [{
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 },
      label: { show: false },
      emphasis: {
        label: { show: true, fontSize: 16, fontWeight: 'bold' }
      },
      labelLine: { show: false },
      data: sourceNames.map((name, index) => ({
        name,
        value: sourceValues[index]
      }))
    }],
    color: ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']
  }
}

const updateFunnelChart = () => {
  const maxValue = Math.max(performance.leads || 1, 1)
  funnelChartOption.value = {
    tooltip: { trigger: 'item', formatter: '{b}: {c}' },
    series: [{
      type: 'funnel',
      left: '10%',
      top: 40,
      bottom: 40,
      width: '80%',
      min: 0,
      max: maxValue,
      minSize: '0%',
      maxSize: '100%',
      sort: 'descending',
      gap: 2,
      label: { show: true, position: 'inside', formatter: '{b}: {c}' },
      itemStyle: { borderColor: '#fff', borderWidth: 1 },
      data: [
        { value: performance.leads || 0, name: '线索', itemStyle: { color: '#3b82f6' } },
        { value: performance.contacted || 0, name: '跟进', itemStyle: { color: '#60a5fa' } },
        { value: performance.quoted || 0, name: '报价', itemStyle: { color: '#93c5fd' } },
        { value: performance.won || 0, name: '成交', itemStyle: { color: '#22c55e' } },
        { value: performance.lost || 0, name: '流失', itemStyle: { color: '#ef4444' } }
      ]
    }]
  }
}

const handleTimeRangeChange = () => {
  loadPerformance()
}

const handleSearch = () => {
  pagination.page = 1
  loadOrders()
}

const handlePageChange = (page: number) => {
  pagination.page = page
  loadOrders()
}

const handlePageSizeChange = (pageSize: number) => {
  pagination.pageSize = pageSize
  pagination.page = 1
  loadOrders()
}

const getPayStatusType = (status?: string): 'success' | 'warning' | 'error' | 'info' => {
  const map: Record<string, 'success' | 'warning' | 'error' | 'info'> = {
    paid: 'success',
    unpaid: 'warning',
    partial: 'info'
  }
  return map[status || ''] || 'info'
}

const getPayStatusText = (status?: string): string => {
  const map: Record<string, string> = {
    paid: '已支付',
    unpaid: '未支付',
    partial: '部分支付'
  }
  return map[status || ''] || status || '-'
}

const getOrderStatusType = (status?: string): 'success' | 'warning' | 'error' | 'info' => {
  const map: Record<string, 'success' | 'warning' | 'error' | 'info'> = {
    completed: 'success',
    pending: 'warning',
    cancelled: 'error'
  }
  return map[status || ''] || 'info'
}

const getOrderStatusText = (status?: string): string => {
  const map: Record<string, string> = {
    completed: '已完成',
    pending: '处理中',
    cancelled: '已取消'
  }
  return map[status || ''] || status || '-'
}

onMounted(() => {
  loadPerformance()
  loadTrend()
  loadOrders()
})

const handleSaveTarget = async () => {
  savingTarget.value = true
  try {
    await updateUserTarget(targetForm.monthTarget)
    performance.monthTarget = targetForm.monthTarget
    const completion = performance.currentMonthSales > 0 && targetForm.monthTarget > 0
      ? (performance.currentMonthSales / targetForm.monthTarget) * 100
      : 0
    performance.monthTargetCompletion = completion
    showTargetDialog.value = false
    message.success('目标设置成功')
  } catch (error) {
    console.error('Failed to save target:', error)
    message.error('设置目标失败')
  } finally {
    savingTarget.value = false
  }
}
</script>