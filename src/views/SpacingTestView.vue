<template>
  <div class="min-h-screen bg-slate-900 text-white p-8 flex flex-col items-center gap-12">
    <h1 class="text-2xl font-bold">Spacing</h1>

    <div class="w-full max-w-6xl space-y-16">
      <!-- SECTION 1: Spacing Scale -->
      <section class="flex flex-col gap-6">
        <div class="flex w-full justify-start">
          <h2 class="text-sm text-slate-400 uppercase tracking-widest text-left">Spacing Scale</h2>
        </div >
        <div class="flex flex-col gap-6">
          <p class="text-xl text-slate-300 leading-relaxed">
            M3 <span class="font-mono text-slate-200">space&lt;N&gt;</span> tokens — an 8dp base with a multiplier
            pattern (<span class="font-mono text-slate-200">space225 = 18dp = 8dp × 2.25</span>).
          </p>
          <div class="flex flex-col gap-4">
            <div class="relative p-6 bg-slate-800/30 rounded-2xl border border-slate-700/30 w-full">
              <!-- Scale Ref (Top Right) -->
              <div class="absolute top-4 right-4 flex items-center gap-2 px-2 py-1 bg-slate-900/50 rounded border border-slate-700/50">
                <span class="text-[9px] font-mono text-slate-500 uppercase tracking-tighter">Scale Ref (5:1)</span>
                <div class="relative h-3 flex items-center">
                  <div class="h-[1px] bg-accent relative" style="width: calc(8px * 5)">
                    <div class="absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-2 bg-accent"></div>
                    <div class="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-2 bg-accent"></div>
                  </div>
                  <span class="ml-1 text-[9px] font-mono text-slate-400">8px</span>
                </div>
              </div>

              <div class="relative h-24 w-full" :style="{ minWidth: (Math.max(...SPACING_SCALE) * 5) + 100 + 'px' }">
                <!-- Base Line -->
                <div class="absolute top-1/2 left-0 right-0 h-[1px] bg-slate-600"></div>
                
                <!-- Ticks and Labels -->
                <div 
                  v-for="([key, val], index) in Object.entries(SPACING_TOKENS)" 
                  :key="key" 
                  class="absolute top-1/2 -translate-y-1/2 flex flex-col items-center group cursor-help"
                  :style="{ left: (val * 5) + 'px' }"
                >
                  <!-- Value Label (Top) -->
                  <span 
                    class="absolute bottom-full text-[10px] font-mono text-slate-400 whitespace-nowrap transition-all -rotate-45 origin-bottom-right"
                    :class="index % 2 !== 0 ? 'mb-8' : 'mb-2'"
                  >
                    {{ val }}
                  </span>
                  
                  <!-- Tick Mark -->
                  <div class="relative flex items-end justify-center">
                    <!-- Background Tick -->
                    <div class="w-[2px] h-4 bg-slate-500 transition-all group-hover:bg-transparent"></div>
                    <!-- Accent Growth Bar -->
                    <div class="absolute bottom-0 w-[2px] bg-accent transition-all duration-300 h-0 group-hover:h-12" :style="{ transitionDelay: '0s' }"></div>
                  </div>
                  
                  <!-- Token Label (Bottom - Hidden by default, shows on hover) -->
                  <span class="absolute top-full mt-2 text-[10px] font-mono text-accent opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {{ key }}
                  </span>
                </div >
              </div >
            </div >
          </div >
        </div >
      </section>

      <!-- SECTION 2: Layout — Default settings -->
      <section class="flex flex-col gap-6">
        <div class="flex w-full justify-start">
          <h2 class="text-sm text-slate-400 uppercase tracking-widest text-left">Layout · Defaults</h2>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div class="lg:col-span-1 flex flex-col justify-start gap-6">
            <p class="text-xl text-slate-300 leading-relaxed">
              The <span class="font-mono text-slate-200">Layout</span> atom is a flex container that manages
              <span class="text-slate-200">padding</span>, <span class="text-slate-200">margin</span> and
              <span class="text-slate-200">gap</span>. With no props it renders its default setting
              (vertical, gap 16, padding 16).
            </p>
            <div class="p-4 bg-slate-900/50 rounded-xl border border-slate-700">
              <p class="text-xs font-mono text-slate-400">&lt;Layout&gt;…&lt;/Layout&gt;<br />&lt;Layout direction="horizontal" grow&gt;</p>
            </div>
          </div>
          <div class="lg:col-span-2 flex flex-col gap-6 p-6 bg-slate-800/30 rounded-2xl border border-slate-700/30">
            <div>
              <p class="text-[10px] text-slate-400 italic mb-2">Default — vertical, gap 16, padding 16</p>
              <Layout>
                <div class="bg-slate-700/50 h-10 rounded-lg flex items-center justify-center text-sm">Block A</div>
                <div class="bg-slate-700/50 h-10 rounded-lg flex items-center justify-center text-sm">Block B</div>
              </Layout>
            </div>
            <div>
              <p class="text-[10px] text-slate-400 italic mb-2">Horizontal — direction="horizontal"</p>
              <Layout direction="horizontal">
                <div class="bg-slate-700/50 h-10 flex-1 rounded-lg flex items-center justify-center text-sm">Left</div>
                <div class="bg-slate-700/50 h-10 flex-1 rounded-lg flex items-center justify-center text-sm">Right</div>
              </Layout>
            </div>
            <div>
              <p class="text-[10px] text-slate-400 italic mb-2">Grow — direction="horizontal" grow (children fill)</p>
              <Layout direction="horizontal" grow>
                <div class="bg-slate-700/50 h-10 rounded-lg flex items-center justify-center text-sm">A</div>
                <div class="bg-slate-700/50 h-10 rounded-lg flex items-center justify-center text-sm">B</div>
                <div class="bg-slate-700/50 h-10 rounded-lg flex items-center justify-center text-sm">C</div>
              </Layout>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 3: Layout — Settings override -->
      <section class="flex flex-col gap-6">
        <div class="flex w-full justify-start">
          <h2 class="text-sm text-slate-400 uppercase tracking-widest text-left">Layout · Settings Override</h2>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div class="lg:col-span-1 flex flex-col justify-start gap-6">
            <p class="text-xl text-slate-300 leading-relaxed">
              A consumer defines its own style types and overrides the defaults by passing a
              <span class="font-mono text-slate-200">settings</span> object — e.g.
              <span class="font-mono text-slate-200">small</span> /
              <span class="font-mono text-slate-200">medium</span> /
              <span class="font-mono text-slate-200">large</span>.
            </p>
            <div class="p-4 bg-slate-900/50 rounded-xl border border-slate-700">
              <p class="text-xs font-mono text-slate-400">&lt;Layout :settings="demo.small"&gt;<br />&lt;Layout :settings="demo.large"&gt;</p>
            </div>
          </div>
          <div class="lg:col-span-2 flex flex-col gap-6 p-6 bg-slate-800/30 rounded-2xl border border-slate-700/30">
            <div>
              <p class="text-[10px] text-slate-400 italic mb-2">small — gap 8, padding 8</p>
              <Layout :settings="demoSettings.small">
                <div class="bg-slate-700/50 h-8 rounded-lg flex items-center justify-center text-xs">A</div>
                <div class="bg-slate-700/50 h-8 rounded-lg flex items-center justify-center text-xs">B</div>
              </Layout>
            </div>
            <div>
              <p class="text-[10px] text-slate-400 italic mb-2">medium — gap 16, padding 16</p>
              <Layout :settings="demoSettings.medium">
                <div class="bg-slate-700/50 h-8 rounded-lg flex items-center justify-center text-xs">A</div>
                <div class="bg-slate-700/50 h-8 rounded-lg flex items-center justify-center text-xs">B</div>
              </Layout>
            </div>
            <div>
              <p class="text-[10px] text-slate-400 italic mb-2">large — gap 32, padding 24</p>
              <Layout :settings="demoSettings.large">
                <div class="bg-slate-700/50 h-8 rounded-lg flex items-center justify-center text-xs">A</div>
                <div class="bg-slate-700/50 h-8 rounded-lg flex items-center justify-center text-xs">B</div>
              </Layout>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import Layout from '@/components/atoms/M3Layout/layout/Layout.vue';
import { SPACING_SCALE, SPACING_TOKENS } from '@/constants/spacing';
import type { LayoutSettings } from '@/components/atoms/layout/layout.defaults';

const demoSettings: Record<string, LayoutSettings> = {
  small: { gap: SPACING_TOKENS.space100, padding: SPACING_TOKENS.space100 }, // 8 / 8
  medium: { gap: SPACING_TOKENS.space200, padding: SPACING_TOKENS.space200 }, // 16 / 16
  large: { gap: SPACING_TOKENS.space400, padding: SPACING_TOKENS.space300 }, // 32 / 24
};
</script>
