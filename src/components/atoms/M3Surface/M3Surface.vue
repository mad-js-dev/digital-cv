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
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ELEVATION_TOKENS, type ElevationLevel } from '@/constants/elevation';
import { M3_COLOR_PALETTES, type ColorRole } from '@/constants/colors';
import { 
  SURFACE_RADIUS, type SurfaceRadius, 
  SURFACE_VARIANTS, type SurfaceVariant, 
  SURFACE_PADDING, type SurfacePadding,
  SURFACE_PROFILES, type SurfaceProfile,
  SURFACE_DEPTH_MAP, type SurfaceDepth,
  type SurfaceRole,
  type SurfaceState
} from './specs';

interface Props {
  size?: SurfaceProfile;
  depth?: SurfaceDepth;
  radius?: SurfaceRadius | SurfaceRadius[] | number | number[];
  color?: SurfaceRole | ColorRole;
  elevation?: ElevationLevel;
  paddingX?: SurfacePadding | number | string;
  paddingY?: SurfacePadding | number | string;
  state?: SurfaceState;
  variant?: SurfaceVariant;
  width?: number | string;
  height?: number | string;
  stroke?: string;
  strokeWidth?: number;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  depth: undefined,
  radius: 'M',
  color: undefined,
  elevation: 'level0',
  paddingX: 'md',
  paddingY: 'md',
  state: 'base',
  variant: 'filledPrimary',
  width: undefined,
  height: undefined,
  stroke: 'transparent',
  strokeWidth: 0,
});

// --- Pure Helper: Role to Hex ---
const resolveHex = (role: string) => {
  if (!role || role === 'transparent') return 'transparent';
  const trimmedRole = role.trim();
  if (trimmedRole === 'transparent') return 'transparent';
  
  const palette = M3_COLOR_PALETTES[trimmedRole as ColorRole];
  return palette ? palette.light : 'transparent';
};

// --- Radius Resolver ---
const resolveRadiusValue = (val: any): string => {
  if (typeof val === 'string') {
    if (val in SURFACE_RADIUS) return `${SURFACE_RADIUS[val as SurfaceRadius]}px`;
  }
  return `${Number(val) || 0}px`;
};

const resolvedRadius = computed(() => {
  if (props.radius) {
    if (Array.isArray(props.radius)) {
      return props.radius.map(r => resolveRadiusValue(r)).join(' ');
    }
    return resolveRadiusValue(props.radius);
  }
  const sizeProfile = SURFACE_PROFILES[props.size || 'md'];
  return resolveRadiusValue(sizeProfile.radius);
});

// --- Color & Contrast Resolver ---
const variantSpec = computed(() => SURFACE_VARIANTS[props.variant]);

const resolvedSurfaceRole = computed(() => {
  if (props.color) return props.color as SurfaceRole;
  if (props.depth) return SURFACE_DEPTH_MAP[props.depth] as SurfaceRole;
  return variantSpec.value.role as SurfaceRole;
});

const resolvedSurface = computed(() => {
  return resolveHex(resolvedSurfaceRole.value);
});

const resolvedContentColor = computed(() => {
  const role = resolvedSurfaceRole.value;
  if (!role || role === 'transparent') return resolveHex('onSurface');
  
  // 1. Try Exact On-Role (e.g., primary -> onPrimary)
  const onRole = role.startsWith('on') ? role : `on${role.charAt(0).toUpperCase() + role.slice(1)}`;
  const specificOnColor = resolveHex(onRole);
  if (specificOnColor !== 'transparent') return specificOnColor;

  // 2. Try Container Fallback (e.g., primaryContainer -> onPrimary)
  if (role.toLowerCase().includes('container')) {
    const baseRole = role.toLowerCase().replace('container', '').trim();
    
    // Special Case: surfaceContainer -> onSurface
    if (baseRole === 'surface') return resolveHex('onSurface');
    
    const baseOnRole = `on${baseRole.charAt(0).toUpperCase() + baseRole.slice(1)}`;
    const baseOnColor = resolveHex(baseOnRole);
    if (baseOnColor !== 'transparent') return baseOnColor;
  }

  // 3. Global Fallback
  return resolveHex('onSurface');
});

const resolvedBorder = computed(() => {
  if (props.stroke && props.stroke !== 'transparent') {
    return `${props.strokeWidth || 0}px solid ${props.stroke}`;
  }
  if (props.variant === 'outlined') {
    return `1px solid ${resolveHex('outline')}`;
  }
  return 'none';
});

// --- Elevation Resolver ---
const resolvedElevation = computed(() => {
  const sizeProfile = SURFACE_PROFILES[props.size || 'md'];
  const elevationLevel = props.elevation || sizeProfile.elevation || 'level0';
  const spec = ELEVATION_TOKENS[elevationLevel];
  if (!spec) return 'none';
  return `drop-shadow(0px ${spec.offsetY}px ${spec.blur}px ${spec.color})`;
});

// --- State Layer Resolver ---
const stateLayerColor = computed(() => {
  if (props.state === 'base') return 'transparent';
  const onRoleColor = resolvedContentColor.value; 
  let opacity = '92%';
  if (props.state === 'focused') opacity = '90%';
  if (props.state === 'active') opacity = '88%';
  return `color-mix(in srgb, ${onRoleColor}, transparent ${opacity})`;
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
