<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
    <div class="flex justify-between items-center mb-4">
      <div class="flex items-center gap-2">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white">销售漏斗</h3>
        <NTooltip>
          <template #trigger>
            <span class="text-gray-400 cursor-help">ⓘ</span>
          </template>
          <div class="text-sm leading-relaxed">
            <p class="font-medium mb-2">各阶段含义：</p>
            <p>• <b>线索</b>：所有跟进记录的数量</p>
            <p>• <b>沟通</b>：已进行有效沟通的客户（初步沟通、需求确认、方案报价、商务谈判、待成交）</p>
            <p>• <b>报价</b>：已进入报价阶段的客户（方案报价、商务谈判、待成交）</p>
            <p>• <b>成交</b>：最终成交的客户</p>
            <p>• <b>流失</b>：明确表示无意向或客户失联（无意向、客户失联）</p>
            <p class="mt-3 pt-3 border-t border-gray-300 font-medium">转化率计算：</p>
            <p>• 沟通转化率 = 沟通数 / 线索数 × 100%</p>
            <p>• 报价转化率 = 报价数 / 沟通数 × 100%</p>
            <p>• 成交转化率 = 成交数 / 报价数 × 100%</p>
            <p>• 总成交率 = 成交数 / 线索数 × 100%</p>
          </div>
        </NTooltip>
      </div>
      <div class="flex gap-2">
        <button
          v-for="item in timeOptions"
          :key="item.value"
          @click="handleTimeChange(item.value)"
          :class="[
            'px-3 py-1 text-sm rounded-full transition-colors',
            timeRange === item.value
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
          ]"
        >
          {{ item.label }}
        </button>
      </div>
    </div>

    <div v-if="loading" class="flex justify-center items-center h-64">
      <NSpin size="medium" />
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="funnel-chart-container">
        <v-chart class="h-72" :option="funnelOption" autoresize @click="handleFunnelClick" />
      </div>

      <div class="space-y-4">
        <div
          v-for="stage in funnelStages"
          :key="stage.key"
          @click="handleStageClick(stage)"
          class="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition-colors"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-3 h-3 rounded-full"
              :style="{ backgroundColor: stage.color }"
            />
            <span class="text-gray-700 dark:text-gray-200 font-medium">{{ stage.name }}</span>
          </div>
          <div class="flex items-center gap-6">
            <span class="text-lg font-bold text-gray-800 dark:text-white">{{ stage.value }}</span>
            <span v-if="stage.rate" class="text-sm text-gray-500 dark:text-gray-400">
              转化率: {{ Number(stage.rate).toFixed(1) }}%
            </span>
          </div>
        </div>

        <div class="mt-4 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
          <div class="text-sm text-gray-600 dark:text-gray-300">
            总成交率:
            <span class="ml-2 text-lg font-bold text-blue-600 dark:text-blue-400">
              {{ Number(funnelData.totalWinRate).toFixed(1) }}%
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6">
      <h4 class="text-md font-semibold text-gray-700 dark:text-gray-200 mb-3">成交趋势</h4>
      <v-chart class="h-48" :option="trendOption" autoresize />
    </div>

    <NModal
      v-model:show="showCustomerModal"
      preset="card"
      :title="`${currentStage?.name || ''} 客户列表`"
      style="width: 800px; max-width: 90vw;"
    >
      <div class="space-y-4">
        <div v-if="customerLoading" class="flex justify-center py-8">
          <NSpin size="medium" />
        </div>
        <div v-else-if="stageCustomers.length === 0" class="text-center py-8 text-gray-400">
          暂无数据
        </div>
        <div v-else>
          <div class="grid grid-cols-4 gap-4 px-2 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
            <span>客户名称</span>
            <span>电话</span>
            <span>行业</span>
            <span>状态</span>
          </div>
          <div class="space-y-2">
            <div v-for="customer in stageCustomers" :key="customer.id" class="grid grid-cols-4 gap-4 px-2 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span class="text-gray-800 dark:text-white truncate">{{ customer.name }}</span>
              <span class="text-gray-600 dark:text-gray-300">{{ customer.phone }}</span>
              <span class="text-gray-600 dark:text-gray-300">{{ customer.industry }}</span>
              <span :class="customer.status === 'active' ? 'text-green-600 dark:text-green-400' : 'text-gray-400'">{{ customer.status }}</span>
            </div>
          </div>
        </div>
      </div>
    </NModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { FunnelChart } from 'echarts/charts'
import { LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { NModal, NSpin, NTooltip } from 'naive-ui'
import { getFunnelData, getTrendData, getStageCustomers } from '@/api/funnel'
import type { FunnelData, TrendData, CustomerBrief } from '@/api/funnel'

use([CanvasRenderer, FunnelChart, LineChart, GridComponent, TooltipComponent, LegendComponent])

const props = defineProps<{
  externalFunnelData?: FunnelData | null
  externalTrendData?: TrendData | null
  externalTimeRange?: string
  autoLoad?: boolean
}>()

const emit = defineEmits<{
  (e: 'timeRangeChange', value: string): void
  (e: 'funnelClick', params: any): void
}>()

const loading = ref(false)
const timeRange = ref(props.externalTimeRange || 'week')
const funnelData = ref<FunnelData>({
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
const trendData = ref<TrendData>({
  dates: [],
  wonData: [],
  lostData: [],
  totalData: []
})

const showCustomerModal = ref(false)
const currentStage = ref<{ name: string; value: number; key: string } | null>(null)
const customerLoading = ref(false)
const stageCustomers = ref<CustomerBrief[]>([])
const customerPagination = ref({
  page: 1,
  pageSize: 10,
  total: 0
})

const customerColumns = [
  { title: '客户名称', key: 'name' },
  { title: '联系电话', key: 'phone' },
  { title: '行业', key: 'industry' },
  { title: '状态', key: 'status' }
]

const timeOptions = [
  { label: '今日', value: 'today' },
  { label: '本周', value: 'week' },
  { label: '本月', value: 'month' },
  { label: '本季度', value: 'quarter' }
]

const stageColors: Record<string, string> = {
  leads: '#3b82f6',
  contacted: '#8b5cf6',
  quoted: '#f59e0b',
  won: '#10b981',
  lost: '#ef4444'
}

const funnelStages = computed(() => [
  { name: '线索', value: funnelData.value.leads, rate: null, color: stageColors.leads, key: 'leads' },
  { name: '沟通', value: funnelData.value.contacted, rate: funnelData.value.contactRate, color: stageColors.contacted, key: 'contacted' },
  { name: '报价', value: funnelData.value.quoted, rate: funnelData.value.quoteRate, color: stageColors.quoted, key: 'quoted' },
  { name: '成交', value: funnelData.value.won, rate: funnelData.value.winRate, color: stageColors.won, key: 'won' },
  { name: '流失', value: funnelData.value.lost, rate: null, color: stageColors.lost, key: 'lost' }
])

const funnelOption = computed(() => ({
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {c} ({d}%)'
  },
  series: [
    {
      name: '销售漏斗',
      type: 'funnel',
      left: '10%',
      top: 20,
      bottom: 20,
      width: '80%',
      min: 0,
      max: Math.max(funnelData.value.leads, 1),
      minSize: '20%',
      maxSize: '100%',
      sort: 'descending',
      gap: 2,
      label: {
        show: true,
        position: 'inside',
        formatter: '{b}\n{c}',
        color: '#fff',
        fontSize: 12
      },
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 1
      },
      emphasis: {
        label: {
          fontSize: 14,
          fontWeight: 'bold'
        }
      },
      data: funnelStages.value.map(stage => ({
        value: stage.value,
        name: stage.name,
        itemStyle: { color: stage.color }
      }))
    }
  ]
}))

const trendOption = computed(() => ({
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'cross' }
  },
  legend: {
    data: ['成交', '流失', '总计'],
    bottom: 0
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '15%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: trendData.value.dates
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '成交',
      type: 'line',
      data: trendData.value.wonData,
      smooth: true,
      lineStyle: { color: '#10b981' },
      itemStyle: { color: '#10b981' }
    },
    {
      name: '流失',
      type: 'line',
      data: trendData.value.lostData,
      smooth: true,
      lineStyle: { color: '#ef4444' },
      itemStyle: { color: '#ef4444' }
    },
    {
      name: '总计',
      type: 'line',
      data: trendData.value.totalData,
      smooth: true,
      lineStyle: { color: '#3b82f6' },
      itemStyle: { color: '#3b82f6' }
    }
  ]
}))

const loadFunnelData = async () => {
  loading.value = true
  try {
    const res: any = await getFunnelData(timeRange.value)
    if (res) {
      funnelData.value = {
        leads: res.leads ?? 0,
        contacted: res.contacted ?? 0,
        quoted: res.quoted ?? 0,
        won: res.won ?? 0,
        lost: res.lost ?? 0,
        contactRate: res.contactRate ?? 0,
        quoteRate: res.quoteRate ?? 0,
        winRate: res.winRate ?? 0,
        totalWinRate: res.totalWinRate ?? 0
      }
    }
  } catch (error) {
    console.error('Failed to load funnel data:', error)
  } finally {
    loading.value = false
  }
}

const loadTrendData = async () => {
  try {
    const res: any = await getTrendData(timeRange.value)
    if (res && res.dates) {
      trendData.value = {
        dates: res.dates || [],
        wonData: res.wonData || [],
        lostData: res.lostData || [],
        totalData: res.totalData || []
      }
    } else {
      trendData.value = {
        dates: [],
        wonData: [],
        lostData: [],
        totalData: []
      }
    }
  } catch (error) {
    console.error('Failed to load trend data:', error)
  }
}

const loadAllData = async () => {
  loading.value = true
  try {
    await Promise.all([loadFunnelData(), loadTrendData()])
  } finally {
    loading.value = false
  }
}

const handleTimeChange = (value: string) => {
  timeRange.value = value
  
  if (props.autoLoad === false) {
    emit('timeRangeChange', value)
  } else {
    loadAllData()
  }
}

const handleFunnelClick = (params: any) => {
  const stage = funnelStages.value.find(s => s.name === params.name)
  if (stage) {
    currentStage.value = stage
    showCustomerModal.value = true
    loadStageCustomers()
  }
}

const handleStageClick = (stage: any) => {
  currentStage.value = stage
  showCustomerModal.value = true
  loadStageCustomers()
}

const loadStageCustomers = async () => {
  customerLoading.value = true
  try {
    const stageKey = currentStage.value?.key || ''
    const res: any = await getStageCustomers(stageKey)
    stageCustomers.value = res?.customers || []
    customerPagination.value.total = res?.total || 0
  } catch (error) {
    console.error('Failed to load stage customers:', error)
  } finally {
    customerLoading.value = false
  }
}

onMounted(() => {
  if (props.externalFunnelData && props.externalFunnelData.leads > 0) {
    funnelData.value = props.externalFunnelData
    trendData.value = props.externalTrendData!
    loading.value = false
  } else if (!props.autoLoad) {
    // 如果设置了 autoLoad=false，不自动加载，等待外部数据
  } else {
    loadAllData()
  }
})

watch(() => props.externalFunnelData, (newData) => {
  if (newData && newData.leads > 0) {
    funnelData.value = newData
    loading.value = false
  }
}, { deep: true })

watch(() => props.externalTrendData, (newData) => {
  if (newData && newData.dates) {
    trendData.value = newData
  }
}, { deep: true })
</script>