import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'OutHome',
    component: () => import('@/views/OutHome.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register.vue')
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('@/views/ForgotPassword.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/layout/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue')
      },
      {
        path: 'my-performance',
        name: 'MyPerformance',
        component: () => import('@/views/performance/MyPerformance.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'admin-dashboard',
        name: 'AdminDashboard',
        component: () => import('@/views/dashboard/Dashboard.vue'),
        meta: { requiresAuth: true, permission: 'admin:dashboard' }
      },
      {
        path: 'customers',
        name: 'CustomerList',
        component: () => import('@/views/customer/CustomerList.vue'),
        meta: { requiresAuth: true, permission: 'customer:view' }
      },
      {
        path: 'customers/add',
        name: 'CustomerAdd',
        component: () => import('@/views/customer/CustomerForm.vue'),
        meta: { requiresAuth: true, permission: 'customer:add' }
      },
      {
        path: 'customers/:id',
        name: 'CustomerDetail',
        component: () => import('@/views/customer/CustomerDetail.vue'),
        meta: { requiresAuth: true, permission: 'customer:view' }
      },
      {
        path: 'customers/:id/edit',
        name: 'CustomerEdit',
        component: () => import('@/views/customer/CustomerForm.vue'),
        meta: { requiresAuth: true, permission: 'customer:edit' }
      },
      {
        path: 'customers/:customerId/follow',
        name: 'CustomerFollow',
        component: () => import('@/views/customer/CustomerFollow.vue'),
        meta: { requiresAuth: true, permission: 'customer:view' }
      },
      {
        path: 'contacts',
        name: 'ContactList',
        component: () => import('@/views/customer/ContactList.vue'),
        meta: { requiresAuth: true, permission: 'contact:view' }
      },
      {
        path: 'follow-records',
        name: 'FollowRecordList',
        component: () => import('@/views/customer/FollowRecordList.vue'),
        meta: { requiresAuth: true, permission: 'follow:view' }
      },
      {
        path: 'interactions',
        name: 'InteractionList',
        component: () => import('@/views/customer/InteractionList.vue'),
        meta: { requiresAuth: true, permission: 'interaction:view' }
      },
      {
        path: 'orders',
        name: 'OrderList',
        component: () => import('@/views/customer/OrderList.vue'),
        meta: { requiresAuth: true, permission: 'order:view' }
      },
      {
        path: 'churn',
        name: 'ChurnList',
        component: () => import('@/views/customer/ChurnList.vue'),
        meta: { requiresAuth: true, permission: 'churn:view' }
      },
      {
        path: 'opportunities',
        name: 'OpportunityList',
        component: () => import('@/views/opportunity/OpportunityList.vue'),
        meta: { requiresAuth: true, permission: 'opportunity:view' }
      },
      {
        path: 'services',
        name: 'ServiceList',
        component: () => import('@/views/service/ServiceList.vue'),
        meta: { requiresAuth: true, permission: 'service:view' }
      },
      {
        path: 'products',
        name: 'ProductList',
        component: () => import('@/views/product/ProductList.vue'),
        meta: { requiresAuth: true, permission: 'product:view' }
      },
      {
        path: 'statistics',
        name: 'Statistics',
        component: () => import('@/views/statistics/Statistics.vue'),
        meta: { requiresAuth: true, permission: 'statistics:view' }
      },
      {
        path: 'users',
        name: 'UserList',
        component: () => import('@/views/system/UserList.vue'),
        meta: { requiresAuth: true, permission: 'user:view' }
      },
      {
        path: 'roles',
        name: 'RoleList',
        component: () => import('@/views/system/RoleList.vue'),
        meta: { requiresAuth: true, permission: 'role:view' }
      },
      {
        path: 'logs',
        name: 'LogList',
        component: () => import('@/views/system/LogList.vue'),
        meta: { requiresAuth: true, permission: 'log:view' }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const token = localStorage.getItem('token')

  if (!authStore.user && token) {
    await authStore.loadUser()
  }

  if (to.meta.requiresAuth && !token) {
    next('/')
    return
  }

  if (to.meta.permission && !authStore.hasPermission(to.meta.permission as string)) {
    next('/dashboard')
    return
  }

  if (to.path === '/login' && token) {
    next('/dashboard')
    return
  }

  next()
})

export default router
