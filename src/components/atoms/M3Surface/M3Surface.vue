<template>
  <div 
    :class="[
      'relative inline-flex items-center justify-center transition-all duration-300',
      wrapperClass
    ]"
    :style="surfaceStyle"
  >
    <!-- State Layer Overlay: True M3 implementation using color-mix with On-Color -->
    <div 
      v-if="stateLayerColor" 
      class="absolute inset-0 pointer-events-none transition-colors duration-200"
      :style="{ 
        backgroundColor: stateLayerColor,
        borderRadius: `inherit`,
        zIndex: 0
      }"
    />

    <!-- Content Slot -->
    <div 
      class="relative z-10 flex items-center justify-center"
      :style="contentPaddingStyle"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ELEVATION_TOKENS, type ElevationLevel } from '@/constants/elevation';
import { type ColorRole } from '@/constants/colors';
import { 
  SURFACE_RADIUS, type SurfaceRadius, 
  SURFACE_VARIANTS, type SurfaceVariant, 
  SURFACE_PADDING, type SurfacePadding,
  type SurfaceRole
} from './specs';

interface Props {
  radius?: SurfaceRadius | SurfaceRadius[] | number | number[];
  color?: SurfaceRole | ColorRole;
  elevation?: ElevationLevel;
  paddingX?: SurfacePadding | number | string;
  paddingY?: SurfacePadding | number | string;
  state?: 'base' | 'hover' | 'active' | 'focused';
  variant?: SurfaceVariant;
  width?: number | string;
  height?: number | string;
  stroke?: string;
  strokeWidth?: number;
}

const props = withDefaults(defineProps<Props>(), {
  radius: 'M',
  color: 'primary',
  elevation: 'level0',
  paddingX: 'md',
  paddingY: 'md',
  state: 'base',
  variant: 'filled',
  width: undefined,
  height: undefined,
  stroke: 'transparent',
  strokeWidth: 0,
});

// --- Radius Resolver ---
const resolveRadiusValue = (val: any): string => {
  if (typeof val === 'string') {
    if (val in SURFACE_RADIUS) return `${SURFACE_RADIUS[val as SurfaceRadius]}px`;
  }
  return `${Number(val) || 0}px`;
};

const resolvedRadius = computed(() => {
  if (props.state === 'hover') return resolveRadiusValue('S');
  if (props.state === 'active') return resolveRadiusValue('L');
  
  if (Array.isArray(props.radius)) {
    return props.radius.map(r => resolveRadiusValue(r)).join(' ');
  }
  return resolveRadiusValue(props.radius);
});

// --- Color & Contrast Resolver ---
const variantSpec = computed(() => SURFACE_VARIANTS[props.variant]);

const resolvedSurfaceRole = computed(() => {
  return (props.color || variantSpec.value.role) as SurfaceRole;
});

const resolvedSurface = computed(() => {
  const role = resolvedSurfaceRole.value;
  if (role === 'transparent') return 'transparent';
  return `var(--md-sys-color-${role})`;
});

const resolvedContentColor = computed(() => {
  const role = resolvedSurfaceRole.value;
  if (role === 'transparent') return `var(--md-sys-color-on-surface)`;
  
  const onRole = role.startsWith('on') ? role : `on${role.charAt(0).toUpperCase() + role.slice(1)}`;
  return `var(--md-sys-color-${onRole})`;
});

const resolvedBorder = computed(() => {
  if (props.stroke && props.stroke !== 'transparent') {
    return `${props.strokeWidth || 0}px solid ${props.stroke}`;
  }
  if (props.variant === 'outlined') {
    return `1px solid var(--md-sys-color-outline)`;
  }
  return 'none';
});

// --- Elevation Resolver ---
const elevationSpec = computed(() => ELEVATION_TOKENS[props.elevation]);
const resolvedElevation = computed(() => {
  if (props.elevation === 'level0' || !elevationSpec.value) return 'none';
  return `drop-shadow(0px ${elevationSpec.value.offsetY}px ${elevationSpec.value.blur}px ${elevationSpec.value.color})`;
});

// --- State Layer Resolver ---
const stateLayerColor = computed(() => {
  if (props.state === 'base') return 'transparent';
  
  const onRole = resolvedContentColor.value; // The CSS variable for the "On-Color"
  
  // M3 Standard Opacity for State Layers:
  // Hover: 8% | Focused: 10% | Active: 12%
  let opacity = '92%'; // 100% - 8%
  if (props.state === 'focused') opacity = '90%';
  if (props.state === 'active') opacity = '88%';
  
  // color-mix blends the on-color with transparent to create the precise overlay
  return `color-mix(in srgb, ${onRole}, transparent ${opacity})`;
});

// --- Styles ---
const surfaceStyle = computed(() => ({
  backgroundColor: resolvedSurface.value,
  border: resolvedBorder.value,
  borderRadius: resolvedRadius.value,
  filter: resolvedElevation.value,
  width: props.width ? (typeof props.width === 'number' ? `${props.width}px` : props.width) : 'auto',
  height: props.height ? (typeof props.height === 'number' ? `${props.height}px` : props.height) : 'auto',
  color: resolvedContentColor.value,
}));

const resolvePadding = (val: any): string => {
  if (typeof val === 'string' && val in SURFACE_PADDING) {
    return `${SURFACE_PADDING[val as SurfacePadding]}px`;
  }
  return typeof val === 'number' ? `${val}px` : val || '0px';
};

const contentPaddingStyle = computed(() => {
  const px = resolvePadding(props.paddingX);
  const py = resolvePadding(props.paddingY);
  return { paddingLeft: px, paddingRight: px, paddingTop: py, paddingBottom: py };
});

const wrapperClass = computed(() => {
  return '';
});
</script>

<style scoped>
</style>
