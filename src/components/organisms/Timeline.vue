<template>
  <section class="max-w-[1024px] mx-auto py-12 pl-10 pr-4 pb-32 transition-colors duration-300" style="perspective: 1200px;">
    <div class="mb-12 text-center sm:text-left">
      <h2 class="work-experience-title text-3xl font-bold text-[var(--color-text-primary)] mb-4">Work Experience</h2>
      <div class="h-1 w-20 bg-[var(--color-accent)] mx-auto sm:mx-0 rounded-full"></div>
    </div>
    
    <div class="relative">
      <!-- Central Vertical Line -->
      <div class="absolute left-1/2 top-0 bottom-0 w-px bg-slate-400 dark:bg-slate-600 -translate-x-1/2 hidden sm:block"></div>
      
      <ExperienceItem 
        v-for="(exp, index) in experiences" 
        :key="exp.id" 
        v-bind="exp" 
        :index="index"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import ExperienceItem from '../molecules/ExperienceItem.vue'
import type { Experience } from '../../stores/cv'

defineProps<{
  experiences: Experience[]
}>()
</script>