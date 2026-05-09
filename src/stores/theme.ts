import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const dark = ref(localStorage.getItem('dark') === 'true')

  const toggle = () => {
    dark.value = !dark.value
    localStorage.setItem('dark', dark.value.toString())
  }

  return {
    dark,
    toggle
  }
})
