<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-bold text-gray-800 dark:text-white">用户管理</h2>
        <p class="text-gray-500 dark:text-gray-400 mt-1">管理系统用户和权限</p>
      </div>
      <NButton type="primary" class="bg-blue-500 hover:bg-blue-600" @click="showAddModal = true">
        添加用户
      </NButton>
    </div>
    
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div class="p-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex flex-wrap gap-4">
          <div class="flex-1 min-w-[200px]">
            <NInput
              v-model:value="searchKeyword"
              placeholder="搜索用户名或邮箱"
              class="w-full"
              :prefix-icon="SearchIcon"
              @keyup.enter="handleSearch"
            />
          </div>
          <NSelect
            v-model:value="roleFilter"
            placeholder="角色"
            class="w-32"
            :options="roleOptions"
          />
          <NSelect
            v-model:value="statusFilter"
            placeholder="状态"
            class="w-32"
            :options="statusOptions"
          />
          <NButton type="primary" @click="handleSearch">搜索</NButton>
          <NButton @click="handleReset">重置</NButton>
        </div>
      </div>
      
      <div class="overflow-x-auto">
        <div class="min-w-[1000px]">
          <table class="w-full">
            <thead>
              <tr class="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400 w-120">用户名</th>
                <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400 w-200">邮箱</th>
                <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400 w-120">电话</th>
                <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400 w-100">角色</th>
                <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400 w-80">用户类型</th>
                <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400 w-80">状态</th>
                <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400 w-150">创建时间</th>
                <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400 w-200">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="user in userList"
                :key="user.id"
                class="border-b border-gray-100 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <td class="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">{{ user.username }}</td>
                <td class="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{{ user.email }}</td>
                <td class="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{{ user.phone || '-' }}</td>
                <td class="py-3 px-4 text-sm">
                  <span :class="getRoleClass(user.role, user.roleId)">
                    {{ getRoleText(user.role, user.roleId) }}
                  </span>
                </td>
                <td class="py-3 px-4 text-sm">
                  <span :class="getUserTypeClass(user.userType)">
                    {{ getUserTypeText(user.userType) }}
                  </span>
                </td>
                <td class="py-3 px-4 text-sm">
                  <span :class="getStatusClass(user.status)">
                    {{ getStatusText(user.status) }}
                  </span>
                </td>
                <td class="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{{ formatDate(user.createdAt) }}</td>
                <td class="py-3 px-4 text-sm">
                  <div class="flex items-center gap-2">
                    <NButton size="small" type="primary" @click="openEditModal(user)">编辑</NButton>
                    <NButton size="small" :type="user.status === 1 || user.status === 'active' ? 'warning' : 'success'" @click="handleToggleStatus(user.id, user.status)">
                      {{ user.status === 1 || user.status === 'active' ? '禁用' : '启用' }}
                    </NButton>
                    <NButton size="small" type="info" @click="openResetModal(user.id)">重置</NButton>
                    <NPopconfirm @positive-click="() => handleDelete(user.id)">
                      <template #trigger>
                        <NButton size="small" type="error">删除</NButton>
                      </template>
                      确定要删除该用户吗？
                    </NPopconfirm>
                    <NButton size="small" type="warning" @click="openAssignRoleModal(user)">分配角色</NButton>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          
          <div v-if="userList.length === 0" class="py-12 text-center text-gray-400">
            暂无用户数据
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

    <NModal v-model:show="showAddModal" title="新增用户" preset="card" :style="{ width: '500px' }">
      <div class="space-y-4">
        <NFormItem label="用户名" :rule="[{ required: true, message: '请输入用户名' }]">
          <NInput v-model:value="formData.username" placeholder="请输入用户名" />
        </NFormItem>
        <NFormItem label="邮箱" :rule="[{ required: true, message: '请输入邮箱' }, { type: 'email', message: '请输入正确的邮箱格式' }]">
          <NInput v-model:value="formData.email" placeholder="请输入邮箱" />
        </NFormItem>
        <NFormItem label="电话">
          <NInput v-model:value="formData.phone" placeholder="请输入电话" />
        </NFormItem>
        <NFormItem label="角色">
          <NSelect v-model:value="formData.roleId" :options="allRoles" placeholder="请选择角色" />
        </NFormItem>
        <NFormItem label="用户类型">
          <NSelect v-model:value="formData.userType" :options="userTypeOptions" placeholder="请选择用户类型" />
        </NFormItem>
        <NFormItem label="状态">
          <NSelect v-model:value="formData.status" :options="statusOptions.filter(s => s.value)" placeholder="请选择状态" />
        </NFormItem>
        <NFormItem label="密码" :rule="[{ required: true, message: '请输入密码' }, { min: 6, message: '密码长度至少6位' }]">
          <NInput v-model:value="formData.password" type="password" placeholder="请输入密码" />
        </NFormItem>
      </div>
      <template #footer>
        <div class="flex justify-end gap-2">
          <NButton @click="showAddModal = false">取消</NButton>
          <NButton type="primary" @click="handleSubmit">确定</NButton>
        </div>
      </template>
    </NModal>

    <NModal v-model:show="showEditModal" title="编辑用户" preset="card" :style="{ width: '500px' }">
      <div class="space-y-4">
        <NFormItem label="用户名" :rule="[{ required: true, message: '请输入用户名' }]">
          <NInput v-model:value="editData.username" placeholder="请输入用户名" />
        </NFormItem>
        <NFormItem label="邮箱" :rule="[{ required: true, message: '请输入邮箱' }, { type: 'email', message: '请输入正确的邮箱格式' }]">
          <NInput v-model:value="editData.email" placeholder="请输入邮箱" />
        </NFormItem>
        <NFormItem label="电话">
          <NInput v-model:value="editData.phone" placeholder="请输入电话" />
        </NFormItem>
        <NFormItem label="角色">
          <NSelect v-model:value="editData.roleId" :options="allRoles" placeholder="请选择角色" />
        </NFormItem>
        <NFormItem label="用户类型">
          <NSelect v-model:value="editData.userType" :options="userTypeOptions" placeholder="请选择用户类型" />
        </NFormItem>
        <NFormItem label="状态">
          <NSelect v-model:value="editData.status" :options="statusOptions.filter(s => s.value)" placeholder="请选择状态" />
        </NFormItem>
      </div>
      <template #footer>
        <div class="flex justify-end gap-2">
          <NButton @click="showEditModal = false">取消</NButton>
          <NButton type="primary" @click="handleUpdate">确定</NButton>
        </div>
      </template>
    </NModal>

    <NModal v-model:show="showResetModal" title="重置密码" preset="card" :style="{ width: '400px' }">
      <div class="space-y-4">
        <NFormItem label="新密码">
          <div class="flex items-center gap-2 w-full">
            <NInput
              v-model:value="resetPasswordInput"
              :type="showResetPassword ? 'text' : 'password'"
              placeholder="请输入新密码"
              class="flex-1"
            />
            <NButton size="small" @click="showResetPassword = !showResetPassword">
              {{ showResetPassword ? '隐藏' : '显示' }}
            </NButton>
          </div>
        </NFormItem>
      </div>
      <template #action>
        <NButton @click="showResetModal = false">取消</NButton>
        <NButton type="primary" @click="handleResetPassword">确认</NButton>
      </template>
    </NModal>

    <NModal v-model:show="showAssignRoleModal" title="分配角色" preset="card" :style="{ width: '400px' }">
      <div class="space-y-4">
        <NFormItem label="当前用户">
          <NInput :value="selectedUser?.username || ''" disabled />
        </NFormItem>
        <NFormItem label="选择角色" :rule="[{ required: true, message: '请选择角色' }]">
          <NSelect v-model:value="selectedRoleId" :options="allRoles" placeholder="请选择角色" />
        </NFormItem>
        <div v-if="selectedRolePermissions.length > 0" class="mt-4">
          <span class="text-gray-500 dark:text-gray-400 block mb-2">角色权限</span>
          <div class="flex flex-wrap gap-2">
            <span v-for="perm in selectedRolePermissions" :key="perm" class="px-2 py-1 rounded text-xs bg-blue-100 text-blue-700">
              {{ perm }}
            </span>
          </div>
        </div>
      </div>
      <template #footer>
        <NButton @click="showAssignRoleModal = false">取消</NButton>
        <NButton type="primary" @click="handleAssignRole">确认</NButton>
      </template>
    </NModal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue'
import { NButton, NInput, NSelect, NPagination, NModal, NFormItem, NPopconfirm } from 'naive-ui'
import { Search } from '@vicons/ionicons5'
import { message } from '@/utils/message'
import { getUserList, createUser, updateUser, deleteUser, toggleUserStatus, resetPassword, assignUserRole, getAllRoles, type Role } from '@/api/system'

const searchKeyword = ref('')
const roleFilter = ref('')
const statusFilter = ref('')
const loading = ref(false)
const SearchIcon = Search

const showAddModal = ref(false)
const showEditModal = ref(false)
const showResetModal = ref(false)
const showResetPassword = ref(false)
const showAssignRoleModal = ref(false)

const editUserId = ref(0)
const resetPasswordInput = ref('')
const selectedUser = ref<any>(null)
const selectedRoleId = ref<number | null>(null)
const allRoles = ref<{ label: string; value: number }[]>([])
const selectedRolePermissions = ref<string[]>([])
const allRolesData = ref<Role[]>([])

const formData = reactive({
  username: '',
  email: '',
  phone: '',
  roleId: null as number | null,
  userType: 'normal',
  status: 'active',
  password: ''
})

const editData = reactive({
  username: '',
  email: '',
  phone: '',
  roleId: null as number | null,
  userType: 'normal',
  status: 'active'
})

const roleOptions = [
  { label: '全部', value: '' }
]

const userTypeOptions = [
  { label: '管理员', value: 'admin' },
  { label: '普通用户', value: 'normal' }
]

const statusOptions = [
  { label: '全部', value: '' },
  { label: '启用', value: 'active' },
  { label: '禁用', value: 'inactive' }
]

const userList = ref<any[]>([])

const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0
})

const roleMap: Record<string, { text: string; class: string }> = {
  'admin': { text: '管理员', class: 'px-2 py-1 rounded-full text-xs bg-red-100 text-red-700' },
  'sales': { text: '销售', class: 'px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700' },
  'support': { text: '客服', class: 'px-2 py-1 rounded-full text-xs bg-green-100 text-green-700' },
  'finance': { text: '财务', class: 'px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700' }
}

const roleIdMap: Record<number, { text: string; class: string }> = {
  1: { text: '管理员', class: 'px-2 py-1 rounded-full text-xs bg-red-100 text-red-700' },
  2: { text: '用户', class: 'px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700' }
}

const getRoleText = (role: string | undefined, roleId: number | undefined) => {
  if (roleId) {
    const found = allRolesData.value.find((r: Role) => r.id === roleId)
    if (found) return found.name
  }
  return roleMap[role || '']?.text || role || '未分配'
}

const getRoleClass = (role: string | undefined, roleId: number | undefined) => {
  if (roleId) {
    return 'px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700'
  }
  return roleMap[role || '']?.class || 'px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700'
}

const getUserTypeText = (userType: string | undefined) => {
  return userType === 'admin' ? '管理员' : '普通用户'
}

const getUserTypeClass = (userType: string | undefined) => {
  return userType === 'admin'
    ? 'px-2 py-1 rounded-full text-xs bg-red-100 text-red-700'
    : 'px-2 py-1 rounded-full text-xs bg-green-100 text-green-700'
}

const getStatusText = (status: number | string) => {
  const isActive = status === 1 || status === 'active'
  return isActive ? '启用' : '禁用'
}

const getStatusClass = (status: number | string) => {
  const isActive = status === 1 || status === 'active'
  return isActive ? 'px-2 py-1 rounded-full text-xs bg-green-100 text-green-700' : 'px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700'
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  return dateStr.includes('T') ? dateStr.split('T')[0] : dateStr
}

const loadUsers = async () => {
  loading.value = true
  try {
    const res = await getUserList({
      pageNum: pagination.page,
      pageSize: pagination.pageSize,
      username: searchKeyword.value,
      role: roleFilter.value,
      status: statusFilter.value
    })
    if (Array.isArray(res)) {
      userList.value = res
      pagination.total = res.length
    } else if (res.list && Array.isArray(res.list)) {
      userList.value = res.list
      pagination.total = res.total || 0
    } else {
      userList.value = []
      pagination.total = 0
    }
  } catch (error: any) {
    message.error(error.message || '加载失败')
    userList.value = []
    pagination.total = 0
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  pagination.page = 1
  loadUsers()
}

const handleReset = () => {
  searchKeyword.value = ''
  roleFilter.value = ''
  statusFilter.value = ''
  pagination.page = 1
  loadUsers()
}

const handlePageChange = (page: number) => {
  pagination.page = page
  loadUsers()
}

const handlePageSizeChange = (pageSize: number) => {
  pagination.pageSize = pageSize
  pagination.page = 1
  loadUsers()
}

const openEditModal = (user: any) => {
  editUserId.value = user.id
  editData.username = user.username
  editData.email = user.email
  editData.phone = user.phone || ''
  editData.roleId = user.roleId || null
  editData.userType = user.userType || 'normal'
  editData.status = user.status === 1 ? 'active' : user.status === 0 ? 'inactive' : (user.status || 'active')
  showEditModal.value = true
}

const openResetModal = (id: number) => {
  editUserId.value = id
  resetPasswordInput.value = generateRandomPassword()
  showResetModal.value = true
}

const generateRandomPassword = () => {
  const chars = '0123456789'
  let password = ''
  for (let i = 0; i < 8; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return password
}

const handleSubmit = async () => {
  if (!formData.username || !formData.email || !formData.password) {
    message.error('请填写必填项')
    return
  }

  try {
    await createUser({
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
      roleId: formData.roleId,
      userType: formData.userType,
      status: formData.status === 'active' ? '1' : '0',
      password: formData.password
    })
    message.success('创建成功')
    showAddModal.value = false
    formData.username = ''
    formData.email = ''
    formData.phone = ''
    formData.roleId = null
    formData.userType = 'normal'
    formData.status = 'active'
    formData.password = ''
    loadUsers()
  } catch (error: any) {
    message.error(error.message || '创建失败')
  }
}

const handleUpdate = async () => {
  if (!editData.username || !editData.email) {
    message.error('请填写必填项')
    return
  }

  try {
    const submitData = {
      username: editData.username,
      email: editData.email,
      phone: editData.phone,
      roleId: editData.roleId,
      userType: editData.userType,
      status: editData.status === 'active' ? '1' : '0'
    }
    await updateUser(editUserId.value, submitData)
    message.success('更新成功')
    showEditModal.value = false
    loadUsers()
  } catch (error: any) {
    message.error(error.message || '更新失败')
  }
}

const handleToggleStatus = async (id: number, status: number | string) => {
  const newStatus = status === 1 || status === 'active' ? '0' : '1'
  try {
    await toggleUserStatus(id, newStatus)
    message.success('状态已更新')
    loadUsers()
  } catch (error: any) {
    message.error(error.message || '操作失败')
  }
}

const handleResetPassword = async () => {
  if (!resetPasswordInput.value || resetPasswordInput.value.length < 6) {
    message.error('请输入至少6位的新密码')
    return
  }
  
  try {
    await resetPassword(editUserId.value, resetPasswordInput.value)
    message.success('密码重置成功')
    showResetModal.value = false
    resetPasswordInput.value = ''
  } catch (error: any) {
    message.error(error.message || '重置失败')
  }
}

const handleDelete = async (id: number) => {
  try {
    await deleteUser(id)
    message.success('删除成功')
    loadUsers()
  } catch (error: any) {
    message.error(error.message || '删除失败')
  }
}

const loadAllRoles = async () => {
  try {
    const roles = await getAllRoles()
    allRolesData.value = roles
    allRoles.value = roles.map((r: Role) => ({
      label: r.name,
      value: r.id
    }))
  } catch (error: any) {
    message.error('加载角色列表失败')
  }
}

const openAssignRoleModal = (user: any) => {
  selectedUser.value = user
  selectedRoleId.value = user.roleId || null
  selectedRolePermissions.value = user.permissions ? user.permissions.split(',') : []
  showAssignRoleModal.value = true
}

watch(selectedRoleId, (newRoleId) => {
  if (newRoleId) {
    const role = allRolesData.value.find((r: Role) => r.id === newRoleId)
    if (role && role.permissions) {
      selectedRolePermissions.value = role.permissions.split(',')
    } else {
      selectedRolePermissions.value = []
    }
  } else {
    selectedRolePermissions.value = []
  }
})

const handleAssignRole = async () => {
  if (!selectedRoleId.value) {
    message.error('请选择角色')
    return
  }
  try {
    const result = await assignUserRole(selectedUser.value.id, selectedRoleId.value)
    message.success('角色分配成功')
    showAssignRoleModal.value = false
    loadUsers()
  } catch (error: any) {
    message.error(error.message || '角色分配失败')
  }
}

onMounted(() => {
  loadUsers()
  loadAllRoles()
})
</script>