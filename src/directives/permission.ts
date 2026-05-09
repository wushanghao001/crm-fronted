import type { App, Directive } from 'vue'
import { useAuthStore } from '@/stores/auth'

export const permissionDirective: Directive = {
  mounted(el: HTMLElement, binding) {
    const authStore = useAuthStore()
    const { value } = binding

    if (value) {
      const hasPermission = authStore.hasPermission(value)
      if (!hasPermission) {
        el.parentNode?.removeChild(el)
      }
    }
  }
}

export const roleDirective: Directive = {
  mounted(el: HTMLElement, binding) {
    const authStore = useAuthStore()
    const { value } = binding

    if (value) {
      const hasRole = authStore.hasRole(value)
      if (!hasRole) {
        el.parentNode?.removeChild(el)
      }
    }
  }
}

export default {
  install(app: App) {
    app.directive('permission', permissionDirective)
    app.directive('role', roleDirective)
  }
}