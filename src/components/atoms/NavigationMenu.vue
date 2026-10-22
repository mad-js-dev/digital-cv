<template>
  <div class="fixed bottom-6 right-16 z-50 flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-medium transition-all duration-300 hover:bg-white/20">
    <router-link 
      to="/" 
      class="px-3 py-1 rounded-full transition-all duration-200"
      :class="currentRoute === 'home' ? 'bg-[var(--color-accent)] text-white' : 'hover:bg-white/10'"
    >
      Home
    </router-link>
    <router-link 
      to="/cv" 
      class="px-3 py-1 rounded-full transition-all duration-200"
      :class="currentRoute === 'cv' ? 'bg-[var(--color-accent)] text-white' : 'hover:bg-white/10'"
    >
      CV
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const currentRoute = computed(() => route.name === 'home' ? 'home' : 'cv')
</script>
