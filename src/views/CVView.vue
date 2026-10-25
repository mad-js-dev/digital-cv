<template>
  <div 
    ref="root"
    class="w-full relative min-h-screen" 
    :style="{ 
      '--split-width': `${splitWidth}%`, 
      '--image-left': `${imageLeft}px`,
      background: `linear-gradient(to right, var(--color-bg-sidebar) ${splitWidth}%, var(--color-bg-page) ${splitWidth}%)` 
    }">
    
    <!-- BACKGROUND LAYER (Z-10) -->
    <div 
      class="absolute inset-0 z-10 pointer-events-none" 
      :style="{ 
        width: `${splitWidth}%`, 
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 75vh, 0% 57.35vh)' 
      }">
      
      <svg 
        viewBox="0 0 1400 1400" 
        preserveAspectRatio="none" 
        class="w-full h-full"
      >
        <defs>
          <linearGradient id="slopeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="white" />
            <stop offset="100%" stop-color="#AAA" />
          </linearGradient>
        </defs>
        <rect width="1400" height="120" fill="url(#slopeGrad)" />
      </svg>

      <!-- Profile Image -->
      <img 
        src="@/assets/profile.png" 
        class="absolute z-20 block top-[50px] w-[300px] h-auto"
        :style="{ left: `${imageLeft}px` }"
      />
    </div>

    <div class="relative w-full h-auto grid transition-none mx-auto" ref="gridContainer"
      :style="{ 
        gridTemplateColumns: 'var(--split-width) 1fr',
        maxWidth: '1024px',
        alignItems: 'start'
      }">
      
      <!-- Left Column -->
      <aside class="relative h-full z-10 bg-transparent">
        <div 
          class="mt-[460px] relative sticky top-0 self-start" 
          :style="{ paddingLeft: `${sidebarPadding}px` }"
        >
          <Sidebar ref="sidebarComponent" />
        </div>
      </aside>

      <!-- Right Column -->
      <section class="relative h-full flex flex-col items-start z-10">
        <div 
          class="bg-slate-300 dark:bg-slate-700 z-20"
        ></div>
        <Header :profile="cvStore.profile" />
        <Timeline ref="timelineComponent" :experiences="cvStore.experiences" />
      </section>
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
const root = ref<HTMLElement | null>(null)
const splitWidth = ref(44)
const imageLeft = ref(300)
const sidebarPadding = ref(150)
const gridContainer = ref<HTMLElement | null>(null)
const timelineComponent = ref<any>(null)
const sidebarComponent = ref<any>(null)
let trigger: any = null

onMounted(async () => {
  await nextTick();
  
  setTimeout(() => {
    if (!sidebarComponent.value) return

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
    // We now animate CSS variables on the root element for maximum smoothness
    tl.to(splitWidth, { 
      value: 33, 
      duration: 1, 
      ease: 'power2.inOut'
    }, 0);

    tl.to(imageLeft, { 
      value: 150, 
      duration: 1, 
      ease: 'power2.inOut' 
    }, 0);

    tl.to(gridContainer.value, { 
      maxWidth: 1200, 
      duration: 1, 
      ease: 'power2.inOut' 
    }, 0);

    tl.to(sidebarPadding, {
      value: 90,
      duration: 1,
      ease: 'power2.inOut'
    }, 0);

    tl.to(sidebarEl, { 
      width: '25%', 
      duration: 1, 
      ease: 'power2.inOut' 
    }, 0);

    // FINAL REFRESH: Recalculate all experience item positions 
    // now that the grid expansion is complete.
    tl.add(() => {
      if (timelineComponent.value?.initChildrenAnimations) {
        timelineComponent.value.initChildrenAnimations();
        ScrollTrigger.refresh();
      }
    });

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);
  }, 150);
})

onUnmounted(() => {
  if (trigger) trigger.kill()
})
</script>
