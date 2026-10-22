/**
 * Default settings for the `Layout` atom.
 *
 * The atom ships with a single default setting; consumers override it by
 * passing a `settings` object (their own JSON-shaped config, possibly defining
 * additional style types like small/medium/large). See Layout.vue for merge
 * precedence: explicit props > settings > layoutDefaults.
 */
import { SPACING_TOKENS } from '@/constants/spacing';

export type LayoutDirection = 'vertical' | 'horizontal';

/** Spacing shorthand: `x`/`y` for symmetric axes, or explicit per-side values. */
export interface LayoutSpacing {
  x?: number;
  y?: number;
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

export type LayoutLength = number | LayoutSpacing;

export type LayoutAlign = 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';
export type LayoutJustify =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

export interface LayoutSettings {
  direction?: LayoutDirection;
  gap?: number;
  padding?: LayoutLength;
  margin?: LayoutLength;
  align?: LayoutAlign;
  justify?: LayoutJustify;
  wrap?: boolean;
  grow?: boolean;
}

export const layoutDefaults: LayoutSettings = {
  direction: 'vertical',
  gap: SPACING_TOKENS.space200, // 16
  padding: SPACING_TOKENS.space200, // 16
  align: 'stretch',
  justify: 'flex-start',
  wrap: false,
  grow: false,
};

/** Resolve a spacing value (number or per-side object) to a CSS length string. */
export function resolveSpacing(value: LayoutLength | undefined): string {
  if (value === undefined) return '';
  if (typeof value === 'number') return `${value}px`;
  const top = value.top ?? value.y ?? 0;
  const right = value.right ?? value.x ?? 0;
  const bottom = value.bottom ?? value.y ?? 0;
  const left = value.left ?? value.x ?? 0;
  return `${top}px ${right}px ${bottom}px ${left}px`;
}
