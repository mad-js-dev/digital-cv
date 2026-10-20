<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 p-8 flex flex-col items-center gap-12">
    <header class="text-center max-w-3xl">
      <h1 class="text-4xl font-bold tracking-tight mb-4">M3Surface Showcase</h1>
      <p class="text-lg text-slate-600 leading-relaxed">
        The <span class="font-mono font-bold text-indigo-600">M3Surface</span> is a content-first wrapper that handles the "skin" of a component. 
        It now implements the full Material 3 Surface role system, including tonal containers, utility roles, and automatic contrast.
      </p>
    </header>

    <div class="w-full max-w-6xl space-y-20">
      
      <!-- SECTION 1: Radius & Corner Logic -->
      <section class="flex flex-col gap-8">
        <div class="flex flex-col gap-2">
          <h2 class="text-xl font-bold uppercase tracking-widest text-slate-500">1. Corner Radius & Geometry</h2>
          <p class="text-slate-600">Demonstrating symmetric and asymmetric radius mapping from M3 tokens.</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="flex flex-col gap-4 items-center">
            <M3Surface radius="S" color="primary" class="p-4">Small (S)</M3Surface>
            <span class="text-xs font-mono text-slate-400">radius="S"</span>
          </div>
          <div class="flex flex-col gap-4 items-center">
            <M3Surface radius="M" color="primary" class="p-4">Medium (M)</M3Surface>
            <span class="text-xs font-mono text-slate-400">radius="M"</span>
          </div>
          <div class="flex flex-col gap-4 items-center">
            <M3Surface radius="L" color="primary" class="p-4">Large (L)</M3Surface>
            <span class="text-xs font-mono text-slate-400">radius="L"</span>
          </div>
          <div class="flex flex-col gap-4 items-center">
            <M3Surface radius="FULL" color="primary" class="p-4">Full (Pill)</M3Surface>
            <span class="text-xs font-mono text-slate-400">radius="FULL"</span>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          <div class="flex flex-col gap-4 items-center p-6 bg-white rounded-2xl border border-slate-200">
            <M3Surface :radius="['M', 'FULL', 'FULL', 'M']" color="secondaryContainer" class="p-6">Asymmetric (M, FULL, FULL, M)</M3Surface>
            <span class="text-xs font-mono text-slate-400">radius=["M", "FULL", "FULL", "M"]</span>
          </div>
          <div class="flex flex-col gap-4 items-center p-6 bg-white rounded-2xl border border-slate-200">
            <M3Surface :radius="[20, 0, 20, 0]" color="tertiaryContainer" class="p-6">Custom Numeric [20, 0, 20, 0]</M3Surface>
            <span class="text-xs font-mono text-slate-400">radius=[20, 0, 20, 0]</span>
          </div>
        </div>
      </section>

      <!-- SECTION 2: M3 Surface Hierarchy -->
      <section class="flex flex-col gap-8">
        <div class="flex flex-col gap-2">
          <h2 class="text-xl font-bold uppercase tracking-widest text-slate-500">2. Surface Hierarchy & Variants</h2>
          <p class="text-slate-600">Demonstrating the M3 tonal depth system and variants. Notice how the content color automatically adapts to the background contrast.</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Neutral Containers -->
          <div class="flex flex-col gap-4 p-6 bg-white rounded-3xl border border-slate-200 shadow-sm">
            <h3 class="font-bold text-center mb-2">Neutral Containers</h3>
            <div class="flex flex-col gap-3">
              <M3Surface variant="container" color="surfaceContainerLowest" class="p-3 text-center">Lowest</M3Surface>
              <M3Surface variant="container" color="surfaceContainerLow" class="p-3 text-center">Low</M3Surface>
              <M3Surface variant="container" color="surfaceContainer" class="p-3 text-center">Default</M3Surface>
              <M3Surface variant="container" color="surfaceContainerHigh" class="p-3 text-center">High</M3Surface>
              <M3Surface variant="container" color="surfaceContainerHighest" class="p-3 text-center">Highest</M3Surface>
            </div>
          </div>

          <!-- Accent Tonal Surfaces -->
          <div class="flex flex-col gap-4 p-6 bg-white rounded-3xl border border-slate-200 shadow-sm">
            <h3 class="font-bold text-center mb-2">Accent Tonal Surfaces</h3>
            <div class="flex flex-col gap-3">
              <M3Surface variant="filled" color="primary" class="p-3 text-center">Primary Filled</M3Surface>
              <M3Surface variant="tonal" color="primary" class="p-3 text-center">Primary Tonal</M3Surface>
              <M3Surface variant="filled" color="secondary" class="p-3 text-center">Secondary Filled</M3Surface>
              <M3Surface variant="tonal" color="secondary" class="p-3 text-center">Secondary Tonal</M3Surface>
              <M3Surface variant="filled" color="tertiary" class="p-3 text-center">Tertiary Filled</M3Surface>
              <M3Surface variant="tonal" color="tertiary" class="p-3 text-center">Tertiary Tonal</M3Surface>
            </div>
          </div>

          <!-- Bright & Dim -->
          <div class="flex flex-col gap-4 p-6 bg-white rounded-3xl border border-slate-200 shadow-sm">
            <h3 class="font-bold text-center mb-2">Brightness Tones</h3>
            <div class="flex flex-col gap-3">
              <M3Surface color="surfaceBright" class="p-3 text-center">Surface Bright</M3Surface>
              <M3Surface color="surfaceDim" class="p-3 text-center">Surface Dim</M3Surface>
              <M3Surface variant="outlined" color="surface" class="p-3 text-center">Outlined Surface</M3Surface>
              <M3Surface variant="text" color="primary" class="p-3 text-center">Text Variant</M3Surface>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 3: Utility Surface Roles -->
      <section class="flex flex-col gap-8">
        <div class="flex flex-col gap-2">
          <h2 class="text-xl font-bold uppercase tracking-widest text-slate-500">3. Utility Surface Roles</h2>
          <p class="text-slate-600">Semantic surfaces for system feedback (Success, Warning, Info) with matching contrast colors.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="flex flex-col gap-4 p-6 bg-white rounded-3xl border border-slate-200 shadow-sm">
            <h3 class="font-bold text-center mb-2">Success</h3>
            <div class="flex flex-col gap-3">
              <M3Surface color="success" class="p-3 text-center">Success Filled</M3Surface>
              <M3Surface color="successContainer" class="p-3 text-center">Success Container</M3Surface>
            </div>
          </div>
          <div class="flex flex-col gap-4 p-6 bg-white rounded-3xl border border-slate-200 shadow-sm">
            <h3 class="font-bold text-center mb-2">Warning</h3>
            <div class="flex flex-col gap-3">
              <M3Surface color="warning" class="p-3 text-center">Warning Filled</M3Surface>
              <M3Surface color="warningContainer" class="p-3 text-center">Warning Container</M3Surface>
            </div>
          </div>
          <div class="flex flex-col gap-4 p-6 bg-white rounded-3xl border border-slate-200 shadow-sm">
            <h3 class="font-bold text-center mb-2">Info</h3>
            <div class="flex flex-col gap-3">
              <M3Surface color="info" class="p-3 text-center">Info Filled</M3Surface>
              <M3Surface color="infoContainer" class="p-3 text-center">Info Container</M3Surface>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 4: Automatic Contrast -->
      <section class="flex flex-col gap-8">
        <div class="flex flex-col gap-2">
          <h2 class="text-xl font-bold uppercase tracking-widest text-slate-500">4. Automatic Contrast Engine</h2>
          <p class="text-slate-600">The surface automatically resolves the correct "On-Color" for any content inside it, ensuring accessibility and contrast without manual styling.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="flex flex-col gap-2 items-center">
            <M3Surface color="primary" class="p-4 w-full text-center font-bold">onPrimary</M3Surface>
            <span class="text-xs font-mono text-slate-400">primary &rarr; onPrimary</span>
          </div>
          <div class="flex flex-col gap-2 items-center">
            <M3Surface color="surfaceContainerLow" class="p-4 w-full text-center font-bold">onSurface</M3Surface>
            <span class="text-xs font-mono text-slate-400">surfaceContainerLow &rarr; onSurface</span>
          </div>
          <div class="flex flex-col gap-2 items-center">
            <M3Surface color="success" class="p-4 w-full text-center font-bold">onSuccess</M3Surface>
            <span class="text-xs font-mono text-slate-400">success &rarr; onSuccess</span>
          </div>
          <div class="flex flex-col gap-2 items-center">
            <M3Surface color="surfaceDim" class="p-4 w-full text-center font-bold">onSurface</M3Surface>
            <span class="text-xs font-mono text-slate-400">surfaceDim &rarr; onSurface</span>
          </div>
        </div>
      </section>

      <!-- SECTION 5: Elevation & State Layers -->
      <section class="flex flex-col gap-8">
        <div class="flex flex-col gap-2">
          <h2 class="text-xl font-bold uppercase tracking-widest text-slate-500">5. Elevation & State Interaction</h2>
          <p class="text-slate-600">Interactive surfaces reacting to hover, active, and focused states with dynamic elevation.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <!-- State Demo -->
          <div class="flex flex-col gap-6 p-8 bg-white rounded-3xl border border-slate-200 shadow-sm">
            <h3 class="font-bold text-center mb-4">State Layers</h3>
            <div class="flex flex-col gap-4">
              <M3Surface state="base" color="primary" class="p-4 text-center">Base State</M3Surface>
              <M3Surface state="hover" color="primary" class="p-4 text-center">Hover State</M3Surface>
              <M3Surface state="active" color="primary" class="p-4 text-center">Active State</M3Surface>
              <M3Surface state="focused" color="primary" class="p-4 text-center">Focused State</M3Surface>
            </div>
          </div>

          <!-- Elevation Demo -->
          <div class="flex flex-col gap-6 p-8 bg-white rounded-3xl border border-slate-200 shadow-sm">
            <h3 class="font-bold text-center mb-4">Elevation Levels</h3>
            <div class="flex flex-col gap-6">
              <M3Surface elevation="level0" color="surfaceVariant" class="p-4 text-center">Level 0</M3Surface>
              <M3Surface elevation="level1" color="surfaceVariant" class="p-4 text-center">Level 1</M3Surface>
              <M3Surface elevation="level2" color="surfaceVariant" class="p-4 text-center">Level 2</M3Surface>
              <M3Surface elevation="level3" color="surfaceVariant" class="p-4 text-center">Level 3</M3Surface>
              <M3Surface elevation="level4" color="surfaceVariant" class="p-4 text-center">Level 4</M3Surface>
            </div>
          </div>

          <!-- Content Adaptation Demo -->
          <div class="flex flex-col gap-6 p-8 bg-white rounded-3xl border border-slate-200 shadow-sm">
            <h3 class="font-bold text-center mb-4">Content Adaptation</h3>
            <div class="flex flex-col gap-4">
              <M3Surface color="tertiaryContainer" class="p-4 text-center">
                Short Text
              </M3Surface>
              <M3Surface color="tertiaryContainer" class="p-4 text-center">
                This surface expands to fit longer content automatically without distorting the corners.
              </M3Surface>
              <M3Surface color="tertiaryContainer" class="p-4 flex items-center justify-center gap-2">
                <span>Icon</span>
                <div class="w-4 h-4 bg-black rounded-full"></div>
                <span>Dynamic Content</span>
              </M3Surface>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 6: Radius Morphing -->
      <section class="flex flex-col gap-8 pb-20">
        <div class="flex flex-col gap-2">
          <h2 class="text-xl font-bold uppercase tracking-widest text-slate-500">6. Radius Morphing</h2>
          <p class="text-slate-600">Because we use CSS border-radius, the component can smoothly interpolate between different corner sizes. This is used for tactile feedback during interaction.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="flex flex-col gap-4 p-6 bg-white rounded-3xl border border-slate-200 shadow-sm">
            <h3 class="font-bold text-center mb-2">Interactive Morphing</h3>
            <p class="text-xs text-slate-500 text-center mb-4">The state prop triggers specific radius shifts: Hover (S) &rarr; Base (M) &rarr; Active (L)</p>
            <div class="flex flex-col gap-4">
              <M3Surface :state="interactiveState" color="primary" class="p-4 text-center">
                Interactive State: {{ interactiveState }}
              </M3Surface>
              <div class="flex justify-center gap-2">
                <button @click="interactiveState = 'base'" class="px-3 py-1 text-xs bg-slate-100 rounded hover:bg-slate-200">Base</button>
                <button @click="interactiveState = 'hover'" class="px-3 py-1 text-xs bg-slate-100 rounded hover:bg-slate-200">Hover</button>
                <button @click="interactiveState = 'active'" class="px-3 py-1 text-xs bg-slate-100 rounded hover:bg-slate-200">Active</button>
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-4 p-6 bg-white rounded-3xl border border-slate-200 shadow-sm">
            <h3 class="font-bold text-center mb-2">Dynamic Props Morphing</h3>
            <p class="text-xs text-slate-500 text-center mb-4">Changing the radius prop via state or animation creates a smooth transition.</p>
            <div class="flex flex-col gap-4">
              <M3Surface :radius="dynamicRadius" color="secondary" class="p-4 text-center">
                Morphing Radius: {{ dynamicRadius }}
              </M3Surface>
              <div class="flex justify-center gap-2">
                <button @click="dynamicRadius = 'S'" class="px-3 py-1 text-xs bg-slate-100 rounded hover:bg-slate-200">Small</button>
                <button @click="dynamicRadius = 'M'" class="px-3 py-1 text-xs bg-slate-100 rounded hover:bg-slate-200">Medium</button>
                <button @click="dynamicRadius = 'L'" class="px-3 py-1 text-xs bg-slate-100 rounded hover:bg-slate-200">Large</button>
                <button @click="dynamicRadius = 'FULL'" class="px-3 py-1 text-xs bg-slate-100 rounded hover:bg-slate-200">Full</button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import M3Surface from '@/components/atoms/M3Surface/M3Surface.vue';

const interactiveState = ref('base');
const dynamicRadius = ref('M');
</script>

<style scoped>
</style>
