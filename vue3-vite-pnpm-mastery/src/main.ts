import './assets/main.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'

import HighchartsVue from 'highcharts-vue'
import VCalendar from 'v-calendar'
import 'v-calendar/style.css'
import App from './App.vue'
import router from './router'

// Use plugin with optional defaults





const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(HighchartsVue)
app.use(VCalendar, {})

app.mount('#app')
