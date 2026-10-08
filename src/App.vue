<template>
  <div class="relative flex justify-center min-h-screen bg-[var(--color-bg-page)] transition-colors duration-300" style="overflow-x: clip;">
    <DownloadButton />
    <HamburgerMenu />
    
    <!-- Background Bleed: Fills the left half of the screen with the sidebar color -->
    <div class="fixed top-0 left-0 h-full w-1/2 bg-[var(--color-bg-sidebar)] z-0 transition-colors duration-300"></div>
    
    <!-- STABLE OUTER FRAME -->
    <div class="w-full max-w-[1200px] mx-auto relative z-10">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import DownloadButton from './components/atoms/DownloadButton.vue'
import HamburgerMenu from './components/atoms/HamburgerMenu.vue'
</script>
