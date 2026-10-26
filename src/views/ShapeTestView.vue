<template>
  <div class="min-h-screen bg-slate-100 text-slate-900 p-8 flex flex-col items-center gap-12 transition-colors duration-300">
    <h1 class="text-3xl font-bold text-slate-900">M3Shape Playground</h1>
    
    <div class="w-full max-w-6xl space-y-16">
      <!-- SECTION 1: Global Radius Scale -->
      <section class="flex flex-col gap-6">
        <div class="flex w-full justify-start">
          <h2 class="text-sm text-slate-500 uppercase tracking-widest text-left">Corner radius scale</h2>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <!-- Gallery (2/3 width) -->
          <div class="lg:col-span-2 flex flex-col gap-1 p-4 bg-slate-200/50 rounded-3xl border border-slate-300/50">
            <div 
              v-for="(value, token) in cornerValues" 
              :key="token" 
              class="flex items-center gap-6 py-2 px-6 rounded-2xl transition-colors hover:bg-slate-200/50"
            >
              <div class="w-[231px] h-[77px] flex-shrink-0 flex items-center justify-center">
                <Shape 
                  :radius="token" 
                  color="primary" 
                  :stretch="false"
                />
              </div>
              <div class="flex flex-col gap-1">
                <p class="text-lg font-bold text-slate-900">
                  {{ token }} 
                  <span class="text-sm font-normal text-slate-500 ml-1">
                    ({{ typeof value === 'number' ? value + 'px' : 'Full' }})
                  </span>
                </p>
                <p class="text-sm text-slate-600 leading-tight">{{ labels[token] }}</p>
              </div>
            </div>
          </div>
          <!-- Description (1/3 width) -->
          <div class="lg:col-span-1 flex flex-col justify-start gap-6">
            <p class="text-xl text-slate-600 leading-relaxed">
              The Material 3 shape system uses a size-based scale with ten styles. 
              Styles are assigned to components based on the desired amount of roundedness.
            </p>
            <div class="p-4 bg-amber-500/10 rounded-2xl border border-amber-500/20">
              <p class="text-sm text-amber-700/80 leading-relaxed">
                <span class="font-bold text-amber-600">Important:</span> Avoid applying larger tokens to elements smaller than the radius value to avoid unexpected clamping.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 2: Symmetry -->
      <section class="flex flex-col gap-6">
        <div class="flex w-full justify-start">
          <h2 class="text-sm text-slate-500 uppercase tracking-widest text-left">Symmetry</h2>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <!-- LEFT: Description (1/3 width) -->
          <div class="lg:col-span-1 flex flex-col justify-start gap-6">
            <div class="space-y-4">
              <p class="text-xl text-slate-600 leading-relaxed">
                Components can have either symmetric or asymmetric corner shapes. Symmetric shapes have the same values for all corners, while asymmetric shapes can have corners with different values.
              </p>
              <p class="text-lg text-slate-500 leading-relaxed">
                Both symmetric and asymmetric shapes use the same 10-step scale.
              </p>
              <p class="text-lg text-slate-500 leading-relaxed">
                Asymmetrical shapes are used in M3 components with closely-grouped items, such as menus and split buttons. These are called inner corners.
              </p>
            </div>
            
            <div class="pt-4 space-y-4">
              <p class="text-sm text-slate-500 leading-relaxed">
                The component also accepts an <span class="text-slate-900 font-mono">[TL, TR, BR, BL]</span> array for independent corner radius management by either tokens or raw pixel values.
              </p>
              <div class="p-4 bg-slate-100 rounded-xl border border-slate-300">
                <p class="text-xs font-mono text-slate-600">
                  Example: :radius="['L', 'NONE', 'L', 'NONE']"
                </p>
              </div>
            </div>

            <div class="pt-4 space-y-4">
              <p class="text-sm text-slate-500 leading-relaxed">
                The <span class="text-slate-900 font-mono">stretch</span> prop controls how radii relate to the container. With <span class="text-slate-900 font-mono">stretch="true"</span> (default) the shape fills its container and radii are measured against its real dimensions — so <span class="text-slate-900 font-mono">FULL</span> is a circle in a square but a pill in a rectangle.
              </p>
              <p class="text-sm text-slate-500 leading-relaxed">
                With <span class="text-slate-900 font-mono">stretch="false"</span> the shape is drawn on a fixed 100×100 grid and scaled uniformly, keeping radii proportional to the shape instead of the container.
              </p>
              <div class="p-4 bg-slate-100 rounded-xl border border-slate-300">
                <p class="text-xs font-mono text-slate-600">
                  Example: :stretch="false"
                </p>
              </div>
            </div>
          </div>

          <!-- RIGHT: Visual Examples (2/3 width) -->
          <div class="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Square Case (1:1) -->
            <div class="flex flex-col gap-4 p-6 bg-slate-200/30 rounded-2xl border border-slate-300/30">
              <p class="text-xs font-bold text-slate-600 uppercase mb-2">Square (1:1)</p>
              <div class="flex flex-col gap-6">
                <div class="flex flex-col items-center gap-2">
                  <div class="w-[100px] h-[100px]">
                    <Shape :radius="'S'" color="primary" :stretch="true" />
                  </div>
                  <p class="text-[10px] font-mono text-slate-500">Symmetric ('S')</p>
                </div>
                <div class="flex flex-col items-center gap-2">
                  <div class="w-[100px] h-[100px]">
                    <Shape :radius="['S', 'NONE', 'S', 'NONE']" color="primary" :stretch="true" />
                  </div>
                  <p class="text-[10px] font-mono text-slate-500">Asymmetric (S, NONE, S, NONE)</p>
                </div>
              </div>
            </div>

            <!-- Rectangle Case (2:1) -->
            <div class="flex flex-col gap-4 p-6 bg-slate-200/30 rounded-2xl border border-slate-300/30">
              <p class="text-xs font-bold text-slate-600 uppercase mb-2">Rectangle (2:1)</p>
              <div class="flex flex-col gap-6">
                <div class="flex flex-col items-center gap-2">
                  <div class="w-[200px] h-[100px]">
                    <Shape :radius="'S'" color="primary" :stretch="true" />
                  </div>
                  <p class="text-[10px] font-mono text-slate-500">Symmetric ('S')</p>
                </div>
                <div class="flex flex-col items-center gap-2">
                  <div class="w-[200px] h-[100px]">
                    <Shape :radius="['S', 'NONE', 'S', 'NONE']" color="primary" :stretch="true" />
                  </div>
                  <p class="text-[10px] font-mono text-slate-500">Asymmetric (S, NONE, S, NONE)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 3: Artistic Shapes -->
      <section class="flex flex-col gap-6">
        <div class="flex w-full justify-start">
          <h2 class="text-sm text-slate-500 uppercase tracking-widest text-left">Artistic Shapes</h2>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <!-- LEFT: Description (1/3 width) -->
          <div class="lg:col-span-1 flex flex-col justify-start gap-6">
            <div class="space-y-4">
              <p class="text-xl text-slate-600 leading-relaxed">
                Beyond surfaces, the component supports a library of artistic shapes. 
              </p>
              <p class="text-lg text-slate-500 leading-relaxed">
                These shapes are high-fidelity SVG paths covering a range of geometric and organic forms.
              </p>
            </div>
          </div>

          <!-- RIGHT: Visual Examples (2/3 width) -->
          <div class="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-6">
            <div class="flex flex-col items-center gap-2 p-4 bg-slate-200/30 rounded-2xl border border-slate-300/30">
              <div class="w-[120px] h-[120px] flex items-center justify-center">
                <Shape :shape="'circle'" color="primary" :stretch="true"/>
              </div>
              <p class="text-xs text-slate-500 font-mono">shape="circle"</p>
            </div>
            <div class="flex flex-col items-center gap-2 p-4 bg-slate-200/30 rounded-2xl border border-slate-300/30">
              <div class="w-[120px] h-[120px] flex items-center justify-center">
                <Shape shape="square" color="primary"/>
              </div>
              <p class="text-xs text-slate-500 font-mono">shape="square"</p>
            </div>
            <div class="flex flex-col items-center gap-2 p-4 bg-slate-200/30 rounded-2xl border border-slate-300/30">
              <div class="w-[120px] h-[120px] flex items-center justify-center">
                 <Shape shape="heart" color="primary"/>
              </div>
              <p class="text-xs text-slate-500 font-mono">shape="heart"</p>
            </div>
            <div class="flex flex-col items-center gap-2 p-4 bg-slate-200/30 rounded-2xl border border-slate-300/30">
              <div class="w-[120px] h-[120px] flex items-center justify-center">
                <Shape shape="flower" color="primary"/>
              </div>
              <p class="text-xs text-slate-500 font-mono">shape="flower"</p>
            </div>
            <div class="flex flex-col items-center gap-2 p-4 bg-slate-200/30 rounded-2xl border border-slate-300/30">
              <div class="w-[120px] h-[120px] flex items-center justify-center">
                <Shape shape="gem" color="primary" />
              </div>
              <p class="text-xs text-slate-500 font-mono">shape="gem"</p>
            </div>
            <div class="flex flex-col items-center gap-2 p-4 bg-slate-200/30 rounded-2xl border border-slate-300/30">
              <div class="w-[120px] h-[120px] flex items-center justify-center">
                <Shape shape="sunny" color="primary" />
              </div>
              <p class="text-xs text-slate-500 font-mono">shape="sunny"</p>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 4: 9-Slice Scaling -->
      <section class="flex flex-col gap-6">
        <div class="flex w-full justify-start">
          <h2 class="text-sm text-slate-500 uppercase tracking-widest text-left">9-Slice Scaling</h2>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <!-- LEFT: Description (1/3 width) -->
          <div class="lg:col-span-1 flex flex-col justify-start gap-6">
            <p class="text-xl text-slate-600 leading-relaxed">
              Rectangular-ish shapes can stretch to fill a container without distorting their corners.
            </p>
            <p class="text-lg text-slate-500 leading-relaxed">
              Each sliceable shape declares four insets (fractions of its bounding box) that carve it into a 3×3 grid. When stretched, the four corners stay fixed while the edges and center scale to fit.
            </p>
            <div class="p-4 bg-slate-100 rounded-xl border border-slate-300">
              <p class="text-xs font-mono text-slate-600">Defined as the `slice` field on each shape in SHAPE_LIBRARY (shapes.ts)</p>
            </div>
            <div class="pt-2">
              <p class="text-sm text-slate-500 leading-relaxed mb-2">SimpleSquare uses the same <span class="text-slate-900 font-mono">stretch</span> prop:</p>
              <div class="flex items-end gap-3">
                <div class="w-[80px] h-[80px]">
                  <Shape shape="circle" color="primary" :stretch="true" />
                </div>
                <div class="w-[160px] h-[80px]">
                  <Shape shape="circle" color="primary" :stretch="true" />
                </div>
              </div>
            </div>
          </div>

          <!-- RIGHT: Visual Examples (2/3 width) -->
          <div class="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div v-for="s in sliceShapes" :key="s" class="flex flex-col gap-3 p-4 bg-slate-200/30 rounded-2xl border border-slate-300/30">
              <div class="flex items-end gap-3">
                <div class="w-[80px] h-[80px] flex-shrink-0">
                  <Shape :shape="s" color="primary" :stretch="true" />
                </div>
                <div class="w-[160px] h-[80px] flex-shrink-0">
                  <Shape :shape="s" color="primary" :stretch="true" />
                </div>
              </div>
              <p class="text-xs text-slate-500 font-mono">shape="{{ s }}" (1:1 → 2:1)</p>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 5: Full Shape Catalog -->
      <section class="flex flex-col gap-6">
        <div class="flex w-full justify-start">
          <h2 class="text-sm text-slate-500 uppercase tracking-widest text-left">Full Shape Catalog</h2>
        </div>
        <div class="w-full overflow-hidden rounded-3xl border border-slate-300/50 bg-slate-200/50">
          <table class="w-full text-left border-collapse">
            <thead class="bg-slate-200 text-slate-600 text-xs uppercase tracking-tighter border-b border-slate-300">
              <tr>
                <th class="px-6 py-3 font-medium">Preview</th>
                <th class="px-6 py-3 font-medium">Shape ID</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-300/50">
              <tr v-for="shape in allShapes" :key="shape.id" class="hover:bg-slate-300/30 transition-colors group">
                <td class="px-6 py-3">
                  <div v-if="shape.slice" class="flex items-center gap-3 py-1">
                    <div class="w-8 h-8 flex-shrink-0">
                      <Shape :shape="shape.id" color="primary" :stretch="false"/>
                    </div>
                    <div class="w-[32px] h-[64px] flex-shrink-0">
                      <Shape :shape="shape.id" color="primary" :stretch="true"/>
                    </div>
                    <div class="w-[64px] h-[32px] flex-shrink-0">
                      <Shape :shape="shape.id" color="primary" :stretch="true"/>
                    </div>
                  </div>
                  <div v-else class="w-8 h-8 flex items-center justify-center">
                    <Shape :shape="shape.id" color="primary" :stretch="false"/>
                  </div>
                </td>
                <td class="px-6 py-3 font-mono text-sm text-slate-700">{{ shape.id }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- SECTION 6: Morphing (Resize) -->
      <section class="flex flex-col gap-6">
        <div class="flex w-full justify-start">
          <h2 class="text-sm text-slate-500 uppercase tracking-widest text-left">Morphing (Resize)</h2>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <!-- LEFT: Description + controls (1/3 width) -->
          <div class="lg:col-span-1 flex flex-col justify-start gap-6">
            <p class="text-xl text-slate-600 leading-relaxed">
              When a container resizes, shapes animate to their new size instead of jumping.
            </p>
            <p class="text-lg text-slate-500 leading-relaxed">
              Both the corner-radius surface and 9-slice shapes morph smoothly — corners stay fixed while the edges and center stretch.
            </p>
            <div class="flex flex-col gap-5 p-4 bg-slate-100 rounded-xl border border-slate-300">
              <label class="flex flex-col gap-2 text-sm text-slate-500">
                <span>Width <span class="font-mono text-slate-900">{{ demoW }}px</span></span>
                <input v-model.number="demoW" type="range" min="80" max="400" step="10" class="accent-cyan-400" />
              </label>
              <label class="flex flex-col gap-2 text-sm text-slate-500">
                <span>Height <span class="font-mono text-slate-900">{{ demoH }}px</span></span>
                <input v-model.number="demoH" type="range" min="40" max="200" step="10" class="accent-cyan-400" />
              </label>
            </div>
          </div>

          <!-- RIGHT: Live examples (2/3 width) -->
          <div class="lg:col-span-2 flex flex-col gap-6">
            <div class="flex flex-col gap-2 p-4 bg-slate-200/30 rounded-2xl border border-slate-300/30">
              <p class="text-[10px] text-slate-500 italic">Corner radius — :radius="'FULL'" :stretch="true"</p>
              <div class="flex items-center justify-center bg-slate-100 rounded-xl p-10">
                <div :style="{ width: demoW + 'px', height: demoH + 'px' }">
                  <Shape :radius="'FULL'" color="primary" :stretch="true" />
                </div>
              </div>
            </div>
            <div class="flex flex-col gap-2 p-4 bg-slate-200/30 rounded-2xl border border-slate-300/30">
              <p class="text-[10px] text-slate-500 italic">9-slice shape — shape="circle" :stretch="true"</p>
              <div class="flex items-center justify-center bg-slate-100 rounded-xl p-10">
                <div :style="{ width: demoW + 'px', height: demoH + 'px' }">
                  <Shape shape="circle" color="primary" :stretch="true" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 7: Morphing (Inter-Shape) -->
      <section class="flex flex-col gap-6">
        <div class="flex w-full justify-start">
          <h2 class="text-sm text-slate-500 uppercase tracking-widest text-left">Morphing (Inter-Shape)</h2>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <!-- LEFT: Description (1/3 width) -->
          <div class="lg:col-span-1 flex flex-col justify-start gap-6">
            <p class="text-xl text-slate-600 leading-relaxed">
              Shapes can morph into one another using path interpolation.
            </p>
            <p class="text-lg text-slate-500 leading-relaxed">
              This allows for organic transitions between symmetric corners, asymmetric corners, and complex artistic shapes.
            </p>
            <div class="p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
              <p class="text-sm text-indigo-700/80 leading-relaxed">
                Using <span class="font-bold text-indigo-600">flubber</span> for smooth, high-fidelity path morphing.
              </p>
            </div>
          </div>

          <!-- RIGHT: Interactive Demos (2/3 width) -->
          <div class="lg:col-span-2 flex flex-col gap-8">
            <!-- Corner Morph -->
            <div class="flex flex-col gap-4 p-6 bg-slate-200/30 rounded-2xl border border-slate-300/30">
              <div class="flex items-center justify-between">
                <p class="text-xs font-bold text-slate-600 uppercase">Corner Morph: Symmetric S $\leftrightarrow$ FULL</p>
                <button @click="toggleCornerMorph" class="px-3 py-1 text-[10px] font-bold bg-slate-900 text-white rounded-full hover:opacity-80 transition-opacity">
                  Toggle Radius
                </button>
              </div>
              <div class="flex items-center justify-center bg-slate-100 rounded-xl p-6">
                <div class="w-[200px] h-[80px]">
                  <Shape :radius="currentCornerMorph" color="primary" :stretch="false" />
                </div>
              </div>
              <p class="text-[10px] font-mono text-center text-slate-500">
                Current: {{ currentCornerMorph }}
              </p>
            </div>

            <!-- Asymmetric Morph -->
            <div class="flex flex-col gap-4 p-6 bg-slate-200/30 rounded-2xl border border-slate-300/30">
              <div class="flex items-center justify-between">
                <p class="text-xs font-bold text-slate-600 uppercase">Asymmetric Morph: Left Side Only</p>
                <button @click="toggleAsymMorph" class="px-3 py-1 text-[10px] font-bold bg-slate-900 text-white rounded-full hover:opacity-80 transition-opacity">
                  Toggle Left
                </button>
              </div>
              <div class="flex items-center justify-center bg-slate-100 rounded-xl p-6">
                <div class="w-[200px] h-[80px]">
                  <Shape :radius="currentAsymMorph" color="primary" :stretch="false" />
                </div>
              </div>
              <p class="text-[10px] font-mono text-center text-slate-500">
                Current: {{ currentAsymMorph }}
              </p>
            </div>

            <!-- Shape Morph -->
            <div class="flex flex-col gap-4 p-6 bg-slate-200/30 rounded-2xl border border-slate-300/30">
              <div class="flex items-center justify-between">
                <p class="text-xs font-bold text-slate-600 uppercase">Shape Morph: Soft-Boom $\leftrightarrow$ Boom</p>
                <button @click="toggleShapeMorph" class="px-3 py-1 text-[10px] font-bold bg-slate-900 text-white rounded-full hover:opacity-80 transition-opacity">
                  Toggle Shape
                </button>
              </div>
              <div class="flex items-center justify-center bg-slate-100 rounded-xl p-6">
                <div class="w-[120px] h-[120px]">
                  <Shape :shape="currentShapeMorph" color="primary" :stretch="false" />
                </div>
              </div>
              <p class="text-[10px] font-mono text-center text-slate-500">
                Current: {{ currentShapeMorph }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 8: Elevation Showcase -->
      <section class="flex flex-col gap-6">
        <div class="flex w-full justify-start">
          <h2 class="text-sm text-slate-500 uppercase tracking-widest text-left">Elevation Showcase</h2>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div class="lg:col-span-1 flex flex-col justify-start gap-6">
            <p class="text-xl text-slate-600 leading-relaxed">
              Elevation in M3 combines a shadow (depth) with a tonal shift (brightness).
            </p>
            <div class="p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
              <p class="text-sm text-indigo-700/80 leading-relaxed">
                Shadows follow the shape's geometry perfectly. Surface color lightens as elevation increases.
              </p>
            </div>
          </div>
          <div class="lg:col-span-2 flex flex-col gap-8">
            <!-- Color Rows -->
            <div v-for="role in ['primary', 'secondaryContainer', 'surface', 'surfaceVariant']" :key="role" class="flex items-center gap-6">
              <div class="w-32 text-right">
                <p class="text-xs font-mono text-slate-500 uppercase">{{ role }}</p>
              </div>
              <div class="flex gap-6">
                <div v-for="lvl in ['level0', 'level1', 'level2', 'level3', 'level4']" :key="lvl" class="flex flex-col items-center gap-2">
                  <div class="w-16 h-16 flex items-center justify-center">
                    <Shape :elevation="lvl" :color="role" :radius="20" />
                  </div>
                  <p class="text-[9px] text-slate-400 font-mono">{{ lvl }}</p>
                </div>
              </div>
            </div>
            
            <!-- Tonal Value Row -->
            <div class="flex items-center gap-6 pt-6 border-t border-slate-300">
              <div class="w-32 text-right">
                <p class="text-xs font-bold text-slate-600 uppercase">Tonal Value</p>
              </div>
              <div class="flex gap-6">
                <div v-for="lvl in ['level0', 'level1', 'level2', 'level3', 'level4']" :key="lvl" class="flex flex-col items-center gap-2">
                  <div class="w-16 h-16 flex items-center justify-center">
                    <Shape :elevation="lvl" color="surface" :radius="20" />
                  </div>
                  <p class="text-[9px] text-slate-400 font-mono">Tint {{ lvl }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import Shape from '@/components/atoms/M3Shape/Shape.vue'
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

const currentCornerMorph = ref('S');
const toggleCornerMorph = () => {
  currentCornerMorph.value = currentCornerMorph.value === 'S' 
    ? 'FULL' 
    : 'S';
};

const currentAsymMorph = ref(['XS', 'XS', 'XS', 'XS']);
const toggleAsymMorph = () => {
  currentAsymMorph.value = currentAsymMorph.value[0] === 'XS' 
    ? ['FULL', 'FULL', 'XS', 'XS'] 
    : ['XS', 'XS', 'XS', 'XS'];
};

const currentShapeMorph = ref('soft-boom');
const toggleShapeMorph = () => {
  currentShapeMorph.value = currentShapeMorph.value === 'soft-boom' 
    ? 'boom' 
    : 'soft-boom';
};

const morphShapes = Object.keys(SHAPE_LIBRARY);
const morphIndex = ref(0);
let morphTimer: ReturnType<typeof setInterval> | null = null;
onMounted(() => {
  morphTimer = setInterval(() => {
    morphIndex.value = (morphIndex.value + 1) % morphShapes.length;
  }, 2600);
});
onUnmounted(() => {
  if (morphTimer) clearInterval(morphTimer);
});
</script>
