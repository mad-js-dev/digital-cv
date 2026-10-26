<template>
  <div 
    class="relative flex justify-center min-h-screen bg-[var(--color-bg-page)] transition-colors duration-300" style="overflow-x: clip;">
    <div class="fixed top-6 right-6 z-50 flex items-center gap-3">
      <DownloadButton v-if="$route.name === 'cv'" />
      <!-- <HamburgerMenu /> -->
      <ThemeControl />
    </div>
    
    <!-- Background Bleed: Only visible when the route is 'cv' -->
    <div 
      v-if="$route.name === 'cv'"
      class="fixed top-0 left-0 h-full w-1/2 z-0 transition-colors duration-300"
    ></div>
    
    <!-- STABLE OUTER FRAME -->
    <div class="w-full mx-auto relative z-10">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import DownloadButton from './components/atoms/DownloadButton.vue'
import ThemeControl from './components/atoms/ThemeControl.vue'
import { useTheme } from '@/composables/useTheme'

const { applyTheme } = useTheme()

onMounted(() => {
  // Initialize the M3 color system variables on mount
  applyTheme('light') 
})
</script>
