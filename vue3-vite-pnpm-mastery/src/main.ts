import './assets/main.css'

import { DefaultApolloClient } from '@vue/apollo-composable'
import { createPinia } from 'pinia'
import { createApp, h, provide } from 'vue'

import HighchartsVue from 'highcharts-vue'
import VCalendar from 'v-calendar'
import 'v-calendar/style.css'
import App from './App.vue'
import apolloClient from './fsd/shared/config/ApolloClient'
import router from './router'

// Use plugin with optional defaults

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App)
})
app.use(createPinia())
app.use(router)
app.use(HighchartsVue)
app.use(VCalendar, {})

app.mount('#app')
