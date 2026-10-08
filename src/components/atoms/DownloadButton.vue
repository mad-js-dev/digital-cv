<template>
  <button 
    @click="downloadPDF"
    class="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-[var(--color-accent)] text-white shadow-2xl z-50 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-orange-500/50 group"
    title="Download PDF"
  >
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      class="w-8 h-8 transition-transform duration-300 group-hover:-translate-y-1" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor" 
      stroke-width="2"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  </button>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const pdfMap: Record<string, string> = {
  en: 'Brais_Vazquez_CV_EN.pdf',
  es: 'Brais_Vazquez_CV_ES.pdf',
  ca: 'Brais_Vazquez_CV_CA.pdf'
}

const downloadPDF = () => {
  const lang = locale.value || 'en'
  const fileName = pdfMap[lang] || pdfMap.en
  
  // Use Vite's BASE_URL to ensure it works in both dev and prod
  const fullPath = `${import.meta.env.BASE_URL}${fileName}`
  
  const link = document.createElement('a')
  link.href = fullPath
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>
