<template>
  <component :is="tag" :class="colorClass" :style="style">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { TYPE_SCALE, roleOf, type TypeStyleKey, type FONT_WEIGHTS } from '@/constants/typography'
import { TYPOGRAPHY_SPECS, type TypographyRole } from './specs';

// Allow the variant to be either a token key or a custom style object for flexibility
type VariantValue = TypeStyleKey | Partial<TypeStyle>;
type TypeColor = 'current' | 'primary' | 'secondary' | 'accent' | 'white';
type Treatment = 'uppercase' | 'lowercase' | 'capitalize' | 'none';

interface Props {
  /** Type-scale token (e.g. 'label-small') or a custom style object. */
  variant: VariantValue
  /** The semantic role (display, headline, title, body, label). */
  role?: TypographyRole
  /** The size modifier for the role (small, medium, large). */
  size?: 'small' | 'medium' | 'large'
  /** Semantic HTML tag — defaults from the role. */
  as?: string
  /** Text color token. */
  color?: TypeColor
  /** Editorial treatment for the text. */
  treatment?: Treatment
  /** Override for the font weight. */
  weight?: number | keyof typeof FONT_WEIGHTS
}

const props = withDefaults(defineProps<Props>(), {
  role: 'body',
  size: 'medium',
  color: TYPOGRAPHY_SPECS.defaults.color,
  treatment: TYPOGRAPHY_SPECS.defaults.treatment,
});

const defaultTag = computed(() => {
  // Determine role: from prop, or from variant string, or fallback to 'body'
  const activeRole = typeof props.variant === 'string' 
    ? roleOf(props.variant) 
    : props.role;
  
  const roleSpec = TYPOGRAPHY_SPECS.roles[activeRole];
  return roleSpec ? roleSpec.tag : 'span';
})

const tag = computed(() => props.as ?? defaultTag.value)

const colorClass = computed(() => {
  switch (props.color) {
    case 'primary': return 'text-[var(--color-text-primary)]'
    case 'secondary': return 'text-[var(--color-text-secondary)]'
    case 'accent': return 'text-[var(--color-accent)]'
    case 'white': return 'text-white'
    default: return ''
  }
})

const style = computed(() => {
  // 1. Determine the baseline style based on role and size
  let baseline;
  if (typeof props.variant === 'string') {
    baseline = TYPE_SCALE[props.variant];
  } else {
    const roleSpec = TYPOGRAPHY_SPECS.roles[props.role];
    const variantKey = roleSpec?.variants[props.size] || roleSpec?.defaultVariant || 'body-medium';
    baseline = TYPE_SCALE[variantKey];
  }

  // 2. Merge with custom object overrides if provided
  const t = typeof props.variant === 'object' 
    ? { ...baseline, ...props.variant } 
    : baseline;

  // 3. Resolve weight: prop override -> token default
  let weight = t.weight;
  if (props.weight) {
    weight = typeof props.weight === 'string' 
      ? (window as any).FONT_WEIGHTS?.[props.weight] || props.weight 
      : props.weight;
  }

  return {
    fontFamily: TYPOGRAPHY_SPECS.defaults.fontFamily,
    fontSize: `${t.size || TYPOGRAPHY_SPECS.defaults.fontSize}px`,
    lineHeight: `${t.lineHeight || TYPOGRAPHY_SPECS.defaults.lineHeight}px`,
    fontWeight: String(weight || TYPOGRAPHY_SPECS.defaults.fontWeight),
    letterSpacing: `${t.letterSpacing ?? TYPOGRAPHY_SPECS.defaults.letterSpacing}px`,
    textTransform: props.treatment,
  }
})
</script>

<style scoped>
</style>
