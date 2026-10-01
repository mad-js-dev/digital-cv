<template>
  <div class="relative flex justify-center min-h-screen">
    <!-- Background Bleed: Fills the left half of the screen with the sidebar color -->
    <div class="fixed top-0 left-0 h-full w-1/2 bg-[#2c3e50] z-0"></div>

    <!-- Centered Content Container -->
    <div class="flex w-full max-w-[1024px] mx-auto bg-white relative z-10">
      <!-- Sidebar: Now integrates perfectly with the background bleed -->
      <Sidebar />

      <!-- Main Content Area -->
      <main class="flex-1 flex flex-col items-center justify-start">
        <Header :profile="cvStore.profile" />
        <Timeline :experiences="cvStore.experiences" />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCvStore } from './stores/cv'
import Header from './components/organisms/Header.vue'
import Timeline from './components/organisms/Timeline.vue'
import Sidebar from './components/organisms/Sidebar.vue'

const cvStore = useCvStore()
</script>
