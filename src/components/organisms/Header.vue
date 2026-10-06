<template>
  <header class="max-w-[1024px] mx-auto py-16 pl-10 pr-4 text-center sm:text-left transition-colors duration-300">
    <h1 class="text-[5rem] leading-[5.1rem] tracking-[1px] font-extrabold text-[var(--color-text-primary)] mt-8 mb-2 max-w-[60%]">{{ profile.name }}</h1>
    <p class="text-[2rem] font-light text-[var(--color-accent)] mb-12">{{ profile.title[lang] }}</p>
    
    <div class="max-w-2xl">
      <h2 class="text-sm uppercase tracking-widest text-[var(--color-text-secondary)] font-bold mb-3">{{ t('profile.label') }}</h2>
      <p class="text-[var(--color-text-secondary)] leading-relaxed max-w-[560px]">
        {{ profile.summary[lang] }}
      </p>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { UserProfile } from '../../stores/cv'

const { locale, t } = useI18n()
const lang = computed(() => locale.value)

defineProps<{
  profile: UserProfile
}>()
</script>
