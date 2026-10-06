<template>
  <div class="flex items-center gap-1">
    <button 
      v-for="lang in languages" 
      :key="lang.code"
      @click="setLanguage(lang.code)"
      class="w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all duration-200 overflow-hidden"
      :class="[
        currentLocale === lang.code 
          ? 'ring-2 ring-offset-2 ring-[var(--color-accent)] scale-110' 
          : 'opacity-50 hover:opacity-100 grayscale hover:grayscale-0'
      ]"
      :title="lang.name"
    >
      <span v-if="lang.flag" class="cursor-pointer">{{ lang.flag }}</span>
      <svg v-else-if="lang.svg" :viewBox="lang.svg.viewBox" class="w-full h-full object-cover cursor-pointer">
        <path :d="lang.svg.path" :fill="lang.svg.fill" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const currentLocale = computed(() => locale.value)

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { 
    code: 'ca', 
    name: 'Català', 
    svg: { 
      viewBox: '0 0 640 300', 
      path: 'M0 0h640v300H0z M0 60h640v30H0z M0 120h640v30H0z M0 180h640v30H0z M0 240h640v30H0z', 
      fill: '#ffcc00' 
    } 
  },
]

const setLanguage = (code: string) => {
  locale.value = code
  localStorage.setItem('lang', code)
}
</script>
