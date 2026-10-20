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
  neutral: ['surface', 'surfaceVariant', 'surfaceContainerLowest', 'surfaceContainerLow', 'surfaceContainer', 'surfaceContainerHigh', 'surfaceContainerHighest'] as const,
  tonal: ['primaryContainer', 'secondaryContainer', 'tertiaryContainer'] as const,
  utility: ['success', 'warning', 'info', 'error'] as const,
  depth: ['surfaceBright', 'surfaceDim'] as const,
} as const;

export type SurfaceRoleCategory = keyof typeof SURFACE_ROLES;
export type SurfaceRole = typeof SURFACE_ROLES[SurfaceRoleCategory][number];

export const SURFACE_VARIANTS = {
  filled: {
    role: 'primary',
    onRole: 'onPrimary',
    border: 'none',
  },
  tonal: {
    role: 'primaryContainer',
    onRole: 'onPrimaryContainer',
    border: 'none',
  },
  container: {
    role: 'surfaceContainer',
    onRole: 'onSurface',
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

export const SURFACE_PADDING = {
  none: 0,
  xs: SPACING_TOKENS.xs || 4,
  sm: SPACING_TOKENS.sm || 8,
  md: SPACING_TOKENS.md || 16,
  lg: SPACING_TOKENS.lg || 24,
} as const;

export type SurfacePadding = keyof typeof SURFACE_PADDING;
