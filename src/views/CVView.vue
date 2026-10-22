<template>
  <div class="w-full">
    <div class="relative w-full h-screen grid transition-colors duration-300" 
      :style="{ 
        background: `linear-gradient(to right, var(--color-bg-sidebar) ${splitWidth}%, var(--color-bg-page) ${splitWidth}%)`,
        gridTemplateColumns: `${splitWidth}% 1fr`
      }">
      
      <!-- Left Column: Background & Decorative Elements -->
      <aside class="relative h-full overflow-hidden border-2 border-red-500">
        <div 
          class="absolute inset-0 z-0 pointer-events-none" 
          :style="{ width: '100%' }">
          
          <svg 
            viewBox="0 0 1400 1400" 
            preserveAspectRatio="none" 
            class="w-full h-full"
          >
            <defs>
              <linearGradient id="slopeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="white" />
                <stop offset="100%" stop-color="#CCC" />
              </linearGradient>
            </defs>
            <path 
              d="M 0,0 L 1400,0 L 1400,1120 L 0,873 Z" 
              fill="url(#slopeGrad)" 
            />
          </svg>

          <!-- Profile Image -->
          <img 
            src="@/assets/profile.png" 
            class="absolute top-0 right-0 h-full object-cover z-10"
            style="clip-path: polygon(0% 0%, 100% 0%, 100% 80%, 0% 71%);"
          />
        </div>
        <div class="mt-[550px]">
          Lorem ipsum
        </div>
      </aside>

      <!-- Right Column: Content -->
      <section class="relative h-full flex items-center justify-center border-2 border-red-500">
        <div 
          class=" bg-slate-300 dark:bg-slate-700 -translate-x-1/2 z-20"
        ></div>
                    <Header :profile="cvStore.profile" />
      </section>
    </div>
    <div class="relative flex justify-center min-h-screen transition-colors duration-300" style="overflow-x: clip;">
      <!-- Background Bleed
      <div 
        class="fixed top-0 left-0 h-full z-0 transition-colors duration-300" 
        style="width: 50vw; background: linear-gradient(to right, var(--color-bg-sidebar) 0%, var(--color-bg-page) 100%);"
      ></div> -->
      
      <div class="w-full max-w-[1200px] mx-auto relative z-10">
        <div 
          ref="contentContainer"
          class="flex w-full mx-auto bg-[var(--color-bg-page)] relative transition-colors duration-300"
          style="max-width: 1024px;"
        >
          <Sidebar ref="sidebarComponent" />
          <main class="flex-1 flex flex-col items-center justify-start">
            <Header :profile="cvStore.profile" />
            <Timeline :experiences="cvStore.experiences" />
          </main>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useCvStore } from '../stores/cv'
import Header from '../components/organisms/Header.vue'
import Timeline from '../components/organisms/Timeline.vue'
import Sidebar from '../components/organisms/Sidebar.vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const cvStore = useCvStore()
const splitWidth = ref(44)
const contentContainer = ref<HTMLElement | null>(null)
const sidebarComponent = ref<any>(null)
let trigger: any = null

onMounted(async () => {
  await nextTick();
  
  setTimeout(() => {
    if (!contentContainer.value || !sidebarComponent.value) return

    const sidebarEl = sidebarComponent.value.asideRef

    // Create a master timeline for the entrance animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: 'body', 
        start: 'top top',
        end: 'top -150px',
        scrub: 0.6,
      }
    });

    // Animate everything in sync with an organic ease
    tl.to(splitWidth, { 
      value: 33, 
      duration: 1, 
      ease: 'power2.inOut',
      onUpdate: () => {
        // This ensures Vue detects the change and updates the DOM
      }
    }, 0);

    tl.to(contentContainer.value, { 
      maxWidth: 1200, 
      duration: 1, 
      ease: 'power2.inOut' 
    }, 0);

    tl.to(sidebarEl, { 
      width: '25%', 
      duration: 1, 
      ease: 'power2.inOut' 
    }, 0);

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);
  }, 150);
})

onUnmounted(() => {
  if (trigger) trigger.kill()
})
</script>
