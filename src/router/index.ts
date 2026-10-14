import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CVView from '../views/CVView.vue'
import PortfolioView from '../views/PortfolioView.vue'
import ShapeScaleView from '../views/ShapeScaleView.vue'
import ShapeTestView from '../views/ShapeTestView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/cv',
    name: 'cv',
    component: CVView
  },
  {
    path: '/portfolio',
    name: 'portfolio',
    component: PortfolioView
  },
  {
    path: '/scale',
    name: 'scale',
    component: ShapeScaleView
  },
  {
    path: '/test-shape',
    name: 'test-shape',
    component: ShapeTestView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
