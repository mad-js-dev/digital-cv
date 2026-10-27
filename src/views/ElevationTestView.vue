<template>
  <div class="min-h-screen bg-slate-900 text-white p-8 flex flex-col items-center gap-12">
    <h1 class="text-2xl font-bold">Elevation</h1>

    <div class="w-full max-w-6xl space-y-16">
      <!-- SECTION 1: Elevation Levels -->
      <section class="flex flex-col gap-6">
        <div class="flex w-full justify-start">
          <h2 class="text-sm text-slate-400 uppercase tracking-widest text-left">Elevation Levels</h2>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div class="lg:col-span-1 flex flex-col justify-start gap-6">
            <p class="text-xl text-slate-300 leading-relaxed">
              Five elevation levels (0–4) express hierarchy by lifting surfaces. M3 elevation is tonal: each level
              combines a shadow with a subtle surface tint.
            </p>
            <div class="p-4 bg-amber-500/10 rounded-2xl border border-amber-500/20">
              <p class="text-sm text-amber-200/80 leading-relaxed">
                On dark backgrounds, elevation reads more through surface lightness than shadow depth.
              </p>
            </div>
          </div>
          <div class="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-6">
            <div v-for="(_spec, level) in elevationTokens" :key="level" class="flex flex-col items-center gap-3">
              <Shape :elevation="level" :radius="20" :color="('#1e293b' as any)" class="w-24 h-24 flex items-center justify-center">
                <span class="text-2xl font-bold text-slate-400">{{ level }}</span>
              </Shape>
              <p class="text-[10px] text-slate-500 font-mono">{{ level }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 2: Surface -->
      <section class="flex flex-col gap-6">
        <div class="flex w-full justify-start">
          <h2 class="text-sm text-slate-400 uppercase tracking-widest text-left">Surface</h2>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div class="lg:col-span-1 flex flex-col justify-start gap-6">
            <p class="text-xl text-slate-300 leading-relaxed">
              The <span class="font-mono text-slate-200">Shape</span> atom applies an elevation level, corner radius,
              background, and an optional surface tint.
            </p>
            <div class="p-4 bg-slate-900/50 rounded-xl border border-slate-700">
              <p class="text-xs font-mono text-slate-400 leading-relaxed">
                &lt;Shape elevation="level1" :radius="16"&gt;<br />&nbsp;&nbsp;content<br />&lt;/Shape&gt;
              </p>
            </div>
          </div>
          <div class="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Shape elevation="level1" :radius="20" class="p-6">
              <div class="p-6">
                <p class="text-sm font-semibold text-slate-200">Card (level 1)</p>
                <p class="text-xs text-slate-400 mt-1">Resting surface — buttons, cards, inputs.</p>
              </div>
            </Shape>
            <Shape elevation="level3" :radius="20" class="p-6">
              <div class="p-6">
                <p class="text-sm font-semibold text-slate-200">Card (level 3)</p>
                <p class="text-xs text-slate-400 mt-1">Raised surface — FAB, menus, dialogs.</p>
              </div>
            </Shape>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import Shape from '@/components/atoms/M3Shape/Shape.vue'
import { ELEVATION_TOKENS } from '@/constants/elevation'

const elevationTokens = ELEVATION_TOKENS;
</script>

<style scoped>
</style>
