<template>
  <div class="relative flex justify-center min-h-screen bg-[var(--color-bg-page)] transition-colors duration-300 overflow-x-hidden">
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
      <main class="flex-1 flex-col items-center justify-start">
        <Header :profile="cvStore.profile" />
        <Timeline :experiences="cvStore.experiences" />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
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

onMounted(async () => {
  // Initialize theme class
  document.documentElement.classList.toggle('dark', cvStore.theme === 'dark');
  cvStore.applyTheme();

  await nextTick();
  
  setTimeout(() => {
    if (!contentContainer.value || !sidebarComponent.value) return

    const sidebarEl = sidebarComponent.value.asideRef

    // Changed trigger to be based on the very top of the page (0px)
    // This ensures the animation starts the moment the user begins to scroll down
    trigger = ScrollTrigger.create({
      trigger: 'body', 
      start: 'top top',
      end: 'top -100px', // Trigger completes quickly as user scrolls
      scrub: 0.5, // Smoothly link the animation progress to the scroll position
      onUpdate: (self) => {
        // self.progress is a value from 0 to 1
        const progress = self.progress;
        
        // Linearly interpolate widths based on scroll progress
        const currentMaxWidth = 1024 + (1200 - 1024) * progress;
        const currentSidebarWidth = 33.33 - (33.33 - 25) * progress;
        
        gsap.set(contentContainer.value, { maxWidth: `${currentMaxWidth}px` });
        gsap.set(sidebarEl, { width: `${currentSidebarWidth}%` });
      }
    })

    ScrollTrigger.refresh();
  }, 150);
})

onUnmounted(() => {
  if (trigger) trigger.kill()
})
</script>