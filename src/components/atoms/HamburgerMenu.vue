<template>
  <div>
    <!-- TRIGGER BUTTON -->
    <button 
      @click="isOpen = !isOpen"
      class="fixed top-6 right-6 z-[60] w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-md border border-slate-200 dark:border-slate-700 transition-all duration-300 hover:scale-105 active:scale-95"
      :title="isOpen ? 'Close Menu' : 'Open Menu'"
    >
      <svg 
        v-if="!isOpen" 
        xmlns="http://www.w3.org/2000/svg" 
        class="w-6 h-6" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
      <svg 
        v-else 
        xmlns="http://www.w3.org/2000/svg" 
        class="w-6 h-6" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <!-- FULLSCREEN OVERLAY -->
    <transition name="fade">
      <div 
        v-if="isOpen" 
        class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--color-bg-sidebar)] text-white transition-all duration-300"
      >
        <div class="flex flex-col items-center gap-16 w-full max-w-md px-6">
          <!-- Navigation Section -->
          <nav class="flex flex-col items-center gap-6 w-full">
            <router-link 
              to="/" 
              @click="isOpen = false"
              class="text-6xl font-bold hover:text-[var(--color-accent)] transition-colors duration-300"
            >
              Home
            </router-link>
            <router-link 
              to="/cv" 
              @click="isOpen = false"
              class="text-6xl font-bold hover:text-[var(--color-accent)] transition-colors duration-300"
            >
              CV
            </router-link>
          </nav>

          <!-- Divider -->
          <div class="w-full h-px bg-white/10"></div>

          <!-- Preferences Section -->
          <div class="flex flex-col items-center gap-8 w-full">
            <span class="text-xs uppercase tracking-[0.2em] text-white/40 font-semibold">Preferences</span>
            
            <div class="flex flex-col items-center gap-6 w-full">
              <!-- Language and Theme integrated here -->
              <ThemeControl />
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ThemeControl from './ThemeControl.vue'

const isOpen = ref(false)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  visibility: hidden;
}
</style>
