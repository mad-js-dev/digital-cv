import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CVView from '../views/CVView.vue'
import PortfolioView from '../views/PortfolioView.vue'
import ShapeScaleView from '../views/ShapeScaleView.vue'
import ShapeTestView from '../views/ShapeTestView.vue'
import TypographyTestView from '../views/TypographyTestView.vue'
import IconsTestView from '../views/IconsTestView.vue'
import SpacingTestView from '../views/SpacingTestView.vue'
import ElevationTestView from '../views/ElevationTestView.vue'
import ColorTestView from '../views/ColorTestView.vue'
import M3ButtonsView from '../views/M3ButtonsView.vue'
import M3SurfaceView from '../views/M3SurfaceView.vue'

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
  },
  {
    path: '/test-typography',
    name: 'test-typography',
    component: TypographyTestView
  },
  {
    path: '/test-icons',
    name: 'test-icons',
    component: IconsTestView
  },
  {
    path: '/test-spacing',
    name: 'test-spacing',
    component: SpacingTestView
  },
  {
    path: '/test-elevation',
    name: 'test-elevation',
    component: ElevationTestView
  },
  {
    path: '/test-color',
    name: 'test-color',
    component: ColorTestView
  },
  {
    path: '/test-buttons',
    name: 'test-buttons',
    component: M3ButtonsView
  },
  {
    path: '/test-surface',
    name: 'test-surface',
    component: M3SurfaceView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
