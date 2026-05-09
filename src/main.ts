import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './style.css'
import permissionDirective from './directives/permission'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(permissionDirective)

app.mount('#app')
