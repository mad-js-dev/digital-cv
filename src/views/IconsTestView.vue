<template>
  <div class="min-h-screen bg-slate-900 text-white p-8 flex flex-col items-center gap-12">
    <h1 class="text-2xl font-bold">Icons</h1>

    <div class="w-full max-w-6xl space-y-16">
      <!-- SECTION 1: Styles -->
      <section class="flex flex-col gap-6">
        <div class="flex w-full justify-start">
          <h2 class="text-sm text-slate-400 uppercase tracking-widest text-left">Icon Styles</h2>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div class="lg:col-span-1 flex flex-col justify-start gap-6">
            <p class="text-xl text-slate-300 leading-relaxed">
              Three visually distinct styles: <span class="font-mono text-slate-200">Outlined</span>, <span class="font-mono text-slate-200">Filled</span>
              (the <span class="font-mono text-slate-200">fill</span> axis), and <span class="font-mono text-slate-200">Rounded</span>.
            </p>
            <p class="text-sm text-slate-500 leading-relaxed">
              <span class="font-mono text-slate-200">Sharp</span> also exists as a family (<span class="font-mono text-slate-200">variant="sharp"</span>)
              but renders nearly identically to Outlined in Material Symbols, so it's omitted here.
            </p>
            <div class="p-4 bg-slate-900/50 rounded-xl border border-slate-700">
              <p class="text-xs font-mono text-slate-400">via Material Symbols (fonts.google.com/icons)</p>
            </div>
          </div>
          <div class="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="flex flex-col items-center gap-3 p-6 bg-slate-800/30 rounded-2xl border border-slate-700/30">
              <Icon name="home" :size="48" color="accent" />
              <p class="text-xs font-semibold text-white">Outlined</p>
              <p class="text-[10px] text-slate-500 font-mono">variant="outlined"</p>
            </div>
            <div class="flex flex-col items-center gap-3 p-6 bg-slate-800/30 rounded-2xl border border-slate-700/30">
              <Icon name="home" :size="48" fill color="accent" />
              <p class="text-xs font-semibold text-white">Filled</p>
              <p class="text-[10px] text-slate-500 font-mono">fill</p>
            </div>
            <div class="flex flex-col items-center gap-3 p-6 bg-slate-800/30 rounded-2xl border border-slate-700/30">
              <Icon name="home" variant="rounded" :size="48" color="accent" />
              <p class="text-xs font-semibold text-white">Rounded</p>
              <p class="text-[10px] text-slate-500 font-mono">variant="rounded"</p>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 2: Weights -->
      <section class="flex flex-col gap-6">
        <div class="flex w-full justify-start">
          <h2 class="text-sm text-slate-400 uppercase tracking-widest text-left">Weights</h2>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div class="lg:col-span-1 flex flex-col justify-start gap-6">
            <p class="text-xl text-slate-300 leading-relaxed">
              Icons support seven weights, from thin (100) to bold (700). Heavier weights draw more attention.
            </p>
            <div class="p-4 bg-slate-900/50 rounded-xl border border-slate-700">
              <p class="text-xs font-mono text-slate-400">:weight="100…700"</p>
            </div>
          </div>
          <div class="lg:col-span-2 flex items-end justify-between gap-2 p-6 bg-slate-800/30 rounded-2xl border border-slate-700/30">
            <div v-for="w in weights" :key="w" class="flex flex-col items-center gap-3">
              <Icon name="favorite" :weight="w" :size="40" color="accent" />
              <p class="text-[10px] text-slate-500 font-mono">{{ w }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 3: Sizes -->
      <section class="flex flex-col gap-6">
        <div class="flex w-full justify-start">
          <h2 class="text-sm text-slate-400 uppercase tracking-widest text-left">Sizes</h2>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div class="lg:col-span-1 flex flex-col justify-start gap-6">
            <p class="text-xl text-slate-300 leading-relaxed">
              Four optical sizes keep icon detail crisp at every scale. The <span class="font-mono text-slate-200">size</span> prop
              sets both the rendered size and the matching optical size.
            </p>
            <div class="p-4 bg-slate-900/50 rounded-xl border border-slate-700">
              <p class="text-xs font-mono text-slate-400">:size="20 | 24 | 40 | 48"</p>
            </div>
          </div>
          <div class="lg:col-span-2 flex items-end justify-around p-6 bg-slate-800/30 rounded-2xl border border-slate-700/30">
            <div v-for="s in sizes" :key="s" class="flex flex-col items-center gap-3">
              <Icon name="star" :size="s" color="accent" />
              <p class="text-[10px] text-slate-500 font-mono">{{ s }}px</p>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 4: Optical Size -->
      <section class="flex flex-col gap-6">
        <div class="flex w-full justify-start">
          <h2 class="text-sm text-slate-400 uppercase tracking-widest text-left">Optical Size</h2>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div class="lg:col-span-1 flex flex-col justify-start gap-6">
            <p class="text-xl text-slate-300 leading-relaxed">
              Optical size tunes stroke weight for the display size, independent of rendered size.
              Small optical sizes use heavier strokes; large ones use finer, more detailed strokes.
            </p>
            <div class="p-4 bg-slate-900/50 rounded-xl border border-slate-700">
              <p class="text-xs font-mono text-slate-400">:opsz="20 | 24 | 40 | 48" at a fixed :size="48"</p>
            </div>
          </div>
          <div class="lg:col-span-2 flex items-center justify-between gap-2 p-6 bg-slate-800/30 rounded-2xl border border-slate-700/30">
            <div v-for="o in opticalSizes" :key="o" class="flex flex-col items-center gap-3">
              <Icon name="settings" :size="48" :opsz="o" color="accent" />
              <p class="text-[10px] text-slate-500 font-mono">opsz {{ o }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 5: Fill -->
      <section class="flex flex-col gap-6">
        <div class="flex w-full justify-start">
          <h2 class="text-sm text-slate-400 uppercase tracking-widest text-left">Fill</h2>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div class="lg:col-span-1 flex flex-col justify-start gap-6">
            <p class="text-xl text-slate-300 leading-relaxed">
              The <span class="font-mono text-slate-200">fill</span> prop toggles the FILL axis, switching an outlined glyph to a solid one.
            </p>
            <div class="p-4 bg-slate-900/50 rounded-xl border border-slate-700">
              <p class="text-xs font-mono text-slate-400">:fill="false | true"</p>
            </div>
          </div>
          <div class="lg:col-span-2 grid grid-cols-2 gap-4">
            <div class="flex flex-col items-center gap-3 p-6 bg-slate-800/30 rounded-2xl border border-slate-700/30">
              <Icon name="favorite" :size="48" color="accent" />
              <p class="text-xs text-slate-400 font-mono">:fill="false"</p>
            </div>
            <div class="flex flex-col items-center gap-3 p-6 bg-slate-800/30 rounded-2xl border border-slate-700/30">
              <Icon name="favorite" :size="48" fill color="accent" />
              <p class="text-xs text-slate-400 font-mono">:fill="true"</p>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 6: Grade -->
      <section class="flex flex-col gap-6">
        <div class="flex w-full justify-start">
          <h2 class="text-sm text-slate-400 uppercase tracking-widest text-left">Grade</h2>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div class="lg:col-span-1 flex flex-col justify-start gap-6">
            <p class="text-xl text-slate-300 leading-relaxed">
              Grade adjusts stroke emphasis for a given weight — lower for light emphasis, higher for bold.
            </p>
            <div class="p-4 bg-slate-900/50 rounded-xl border border-slate-700">
              <p class="text-xs font-mono text-slate-400">:grade="-25…200"</p>
            </div>
          </div>
          <div class="lg:col-span-2 flex items-end justify-between gap-2 p-6 bg-slate-800/30 rounded-2xl border border-slate-700/30">
            <div v-for="g in grades" :key="g" class="flex flex-col items-center gap-3">
              <Icon name="star" :grade="g" fill :size="40" color="accent" />
              <p class="text-[10px] text-slate-500 font-mono">{{ g }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 7: Color -->
      <section class="flex flex-col gap-6">
        <div class="flex w-full justify-start">
          <h2 class="text-sm text-slate-400 uppercase tracking-widest text-left">Color</h2>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div class="lg:col-span-1 flex flex-col justify-start gap-6">
            <p class="text-xl text-slate-300 leading-relaxed">
              Icons default to <span class="font-mono text-slate-200">current</span>, inheriting the surrounding text color.
              Token colors (<span class="font-mono text-slate-200">accent</span>, <span class="font-mono text-slate-200">slate</span>,
              <span class="font-mono text-slate-200">white</span>) override it.
            </p>
            <div class="p-4 bg-slate-900/50 rounded-xl border border-slate-700">
              <p class="text-xs font-mono text-slate-400">color="current | accent | slate | white"</p>
            </div>
          </div>
          <div class="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="flex flex-col items-center gap-3 p-6 bg-slate-800/30 rounded-2xl border border-slate-700/30">
              <div class="text-cyan-400"><Icon name="palette" :size="40" /></div>
              <p class="text-[10px] text-slate-500 font-mono">current</p>
            </div>
            <div class="flex flex-col items-center gap-3 p-6 bg-slate-800/30 rounded-2xl border border-slate-700/30">
              <Icon name="palette" :size="40" color="accent" />
              <p class="text-[10px] text-slate-500 font-mono">accent</p>
            </div>
            <div class="flex flex-col items-center gap-3 p-6 bg-slate-800/30 rounded-2xl border border-slate-700/30">
              <Icon name="palette" :size="40" color="slate" />
              <p class="text-[10px] text-slate-500 font-mono">slate</p>
            </div>
            <div class="flex flex-col items-center gap-3 p-6 bg-slate-800/30 rounded-2xl border border-slate-700/30">
              <Icon name="palette" :size="40" color="white" />
              <p class="text-[10px] text-slate-500 font-mono">white</p>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 8: Catalog -->
      <section class="flex flex-col gap-6">
        <div class="flex w-full justify-start">
          <h2 class="text-sm text-slate-400 uppercase tracking-widest text-left">Icon Catalog</h2>
        </div>
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-3 w-full max-w-md">
            <Icon name="search" :size="20" color="slate" />
            <input
              v-model="search"
              type="text"
              placeholder="Search {{ ICON_NAMES.length }} icons…"
              class="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-slate-500"
            />
            <span class="text-xs text-slate-500 font-mono whitespace-nowrap">{{ filteredIcons.length }}</span>
          </div>
          <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            <div
              v-for="name in filteredIcons"
              :key="name"
              class="flex flex-col items-center gap-2 p-4 bg-slate-800/30 rounded-2xl border border-slate-700/30 hover:bg-slate-700/30 transition-colors"
            >
              <Icon :name="name" :size="32" color="accent" />
              <p class="text-[10px] text-slate-500 font-mono truncate max-w-full">{{ name }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 9: Usage & Accessibility -->
      <section class="flex flex-col gap-6">
        <div class="flex w-full justify-start">
          <h2 class="text-sm text-slate-400 uppercase tracking-widest text-left">Usage &amp; Accessibility</h2>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div class="lg:col-span-1 flex flex-col justify-start gap-6">
            <p class="text-xl text-slate-300 leading-relaxed">
              Icons are decorative by default and hidden from screen readers. When an icon carries meaning, pass a
              <span class="font-mono text-slate-200">label</span> to expose it as an accessible image.
            </p>
          </div>
          <div class="lg:col-span-2 flex flex-col gap-4">
            <div class="p-4 bg-slate-900/50 rounded-xl border border-slate-700">
              <p class="text-xs font-mono text-slate-400 leading-relaxed">&lt;Icon name="search" /&gt;<br />&lt;Icon name="mail" :size="20" color="accent" /&gt;<br />&lt;Icon name="favorite" fill :weight="700" /&gt;<br />&lt;Icon name="menu" label="Open menu" /&gt;</p>
            </div>
            <div class="flex items-center gap-4 p-4 bg-slate-800/30 rounded-2xl border border-slate-700/30">
              <div class="flex flex-col items-center gap-2">
                <Icon name="menu" :size="32" color="white" />
                <p class="text-[10px] text-slate-500">decorative</p>
              </div>
              <div class="flex flex-col items-center gap-2">
                <Icon name="menu" :size="32" color="white" label="Open menu" />
                <p class="text-[10px] text-slate-500">label="Open menu"</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Icon from '@/components/atoms/Icon/Icon.vue'
import { ICON_NAMES } from '@/constants/icons'

const weights = [100, 200, 300, 400, 500, 600, 700]
const sizes = [20, 24, 40, 48]
const opticalSizes = [20, 24, 40, 48]
const grades = [-25, 0, 100, 200]

const search = ref('')
const filteredIcons = computed(() => {
  const q = search.value.trim().toLowerCase()
  if (!q) return ICON_NAMES
  return ICON_NAMES.filter((n) => n.includes(q))
})
</script>
