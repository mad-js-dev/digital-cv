import { CORNER_RADIUS } from '@/constants/corners';
import { SPACING_TOKENS } from '@/constants/spacing';

export const SURFACE_RADIUS = {
  S: CORNER_RADIUS.S,
  M: CORNER_RADIUS.M,
  L: CORNER_RADIUS.L,
  FULL: 100,
} as const;

export type SurfaceRadius = keyof typeof SURFACE_RADIUS;

export const SURFACE_ROLES = {
  brand: ['primary', 'secondary', 'tertiary'] as const,
  tonal: ['primaryContainer', 'secondaryContainer', 'tertiaryContainer'] as const,
  neutral: ['surface', 'surfaceVariant', 'surfaceContainerLowest', 'surfaceContainerLow', 'surfaceContainer', 'surfaceContainerHigh', 'surfaceContainerHighest'] as const,
  utility: ['success', 'successContainer', 'warning', 'warningContainer', 'info', 'infoContainer', 'error', 'errorContainer'] as const,
  depth: ['surfaceBright', 'surfaceDim'] as const,
} as const;

export type SurfaceRoleCategory = keyof typeof SURFACE_ROLES;
export type SurfaceRole = typeof SURFACE_ROLES[SurfaceRoleCategory][number];

export const SURFACE_VARIANTS = {
  filledPrimary: {
    role: 'primary',
    onRole: 'onPrimary',
    border: 'none',
  },
  filledSecondary: {
    role: 'secondary',
    onRole: 'onSecondary',
    border: 'none',
  },
  filledTertiary: {
    role: 'tertiary',
    onRole: 'onTertiary',
    border: 'none',
  },
  filledPrimaryContainer: {
    role: 'primaryContainer',
    onRole: 'onPrimaryContainer',
    border: 'none',
  },
  filledSecondaryContainer: {
    role: 'secondaryContainer',
    onRole: 'onSecondaryContainer',
    border: 'none',
  },
  filledTertiaryContainer: {
    role: 'tertiaryContainer',
    onRole: 'onTertiaryContainer',
    border: 'none',
  },
  containerPrimary: {
    role: 'primaryContainer',
    onRole: 'onPrimaryContainer',
    border: 'none',
  },
  containerSecondary: {
    role: 'secondaryContainer',
    onRole: 'onSecondaryContainer',
    border: 'none',
  },
  containerTertiary: {
    role: 'tertiaryContainer',
    onRole: 'onTertiaryContainer',
    border: 'none',
  },
  containerError: {
    role: 'errorContainer',
    onRole: 'onErrorContainer',
    border: 'none',
  },
  containerSuccess: {
    role: 'successContainer',
    onRole: 'onSuccessContainer',
    border: 'none',
  },
  containerWarning: {
    role: 'warningContainer',
    onRole: 'onWarningContainer',
    border: 'none',
  },
  containerInfo: {
    role: 'infoContainer',
    onRole: 'onInfoContainer',
    border: 'none',
  },
  containerLowest: {
    role: 'surfaceContainerLowest',
    onRole: 'onSurface',
    border: 'none',
  },
  containerLow: {
    role: 'surfaceContainerLow',
    onRole: 'onSurface',
    border: 'none',
  },
  containerNeutral: {
    role: 'surfaceContainer',
    onRole: 'onSurface',
    border: 'none',
  },
  containerHigh: {
    role: 'surfaceContainerHigh',
    onRole: 'onSurface',
    border: 'none',
  },
  containerHighest: {
    role: 'surfaceContainerHighest',
    onRole: 'onSurface',
    border: 'none',
  },
  tonal: {
    role: 'primaryContainer',
    onRole: 'onPrimaryContainer',
    border: 'none',
  },
  outlined: {
    role: 'surface',
    onRole: 'onSurface',
    border: 'outline',
  },
  text: {
    role: 'transparent',
    onRole: 'onSurface',
    border: 'none',
  },
} as const;

export type SurfaceVariant = keyof typeof SURFACE_VARIANTS;

export const SURFACE_DEPTH_MAP = {
  lowest: 'surfaceContainerLowest',
  low: 'surfaceContainerLow',
  default: 'surfaceContainer',
  high: 'surfaceContainerHigh',
  highest: 'surfaceContainerHighest',
} as const;

export type SurfaceDepth = keyof typeof SURFACE_DEPTH_MAP;

export const SURFACE_SIZE_PROFILES = {
  xs: {
    radius: 'S',
    elevation: 'level0',
    depthRole: 'surfaceContainerLow',
    padding: 'xs',
  },
  sm: {
    radius: 'S',
    elevation: 'level1',
    depthRole: 'surfaceContainer',
    padding: 'sm',
  },
  md: {
    radius: 'M',
    elevation: 'level2',
    depthRole: 'surfaceContainerHigh',
    padding: 'md',
  },
  lg: {
    radius: 'L',
    elevation: 'level3',
    depthRole: 'surfaceContainerHighest',
    padding: 'lg',
  },
  xl: {
    radius: 'L',
    elevation: 'level4',
    depthRole: 'surfaceContainerHighest',
    padding: 'lg',
  },
} as const;

export type SurfaceSize = keyof typeof SURFACE_SIZE_PROFILES;

export const SURFACE_PADDING = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
} as const;

export type SurfacePadding = keyof typeof SURFACE_PADDING;
