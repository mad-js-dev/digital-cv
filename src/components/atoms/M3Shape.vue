<template>
  <div 
    ref="containerRef"
    class="relative flex items-center justify-center transition-all duration-500"
    :class="size || width || height ? '' : 'w-full aspect-square'"
    :style="rootStyle"
  >
    <!-- 9-slice mode: shape has a `slice` field + stretch -->
    <svg
      v-if="sliceRegions.length"
      :viewBox="sliceViewBox"
      class="w-full h-full transition-all duration-500"
      :class="colorClass"
      preserveAspectRatio="none"
      style="overflow: hidden"
    >
      <template v-for="(region, i) in sliceRegions" :key="i">
        <rect
          v-if="region.solid"
          :x="region.x - SLICE_OVERLAP"
          :y="region.y - SLICE_OVERLAP"
          :width="region.width + 2 * SLICE_OVERLAP"
          :height="region.height + 2 * SLICE_OVERLAP"
          fill="currentColor"
          :class="colorClass"
        />
        <svg
          v-else
          :x="region.x - SLICE_OVERLAP"
          :y="region.y - SLICE_OVERLAP"
          :width="region.width + 2 * SLICE_OVERLAP"
          :height="region.height + 2 * SLICE_OVERLAP"
          :viewBox="region.viewBox"
          preserveAspectRatio="none"
          style="overflow: hidden"
        >
          <path :d="currentPath" fill="currentColor" :class="colorClass" />
        </svg>
      </template>
    </svg>

    <!-- normal mode: single path -->
    <svg 
      v-else
      :viewBox="currentViewBox" 
      class="w-full h-full transition-all duration-500"
      :class="colorClass"
      style="overflow: visible"
      :preserve-aspect-ratio="props.stretch ? 'none' : 'xMidYMid meet'"
    >
      <path 
        ref="shapePath"
        :d="currentPath" 
        fill="currentColor"
        :stroke="softness === 'none' ? 'none' : 'currentColor'"
        :stroke-width="softnessWidth"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="transition-all duration-700 ease-in-out"
      />
    </svg>
    <div class="absolute inset-0 flex items-center justify-center pointer-events-none">     
      <slot />
    </div>
  </div>
</template>
  

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { SHAPE_LIBRARY } from '@/constants/shapes'

type Softness = 'none' | 'xs' | 's' | 'm' | 'l' | 'full';

interface Props {
  shape?: string;
  corners?: [number, number, number, number];
  radius?: number | string;
  size?: number | string | null;
  width?: number | string | null;
  height?: number | string | null;
  color?: 'accent' | 'slate' | 'white';
  softness?: Softness;
  stretch?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  shape: 'circle',
  radius: 0,
  size: null,
  width: null,
  height: null,
  color: 'accent',
  softness: 'none',
  stretch: false
});

const generateRoundedRectPath = (tl: number, tr: number, bl: number, br: number) => {
  const rTL = Math.min(tl, 50);
  const rTR = Math.min(tr, 50);
  const rBL = Math.min(bl, 50);
  const rBR = Math.min(br, 50);
  return `M ${rTL},0 H ${100 - rTR} A ${rTR},${rTR} 0 0 1 ${100},${rTR} V ${100 - rBR} A ${rBR},${rBR} 0 0 1 ${100 - rBR},${100} H ${rBL} A ${rBL},${rBL} 0 0 1 0,${100 - rBL} V ${rTL} A ${rTL},${rTL} 0 0 1 ${rTL},0 Z`;
};



const currentPath = ref('');
const currentViewBox = ref('0 0 100 100');

const resolveCornerRadius = (value: number | string | undefined | null, fallback = 0) => {
  const numeric = Number(value ?? fallback);
  return Number.isFinite(numeric) ? numeric : fallback;
};

const resolveCornerValues = (): [number, number, number, number] => {
  const fallback = resolveCornerRadius(props.radius, 0);
  
  // Use explicit corners or radius fallback
  const base = props.corners ?? [fallback, fallback, fallback, fallback];

  return [
    resolveCornerRadius(base[0], fallback),
    resolveCornerRadius(base[1], fallback),
    resolveCornerRadius(base[2], fallback),
    resolveCornerRadius(base[3], fallback)
  ];
};

const softnessScale: Record<Softness, number> = {
  none: 0,
  xs: 1.2,
  s: 2.4,
  m: 4,
  l: 7,
  full: 12
};

const softnessWidth = computed(() => softnessScale[props.softness]);

const asDimension = (value: number | string | null | undefined) => {
  if (value === null || value === undefined || value === '') return undefined;
  return typeof value === 'number' ? `${value}px` : value;
};

const rootStyle = computed(() => {
  if (props.width || props.height) {
    return {
      width: asDimension(props.width),
      height: asDimension(props.height)
    };
  }

  if (props.size) {
    return {
      width: asDimension(props.size),
      height: asDimension(props.size)
    };
  }

  return {};
});

const colorClass = computed(() => {
  switch (props.color) {
    case 'accent': return 'text-[var(--color-accent)]';
    case 'slate': return 'text-slate-400';
    case 'white': return 'text-white';
    default: return 'text-slate-400';
  }
});

const updatePath = () => {
  let targetPath = '';
  let viewBox = '0 0 100 100';
  
  // 1. Priority: Library Shapes
  if (SHAPE_LIBRARY[props.shape]) {
    const data = SHAPE_LIBRARY[props.shape];
    targetPath = data.path;
    const [x, y, w, h] = data.bbox;
    viewBox = `${x} ${y} ${w} ${h}`;
  } 
  // 2. Fallback: Standard Rounded Rect
  else {
    const [rTL, rTR, rBL, rBR] = resolveCornerValues();
    targetPath = generateRoundedRectPath(rTL, rTR, rBL, rBR);
    viewBox = '0 0 100 100';
  }
  
  // Skip the GSAP morph when in 9-slice mode (there is no single path to animate)
  if (shapePath.value && !sliceRegions.value.length) {
    gsap.to(shapePath.value, {
      attr: { d: targetPath },
      duration: 0.6,
      ease: "expo.inOut"
    });
  }
  currentPath.value = targetPath;
  currentViewBox.value = viewBox;
};

const shapePath = ref<SVGPathElement | null>(null);

// ─────────────────────────────────────────────────────────────
// 9-slice rendering (same `stretch` prop as SimpleSquare)
// ─────────────────────────────────────────────────────────────

const containerRef = ref<HTMLElement | null>(null);
const widthRef = ref(0);
const heightRef = ref(0);
let observer: ResizeObserver | null = null;

interface SliceRegion {
  x: number;
  y: number;
  width: number;
  height: number;
  viewBox: string;
  solid: boolean;
}

// Overlap applied to solid slice regions so the anti-aliased edge doesn't
// leave a hairline seam where the solid fill meets a corner path.
const SLICE_OVERLAP = 0.5;

const sliceRegions = computed<SliceRegion[]>(() => {
  if (!props.shape || !props.stretch) return [];
  const shapeData = SHAPE_LIBRARY[props.shape];
  if (!shapeData) return [];
  const insets = shapeData.slice;
  if (!insets) return [];

  const [bx, by, w, h] = shapeData.bbox;
  const left = insets.left * w;
  const right = insets.right * w;
  const top = insets.top * h;
  const bottom = insets.bottom * h;

  const W = widthRef.value;
  const H = heightRef.value;
  if (!W || !H) return [];

  // Cap corner insets so they never overflow the container: scale them down
  // proportionally when the container is smaller than the natural corners.
  const scale = Math.min(
    1,
    W / (left + right || 1),
    H / (top + bottom || 1)
  );
  const tLeft = left * scale;
  const tRight = right * scale;
  const tTop = top * scale;
  const tBottom = bottom * scale;

  const tCols = [0, tLeft, W - tRight, W];
  const tRows = [0, tTop, H - tBottom, H];
  const sCols = [bx, bx + left, bx + w - right, bx + w];
  const sRows = [by, by + top, by + h - bottom, by + h];

  const regions: SliceRegion[] = [];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      const srcW = sCols[c + 1] - sCols[c];
      const srcH = sRows[r + 1] - sRows[r];
      const solid = srcW <= 0 || srcH <= 0;
      regions.push({
        x: tCols[c],
        y: tRows[r],
        width: tCols[c + 1] - tCols[c],
        height: tRows[r + 1] - tRows[r],
        viewBox: `${sCols[c]} ${sRows[r]} ${Math.max(srcW, 0)} ${Math.max(srcH, 0)}`,
        solid,
      });
    }
  }
  return regions;
});

const sliceViewBox = computed(() => `0 0 ${widthRef.value} ${heightRef.value}`);

watch([() => props.shape, () => props.radius, () => props.corners], updatePath, { immediate: true, deep: true });

onMounted(() => {
  const measure = () => {
    if (!containerRef.value) return;
    const rect = containerRef.value.getBoundingClientRect();
    widthRef.value = rect.width;
    heightRef.value = rect.height;
  };
  // Read size synchronously on mount — ResizeObserver callbacks can be
  // unreliable in some environments, so don't rely on them for the first size.
  measure();
  if (typeof ResizeObserver !== 'undefined') {
    observer = new ResizeObserver(measure);
    observer.observe(containerRef.value);
  }
  updatePath();
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});
</script>

<style scoped>
svg {
  overflow: visible;
}
</style>
