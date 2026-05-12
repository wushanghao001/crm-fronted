<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-bold text-gray-800 dark:text-white">客户跟进查询</h2>
        <p class="text-gray-500 dark:text-gray-400 mt-1">查看所有客户的跟进记录</p>
      </div>
      <div class="flex gap-3">
        <NButton @click="handleBatchExport">
          <DownloadIcon class="w-4 h-4 mr-2" />
          导出
        </NButton>
      </div>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div class="p-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center gap-4" style="flex-wrap: nowrap; min-width: 0;">
          <NInput
            v-model:value="searchKeyword"
            placeholder="搜索客户名称或跟进内容"
            clearable
            @keyup.enter="handleSearch"
            style="width: 200px; flex-shrink: 0;"
          />
          <NSelect
            v-model:value="followTypeFilter"
            placeholder="跟进方式"
            style="width: 120px; flex-shrink: 0;"
            :options="followTypeOptions"
          />
          <NSelect
            v-model:value="followResultFilter"
            placeholder="跟进结果"
            style="width: 130px; flex-shrink: 0;"
            :options="followResultOptions"
          />
          <NSelect
            v-model:value="intentLevelFilter"
            placeholder="意向度"
            style="width: 100px; flex-shrink: 0;"
            :options="intentLevelOptions"
          />
          <NDatePicker
            v-model:value="dateRange"
            type="daterange"
            clearable
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            style="width: 280px; flex-shrink: 0;"
            @update:value="handleSearch"
          />
          <NButton type="primary" @click="handleSearch" style="flex-shrink: 0;">搜索</NButton>
          <NButton @click="handleReset" style="flex-shrink: 0;">重置</NButton>
        </div>
      </div>

      <div class="p-4 bg-yellow-50 dark:bg-yellow-900/20 border-b border-gray-200 dark:border-gray-700">
        <p class="text-sm text-yellow-800 dark:text-yellow-200">
          <span class="font-medium">提示：</span>如需增删改客户跟进记录，请到 <span class="font-medium text-blue-600 cursor-pointer hover:underline" @click="goToCustomerList">客户列表</span> 中选择客户后点击 <span class="font-medium">跟进</span> 按钮进行操作。
        </p>
      </div>

      <div class="overflow-x-auto">
        <NDataTable
          :columns="columns"
          :data="followList"
          :loading="loading"
          :pagination="false"
          :scroll-x="1400"
          :scroll-y="400"
          :row-key="(row) => row.id"
        />
        <div v-if="followList.length === 0" class="py-12 text-center text-gray-400">
          暂无跟进记录数据
        </div>
      </div>

      <div class="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-700">
        <span class="text-sm text-gray-500">共 {{ pagination.total }} 条</span>
        <NPagination
          v-model:page="pagination.page"
          v-model:page-size="pagination.pageSize"
          :page-count="Math.ceil(pagination.total / pagination.pageSize) || 1"
          :page-sizes="[10, 20, 50, 100]"
          :show-size-picker="true"
          :total="pagination.total"
          @update:page="handlePageChange"
          @update:page-size="handlePageSizeChange"
        />
      </div>
    </div>

    <NModal v-model:show="showDetailModal" preset="card" title="跟进详情" style="width: 600px;">
      <div v-if="currentFollow" class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="text-sm text-gray-500">客户名称</p>
            <p class="mt-1 text-gray-800 dark:text-white">{{ currentFollow.customerName || '未知客户' }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500">跟进人</p>
            <p class="mt-1 text-gray-800 dark:text-white">{{ currentFollow.followUserName || '-' }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500">跟进方式</p>
            <p class="mt-1">
              <span :class="getFollowTypeClass(currentFollow.followType)">
                {{ getFollowTypeText(currentFollow.followType) }}
              </span>
            </p>
          </div>
          <div>
            <p class="text-sm text-gray-500">跟进结果</p>
            <p class="mt-1">
              <span :class="getFollowResultClass(currentFollow.followResult)">
                {{ getFollowResultText(currentFollow.followResult) }}
              </span>
            </p>
          </div>
          <div>
            <p class="text-sm text-gray-500">意向度</p>
            <p class="mt-1">
              <span :class="getIntentLevelClass(currentFollow.intentLevel)">
                {{ getIntentLevelText(currentFollow.intentLevel) }}
              </span>
            </p>
          </div>
          <div>
            <p class="text-sm text-gray-500">下次跟进时间</p>
            <p class="mt-1 text-gray-800 dark:text-white">
              {{ currentFollow.nextFollowTime ? formatDateTime(currentFollow.nextFollowTime) : '-' }}
            </p>
          </div>
          <div class="col-span-2">
            <p class="text-sm text-gray-500">跟进内容</p>
            <p class="mt-1 text-gray-800 dark:text-white whitespace-pre-wrap">{{ currentFollow.content || '-' }}</p>
          </div>
          <div v-if="currentFollow.remark" class="col-span-2">
            <p class="text-sm text-gray-500">备注</p>
            <p class="mt-1 text-gray-800 dark:text-white whitespace-pre-wrap">{{ currentFollow.remark }}</p>
          </div>
          <div class="col-span-2">
            <p class="text-sm text-gray-500">跟进时间</p>
            <p class="mt-1 text-gray-800 dark:text-white">
              {{ currentFollow.createdAt ? formatDateTime(currentFollow.createdAt) : '-' }}
            </p>
          </div>
        </div>
      </div>
      <template #footer>
        <div class="flex justify-end">
          <NButton @click="showDetailModal = false">关闭</NButton>
        </div>
      </template>
    </NModal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed, h } from 'vue'
import { useRouter } from 'vue-router'
import {
  NButton, NInput, NSelect, NPagination, NModal,
  NDatePicker, NTag, NDataTable, NDropdown, NSpace
} from 'naive-ui'
import { Download as DownloadIcon } from '@vicons/ionicons5'
import { message } from '@/utils/message'
import { getFollowList } from '@/api/customerFollow'

const router = useRouter()

const searchKeyword = ref('')
const followTypeFilter = ref('')
const followResultFilter = ref('')
const intentLevelFilter = ref('')
const dateRange = ref<[number, number] | null>(null)
const loading = ref(false)
const followList = ref<any[]>([])

const showDetailModal = ref(false)
const currentFollow = ref<any>(null)

const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0
})

const followTypeOptions = [
  { label: '全部方式', value: '' },
  { label: '电话', value: 'phone' },
  { label: '微信', value: 'wechat' },
  { label: '邮件', value: 'email' },
  { label: '面谈', value: 'meeting' },
  { label: '短信', value: 'sms' },
  { label: '视频会议', value: 'video' },
  { label: '其他', value: 'other' }
]

const followResultOptions = [
  { label: '全部结果', value: '' },
  { label: '初步沟通', value: 'initial_contact' },
  { label: '需求确认', value: 'requirement' },
  { label: '方案报价', value: 'quotation' },
  { label: '商务谈判', value: 'negotiation' },
  { label: '待成交', value: 'pending_deal' },
  { label: '已成交', value: 'closed' },
  { label: '无意向', value: 'lost' },
  { label: '客户失联', value: 'contact_lost' }
]

const intentLevelOptions = [
  { label: '全部', value: '' },
  { label: '高意向', value: 'high' },
  { label: '中意向', value: 'medium' },
  { label: '低意向', value: 'low' }
]

const renderActions = (row: any) => {
  const options = [
    { label: '查看', key: 'view' }
  ]
  const handleSelect = (key: string) => {
    if (key === 'view') viewDetail(row)
  }
  return h(NDropdown, {
    trigger: 'click',
    options,
    onSelect: handleSelect
  }, {
    default: () => h('a', { class: 'text-blue-500 hover:text-blue-700 cursor-pointer flex items-center justify-center', style: 'font-size: 18px; width: 100%; height: 100%;' }, '...')
  })
}

const columns = [
  { title: '客户名称', key: 'customerName', width: 150, ellipsis: { tooltip: true } },
  { title: '跟进方式', key: 'followType', width: 100,
    render: (row: any) => h('span', { class: getFollowTypeClass(row.followType) }, getFollowTypeText(row.followType)) },
  { title: '跟进结果', key: 'followResult', width: 120,
    render: (row: any) => h('span', { class: getFollowResultClass(row.followResult) }, getFollowResultText(row.followResult)) },
  { title: '意向度', key: 'intentLevel', width: 100,
    render: (row: any) => h('span', { class: getIntentLevelClass(row.intentLevel) }, getIntentLevelText(row.intentLevel)) },
  { title: '跟进内容', key: 'content', width: 250, ellipsis: { tooltip: true } },
  { title: '下次跟进', key: 'nextFollowTime', width: 150,
    render: (row: any) => row.nextFollowTime ? formatDateTime(row.nextFollowTime) : '-' },
  { title: '跟进人', key: 'followUserName', width: 100 },
  { title: '跟进时间', key: 'createdAt', width: 150,
    render: (row: any) => row.createdAt ? formatDateTime(row.createdAt) : '-' },
  { title: '操作', key: 'actions', width: 60, fixed: 'right', render: renderActions }
]

const followTypeMap: Record<string, string> = {
  'phone': '电话',
  'wechat': '微信',
  'email': '邮件',
  'meeting': '面谈',
  'sms': '短信',
  'video': '视频会议',
  'other': '其他'
}

const followResultMap: Record<string, string> = {
  'initial_contact': '初步沟通',
  'requirement': '需求确认',
  'quotation': '方案报价',
  'negotiation': '商务谈判',
  'pending_deal': '待成交',
  'closed': '已成交',
  'lost': '无意向',
  'contact_lost': '客户失联'
}

const intentLevelMap: Record<string, string> = {
  'high': '高意向',
  'medium': '中意向',
  'low': '低意向'
}

const getFollowTypeText = (type: string) => followTypeMap[type] || type || '-'
const getFollowResultText = (result: string) => followResultMap[result] || result || '-'
const getIntentLevelText = (level: string) => intentLevelMap[level] || level || '-'

const getFollowTypeClass = (type: string) => {
  const classMap: Record<string, string> = {
    'phone': 'px-2 py-1 rounded text-xs bg-blue-100 text-blue-700',
    'wechat': 'px-2 py-1 rounded text-xs bg-green-100 text-green-700',
    'email': 'px-2 py-1 rounded text-xs bg-purple-100 text-purple-700',
    'meeting': 'px-2 py-1 rounded text-xs bg-orange-100 text-orange-700',
    'sms': 'px-2 py-1 rounded text-xs bg-gray-100 text-gray-700',
    'video': 'px-2 py-1 rounded text-xs bg-pink-100 text-pink-700',
    'other': 'px-2 py-1 rounded text-xs bg-gray-100 text-gray-700'
  }
  return classMap[type] || 'px-2 py-1 rounded text-xs bg-gray-100 text-gray-700'
}

const getFollowResultClass = (result: string) => {
  const classMap: Record<string, string> = {
    'initial_contact': 'px-2 py-1 rounded text-xs bg-blue-100 text-blue-700',
    'requirement': 'px-2 py-1 rounded text-xs bg-cyan-100 text-cyan-700',
    'quotation': 'px-2 py-1 rounded text-xs bg-teal-100 text-teal-700',
    'negotiation': 'px-2 py-1 rounded text-xs bg-yellow-100 text-yellow-700',
    'pending_deal': 'px-2 py-1 rounded text-xs bg-amber-100 text-amber-700',
    'closed': 'px-2 py-1 rounded text-xs bg-green-100 text-green-700',
    'lost': 'px-2 py-1 rounded text-xs bg-red-100 text-red-700',
    'contact_lost': 'px-2 py-1 rounded text-xs bg-gray-100 text-gray-700'
  }
  return classMap[result] || 'px-2 py-1 rounded text-xs bg-gray-100 text-gray-700'
}

const getIntentLevelClass = (level: string) => {
  const classMap: Record<string, string> = {
    'high': 'px-2 py-1 rounded text-xs bg-red-100 text-red-700',
    'medium': 'px-2 py-1 rounded text-xs bg-yellow-100 text-yellow-700',
    'low': 'px-2 py-1 rounded text-xs bg-gray-100 text-gray-700'
  }
  return classMap[level] || 'px-2 py-1 rounded text-xs bg-gray-100 text-gray-700'
}

const formatDateTime = (dateStr: string) => {
  if (!dateStr) return ''
  if (dateStr.includes('T')) {
    return dateStr.split('T')[0] + ' ' + dateStr.split('T')[1].substring(0, 5)
  }
  return dateStr
}

const handleSearch = () => {
  pagination.page = 1
  loadFollowList()
}

const handleReset = () => {
  searchKeyword.value = ''
  followTypeFilter.value = ''
  followResultFilter.value = ''
  intentLevelFilter.value = ''
  dateRange.value = null
  pagination.page = 1
  loadFollowList()
}

const goToCustomerList = () => {
  router.push('/dashboard/customers')
}

const handlePageChange = (page: number) => {
  pagination.page = page
  loadFollowList()
}

const handlePageSizeChange = (pageSize: number) => {
  pagination.pageSize = pageSize
  pagination.page = 1
  loadFollowList()
}

const viewDetail = (row: any) => {
  currentFollow.value = row
  showDetailModal.value = true
}

const handleBatchExport = () => {
  if (followList.value.length === 0) {
    message.warning('暂无数据可导出')
    return
  }

  const headers = ['客户名称', '跟进方式', '跟进结果', '意向度', '跟进内容', '下次跟进时间', '跟进人', '跟进时间']
  const rows = followList.value.map(item => [
    item.customerName || '',
    getFollowTypeText(item.followType),
    getFollowResultText(item.followResult),
    getIntentLevelText(item.intentLevel),
    item.content || '',
    item.nextFollowTime ? formatDateTime(item.nextFollowTime) : '',
    item.followUserName || '',
    item.createdAt ? formatDateTime(item.createdAt) : ''
  ])

  const csvContent = [headers.join(','), ...rows.map(row => row.map(cell => `"${cell}"`).join(','))].join('\n')
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `客户跟进记录_${new Date().toISOString().split('T')[0]}.csv`
  link.click()

  message.success('导出成功')
}

const loadFollowList = async () => {
  loading.value = true
  try {
    const params: any = {
      pageNum: pagination.page,
      pageSize: pagination.pageSize
    }

    if (searchKeyword.value) {
      params.keyword = searchKeyword.value
    }
    if (followTypeFilter.value) {
      params.followType = followTypeFilter.value
    }
    if (followResultFilter.value) {
      params.followResult = followResultFilter.value
    }
    if (intentLevelFilter.value) {
      params.intentLevel = intentLevelFilter.value
    }
    if (dateRange.value && dateRange.value[0]) {
      const formatDate = (timestamp: number) => {
        const date = new Date(timestamp)
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
      }
      params.startDate = formatDate(dateRange.value[0])
      params.endDate = formatDate(dateRange.value[1])
    }

    const response = await getFollowList(params as any)
    const result = response as any

    if (result && result.list) {
      followList.value = result.list || []
      pagination.total = result.total || 0
    } else {
      followList.value = []
      pagination.total = 0
    }
  } catch (error: any) {
    message.error(error.message || '获取跟进记录失败')
    followList.value = []
    pagination.total = 0
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadFollowList()
})
</script>