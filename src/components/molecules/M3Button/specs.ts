/**
 * Material 3 Button Specifications
 * 
 * These tokens define the physical dimensions, spacing, and shapes for M3 Buttons.
 * Updated to align with M3Surface architecture (Variant + Role).
 */

import { CORNER_RADIUS } from '@/constants/corners';

export const M3_BUTTON_SPECS = {
  shapes: {
    round: {
      radius: 'FULL',
      label: 'Stadium/Round',
    },
    square: {
      radius: 'S',
      label: 'Soft Square',
    },
    sharp: {
      radius: 'NONE',
      label: 'Sharp Square',
    },
  },
  sizes: {
    xs: {
      height: 32,
      paddingX: 'space100',
      paddingY: 'space50',
      label: 'Extra Small',
      textVariant: 'label-small',
    },
    sm: {
      height: 40,
      paddingX: 'space200',
      paddingY: 'space100',
      label: 'Small',
      textVariant: 'label-small',
    },
    md: {
      height: 56,
      paddingX: 'space300',
      paddingY: 'space200',
      label: 'Medium',
      textVariant: 'label-large',
    },
    lg: {
      height: 96,
      paddingX: 'space400',
      paddingY: 'space300',
      label: 'Large',
      textVariant: 'title-large',
    },
    xl: {
      height: 136,
      paddingX: 'space600',
      paddingY: 'space400',
      label: 'Extra Large',
      textVariant: 'headline-large',
    },
  },
  variants: {
    filled: {
      surfaceVariant: 'filled',
      surfaceRole: 'primary',
      border: 'none',
      elevation: 'level0',
    },
    elevated: {
      surfaceVariant: 'filled',
      surfaceRole: 'surface',
      border: 'none',
      elevation: 'level1',
    },
    tonal: {
      surfaceVariant: 'tonal',
      surfaceRole: 'primary', // Result: primaryContainer
      border: 'none',
      elevation: 'level0',
    },
    outlined: {
      surfaceVariant: 'outlined',
      surfaceRole: 'surface',
      border: 'outline',
      elevation: 'level0',
    },
    text: {
      surfaceVariant: 'text',
      surfaceRole: 'transparent',
      border: 'none',
      elevation: 'level0',
    },
  },
} as const;

export type M3ButtonVariant = keyof typeof M3_BUTTON_SPECS.variants;
export type M3ButtonSize = keyof typeof M3_BUTTON_SPECS.sizes;
export type M3ButtonShape = keyof typeof M3_BUTTON_SPECS.shapes;
