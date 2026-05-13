<template>
  <div class="layout-container">
    <!-- 左侧侧边栏 -->
    <aside :class="['sidebar', sidebarCollapsed ? 'collapsed' : '']">
      <div class="sidebar-header" :class="sidebarCollapsed ? 'justify-center' : 'justify-between'">
        <div v-if="!sidebarCollapsed" class="logo">
          <div class="logo-icon">
            <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="logo-text">
            <span class="font-bold text-gray-800">客户管理系统</span>
            <p class="text-xs text-gray-500">CRM System</p>
          </div>
        </div>
        <div v-else class="logo-mini">
          <div class="logo-icon">
            <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
      
      <button @click="toggleSidebar" class="sidebar-toggle" :title="sidebarCollapsed ? '展开菜单' : '折叠菜单'">
        <ChevronDown :class="['w-4 h-4 text-gray-500 transition-transform duration-300', sidebarCollapsed ? 'rotate-180' : '']" />
      </button>
      
      <nav class="sidebar-nav">
        <div class="space-y-1">
          <button
            v-for="menu in menuOptions"
            :key="menu.key"
            @click="handleMenuClick(menu.key)"
            class="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-900"
            :class="{ 'bg-blue-50 text-blue-600': currentMenu === menu.key }"
            :title="sidebarCollapsed ? menu.label : ''"
          >
            <div class="flex items-center space-x-3" :class="sidebarCollapsed ? 'justify-center' : ''">
              <span class="menu-icon-wrapper">
                <component :is="menu.icon" class="w-5 h-5" />
              </span>
              <span v-if="!sidebarCollapsed">{{ menu.label }}</span>
            </div>
          </button>
        </div>

        <div class="mt-4 space-y-1" v-for="parent in parentMenus" :key="parent.key">
          <button
            @click="toggleParent(parent.key)"
            class="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-between text-gray-600 hover:text-gray-900"
            :title="sidebarCollapsed ? parent.label : ''"
          >
            <div class="flex items-center space-x-3" :class="sidebarCollapsed ? 'justify-center' : ''">
              <span class="menu-icon-wrapper">
                <component :is="parent.icon" class="w-5 h-5" />
              </span>
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
    
    <!-- 主内容区域 -->
    <main :class="['main-content', sidebarCollapsed ? 'sidebar-collapsed' : '']">
      <!-- 顶部Header -->
      <header class="header">
        <div class="header-left">
          <div class="relative">
            <Search class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="搜索..."
              class="search-input"
            />
          </div>
        </div>
        <div class="header-right">
          <button @click="toggleTheme" class="theme-toggle">
            <component :is="isDark ? Sunny : Moon" class="w-5 h-5 text-gray-600" />
          </button>
          <div class="user-info">
            <div class="user-avatar">
              <Person class="w-5 h-5 text-white" />
            </div>
            <div v-if="authStore.user" class="user-details">
              <div class="text-sm font-medium text-gray-800">{{ authStore.user.username }}</div>
              <div class="text-xs text-gray-500">{{ authStore.user.role === 'admin' ? '管理员' : '普通用户' }}</div>
            </div>
          </div>
          <button @click="handleLogout" class="logout-btn">
            <LogOut class="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </header>
      
      <!-- 页面内容 -->
      <div class="page-content">
        <router-view v-slot="{ Component }">
          <keep-alive :include="['Home', 'Dashboard']">
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
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
  { label: '销售机会', key: '/dashboard/opportunities', icon: Briefcase, permission: 'opportunity:view' },
  { label: '服务管理', key: '/dashboard/services', icon: Headset, permission: 'service:view' },
  { label: '统计分析', key: '/dashboard/statistics', icon: BarChart, permission: 'statistics:view' },
]

const regularMenus = [
  { label: '个人业绩', key: '/dashboard/my-performance', icon: StatsChart, permission: 'performance:view' },
  { label: '销售机会', key: '/dashboard/opportunities', icon: Briefcase, permission: 'opportunity:view' },
  { label: '服务管理', key: '/dashboard/services', icon: Headset, permission: 'service:view' },
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
    label: '产品维护',
    key: 'product-maintenance',
    icon: FileTray,
    children: [
      { label: '产品管理', key: '/dashboard/products', permission: 'product:view' },
      { label: '项目号档案维护', key: '/dashboard/project-codes', permission: 'projectcode:view' },
      { label: '料号档案维护', key: '/dashboard/material-codes', permission: 'materialcode:view' },
      { label: '牌号档案维护', key: '/dashboard/brand-codes', permission: 'brandcode:view' },
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
    onPositiveClick: async () => {
      await authStore.logout()
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

<style lang="scss" scoped>
.layout-container {
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #f9fafb;
}

.sidebar {
  flex-shrink: 0;
  width: 256px;
  height: 100%;
  background: #fff;
  border-right: 1px solid #e5e7eb;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  transition: width 0.3s ease;
  
  &.collapsed {
    width: 64px;
  }
}

.sidebar-header {
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  border-bottom: 1px solid #e5e7eb;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-text {
  display: flex;
  flex-direction: column;
}

.logo-mini {
  display: flex;
  justify-content: center;
  width: 100%;
}

.sidebar-toggle {
  position: absolute;
  right: -12px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 48px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-left: none;
  border-radius: 0 6px 6px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 101;
  
  &:hover {
    background: #f3f4f6;
  }
}

.sidebar-nav {
  padding: 16px;
  height: calc(100% - 64px);
  overflow-y: auto;
}

.menu-icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  color: #4b5563;
  flex-shrink: 0;
  
  svg {
    width: 20px !important;
    height: 20px !important;
    fill: currentColor;
    stroke: currentColor;
    stroke-width: 2;
  }
}

button:hover .menu-icon-wrapper {
  color: #1f2937;
}

button.bg-blue-50 .menu-icon-wrapper {
  color: #2563eb;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  margin-left: 256px;
  transition: margin-left 0.3s ease;
  
  &.sidebar-collapsed {
    margin-left: 64px;
  }
}

.header {
  flex-shrink: 0;
  height: 64px;
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  position: sticky;
  top: 0;
  z-index: 50;
}

.header-left {
  flex-shrink: 0;
}

.search-input {
  width: 256px;
  height: 36px;
  padding: 0 12px 0 36px;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  outline: none;
  
  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.theme-toggle, .logout-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  border-radius: 8px;
  cursor: pointer;
  
  &:hover {
    background: #f3f4f6;
  }
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  width: 36px;
  height: 36px;
  background: #3b82f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.page-content {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  overflow-x: hidden;
  background: #f9fafb;
}
</style>