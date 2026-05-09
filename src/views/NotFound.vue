<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div class="text-center">
      <div class="text-8xl font-bold text-blue-500 mb-4">404</div>
      <h1 class="text-2xl font-semibold text-gray-800 dark:text-white mb-2">页面未找到</h1>
      <p class="text-gray-500 dark:text-gray-400 mb-6">您访问的页面不存在或已被删除</p>
      <NButton type="primary" @click="goHome" class="bg-blue-500 hover:bg-blue-600">
        返回首页
      </NButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NButton } from 'naive-ui'

const goHome = () => {
  window.location.href = '/dashboard'
}
</script>
