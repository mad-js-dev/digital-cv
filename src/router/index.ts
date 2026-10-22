import { createRouter, createWebHistory } from 'vue-router'
import CVView from '../views/CVView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: CVView
  },
  {
    path: '/cv',
    name: 'cv',
    component: CVView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
