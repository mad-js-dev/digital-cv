<template>
  <section 
    ref="experienceSection"
    class="max-w-[1024px] mx-auto py-12 pl-10 pr-4 pb-64 transition-colors duration-300" 
    style="perspective: 1200px;"
  >
    <div class="mb-12 text-center sm:text-left">
      <h2 class="work-experience-title text-3xl font-bold text-[var(--color-text-primary)] mb-4">Work Experience</h2>
      <div class="h-1 w-20 bg-[var(--color-accent)] mx-auto sm:mx-0 rounded-full"></div>
    </div>
    
    <div class="relative">
      <ExperienceItem 
        v-for="(exp, index) in experiences" 
        :key="exp.id" 
        ref="experienceItems"
        v-bind="exp" 
        :index="index"
        :is-last="index === experiences.length - 1"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ExperienceItem from '../molecules/ExperienceItem.vue'
import type { Experience } from '../../stores/cv'

const experienceSection = ref<HTMLElement | null>(null)
const experienceItems = ref<any[]>([])

// Method called by parent CVView.vue to initialize children animations
const initChildrenAnimations = () => {
  experienceItems.value.forEach(item => {
    if (item?.setupAnimation) {
      item.setupAnimation();
    }
  });
}

defineExpose({ 
  experienceSection, 
  initChildrenAnimations 
})

defineProps<{
  experiences: Experience[]
}>()
</script>
