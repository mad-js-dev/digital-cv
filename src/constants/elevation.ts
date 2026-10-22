/**
 * Material 3 Elevation Tokens
 * 
 * Defined based on M3 elevation levels.
 * Each level specifies the blur and offset to create a natural depth effect.
 * Reference: https://m3.material.io/styles/elevation/tokens
 */

export const ELEVATION_TOKENS = {
  level0: {
    blur: 0,
    offsetY: 0,
    color: 'transparent',
    tint: 0,
  },
  level1: {
    blur: 1,
    offsetY: 1,
    color: 'rgba(0, 0, 0, 0.15)',
    tint: 0.03,
  },
  level2: {
    blur: 3,
    offsetY: 2,
    color: 'rgba(0, 0, 0, 0.2)',
    tint: 0.06,
  },
  level3: {
    blur: 5,
    offsetY: 3,
    color: 'rgba(0, 0, 0, 0.3)',
    tint: 0.12,
  },
  level4: {
    blur: 7,
    offsetY: 4,
    color: 'rgba(0, 0, 0, 0.4)',
    tint: 0.18,
  },
} as const;

export type ElevationLevel = keyof typeof ELEVATION_TOKENS;