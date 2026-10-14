<template>
  <div ref="containerRef" class="relative w-full h-full">
    <!-- 9-slice mode: shape has a `slice` field + stretch -->
    <svg
      v-if="sliceRegions.length"
      :viewBox="sliceViewBox"
      class="absolute inset-0 w-full h-full"
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
          <path :d="pathData" fill="currentColor" :class="colorClass" />
        </svg>
      </template>
    </svg>

    <!-- normal mode: single path -->
    <svg
      v-else
      :viewBox="dynamicViewBox"
      class="absolute inset-0 w-full h-full"
      :preserve-aspect-ratio="props.stretch ? 'none' : 'xMidYMid meet'"
      style="overflow: visible"
    >
      <path
        ref="shapePath"
        :d="pathData"
        fill="currentColor"
        :class="colorClass"
      />
    </svg>
    <div class="relative z-10 w-full h-full flex items-center justify-center">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, watch } from 'vue'
import { CORNER_RADIUS, type CornerRadius } from '@/constants/corners'
import { SHAPE_LIBRARY } from '@/constants/shapes'
import gsap from 'gsap'

type RadiusInput = CornerRadius | number | string;

interface Props {
  size?: number;
  width?: number | string;
  height?: number | string;
  stretch?: boolean;
  color?: 'accent' | 'slate' | 'white';
  radius?: RadiusInput | RadiusInput[];
  shape?: string; // If provided, use Artistic Shape mode
}

const props = withDefaults(defineProps<Props>(), {
  size: 100,
  width: undefined,
  height: undefined,
  stretch: true,
  color: 'accent',
  radius: 'NONE',
  shape: ''
});

const containerRef = ref<HTMLElement | null>(null);
const widthRef = ref(0);
const heightRef = ref(0);
const shapePath = ref<SVGPathElement | null>(null);

let observer: ResizeObserver | null = null;

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
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});

const colorClass = computed(() => {
  switch (props.color) {
    case 'accent': return 'text-[var(--color-accent)]';
    case 'slate': return 'text-slate-400';
    case 'white': return 'text-white';
    default: return 'text-[var(--color-accent)]';
  }
});

const resolveRadiusValue = (val: RadiusInput): number => {
  if (typeof val === 'string') {
    if (val === 'FULL') return -1;
    if (val in CORNER_RADIUS) {
      return CORNER_RADIUS[val as CornerRadius] as number;
    }
  }
  const n = Number(val);
  return isNaN(n) ? 0 : n;
};

const dynamicViewBox = computed(() => {
  // If we are in shape mode, use the shape's bbox
  if (props.shape && SHAPE_LIBRARY[props.shape]) {
    const [x, y, w, h] = SHAPE_LIBRARY[props.shape].bbox;
    return `${x} ${y} ${w} ${h}`;
  }

  if (!props.stretch) return '0 0 100 100';
  return `0 0 ${widthRef.value} ${heightRef.value}`;
});

const pathData = computed(() => {
  // MODE 1: Artistic Shape
  if (props.shape && SHAPE_LIBRARY[props.shape]) {
    return SHAPE_LIBRARY[props.shape].path;
  }

  // MODE 2: Regular Surface (M3 Radius System)
  const w = props.stretch ? widthRef.value : (props.width || props.size);
  const h = props.stretch ? heightRef.value : (props.height || props.size);
  const minDim = Math.min(w, h);

  let radii: number[];

  if (Array.isArray(props.radius)) {
    radii = props.radius.map(r => resolveRadiusValue(r));
    while (radii.length < 4) radii.push(0);
    radii = radii.slice(0, 4);
  } else {
    const r = resolveRadiusValue(props.radius);
    radii = [r, r, r, r];
  }

  const finalizeRadius = (val: number) => {
    if (val === -1) return minDim / 2;
    return Math.min(val, minDim / 2);
  };

  const [tl, tr, br, bl] = radii.map(finalizeRadius);

  return `
    M ${tl},0 
    H ${w - tr} 
    A ${tr},${tr} 0 0 1 ${w},${tr} 
    V ${h - br} 
    A ${br},${br} 0 0 1 ${w - br},${h} 
    H ${bl} 
    A ${bl},${bl} 0 0 1 0,${h - bl} 
    V ${tl} 
    A ${tl},${tl} 0 0 1 ${tl},0 
    Z
  `.replace(/\\s+/g, ' ').trim();
});

// ─────────────────────────────────────────────────────────────
// 9-slice rendering
// ─────────────────────────────────────────────────────────────

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
  // Source regions keep their natural size; only the target corners shrink.
  const scale = Math.min(
    1,
    W / (left + right || 1),
    H / (top + bottom || 1)
  );
  const tLeft = left * scale;
  const tRight = right * scale;
  const tTop = top * scale;
  const tBottom = bottom * scale;

  // target column/row boundaries (container coordinate space)
  const tCols = [0, tLeft, W - tRight, W];
  const tRows = [0, tTop, H - tBottom, H];
  // source column/row boundaries (absolute path coordinate space)
  const sCols = [bx, bx + left, bx + w - right, bx + w];
  const sRows = [by, by + top, by + h - bottom, by + h];

  const regions: SliceRegion[] = [];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      const srcW = sCols[c + 1] - sCols[c];
      const srcH = sRows[r + 1] - sRows[r];
      // A degenerate source region (zero width/height — e.g. the middle of a
      // circle) has no path content to clip, so fill it solid to bridge the
      // corners programmatically instead of leaving a gap.
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

// Watch for prop changes to trigger morphing animation (non-9-slice only)
watch(() => [props.shape, props.radius], () => {
  if (!shapePath.value || sliceRegions.value.length) return;
  gsap.to(shapePath.value, {
    attr: { d: pathData.value },
    duration: 0.6,
    ease: "expo.inOut"
  });
}, { deep: true });
</script>
