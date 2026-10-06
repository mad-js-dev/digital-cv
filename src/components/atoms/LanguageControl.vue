<template>
  <div class="flex items-center gap-3">
    <button 
      v-for="lang in languages" 
      :key="lang.code"
      @click="setLanguage(lang.code)"
      class="w-4 h-4 rounded-full overflow-hidden transition-all duration-200 flex items-center justify-center"
      :class="[
        locale === lang.code 
          ? 'ring-2 ring-offset-2 ring-[var(--color-accent)] scale-110' 
          : 'opacity-60 hover:opacity-100 grayscale hover:grayscale-0'
      ]"
      :title="lang.name"
    >
      <svg 
        viewBox="0 0 3 2" 
        class="w-full h-full object-cover"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <g v-if="lang.code === 'en'">
          <rect width="3" height="2" fill="#B22234" />
          <path d="M0 0.2h3M0 0.6h3M0 1h3M0 1.4h3M0 1.8h3" stroke="#fff" stroke-width="0.2" />
          <rect width="1.2" height="1" fill="#3C3B6E" />
        </g>
        <g v-if="lang.code === 'es'">
          <rect width="3" height="0.66" fill="#AA151B" />
          <rect y="0.66" width="3" height="0.67" fill="#F1BF00" />
          <rect y="1.33" width="3" height="0.67" fill="#AA151B" />
        </g>
        <g v-if="lang.code === 'ca'">
          <rect width="3" height="2" fill="#FCD116" />
          <path d="M0 0.3h3M0 0.9h3M0 1.5h3M0 2.1h3" stroke="#D52B1E" stroke-width="0.3" />
        </g>
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
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'ca', name: 'Català' },
]

const setLanguage = (code: string) => {
  locale.value = code
  localStorage.setItem('lang', code)
}
</script>
