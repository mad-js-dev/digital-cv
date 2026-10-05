<template>
  <div 
    ref="itemRef"
    class="relative w-full pb-12 sm:pb-0"
    style="transform-style: preserve-3d;"
  >
    <!-- VERTICAL LINE SEGMENT -->
    <div 
      v-if="!isLast"
      class="absolute left-1/2 top-0 bottom-0 w-px bg-slate-400 dark:bg-slate-600 -translate-x-1/2 hidden sm:block"
    ></div>
    
    <!-- Mobile Vertical Line -->
    <div 
      v-if="!isLast"
      class="absolute left-1 sm:hidden top-2 bottom-0 w-0.5 bg-slate-400 dark:bg-slate-600"
    ></div>
    
    <!-- ANIMATED GROUP -->
    <div 
      ref="groupRef"
      class="relative w-full"
      style="transform-style: preserve-3d;"
    >
      <!-- TIMELINE AXIS GROUP -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
        <TimelineDot class="relative" />
        
        <div 
          :class="[
            'absolute top-2 h-px bg-[var(--color-accent)] w-[250px] hidden sm:block', 
            isRight ? 'left-2' : 'right-2'
          ]"
        ></div>
      </div>
      
      <!-- THE CONTENT WRAPPER -->
      <div 
        :class="[
          'relative z-10 flex flex-col gap-1 w-full pb-12',
          isRight 
            ? 'sm:w-[45%] sm:ml-auto sm:text-left sm:pl-8' 
            : 'sm:w-[45%] sm:mr-auto sm:text-right sm:pr-8',
          'pl-8 sm:pl-0'
        ]"
        :style="{ top: '-17px' }"
      >
        <div 
          :class="[
            'text-sm text-slate-500 dark:text-slate-400 font-medium mb-1',
            isRight ? 'sm:text-left' : 'sm:text-right'
          ]"
        >
          {{ period }}
        </div>
      
        <div :class="['flex flex-col gap-1', isRight ? 'sm:items-start' : 'sm:items-end']">
          <h3 class="font-bold text-lg text-[var(--color-text-primary)]">{{ company }}</h3>
        </div>
        
        <div class="text-[var(--color-text-primary)] font-semibold text-sm mb-2">{{ role }}</div>
        <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">{{ description }}</p>
        
        <div :class="['flex flex-wrap gap-2', isRight ? 'sm:justify-start' : 'sm:justify-end']">
          <SkillBadgeGroup :techStack="techStack" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TimelineDot from '../atoms/TimelineDot.vue'
import SkillBadgeGroup from '../molecules/SkillBadgeGroup.vue'

gsap.registerPlugin(ScrollTrigger)

const props = defineProps<{
  index: number;
  period: string;
  company: string;
  role: string;
  description: string;
  techStack: string[];
  isLast: boolean;
}>()

const isRight = computed(() => props.index % 2 === 0)
const itemRef = ref<HTMLElement | null>(null)
const groupRef = ref<HTMLElement | null>(null)
let trigger = null

onMounted(() => {
  if (!groupRef.value) return

  const rotationAngle = isRight.value ? 90 : -90;

  gsap.set(groupRef.value, { 
    opacity: 0, 
    rotateY: rotationAngle,
    transformOrigin: '50% 0%', 
    zIndex: 1
  })

  // FIX: Using a fixed pixel offset instead of percentages for 'start'
  // percentages can be unstable if the item height varies or content shifts.
  trigger = gsap.to(groupRef.value, {
    opacity: 1,
    rotateY: 0,
    duration: 1,
    scrollTrigger: {
      trigger: itemRef.value,
      start: 'top bottom-=10%', // Trigger when top is 10% above the bottom of viewport
      end: '+=300px',   // Fixed distance ensures consistent rotation speed for all items
      scrub: 0.5,
    },
  })
})

onUnmounted(() => {
  if (trigger) trigger.kill()
})
</script>