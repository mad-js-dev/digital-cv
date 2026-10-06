<template>
  <div 
    class="fixed top-6 right-6 z-50 flex items-center gap-3 p-2 rounded-full shadow-lg border transition-all duration-300"
    :class="cvStore.theme === 'light' ? 'bg-white border-slate-200 text-slate-800' : 'bg-slate-800 border-slate-700 text-slate-200'"
  >
    <!-- Language Switcher -->
    <LanguageControl />

    <!-- Divider -->
    <div class="w-px h-6 bg-slate-300 dark:bg-slate-600"></div>

    <!-- Custom Palette Selector -->
    <div class="relative">
      <button 
        @click="isOpen = !isOpen"
        class="flex items-center gap-2 pl-3 pr-2 py-1 text-xs font-bold uppercase tracking-wider cursor-pointer focus:outline-none"
      >
        {{ cvStore.themeName }}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke-width="3" 
          stroke="currentColor" 
          class="w-3 h-3 transition-transform duration-300"
          :class="{ 'rotate-180': isOpen }"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      <!-- Dropdown Menu -->
      <div 
        v-if="isOpen"
        class="absolute right-0 mt-2 w-32 rounded-xl shadow-xl border py-1 z-50 transition-all animate-in fade-in slide-in-from-top-2"
        :class="cvStore.theme === 'light' ? 'bg-white border-slate-200' : 'bg-slate-800 border-slate-700'"
      >
        <div 
          v-for="name in Object.keys(PALETTES)" 
          :key="name"
          @click="selectPalette(name)"
          class="px-4 py-2 text-xs uppercase font-medium cursor-pointer transition-colors"
          :class="[
            cvStore.theme === 'light' 
              ? (cvStore.themeName === name ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50') 
              : (cvStore.themeName === name ? 'bg-slate-700 text-white' : 'text-slate-400 hover:bg-slate-700 hover:text-white')
          ]"
        >
          {{ name }}
        </div>
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
import { ref } from 'vue'
import { useCvStore, PALETTES } from '../../stores/cv'
import LanguageControl from './LanguageControl.vue'

const cvStore = useCvStore()
const isOpen = ref(false)

const selectPalette = (name: string) => {
  cvStore.setThemeName(name)
  isOpen.value = false
}
</script>

<style scoped>
.animate-in {
  animation: fadeIn 0.2s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>