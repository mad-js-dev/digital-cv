<template>
  <header 
    class="max-w-[1024px] py-12 pl-10 pr-4 transition-colors duration-300"
    ref="headerRef"
  >
    <div class="mb-12 text-center sm:text-left">
      <h1 
        ref="nameRef"
        class="text-[5rem] leading-[5.1rem] tracking-[1px] font-extrabold text-[var(--color-text-primary)] mt-8 mb-2 max-w-[60%]"
      >{{ profile.name }}</h1>
      <p 
        ref="titleRef"
        class="text-[2rem] font-light text-[var(--color-accent)] mb-12"
      >{{ profile.title[lang] }}</p>
    </div>
    
    <div class="max-w-2xl" ref="summaryRef">
      <h2 class="text-sm uppercase tracking-widest text-[var(--color-text-secondary)] font-bold mb-3">{{ t('profile.label') }}</h2>
      <p class="text-[var(--color-text-secondary)] leading-relaxed max-w-[560px]">
        {{ profile.summary[lang] }}
      </p>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { UserProfile } from '../../stores/cv'

const { locale, t } = useI18n()
const lang = computed(() => locale.value)

const headerRef = ref<HTMLElement | null>(null)
const nameRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const summaryRef = ref<HTMLElement | null>(null)

defineProps<{
  profile: UserProfile
}>()

defineExpose({
  headerRef,
  nameRef,
  titleRef,
  summaryRef
})
</script>
