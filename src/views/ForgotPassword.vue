<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
    <div class="w-full max-w-md mx-4">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
        <div class="text-center mb-8">
          <div class="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span class="text-white text-2xl font-bold">C</span>
          </div>
          <h1 class="text-2xl font-bold text-gray-800 dark:text-white">CRM系统</h1>
          <p class="text-gray-500 dark:text-gray-400 mt-2">忘记密码</p>
        </div>

        <NForm ref="formRef" :model="form" :rules="rules" class="space-y-6">
          <NFormItem label="邮箱" path="email">
            <NInput
              v-model:value="form.email"
              placeholder="请输入注册时的邮箱"
              class="w-full"
              :prefix-icon="Mail"
            />
          </NFormItem>

          <NFormItem label="验证码" path="code">
            <div class="flex gap-2">
              <NInput
                v-model:value="form.code"
                placeholder="请输入验证码"
                class="flex-1"
              />
              <NButton
                :disabled="countdown > 0"
                @click="handleSendCode"
                class="bg-blue-500 hover:bg-blue-600"
              >
                {{ countdown > 0 ? `${countdown}s后重发` : (codeSent ? '已发送' : '发送验证码') }}
              </NButton>
            </div>
          </NFormItem>

          <NFormItem label="新密码" path="password">
            <NInput
              v-model:value="form.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="请输入新密码"
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

          <NFormItem label="确认密码" path="confirmPassword">
            <NInput
              v-model:value="form.confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              placeholder="请再次输入新密码"
              class="w-full"
              :prefix-icon="LockClosed"
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
            重置密码
          </NButton>
        </NForm>

        <div class="mt-6 text-center">
          <p class="text-gray-500 dark:text-gray-400">
            想起密码了？
            <a href="/login" class="text-blue-500 hover:text-blue-600">立即登录</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { NForm, NFormItem, NInput, NButton } from 'naive-ui'
import { message } from '@/utils/message'
import { Mail, LockClosed, Eye, EyeOff } from '@vicons/ionicons5'
import request from '@/api/request'

const formRef = ref()
const loading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const countdown = ref(0)
const codeSent = ref(false)

const form = reactive({
  email: '',
  code: '',
  password: '',
  confirmPassword: ''
})

const rules = {
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: '请输入有效的邮箱地址', trigger: 'blur' }
  ],
  code: {
    required: true,
    message: '请输入验证码',
    trigger: 'blur'
  },
  password: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
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

const handleSendCode = async () => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!emailRegex.test(form.email)) {
    message.error('请输入有效的邮箱地址')
    return
  }

  try {
    await request.post('/auth/send-code', { email: form.email, type: 'forgot_password' })
    message.success('验证码已发送到您的邮箱')
    codeSent.value = true
    countdown.value = 60
    const timer = setInterval(() => {
      countdown.value--
      if (countdown.value <= 0) {
        clearInterval(timer)
      }
    }, 1000)
  } catch (error: any) {
    message.error(error.message || '发送验证码失败')
  }
}

const handleSubmit = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    loading.value = true

    try {
      await request.post('/auth/reset-password', {
        email: form.email,
        code: form.code,
        newPassword: form.password
      })
      message.success('密码重置成功')
      setTimeout(() => {
        window.location.href = '/login'
      }, 1500)
    } catch (error: any) {
      message.error(error.message || '重置密码失败')
    }
  } catch (error) {
    console.log('表单验证失败')
  } finally {
    loading.value = false
  }
}
</script>
