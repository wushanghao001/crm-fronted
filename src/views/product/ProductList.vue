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
          <NSelect
            v-model:value="searchForm.projectCodeId"
            placeholder="项目号"
            class="w-40"
            :options="projectCodeOptions"
            clearable
          />
          <NSelect
            v-model:value="searchForm.materialCodeId"
            placeholder="料号"
            class="w-40"
            :options="materialCodeOptions"
            clearable
          />
          <NSelect
            v-model:value="searchForm.brandCodeId"
            placeholder="牌号"
            class="w-40"
            :options="brandCodeOptions"
            clearable
          />
          <NButton type="primary" @click="handleSearch">搜索</NButton>
          <NButton @click="handleReset">重置</NButton>
          <NTag v-if="lowStockFilter" type="warning" closable @close="clearLowStockFilter">
            库存预警过滤中 ({{ lowStockProductIds.length }})
          </NTag>
        </div>
      </div>
      
      <!-- DataTable 容器 - 关键布局 -->
      <div class="table-container">
        <NDataTable
          ref="dataTableRef"
          :columns="columns"
          :data="productList"
          :loading="loading"
          :pagination="false"
          :scroll-x="1800"
          :scroll-y="500"
          :row-key="(row) => row.id"
          :checked-row-keys="selectedIds"
          @update:checked-row-keys="handleCheckedRowKeysChange"
        />
      </div>
      
      <div class="p-4 border-t border-gray-200">
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-500">
            共 {{ pagination.total }} 条数据
          </span>
          <NPagination
            v-model:page="pagination.page"
            v-model:page-size="pagination.pageSize"
            :page-count="pagination.pageCount"
            :page-sizes="pagination.pageSizes"
            :show-size-picker="pagination.showSizePicker"
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
        <NFormItem label="项目号">
          <NSelect
            v-model:value="formData.projectCodeId"
            :options="projectCodeOptions"
            placeholder="请选择项目号"
            clearable
            filterable
            @update:value="handleProjectCodeChange"
          />
        </NFormItem>
        <NFormItem label="料号">
          <NSelect
            v-model:value="formData.materialCodeId"
            :options="materialCodeOptions"
            placeholder="请选择料号"
            clearable
            filterable
            @update:value="handleMaterialCodeChange"
          />
        </NFormItem>
        <NFormItem label="牌号">
          <NSelect
            v-model:value="formData.brandCodeId"
            :options="brandCodeOptions"
            placeholder="请选择牌号"
            clearable
            filterable
            @update:value="handleBrandCodeChange"
          />
        </NFormItem>
        <NFormItem label="价格" :rule="[{ required: true, message: '请输入价格' }, { validator: validatePrice }]">
          <NInput v-model:value="formData.price" type="number" placeholder="请输入价格" />
        </NFormItem>
        <NFormItem label="库存" :rule="[{ required: true, message: '请输入库存' }, { validator: validateStock }]">
          <NInput v-model:value="formData.stock" type="number" placeholder="请输入库存" />
        </NFormItem>
        <NFormItem label="安全库存">
          <NInput v-model:value="formData.safeStock" type="number" placeholder="低于此值将触发预警，默认5" />
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
          <span class="w-24 text-gray-500">总库存：</span>
          <span class="text-gray-800">{{ viewData.stock }}</span>
        </div>
        <div class="flex">
          <span class="w-24 text-gray-500">可售库存：</span>
          <span :class="viewData.availableStock <= viewData.safeStock ? 'text-red-600 font-medium' : 'text-gray-800'">
            {{ viewData.availableStock }}
            <span v-if="viewData.availableStock <= viewData.safeStock" class="ml-1">⚠️</span>
          </span>
        </div>
        <div class="flex">
          <span class="w-24 text-gray-500">预占库存：</span>
          <span class="text-orange-500">{{ viewData.lockedStock }}</span>
        </div>
        <div class="flex">
          <span class="w-24 text-gray-500">安全库存：</span>
          <span class="text-gray-800">{{ viewData.safeStock }}</span>
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

    <NModal v-model:show="showStockLogModal" preset="card" title="库存流水" style="width: 700px;">
      <div class="mb-4">
        <NTag type="warning">按时间倒序排列</NTag>
      </div>
      <div v-if="stockLogLoading" class="flex justify-center py-8">
        <NSpin size="medium" />
      </div>
      <div v-else-if="stockLogList.length === 0" class="text-center py-8 text-gray-500">
        暂无库存流水记录
      </div>
      <div v-else class="max-h-96 overflow-y-auto">
        <table class="w-full">
          <thead class="sticky top-0 bg-gray-50">
            <tr>
              <th class="py-2 px-3 text-left text-sm font-medium text-gray-600">时间</th>
              <th class="py-2 px-3 text-left text-sm font-medium text-gray-600">类型</th>
              <th class="py-2 px-3 text-left text-sm font-medium text-gray-600">订单号</th>
              <th class="py-2 px-3 text-left text-sm font-medium text-gray-600 text-right">变动数量</th>
              <th class="py-2 px-3 text-left text-sm font-medium text-gray-600 text-right">变动前</th>
              <th class="py-2 px-3 text-left text-sm font-medium text-gray-600 text-right">变动后</th>
              <th class="py-2 px-3 text-left text-sm font-medium text-gray-600">备注</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="log in stockLogList" :key="log.id" class="border-b border-gray-100 hover:bg-gray-50">
              <td class="py-2 px-3 text-sm text-gray-500">{{ formatTime(log.createTime) }}</td>
              <td class="py-2 px-3 text-sm">
                <NTag :type="getStockLogType(log.type)" size="small">{{ getStockLogTypeText(log.type) }}</NTag>
              </td>
              <td class="py-2 px-3 text-sm text-gray-800">{{ log.orderId || '-' }}</td>
              <td class="py-2 px-3 text-sm text-right" :class="log.num > 0 ? 'text-green-600' : 'text-red-600'">
                {{ log.num > 0 ? '+' : '' }}{{ log.num }}
              </td>
              <td class="py-2 px-3 text-sm text-right text-gray-500">{{ log.beforeStock }}</td>
              <td class="py-2 px-3 text-sm text-right text-gray-500">{{ log.afterStock }}</td>
              <td class="py-2 px-3 text-sm text-gray-500">{{ log.remark || '-' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex justify-end mt-4">
        <NButton @click="showStockLogModal = false">关闭</NButton>
      </div>
    </NModal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, h } from 'vue'
import { useRoute } from 'vue-router'
import {
  NButton, NInput, NSelect, NCheckbox, NModal, NForm, NFormItem,
  NPopconfirm, NSpin, NPagination, NTag, NDataTable
} from 'naive-ui'
import { Add, Search, Pencil, Trash, Eye, Archive, DocumentText } from '@vicons/ionicons5'
import {
  Product, getProducts, createProduct, updateProduct,
  deleteProduct, batchDeleteProducts, checkCodeExists
} from '@/api/product'
import { getStockLogs, getLowStockProducts } from '@/api/stock'
import { getProjectCodes, ProjectCode } from '@/api/projectCode'
import { getMaterialCodes, MaterialCode } from '@/api/materialCode'
import { getBrandCodes, BrandCode } from '@/api/brandCode'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const authStore = useAuthStore()

const SearchIcon = Search

const searchForm = reactive({
  keyword: '',
  category: '',
  status: '',
  projectCodeId: null as number | null,
  materialCodeId: null as number | null,
  brandCodeId: null as number | null
})

const projectCodeOptions = ref<{ label: string; value: number }[]>([])
const materialCodeOptions = ref<{ label: string; value: number }[]>([])
const brandCodeOptions = ref<{ label: string; value: number }[]>([])

const productList = ref<Product[]>([])
const selectedIds = ref<number[]>([])
const loading = ref(false)
const codeError = ref('')
const dataTableRef = ref()

const pagination = reactive({
  page: 1,
  pageSize: 10,
  pageCount: 1,
  total: 0,
  showSizePicker: true,
  pageSizes: [10, 20, 50, 100]
})

const showModal = ref(false)
const showViewModal = ref(false)
const showBatchStatusModal = ref(false)
const showStockLogModal = ref(false)
const stockLogList = ref<any[]>([])
const stockLogLoading = ref(false)
const currentStockLogProductId = ref<number | null>(null)
const isEdit = ref(false)
const submitLoading = ref(false)
const currentEditId = ref<number | null>(null)

const formData = reactive({
  name: '',
  code: '',
  category: '',
  price: 0,
  stock: 0,
  safeStock: 5,
  description: '',
  status: 1,
  projectCodeId: null as number | null,
  projectCodeName: '',
  materialCodeId: null as number | null,
  materialCodeName: '',
  brandCodeId: null as number | null,
  brandCodeName: ''
})

const viewData = reactive({
  name: '',
  code: '',
  category: '',
  price: 0,
  stock: 0,
  availableStock: 0,
  lockedStock: 0,
  safeStock: 5,
  description: '',
  status: 1,
  projectCodeName: '',
  materialCodeName: '',
  brandCodeName: '',
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

const columns = [
  { type: 'selection', width: 50, fixed: 'left' },
  { type: 'index', title: '序号', width: 60, fixed: 'left' },
  { title: '产品名称', key: 'name', width: 150, fixed: 'left', ellipsis: { tooltip: true } },
  { title: '产品编码', key: 'code', width: 120, ellipsis: { tooltip: true } },
  { title: '分类', key: 'category', width: 100,
    render: (row: Product) => h('span', { class: getCategoryClass(row.category) }, getCategoryText(row.category)) },
  { title: '项目号', key: 'projectCodeName', width: 120, ellipsis: { tooltip: true } },
  { title: '料号', key: 'materialCodeName', width: 120, ellipsis: { tooltip: true } },
  { title: '牌号', key: 'brandCodeName', width: 120, ellipsis: { tooltip: true } },
  { title: '价格', key: 'price', width: 100,
    render: (row: Product) => `¥${row.price.toLocaleString()}` },
  { title: '总库存', key: 'stock', width: 90 },
  { title: '可售库存', key: 'availableStock', width: 100,
    render: (row: Product) => {
      const available = row.availableStock ?? 0
      const safe = row.safeStock ?? 5
      const isLow = available <= safe
      return h('span', { class: isLow ? 'text-red-600 font-medium' : 'text-gray-800' },
        available + (isLow ? ' ⚠️' : ''))
    } },
  { title: '预占库存', key: 'lockedStock', width: 90,
    render: (row: Product) => h('span', { class: 'text-orange-500' }, row.lockedStock ?? 0) },
  { title: '安全库存', key: 'safeStock', width: 90 },
  { title: '状态', key: 'status', width: 80,
    render: (row: Product) => h('span', { class: getStatusClass(row.status) }, getStatusText(row.status)) },
  { title: '创建时间', key: 'createdAt', width: 140,
    render: (row: Product) => formatTime(row.createdAt) },
  { title: '更新时间', key: 'updatedAt', width: 140,
    render: (row: Product) => formatTime(row.updatedAt) },
  { title: '操作', key: 'actions', width: 180, fixed: 'right',
    render: (row: Product) => renderActions(row) }
]

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

const handleViewStockLog = async (product: Product) => {
  currentStockLogProductId.value = product.id
  showStockLogModal.value = true
  stockLogLoading.value = true
  try {
    const response = await getStockLogs({ pageNum: 1, pageSize: 100, productId: product.id })
    stockLogList.value = response.list || []
  } catch (error) {
    console.error('加载库存流水失败:', error)
    stockLogList.value = []
  } finally {
    stockLogLoading.value = false
  }
}

const getStockLogType = (type: string) => {
  const typeMap: Record<string, string> = {
    'lock': 'warning',
    'deduct': 'error',
    'release': 'info',
    'adjust': 'default',
    'refund': 'success'
  }
  return typeMap[type] || 'default'
}

const getStockLogTypeText = (type: string) => {
  const textMap: Record<string, string> = {
    'lock': '预占',
    'deduct': '确认扣减',
    'release': '释放',
    'adjust': '手动调整',
    'refund': '退款回滚'
  }
  return textMap[type] || type
}

const renderActions = (product: Product) => {
  return h('div', { class: 'flex items-center gap-1' }, [
    h(NButton, { size: 'small', onClick: () => handleView(product) }, {
      icon: () => h(Eye, { class: 'w-4 h-4' })
    }),
    h(NButton, { size: 'small', type: 'info', onClick: () => handleViewStockLog(product) }, {
      icon: () => h(DocumentText, { class: 'w-4 h-4' })
    }),
    authStore.user?.role === 'admin' ? h(NButton, { size: 'small', type: 'primary', onClick: () => handleEdit(product) }, {
      icon: () => h(Pencil, { class: 'w-4 h-4' })
    }) : null,
    authStore.user?.role === 'admin' ? h(NPopconfirm, {
      title: '确定要删除该产品吗？',
      onPositiveClick: () => handleDelete(product.id)
    }, {
      trigger: () => h(NButton, { size: 'small', type: 'error' }, {
        icon: () => h(Trash, { class: 'w-4 h-4' })
      })
    }) : null
  ].filter(Boolean))
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
    if (searchForm.projectCodeId) {
      params.projectCodeId = searchForm.projectCodeId
    }
    if (searchForm.materialCodeId) {
      params.materialCodeId = searchForm.materialCodeId
    }
    if (searchForm.brandCodeId) {
      params.brandCodeId = searchForm.brandCodeId
    }

    const response = await getProducts(params)
    if (lowStockFilter.value && lowStockProductIds.value.length > 0) {
      productList.value = response.list.filter((p: Product) =>
        lowStockProductIds.value.includes(p.id)
      )
      pagination.total = productList.value.length
      pagination.pageCount = Math.ceil(pagination.total / pagination.pageSize) || 1
    } else {
      productList.value = response.list
      pagination.total = response.total
      pagination.pageCount = Math.ceil(pagination.total / pagination.pageSize) || 1
    }
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
  searchForm.projectCodeId = null
  searchForm.materialCodeId = null
  searchForm.brandCodeId = null
  pagination.page = 1
  loadProducts()
}

const handlePageChange = (page: number) => {
  const totalPages = Math.ceil(pagination.total / pagination.pageSize) || 1
  if (page < 1) page = 1
  if (page > totalPages) page = totalPages
  pagination.page = page
  loadProducts()
}

const handlePageSizeChange = (pageSize: number) => {
  pagination.pageSize = pageSize
  pagination.page = 1
  pagination.pageCount = Math.ceil(pagination.total / pagination.pageSize) || 1
  loadProducts()
}

const handleCheckedRowKeysChange = (keys: number[]) => {
  selectedIds.value = keys
}

const handleAdd = () => {
  isEdit.value = false
  currentEditId.value = null
  formData.name = ''
  formData.code = ''
  formData.category = ''
  formData.price = 0
  formData.stock = 0
  formData.safeStock = 5
  formData.description = ''
  formData.status = 1
  formData.projectCodeId = null
  formData.projectCodeName = ''
  formData.materialCodeId = null
  formData.materialCodeName = ''
  formData.brandCodeId = null
  formData.brandCodeName = ''
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
  formData.safeStock = product.safeStock ?? 5
  formData.description = product.description
  formData.status = product.status
  formData.projectCodeId = product.projectCodeId ?? null
  formData.projectCodeName = product.projectCodeName ?? ''
  formData.materialCodeId = product.materialCodeId ?? null
  formData.materialCodeName = product.materialCodeName ?? ''
  formData.brandCodeId = product.brandCodeId ?? null
  formData.brandCodeName = product.brandCodeName ?? ''
  codeError.value = ''
  showModal.value = true
}

const handleView = (product: Product) => {
  viewData.name = product.name
  viewData.code = product.code
  viewData.category = product.category
  viewData.price = product.price
  viewData.stock = product.stock
  viewData.availableStock = product.availableStock ?? 0
  viewData.lockedStock = product.lockedStock ?? 0
  viewData.safeStock = product.safeStock ?? 5
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
  if (selectedIds.value.length === 0) {
    return
  }

  if (!confirm(`确定要删除选中的 ${selectedIds.value.length} 个产品吗？此操作不可撤销。`)) {
    return
  }

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
    checkedRows.value = []
    loadProducts()
  } catch (error) {
    console.error('批量修改状态失败:', error)
  }
}

const lowStockFilter = ref(false)
const lowStockProductIds = ref<number[]>([])

const handleLowStockFilter = async () => {
  try {
    const data = await getLowStockProducts() as any[]
    lowStockProductIds.value = (data || []).map((p: any) => p.id)
    lowStockFilter.value = true
    loadProducts()
  } catch (error) {
    console.error('获取预警产品失败:', error)
  }
}

const clearLowStockFilter = () => {
  lowStockFilter.value = false
  lowStockProductIds.value = []
  loadProducts()
}

onMounted(async () => {
  await Promise.all([
    loadProjectCodes(),
    loadMaterialCodes(),
    loadBrandCodes()
  ])
  if (route.query.lowStock === 'true') {
    handleLowStockFilter()
  } else {
    loadProducts()
  }
})

const loadProjectCodes = async () => {
  try {
    const res = await getProjectCodes({ page: 1, pageSize: 100 })
    projectCodeOptions.value = (res.list || []).map((item: ProjectCode) => ({
      label: `${item.name} (${item.code})`,
      value: item.id
    }))
  } catch (error) {
    console.error('加载项目号失败:', error)
  }
}

const loadMaterialCodes = async () => {
  try {
    const res = await getMaterialCodes({ page: 1, pageSize: 100 })
    materialCodeOptions.value = (res.list || []).map((item: MaterialCode) => ({
      label: `${item.name} (${item.code})`,
      value: item.id
    }))
  } catch (error) {
    console.error('加载料号失败:', error)
  }
}

const loadBrandCodes = async () => {
  try {
    const res = await getBrandCodes({ page: 1, pageSize: 100 })
    brandCodeOptions.value = (res.list || []).map((item: BrandCode) => ({
      label: `${item.name} (${item.code})`,
      value: item.id
    }))
  } catch (error) {
    console.error('加载牌号失败:', error)
  }
}

const handleProjectCodeChange = (value: number | null) => {
  if (value) {
    const option = projectCodeOptions.value.find(o => o.value === value)
    formData.projectCodeName = option?.label.split(' (')[0] || ''
  } else {
    formData.projectCodeName = ''
  }
}

const handleMaterialCodeChange = (value: number | null) => {
  if (value) {
    const option = materialCodeOptions.value.find(o => o.value === value)
    formData.materialCodeName = option?.label.split(' (')[0] || ''
  } else {
    formData.materialCodeName = ''
  }
}

const handleBrandCodeChange = (value: number | null) => {
  if (value) {
    const option = brandCodeOptions.value.find(o => o.value === value)
    formData.brandCodeName = option?.label.split(' (')[0] || ''
  } else {
    formData.brandCodeName = ''
  }
}
</script>

<style lang="scss" scoped>
.table-container {
  max-width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  
  :deep(.n-data-table) {
    min-width: 100%;
  }
  
  :deep(.n-data-table-header) {
    position: sticky;
    top: 0;
    z-index: 1;
  }
  
  :deep(.n-data-table-fixed-left) {
    z-index: 2;
  }
  
  :deep(.n-data-table-fixed-right) {
    z-index: 2;
  }
}
</style>