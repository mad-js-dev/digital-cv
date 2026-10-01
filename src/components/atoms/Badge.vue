<template>
  <div class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20">
    {{ text }}
  </div>
</template>

<script setup lang="ts">
defineProps<{ text: string }>()
</script>
