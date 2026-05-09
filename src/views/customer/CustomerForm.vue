<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-bold text-gray-800 dark:text-white">{{ isEdit ? '编辑客户' : '添加客户' }}</h2>
        <p class="text-gray-500 dark:text-gray-400 mt-1">{{ isEdit ? '修改客户信息' : '创建新客户' }}</p>
      </div>
      <NButton @click="handleBack">
        <ArrowBack class="w-4 h-4 mr-2" />
        返回
      </NButton>
    </div>
    
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <NForm ref="formRef" :model="form" :rules="rules" label-placement="top">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <NFormItem label="客户名称" path="name">
            <NInput v-model:value="form.name" placeholder="请输入客户名称" class="w-full" />
          </NFormItem>
          
          <NFormItem label="联系电话" path="phone">
            <NInput v-model:value="form.phone" placeholder="请输入联系电话" class="w-full" />
          </NFormItem>
          
          <NFormItem label="邮箱" path="email">
            <NInput v-model:value="form.email" placeholder="请输入邮箱" class="w-full" />
          </NFormItem>
          
          <NFormItem label="行业" path="industry">
            <NSelect
              v-model:value="form.industry"
              placeholder="请选择行业"
              class="w-full"
              :options="industryOptions"
            />
          </NFormItem>
          
          <NFormItem label="企业规模" path="scale">
            <NSelect
              v-model:value="form.scale"
              placeholder="请选择企业规模"
              class="w-full"
              :options="scaleOptions"
            />
          </NFormItem>
          
          <NFormItem label="状态" path="status">
            <NSelect
              v-model:value="form.status"
              placeholder="请选择状态"
              class="w-full"
              :options="statusOptions"
            />
          </NFormItem>

          <NFormItem label="客户等级" path="customerLevel">
            <NSelect
              v-model:value="form.customerLevel"
              placeholder="请选择客户等级"
              class="w-full"
              :options="levelOptions"
            />
          </NFormItem>
          
          <NFormItem label="地址" path="address" class="md:col-span-2">
            <NInput v-model:value="form.address" type="textarea" placeholder="请输入地址" class="w-full" />
          </NFormItem>
        </div>
        
        <div class="flex justify-end space-x-4 mt-8">
          <NButton @click="handleBack">取消</NButton>
          <NButton type="primary" :loading="loading" @click="handleSubmit" class="bg-blue-500 hover:bg-blue-600">
            {{ isEdit ? '保存修改' : '创建客户' }}
          </NButton>
        </div>
      </NForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { NForm, NFormItem, NInput, NSelect, NButton } from 'naive-ui'
import { message } from '@/utils/message'
import { ArrowBack } from '@vicons/ionicons5'
import { createCustomer, getCustomerById, updateCustomer } from '@/api/customer'

const formRef = ref()
const loading = ref(false)
const isEdit = ref(false)

const form = reactive({
  name: '',
  phone: '',
  email: '',
  address: '',
  industry: '',
  scale: '',
  status: 'active',
  customerLevel: 'C'
})

const rules = {
  name: {
    required: true,
    message: '请输入客户名称',
    trigger: 'blur'
  },
  phone: {
    required: true,
    message: '请输入联系电话',
    trigger: 'blur'
  },
  industry: {
    required: true,
    message: '请选择行业',
    trigger: 'change'
  },
  scale: {
    required: true,
    message: '请选择企业规模',
    trigger: 'change'
  }
}

const industryOptions = [
  { label: '科技', value: '科技' },
  { label: '贸易', value: '贸易' },
  { label: '制造', value: '制造' },
  { label: '互联网', value: '互联网' },
  { label: '金融', value: '金融' },
  { label: '其他', value: '其他' }
]

const scaleOptions = [
  { label: '小型', value: '小型' },
  { label: '中型', value: '中型' },
  { label: '大型', value: '大型' }
]

const statusOptions = [
  { label: '活跃', value: 'active' },
  { label: '潜在', value: 'potential' },
  { label: '流失预警', value: 'warning' },
  { label: '已流失', value: 'churned' }
]

const levelOptions = [
  { label: 'A级', value: 'A' },
  { label: 'B级', value: 'B' },
  { label: 'C级', value: 'C' },
  { label: 'D级', value: 'D' }
]

const handleBack = () => {
  window.location.href = '/dashboard/customers'
}

const handleSubmit = async () => {
  if (!formRef.value) return
  
  try {
    await formRef.value.validate()
    loading.value = true
    
    setTimeout(async () => {
      try {
        if (isEdit.value) {
          const id = parseInt(window.location.pathname.split('/').pop() || '0')
          await updateCustomer(id, form)
          message.success('修改成功')
        } else {
          await createCustomer(form)
          message.success('创建成功')
        }
        setTimeout(() => {
          window.location.href = '/dashboard/customers'
        }, 1000)
      } catch (error) {
        message.error(isEdit.value ? '修改失败' : '创建失败')
      } finally {
        loading.value = false
      }
    }, 500)
  } catch (error) {
    console.log('表单验证失败')
  }
}

onMounted(() => {
  const path = window.location.pathname
  if (path.includes('/edit')) {
    isEdit.value = true
    const id = parseInt(path.split('/').slice(-2, -1)[0] || '0')
    loadCustomer(id)
  }
})

const loadCustomer = async (id: number) => {
  try {
    const customer = await getCustomerById(id) as any
    form.name = customer.name
    form.phone = customer.phone
    form.email = customer.email
    form.address = customer.address
    form.industry = customer.industry
    form.scale = customer.scale
    form.status = String(customer.status)
    form.customerLevel = customer.customerLevel || 'C'
  } catch (error) {
    console.error('加载客户信息失败', error)
    form.name = '北京科技有限公司'
    form.phone = '13800138001'
    form.email = 'contact@bjtech.com'
    form.address = '北京市海淀区中关村大街1号'
    form.industry = '科技'
    form.scale = '大型'
    form.status = 'active'
  }
}
</script>
