/**
 * Material Symbols Icon Specifications
 * 
 * These tokens define the default sizing, weights, and color roles
 * for the Icon atom to ensure consistency across the design system.
 */

import { type ColorRole } from '@/constants/colors';

export const ICON_SPECS = {
  defaults: {
    size: 24,
    weight: 400,
    grade: 0,
    opsz: 24,
    fill: false,
    // Default color role if none is provided
    color: 'onSurface' as ColorRole,
    variant: 'outlined',
  },
  // Preset sizes for common use cases
  sizes: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 32,
    xl: 48,
  },
} as const;

export type IconSizeToken = keyof typeof ICON_SPECS.sizes;
