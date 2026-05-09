<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-bold text-gray-800 dark:text-white">日志管理</h2>
        <p class="text-gray-500 dark:text-gray-400 mt-1">查看系统操作日志</p>
      </div>
    </div>
    
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div class="p-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex flex-wrap gap-4">
          <div class="flex-1 min-w-[200px]">
            <NInput
              v-model:value="searchKeyword"
              placeholder="搜索操作内容"
              class="w-full"
              :prefix-icon="SearchIcon"
              @keyup.enter="handleSearch"
            />
          </div>
          <NSelect
            v-model:value="typeFilter"
            placeholder="操作类型"
            class="w-40"
            :options="typeOptions"
          />
          <NSelect
            v-model:value="operatorFilter"
            placeholder="操作人"
            class="w-32"
            :options="operatorOptions"
          />
          <NButton type="primary" @click="handleSearch">搜索</NButton>
          <NButton @click="handleReset">重置</NButton>
        </div>
      </div>
      
      <div class="overflow-x-auto">
        <div class="min-w-[1200px]">
          <table class="w-full">
            <thead>
              <tr class="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400 w-120">操作人</th>
                <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400 w-100">操作类型</th>
                <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400 w-350">操作内容</th>
                <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400 w-100">模块</th>
                <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400 w-140">IP地址</th>
                <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400 w-80">状态</th>
                <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400 w-160">操作时间</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="log in logList"
                :key="log.id"
                class="border-b border-gray-100 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                @click="handleRowClick(log)"
              >
                <td class="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">{{ log.operator }}</td>
                <td class="py-3 px-4 text-sm">
                  <span :class="getTypeClass(log.type)">
                    {{ getTypeLabel(log.type) }}
                  </span>
                </td>
                <td class="py-3 px-4 text-sm text-gray-600 dark:text-gray-400 truncate">{{ log.content }}</td>
                <td class="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{{ log.module || '-' }}</td>
                <td class="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{{ log.ip }}</td>
                <td class="py-3 px-4 text-sm">
                  <span :class="log.status === 1 ? 'px-2 py-1 rounded-full text-xs bg-green-100 text-green-700' : 'px-2 py-1 rounded-full text-xs bg-red-100 text-red-700'">
                    {{ log.status === 1 ? '成功' : '失败' }}
                  </span>
                </td>
                <td class="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{{ formatDate(log.createdAt) }}</td>
              </tr>
            </tbody>
          </table>
          
          <div v-if="logList.length === 0" class="py-12 text-center text-gray-400">
            暂无日志数据
          </div>
        </div>
      </div>
      
      <div class="p-4 flex justify-between items-center border-t border-gray-200 dark:border-gray-700">
        <span class="text-sm text-gray-500">共 {{ pagination.total }} 条记录</span>
        <NPagination
          v-model:page="pagination.page"
          :page-size="pagination.pageSize"
          :item-count="pagination.total"
          @update:page="handlePageChange"
          @update:page-size="handlePageSizeChange"
          :page-sizes="[10, 20, 50, 100]"
          show-size-picker
        />
      </div>
    </div>

    <NModal v-model:show="showDetailModal" title="日志详情" preset="card" :style="{ width: '600px' }">
      <div v-if="selectedLog" class="space-y-4">
        <div class="flex justify-between">
          <span class="text-gray-500 dark:text-gray-400">操作类型</span>
          <span :class="getTypeClass(selectedLog.type)" class="px-2 py-1 rounded-full text-xs">
            {{ getTypeLabel(selectedLog.type) }}
          </span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-500 dark:text-gray-400">操作人</span>
          <span class="text-gray-800 dark:text-white">{{ selectedLog.operator }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-500 dark:text-gray-400">操作时间</span>
          <span class="text-gray-800 dark:text-white">{{ selectedLog.createdAt }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-500 dark:text-gray-400">IP地址</span>
          <span class="text-gray-800 dark:text-white">{{ selectedLog.ip }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-500 dark:text-gray-400">模块</span>
          <span class="text-gray-800 dark:text-white">{{ selectedLog.module || '-' }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-500 dark:text-gray-400">状态</span>
          <span :class="selectedLog.status === 1 ? 'text-green-600' : 'text-red-600'" class="font-medium">
            {{ selectedLog.status === 1 ? '成功' : '失败' }}
          </span>
        </div>
        <div>
          <span class="text-gray-500 dark:text-gray-400 block mb-2">操作内容</span>
          <p class="text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">{{ selectedLog.content }}</p>
        </div>
        <div v-if="selectedLog.params" class="mt-4">
          <span class="text-gray-500 dark:text-gray-400 block mb-2">请求参数</span>
          <pre class="text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-sm overflow-x-auto">{{ selectedLog.params }}</pre>
        </div>
        <div v-if="selectedLog.result" class="mt-4">
          <span class="text-gray-500 dark:text-gray-400 block mb-2">执行结果</span>
          <pre class="text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-sm overflow-x-auto">{{ selectedLog.result }}</pre>
        </div>
        <div v-if="selectedLog.errorMessage" class="mt-4">
          <span class="text-gray-500 dark:text-gray-400 block mb-2">错误信息</span>
          <pre class="text-red-500 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-sm overflow-x-auto">{{ selectedLog.errorMessage }}</pre>
        </div>
      </div>
      <template #footer>
        <div class="flex justify-end gap-2">
          <NButton @click="showDetailModal = false">关闭</NButton>
        </div>
      </template>
    </NModal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { NButton, NInput, NSelect, NPagination, NModal } from 'naive-ui'
import { Search } from '@vicons/ionicons5'
import { message } from '@/utils/message'
import { getLogList } from '@/api/system'

const searchKeyword = ref('')
const typeFilter = ref('')
const operatorFilter = ref('')
const loading = ref(false)
const SearchIcon = Search

const showDetailModal = ref(false)
const selectedLog = ref<any>(null)

const logList = ref<any[]>([])

const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0
})

const typeOptions = [
  { label: '全部', value: '' },
  { label: '登录', value: 'login' },
  { label: '创建', value: 'create' },
  { label: '更新', value: 'update' },
  { label: '删除', value: 'delete' },
  { label: '查询', value: 'query' }
]

const operatorOptions = [
  { label: '全部', value: '' },
  { label: 'admin', value: 'admin' },
  { label: 'user', value: 'user' }
]

const typeMap: Record<string, { label: string; class: string }> = {
  'login': { label: '登录', class: 'px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700' },
  'create': { label: '创建', class: 'px-2 py-1 rounded-full text-xs bg-green-100 text-green-700' },
  'update': { label: '更新', class: 'px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700' },
  'delete': { label: '删除', class: 'px-2 py-1 rounded-full text-xs bg-red-100 text-red-700' },
  'query': { label: '查询', class: 'px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700' }
}

const getTypeLabel = (type: string) => {
  return typeMap[type]?.label || type
}

const getTypeClass = (type: string) => {
  return typeMap[type]?.class || 'px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700'
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  if (dateStr.includes('T')) {
    return dateStr.replace('T', ' ').substring(0, 19)
  }
  return dateStr
}

const loadLogs = async () => {
  loading.value = true
  try {
    const res = await getLogList({
      pageNum: pagination.page,
      pageSize: pagination.pageSize,
      operator: operatorFilter.value,
      type: typeFilter.value
    })
    if (res.list && Array.isArray(res.list)) {
      logList.value = res.list
      pagination.total = res.total || 0
    } else if (Array.isArray(res)) {
      logList.value = res
      pagination.total = res.length
    } else {
      logList.value = []
      pagination.total = 0
    }
  } catch (error: any) {
    message.error(error.message || '加载失败')
    logList.value = []
    pagination.total = 0
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  pagination.page = 1
  loadLogs()
}

const handleReset = () => {
  searchKeyword.value = ''
  typeFilter.value = ''
  operatorFilter.value = ''
  pagination.page = 1
  loadLogs()
}

const handlePageChange = (page: number) => {
  pagination.page = page
  loadLogs()
}

const handlePageSizeChange = (pageSize: number) => {
  pagination.pageSize = pageSize
  pagination.page = 1
  loadLogs()
}

const handleRowClick = (row: any) => {
  selectedLog.value = row
  showDetailModal.value = true
}

onMounted(() => {
  loadLogs()
})
</script>