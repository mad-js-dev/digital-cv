<template>
  <div class="h-screen w-full overflow-hidden flex flex-col p-8 relative">
    <!-- HEADER: Only visible when no item is expanded -->
    <header ref="headerRef" class="mb-12 text-center transition-all duration-500" :class="activeItem ? 'opacity-0 pointer-events-none -translate-y-8' : 'opacity-100 translate-y-0'">
      <h1 class="text-4xl font-bold tracking-tight text-white mb-4">Portfolio</h1>
      <p class="text-slate-400 max-w-2xl mx-auto">A collection of experimental engineering and design systems.</p>
    </header>

    <!-- MAIN GRID AREA -->
    <div 
      class="relative w-full max-w-7xl mx-auto flex-1 transition-all duration-500"
      :class="activeItem ? 'opacity-0 pointer-events-none scale-95' : 'opacity-100 scale-100'"
    >
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
        <!-- Project 1: Material Design -->
        <div 
          @click="handleExpand('material', $event)"
          class="group relative overflow-hidden rounded-3xl bg-slate-900/50 border border-white/10 hover:border-white/20 transition-all duration-500 cursor-pointer col-span-2 row-span-2"
        >
          <div class="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div class="relative p-8 h-full flex flex-col justify-between">
            <div>
              <span class="text-xs font-mono text-blue-400 uppercase tracking-widest mb-2 block">Design System</span>
              <h2 class="text-3xl font-bold text-white mb-4">Material Design 3</h2>
              <p class="text-slate-400 max-w-md">A deep dive into the M3 shape system, tokenization, and organic morphing logic.</p>
            </div>
            <div class="flex gap-4">
              <Shape shape="square" :size="40" color="slate" />
              <Shape shape="rounded" :size="40" color="accent" />
              <Shape shape="pill" :size="40" color="slate" />
              <Shape shape="blob" :size="40" color="accent" />
            </div>
          </div>
        </div>

        <!-- Other projects placeholders -->
        <div @click="handleExpand('uiux', $event)" class="group relative overflow-hidden rounded-3xl bg-slate-900/50 border border-white/10 hover:border-white/20 transition-all duration-500 cursor-pointer">
          <div class="p-8 h-full">
            <span class="text-xs font-mono text-purple-400 uppercase tracking-widest mb-2 block">UI/UX</span>
            <h2 class="text-2xl font-bold text-white">Inclusive Design</h2>
            <p class="text-slate-400 mt-2">Accessibility-first interaction patterns.</p>
          </div>
        </div>

        <div @click="handleExpand('arch', $event)" class="group relative overflow-hidden rounded-3xl bg-slate-900/50 border border-white/10 hover:border-white/20 transition-all duration-500 cursor-pointer">
          <div class="p-8 h-full">
            <span class="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-2 block">Architecture</span>
            <h2 class="text-2xl font-bold text-white">Scalable Systems</h2>
            <p class="text-slate-400 mt-2">Enterprise-grade Vue foundations.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- EXPANDED VIEW: The \"Project Site\" -->
    <div 
      v-if="activeItem" 
      class="absolute inset-0 z-50 pointer-events-auto"
      :style="expandedStyle"
    >
      <div class="relative w-full h-full bg-slate-950 rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
        <!-- Back Button -->
        <button 
          @click="handleCollapse"
          class="absolute top-8 left-8 z-[100] px-4 py-2 rounded-full bg-white text-slate-900 font-bold text-sm hover:bg-slate-200 transition-colors shadow-xl flex items-center gap-2"
        >
          <span>← Back to Portfolio</span>
        </button>

        <!-- PROJECT CONTENT: Material Design -->
        <template v-if="activeItem === 'material'">
          <PortfolioItemContent 
            tag="Material Design" 
            title="Systematic Visual Language" 
            description="Implementation of a comprehensive design system with depth, elevation, and adaptive layouts."
            :is-expanded="true"
          >
            <template #default="{ currentPage, setPage }">
              <!-- Page 1: Shapes Intro -->
              <div v-if="currentPage === 1" class="h-full w-full p-12 flex flex-col items-center">
                <header class="mb-12 text-center">
                  <h2 class="text-5xl font-bold text-white mb-4">Shapes</h2>
                  <p class="text-slate-400 text-lg max-w-2xl mx-auto">
                    The M3 shape system includes original shapes, a corner radius scale, and built-in shape morphing.
                  </p>
                </header>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
                  <div class="p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col items-center text-center">
                    <Shape shape="blob" :size="80" color="accent" class="mb-6" />
                    <h3 class="text-xl font-bold text-white mb-2">Original Shapes</h3>
                    <p class="text-slate-400 text-sm">The foundation of every component, from rectangles to organic blobs.</p>
                  </div>
                  <div class="p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col items-center text-center">
                    <div class="flex items-end gap-2 mb-6">
                      <Shape shape="square" :radius="4" :size="30" color="slate" />
                      <Shape shape="square" :radius="12" :size="40" color="slate" />
                      <Shape shape="square" :radius="24" :size="50" color="accent" />
                    </div>
                    <h3 class="text-xl font-bold text-white mb-2">Radius Scale</h3>
                    <p class="text-slate-400 text-sm">A consistent scale from 4px to fully rounded for clear visual hierarchy.</p>
                  </div>
                  <div class="p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col items-center text-center">
                    <Shape shape="pill" :size="80" color="accent" class="mb-6" />
                    <h3 class="text-xl font-bold text-white mb-2">Shape Morphing</h3>
                    <p class="text-slate-400 text-sm">Fluid transitions between shapes to guide user focus during interactions.</p>
                  </div>
                </div>

                <button 
                  @click="setPage(2)" 
                  class="mt-12 px-8 py-3 rounded-full bg-accent text-white font-bold hover:scale-105 transition-all shadow-lg shadow-accent/20"
                >
                  Explore Shape Library →
                </button>
              </div>

              <!-- Page 2: Shape Library Matrix -->
              <div v-if="currentPage === 2" class="h-full w-full p-4 md:p-8 overflow-y-auto">
                <header class="mb-12 text-center">
                  <h2 class="text-5xl font-bold text-white mb-4">Shape Library</h2>
                  <p class="text-slate-400 text-lg max-w-2xl mx-auto">
                    Mapping the 36 core shape tokens of the Material 3 design system.
                  </p>
                </header>

                <div class="grid grid-cols-2 sm:grid-cols-5 gap-4 w-full max-w-7xl mx-auto">
                  <div 
                    v-for="shapeName in shapeTokens" 
                    :key="shapeName"
                    class="group p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex flex-col items-center gap-3"
                  >
                    <Shape 
                      :shape="shapeName" 
                      color="slate"
                      class="group-hover:text-accent transition-colors"
                    />
                    <span class="text-[10px] font-mono text-slate-500 group-hover:text-slate-300 uppercase">{{ shapeName }}</span>
                  </div>
                </div>

                <div class="mt-12 flex justify-center">
                  <button
                    @click="router.push('/scale')"
                    class="px-8 py-3 rounded-full bg-white text-slate-900 font-bold hover:bg-slate-200 transition-all"
                  >
                    Corner Radius Overview →
                  </button>
                </div>

                <div class="mt-16 p-8 rounded-3xl bg-accent/10 border border-accent/20 max-w-3xl mx-auto text-center">
                  <h3 class="text-2xl font-bold text-white mb-4">The Morphing Logic</h3>
                  <p class="text-slate-400 mb-8">
                    We use a consistent SVG path coordinate system to enable seamless transitions between any two tokens in the library.
                  </p>
                  <div class="flex justify-center items-center gap-12">
                    <Shape shape="square" :size="60" color="slate" />
                    <span class="text-3xl text-slate-600">→</span>
                    <Shape shape="pill" :size="60" color="accent" />
                  </div>
                </div>
                
              </div>

              <!-- Page 3: Summary -->
              <div v-if="currentPage === 3" class="h-full w-full p-12 flex flex-col items-center justify-center text-center">
                <Shape shape="blob" :size="120" color="accent" class="mb-8 animate-pulse" />
                <h2 class="text-4xl font-bold text-white mb-4">System Complete</h2>
                <p class="text-slate-400 max-w-lg mx-auto mb-8">
                  The shape system provides the visual grammar for the entire product, ensuring consistency across every pixel.
                </p>
                <button @click="handleCollapse" class="px-8 py-3 rounded-full bg-white text-slate-900 font-bold hover:bg-slate-200 transition-all">
                  Return to Portfolio
                </button>
              </div>
            </template>
          </PortfolioItemContent>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import gsap from 'gsap'
import PortfolioItemContent from '@/components/atoms/PortfolioItemContent.vue'
import Shape from '@/components/atoms/M3Shape/Shape.vue'

const router = useRouter()

const activeItem = ref<string | null>(null)

const shapeTokens = [
  'circle', 'square', 'slanted', 'arch', 'semicircle', 'oval', 'pill', 'triangle', 'arrow', 
  'fan', 'diamond', 'clamshell', 'pentagon', 'gem', 'very-sunny', 'sunny', '4-sided-cookie', 
  '6-sided-cookie', '7-sided-cookie', '9-sided-cookie', '12-sided-cookie', '4-leaf-clover-8-leaf-clover', 
  'burst', 'soft-burst', 'boom', 'soft-boom', 'flower', 'puffy', 'puffy-diamond', 
  'ghost-ish', 'pixel-circle', 'pixel-triangle', 'bun', 'heart'
]

const expandedStyle = reactive({
  left: '0px',
  top: '0px',
  width: '0px',
  height: '0px',
  opacity: 0,
  zIndex: 50
})

const handleExpand = (id: string, event: MouseEvent) => {
  const element = event.currentTarget as HTMLElement
  const rect = element.getBoundingClientRect()
  
  const targetHeight = Math.min(700, window.innerHeight * 0.8);
  const targetWidth = Math.min(1200, window.innerWidth * 0.9);
  
  activeItem.value = id
  
  expandedStyle.left = `${rect.left}px`
  expandedStyle.top = `${rect.top}px`
  expandedStyle.width = `${rect.width}px`
  expandedStyle.height = `${rect.height}px`
  expandedStyle.opacity = 1
  
  gsap.to(expandedStyle, {
    left: (window.innerWidth - targetWidth) / 2 + 'px',
    top: (window.innerHeight - targetHeight) / 2 + 'px',
    width: targetWidth + 'px',
    height: targetHeight + 'px',
    duration: 0.6,
    ease: 'expo.out'
  })
}

const handleCollapse = () => {
  activeItem.value = null
}
</script>
