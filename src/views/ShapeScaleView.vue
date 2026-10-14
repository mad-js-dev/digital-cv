<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-12 text-slate-900 dark:text-slate-100">
    <div class="max-w-5xl mx-auto">
      <!-- Header -->
      <header class="mb-16 text-center">
        <h1 class="text-4xl md:text-6xl font-bold mb-4 tracking-tight">Corner Radius Scale</h1>
        <p class="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          A practical way to think about softness in UI: useful for some forms, misleading for others.
        </p>
      </header>

      <!-- Concept Grid -->
      <section class="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
        <div class="space-y-6">
          <h2 class="text-2xl font-semibold border-l-4 border-[var(--color-accent)] pl-4">What it is good for</h2>
          <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
            Corner radius is most successful when the form is already close to a rectangle or a soft geometric container. It helps reduce harshness, create hierarchy, and make controls feel approachable.
          </p>
          <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
            A square, a pill, or a rounded container gains clarity from the same principles as Material 3: small radii feel precise, medium radii feel modern, and large radii feel friendly and calm.
          </p>

          <div class="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 class="font-bold text-sm uppercase tracking-widest text-slate-400">Useful ranges</h3>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                <span>0–8 → crisp / technical</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-slate-400 dark:bg-slate-600"></span>
                <span>8–18 → refined / balanced</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-slate-500 dark:bg-slate-500"></span>
                <span>18–32 → soft / friendly</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-[var(--color-accent)]"></span>
                <span>32–50 → highly organic</span>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-slate-100 dark:bg-slate-900 rounded-3xl p-8 flex flex-col items-center justify-center border border-slate-200 dark:border-slate-800">
          <M3Shape shape="square" :radius="18" size="200" color="accent" />
          <p class="mt-6 font-mono text-xs text-slate-400">RADIUS_SCALE: MEDIUM</p>
        </div>
      </section>

      <!-- Demonstration Matrix -->
      <section class="mb-24">
        <h2 class="text-2xl font-semibold mb-8 text-center">Radius Scale on a Square</h2>
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="text-slate-400 text-xs uppercase tracking-widest">
                <th class="p-4">Shape</th>
                <th class="p-4">0</th>
                <th class="p-4">Small</th>
                <th class="p-4">Medium</th>
                <th class="p-4">Large</th>
                <th class="p-4">Full</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
              <tr>
                <td class="p-4 font-medium capitalize">square</td>
                <td class="p-4"><M3Shape shape="square" :radius="0" size="40" /></td>
                <td class="p-4"><M3Shape shape="square" :radius="8" size="40" /></td>
                <td class="p-4"><M3Shape shape="square" :radius="18" size="40" /></td>
                <td class="p-4"><M3Shape shape="square" :radius="32" size="40" /></td>
                <td class="p-4"><M3Shape shape="square" :radius="50" size="40" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Symmetry -->
      <section class="mb-24 space-y-6">
        <h2 class="text-2xl font-semibold border-l-4 border-[var(--color-accent)] pl-4">Symmetry</h2>
        <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
          Components can have either symmetric or asymmetric corner shapes. Symmetric shapes use the same value for all corners, while asymmetric shapes allow different values for each corner.
        </p>
        <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
          Both forms use the same 10-step scale. The difference is not in the scale itself, but in how the corners are assigned across the component. In Material 3, asymmetry is particularly useful for closely grouped items such as menus and split buttons, where the inner corners are adjusted to feel visually connected.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
            <p class="text-xs uppercase tracking-[0.2em] text-slate-400 mb-4">Symmetric</p>
            <div class="flex items-center justify-center gap-4">
              <div class="flex-1">
                <M3Shape 
                  shape="rounded" 
                  :radius="12" 
                  width="100%" 
                  height="32" 
                  :stretch="true" 
                ><div class="mx-6">Button</div></M3Shape>

              </div>

              <div class="flex-1">
                <M3Shape shape="square" :radius="8" :size="32" color="accent"> Pill </M3Shape>
              </div>
              <div class="flex-1">
                <M3Shape shape="square" :radius="32" :size="72" color="accent" />
              </div>
            </div>
          </div>

          <div class="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 p-6">
            <p class="text-xs uppercase tracking-[0.2em] text-slate-400 mb-4">Asymmetric</p>
            <div class="flex items-center justify-center gap-4">
              <M3Shape :corners="[0, 18, 18, 0]" shape="square" :size="72" color="slate" />
              <M3Shape :corners="[18, 18, 0, 0]" shape="square" :size="72" color="accent" />
              <M3Shape :corners="[0, 0, 18, 18]" shape="square" :size="72" color="slate" />
            </div>
          </div>
        </div>
      </section>

      <!-- UI Examples -->
      <section class="mb-24 space-y-8">
        <h2 class="text-2xl font-semibold border-l-4 border-[var(--color-accent)] pl-4">Button and grouped control geometry</h2>

        <div class="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
          <p class="text-xs uppercase tracking-[0.2em] text-slate-400 mb-5">Single button</p>
          <div class="flex items-center justify-center">
            <M3Shape shape="square" :width="300" :height="86" :radius="20" color="accent" />
          </div>
        </div>

        <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div class="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
            <p class="text-xs uppercase tracking-[0.2em] text-slate-400 mb-5">Split button</p>
            <div class="flex items-center justify-center gap-1">
              <M3Shape shape="square" :width="140" :height="82" :corners="[50, 8, 50, 8]" color="accent" />
              <M3Shape shape="square" :width="140" :height="82" :corners="[8, 50, 8, 50]" color="slate" />
            </div>
          </div>

          <div class="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 p-6">
            <p class="text-xs uppercase tracking-[0.2em] text-slate-400 mb-5">Vertical buttons</p>
            <div class="flex flex-col items-center justify-center gap-1">
              <M3Shape shape="square" :width="170" :height="56" :corners="[50, 50, 8, 8]" color="accent" />
              <M3Shape shape="square" :width="170" :height="56" :corners="[8, 8, 8, 8]" color="slate" />
              <M3Shape shape="square" :width="170" :height="56" :corners="[8, 8, 50, 50]" color="accent" />
            </div>
          </div>
        </div>

        <div class="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-4 text-sm text-slate-600 dark:text-slate-400 bg-slate-100/60 dark:bg-slate-900/60">
          <span class="font-medium text-slate-800 dark:text-slate-200">Reference:</span>
          <a
            href="https://m3.material.io/styles/shape/corner-radius-scale"
            target="_blank"
            rel="noreferrer"
            class="ml-2 text-[var(--color-accent)] underline underline-offset-4"
          >
            Material 3 Corner Radius Scale
          </a>
        </div>
      </section>

      <!-- Limitations -->
      <section class="space-y-6">
        <h2 class="text-2xl font-semibold border-l-4 border-slate-400 pl-4">Where it stops making sense</h2>
        <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
          Radius is not a universal treatment. It works best where the silhouette is already a container, but it becomes artificial for expressive shapes such as triangles, spikes, starbursts, or highly directional forms.
        </p>
        <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
          A triangle with a large radius can feel like it is trying to become a circle. A flower, a burst, or a sharp fan loses its read as a distinct form if every edge is softened the same way. In those cases, the scale should be used sparingly or not at all.
        </p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import M3Shape from '@/components/atoms/M3Shape.vue'
</script>
