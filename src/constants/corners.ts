export const CORNER_RADIUS = {
  NONE: 0,
  XS: 4,
  S: 8,
  M: 12,
  L: 16,
  LI: 20,
  XL: 28,
  XLI: 32,
  XXL: 48,
  FULL: 'FULL',
} as const;

export type CornerRadius = keyof typeof CORNER_RADIUS;

export const CORNER_RADIUS_LABELS: Record<CornerRadius, string> = {
  NONE: 'No corner value',
  XS: 'Extra small corner value',
  S: 'Small corner value',
  M: 'Medium corner value',
  L: 'Large corner value',
  LI: 'Large increased corner value',
  XL: 'Extra large corner value',
  XLI: 'Extra large increased corner value',
  XXL: 'Extra extra large corner value',
  FULL: 'Full corner value',
};
