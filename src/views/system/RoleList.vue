<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-bold text-gray-800 dark:text-white">权限管理</h2>
        <p class="text-gray-500 dark:text-gray-400 mt-1">管理角色和权限</p>
      </div>
      <NButton type="primary" class="bg-blue-500 hover:bg-blue-600" @click="showAddModal = true">
        添加角色
      </NButton>
    </div>
    
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div class="p-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex flex-wrap gap-4">
          <div class="flex-1 min-w-[200px]">
            <NInput
              v-model:value="searchKeyword"
              placeholder="搜索角色名称"
              class="w-full"
              :prefix-icon="SearchIcon"
              @keyup.enter="handleSearch"
            />
          </div>
          <NButton type="primary" @click="handleSearch">搜索</NButton>
          <NButton @click="handleReset">重置</NButton>
        </div>
      </div>
      
      <div class="overflow-x-auto">
        <div class="min-w-[1000px]">
          <table class="w-full">
            <thead>
              <tr class="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400 w-140">角色名称</th>
                <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400 w-250">描述</th>
                <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400 w-150">权限</th>
                <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400 w-150">创建时间</th>
                <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400 w-200">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="role in roleList"
                :key="role.id"
                class="border-b border-gray-100 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <td class="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">{{ role.name }}</td>
                <td class="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{{ role.description || '-' }}</td>
                <td class="py-3 px-4 text-sm">
                  <span class="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                    {{ role.permissions ? role.permissions.split(',').length : 0 }} 项权限
                  </span>
                </td>
                <td class="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{{ formatDate(role.createdAt) }}</td>
                <td class="py-3 px-4 text-sm">
                  <div class="flex items-center gap-2">
                    <NButton size="small" type="primary" @click="openEditModal(role)">编辑</NButton>
                    <NButton size="small" type="info" @click="openPermissionModal(role)">权限</NButton>
                    <NPopconfirm @positive-click="() => handleDelete(role.id)">
                      <template #trigger>
                        <NButton size="small" type="error">删除</NButton>
                      </template>
                      确定要删除该角色吗？
                    </NPopconfirm>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          
          <div v-if="roleList.length === 0" class="py-12 text-center text-gray-400">
            暂无角色数据
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

    <NModal v-model:show="showAddModal" title="新增角色" preset="card" :style="{ width: '500px' }">
      <div class="space-y-4">
        <NFormItem label="角色名称" :rule="[{ required: true, message: '请输入角色名称' }]">
          <NInput v-model:value="formData.name" placeholder="请输入角色名称" />
        </NFormItem>
        <NFormItem label="角色描述">
          <NInput v-model:value="formData.description" placeholder="请输入角色描述" textarea :rows="3" />
        </NFormItem>
      </div>
      <template #footer>
        <div class="flex justify-end gap-2">
          <NButton @click="showAddModal = false">取消</NButton>
          <NButton type="primary" @click="handleSubmit">确认</NButton>
        </div>
      </template>
    </NModal>

    <NModal v-model:show="showEditModal" title="编辑角色" preset="card" :style="{ width: '500px' }">
      <div class="space-y-4">
        <NFormItem label="角色名称" :rule="[{ required: true, message: '请输入角色名称' }]">
          <NInput v-model:value="editData.name" placeholder="请输入角色名称" />
        </NFormItem>
        <NFormItem label="角色描述">
          <NInput v-model:value="editData.description" placeholder="请输入角色描述" textarea :rows="3" />
        </NFormItem>
      </div>
      <template #footer>
        <div class="flex justify-end gap-2">
          <NButton @click="showEditModal = false">取消</NButton>
          <NButton type="primary" @click="handleUpdate">确认</NButton>
        </div>
      </template>
    </NModal>

    <NModal v-model:show="showPermissionModal" title="权限分配" preset="card" :style="{ width: '600px', maxHeight: '70vh' }">
      <div class="overflow-y-auto max-h-[50vh]">
        <div v-for="menu in permissionTree" :key="menu.id" class="mb-4">
          <div class="flex items-center mb-2">
            <NCheckbox 
              :checked="isAllChecked(menu)" 
              @update:checked="toggleMenu(menu)"
            />
            <span class="ml-2 font-medium text-gray-800 dark:text-white">{{ menu.name }}</span>
          </div>
          <div class="ml-6 space-y-1">
            <div v-for="child in menu.children" :key="child.id" class="flex items-center">
              <NCheckbox 
                :checked="selectedPermissions.includes(child.code)"
                @update:checked="togglePermission(child.code)"
              />
              <span class="ml-2 text-gray-600 dark:text-gray-300">{{ child.name }}</span>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <div class="flex justify-end gap-2">
          <NButton @click="showPermissionModal = false">取消</NButton>
          <NButton type="primary" @click="handleSavePermissions">确认</NButton>
        </div>
      </template>
    </NModal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { NButton, NInput, NPagination, NModal, NFormItem, NCheckbox, NPopconfirm } from 'naive-ui'
import { Search } from '@vicons/ionicons5'
import { message } from '@/utils/message'
import { getRoleList, createRole, updateRole, deleteRole, getPermissionTree, saveRolePermissions } from '@/api/system'

const searchKeyword = ref('')
const loading = ref(false)
const SearchIcon = Search

const showAddModal = ref(false)
const showEditModal = ref(false)
const showPermissionModal = ref(false)

const editRoleId = ref(0)
const currentRoleId = ref(0)
const selectedPermissions = ref<string[]>([])

const formData = reactive({
  name: '',
  description: ''
})

const editData = reactive({
  name: '',
  description: ''
})

const roleList = ref<any[]>([])
const permissionTree = ref<any[]>([])

const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0
})

const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  return dateStr.includes('T') ? dateStr.split('T')[0] : dateStr
}

const loadRoles = async () => {
  loading.value = true
  try {
    const res = await getRoleList({
      pageNum: pagination.page,
      pageSize: pagination.pageSize,
      name: searchKeyword.value
    })
    if (res.list && Array.isArray(res.list)) {
      roleList.value = res.list
      pagination.total = res.total || 0
    } else if (Array.isArray(res)) {
      roleList.value = res
      pagination.total = res.length
    } else {
      roleList.value = []
      pagination.total = 0
    }
  } catch (error: any) {
    message.error(error.message || '加载失败')
    roleList.value = []
    pagination.total = 0
  } finally {
    loading.value = false
  }
}

const loadPermissionTree = async () => {
  try {
    const res = await getPermissionTree()
    permissionTree.value = res || []
  } catch (error: any) {
    message.error(error.message || '加载权限树失败')
    permissionTree.value = []
  }
}

const handleSearch = () => {
  pagination.page = 1
  loadRoles()
}

const handleReset = () => {
  searchKeyword.value = ''
  pagination.page = 1
  loadRoles()
}

const handlePageChange = (page: number) => {
  pagination.page = page
  loadRoles()
}

const handlePageSizeChange = (pageSize: number) => {
  pagination.pageSize = pageSize
  pagination.page = 1
  loadRoles()
}

const handleSubmit = async () => {
  if (!formData.name) {
    message.error('请输入角色名称')
    return
  }
  try {
    await createRole(formData)
    message.success('创建成功')
    showAddModal.value = false
    formData.name = ''
    formData.description = ''
    loadRoles()
  } catch (error: any) {
    message.error(error.message || '创建失败')
  }
}

const openEditModal = (role: any) => {
  editRoleId.value = role.id
  editData.name = role.name
  editData.description = role.description || ''
  showEditModal.value = true
}

const handleUpdate = async () => {
  if (!editData.name) {
    message.error('请输入角色名称')
    return
  }
  try {
    await updateRole(editRoleId.value, editData)
    message.success('更新成功')
    showEditModal.value = false
    loadRoles()
  } catch (error: any) {
    message.error(error.message || '更新失败')
  }
}

const openPermissionModal = async (role: any) => {
  currentRoleId.value = role.id
  selectedPermissions.value = role.permissions ? role.permissions.split(',') : []
  await loadPermissionTree()
  showPermissionModal.value = true
}

const isAllChecked = (menu: any) => {
  if (!menu.children) return false
  return menu.children.every(child => selectedPermissions.value.includes(child.code))
}

const toggleMenu = (menu: any) => {
  if (!menu.children) return
  if (isAllChecked(menu)) {
    menu.children.forEach((child: any) => {
      const index = selectedPermissions.value.indexOf(child.code)
      if (index > -1) selectedPermissions.value.splice(index, 1)
    })
  } else {
    menu.children.forEach((child: any) => {
      if (!selectedPermissions.value.includes(child.code)) {
        selectedPermissions.value.push(child.code)
      }
    })
  }
}

const togglePermission = (code: string) => {
  const index = selectedPermissions.value.indexOf(code)
  if (index > -1) {
    selectedPermissions.value.splice(index, 1)
  } else {
    selectedPermissions.value.push(code)
  }
}

const handleSavePermissions = async () => {
  try {
    await saveRolePermissions(currentRoleId.value, selectedPermissions.value)
    message.success('权限保存成功')
    showPermissionModal.value = false
    loadRoles()
  } catch (error: any) {
    message.error(error.message || '保存失败')
  }
}

const handleDelete = async (id: number) => {
  try {
    await deleteRole(id)
    message.success('删除成功')
    loadRoles()
  } catch (error: any) {
    message.error(error.message || '删除失败')
  }
}

onMounted(() => {
  loadRoles()
})
</script>