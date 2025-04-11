import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import './assets/styles/main.css'

const app = createApp(App)

// Add Pinia
app.use(createPinia())
app.use(router)

app.mount('#app')
