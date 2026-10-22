<template>
  <div class="flex flex-col gap-2">
    <div class="h-16 rounded-xl border border-slate-700/50" :style="{ background: value }" />
    <div class="flex flex-col">
      <p class="text-xs font-mono text-slate-300">{{ name }}</p>
      <p class="text-[10px] font-mono text-slate-500 uppercase">{{ value }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ name: string; value: string }>()
</script>
