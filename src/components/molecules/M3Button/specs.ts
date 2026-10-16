/**
 * Material 3 Button Specifications
 * 
 * These tokens define the physical dimensions, spacing, and shapes for M3 Buttons.
 * Scale is based on an 8dp grid.
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
      surface: {
        base: 'primary',
        hover: 'primary-container',
        active: 'primary',
        focused: 'primary',
      },
      content: {
        base: 'onPrimary',
        hover: 'onPrimary',
        active: 'onPrimary',
        focused: 'onPrimary',
      },
      border: 'transparent',
      shape: 'FULL',
    },
    elevated: {
      surface: {
        base: 'surface',
        hover: 'surface-variant',
        active: 'surface-variant',
        focused: 'surface-variant',
      },
      content: {
        base: 'primary',
        hover: 'primary',
        active: 'primary',
        focused: 'primary',
      },
      border: 'transparent',
      shape: 'FULL',
      elevation: {
        base: 'level1',
        hover: 'level2',
        active: 'level1',
        focused: 'level2',
      },
    },
    tonal: {
      surface: {
        base: 'secondaryContainer',
        hover: 'secondaryContainer',
        active: 'secondaryContainer',
        focused: 'secondaryContainer',
      },
      content: {
        base: 'onSecondaryContainer',
        hover: 'onSecondaryContainer',
        active: 'onSecondaryContainer',
        focused: 'onSecondaryContainer',
      },
      border: 'transparent',
      shape: 'FULL',
    },
    outlined: {
      surface: {
        base: 'transparent',
        hover: 'surface-variant',
        active: 'surface-variant',
        focused: 'surface-variant',
      },
      content: {
        base: 'primary',
        hover: 'primary',
        active: 'primary',
        focused: 'primary',
      },
      border: {
        base: 'primary',
        hover: 'primary',
        active: 'primary',
        focused: 'primary',
      },
      shape: 'FULL',
    },
    text: {
      surface: {
        base: 'transparent',
        hover: 'surface-variant',
        active: 'surface-variant',
        focused: 'surface-variant',
      },
      content: {
        base: 'primary',
        hover: 'primary',
        active: 'primary',
        focused: 'primary',
      },
      border: 'transparent',
      shape: 'FULL',
    },
  },
} as const;

export type M3ButtonVariant = keyof typeof M3_BUTTON_SPECS.variants;
export type M3ButtonSize = keyof typeof M3_BUTTON_SPECS.sizes;
export type M3ButtonShape = keyof typeof M3_BUTTON_SPECS.shapes;
