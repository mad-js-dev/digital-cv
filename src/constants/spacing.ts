/**
 * Material 3 spacing tokens — the `space<N>` scale.
 *
 * M3 spacing uses an 8dp base with a multiplier pattern:
 *   space225 = 18dp = 8dp × 2.25
 * Reference: https://m3.material.io/styles/spacing/applying-spacing
 */
export const SPACING_TOKENS = {
  space0: 0,
  space25: 2,
  space50: 4,
  space75: 6,
  space100: 8,
  space125: 10,
  space150: 12,
  space175: 14,
  space200: 16,
  space225: 18,
  space250: 20,
  space275: 22,
  space300: 24,
  space350: 28,
  space400: 32,
  space450: 36,
  space500: 40,
  space600: 48,
  space700: 56,
  space800: 64,
  space1000: 80,
  space1200: 96,
  space1600: 128,
  space2000: 160,
} as const;

export type SpacingTokenKey = keyof typeof SPACING_TOKENS;

/** Ordered numeric scale (px), for display/demo only. */
export const SPACING_SCALE = Object.values(SPACING_TOKENS);

/** 
 * Button configuration tokens for sizing.
 * These map semantic sizes to the actual spacing tokens.
 */
export const BUTTON_SIZES = {
  xs: {
    paddingX: SPACING_TOKENS.space100, // 8px
    paddingY: SPACING_TOKENS.space50,   // 4px
    height: 32,
  },
  sm: {
    paddingX: SPACING_TOKENS.space200, // 16px
    paddingY: SPACING_TOKENS.space100, // 8px
    height: 36,
  },
  md: {
    paddingX: SPACING_TOKENS.space300, // 24px
    paddingY: SPACING_TOKENS.space200, // 16px
    height: 40,
  },
  lg: {
    paddingX: SPACING_TOKENS.space400, // 32px
    paddingY: SPACING_TOKENS.space300, // 24px
    height: 48,
  },
  xl: {
    paddingX: SPACING_TOKENS.space600, // 48px
    paddingY: SPACING_TOKENS.space400, // 32px
    height: 56,
  },
} as const;

export type ButtonSizeKey = keyof typeof BUTTON_SIZES;
