<template>
  <div class="min-h-screen bg-slate-900 text-white p-8 flex flex-col items-center gap-12">
    <h1 class="text-2xl font-bold">M3Shape Playground</h1>
    
    <div class="w-full max-w-6xl space-y-16">
      <!-- SECTION 1: Global Radius Scale -->
      <section class="flex flex-col gap-6">
        <div class="flex w-full justify-start">
          <h2 class="text-sm text-slate-400 uppercase tracking-widest text-left">Corner radius scale</h2>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <!-- Gallery (2/3 width) -->
          <div class="lg:col-span-2 flex flex-col gap-1 p-4 bg-slate-800/50 rounded-3xl border border-slate-700/50">
            <div 
              v-for="(value, token) in cornerValues" 
              :key="token" 
              class="flex items-center gap-6 py-2 px-6 rounded-2xl transition-colors hover:bg-slate-700/30"
            >
              <div class="w-[231px] h-[77px] flex-shrink-0 flex items-center justify-center">
                <SimpleSquare 
                  :radius="token" 
                  color="accent" 
                  :stretch="false"
                />
              </div>
              <div class="flex flex-col gap-1">
                <p class="text-lg font-bold text-white">
                  {{ token }} 
                  <span class="text-sm font-normal text-slate-500 ml-1">
                    ({{ typeof value === 'number' ? value + 'px' : 'Full' }})
                  </span>
                </p>
                <p class="text-sm text-slate-500 leading-tight">{{ labels[token] }}</p>
              </div>
            </div>
          </div>
          <!-- Description (1/3 width) -->
          <div class="lg:col-span-1 flex flex-col justify-start gap-6">
            <p class="text-xl text-slate-300 leading-relaxed">
              The Material 3 shape system uses a size-based scale with ten styles. 
              Styles are assigned to components based on the desired amount of roundedness.
            </p>
            <div class="p-4 bg-amber-500/10 rounded-2xl border border-amber-500/20">
              <p class="text-sm text-amber-200/80 leading-relaxed">
                <span class="font-bold text-amber-400">Important:</span> Avoid applying larger tokens to elements smaller than the radius value to avoid unexpected clamping.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 2: Symmetry -->
      <section class="flex flex-col gap-6">
        <div class="flex w-full justify-start">
          <h2 class="text-sm text-slate-400 uppercase tracking-widest text-left">Symmetry</h2>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <!-- LEFT: Description (1/3 width) -->
          <div class="lg:col-span-1 flex flex-col justify-start gap-6">
            <div class="space-y-4">
              <p class="text-xl text-slate-300 leading-relaxed">
                Components can have either symmetric or asymmetric corner shapes. Symmetric shapes have the same values for all corners, while asymmetric shapes can have corners with different values.
              </p>
              <p class="text-lg text-slate-400 leading-relaxed">
                Both symmetric and asymmetric shapes use the same 10-step scale.
              </p>
              <p class="text-lg text-slate-400 leading-relaxed">
                Asymmetrical shapes are used in M3 components with closely-grouped items, such as menus and split buttons. These are called inner corners.
              </p>
            </div>
            
            <div class="pt-4 space-y-4">
              <p class="text-sm text-slate-500 leading-relaxed">
                The component also accepts an <span class="text-white font-mono">[TL, TR, BR, BL]</span> array for independent corner radius management by either tokens or raw pixel values.
              </p>
              <div class="p-4 bg-slate-900/50 rounded-xl border border-slate-700">
                <p class="text-xs font-mono text-slate-400">
                  Example: :radius="['L', 'NONE', 'L', 'NONE']"
                </p>
              </div>
            </div>

            <div class="pt-4 space-y-4">
              <p class="text-sm text-slate-500 leading-relaxed">
                The <span class="text-white font-mono">stretch</span> prop controls how radii relate to the container. With <span class="text-white font-mono">stretch="true"</span> (default) the shape fills its container and radii are measured against its real dimensions — so <span class="text-white font-mono">FULL</span> is a circle in a square but a pill in a rectangle.
              </p>
              <p class="text-sm text-slate-500 leading-relaxed">
                With <span class="text-white font-mono">stretch="false"</span> the shape is drawn on a fixed 100×100 grid and scaled uniformly, keeping radii proportional to the shape instead of the container.
              </p>
              <div class="p-4 bg-slate-900/50 rounded-xl border border-slate-700">
                <p class="text-xs font-mono text-slate-400">
                  Example: :stretch="false"
                </p>
              </div>
            </div>
          </div>

          <!-- RIGHT: Visual Examples (2/3 width) -->
          <div class="lg:col-span-2 flex flex-col gap-4">
            <div class="flex flex-col items-start gap-2 p-4">
              <p class="text-[10px] text-slate-400 italic mb-1">Stand alone element should use symetric corner shapes.</p>
              <div class="w-[150px] h-[80px]">
                <SimpleSquare :radius="'FULL'" color="accent" :stretch="true">
                  <span class="text-black font-bold text-xs text-center px-2">Simple Button</span>
                </SimpleSquare>
              </div>
              <p class="text-[10px] text-slate-500 font-mono">'FULL' (Symmetric)</p>
            </div>
            <div class="flex flex-col items-start gap-2 p-4">
              <p class="text-[10px] text-slate-400 italic mb-1">Use asymmetry to give relation to shapes.</p>
              <div class="flex gap-1">
                <div class="w-[225px] h-[80px]">
                  <SimpleSquare :radius="['FULL', 'XS', 'XS', 'FULL']" color="accent" :stretch="true">
                    <span class="text-black font-bold text-[10px] text-center px-1 leading-tight">Dropdown button</span>
                  </SimpleSquare>
                </div>
                <div class="w-[75px] h-[80px]">
                  <SimpleSquare :radius="['XS', 'FULL', 'FULL', 'XS']" color="accent" :stretch="true" />
                </div>
              </div>
              <p class="text-[10px] text-slate-500 font-mono">['FULL', 'XS', 'XS', 'FULL'] + ['XS', 'FULL', 'FULL', 'XS']</p>
            </div>
            <div class="flex flex-col items-start gap-2 p-4">
              <p class="text-[10px] text-slate-400 italic mb-1">Asymmetry can also be use to exclude relationship between shapes. The first and the last outer corners exclude this group of buttons from other elements that might be on the page, while the inner corners provide relationship between items.</p>
              <div class="flex flex-col gap-1">
                <div class="w-[300px] h-[40px]">
                  <SimpleSquare :radius="['FULL', 'FULL', 'XS', 'XS']" color="accent" :stretch="true">
                    <span class="text-black font-bold text-xs text-center px-2">Dropdown item 1</span>
                  </SimpleSquare>
                </div>
                <div class="w-[300px] h-[40px]">
                  <SimpleSquare :radius="'XS'" color="accent" :stretch="true">
                    <span class="text-black font-bold text-xs text-center px-2">Dropdown item 2</span>
                  </SimpleSquare>
                </div>
                <div class="w-[300px] h-[40px]">
                  <SimpleSquare :radius="'XS'" color="accent" :stretch="true">
                    <span class="text-black font-bold text-xs text-center px-2">Dropdown item 3</span>
                  </SimpleSquare>
                </div>
                <div class="w-[300px] h-[40px]">
                  <SimpleSquare :radius="['XS', 'XS', 'FULL', 'FULL']" color="accent" :stretch="true">
                    <span class="text-black font-bold text-xs text-center px-2">Dropdown item 4</span>
                  </SimpleSquare>
                </div>
              </div>
              <p class="text-[10px] text-slate-500 font-mono">['FULL','FULL','XS','XS'] + 'XS' + 'XS' + ['XS','XS','FULL','FULL']</p>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 3: Artistic Shapes -->
      <section class="flex flex-col gap-6">
        <div class="flex w-full justify-start">
          <h2 class="text-sm text-slate-400 uppercase tracking-widest text-left">Artistic Shapes</h2>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <!-- LEFT: Description (1/3 width) -->
          <div class="lg:col-span-1 flex flex-col justify-start gap-6">
            <div class="space-y-4">
              <p class="text-xl text-slate-300 leading-relaxed">
                Beyond surfaces, the component supports a library of artistic shapes. 
              </p>
              <p class="text-lg text-slate-400 leading-relaxed">
                These shapes are high-fidelity SVG paths covering a range of geometric and organic forms.
              </p>
            </div>
          </div>

          <!-- RIGHT: Visual Examples (2/3 width) -->
          <div class="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-6">
            <div class="flex flex-col items-center gap-2 p-4 bg-slate-800/30 rounded-2xl border border-slate-700/30">
              <div class="w-[120px] h-[120px] flex items-center justify-center">
                <SimpleSquare :shape="'circle'" color="accent" :stretch="true"/>
              </div>
              <p class="text-xs text-slate-400 font-mono">shape="circle"</p>
            </div>
            <div class="flex flex-col items-center gap-2 p-4 bg-slate-800/30 rounded-2xl border border-slate-700/30">
              <div class="w-[120px] h-[120px] flex items-center justify-center">
                <SimpleSquare shape="square" color="accent"/>
              </div>
              <p class="text-xs text-slate-400 font-mono">shape="square"</p>
            </div>
            <div class="flex flex-col items-center gap-2 p-4 bg-slate-800/30 rounded-2xl border border-slate-700/30">
              <div class="w-[120px] h-[120px] flex items-center justify-center">
                 <SimpleSquare shape="heart" color="accent"/>
              </div>
              <p class="text-xs text-slate-400 font-mono">shape="heart"</p>
            </div>
            <div class="flex flex-col items-center gap-2 p-4 bg-slate-800/30 rounded-2xl border border-slate-700/30">
              <div class="w-[120px] h-[120px] flex items-center justify-center">
                <SimpleSquare shape="flower" color="accent"/>
              </div>
              <p class="text-xs text-slate-400 font-mono">shape="flower"</p>
            </div>
            <div class="flex flex-col items-center gap-2 p-4 bg-slate-800/30 rounded-2xl border border-slate-700/30">
              <div class="w-[120px] h-[120px] flex items-center justify-center">
                <SimpleSquare shape="gem" color="accent" />
              </div>
              <p class="text-xs text-slate-400 font-mono">shape="gem"</p>
            </div>
            <div class="flex flex-col items-center gap-2 p-4 bg-slate-800/30 rounded-2xl border border-slate-700/30">
              <div class="w-[120px] h-[120px] flex items-center justify-center">
                <SimpleSquare shape="sunny" color="accent" />
              </div>
              <p class="text-xs text-slate-400 font-mono">shape="sunny"</p>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 4: 9-Slice Scaling -->
      <section class="flex flex-col gap-6">
        <div class="flex w-full justify-start">
          <h2 class="text-sm text-slate-400 uppercase tracking-widest text-left">9-Slice Scaling</h2>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <!-- LEFT: Description (1/3 width) -->
          <div class="lg:col-span-1 flex flex-col justify-start gap-6">
            <p class="text-xl text-slate-300 leading-relaxed">
              Rectangular-ish shapes can stretch to fill a container without distorting their corners.
            </p>
            <p class="text-lg text-slate-400 leading-relaxed">
              Each sliceable shape declares four insets (fractions of its bounding box) that carve it into a 3×3 grid. When stretched, the four corners stay fixed while the edges and center scale to fit.
            </p>
            <div class="p-4 bg-slate-900/50 rounded-xl border border-slate-700">
              <p class="text-xs font-mono text-slate-400">Defined as the `slice` field on each shape in SHAPE_LIBRARY (shapes.ts)</p>
            </div>
            <div class="pt-2">
              <p class="text-sm text-slate-500 leading-relaxed mb-2">M3Shape uses the same <span class="text-white font-mono">stretch</span> prop:</p>
              <div class="flex items-end gap-3">
                <div class="w-[80px] h-[80px]">
                  <M3Shape shape="circle" color="accent" :stretch="true" />
                </div>
                <div class="w-[160px] h-[80px]">
                  <M3Shape shape="circle" color="accent" :stretch="true" />
                </div>
              </div>
            </div>
          </div>

          <!-- RIGHT: Visual Examples (2/3 width) -->
          <div class="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div v-for="s in sliceShapes" :key="s" class="flex flex-col gap-3 p-4 bg-slate-800/30 rounded-2xl border border-slate-700/30">
              <div class="flex items-end gap-3">
                <div class="w-[80px] h-[80px] flex-shrink-0">
                  <SimpleSquare :shape="s" color="accent" :stretch="true" />
                </div>
                <div class="w-[160px] h-[80px] flex-shrink-0">
                  <SimpleSquare :shape="s" color="accent" :stretch="true" />
                </div>
              </div>
              <p class="text-xs text-slate-400 font-mono">shape="{{ s }}" (1:1 → 2:1)</p>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 5: Full Shape Catalog -->
      <section class="flex flex-col gap-6">
        <div class="flex w-full justify-start">
          <h2 class="text-sm text-slate-400 uppercase tracking-widest text-left">Full Shape Catalog</h2>
        </div>
        <div class="w-full overflow-hidden rounded-3xl border border-slate-700/50 bg-slate-800/50">
          <table class="w-full text-left border-collapse">
            <thead class="bg-slate-800 text-slate-400 text-xs uppercase tracking-tighter border-b border-slate-700">
              <tr>
                <th class="px-6 py-3 font-medium">Preview</th>
                <th class="px-6 py-3 font-medium">Shape ID</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-700/50">
              <tr v-for="shape in allShapes" :key="shape.id" class="hover:bg-slate-700/30 transition-colors group">
                <td class="px-6 py-3">
                  <div v-if="shape.slice" class="flex items-center gap-3 py-1">
                    <div class="w-8 h-8 flex-shrink-0">
                      <SimpleSquare :shape="shape.id" color="accent" :stretch="false"/>
                    </div>
                    <div class="w-[32px] h-[64px] flex-shrink-0">
                      <SimpleSquare :shape="shape.id" color="accent" :stretch="true"/>
                    </div>
                    <div class="w-[64px] h-[32px] flex-shrink-0">
                      <SimpleSquare :shape="shape.id" color="accent" :stretch="true"/>
                    </div>
                  </div>
                  <div v-else class="w-8 h-8 flex items-center justify-center">
                    <SimpleSquare :shape="shape.id" color="accent" :stretch="false"/>
                  </div>
                </td>
                <td class="px-6 py-3 font-mono text-sm text-slate-300">{{ shape.id }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- SECTION 6: Morphing (Resize) -->
      <section class="flex flex-col gap-6">
        <div class="flex w-full justify-start">
          <h2 class="text-sm text-slate-400 uppercase tracking-widest text-left">Morphing (Resize)</h2>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <!-- LEFT: Description + controls (1/3 width) -->
          <div class="lg:col-span-1 flex flex-col justify-start gap-6">
            <p class="text-xl text-slate-300 leading-relaxed">
              When a container resizes, shapes animate to their new size instead of jumping.
            </p>
            <p class="text-lg text-slate-400 leading-relaxed">
              Both the corner-radius surface and 9-slice shapes morph smoothly — corners stay fixed while the edges and center stretch.
            </p>
            <div class="flex flex-col gap-5 p-4 bg-slate-900/50 rounded-xl border border-slate-700">
              <label class="flex flex-col gap-2 text-sm text-slate-400">
                <span>Width <span class="font-mono text-slate-200">{{ demoW }}px</span></span>
                <input v-model.number="demoW" type="range" min="80" max="400" step="10" class="accent-cyan-400" />
              </label>
              <label class="flex flex-col gap-2 text-sm text-slate-400">
                <span>Height <span class="font-mono text-slate-200">{{ demoH }}px</span></span>
                <input v-model.number="demoH" type="range" min="40" max="200" step="10" class="accent-cyan-400" />
              </label>
            </div>
          </div>

          <!-- RIGHT: Live examples (2/3 width) -->
          <div class="lg:col-span-2 flex flex-col gap-6">
            <div class="flex flex-col gap-2 p-4 bg-slate-800/30 rounded-2xl border border-slate-700/30">
              <p class="text-[10px] text-slate-400 italic">Corner radius — :radius="'FULL'" :stretch="true"</p>
              <div class="flex items-center justify-center bg-slate-900/50 rounded-xl p-10">
                <div :style="{ width: demoW + 'px', height: demoH + 'px' }">
                  <SimpleSquare :radius="'FULL'" color="accent" :stretch="true" />
                </div>
              </div>
            </div>
            <div class="flex flex-col gap-2 p-4 bg-slate-800/30 rounded-2xl border border-slate-700/30">
              <p class="text-[10px] text-slate-400 italic">9-slice shape — shape="circle" :stretch="true"</p>
              <div class="flex items-center justify-center bg-slate-900/50 rounded-xl p-10">
                <div :style="{ width: demoW + 'px', height: demoH + 'px' }">
                  <SimpleSquare shape="circle" color="accent" :stretch="true" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 7: Shape Morphing -->
      <section class="flex flex-col gap-6">
        <div class="flex w-full justify-start">
          <h2 class="text-sm text-slate-400 uppercase tracking-widest text-left">Shape Morphing</h2>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div class="lg:col-span-1 flex flex-col justify-start gap-6">
            <p class="text-xl text-slate-300 leading-relaxed">
              Shapes morph into one another when the <span class="font-mono text-slate-200">shape</span> prop changes.
            </p>
            <p class="text-lg text-slate-400 leading-relaxed">
              This loops <span class="font-mono text-slate-200">soft-boom → boom → soft-boom</span> every second using the same GSAP path morph that drives radius changes.
            </p>
            <div class="p-4 bg-slate-900/50 rounded-xl border border-slate-700">
              <p class="text-xs font-mono text-slate-400">Current: shape="{{ morphShape }}"</p>
            </div>
          </div>
          <div class="lg:col-span-2 flex items-center justify-center p-8 bg-slate-800/30 rounded-2xl border border-slate-700/30">
            <div class="w-[160px] h-[160px]">
              <SimpleSquare :shape="morphShape" color="accent" :stretch="false" />
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import SimpleSquare from '@/components/atoms/SimpleSquare.vue'
import M3Shape from '@/components/atoms/M3Shape.vue'
import { CORNER_RADIUS, CORNER_RADIUS_LABELS } from '@/constants/corners'
import { SHAPE_LIBRARY } from '@/constants/shapes'

const cornerValues = CORNER_RADIUS;
const labels = CORNER_RADIUS_LABELS;

const allShapes = computed(() => {
  return Object.keys(SHAPE_LIBRARY).map((id) => ({ id, slice: !!SHAPE_LIBRARY[id].slice }));
});

const sliceShapes = computed(() => ['circle', 'slanted', 'square', 'arch', 'semicircle', 'oval', 'pill'].filter((id) => SHAPE_LIBRARY[id]?.slice));

const demoW = ref(200);
const demoH = ref(100);

const morphShapes = ['soft-boom', 'boom'] as const;
const morphIndex = ref(0);
const morphShape = computed(() => morphShapes[morphIndex.value]);
let morphTimer: ReturnType<typeof setInterval> | null = null;
onMounted(() => {
  // 1s hold as each shape + 0.6s morph (matching SimpleSquare's morph duration)
  morphTimer = setInterval(() => {
    morphIndex.value = (morphIndex.value + 1) % morphShapes.length;
  }, 1600);
});
onUnmounted(() => {
  if (morphTimer) clearInterval(morphTimer);
});
</script>
