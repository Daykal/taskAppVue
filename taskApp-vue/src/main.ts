import '@/assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import 'primeicons/primeicons.css'
import { createPinia } from 'pinia'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(Toast)

app.mount('#app')
