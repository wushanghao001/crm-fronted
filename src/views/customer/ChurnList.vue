<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-bold text-gray-800 dark:text-white">客户流失管理</h2>
        <p class="text-gray-500 dark:text-gray-400 mt-1">管理流失预警和已流失客户</p>
      </div>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h3 class="font-semibold text-gray-800 dark:text-white">流失预警</h3>
          <span class="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">{{ warningList.length }}</span>
        </div>
        <div class="p-4 space-y-3">
          <div v-for="item in warningList" :key="item.id" class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <p class="font-medium text-gray-800 dark:text-white">{{ item.name }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ item.reason }}</p>
            </div>
            <div class="flex space-x-2">
              <NButton size="small" type="primary" @click="handleRetain(item.id)">暂缓流失</NButton>
              <NButton size="small" @click="handleConfirm(item.id)">确认流失</NButton>
            </div>
          </div>
        </div>
      </div>
      
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h3 class="font-semibold text-gray-800 dark:text-white">已流失客户</h3>
          <span class="px-2 py-1 bg-red-100 text-red-700 rounded-full text-sm">{{ churnedList.length }}</span>
        </div>
        <div class="p-4 space-y-3">
          <div v-for="item in churnedList" :key="item.id" class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <p class="font-medium text-gray-800 dark:text-white">{{ item.name }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">流失时间: {{ item.churnedAt }}</p>
            </div>
            <NButton size="small" @click="handleReactivate(item.id)">重新激活</NButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { NButton } from 'naive-ui'
import { message } from '@/utils/message'

const warningList = ref<any[]>([])
const churnedList = ref<any[]>([])

const handleRetain = (id: number) => {
  warningList.value = warningList.value.filter(item => item.id !== id)
  message.success('已暂缓流失')
}

const handleConfirm = (id: number) => {
  const item = warningList.value.find(i => i.id === id)
  if (item) {
    churnedList.value.push({
      id: id + 100,
      name: item.name,
      churnedAt: new Date().toISOString().split('T')[0],
      reason: item.reason
    })
    warningList.value = warningList.value.filter(i => i.id !== id)
    message.success('已确认流失')
  }
}

const handleReactivate = (id: number) => {
  churnedList.value = churnedList.value.filter(item => item.id !== id)
  message.success('已重新激活')
}

const loadChurnData = async () => {
  try {
    warningList.value = [
      { id: 1, name: '深圳科技有限公司', reason: '连续3个月未下单', lastContact: '2024-01-12' },
      { id: 2, name: '杭州互联网公司', reason: '服务响应不及时', lastContact: '2024-01-10' },
      { id: 3, name: '西安医疗器械', reason: '竞品价格更低', lastContact: '2024-01-08' }
    ]
    churnedList.value = [
      { id: 101, name: '青岛化工集团', churnedAt: '2024-01-06', reason: '合同到期未续签' },
      { id: 102, name: '南京物流企业', churnedAt: '2024-01-03', reason: '业务调整' }
    ]
  } catch (error) {
    console.error('加载流失数据失败', error)
    warningList.value = [
      { id: 1, name: '深圳科技有限公司', reason: '连续3个月未下单', lastContact: '2024-01-12' },
      { id: 2, name: '杭州互联网公司', reason: '服务响应不及时', lastContact: '2024-01-10' },
      { id: 3, name: '西安医疗器械', reason: '竞品价格更低', lastContact: '2024-01-08' }
    ]
    churnedList.value = [
      { id: 101, name: '青岛化工集团', churnedAt: '2024-01-06', reason: '合同到期未续签' },
      { id: 102, name: '南京物流企业', churnedAt: '2024-01-03', reason: '业务调整' }
    ]
  }
}

onMounted(() => {
  loadChurnData()
})
</script>
