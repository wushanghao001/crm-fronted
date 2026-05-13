import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  define: {
    global: 'globalThis'
  },
  server: {
    port: 8080,
    proxy: {
      '/ws': {
        target: 'http://localhost:8888',
        ws: true
      },
      '/api': {
        target: 'http://localhost:8888',
        changeOrigin: true
      }
    }
  }
})
