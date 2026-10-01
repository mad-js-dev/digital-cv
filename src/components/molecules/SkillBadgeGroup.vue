<template>
  <div class="flex gap-2 flex-wrap">
    <Badge v-for="tech in techStack" :key="tech" :text="tech" />
  </div>
</template>

<script setup lang="ts">
import Badge from '../atoms/Badge.vue'
defineProps<{ techStack: string[] }>()
</script>
