<template>
  <div 
    class="absolute inset-0 p-8 flex flex-col justify-end z-10" 
    :class="[
      isExpanded ? 'justify-center items-center text-center pointer-events-auto' : 'pointer-events-none'
    ]"
  >
    <!-- Page Container: Fills width and height when expanded -->
    <div 
      v-if="isExpanded" 
      class="w-full h-full overflow-y-auto overflow-x-hidden relative transition-all duration-500 flex flex-col"
    >
      <!-- PAGE 0: Overview (Common to all items) -->
      <div v-if="currentPage === 0" class="h-full w-full flex flex-col justify-center items-center p-12 text-center">
        <div class="transition-opacity duration-300 opacity-100">
          <span class="text-xs uppercase tracking-widest text-[var(--color-accent)] font-bold mb-2">
            {{ tag }}
          </span>
        </div>
        <h3 class="text-6xl font-bold text-[var(--color-text-primary)] mb-6 transition-all duration-500">
          {{ title }}
        </h3>
        <p class="text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto transition-opacity duration-500">
          {{ description }}
        </p>
        
        <button 
          @click="currentPage++" 
          class="mt-12 px-6 py-3 rounded-full bg-[var(--color-accent)] text-white font-medium hover:scale-105 transition-transform duration-300"
        >
          Explore Principles $\rightarrow$
        </button>
      </div>

      <!-- EXTENDED CONTENT: Slots for specific project pages -->
      <div v-if="currentPage > 0" class="h-full w-full overflow-y-auto p-12 relative">
        <slot :current-page="currentPage" :set-page="setPage"></slot>
        
        <div class="mt-12 text-center">
          <button 
            @click="currentPage = 0" 
            class="px-6 py-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-300"
          >
            $\leftarrow$ Back to Overview
          </button>
        </div>
      </div>
    </div>

    <!-- Grid-Mode Content (Visible only when NOT expanded) -->
    <div v-if="!isExpanded" class="flex flex-col justify-end w-full h-full p-8 pointer-events-none">
      <div class="transition-opacity duration-300 opacity-100">
        <span class="text-xs uppercase tracking-widest text-[var(--color-accent)] font-bold mb-2">
          {{ tag }}
        </span>
      </div>
      <h3 class="text-3xl font-bold text-[var(--color-text-primary)] mb-2 transition-all duration-500">
        {{ title }}
      </h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  tag: string;
  title: string;
  description: string;
  isExpanded: boolean;
}>();

const currentPage = ref(0)

const setPage = (page: number) => {
  currentPage.value = page
}

defineExpose({
  currentPage,
  setPage
})
</script>
