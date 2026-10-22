<template>
  <span
    class="inline-block select-none"
    :class="variantClass"
    :style="style"
    :aria-hidden="decorative ? 'true' : undefined"
    :role="decorative ? undefined : 'img'"
    :aria-label="decorative ? undefined : label"
  >{{ name }}</span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ICON_SPECS } from './specs'
import { type ColorRole } from '@/constants/colors'

type IconVariant = 'outlined' | 'rounded'
type IconColor = 'current' | ColorRole | 'accent' | 'slate' | 'white'

interface Props {
  /** Material Symbols ligature name (e.g. 'home', 'search', 'mail') */
  name: string
  /**
   * Icon style — selects the Material Symbols font family.
   * `outlined` + `fill` toggles the classic outlined vs filled look;
   * `rounded` has rounder corners.
   */
  variant?: IconVariant
  /** Rendered size in px or a size token ('xs', 'sm', 'md', 'lg', 'xl') */
  size?: number | keyof typeof ICON_SPECS.sizes
  /** Optical size (20–48) — controls stroke detail. Defaults to rendered size. */
  opsz?: number
  /** Stroke weight (100–700) */
  weight?: number
  /** Filled (true) vs outlined (false) — the FILL axis */
  fill?: boolean
  /** Grade (-50–200) — adjusts stroke emphasis */
  grade?: number
  /** Color token. `current` inherits the surrounding text color. */
  color?: IconColor
  /** Accessible label */
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'outlined',
  size: 'md',
  weight: ICON_SPECS.defaults.weight,
  fill: ICON_SPECS.defaults.fill,
  grade: ICON_SPECS.defaults.grade,
  color: 'current',
  label: undefined,
})

const decorative = computed(() => !props.label)

const variantClass = computed(() => `material-symbols-${props.variant}`)

const style = computed(() => {
  // Resolve size: check if it's a token (string) or a raw number
  const renderedSize = typeof props.size === 'string' 
    ? ICON_SPECS.sizes[props.size as keyof typeof ICON_SPECS.sizes] 
    : (props.size || ICON_SPECS.defaults.size);

  const s: any = {
    fontSize: `${renderedSize}px`,
    fontFamily: `material-symbols-${props.variant}`,
    fontVariationSettings: `'FILL' ${props.fill ? 1 : 0}, 'wght' ${props.weight}, 'GRAD' ${props.grade}, 'opsz' ${props.opsz ?? renderedSize}`,
  };

  // Role-based color resolution (bypassing Tailwind JIT)
  if (props.color && props.color !== 'current') {
    if (props.color === 'accent') s.color = 'var(--color-accent)';
    else if (props.color === 'slate') s.color = '#94a3b8';
    else if (props.color === 'white') s.color = '#ffffff';
    else {
      // Assume it's a ColorRole
      s.color = `var(--md-sys-color-${props.color})`;
    }
  }

  return s;
});
</script>

<style>
.material-symbols-outlined { font-family: 'Material Symbols Outlined' !important; }
.material-symbols-rounded { font-family: 'Material Symbols Rounded' !important; }
</style>
