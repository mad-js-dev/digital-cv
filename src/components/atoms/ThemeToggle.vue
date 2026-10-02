<template>
  <button 
    @click="cvStore.toggleTheme()"
    class="fixed top-6 right-6 z-50 group focus:outline-none"
    title="Toggle Theme"
  >
    <!-- Toggle Track -->
    <div 
      class="w-14 h-8 rounded-full relative transition-colors duration-300 flex items-center px-1"
      :class="cvStore.theme === 'light' ? 'bg-slate-200' : 'bg-slate-700'"
    >
      <!-- Sliding Thumb -->
      <div 
        class="w-6 h-6 rounded-full absolute top-1 transition-all duration-300 ease-in-out flex items-center justify-center shadow-sm"
        :class="[
          cvStore.theme === 'light' ? 'left-1 bg-white' : 'left-7 bg-slate-300',
        ]"
        style="transition: left 0.3s ease-in-out"
      >
        <!-- Emoji instead of SVG -->
        <span class="text-xs leading-none">
          {{ cvStore.theme === 'light' ? '☀️' : '🌙' }}
        </span>
      </div>

      <!-- Background Labels -->
      <div class="flex justify-between w-full px-1 pointer-events-none">
        <span class="text-[8px] font-bold text-slate-400 uppercase ml-1">L</span>
        <span class="text-[8px] font-bold text-slate-400 uppercase mr-1">D</span>
      </div>
    </div>
  </button>
</template>

<script setup lang="ts">
import { useCvStore } from '../../stores/cv'
const cvStore = useCvStore()
</script>