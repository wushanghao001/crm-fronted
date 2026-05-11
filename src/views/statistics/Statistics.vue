<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-bold text-gray-800 dark:text-white">统计分析</h2>
        <p class="text-gray-500 dark:text-gray-400 mt-1">数据报表和业务分析</p>
      </div>
      <NButton type="primary" @click="handleExport" class="rounded-lg px-5 py-2.5 text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2">
        <DownloadIcon class="w-4 h-4" />
        导出报表
      </NButton>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 dark:text-gray-400 text-sm">本月新增客户</p>
            <p class="text-3xl font-bold text-gray-800 dark:text-white mt-2">{{ overview.newCustomers || 0 }}</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
            <UsersIcon class="w-6 h-6 text-blue-500" />
          </div>
        </div>
        <p :class="customerGrowthClass" class="text-sm mt-2">
          {{ customerGrowthText }}
        </p>
      </div>
      
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 dark:text-gray-400 text-sm">本月销售额</p>
            <p class="text-3xl font-bold text-gray-800 dark:text-white mt-2">¥{{ formatSales(overview.thisMonthSales) }}</p>
          </div>
          <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
            <TrendingUpIcon class="w-6 h-6 text-green-500" />
          </div>
        </div>
        <p :class="salesGrowthClass" class="text-sm mt-2">
          {{ salesGrowthText }}
        </p>
      </div>
      
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 dark:text-gray-400 text-sm">活跃客户</p>
            <p class="text-3xl font-bold text-gray-800 dark:text-white mt-2">{{ overview.activeCustomers || 0 }}</p>
          </div>
          <div class="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
            <TargetIcon class="w-6 h-6 text-yellow-500" />
          </div>
        </div>
        <p class="text-gray-500 dark:text-gray-400 text-sm mt-2">占比 {{ overview.activeRate || 0 }}%</p>
      </div>
      
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 dark:text-gray-400 text-sm">客户流失率</p>
            <p class="text-3xl font-bold text-gray-800 dark:text-white mt-2">{{ overview.churnRate || 0 }}%</p>
          </div>
          <div class="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
            <AlertTriangleIcon class="w-6 h-6 text-red-500" />
          </div>
        </div>
        <p class="text-gray-500 dark:text-gray-400 text-sm mt-2">{{ overview.totalCustomers || 0 }} 总客户数</p>
      </div>

      <div v-if="lowStockProducts.length > 0" class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-red-200 dark:border-red-700">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2">
            <div class="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
              <WarningIcon class="w-5 h-5 text-red-500" />
            </div>
            <div>
              <p class="text-gray-800 dark:text-white font-semibold">库存预警</p>
              <p class="text-gray-500 dark:text-gray-400 text-xs">{{ lowStockProducts.length }} 个产品低于安全库存</p>
            </div>
          </div>
          <NButton size="small" type="error" @click="goToProductManagement">
            立即处理
          </NButton>
        </div>
        <div class="space-y-2 max-h-32 overflow-y-auto">
          <div v-for="product in lowStockProducts.slice(0, 5)" :key="product.id" class="flex items-center justify-between text-sm py-1 border-b border-gray-100 dark:border-gray-700 last:border-0">
            <div>
              <span class="text-gray-700 dark:text-gray-300">{{ product.name }}</span>
              <span class="ml-2 text-xs text-gray-400">{{ product.code }}</span>
            </div>
            <div class="text-right">
              <span class="text-red-500 font-medium">{{ product.availableStock ?? 0 }}</span>
              <span class="text-gray-400 text-xs"> / 安全库存 {{ product.safeStock ?? 5 }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">销售趋势</h3>
        <v-chart class="h-64" :option="salesChartOption" autoresize />
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">产品销售排行</h3>
          <div class="flex gap-2">
            <button
              v-for="item in timeOptions"
              :key="item.value"
              @click="handleProductTimeChange(item.value)"
              :class="['px-3 py-1 text-sm rounded-lg transition-colors', productTimeType === item.value ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200']"
            >
              {{ item.label }}
            </button>
          </div>
        </div>
        <v-chart class="h-64" :option="productChartOption" autoresize />
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">用户销售金额统计</h3>
          <div class="flex items-center gap-3">
            <NSelect v-model:value="topN" :options="topNOptions" size="small" style="width: 100px;" />
            <div class="flex gap-2">
              <button
                v-for="item in timeOptions"
                :key="item.value"
                @click="handleTimeChange(item.value)"
                :class="['px-3 py-1 text-sm rounded-lg transition-colors', timeType === item.value ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200']"
              >
                {{ item.label }}
              </button>
            </div>
          </div>
        </div>
        <v-chart class="h-64" :option="userSalesChartOption" autoresize />
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="flex items-center gap-2 mb-4">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">流失原因分析</h3>
          <NTooltip>
            <template #trigger>
              <span class="text-gray-400 cursor-help">ⓘ</span>
            </template>
            <div class="text-sm leading-relaxed">
              <p><b>取数逻辑：</b></p>
              <p>• 统计已流失客户中，各流失原因对应的客户数</p>
              <p>• 流失原因包括：价格、服务、竞品、产品、其他</p>
            </div>
          </NTooltip>
        </div>
        <v-chart class="h-64" :option="churnChartOption" autoresize />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { NButton, NTooltip, NSelect } from 'naive-ui'
import { message } from '@/utils/message'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart, PieChart, BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { People, TrendingUp, Briefcase, Warning as WarningIcon, Download } from '@vicons/ionicons5'
import { getOverview, getCustomerTrend, getChurnReason, getUserSalesByTime, getProductSales, exportReport } from '@/api/statistics'
import { getLowStockProducts } from '@/api/stock'
import { useRouter } from 'vue-router'

use([CanvasRenderer, LineChart, PieChart, BarChart, GridComponent, TooltipComponent, LegendComponent])

const router = useRouter()

const overview = ref<any>({})
const lowStockProducts = ref<any[]>([])
const salesChartOption = ref({})
const churnChartOption = ref({})
const userSalesChartOption = ref({})
const productChartOption = ref({})
const timeType = ref('month')
const productTimeType = ref('month')
const topN = ref(5)
const topNOptions = [
  { label: 'Top5', value: 5 },
  { label: 'Top10', value: 10 },
  { label: 'Top20', value: 20 },
  { label: '全部', value: 0 }
]
const timeOptions = [
  { label: '每日', value: 'day' },
  { label: '本周', value: 'week' },
  { label: '本月', value: 'month' },
  { label: '本季', value: 'quarter' }
]

const customerGrowthText = computed(() => {
  const rate = parseFloat(overview.value.customerGrowthRate || 0)
  if (rate > 0) return `↑ ${rate.toFixed(1)}% 较上月`
  if (rate < 0) return `↓ ${Math.abs(rate).toFixed(1)}% 较上月`
  return '与上月持平'
})

const customerGrowthClass = computed(() => {
  const rate = parseFloat(overview.value.customerGrowthRate || 0)
  return rate >= 0 ? 'text-green-500' : 'text-red-500'
})

const salesGrowthText = computed(() => {
  const rate = parseFloat(overview.value.salesGrowthRate || 0)
  if (rate > 0) return `↑ ${rate.toFixed(1)}% 较上月`
  if (rate < 0) return `↓ ${Math.abs(rate).toFixed(1)}% 较上月`
  return '与上月持平'
})

const salesGrowthClass = computed(() => {
  const rate = parseFloat(overview.value.salesGrowthRate || 0)
  return rate >= 0 ? 'text-green-500' : 'text-red-500'
})

const formatSales = (value: any) => {
  if (!value) return '0'
  const num = typeof value === 'string' ? parseFloat(value) : value
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + '万'
  }
  return num.toFixed(0)
}

onMounted(async () => {
  try {
    const overviewData = await getOverview() as any
    overview.value = overviewData || {}
  } catch (error) {
    console.error('获取统计数据失败', error)
  }

  try {
    const trendData = await getCustomerTrend() as any[]
    if (trendData && trendData.length > 0) {
      salesChartOption.value = {
        tooltip: { trigger: 'axis' },
        grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
        xAxis: { type: 'category', data: trendData.map((item: any) => item.month) },
        yAxis: { type: 'value' },
        series: [
          {
            name: '销售额',
            type: 'line',
            data: trendData.map((item: any) => {
              const val = typeof item.sales === 'string' ? parseFloat(item.sales) : (item.sales || 0)
              return val
            }),
            smooth: true
          }
        ]
      }
    } else {
      salesChartOption.value = {
        tooltip: { trigger: 'axis' },
        grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
        xAxis: { type: 'category', data: [] },
        yAxis: { type: 'value' },
        series: [
          { name: '销售额', type: 'line', data: [], smooth: true }
        ]
      }
    }
  } catch (error) {
    console.error('获取销售趋势数据失败', error)
  }

  try {
    const churnData = await getChurnReason() as any[]
    if (churnData && churnData.length > 0) {
      churnChartOption.value = {
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
        xAxis: { type: 'category', data: churnData.map((item: any) => item.name) },
        yAxis: { type: 'value' },
        series: [{
          type: 'bar',
          data: churnData.map((item: any) => item.value),
          itemStyle: { borderRadius: [4, 4, 0, 0] },
          color: '#3b82f6'
        }]
      }
    } else {
      churnChartOption.value = {
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
        xAxis: { type: 'category', data: ['暂无数据'] },
        yAxis: { type: 'value' },
        series: [{
          type: 'bar',
          data: [0],
          itemStyle: { borderRadius: [4, 4, 0, 0] }
        }]
      }
    }
  } catch (error) {
    console.error('获取流失原因数据失败', error)
  }

  await loadUserSalesData()
  await loadProductSalesData()

  try {
    const lowStockData = await getLowStockProducts() as any[]
    lowStockProducts.value = lowStockData || []
  } catch (error) {
    console.error('获取库存预警数据失败', error)
  }
})

const loadUserSalesData = async () => {
  try {
    const data = await getUserSalesByTime(timeType.value) as any[]
    if (data && data.length > 0) {
      const sortedData = [...data].sort((a, b) => {
        const amountA = typeof a.amount === 'string' ? parseFloat(a.amount) : (a.amount || 0)
        const amountB = typeof b.amount === 'string' ? parseFloat(b.amount) : (b.amount || 0)
        return amountB - amountA
      })

      let displayData = sortedData
      if (topN.value > 0) {
        displayData = sortedData.slice(0, topN.value)
      }

      const needScroll = displayData.length > 8
      const chartHeight = needScroll ? Math.max(300, displayData.length * 35) : 256

      userSalesChartOption.value = {
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' },
          formatter: (params: any) => {
            const item = params[0]
            const rank = sortedData.findIndex((d: any) => d.userName === item.name) + 1
            const rankText = rank > 0 ? `<br/><span style="color: #666;">排名：第${rank}名</span>` : ''
            return `<b>${item.name}</b><br/>销售额：¥${item.value.toLocaleString()}${rankText}`
          }
        },
        grid: { left: '3%', right: '4%', bottom: needScroll ? '15%' : '3%', containLabel: true, height: chartHeight },
        xAxis: {
          type: 'category',
          data: displayData.map((item: any) => item.userName),
          axisLabel: {
            interval: 0,
            rotate: displayData.length > 8 ? 30 : 0,
            fontSize: 11
          }
        },
        yAxis: { 
          type: 'value',
          max: (value: any) => {
            const maxVal = value.max
            const extra = maxVal * 0.2
            return Math.ceil((maxVal + extra) / 50000) * 50000
          },
          interval: 50000,
          axisLabel: {
            formatter: (value: number) => {
              if (value >= 10000) {
                return (value / 10000).toFixed(0) + '万'
              }
              return value.toString()
            }
          }
        },
        series: [{
          type: 'bar',
          data: displayData.map((item: any) => {
            const amount = typeof item.amount === 'string' ? parseFloat(item.amount) : (item.amount || 0)
            return amount
          }),
          itemStyle: {
            borderRadius: [4, 4, 0, 0],
            color: (params: any) => {
              return params.name === '其他'
                ? '#94a3b8'
                : {
                    type: 'linear',
                    x: 0, y: 0, x2: 0, y2: 1,
                    colorStops: [
                      { offset: 0, color: '#3b82f6' },
                      { offset: 1, color: '#60a5fa' }
                    ]
                  }
            }
          },
          barWidth: '50%'
        }]
      }
    } else {
      userSalesChartOption.value = {
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
        xAxis: { type: 'category', data: ['暂无数据'] },
        yAxis: { type: 'value' },
        series: [{
          type: 'bar',
          data: [0],
          itemStyle: { borderRadius: [4, 4, 0, 0] }
        }]
      }
    }
  } catch (error) {
    console.error('获取用户销售数据失败', error)
  }
}

const loadProductSalesData = async (timeType?: string) => {
  try {
    const data = await getProductSales(timeType) as any[]
    if (data && data.length > 0) {
      const sortedData = [...data].sort((a, b) => {
        const qtyA = typeof a.quantity === 'string' ? parseFloat(a.quantity) : (a.quantity || 0)
        const qtyB = typeof b.quantity === 'string' ? parseFloat(b.quantity) : (b.quantity || 0)
        return qtyB - qtyA
      })

      productChartOption.value = {
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, formatter: '{b}: {c}件' },
        grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
        xAxis: { type: 'category', data: sortedData.map((item: any) => item.productName || item.name) },
        yAxis: { type: 'value' },
        series: [{
          type: 'bar',
          data: sortedData.map((item: any) => {
            const qty = typeof item.quantity === 'string' ? parseFloat(item.quantity) : (item.quantity || 0)
            return qty
          }),
          itemStyle: {
            borderRadius: [4, 4, 0, 0],
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: '#3b82f6' },
                { offset: 1, color: '#93c5fd' }
              ]
            }
          },
          barWidth: '50%'
        }]
      }
    } else {
      productChartOption.value = {
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
        xAxis: { type: 'category', data: ['暂无数据'] },
        yAxis: { type: 'value' },
        series: [{
          type: 'bar',
          data: [0],
          itemStyle: { borderRadius: [4, 4, 0, 0] }
        }]
      }
    }
  } catch (error) {
    console.error('获取产品销售数据失败', error)
  }
}

const handleTimeChange = async (type: string) => {
  timeType.value = type
  await loadUserSalesData()
}

const handleProductTimeChange = async (type: string) => {
  productTimeType.value = type
  await loadProductSalesData(type)
}

watch(topN, () => {
  loadUserSalesData()
})

const handleExport = async () => {
  try {
    message.success('正在生成报表，请稍候...')
    const response: any = await exportReport()
    const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    link.download = `统计分析报表_${year}年${month}月.xlsx`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
    message.success('报表导出成功')
  } catch (error: any) {
    console.error('Export error:', error)
    if (error.response) {
      message.error('导出失败，请稍后重试或联系管理员')
    } else if (error.request) {
      message.error('网络异常，请检查网络连接')
    } else {
      message.error('导出失败，请稍后重试')
    }
  }
}

const goToProductManagement = () => {
  router.push({ name: 'ProductList', query: { lowStock: 'true' } })
}
</script>
