<template>
  <div ref="containerRef" class="relative w-full h-full">
    <div 
      class="absolute inset-0 flex items-center justify-center transition-all duration-300"
      :style="{ ...elevationStyle, zIndex: 0 }"
    >
      <!-- 9-slice mode: shape has a `slice` field + stretch -->
      <svg
        v-if="sliceRegions.length"
        :viewBox="sliceViewBox"
        class="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        style="overflow: visible"
      >
        <template v-for="(region, i) in sliceRegions" :key="i">
          <rect
            v-if="region.solid"
            :x="region.x - SLICE_OVERLAP"
            :y="region.y - SLICE_OVERLAP"
            :width="region.width + 2 * SLICE_OVERLAP"
            :height="region.height + 2 * SLICE_OVERLAP"
            :fill="resolvedSurfaceColor"
            :stroke="props.stroke"
            :stroke-width="props.strokeWidth"
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
            <path 
              :d="pathData" 
              :fill="resolvedSurfaceColor" 
              :stroke="props.stroke" 
              :stroke-width="props.strokeWidth" 
            />
          </svg>
        </template>
      </svg>

      <!-- normal mode: single path -->
      <svg
        v-else
        :viewBox="dynamicViewBox"
        class="absolute inset-0 w-full h-full"
        :preserveAspectRatio="props.stretch ? 'none' : 'xMidYMid meet'"
        style="overflow: visible"
      >
        <path
          ref="shapePath"
          :fill="resolvedSurfaceColor"
          :stroke="props.stroke"
          :stroke-width="props.strokeWidth"
        />
      </svg>

      <!-- Focus Halo Layer -->
      <div 
        v-if="state === 'focused'" 
        class="absolute inset-0 pointer-events-none transition-all duration-200"
        :style="{ 
          outline: `2px solid var(--md-sys-color-primary)`,
          outlineOffset: '2px',
          borderRadius: typeof props.radius === 'string' && props.radius === 'FULL' ? '9999px' : 'inherit',
          zIndex: 10
        }"
      />

      <!-- SVG Filter Definitions for Elevation -->
      <svg style="position: absolute; width: 0; height: 0;" aria-hidden="true">
        <defs>
          <filter id="elevation-filter" x="-100%" y="-100%" width="300%" height="300%" filterUnits="userSpaceOnUse">
            <feGaussianBlur in="SourceAlpha" stdDeviation="8" result="blur"></feGaussianBlur>
            <feOffset in="blur" dx="0" dy="4" result="offsetblur"></feOffset>
            <feFlood flood-color="rgba(0, 0, 0, 0.3)" result="color"></feFlood>
            <feComposite in="color" in2="offsetblur" operator="in"></feComposite>
            <feMerge>
              <feMergeNode></feMergeNode>
              <feMergeNode in="SourceGraphic"></feMergeNode>
            </feMerge>
          </filter>
        </defs>
      </svg>

      <!-- State Layer: Overlay for hover/active/focused states -->
      <div 
        v-if="stateLayerColor" 
        class="absolute inset-0 pointer-events-none transition-colors duration-200"
        :style="{ 
          backgroundColor: stateLayerColor,
          borderRadius: typeof props.radius === 'string' && props.radius === 'FULL' ? '9999px' : 'inherit',
          zIndex: 1
        }"
      />

      <!-- Tonal Overlay: Semi-transparent white layer to simulate M3 Tonal Lift -->
      <div 
        v-if="elevationSpec.tint > 0" 
        class="absolute inset-0 pointer-events-none"
        :style="{ 
          backgroundColor: `rgba(255, 255, 255, ${elevationSpec.tint})`,
          borderRadius: typeof props.radius === 'string' && props.radius === 'FULL' ? '9999px' : 'inherit',
          zIndex: 2
        }"
      />
    </div>
    <div 
      class="relative z-10 w-full h-full flex items-center justify-center"
      :style="contentPaddingStyle"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue'
import { CORNER_RADIUS, type CornerRadius } from '@/constants/corners'
import { SHAPE_LIBRARY } from '@/constants/shapes'
import { useResizeMorph } from '@/composables/useResizeMorph'
import { interpolate } from 'flubber'
import { transformPath } from '@/utils/svgPath'
import gsap from 'gsap'
import { type ColorRole } from '@/constants/colors'
import { ELEVATION_TOKENS, type ElevationLevel } from '@/constants/elevation'

type RadiusInput = CornerRadius | number | string;

interface Props {
  size?: number;
  width?: number | string;
  height?: number | string;
  stretch?: boolean;
  color?: ColorRole | 'transparent';
  stroke?: string;
  strokeWidth?: number;
  radius?: RadiusInput | RadiusInput[];
  shape?: string; 
  elevation?: ElevationLevel;
  paddingX?: number | string;
  state?: 'base' | 'hover' | 'active' | 'focused';
}

const props = withDefaults(defineProps<Props>(), {
  size: 100,
  width: undefined,
  height: undefined,
  stretch: true,
  color: 'primary',
  stroke: 'transparent',
  strokeWidth: 0,
  radius: 'NONE',
  shape: '',
  elevation: 'level0',
  paddingX: undefined,
  state: 'base',
});

const containerRef = ref<HTMLElement | null>(null);
const shapePath = ref<SVGPathElement | null>(null);

const { size } = useResizeMorph(containerRef);
  
const elevationSpec = computed(() => ELEVATION_TOKENS[props.elevation]);

const elevationStyle = computed(() => {
  if (props.elevation === 'level0' || !elevationSpec.value) {
    return {};
  }
  return {
    filter: `drop-shadow(0px ${elevationSpec.value.offsetY}px ${elevationSpec.value.blur}px ${elevationSpec.value.color})`
  };
});

const contentPaddingStyle = computed(() => {
  const px = typeof props.paddingX === 'number' 
    ? `${props.paddingX}px` 
    : props.paddingX || '0px';
  return { paddingLeft: px, paddingRight: px };
});

const resolvedSurfaceColor = computed(() => {
  if (props.color === 'transparent') return 'none';
  let baseColor = '';
  if (typeof props.color === 'string' && props.color.startsWith('#')) {
    baseColor = props.color;
  } else {
    baseColor = `var(--md-sys-color-${props.color})`;
  }
  return baseColor;
});

const stateLayerColor = computed(() => {
  if (props.state === 'base') return 'transparent';
  const isDark = props.color === 'primary' || props.color === 'primaryContainer';
  if (props.state === 'hover') return isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)';
  if (props.state === 'active') return isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)';
  if (props.state === 'focused') return isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
  return 'transparent';
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

interface NormalizedShape {
  path: string;
  bbox: [number, number, number, number]; 
}

const normalizedShapes = new Map<string, NormalizedShape>();

const getNormalizedShape = (id: string): NormalizedShape | null => {
  const data = SHAPE_LIBRARY[id];
  if (!data) return null;
  if (!normalizedShapes.has(id)) {
    const [x, y, w, h] = data.bbox;
    const s = 100 / Math.max(w, h);
    const cx = x + w / 2;
    const cy = y + h / 2;
    normalizedShapes.set(id, {
      path: transformPath(data.path, s, 50 - cx * s, 50 - cy * s),
      bbox: [50 - (w / 2) * s, 50 - (h / 2) * s, w * s, h * s],
    });
  }
  return normalizedShapes.get(id)!;
};

const dynamicViewBox = computed(() => '0 0 100 100');

const pathData = computed(() => {
  if (props.shape && SHAPE_LIBRARY[props.shape]) {
    return getNormalizedShape(props.shape)!.path;
  }
  
  const w = 100;
  const h = 100;
  
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
    if (val === -1) return 50;
    return Math.min(val, 50);
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

const SLICE_OVERLAP = 0;

const sliceRegions = computed<SliceRegion[]>(() => {
  if (!props.stretch) return [];

  // 1. Library shapes with defined slices always use 9-slice
  if (props.shape && SHAPE_LIBRARY[props.shape]?.slice) {
    const shapeData = SHAPE_LIBRARY[props.shape];
    const insets = shapeData.slice;
    const [bx, by, w, h] = getNormalizedShape(props.shape)!.bbox;
    const left = (insets?.left ?? 0) * w;
    const right = (insets?.right ?? 0) * w;
    const top = (insets?.top ?? 0) * h;
    const bottom = (insets?.bottom ?? 0) * h;
    const W = size.w;
    const H = size.h;
    if (!W || !H) return [];
    const scale = Math.min(1, W / (left + right || 1), H / (top + bottom || 1));
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
  }

  // 2. Dynamic Radius shapes:’
  // To support morphing, we MUST return an empty array here.
  // If sliceRegions.length > 0, the component uses 9-slice (no morphing).
  // By returning [], we force it into "normal mode" (single path) which morphs.
  return [];
});

const sliceViewBox = computed(() => `0 0 ${size.w} ${size.h}`);

let morphTween: gsap.core.Tween | null = null;

const applyPath = (d: string, animate: boolean) => {
  const el = shapePath.value;
  if (!el) return;
  morphTween?.kill();
  morphTween = null;
  if (!animate) {
    el.setAttribute('d', d);
    return;
  }
  const from = el.getAttribute('d') || '';
  const morph = interpolate(from, d, { maxSegmentLength: 5 });
  const progress = { t: 0 };
  morphTween = gsap.to(progress, {
    t: 1,
    duration: 0.6,
    ease: 'expo.inOut',
    onUpdate: () => el.setAttribute('d', morph(progress.t)),
    onComplete: () => el.setAttribute('d', d),
  });
};

onMounted(() => applyPath(pathData.value, false));

watch(
  () => [props.shape, props.radius], 
  () => {
    if (sliceRegions.value.length) return;
    applyPath(pathData.value, true);
  }, 
  { deep: true }
);

watch(
  () => props.radius,
  () => {
    if (sliceRegions.value.length) return;
    applyPath(pathData.value, true);
  },
  { deep: true }
);

interface SliceRegion {
  x: number;
  y: number;
  width: number;
  height: number;
  viewBox: string;
  solid: boolean;
}
</script>

<style>
.material-symbols-outlined { font-family: 'Material Symbols Outlined' !important; }
.material-symbols-rounded { font-family: 'Material Symbols Rounded' !important; }
</style>