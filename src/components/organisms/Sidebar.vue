<template>
  <aside 
    ref="asideRef"
    class="hidden lg:flex flex-col justify-start w-full max-w-[33.33%] bg-[var(--color-bg-sidebar)] text-white transition-colors duration-300"
  >
    <!-- Profile Section (Scrolls away) -->
    <div class="relative h-[75vh] shrink-0">
      <!-- Masking Wrapper: Handles the diagonal cut and the bleed -->
      <div 
        class="absolute inset-y-0 right-0 w-[1024px]" 
        style="clip-path: polygon(0 0, 100% 0, 100% 100%, 0 70%);"
      >
        <!-- Gradient Background -->
        <div 
          class="absolute inset-0 bg-slate-100 dark:bg-slate-800 bg-gradient-to-t from-slate-400 via-slate-200 to-slate-100 dark:from-slate-700 dark:via-slate-800 dark:to-slate-900"
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
    
    <!-- THE STICKY CONTENT LAYER -->
    <div class="sticky top-0 self-start w-full px-8">
      <div class="flex flex-col gap-9 w-full py-6">
        <div v-for="section in sections" :key="section.title" class="flex flex-col gap-3">
          <div class="flex items-center gap-3">
            <svg 
              :key="section.icon"
              class="w-5 h-5 text-[var(--color-accent)]" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke-width="2.5" 
              stroke="currentColor"
            >
              <path v-if="section.icon === 'mail'" stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 0-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              <path v-if="section.icon === 'cpu'" stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M6.75 8.25h15M6.75 11.25h15M6.75 14.25h15M6.75 17.25h15m-15 3.75h15m-15-11.25V18m0-12V5.25m0 12v.75m0-13.5v.75" />
              <path v-if="section.icon === 'graduation'" stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147L12 15l7.74-4.853M12 15V3m0 12l-3-3m3 3l3-3" />
            </svg>
            <h3 class="text-base uppercase tracking-widest text-[var(--color-accent)] font-bold">{{ t(section.title) }}</h3>
          </div>
          <div class="flex flex-col gap-2">
            <div v-for="item in section.items" :key="item.label" class="flex flex-col">
              <span class="text-[10px] uppercase text-slate-400 dark:text-slate-500 font-semibold">{{ t(item.label) }}</span>
              <span class="text-sm text-white font-medium leading-tight">{{ item.value }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCvStore } from '../../stores/cv'

const { t } = useI18n()
const store = useCvStore()
const sections = computed(() => store.sidebar)
const asideRef = ref<HTMLElement | null>(null)

defineExpose({
  asideRef
})
</script>
