import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/v-calendar',
      name: 'v-calendar',
      component: () => import('../views/VCalendarView.vue')
    },
    {
      path: '/v-date-picker',
      name: 'v-date-picker',
      component: () => import('../views/VDatePickerView.vue')
    },
    {
      path: '/highcharts',
      name: 'highcharts',
      component: () => import('../views/HighChartsView.vue')
    },
    {
      path: '/highcharts-mouse-over',
      name: 'highcharts-mouse-over',
      component: () => import('../views/HighChartsMouseOverView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
