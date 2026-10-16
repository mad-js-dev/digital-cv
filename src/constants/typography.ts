/**
 * Material 3 Typography System
 * 
 * Reference: https://m3.material.io/styles/typography
 */

export const FONT_CONFIG = {
  primary: "'Roboto', sans-serif",
  fallback: "sans-serif",
};

export const FONT_WEIGHTS = {
  Regular: 400,
  Medium: 500,
  SemiBold: 600,
  Bold: 700,
} as const;

export interface TypeStyle {
  /** font-size in px */
  size: number;
  /** line-height in px */
  lineHeight: number;
  /** font-weight (100–900) */
  weight: number;
  /** letter-spacing in px */
  letterSpacing: number;
}

export const TYPE_SCALE = {
  // Display
  'display-large':   { size: 57, lineHeight: 64, weight: FONT_WEIGHTS.Regular, letterSpacing: -0.25 },
  'display-medium':  { size: 45, lineHeight: 52, weight: FONT_WEIGHTS.Regular, letterSpacing: 0 },
  'display-small':   { size: 36, lineHeight: 44, weight: FONT_WEIGHTS.Regular, letterSpacing: 0 },
  
  // Headline
  'headline-large':  { size: 32, lineHeight: 40, weight: FONT_WEIGHTS.Regular, letterSpacing: 0 },
  'headline-medium': { size: 28, lineHeight: 36, weight: FONT_WEIGHTS.Regular, letterSpacing: 0 },
  'headline-small':  { size: 24, lineHeight: 32, weight: FONT_WEIGHTS.Regular, letterSpacing: 0 },
  
  // Title
  'title-large':     { size: 22, lineHeight: 28, weight: FONT_WEIGHTS.Regular, letterSpacing: 0 },
  'title-medium':    { size: 16, lineHeight: 24, weight: FONT_WEIGHTS.Medium, letterSpacing: 0.15 },
  'title-small':     { size: 14, lineHeight: 20, weight: FONT_WEIGHTS.Medium, letterSpacing: 0.1 },
  
  // Body
  'body-large':      { size: 16, lineHeight: 24, weight: FONT_WEIGHTS.Regular, letterSpacing: 0.5 },
  'body-medium':     { size: 14, lineHeight: 20, weight: FONT_WEIGHTS.Regular, letterSpacing: 0.25 },
  'body-small':      { size: 12, lineHeight: 16, weight: FONT_WEIGHTS.Regular, letterSpacing: 0.4 },
  
  // Label
  'label-large':     { size: 14, lineHeight: 20, weight: FONT_WEIGHTS.Medium, letterSpacing: 0.1 },
  'label-medium':    { size: 12, lineHeight: 16, weight: FONT_WEIGHTS.Medium, letterSpacing: 0.5 },
  'label-small':     { size: 11, lineHeight: 16, weight: FONT_WEIGHTS.Medium, letterSpacing: 0.5 },
} as const;

export const TREATMENTS = {
  uppercase: 'uppercase',
  lowercase: 'lowercase',
  capitalize: 'capitalize',
  none: 'none',
} as const;

export type TypeStyleKey = keyof typeof TYPE_SCALE;
export const TYPE_ROLES = ['display', 'headline', 'title', 'body', 'label'] as const;
export type TypeRole = (typeof TYPE_ROLES)[number];
export const TYPE_SIZES = ['large', 'medium', 'small'] as const;

export function roleOf(key: TypeStyleKey): TypeRole {
  return key.split('-')[0] as TypeRole;
}
