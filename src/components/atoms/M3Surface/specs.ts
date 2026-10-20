import { CORNER_RADIUS } from '@/constants/corners';
import { SPACING_TOKENS } from '@/constants/spacing';

export const SURFACE_RADIUS = {
  S: CORNER_RADIUS.S,
  M: CORNER_RADIUS.M,
  L: CORNER_RADIUS.L,
  FULL: 9999,
} as const;

export type SurfaceRadius = keyof typeof SURFACE_RADIUS;

export const SURFACE_VARIANTS = {
  filled: {
    role: 'primary',
    onRole: 'onPrimary',
    border: 'none',
  },
  tonal: {
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

export const SURFACE_STATE_LAYERS = {
  light: {
    hover: 'rgba(0, 0, 0, 0.08)',
    active: 'rgba(0, 0, 0, 0.12)',
    focused: 'rgba(0, 0, 0, 0.1)',
  },
  dark: {
    hover: 'rgba(255, 255, 255, 0.08)',
    active: 'rgba(255, 255, 255, 0.12)',
    focused: 'rgba(255, 255, 255, 0.1)',
  },
} as const;
