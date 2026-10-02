<template>
  <div class="relative flex justify-center min-h-screen bg-[var(--color-bg-page)] transition-colors duration-300">
    <ThemeControl />
    <!-- Background Bleed: Fills the left half of the screen with the sidebar color -->
    <div class="fixed top-0 left-0 h-full w-1/2 bg-[var(--color-bg-sidebar)] z-0 transition-colors duration-300"></div>
    
    <!-- Centered Content Container -->
    <div 
      ref="contentContainer"
      class="flex w-full mx-auto bg-[var(--color-bg-page)] relative z-10 transition-colors duration-300"
      style="max-width: 1024px;"
    >
      <!-- Sidebar: Now integrates perfectly with the background bleed -->
      <Sidebar ref="sidebarComponent" />
    
      <!-- Main Content Area -->
      <main class="flex-1 flex flex-col items-center justify-start">
        <Header :profile="cvStore.profile" />
        <Timeline :experiences="cvStore.experiences" />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useCvStore } from './stores/cv'
import Header from './components/organisms/Header.vue'
import Timeline from './components/organisms/Timeline.vue'
import Sidebar from './components/organisms/Sidebar.vue'
import ThemeControl from './components/atoms/ThemeControl.vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const cvStore = useCvStore()
const contentContainer = ref<any>(null)
const sidebarComponent = ref<any>(null)
let trigger = null

onMounted(() => {
  // Initialize theme class and apply palette
  document.documentElement.classList.toggle('dark', cvStore.theme === 'dark');
  cvStore.applyTheme();

  if (!contentContainer.value || !sidebarComponent.value) return

  const sidebarEl = sidebarComponent.value.asideRef

  trigger = ScrollTrigger.create({
    trigger: '.work-experience-title',
    start: 'top 80%',
    end: 'bottom 20%',
    onEnter: () => {
      gsap.to(contentContainer.value, { maxWidth: '1200px', duration: 0.7, ease: 'power2.out' })
      gsap.to(sidebarEl, { width: '25%', duration: 0.7, ease: 'power2.out' })
    },
    onLeaveBack: () => {
      gsap.to(contentContainer.value, { maxWidth: '1024px', duration: 0.7, ease: 'power2.out' })
      gsap.to(sidebarEl, { width: '33.33%', duration: 0.7, ease: 'power2.out' })
    },
  })
})

onUnmounted(() => {
  if (trigger) trigger.kill()
})
</script>