<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-bold text-gray-800 dark:text-white">牌号档案维护</h2>
        <p class="text-gray-500 dark:text-gray-400 mt-1">管理牌号数据</p>
        <p class="text-sm text-amber-600 mt-1">提示：仅管理员可操作增删改，普通用户仅供查询</p>
      </div>
      <NButton v-if="authStore.hasPermission('brandcode:add')" type="primary" @click="handleAdd">
        <template #icon>
          <Add />
        </template>
        新增牌号
      </NButton>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div class="p-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex flex-wrap gap-4">
          <div class="flex-1 min-w-[200px]">
            <NInput
              v-model:value="searchKeyword"
              placeholder="搜索牌号名称或编码"
              class="w-full"
              clearable
              @keyup.enter="handleSearch"
            />
          </div>
          <NButton type="primary" @click="handleSearch">搜索</NButton>
          <NButton @click="handleReset">重置</NButton>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
              <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400 w-12">
                <NCheckbox :checked="isAllSelected" :indeterminate="selectedIds.length > 0 && !isAllSelected" @update:checked="handleSelectAll" />
              </th>
              <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">牌号名称</th>
              <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">牌号编码</th>
              <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">状态</th>
              <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">创建时间</th>
              <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in dataList" :key="item.id" class="border-b border-gray-100 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
              <td class="py-3 px-4">
                <NCheckbox :checked="selectedIds.includes(item.id)" @update:checked="(checked) => handleSelect(item.id, checked)" />
              </td>
              <td class="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">{{ item.name }}</td>
              <td class="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{{ item.code }}</td>
              <td class="py-3 px-4">
                <NTag :type="item.status === 1 ? 'success' : 'default'" size="small">
                  {{ item.status === 1 ? '启用' : '禁用' }}
                </NTag>
              </td>
              <td class="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{{ formatDate(item.createdAt) }}</td>
              <td class="py-3 px-4">
                <div class="flex gap-2">
                  <NButton v-if="authStore.hasPermission('brandcode:edit')" size="small" text @click="handleEdit(item)">
                    <template #icon><Pencil /></template>
                    编辑
                  </NButton>
                  <NPopconfirm v-if="authStore.hasPermission('brandcode:delete')" @positive-click="handleDelete(item.id)">
                    <template #trigger>
                      <NButton size="small" text type="error">删除</NButton>
                    </template>
                    确认删除该牌号？
                  </NPopconfirm>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="dataList.length === 0" class="py-12 text-center text-gray-400">
          暂无数据
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

    <NModal v-model:show="showModal" preset="card" :title="isEdit ? '编辑牌号' : '新增牌号'" style="width: 500px;">
      <NForm :model="formData" label-placement="left" label-width="100">
        <NFormItem label="牌号名称" required>
          <NInput v-model:value="formData.name" placeholder="请输入牌号名称" />
        </NFormItem>
        <NFormItem label="牌号编码" required>
          <NInput v-model:value="formData.code" placeholder="请输入牌号编码" />
        </NFormItem>
        <NFormItem label="状态">
          <NSelect v-model:value="formData.status" :options="statusOptions" />
        </NFormItem>
      </NForm>
      <template #footer>
        <div class="flex justify-end gap-2">
          <NButton @click="showModal = false">取消</NButton>
          <NButton type="primary" @click="handleSubmit" :loading="submitLoading">确定</NButton>
        </div>
      </template>
    </NModal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { NButton, NInput, NCheckbox, NPagination, NModal, NForm, NFormItem, NSelect, NPopconfirm, NTag } from 'naive-ui'
import { Add, Pencil } from '@vicons/ionicons5'
import { getBrandCodes, createBrandCode, updateBrandCode, deleteBrandCode, batchDeleteBrandCodes, BrandCode } from '@/api/brandCode'
import { useAuthStore } from '@/stores/auth'
import { message } from '@/utils/message'

const authStore = useAuthStore()

const searchKeyword = ref('')
const loading = ref(false)
const submitLoading = ref(false)
const dataList = ref<BrandCode[]>([])
const selectedIds = ref<number[]>([])

const showModal = ref(false)
const isEdit = ref(false)
const editId = ref<number | null>(null)

const formData = reactive({
  name: '',
  code: '',
  status: 1
})

const statusOptions = [
  { label: '启用', value: 1 },
  { label: '禁用', value: 0 }
]

const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0
})

const isAllSelected = computed(() => {
  return dataList.value.length > 0 && selectedIds.value.length === dataList.value.length
})

const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  if (dateStr.includes('T')) {
    return dateStr.replace('T', ' ').substring(0, 19)
  }
  return dateStr
}

const loadData = async () => {
  loading.value = true
  try {
    const res = await getBrandCodes({
      page: pagination.page,
      pageSize: pagination.pageSize,
      keyword: searchKeyword.value || undefined
    })
    dataList.value = res.list || []
    pagination.total = res.total || 0
  } catch (error: any) {
    message.error(error.message || '加载失败')
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  pagination.page = 1
  loadData()
}

const handleReset = () => {
  searchKeyword.value = ''
  pagination.page = 1
  loadData()
}

const handlePageChange = (page: number) => {
  pagination.page = page
  loadData()
}

const handlePageSizeChange = (pageSize: number) => {
  pagination.pageSize = pageSize
  pagination.page = 1
  loadData()
}

const handleSelectAll = (checked: boolean) => {
  if (checked) {
    selectedIds.value = dataList.value.map(item => item.id)
  } else {
    selectedIds.value = []
  }
}

const handleSelect = (id: number, checked: boolean) => {
  if (checked) {
    selectedIds.value.push(id)
  } else {
    selectedIds.value = selectedIds.value.filter(item => item !== id)
  }
}

const handleAdd = () => {
  isEdit.value = false
  editId.value = null
  formData.name = ''
  formData.code = ''
  formData.status = 1
  showModal.value = true
}

const handleEdit = (item: BrandCode) => {
  isEdit.value = true
  editId.value = item.id
  formData.name = item.name
  formData.code = item.code
  formData.status = item.status
  showModal.value = true
}

const handleSubmit = async () => {
  if (!formData.name || !formData.code) {
    message.error('请填写完整信息')
    return
  }

  submitLoading.value = true
  try {
    if (isEdit.value && editId.value) {
      await updateBrandCode(editId.value, formData)
      message.success('更新成功')
    } else {
      await createBrandCode(formData)
      message.success('创建成功')
    }
    showModal.value = false
    loadData()
  } catch (error: any) {
    message.error(error.message || '操作失败')
  } finally {
    submitLoading.value = false
  }
}

const handleDelete = async (id: number) => {
  try {
    await deleteBrandCode(id)
    message.success('删除成功')
    loadData()
  } catch (error: any) {
    message.error(error.message || '删除失败')
  }
}

onMounted(() => {
  loadData()
})
</script>