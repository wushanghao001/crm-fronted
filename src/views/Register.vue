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

        <NForm ref="formRef" :model="form" :rules="rules" class="space-y-6" autocomplete="off">
          <NFormItem label="用户名" path="username">
            <NInput
              v-model:value="form.username"
              placeholder="请输入用户名"
              class="w-full"
              :prefix-icon="Person"
              autocomplete="off"
              name="register_username"
            />
          </NFormItem>

          <NFormItem label="邮箱" path="email">
            <NInput
              v-model:value="form.email"
              type="text"
              placeholder="请输入邮箱"
              class="w-full"
              :prefix-icon="Mail"
              autocomplete="off"
              name="register_email"
            >
              <template #feedback>
                <span class="text-xs text-gray-400">请使用有效邮箱，用于接收验证码</span>
              </template>
            </NInput>
          </NFormItem>

          <NFormItem label="电话" path="phone">
            <NInput
              v-model:value="form.phone"
              placeholder="请输入手机号"
              class="w-full"
              :prefix-icon="PhonePortrait"
              autocomplete="off"
              name="register_phone"
            />
          </NFormItem>

          <NFormItem label="密码" path="password">
            <NInput
              v-model:value="form.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="请输入密码"
              class="w-full"
              :prefix-icon="LockClosed"
              autocomplete="new-password"
              name="register_password"
            >
              <template #suffix>
                <div @click="showPassword = !showPassword" class="cursor-pointer flex items-center">
                  <EyeOff v-if="showPassword" class="w-4 h-4 text-gray-400" />
                  <Eye v-else class="w-4 h-4 text-gray-400" />
                </div>
              </template>
            </NInput>
          </NFormItem>

          <NFormItem label="确认密码" path="confirmPassword">
            <NInput
              v-model:value="form.confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              placeholder="请再次输入密码"
              class="w-full"
              :prefix-icon="LockClosed"
              autocomplete="new-password"
              name="register_confirm_password"
            >
              <template #suffix>
                <div @click="showConfirmPassword = !showConfirmPassword" class="cursor-pointer flex items-center">
                  <EyeOff v-if="showConfirmPassword" class="w-4 h-4 text-gray-400" />
                  <Eye v-else class="w-4 h-4 text-gray-400" />
                </div>
              </template>
            </NInput>
          </NFormItem>

          <NButton
            type="primary"
            block
            size="large"
            :loading="loading"
            @click="handleSubmit"
            class="bg-blue-500 hover:bg-blue-600"
          >
            注册
          </NButton>
        </NForm>

        <div class="mt-6 text-center">
          <p class="text-gray-500 dark:text-gray-400">
            已有账号？
            <a href="/login" class="text-blue-500 hover:text-blue-600">立即登录</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from 'vue'
import { NForm, NFormItem, NInput, NButton } from 'naive-ui'
import { message } from '@/utils/message'
import { Person, Mail, PhonePortrait, LockClosed, Eye, EyeOff } from '@vicons/ionicons5'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const formRef = ref()
const loading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const form = reactive({
  username: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: ''
})

onMounted(() => {
  const clearForm = () => {
    form.username = ''
    form.email = ''
    form.phone = ''
    form.password = ''
    form.confirmPassword = ''
  }
  
  nextTick(clearForm)
  setTimeout(clearForm, 100)
  setTimeout(clearForm, 500)
})

const rules = {
  username: {
    required: true,
    message: '请输入用户名',
    trigger: 'blur'
  },
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: '请输入有效的邮箱地址', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码至少6位', trigger: 'blur' }
  ],
  confirmPassword: {
    required: true,
    message: '请再次输入密码',
    trigger: 'blur',
    validator(rule: any, value: string) {
      if (value !== form.password) {
        return new Error('两次输入的密码不一致')
      }
      return true
    }
  }
}

const handleSubmit = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    loading.value = true

    setTimeout(async () => {
      try {
        await authStore.register(form.username, form.email, form.phone, form.password)
        message.success('注册成功')
        setTimeout(() => {
          window.location.href = '/login'
        }, 1000)
      } catch (error) {
        message.error('注册失败')
      } finally {
        loading.value = false
      }
    }, 500)
  } catch (error) {
    console.log('表单验证失败')
  }
}
</script>
