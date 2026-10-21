<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 p-8 flex-col items-center gap-12">
    <header class="text-center max-w-3xl">
      <h1 class="text-4xl font-bold tracking-tight mb-4">M3Surface Master Showcase</h1>
      <p class="text-lg text-slate-600 leading-relaxed">
        The <span class="font-mono font-bold text-indigo-600">M3Surface</span> is a content-first wrapper implementing the full Material 3 specification. 
        This showcase guides you from individual manual properties to the automated profile system.
      </p>
    </header>

    <div class="w-full max-w-6xl space-y-20">
      
      <!-- GROUP 1: Component Properties -->
      <div class="flex flex-col gap-12 border-l-4 border-indigo-500 pl-8 py-2">
        <div class="flex flex-col gap-2">
          <h2 class="text-3xl font-black uppercase tracking-tighter text-slate-800">Component Properties</h2>
          <p class="text-slate-500 max-w-2xl">
            Before exploring automated profiles, here is a breakdown of the individual properties that control the surface's appearance. 
            These can be set manually for specialized components.
          </p>
        </div>

        <!-- SECTION 1: Corner Radius & Geometry -->
        <section class="flex flex-col gap-8">
          <div class="flex flex-col gap-2">
            <h3 class="text-xl font-bold uppercase tracking-widest text-slate-500">1. Corner Radius & Geometry</h3>
            <p class="text-slate-600">The most basic property. Surfaces can be set to standard M3 tokens, asymmetric arrays, or custom numeric values.</p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div v-for="r in ['S', 'M', 'L', 'FULL']" :key="r" class="flex flex-col gap-4 items-center">
              <M3Surface :radius="r" color="primary" class="p-4">{{ r === 'FULL' ? 'Full (Pill)' : r }}</M3Surface>
              <span class="text-xs font-mono text-slate-400">radius="{{ r }}"</span>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
            <div class="flex flex-col gap-4 items-center p-6 bg-white rounded-2xl border border-slate-200">
              <M3Surface :radius="['M', 'FULL', 'FULL', 'M']" color="primary" class="p-6">Asymmetric (M, FULL, FULL, M)</M3Surface>
              <span class="text-xs font-mono text-slate-400">radius=["M", "FULL", "FULL", "M"]</span>
            </div>
            <div class="flex flex-col gap-4 items-center p-6 bg-white rounded-2xl border border-slate-200">
              <M3Surface :radius="[20, 0, 20, 0]" color="primary" class="p-6">Custom Numeric [20, 0, 20, 0]</M3Surface>
              <span class="text-xs font-mono text-slate-400">radius=[20, 0, 20, 0]</span>
            </div>
          </div>
        </section>

        <!-- SECTION 1.1: Corner Morphing -->
        <section class="flex flex-col gap-8">
          <div class="flex flex-col gap-2">
            <h3 class="text-xl font-bold uppercase tracking-widest text-slate-500">1.1 Corner Morphing</h3>
            <p class="text-slate-600">Because we use CSS border-radius, any change to the radius prop is smoothly interpolated by the browser.</p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="flex flex-col gap-6 p-8 bg-white rounded-3xl border border-slate-200 shadow-sm items-center">
              <h4 class="font-bold">Symmetric Transition</h4>
              <M3Surface :radius="symmetricRadius" color="primary" class="p-8 text-center font-bold transition-all duration-300">
                Symmetric Morph
              </M3Surface>
              <div class="flex flex-wrap justify-center gap-2">
                <button v-for="r in ['S', 'M', 'L', 'FULL']" :key="r" @click="symmetricRadius = r" 
                  :class="['px-3 py-1 text-xs rounded font-bold transition-colors', symmetricRadius === r ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200']">
                  {{ r }}
                </button>
              </div>
            </div>

            <div class="flex flex-col gap-6 p-8 bg-white rounded-3xl border border-slate-200 shadow-sm items-center">
              <h4 class="font-bold">Asymmetric Transition</h4>
              <M3Surface :radius="asymmetricRadius" color="primary" class="p-8 text-center font-bold transition-all duration-300">
                Asymmetric Morph
              </M3Surface>
              <div class="flex flex-wrap justify-center gap-2">
                <button @click="asymmetricRadius = ['M', 'M', 'M', 'M']" 
                  :class="['px-3 py-1 text-xs rounded font-bold transition-colors', isAsym('M','M','M','M') ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200']">
                  Square
                </button>
                <button @click="asymmetricRadius = ['M', 'FULL', 'FULL', 'M']" 
                  :class="['px-3 py-1 text-xs rounded font-bold transition-colors', isAsym('M','FULL','FULL','M') ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200']">
                  Pill-Corners
                </button>
                <button @click="asymmetricRadius = [20, 0, 20, 0]" 
                  :class="['px-3 py-1 text-xs rounded font-bold transition-colors', isAsym(20,0,20,0) ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200']">
                  Leaf Shape
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- SECTION 2: Color Control -->
        <section class="flex flex-col gap-12">
          <div class="flex flex-col gap-2">
            <h3 class="text-xl font-bold uppercase tracking-widest text-slate-500">2. Color Control</h3>
            <div class="flex flex-col gap-4">
              <p class="text-slate-600 leading-relaxed">
                Exploring the M3 color system. We organize roles by their functional palette to showcase the 
                <span class="font-bold text-indigo-600">Automatic Contrast Engine</span>.
              </p>
              <div class="p-6 bg-indigo-50 rounded-2xl border border-indigo-100 text-sm text-indigo-900 leading-relaxed">
                <strong class="block mb-2 text-indigo-700 uppercase tracking-wider text-xs">How the "Automagic" Contrast Works:</strong>
                <p class="mb-3">
                  In standard CSS, you'd have to manually pair a background color with a text color. M3 changes this by introducing 
                  <span class="font-bold">On-Roles</span>. Every surface color has a mathematically paired contrast partner.
                </p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="flex flex-col gap-1">
                    <span class="font-bold text-indigo-600">The Mapping:</span>
                    <ul class="list-disc list-inside text-xs space-y-1 opacity-80">
                      <li><code class="bg-white px-1 rounded">color="primary"</code> &rarr; resolves to <code class="bg-white px-1 rounded">onPrimary</code></li>
                      <li><code class="bg-white px-1 rounded">color="secondaryContainer"</code> &rarr; resolves to <code class="bg-white px-1 rounded">onSecondaryContainer</code></li>
                      <li><code class="bg-white px-1 rounded">color="success"</code> &rarr; resolves to <code class="bg-white px-1 rounded">onSuccess</code></li>
                    </ul>
                  </div>
                  <div class="flex flex-col gap-1">
                    <span class="font-bold text-indigo-600">The Fallback:</span>
                    <p class="text-xs opacity-80">
                      If a specific "On-Role" isn't found, the engine falls back to the generic <code class="bg-white px-1 rounded">onSurface</code> token, ensuring that text is <strong class="text-indigo-700">never</strong> invisible, regardless of the chosen background.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-12">
            <!-- Palette Groups in specific order: Brand -> Tonal -> Neutral -> Utility -> Depth -->
            <div v-for="cat in roleCategories" :key="cat.id" class="flex flex-col gap-4">
              <div class="flex flex-col gap-1">
                <h4 class="text-sm font-bold text-slate-400 uppercase tracking-wider">{{ cat.label }}</h4>
                <p class="text-xs text-slate-500">{{ cat.desc }}</p>
              </div>
              <div v-if="cat.id !== 'neutral'" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <div v-for="role in cat.roles" :key="role" class="flex flex-col gap-2">
                  <M3Surface :color="role" class="p-4 text-center font-bold truncate">
                    Sample Text
                  </M3Surface>
                  <span class="text-[10px] font-mono text-center block text-slate-400">{{ role }}</span>
                </div>
              </div>
              <div v-else class="flex flex-col gap-4">
                <div class="grid grid-cols-2 gap-4">
                  <div v-for="role in cat.roles.slice(0, 2)" :key="role" class="flex flex-col gap-2">
                    <M3Surface :color="role" class="p-4 text-center font-bold truncate">
                      Sample Text
                    </M3Surface>
                    <span class="text-[10px] font-mono text-center block text-slate-400">{{ role }}</span>
                  </div>
                </div>
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  <div v-for="role in cat.roles.slice(2)" :key="role" class="flex flex-col gap-2">
                    <M3Surface :color="role" class="p-4 text-center font-bold truncate">
                      Sample Text
                    </M3Surface>
                    <span class="text-[10px] font-mono text-center block text-slate-400">{{ role }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 2.2 Color Role Morphing -->
          <div class="flex flex-col gap-8 pt-8 border-t border-slate-200">
            <div class="flex flex-col gap-2">
              <h4 class="text-sm font-bold text-slate-400 uppercase tracking-wider">2.2 Color Role Morphing</h4>
              <p class="text-xs text-slate-500">Demonstrating the fluid transition between semantic roles using CSS interpolation.</p>
            </div>
            
            <div class="flex flex-col gap-6 p-8 bg-white rounded-3xl border border-slate-200 shadow-sm items-center">
              <h5 class="font-bold">Role Transition</h5>
              <M3Surface :color="currentRole" class="p-12 w-full max-w-md text-center text-2xl font-bold transition-all duration-500">
                {{ currentRole }}
              </M3Surface>
              <div class="flex flex-wrap justify-center gap-2">
                <button v-for="role in allRoles" :key="role" @click="currentRole = role" 
                  :class="['px-3 py-1 text-xs rounded font-bold transition-colors', currentRole === role ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200']">
                  {{ role }}
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- SECTION 3: Elevation System -->
        <section class="flex flex-col gap-12">
          <div class="flex flex-col gap-2">
            <h3 class="text-xl font-bold uppercase tracking-widest text-slate-500">3. Elevation System</h3>
            <div class="flex flex-col gap-3">
              <p class="text-slate-600 leading-relaxed">
                Elevation creates a perceived z-axis depth. Instead of simple box-shadows, M3 uses 
                <span class="font-bold text-indigo-600">drop-shadow filters</span> that follow the exact shape of the surface, including its morphing corners.
              </p>
              <p class="text-xs text-slate-500 italic">
                Note: These examples use a neutral surface to isolate the shadow effect from color distractions.
              </p>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
            <!-- 3.1 Static Levels -->
            <div class="flex flex-col gap-6 p-8 bg-white rounded-3xl border border-slate-200 shadow-sm">
              <h4 class="font-bold text-center">Static Elevation Levels</h4>
              <div class="grid grid-cols-1 gap-4">
                <div v-for="lvl in ['level0', 'level1', 'level2', 'level3', 'level4']" :key="lvl" class="flex items-center gap-4">
                  <M3Surface :elevation="lvl" color="surfaceContainerLow" class="p-3 w-32 text-center text-xs font-bold">
                    {{ lvl.toUpperCase() }}
                  </M3Surface>
                  <span class="text-[10px] font-mono text-slate-400">elevation="{{ lvl }}"</span>
                </div>
              </div>
            </div>

            <!-- 3.2 Elevation Morphing -->
            <div class="flex flex-col gap-6 p-8 bg-white rounded-3xl border border-slate-200 shadow-sm items-center">
              <h4 class="font-bold text-center">Elevation Morphing</h4>
              <M3Surface :elevation="currentElevation" color="surfaceContainerLow" class="p-12 w-full max-w-xs text-center text-lg font-bold transition-all duration-500">
                {{ currentElevation.toUpperCase() }}
              </M3Surface>
              <div class="flex flex-wrap justify-center gap-2">
                <button v-for="lvl in ['level0', 'level1', 'level2', 'level3', 'level4']" :key="lvl" @click="currentElevation = lvl" 
                  :class="['px-3 py-1 text-xs rounded font-bold transition-colors', currentElevation === lvl ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200']">
                  {{ lvl }}
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- GROUP 2: Automation Profiles -->
      <div class="flex flex-col gap-12 border-l-4 border-emerald-500 pl-8 py-2">
        <div class="flex flex-col gap-2">
          <h2 class="text-3xl font-black uppercase tracking-tighter text-slate-800">Automation Profiles</h2>
          <p class="text-slate-500 max-w-2xl">
            Efficiency through presets. Instead of manual tweaking, use Variants and Size Profiles to apply curated M3 configurations instantly.
          </p>
        </div>

        <!-- SECTION 4: Surface Variants -->
        <section class="flex flex-col gap-8">
          <div class="flex flex-col gap-2">
            <h3 class="text-xl font-bold uppercase tracking-widest text-slate-500">4. Surface Variants (Presets)</h3>
            <p class="text-slate-600">Variants bundle a specific color role, contrast partner, and border style to define a common UI pattern (e.g., "Tonal" for cards, "Outlined" for inputs).</p>
          </div>
          
          <!-- Filled Row 1: High-Emphasis -->
          <div class="flex flex-col gap-4">
            <h4 class="text-xs font-bold text-slate-400 uppercase tracking-tighter">Filled & High-Emphasis</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              <div v-for="v_id in filteredVariants('filled-high')" :key="v_id" class="flex flex-col gap-3">
                <M3Surface :variant="v_id" class="p-4 text-center font-bold capitalize">
                  {{ v_id.replace('filled', '') }}
                </M3Surface>
                <div class="text-[10px] font-mono text-slate-400 space-y-1 px-1">
                  <div class="flex justify-between"><span>Role:</span> <span class="text-slate-600">{{ surfaceVariants[v_id].role }}</span></div>
                  <div class="flex justify-between"><span>On-Role:</span> <span class="text-slate-600">{{ surfaceVariants[v_id].onRole }}</span></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Filled Row 2: Containers -->
          <div class="flex flex-col gap-4 pt-4 border-t border-slate-100">
            <h4 class="text-xs font-bold text-slate-400 uppercase tracking-tighter">Filled Containers</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              <div v-for="v_id in filteredVariants('filled-container')" :key="v_id" class="flex flex-col gap-3">
                <M3Surface :variant="v_id" class="p-4 text-center font-bold capitalize">
                  {{ v_id.replace('filled', '') }}
                </M3Surface>
                <div class="text-[10px] font-mono text-slate-400 space-y-1 px-1">
                  <div class="flex justify-between"><span>Role:</span> <span class="text-slate-600">{{ surfaceVariants[v_id].role }}</span></div>
                  <div class="flex justify-between"><span>On-Role:</span> <span class="text-slate-600">{{ surfaceVariants[v_id].onRole }}</span></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Filled Row 3: Neutral Containers -->
          <div class="flex flex-col gap-4 pt-4 border-t border-slate-100">
            <h4 class="text-xs font-bold text-slate-400 uppercase tracking-tighter">Neutral Containers</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              <div v-for="v_id in filteredVariants('neutral-container')" :key="v_id" class="flex flex-col gap-3">
                <M3Surface :variant="v_id" class="p-4 text-center font-bold capitalize">
                  {{ v_id.replace('container', '').trim() }}
                </M3Surface>
                <div class="text-[10px] font-mono text-slate-400 space-y-1 px-1">
                  <div class="flex justify-between"><span>Role:</span> <span class="text-slate-600">{{ surfaceVariants[v_id].role }}</span></div>
                  <div class="flex justify-between"><span>On-Role:</span> <span class="text-slate-600">{{ surfaceVariants[v_id].onRole }}</span></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Filled Row 4: Semantic Containers -->
          <div class="flex flex-col gap-4 pt-4 border-t border-slate-100">
            <h4 class="text-xs font-bold text-slate-400 uppercase tracking-tighter">Semantic Containers</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <div v-for="v_id in filteredVariants('semantic-container')" :key="v_id" class="flex flex-col gap-3">
                <M3Surface :variant="v_id" class="p-4 text-center font-bold capitalize">
                  {{ v_id.replace('container', '').trim() }}
                </M3Surface>
                <div class="text-[10px] font-mono text-slate-400 space-y-1 px-1">
                  <div class="flex justify-between"><span>Role:</span> <span class="text-slate-600">{{ surfaceVariants[v_id].role }}</span></div>
                  <div class="flex justify-between"><span>On-Role:</span> <span class="text-slate-600">{{ surfaceVariants[v_id].onRole }}</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- SECTION 5: Size-Driven Profiles -->
        <section class="flex flex-col gap-8">
          <div class="flex flex-col gap-2">
            <h3 class="text-xl font-bold uppercase tracking-widest text-slate-500">5. Size-Driven Profiles</h3>
            <p class="text-slate-600">The peak of the system. One prop (<code>size</code>) coordinates radius, elevation, and depth role based on the component's visual scale.</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div v-for="s in sizes" :key="s.id" class="flex flex-col gap-4 p-6 bg-white rounded-3xl border border-slate-200 shadow-sm items-center">
              <h3 class="font-bold text-center">{{ s.label }}</h3>
              <div class="flex flex-col items-center gap-1 mb-2">
                <span class="text-[10px] font-mono text-slate-400">Radius: {{ s.radius }}</span>
                <span class="text-[10px] font-mono text-slate-400">Elev: {{ s.elevation }}</span>
                <span class="text-[10px] font-mono text-slate-400">Depth: {{ s.depth }}</span>
              </div>
              <M3Surface :size="s.id" color="primary" class="p-4 text-center font-bold">
                {{ s.id.toUpperCase() }}
              </M3Surface>
            </div>
          </div>
        </section>
      </div>

      <!-- ADVANCED BEHAVIOR -->
      <div class="space-y-20">
        <!-- SECTION 6: Neutral Depth Hierarchy -->
        <section class="flex flex-col gap-8">
          <div class="flex flex-col gap-2">
            <h2 class="text-xl font-bold uppercase tracking-widest text-slate-500">6. Neutral Depth Hierarchy</h2>
            <p class="text-slate-600">Semantic mapping to M3 Surface Container levels for layered UI hierarchy.</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div v-for="d in depthLevels" :key="d.value" class="flex flex-col gap-2 items-center p-4 bg-white rounded-2xl border border-slate-200">
              <M3Surface :depth="d.value" class="p-4 w-full text-center">{{ d.label }}</M3Surface>
              <span class="text-[10px] font-mono text-slate-400">depth="{{ d.value }}"</span>
            </div>
          </div>
        </section>

        <!-- SECTION 7: Content Adaptation -->
        <section class="flex flex-col gap-8">
          <div class="flex flex-col gap-2">
            <h2 class="text-xl font-bold uppercase tracking-widest text-slate-500">7. Content Adaptation</h2>
            <p class="text-slate-600">Content-First sizing: the surface expands to wrap its content without distorting corner radii.</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="flex flex-col gap-4 p-6 bg-white rounded-3xl border border-slate-200 shadow-sm">
              <h3 class="font-bold text-center mb-2">Short Content</h3>
              <M3Surface color="tertiaryContainer" class="p-4 text-center">Short Text</M3Surface>
            </div>
            <div class="flex flex-col gap-4 p-6 bg-white rounded-3xl border border-slate-200 shadow-sm">
              <h3 class="font-bold text-center mb-2">Long Content</h3>
              <M3Surface color="tertiaryContainer" class="p-4 text-center">
                This surface expands to fit longer content automatically without distorting the corners.
              </M3Surface>
            </div>
            <div class="flex flex-col gap-4 p-6 bg-white rounded-3xl border border-slate-200 shadow-sm">
              <h3 class="font-bold text-center mb-2">Mixed Content</h3>
              <M3Surface color="tertiaryContainer" class="p-4 flex items-center justify-center gap-2">
                <span>Icon</span>
                <div class="w-4 h-4 bg-black rounded-full"></div>
                <span>Dynamic Content</span>
              </M3Surface>
            </div>
          </div>
        </section>

        <!-- SECTION 8: Interactive Morphing Lab -->
        <section class="flex flex-col gap-8 pb-20">
          <div class="flex flex-col gap-2">
            <h2 class="text-xl font-bold uppercase tracking-widest text-slate-500">8. Interactive Morphing Lab</h2>
            <p class="text-slate-600">Test the Size-driven transitions in real-time. Switch sizes and states to see the combined effect of radius and elevation.</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="flex flex-col gap-6 p-8 bg-white rounded-3xl border border-slate-200 shadow-sm">
              <h3 class="font-bold text-center">Size & State Morph</h3>
              <M3Surface :size="currentSize" :state="interactiveState" color="primary" class="p-6 text-center text-lg font-bold">
                Profile Morph
              </M3Surface>
              <div class="flex flex-wrap justify-center gap-2">
                <button @click="interactiveState = 'base'" :class="['px-3 py-1 text-xs rounded font-bold transition-colors', interactiveState === 'base' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200']">Base</button>
                <button @click="interactiveState = 'hover'" :class="['px-3 py-1 text-xs rounded font-bold transition-colors', interactiveState === 'hover' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200']">Hover</button>
                <button @click="interactiveState = 'active'" :class="['px-3 py-1 text-xs rounded font-bold transition-colors', interactiveState === 'active' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200']">Active</button>
              </div>
              <div class="flex flex-wrap justify-center gap-2 mt-4">
                <button v-for="s in sizes" :key="s.id" @click="currentSize = s.id" :class="['px-3 py-1 text-xs rounded font-bold transition-colors', currentSize === s.id ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100']">
                  {{ s.label }}
                </button>
              </div>
            </div>
            <div class="flex flex-col gap-6 p-8 bg-white rounded-3xl border border-slate-200 shadow-sm">
              <h3 class="font-bold text-center">Depth Transition</h3>
              <M3Surface :depth="currentDepth" variant="container" class="p-6 text-center text-lg font-bold">
                Current Depth: {{ currentDepth }}
              </M3Surface>
              <div class="flex flex-wrap justify-center gap-2">
                <button @click="currentDepth = 'lowest'" :class="['px-3 py-1 text-xs rounded font-bold transition-colors', currentDepth === 'lowest' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200']">Lowest</button>
                <button @click="currentDepth = 'low'" :class="['px-3 py-1 text-xs rounded font-bold transition-colors', currentDepth === 'low' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200']">Low</button>
                <button @click="currentDepth = 'default'" :class="['px-3 py-1 text-xs rounded font-bold transition-colors', currentDepth === 'default' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200']">Default</button>
                <button @click="currentDepth = 'high'" :class="['px-3 py-1 text-xs rounded font-bold transition-colors', currentDepth === 'high' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200']">High</button>
                <button @click="currentDepth = 'highest'" :class="['px-3 py-1 text-xs rounded font-bold transition-colors', currentDepth === 'highest' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200']">Highest</button>
              </div>
            </div>
          </div>
        </section>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import M3Surface from '@/components/atoms/M3Surface/M3Surface.vue';
import { SURFACE_DEPTH_MAP, SURFACE_SIZE_PROFILES, SURFACE_ROLES, SURFACE_VARIANTS } from '@/components/atoms/M3Surface/specs';

const interactiveState = ref('base');
const currentSize = ref('md');
const currentDepth = ref('default');
const currentElevation = ref('level0');

// Color morphing state
const currentRole = ref('primary');

const allRoles = [
  ...SURFACE_ROLES.brand,
  ...SURFACE_ROLES.neutral,
  ...SURFACE_ROLES.tonal,
  ...SURFACE_ROLES.utility,
  ...SURFACE_ROLES.depth,
];

const roleCategories = [
  { id: 'brand', label: 'Brand Palette', roles: SURFACE_ROLES.brand, desc: 'High-emphasis primary, secondary and tertiary roles.' },
  { id: 'tonal', label: 'Tonal Palette', roles: SURFACE_ROLES.tonal, desc: 'Softened brand colors for container elements.' },
  { id: 'neutral', label: 'Neutral Palette', roles: SURFACE_ROLES.neutral, desc: 'The foundation surface and variant levels.' },
  { id: 'utility', label: 'Utility Palette', roles: SURFACE_ROLES.utility, desc: 'Semantic system feedback (Success, Warning, Info, Error).' },
  { id: 'depth', label: 'Depth Palette', roles: SURFACE_ROLES.depth, desc: 'Bright and Dim surface adjustments.' },
];

const surfaceVariants = SURFACE_VARIANTS;

const filteredVariants = (type: 'filled-high' | 'filled-container' | 'neutral-container' | 'semantic-container') => {
  return Object.keys(surfaceVariants).filter(id => {
    if (type === 'filled-high') return id.startsWith('filled') && !id.includes('Container');
    if (type === 'filled-container') return id.startsWith('filled') && id.includes('Container');
    if (type === 'neutral-container') {
       const neutrals = ['lowest', 'low', 'neutral', 'high', 'highest'];
       return id.startsWith('container') && neutrals.some(n => id.toLowerCase().includes(n));
    }
    if (type === 'semantic-container') {
       const utilities = ['error', 'success', 'warning', 'info'];
       return id.startsWith('container') && utilities.some(u => id.toLowerCase().includes(u));
    }
    return false;
  });
};

const sizes = Object.entries(SURFACE_SIZE_PROFILES).map(([id, spec]) => ({
  id,
  label: id.toUpperCase(),
  radius: spec.radius,
  elevation: spec.elevation,
  depth: spec.depthRole,
}));

const depthLevels = Object.entries(SURFACE_DEPTH_MAP).map(([value, label]) => ({
  value,
  label: value.charAt(0).toUpperCase() + value.slice(1),
}));

const symmetricRadius = ref('M');
const asymmetricRadius = ref(['M', 'M', 'M', 'M']);

const isAsym = (tl: any, tr: any, br: any, bl: any) => {
  return JSON.stringify(asymmetricRadius.value) === JSON.stringify([tl, tr, br, bl]);
};
</script>

<style scoped>
</style>
