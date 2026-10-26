<template>
  <div class="min-h-screen bg-[var(--md-sys-color-surface)] text-[var(--md-sys-color-on-surface)] p-2 flex flex-col items-center gap-12 transition-colors duration-300">
    <h1 class="text-3xl font-bold">M3 Buttons</h1>
    <p class="text-[var(--md-sys-color-on-surface-variant)] max-w-2xl text-center">
      Implementing Material 3 Button specifications as the first project molecule. 
      Composed of <span class="text-primary">Layout</span>, <span class="text-primary">Typography</span>, and <span class="text-primary">Icon</span> atoms.
    </p>

    <div class="w-full max-w-6xl space-y-16">
      <!-- SIZE SHOWCASE -->
      <section class="flex flex-col gap-6">
        <h2 class="text-sm text-[var(--md-sys-color-on-surface-variant)] uppercase tracking-widest text-left">Sizes</h2>
        <div class="flex flex-nowrap justify-center gap-8 p-6 bg-[var(--md-sys-color-surface-variant)] rounded-3xl border border-[var(--md-sys-color-outline-variant)] overflow-x-auto">
          <div v-for="s in sizes" :key="s.name" class="flex flex-col gap-2 items-center justify-center min-w-fit">
            <M3Button :size="s.type" variant="filled">
              {{ s.label }}
            </M3Button>
            <span class="text-[10px] font-mono text-[var(--md-sys-color-on-surface-variant)] opacity-60 uppercase">{{ s.name }}</span>
          </div>
        </div>
      </section>

      <!-- VARIANT SHOWCASE -->
      <section class="flex flex-col gap-6">
        <h2 class="text-sm text-[var(--md-sys-color-on-surface-variant)] uppercase tracking-widest text-left">Variants</h2>
        <div class="flex flex-wrap justify-center gap-8 p-8 bg-[var(--md-sys-color-surface-variant)] rounded-3xl border border-[var(--md-sys-color-outline-variant)]">
          <div v-for="v in variants" :key="v.name" class="flex flex-col gap-2 items-center">
            <span class="text-[10px] font-mono text-[var(--md-sys-color-on-surface-variant)] opacity-60 uppercase">{{ v.name }}</span>
            <M3Button :variant="v.type">
              {{ v.label }}
            </M3Button>
          </div>
        </div>
      </section>

      <!-- ICON BUTTON SHOWCASE -->
      <section class="flex flex-col gap-6">
        <h2 class="text-sm text-[var(--md-sys-color-on-surface-variant)] uppercase tracking-widest text-left">Icon Buttons</h2>
        <div class="flex flex-wrap justify-center gap-8 p-8 bg-[var(--md-sys-color-surface-variant)] rounded-3xl border border-[var(--md-sys-color-outline-variant)]">
          <div v-for="v in variants" :key="'icon-' + v.name" class="flex flex-col gap-2 items-center">
            <span class="text-[10px] font-mono text-[var(--md-sys-color-on-surface-variant)] opacity-60 uppercase">{{ v.name }}</span>
            <div class="flex flex-col gap-3 items-center">
              <M3Button v-for="s in sizes" :key="s.type" :size="s.type" :variant="v.type" icon="favorite" />
            </div>
          </div>
        </div>
      </section>

      <!-- ICON + LABEL SHOWCASE -->
      <section class="flex flex-col gap-6">
        <h2 class="text-sm text-[var(--md-sys-color-on-surface-variant)] uppercase tracking-widest text-left">Icon + Label Buttons</h2>
        <div class="flex flex-wrap justify-center gap-8 p-8 bg-[var(--md-sys-color-surface-variant)] rounded-3xl border border-[var(--md-sys-color-outline-variant)]">
          <div v-for="v in variants" :key="'icon-label-' + v.name" class="flex flex-col gap-2 items-center">
            <span class="text-[10px] font-mono text-[var(--md-sys-color-on-surface-variant)] opacity-60 uppercase">{{ v.name }}</span>
            <M3Button :variant="v.type" icon="favorite">
              Favorite
            </M3Button>
          </div>
        </div>
      </section>

      <!-- SHAPE SHOWCASE -->
      <section class="flex flex-col gap-6">
        <h2 class="text-sm text-[var(--md-sys-color-on-surface-variant)] uppercase tracking-widest text-left">Shapes</h2>
        <div class="flex flex-wrap justify-center gap-8 p-8 bg-[var(--md-sys-color-surface-variant)] rounded-3xl border border-[var(--md-sys-color-outline-variant)]">
          <div v-for="sh in shapes" :key="sh.type" class="flex flex-col gap-2 items-center">
            <span class="text-[10px] font-mono text-[var(--md-sys-color-on-surface-variant)] opacity-60 uppercase">{{ sh.name }}</span>
            <M3Button :shape="sh.type" variant="filled">
              {{ sh.label }}
            </M3Button>
          </div>
        </div>
      </section>

      <!-- TOGGLE STATE SHOWCASE -->
      <section class="flex flex-col gap-6">
        <h2 class="text-sm text-[var(--md-sys-color-on-surface-variant)] uppercase tracking-widest text-left">Toggle State</h2>
        <div class="flex flex-col items-center gap-8 p-12 bg-[var(--md-sys-color-surface-variant)] rounded-3xl border border-[var(--md-sys-color-outline-variant)]">
          <div class="flex items-center justify-center">
            <M3Button 
              :toggled="isToggled" 
              @click="isToggled = !isToggled"
              variant="filled" 
              size="lg"
              class="w-64 h-16"
            >
              {{ isToggled ? 'Toggled (Medium)' : 'Default (Full)' }}
            </M3Button>
          </div>
          <div class="text-center">
            <p class="text-xs font-mono text-[var(--md-sys-color-on-surface-variant)]">
              Click the button to toggle its shape state.
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import M3Button from '@/components/molecules/M3Button/M3Button.vue';
import { M3_BUTTON_SPECS } from '@/components/molecules/M3Button/specs';

const sizes = [
  { name: 'XS', type: 'xs' as any, label: 'Extra Small' },
  { name: 'SM', type: 'sm' as any, label: 'Small' },
  { name: 'MD', type: 'md' as any, label: 'Medium' },
  { name: 'LG', type: 'lg' as any, label: 'Large' },
  { name: 'XL', type: 'xl' as any, label: 'Extra Large' },
];

const variants = [
  { name: 'Filled', type: 'filled' as any, label: 'Filled Button' },
  { name: 'Elevated', type: 'elevated' as any, label: 'Elevated Button' },
  { name: 'Tonal', type: 'tonal' as any, label: 'Tonal Button' },
  { name: 'Outlined', type: 'outlined' as any, label: 'Outlined Button' },
  { name: 'Text', type: 'text' as any, label: 'Text Button' },
];

const shapes = Object.entries(M3_BUTTON_SPECS.shapes).map(([key, value]) => ({
  name: key.charAt(0).toUpperCase() + key.slice(1),
  type: key,
  label: value.label,
}));

const elevations = [
  { name: 'Level 0', level: 'level0', label: 'No Elevation' },
  { name: 'Level 1', level: 'level1', label: 'Level 1' },
  { name: 'Level 2', level: 'level2', label: 'Level 2' },
  { name: 'Level 3', level: 'level3', label: 'Level 3' },
  { name: 'Level 4', level: 'level4', label: 'Level 4' },
];

const currentMorphRadius = ref('S');
const isToggled = ref(false);
const toggleMorph = () => {
  currentMorphRadius.value = currentMorphRadius.value === 'S' 
    ? 'M' 
    : 'S';
};
</script>