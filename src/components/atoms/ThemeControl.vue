<template>
  <div 
    class="fixed top-6 right-6 z-50 flex items-center gap-3 p-2 rounded-full shadow-lg border transition-all duration-300"
    :class="cvStore.theme === 'light' ? 'bg-white border-slate-200 text-slate-800' : 'bg-slate-800 border-slate-700 text-slate-200'"
  >
    <!-- Palette Selector -->
    <div class="relative group">
      <select 
        v-model="cvStore.themeName" 
        @change="cvStore.setThemeName(cvStore.themeName)"
        class="appearance-none bg-transparent pl-3 pr-8 py-1 text-xs font-bold uppercase tracking-wider cursor-pointer focus:outline-none"
      >
        <option value="midnight">Midnight</option>
        <option value="forest">Forest</option>
        <option value="sunset">Sunset</option>
        <option value="monochrome">Monochrome</option>
      </select>
      <!-- Custom Arrow -->
      <div class="absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-3 h-3">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </div>

    <!-- Divider -->
    <div class="w-px h-6 bg-slate-300 dark:bg-slate-600"></div>

    <!-- Theme Toggle (Light/Dark) -->
    <div 
      @click="cvStore.toggleTheme()"
      class="w-12 h-6 rounded-full relative cursor-pointer transition-colors duration-300 flex items-center px-1"
      :class="cvStore.theme === 'light' ? 'bg-slate-200' : 'bg-slate-700'"
    >
      <!-- Sliding Thumb -->
      <div 
        class="w-4 h-4 rounded-full absolute top-1 transition-all duration-300 ease-in-out flex items-center justify-center shadow-sm"
        :class="[
          cvStore.theme === 'light' ? 'left-1 bg-white' : 'left-6 bg-slate-300',
        ]"
        style="transition: left 0.3s ease-in-out"
      >
        <span class="text-[10px] leading-none">
          {{ cvStore.theme === 'light' ? '☀️' : '🌙' }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCvStore } from '../../stores/cv'
const cvStore = useCvStore()
</script>

<style scoped>
select {
  background-image: none !important;
}
</style>