<template>
  <div class="min-h-screen bg-slate-900 text-white p-8 flex flex-col items-center gap-12">
    <h1 class="text-2xl font-bold">Color</h1>

    <div class="w-full max-w-6xl space-y-16">
      <!-- SECTION 1: Palettes -->
      <section class="flex flex-col gap-6">
        <div class="flex w-full justify-start">
          <h2 class="text-sm text-slate-400 uppercase tracking-widest text-left">Palettes</h2>
        </div>
        <p class="text-xl text-slate-300 leading-relaxed max-w-2xl">
          The design system exposes six semantic color variables per palette, each with light and dark variants:
          page and main backgrounds, sidebar, primary and secondary text, and accent.
        </p>

        <div v-for="p in palettes" :key="p.name" class="flex flex-col gap-4">
          <p class="text-sm font-semibold text-slate-300 uppercase tracking-widest">{{ p.name }}</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="flex flex-col gap-3 p-5 bg-slate-800/30 rounded-2xl border border-slate-700/30">
              <p class="text-[10px] text-slate-500 uppercase tracking-widest">Light</p>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <ColorSwatch v-for="[varName, value] in p.light" :key="varName" :name="cleanName(varName)" :value="value" />
              </div>
            </div>
            <div class="flex flex-col gap-3 p-5 bg-slate-800/30 rounded-2xl border border-slate-700/30">
              <p class="text-[10px] text-slate-500 uppercase tracking-widest">Dark</p>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <ColorSwatch v-for="[varName, value] in p.dark" :key="varName" :name="cleanName(varName)" :value="value" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 2: CSS Variables -->
      <section class="flex flex-col gap-6">
        <div class="flex w-full justify-start">
          <h2 class="text-sm text-slate-400 uppercase tracking-widest text-left">Usage</h2>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div class="lg:col-span-1 flex flex-col justify-start gap-6">
            <p class="text-xl text-slate-300 leading-relaxed">
              Colors are applied as CSS variables on the root element, so they respond to the active theme and palette.
            </p>
          </div>
          <div class="lg:col-span-2 p-6 bg-slate-900/50 rounded-xl border border-slate-700">
            <p class="text-xs font-mono text-slate-400 leading-relaxed">
              text-[var(--color-text-primary)]<br />
              bg-[var(--color-bg-page)]<br />
              text-[var(--color-accent)]
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import ColorSwatch from '@/components/atoms/ColorSwatch.vue'
import { PALETTES } from '@/stores/cv'

const palettes = Object.entries(PALETTES).map(([name, p]) => ({
  name,
  light: Object.entries(p.light),
  dark: Object.entries(p.dark),
}))

const cleanName = (v: string) => v.replace('--color-', '')
</script>
