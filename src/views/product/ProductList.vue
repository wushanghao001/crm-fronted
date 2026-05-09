<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-bold text-gray-800">产品管理</h2>
        <p class="text-gray-500 mt-1">管理产品信息和分类</p>
      </div>
      <div class="flex gap-3" v-if="authStore.user?.role === 'admin'">
        <NButton v-if="selectedIds.length > 0" type="error" @click="handleBatchDelete">
          <Trash class="w-4 h-4 mr-2" />
          批量删除 ({{ selectedIds.length }})
        </NButton>
        <NButton v-if="selectedIds.length > 0" @click="showBatchStatusModal = true">
          批量修改状态
        </NButton>
        <NButton type="primary" class="bg-blue-500 hover:bg-blue-600" @click="handleAdd">
          <Add class="w-4 h-4 mr-2" />
          添加产品
        </NButton>
      </div>
    </div>
    
    <div class="bg-white rounded-xl shadow-sm border border-gray-200">
      <div class="p-4 border-b border-gray-200">
        <div class="flex flex-wrap gap-4">
          <div class="flex-1 min-w-[200px]">
            <NInput
              v-model:value="searchForm.keyword"
              placeholder="搜索产品名称或编码"
              class="w-full"
              :prefix-icon="SearchIcon"
              @keyup.enter="handleSearch"
            />
          </div>
          <NSelect
            v-model:value="searchForm.category"
            placeholder="产品分类"
            class="w-40"
            :options="categoryOptions"
          />
          <NSelect
            v-model:value="searchForm.status"
            placeholder="状态"
            class="w-32"
            :options="statusOptions"
          />
          <NButton type="primary" @click="handleSearch">搜索</NButton>
          <NButton @click="handleReset">重置</NButton>
        </div>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="bg-gray-50">
              <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 w-12">
                <NCheckbox 
                  :checked="isAllSelected" 
                  :indeterminate="selectedIds.length > 0 && !isAllSelected"
                  @update:checked="handleSelectAll"
                />
              </th>
              <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 min-w-[150px]">
                产品名称
              </th>
              <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 min-w-[120px]">
                产品编码
              </th>
              <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 min-w-[100px]">
                分类
              </th>
              <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 min-w-[100px]">
                价格
              </th>
              <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 min-w-[80px]">
                库存
              </th>
              <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 min-w-[80px]">
                状态
              </th>
              <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 min-w-[140px]">
                创建时间
              </th>
              <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 min-w-[140px]">
                更新时间
              </th>
              <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 w-48 sticky right-0 bg-gray-50 z-10">
                操作
              </th>
            </tr>
          </thead>
          <tbody v-if="!loading && productList.length > 0">
            <tr v-for="product in productList" :key="product.id" class="border-b border-gray-100 hover:bg-gray-50">
              <td class="py-3 px-4">
                <NCheckbox 
                  :checked="selectedIds.includes(product.id)"
                  @update:checked="(checked) => handleSelect(product.id, checked)"
                />
              </td>
              <td class="py-3 px-4 text-sm text-gray-800">{{ product.name }}</td>
              <td class="py-3 px-4 text-sm text-gray-800">{{ product.code }}</td>
              <td class="py-3 px-4">
                <span :class="getCategoryClass(product.category)" class="px-2 py-1 rounded-full text-xs">
                  {{ getCategoryText(product.category) }}
                </span>
              </td>
              <td class="py-3 px-4 text-sm text-gray-800">¥{{ product.price.toLocaleString() }}</td>
              <td class="py-3 px-4">
                <span :class="getStockClass(product.stock)" class="text-sm font-medium">
                  {{ product.stock }}
                  <span v-if="product.stock < 10" class="ml-1">⚠</span>
                </span>
              </td>
              <td class="py-3 px-4">
                <span :class="getStatusClass(product.status)" class="px-2 py-1 rounded-full text-xs">
                  {{ getStatusText(product.status) }}
                </span>
              </td>
              <td class="py-3 px-4 text-sm text-gray-500">{{ formatTime(product.createdAt) }}</td>
              <td class="py-3 px-4 text-sm text-gray-500">{{ formatTime(product.updatedAt) }}</td>
              <td class="py-3 px-4 sticky right-0 bg-white z-10">
                <div class="flex items-center gap-1">
                  <NButton size="small" @click="handleView(product)">
                    <Eye class="w-4 h-4" />
                  </NButton>
                  <template v-if="authStore.user?.role === 'admin'">
                    <NButton size="small" type="primary" @click="handleEdit(product)">
                      <Pencil class="w-4 h-4" />
                    </NButton>
                    <NPopconfirm title="确定要删除该产品吗？">
                      <template #trigger>
                        <NButton size="small" type="error" @click="handleDelete(product.id)">
                          <Trash class="w-4 h-4" />
                        </NButton>
                      </template>
                    </NPopconfirm>
                  </template>
                </div>
              </td>
            </tr>
          </tbody>
          <tbody v-else-if="!loading && productList.length === 0">
            <tr>
              <td colspan="11" class="py-12 text-center text-gray-500">
                <div class="flex flex-col items-center">
                  <Archive class="w-12 h-12 mb-3 text-gray-300" />
                  <p>暂无产品数据</p>
                  <NButton size="small" type="primary" @click="handleAdd" class="mt-3">
                    添加产品
                  </NButton>
                </div>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="11" class="py-12 text-center">
                <NSpin size="medium" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="p-4 border-t border-gray-200">
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-500">
            共 {{ pagination.total }} 条数据
          </span>
          <NPagination
            v-model:page="pagination.page"
            v-model:page-size="pagination.pageSize"
            :page-sizes="[10, 20, 50, 100]"
            :total="pagination.total"
            @update:page="handlePageChange"
            @update:page-size="handlePageSizeChange"
          />
        </div>
      </div>
    </div>

    <NModal v-model:show="showModal" preset="card" :title="isEdit ? '编辑产品' : '添加产品'" style="width: 500px;">
      <NForm :model="formData" label-placement="left" label-width="100px">
        <NFormItem label="产品名称" :rule="[{ required: true, message: '请输入产品名称' }]">
          <NInput v-model:value="formData.name" placeholder="请输入产品名称" />
        </NFormItem>
        <NFormItem label="产品编码" :rule="[{ required: true, message: '请输入产品编码' }]" :error="codeError">
          <NInput 
            v-model:value="formData.code" 
            placeholder="请输入产品编码" 
            @blur="validateCode"
          />
        </NFormItem>
        <NFormItem label="产品分类" :rule="[{ required: true, message: '请选择产品分类' }]">
          <NSelect 
            v-model:value="formData.category" 
            placeholder="请选择产品分类" 
            :options="categoryOptions.filter(c => c.value)"
          />
        </NFormItem>
        <NFormItem label="价格" :rule="[{ required: true, message: '请输入价格' }, { validator: validatePrice }]">
          <NInput v-model:value="formData.price" type="number" placeholder="请输入价格" />
        </NFormItem>
        <NFormItem label="库存" :rule="[{ required: true, message: '请输入库存' }, { validator: validateStock }]">
          <NInput v-model:value="formData.stock" type="number" placeholder="请输入库存" />
        </NFormItem>
        <NFormItem label="描述">
          <NInput v-model:value="formData.description" placeholder="请输入产品描述" textarea :rows="3" />
        </NFormItem>
        <NFormItem label="状态">
          <NSelect v-model:value="formData.status" :options="statusOptions.filter(s => s.value)" placeholder="请选择状态" />
        </NFormItem>
      </NForm>
      <div class="flex justify-end gap-3 mt-4">
        <NButton @click="showModal = false">取消</NButton>
        <NButton type="primary" :loading="submitLoading" @click="handleSubmit">确定</NButton>
      </div>
    </NModal>

    <NModal v-model:show="showBatchStatusModal" preset="card" title="批量修改状态" style="width: 400px;">
      <NForm :model="batchStatusForm" label-placement="left" label-width="80px">
        <NFormItem label="状态" :rule="[{ required: true, message: '请选择状态' }]">
          <NSelect v-model:value="batchStatusForm.status" :options="statusOptions.filter(s => s.value)" placeholder="请选择状态" />
        </NFormItem>
      </NForm>
      <div class="flex justify-end gap-3 mt-4">
        <NButton @click="showBatchStatusModal = false">取消</NButton>
        <NButton type="primary" @click="handleBatchStatusUpdate">确定</NButton>
      </div>
    </NModal>

    <NModal v-model:show="showViewModal" preset="card" title="产品详情" style="width: 500px;">
      <div class="space-y-4">
        <div class="flex">
          <span class="w-24 text-gray-500">产品名称：</span>
          <span class="text-gray-800">{{ viewData.name }}</span>
        </div>
        <div class="flex">
          <span class="w-24 text-gray-500">产品编码：</span>
          <span class="text-gray-800">{{ viewData.code }}</span>
        </div>
        <div class="flex">
          <span class="w-24 text-gray-500">产品分类：</span>
          <span :class="getCategoryClass(viewData.category)" class="px-2 py-1 rounded-full text-xs">
            {{ getCategoryText(viewData.category) }}
          </span>
        </div>
        <div class="flex">
          <span class="w-24 text-gray-500">价格：</span>
          <span class="text-gray-800">¥{{ viewData.price?.toLocaleString() }}</span>
        </div>
        <div class="flex">
          <span class="w-24 text-gray-500">库存：</span>
          <span :class="getStockClass(viewData.stock)" class="font-medium">
            {{ viewData.stock }}
            <span v-if="viewData.stock && viewData.stock < 10" class="ml-1">⚠</span>
          </span>
        </div>
        <div class="flex">
          <span class="w-24 text-gray-500">描述：</span>
          <span class="text-gray-800">{{ viewData.description || '-' }}</span>
        </div>
        <div class="flex">
          <span class="w-24 text-gray-500">状态：</span>
          <span :class="getStatusClass(viewData.status)" class="px-2 py-1 rounded-full text-xs">
            {{ getStatusText(viewData.status) }}
          </span>
        </div>
        <div class="flex">
          <span class="w-24 text-gray-500">创建时间：</span>
          <span class="text-gray-800">{{ viewData.createdAt }}</span>
        </div>
        <div class="flex">
          <span class="w-24 text-gray-500">更新时间：</span>
          <span class="text-gray-800">{{ viewData.updatedAt }}</span>
        </div>
      </div>
      <div class="flex justify-end mt-4">
        <NButton @click="showViewModal = false">关闭</NButton>
      </div>
    </NModal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { 
  NButton, NInput, NSelect, NCheckbox, NModal, NForm, NFormItem, 
  NPopconfirm, NSpin, NPagination 
} from 'naive-ui'
import { Add, Search, Pencil, Trash, Eye, Archive } from '@vicons/ionicons5'
import {
  Product, getProducts, createProduct, updateProduct,
  deleteProduct, batchDeleteProducts, checkCodeExists
} from '@/api/product'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const SearchIcon = Search

const searchForm = reactive({
  keyword: '',
  category: '',
  status: ''
})

const productList = ref<Product[]>([])
const selectedIds = ref<number[]>([])
const loading = ref(false)
const codeError = ref('')

const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0
})

const showModal = ref(false)
const showViewModal = ref(false)
const showBatchStatusModal = ref(false)
const isEdit = ref(false)
const submitLoading = ref(false)
const currentEditId = ref<number | null>(null)

const formData = reactive({
  name: '',
  code: '',
  category: '',
  price: 0,
  stock: 0,
  description: '',
  status: 1
})

const viewData = reactive({
  name: '',
  code: '',
  category: '',
  price: 0,
  stock: 0,
  description: '',
  status: 1,
  createdAt: '',
  updatedAt: ''
})

const batchStatusForm = reactive({
  status: '1'
})

const categoryOptions = [
  { label: '全部', value: '' },
  { label: '标准版', value: 'standard' },
  { label: '专业版', value: 'professional' },
  { label: '企业版', value: 'enterprise' },
  { label: '定制版', value: 'custom' }
]

const statusOptions = [
  { label: '全部', value: '' },
  { label: '启用', value: '1' },
  { label: '禁用', value: '0' }
]

const categoryMap: Record<string, { label: string; class: string }> = {
  'standard': { label: '标准版', class: 'bg-gray-100 text-gray-700' },
  'professional': { label: '专业版', class: 'bg-blue-100 text-blue-700' },
  'enterprise': { label: '企业版', class: 'bg-green-100 text-green-700' },
  'custom': { label: '定制版', class: 'bg-purple-100 text-purple-700' }
}

const isAllSelected = computed(() => {
  return productList.value.length > 0 && selectedIds.value.length === productList.value.length
})

const getCategoryText = (category: string) => {
  return categoryMap[category]?.label || category || '未知'
}

const getCategoryClass = (category: string) => {
  return categoryMap[category]?.class || 'px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700'
}

const getStatusText = (status: number) => {
  return status === 1 ? '启用' : '禁用'
}

const getStatusClass = (status: number) => {
  return status === 1 ? 'px-2 py-1 rounded-full text-xs bg-green-100 text-green-700' : 'px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700'
}

const getStockClass = (stock: number) => {
  return stock < 10 ? 'text-red-600' : 'text-gray-800'
}

const formatTime = (time: string) => {
  if (!time) return '-'
  return time.replace('T', ' ').substring(0, 19)
}

const validatePrice = (rule: any, value: number) => {
  if (value < 0) {
    return new Error('价格不能小于0')
  }
  return true
}

const validateStock = (rule: any, value: number) => {
  if (value < 0) {
    return new Error('库存不能小于0')
  }
  return true
}

const validateCode = async () => {
  if (!formData.code) return
  
  try {
    const response = await checkCodeExists(formData.code, currentEditId.value || undefined)
    if (response.exists) {
      codeError.value = '产品编码已存在'
    } else {
      codeError.value = ''
    }
  } catch {
    codeError.value = ''
  }
}

const loadProducts = async () => {
  loading.value = true
  try {
    const params: Record<string, any> = {
      page: pagination.page,
      pageSize: pagination.pageSize,
      keyword: searchForm.keyword || undefined,
      category: searchForm.category || undefined
    }
    if (searchForm.status !== '') {
      params.status = parseInt(searchForm.status)
    }
    
    const response = await getProducts(params)
    productList.value = response.list
    pagination.total = response.total
  } catch (error) {
    console.error('加载产品列表失败:', error)
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  pagination.page = 1
  loadProducts()
}

const handleReset = () => {
  searchForm.keyword = ''
  searchForm.category = ''
  searchForm.status = ''
  pagination.page = 1
  loadProducts()
}

const handlePageChange = (page: number) => {
  pagination.page = page
  loadProducts()
}

const handlePageSizeChange = (pageSize: number) => {
  pagination.pageSize = pageSize
  pagination.page = 1
  loadProducts()
}

const handleSelectAll = (checked: boolean) => {
  if (checked) {
    selectedIds.value = productList.value.map(p => p.id)
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
  currentEditId.value = null
  formData.name = ''
  formData.code = ''
  formData.category = ''
  formData.price = 0
  formData.stock = 0
  formData.description = ''
  formData.status = 1
  codeError.value = ''
  showModal.value = true
}

const handleEdit = (product: Product) => {
  isEdit.value = true
  currentEditId.value = product.id
  formData.name = product.name
  formData.code = product.code
  formData.category = product.category
  formData.price = product.price
  formData.stock = product.stock
  formData.description = product.description
  formData.status = product.status
  codeError.value = ''
  showModal.value = true
}

const handleView = (product: Product) => {
  viewData.name = product.name
  viewData.code = product.code
  viewData.category = product.category
  viewData.price = product.price
  viewData.stock = product.stock
  viewData.description = product.description
  viewData.status = product.status
  viewData.createdAt = formatTime(product.createdAt)
  viewData.updatedAt = formatTime(product.updatedAt)
  showViewModal.value = true
}

const handleSubmit = async () => {
  if (!formData.name || !formData.code || !formData.category) {
    return
  }
  
  await validateCode()
  if (codeError.value) {
    return
  }
  
  submitLoading.value = true
  try {
    if (isEdit.value && currentEditId.value) {
      await updateProduct(currentEditId.value, { ...formData })
    } else {
      await createProduct(formData)
    }
    showModal.value = false
    loadProducts()
  } catch (error) {
    console.error('保存产品失败:', error)
  } finally {
    submitLoading.value = false
  }
}

const handleDelete = async (id: number) => {
  try {
    await deleteProduct(id)
    loadProducts()
  } catch (error) {
    console.error('删除产品失败:', error)
  }
}

const handleBatchDelete = async () => {
  try {
    await batchDeleteProducts(selectedIds.value)
    selectedIds.value = []
    loadProducts()
  } catch (error) {
    console.error('批量删除失败:', error)
  }
}

const handleBatchStatusUpdate = async () => {
  try {
    for (const id of selectedIds.value) {
      await updateProduct(id, { status: parseInt(batchStatusForm.status) })
    }
    showBatchStatusModal.value = false
    selectedIds.value = []
    loadProducts()
  } catch (error) {
    console.error('批量修改状态失败:', error)
  }
}

loadProducts()
</script>