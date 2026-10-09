<template>
  <div class="h-screen w-full overflow-hidden flex flex-col p-8 relative">
    <!-- HEADER: Only visible when no item is expanded -->
    <header ref="headerRef" class="mb-12 text-center shrink-0 transition-all duration-500">
      <h1 class="text-5xl font-bold text-[var(--color-text-primary)] mb-4">Portfolio</h1>
      <p class="text-[var(--color-text-secondary)] text-lg max-w-2xl mx-auto">
        A curated collection of interactive experiments and technical demonstrations.
      </p>
    </header>

    <!-- GRID AREA -->
    <div class="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 min-h-0 relative max-w-7xl mx-auto w-full">
      
      <!-- Skill Piece 1: Large Focus -->
      <div 
        ref="itemAnimation"
        @click="handleExpand('animation')"
        :class="[
          'group relative transition-all duration-700 ease-in-out cursor-pointer rounded-3xl overflow-hidden border border-white/10 bg-slate-100 dark:bg-slate-800 hover:shadow-2xl hover:shadow-[var(--color-accent)]/20',
          activeItem === 'animation' ? 'fixed z-50 rounded-none' : 'md:col-span-2 md:row-span-2'
        ]"
        v-show="!activeItem || activeItem === 'animation'"
      >
        <!-- BACK BUTTON (Inside Box) -->
        <button 
          v-if="activeItem === 'animation'" 
          @click.stop="handleCollapse"
          class="absolute top-8 left-8 z-[100] p-3 rounded-full bg-white text-slate-900 shadow-xl border border-slate-200 hover:bg-slate-100 transition-all duration-300 group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>

        <div class="absolute inset-0 p-8 flex flex-col justify-end z-10 pointer-events-none" :class="activeItem === 'animation' ? 'justify-center items-center text-center' : ''">
          <div :class="['transition-opacity duration-300', activeItem === 'animation' ? 'opacity-0' : 'opacity-100']">
            <span class="text-xs uppercase tracking-widest text-[var(--color-accent)] font-bold mb-2">GSAP & Web Animation</span>
          </div>
          <h3 class="text-3xl font-bold text-[var(--color-text-primary)] mb-2 transition-all duration-500" :class="activeItem === 'animation' ? 'text-6xl' : ''">Complex Timeline Orchestration</h3>
          <p v-if="activeItem === 'animation'" class="text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto opacity-0 expanded-text transition-opacity duration-500 delay-300">
            Advanced scrub-based animations with synchronized multi-element timelines.
          </p>
        </div>
        <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-900">
          <div class="w-24 h-24 rounded-full bg-[var(--color-accent)] animate-bounce shadow-lg"></div>
        </div>
      </div>

      <!-- Skill Piece 2: Small -->
      <div 
        ref="itemUx"
        @click="handleExpand('ux')"
        :class="[
          'group relative transition-all duration-700 ease-in-out cursor-pointer rounded-3xl overflow-hidden border border-white/10 bg-slate-100 dark:bg-slate-800 hover:shadow-xl hover:shadow-[var(--color-accent)]/20',
          activeItem === 'ux' ? 'fixed z-50 rounded-none' : ''
        ]"
        v-show="!activeItem || activeItem === 'ux'"
      >
        <!-- BACK BUTTON (Inside Box) -->
        <button 
          v-if="activeItem === 'ux'" 
          @click.stop="handleCollapse"
          class="absolute top-8 left-8 z-[100] p-3 rounded-full bg-white text-slate-900 shadow-xl border border-slate-200 hover:bg-slate-100 transition-all duration-300 group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>

        <div class="absolute inset-0 p-6 flex flex-col justify-between z-10 pointer-events-none" :class="activeItem === 'ux' ? 'justify-center items-center text-center' : ''">
          <div :class="['transition-opacity duration-300', activeItem === 'ux' ? 'opacity-0' : 'opacity-100']">
            <span class="text-[10px] uppercase tracking-widest text-[var(--color-accent)] font-bold">UI/UX</span>
          </div>
          <h3 class="text-xl font-bold text-[var(--color-text-primary)] transition-all duration-500" :class="activeItem === 'ux' ? 'text-6xl' : ''">Micro-interactions</h3>
        </div>
        <div class="w-full h-full flex items-center justify-center bg-slate-200 dark:bg-slate-700">
          <div class="w-12 h-12 rounded-lg bg-white dark:bg-slate-600 rotate-45 group-hover:rotate-90 transition-transform duration-500"></div>
        </div>
      </div>

      <!-- Skill Piece 3: Small -->
      <div 
        ref="itemArchitecture"
        @click="handleExpand('architecture')"
        :class="[
          'group relative transition-all duration-700 ease-in-out cursor-pointer rounded-3xl overflow-hidden border border-white/10 bg-slate-100 dark:bg-slate-800 hover:shadow-xl hover:shadow-[var(--color-accent)]/20',
          activeItem === 'architecture' ? 'fixed z-50 rounded-none' : ''
        ]"
        v-show="!activeItem || activeItem === 'architecture'"
      >
        <!-- BACK BUTTON (Inside Box) -->
        <button 
          v-if="activeItem === 'architecture'" 
          @click.stop="handleCollapse"
          class="absolute top-8 left-8 z-[100] p-3 rounded-full bg-white text-slate-900 shadow-xl border border-slate-200 hover:bg-slate-100 transition-all duration-300 group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>

        <div class="absolute inset-0 p-6 flex flex-col justify-between z-10 pointer-events-none" :class="activeItem === 'architecture' ? 'justify-center items-center text-center' : ''">
          <div :class="['transition-opacity duration-300', activeItem === 'architecture' ? 'opacity-0' : 'opacity-100']">
            <span class="text-[10px] uppercase tracking-widest text-[var(--color-accent)] font-bold">Architecture</span>
          </div>
          <h3 class="text-xl font-bold text-[var(--color-text-primary)] transition-all duration-500" :class="activeItem === 'architecture' ? 'text-6xl' : ''">Atomic Design</h3>
        </div>
        <div class="w-full h-full flex items-center justify-center bg-slate-200 dark:bg-slate-700">
          <div class="grid grid-cols-2 gap-1">
            <div class="w-4 h-4 bg-[var(--color-accent)] rounded-sm"></div>
            <div class="w-4 h-4 bg-slate-400 rounded-sm"></div>
            <div class="w-4 h-4 bg-slate-400 rounded-sm"></div>
            <div class="w-4 h-4 bg-slate-400 rounded-sm"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import gsap from 'gsap'

const activeItem = ref<string | null>(null)
const headerRef = ref<HTMLElement | null>(null)

const itemAnimation = ref<HTMLElement | null>(null)
const itemUx = ref<HTMLElement | null>(null)
const itemArchitecture = ref<HTMLElement | null>(null)

// Store starting positions to enable perfect reverse animation
const startingPositions = new Map<string, { top: number, left: number, width: number, height: number }>()

const handleExpand = async (id: string) => {
  const element = id === 'animation' ? itemAnimation.value : id === 'ux' ? itemUx.value : itemArchitecture.value
  if (!element) return

  const rect = element.getBoundingClientRect()
  
  // Save original position for the reverse animation
  startingPositions.set(id, {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height
  })

  activeItem.value = id

  gsap.to(headerRef.value, { 
    opacity: 0, 
    y: -20, 
    duration: 0.3, 
    onComplete: () => {
      if (headerRef.value) headerRef.value.style.display = 'none'
    }
  })

  const centerX = window.innerWidth / 2
  const targetLeft = centerX - 600

  gsap.fromTo(element, 
    { 
      position: 'fixed',
      top: rect.top, 
      left: rect.left, 
      width: rect.width, 
      height: rect.height 
    }, 
    { 
      top: 0, 
      left: targetLeft, 
      width: 1200, 
      height: '100vh', 
      duration: 0.7, 
      ease: 'expo.out' 
    }
  )
}

const handleCollapse = async () => {
  const id = activeItem.value
  if (!id) return
  
  const element = id === 'animation' ? itemAnimation.value : id === 'ux' ? itemUx.value : itemArchitecture.value
  if (!element) return

  const start = startingPositions.get(id)
  if (!start) return

  // 1. Animate back to EXACT grid coordinates
  gsap.to(element, {
    top: start.top, 
    left: start.left, 
    width: start.width, 
    height: start.height, 
    duration: 0.6, 
    ease: 'expo.in',
    onComplete: () => {
      // 2. Once back in position, release fixed positioning and reset active state
      activeItem.value = null
      
      // Clear inline styles to return control to CSS Grid
      element.style.position = ''
      element.style.top = ''
      element.style.left = ''
      element.style.width = ''
      element.style.height = ''
      
      // Force reflow
      void element.offsetHeight
    }
  })

  if (headerRef.value) {
    headerRef.value.style.display = 'block'
  }
  gsap.to(headerRef.value, { opacity: 1, y: 0, duration: 0.4 })
}
</script>
