<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
    <div class="absolute top-6 left-6">
      <a href="/" class="flex items-center text-white hover:text-blue-200 transition-colors">
        <span class="mr-1">←</span>
        返回首页
      </a>
    </div>
    <div class="w-full max-w-md mx-4">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg mb-4">
            <svg class="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            </svg>
          </div>
          <h1 class="text-2xl font-bold text-gray-800 dark:text-white">客户管理系统</h1>
          <p class="text-gray-500 dark:text-gray-400 mt-2">Customer Relationship Management</p>
        </div>

        <NForm ref="formRef" :model="form" :rules="rules" class="space-y-6">
          <NFormItem label="用户名" path="username">
            <NAutoComplete
              v-model:value="form.username"
              :options="accountOptions"
              placeholder="请输入或选择用户名"
              @select="handleAccountSelect"
              clearable
            />
          </NFormItem>

          <NFormItem label="密码" path="password">
            <NInput
              v-model:value="form.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="请输入密码"
              class="w-full"
              :prefix-icon="LockClosed"
            >
              <template #suffix>
                <div @click="showPassword = !showPassword" class="cursor-pointer flex items-center">
                  <EyeOff v-if="showPassword" class="w-4 h-4 text-gray-400" />
                  <Eye v-else class="w-4 h-4 text-gray-400" />
                </div>
              </template>
            </NInput>
          </NFormItem>

          <NFormItem>
            <div class="flex items-center justify-between">
              <label class="flex items-center space-x-2 cursor-pointer">
                <NCheckbox v-model:checked="rememberMe" />
                <span class="text-sm text-gray-600 dark:text-gray-400">记住我</span>
              </label>
              <a href="/forgot-password" class="text-sm text-blue-500 hover:text-blue-600">忘记密码？</a>
            </div>
          </NFormItem>

          <NButton
            type="primary"
            block
            size="large"
            :loading="loading"
            @click="handleSubmit"
            class="bg-blue-500 hover:bg-blue-600"
          >
            登录
          </NButton>
        </NForm>

        <div class="mt-6 text-center">
          <p class="text-gray-500 dark:text-gray-400">
            还没有账号？
            <a href="/register" class="text-blue-500 hover:text-blue-600">立即注册</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { NForm, NFormItem, NInput, NButton, NCheckbox, NAutoComplete } from 'naive-ui'
import { message } from '@/utils/message'
import { Person, LockClosed, Eye, EyeOff } from '@vicons/ionicons5'
import { useAuthStore } from '@/stores/auth'
import router from '@/router'

interface AccountItem {
  username: string
  password: string
}

const authStore = useAuthStore()
const formRef = ref()
const loading = ref(false)
const rememberMe = ref(localStorage.getItem('rememberMe') === 'true')
const showPassword = ref(false)

const savedAccounts = ref<AccountItem[]>([])
const currentAccountIndex = ref(-1)

const accountOptions = computed(() =>
  savedAccounts.value.map(acc => ({
    label: acc.username,
    value: acc.username
  }))
)

const form = reactive({
  username: '',
  password: ''
})

const handleAccountSelect = (username: string) => {
  if (!username) {
    form.password = ''
    return
  }
  const account = savedAccounts.value.find(acc => acc.username === username)
  if (account) {
    form.password = account.password
  }
}

const loadSavedAccounts = () => {
  try {
    const accounts = localStorage.getItem('savedAccounts')
    if (accounts) {
      savedAccounts.value = JSON.parse(accounts)
    }
    const lastUsername = localStorage.getItem('lastUsername')
    const lastPassword = localStorage.getItem('lastPassword')
    if (lastUsername) {
      form.username = lastUsername
      form.password = lastPassword || ''
      const index = savedAccounts.value.findIndex(acc => acc.username === lastUsername)
      if (index >= 0) {
        currentAccountIndex.value = index
      }
    }
  } catch (e) {
    console.error('Failed to load saved accounts:', e)
  }
}

const saveAccounts = () => {
  localStorage.setItem('savedAccounts', JSON.stringify(savedAccounts.value))
}

onMounted(() => {
  loadSavedAccounts()
  if (form.username || form.password) {
    rememberMe.value = true
  }
})

const rules = {
  username: {
    required: true,
    message: '请输入用户名',
    trigger: 'blur'
  },
  password: {
    required: true,
    message: '请输入密码',
    trigger: 'blur'
  }
}

const handleSubmit = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    loading.value = true

    const result = await authStore.login(form.username, form.password)
    const userRole = (result as any).user?.role

    const existingIndex = savedAccounts.value.findIndex(acc => acc.username === form.username)
    if (existingIndex >= 0) {
      savedAccounts.value[existingIndex].password = form.password
    } else {
      savedAccounts.value.push({ username: form.username, password: form.password })
    }
    saveAccounts()

    localStorage.setItem('lastUsername', form.username)
    localStorage.setItem('lastPassword', form.password)
    localStorage.setItem('rememberMe', rememberMe.value ? 'true' : 'false')

    message.success('登录成功')

    await new Promise(resolve => setTimeout(resolve, 500))

    console.log('Redirecting with role:', userRole)

    if (userRole === 'admin') {
      router.push('/dashboard/admin-dashboard')
    } else {
      router.push('/dashboard')
    }
  } catch (error) {
    message.error('登录失败，请检查用户名和密码')
  } finally {
    loading.value = false
  }
}
</script>