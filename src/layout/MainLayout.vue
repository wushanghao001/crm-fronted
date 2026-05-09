<template>
  <div class="flex h-screen bg-gray-50">
    <aside :class="['fixed left-0 top-0 h-full bg-white border-r border-gray-200 z-50 transition-all duration-300', sidebarCollapsed ? 'w-16' : 'w-64']">
      <div class="flex items-center h-16 px-4 border-b border-gray-200" :class="sidebarCollapsed ? 'justify-center' : 'justify-between'">
        <div v-if="!sidebarCollapsed" class="flex items-center space-x-3">
          <div class="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md">
            <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            </svg>
          </div>
          <div>
            <span class="font-bold text-gray-800 dark:text-white">客户管理系统</span>
            <p class="text-xs text-gray-500 dark:text-gray-400">CRM System</p>
          </div>
        </div>
        <div v-else class="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md">
          <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>

      <div class="absolute -right-3 top-1/2 -translate-y-1/2 z-60">
        <button @click="toggleSidebar" class="w-6 h-12 bg-white border border-gray-200 rounded-r-lg hover:bg-gray-50 flex items-center justify-center shadow-sm transition-colors" :title="sidebarCollapsed ? '展开菜单' : '折叠菜单'">
          <ChevronDown :class="['w-4 h-4 text-gray-500 transition-transform duration-300', sidebarCollapsed ? 'rotate-180' : '']" />
        </button>
      </div>

      <nav class="p-3 overflow-y-auto h-[calc(100%-4rem)]">
        <div class="space-y-1">
          <button
            v-for="menu in menuOptions"
            :key="menu.key"
            @click="handleMenuClick(menu.key)"
            class="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            :class="{ 'bg-blue-50 text-blue-600': currentMenu === menu.key }"
            :title="sidebarCollapsed ? menu.label : ''"
          >
            <div class="flex items-center space-x-3" :class="sidebarCollapsed ? 'justify-center' : ''">
              <component :is="menu.icon" class="w-5 h-5" />
              <span v-if="!sidebarCollapsed">{{ menu.label }}</span>
            </div>
          </button>
        </div>

        <div class="mt-4 space-y-1" v-for="parent in parentMenus" :key="parent.key">
          <button
            @click="toggleParent(parent.key)"
            class="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-between"
            :title="sidebarCollapsed ? parent.label : ''"
          >
            <div class="flex items-center space-x-3" :class="sidebarCollapsed ? 'justify-center' : ''">
              <component :is="parent.icon" class="w-5 h-5" />
              <span v-if="!sidebarCollapsed">{{ parent.label }}</span>
            </div>
            <ChevronDown v-if="!sidebarCollapsed" class="w-4 h-4" :class="{ 'rotate-180': expandedParents.includes(parent.key) }" />
          </button>
          <div v-if="expandedParents.includes(parent.key) && !sidebarCollapsed" class="ml-4 mt-1 space-y-1">
            <button
              v-for="child in parent.children"
              :key="child.key"
              @click="handleMenuClick(child.key)"
              class="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm"
              :class="{ 'bg-blue-50 text-blue-600': currentMenu === child.key }"
            >
              {{ child.label }}
            </button>
          </div>
        </div>
      </nav>
    </aside>

    <main :class="['flex-1 transition-all duration-300', sidebarCollapsed ? 'ml-16' : 'ml-64']">
      <header class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-40">
        <div class="flex items-center space-x-4">
          <div class="relative">
            <Search class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="搜索..."
              class="pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div class="flex items-center space-x-4">
          <button @click="toggleTheme" class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <component :is="isDark ? Sunny : Moon" class="w-5 h-5 text-gray-600" />
          </button>
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <Person class="w-5 h-5 text-white" />
            </div>
            <div v-if="authStore.user">
              <div class="text-sm font-medium text-gray-800">{{ authStore.user.username }}</div>
              <div class="text-xs text-gray-500">{{ authStore.user.role === 'admin' ? '管理员' : '普通用户' }}</div>
            </div>
          </div>
          <button @click="handleLogout" class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <LogOut class="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </header>

      <div class="p-6 overflow-auto h-[calc(100%-4rem)]">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import {
  ChevronDown,
  Search,
  Moon,
  Sunny,
  Person,
  LogOut,
  Home,
  People,
  Briefcase,
  Headset,
  FileTray,
  BarChart,
  Settings,
  StatsChart
} from '@vicons/ionicons5'
import { useAuthStore } from '@/stores/auth'
import router from '@/router'
import { dialog } from '@/utils/message'

const authStore = useAuthStore()
const currentMenu = ref('')
const isDark = ref(false)
const expandedParents = ref<string[]>(['customer'])
const sidebarCollapsed = ref(false)

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

const simpleMenus = [
  { label: '首页', key: '/dashboard', icon: Home, permission: null },
]

const adminMenus = [
  { label: '管理首页', key: '/dashboard/admin-dashboard', icon: Home, permission: 'admin:dashboard' },
  { label: '个人业绩', key: '/dashboard/my-performance', icon: StatsChart, permission: 'performance:view' },
  { label: '销售机会', key: '/dashboard/opportunities', icon: Briefcase, permission: 'opportunity:view' },
  { label: '服务管理', key: '/dashboard/services', icon: Headset, permission: 'service:view' },
  { label: '产品管理', key: '/dashboard/products', icon: FileTray, permission: 'product:view' },
  { label: '统计分析', key: '/dashboard/statistics', icon: BarChart, permission: 'statistics:view' },
]

const regularMenus = [
  { label: '个人业绩', key: '/dashboard/my-performance', icon: StatsChart, permission: 'performance:view' },
  { label: '销售机会', key: '/dashboard/opportunities', icon: Briefcase, permission: 'opportunity:view' },
  { label: '服务管理', key: '/dashboard/services', icon: Headset, permission: 'service:view' },
  { label: '产品管理', key: '/dashboard/products', icon: FileTray, permission: 'product:view' },
]

const parentMenusConfig = [
  {
    label: '客户管理',
    key: 'customer',
    icon: People,
    children: [
      { label: '客户列表', key: '/dashboard/customers', permission: 'customer:view' },
      { label: '联系人', key: '/dashboard/contacts', permission: 'contact:view' },
      { label: '客户跟进查询', key: '/dashboard/follow-records', permission: 'follow:view' },
      { label: '交互记录', key: '/dashboard/interactions', permission: 'interaction:view' },
      { label: '历史订单', key: '/dashboard/orders', permission: 'order:view' },
    ]
  },
  {
    label: '系统管理',
    key: 'system',
    icon: Settings,
    children: [
      { label: '用户管理', key: '/dashboard/users', permission: 'user:view', adminOnly: true },
      { label: '权限管理', key: '/dashboard/roles', permission: 'role:view', adminOnly: true },
      { label: '日志管理', key: '/dashboard/logs', permission: 'log:view', adminOnly: true },
    ]
  }
]

const menuOptions = computed(() => {
  if (!authStore.user) return []
  const role = authStore.user.role
  const menus = role === 'admin' ? adminMenus : [...simpleMenus, ...regularMenus]
  return menus.filter(menu => {
    if (!menu.permission) return true
    return authStore.hasPermission(menu.permission)
  })
})

const parentMenus = computed(() => {
  if (!authStore.user) return []
  const role = authStore.user.role
  return parentMenusConfig.map(parent => {
    const filteredChildren = parent.children.filter(child => {
      if (child.adminOnly && role !== 'admin') return false
      if (!child.permission) return true
      return authStore.hasPermission(child.permission)
    })
    return {
      ...parent,
      children: filteredChildren
    }
  }).filter(parent => parent.children.length > 0)
})

const toggleParent = (key: string) => {
  const index = expandedParents.value.indexOf(key)
  if (index > -1) {
    expandedParents.value.splice(index, 1)
  } else {
    expandedParents.value.push(key)
  }
}

const toggleTheme = () => {
  isDark.value = !isDark.value
}

const handleMenuClick = (key: string) => {
  currentMenu.value = key
  if (key.startsWith('/')) {
    router.push(key)
  }
}

const handleLogout = () => {
  dialog.warning({
    title: '确认退出',
    content: '确定要退出系统吗？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      authStore.logout()
      router.push('/login')
    }
  })
}

onMounted(async () => {
  await authStore.loadUser()
  const path = window.location.pathname
  currentMenu.value = path
})
</script>
