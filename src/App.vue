<template>
  <div class="relative flex justify-center min-h-screen bg-[var(--color-bg-page)] transition-colors duration-300" style="overflow-x: clip;">
    <ThemeControl />
    <DownloadButton />
    
    <!-- Background Bleed: Fills the left half of the screen with the sidebar color -->
    <div class="fixed top-0 left-0 h-full w-1/2 bg-[var(--color-bg-sidebar)] z-0 transition-colors duration-300"></div>
    
    <!-- STABLE OUTER FRAME -->
    <div class="w-full max-w-[1200px] mx-auto relative z-10">
      <!-- 
        INNER CONTAINER:
        - REMOVED 'items-start'. 
        - By default, flex children (like the Sidebar) will 'stretch' to fill 
          the height of the container. This ensures the sidebar background 
          fills the whole page.
      -->
      <div 
        ref="contentContainer"
        class="flex w-full mx-auto bg-[var(--color-bg-page)] relative transition-colors duration-300"
        style="max-width: 1024px;"
      >
        <!-- Sidebar -->
        <Sidebar ref="sidebarComponent" />
      
        <!-- Main Content Area -->
        <main class="flex-1 flex flex-col items-center justify-start">
          <Header :profile="cvStore.profile" />
          <Timeline :experiences="cvStore.experiences" />
        </main>
      </div>
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
import DownloadButton from './components/atoms/DownloadButton.vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const cvStore = useCvStore()
const contentContainer = ref<HTMLElement | null>(null)
const sidebarComponent = ref<any>(null)
let trigger: any = null

onMounted(async () => {
  document.documentElement.classList.toggle('dark', cvStore.theme === 'dark');
  cvStore.applyTheme();

  await nextTick();
  
  setTimeout(() => {
    if (!contentContainer.value || !sidebarComponent.value) return

    const sidebarEl = sidebarComponent.value.asideRef

    trigger = ScrollTrigger.create({
      trigger: 'body', 
      start: 'top top',
      end: 'top -150px',
      scrub: 0.6,
      onUpdate: (self) => {
        const progress = self.progress;
        const currentMaxWidth = 1024 + (1200 - 1024) * progress;
        const currentSidebarWidth = 33.33 - (33.33 - 25) * progress;
        
        gsap.set(contentContainer.value, { 
          maxWidth: `${currentMaxWidth}px`,
          x: 0 
        });
        gsap.set(sidebarEl, { 
          width: `${currentSidebarWidth}%` 
        });
      },
      onLeave: () => {
        ScrollTrigger.refresh();
      }
    })

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);
  }, 150);
})

onUnmounted(() => {
  if (trigger) trigger.kill()
})
</script>
