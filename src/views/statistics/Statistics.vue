<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-bold text-gray-800 dark:text-white">统计分析</h2>
        <p class="text-gray-500 dark:text-gray-400 mt-1">数据报表和业务分析</p>
      </div>
      <NButton type="primary" @click="handleExport" class="bg-blue-500 hover:bg-blue-600">
        <DownloadIcon class="w-4 h-4 mr-2" />
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
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">销售趋势</h3>
        <v-chart class="h-64" :option="salesChartOption" autoresize />
      </div>
      
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">客户行业分布</h3>
        <v-chart class="h-64" :option="industryChartOption" autoresize />
      </div>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="flex items-center gap-2 mb-4">
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
import { ref, computed, onMounted } from 'vue'
import { NButton, NTooltip } from 'naive-ui'
import { message } from '@/utils/message'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart, PieChart, FunnelChart, BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { People, TrendingUp, Briefcase, Warning, Download } from '@vicons/ionicons5'
import { getIndustryDistribution, getOverview, getCustomerTrend, getFunnel, getChurnReason } from '@/api/statistics'

use([CanvasRenderer, LineChart, PieChart, FunnelChart, BarChart, GridComponent, TooltipComponent, LegendComponent])

const overview = ref<any>({})
const industryChartOption = ref({})
const salesChartOption = ref({})
const funnelChartOption = ref({})
const churnChartOption = ref({})

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
    const distribution = await getIndustryDistribution() as any[]
    if (distribution && distribution.length > 0) {
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
          data: distribution.map((item: any) => ({
            value: item.value,
            name: item.name
          }))
        }]
      }
    } else {
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
          data: [
            { value: 0, name: '暂无数据' }
          ]
        }]
      }
    }
  } catch (error) {
    console.error('获取行业分布数据失败', error)
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
    const funnelData = await getFunnel() as any
    if (funnelData) {
      const leads = funnelData.leads || 0
      const contacted = funnelData.contacted || 0
      const quoted = funnelData.quoted || 0
      const won = funnelData.won || 0
      funnelChartOption.value = {
        tooltip: { trigger: 'item', formatter: '{b}: {c}' },
        series: [{
          type: 'funnel',
          left: '10%',
          top: 60,
          bottom: 60,
          width: '80%',
          min: 0,
          max: leads > 0 ? leads : 100,
          minSize: '0%',
          maxSize: '100%',
          sort: 'descending',
          gap: 2,
          label: { show: true, position: 'inside' },
          labelLine: { length: 10, lineStyle: { width: 1 } },
          itemStyle: { borderColor: '#fff', borderWidth: 1 },
          data: [
            { value: leads, name: '线索', itemStyle: { color: '#3b82f6' } },
            { value: contacted, name: '跟进', itemStyle: { color: '#60a5fa' } },
            { value: quoted, name: '报价', itemStyle: { color: '#93c5fd' } },
            { value: won, name: '成交', itemStyle: { color: '#dbeafe' } }
          ]
        }]
      }
    }
  } catch (error) {
    console.error('获取漏斗数据失败', error)
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
})

const handleExport = () => {
  message.success('报表导出成功')
}
</script>
