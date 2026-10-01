<template>
  <aside 
    class="hidden lg:flex flex-col justify-start w-1/3 bg-[#2c3e50] text-white"
  >
    <!-- Grey Box Container -->
    <div class="relative h-[75vh]">
      <!-- Masking Wrapper: Handles the diagonal cut and the bleed -->
      <div 
        class="absolute inset-y-0 right-0 w-[1024px]" 
        style="clip-path: polygon(0 0, 100% 0, 100% 100%, 0 70%);"
      >
        <!-- Gradient Background -->
        <div 
          class="absolute inset-0 bg-slate-100 bg-gradient-to-t from-slate-400 via-slate-200 to-slate-100"
        ></div>
        
        <!-- Image Container: Aligned to the sidebar's width to center the image correctly -->
        <div class="absolute inset-y-0 right-0 w-full lg:w-1/3">
          <img 
            src="@/assets/profile.png" 
            alt="Profile Picture" 
            class="absolute bottom-0 left-1/2 -translate-x-1/2 h-auto max-h-full w-auto object-contain"
          />
        </div>
      </div>
    </div>

    <!-- The Content Layer -->
    <div class="relative w-full px-8 flex justify-start sticky top-0 h-screen">
      <div class="flex flex-col gap-9 w-full py-6">
        <div v-for="section in sections" :key="section.title" class="flex flex-col gap-3">
          <h3 class="text-xs uppercase tracking-widest text-slate-400 font-bold">{{ section.title }}</h3>
          <div class="flex flex-col gap-2">
            <div v-for="item in section.items" :key="item.label" class="flex flex-col">
              <span class="text-[10px] uppercase text-slate-300 font-semibold">{{ item.label }}</span>
              <span class="text-sm text-white font-medium leading-tight">{{ item.value }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCvStore } from '../../stores/cv'

const store = useCvStore()
const sections = computed(() => store.sidebar)
</script>
