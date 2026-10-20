<template>
  <div 
    :class="[
      'relative inline-flex items-center justify-center transition-all duration-300',
      wrapperClass
    ]"
    :style="surfaceStyle"
  >
    <!-- State Layer Overlay -->
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
      <!-- Apply the dynamic contrast color to the content -->
      <slot :style="{ color: resolvedContentColor }" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ELEVATION_TOKENS, type ElevationLevel } from '@/constants/elevation';
import { type ColorRole, M3_COLOR_PALETTES } from '@/constants/colors';
import { 
  SURFACE_RADIUS, type SurfaceRadius, 
  SURFACE_VARIANTS, type SurfaceVariant, 
  SURFACE_PADDING, type SurfacePadding,
  SURFACE_STATE_LAYERS
} from './specs';

interface Props {
  radius?: SurfaceRadius | SurfaceRadius[] | number | number[];
  color?: ColorRole;
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
  if (Array.isArray(props.radius)) {
    return props.radius.map(r => resolveRadiusValue(r)).join(' ');
  }
  return resolveRadiusValue(props.radius);
});

// --- Color & Contrast Resolver ---
const variantSpec = computed(() => SURFACE_VARIANTS[props.variant]);

const resolvedSurfaceRole = computed(() => {
  // If the user passed a specific color role, use it. Otherwise use variant default.
  return props.color || variantSpec.value.role;
});

const resolvedSurface = computed(() => {
  const role = resolvedSurfaceRole.value;
  if (role === 'transparent') return 'transparent';
  return `var(--md-sys-color-${role})`;
});

const resolvedContentColor = computed(() => {
  const role = resolvedSurfaceRole.value;
  if (role === 'transparent') return `var(--md-sys-color-on-surface)`;
  
  // Automatic "On-Color" mapping
  // If role is 'primary', we need 'onPrimary'
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
  
  const role = resolvedSurfaceRole.value;
  const isDark = role === 'primary' || role === 'primaryContainer' || role === 'tertiary';
  const palette = isDark ? SURFACE_STATE_LAYERS.dark : SURFACE_STATE_LAYERS.light;
  
  return palette[props.state as keyof typeof palette];
});

// --- Styles ---
const surfaceStyle = computed(() => ({
  backgroundColor: resolvedSurface.value,
  border: resolvedBorder.value,
  borderRadius: resolvedRadius.value,
  filter: resolvedElevation.value,
  width: props.width ? (typeof props.width === 'number' ? `${props.width}px` : props.width) : 'auto',
  height: props.height ? (typeof props.height === 'number' ? `${props.height}px` : props.height) : 'auto',
  color: resolvedContentColor.value, // Apply contrast color to the container as well
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
