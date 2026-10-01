<template>
  <div class="relative flex items-center justify-center w-4 h-4 rounded-full bg-white border-2 border-slate-400 shadow-sm z-10" :style="style"></div>
</template>

<script setup lang="ts">
defineProps<{
  style?: any
}>()
</script>
