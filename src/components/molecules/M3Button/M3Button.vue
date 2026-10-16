<template>
  <button 
    :class="[
      'relative flex items-center justify-center transition-all duration-200 focus:outline-none group',
      variantWrapperClass
    ]"
    :style="containerStyle"
    @click="$emit('click')"
    @mouseenter="state = 'hover'"
    @mouseleave="state = 'base'"
    @mousedown="state = 'active'"
    @mouseup="state = 'hover'"
    @focus="state = 'focused'"
    @blur="state = 'base'"
  >
    <!-- STANDARD MODE: Single capsule -->
    <template v-if="!split">
      <Shape 
        v-if="props.variant !== 'text'"
        :radius="resolvedRadius" 
        stretch 
        :color="resolvedSurface"
        :stroke="resolvedBorder"
        :stroke-width="props.variant === 'outlined' ? 2 : 0"
        :elevation="resolvedElevation"
        :padding-x="pixelRadius"
        :state="state"
      >
        <Layout 
          :direction="props.horizontal ? 'horizontal' : 'vertical'" 
          :gap="sizeConfig.paddingX / 3" 
          :padding="props.icon && !props.textVariant && !hasSlot ? 4 : sizeConfig.paddingY"
          class="flex items-center justify-center"
        >
          <Icon 
            v-if="icon" 
            :name="icon" 
            :color="resolvedContent"
            :size="props.size"
            class="flex items-center justify-center" 
          />
          <Typography 
            v-if="!props.icon || props.textVariant || hasSlot"
            :variant="textVariant || sizeConfig.textVariant" 
            :role="props.size === 'xs' ? 'label' : props.size === 'sm' ? 'label' : props.size === 'md' ? 'label' : props.size === 'lg' ? 'label' : 'title'"
            :style="{ color: `var(--md-sys-color-${resolvedContent})` }"
            :class="textClasses"
          >
            <slot />
          </Typography>
        </Layout>
      </Shape>

      <!-- Fallback for text variant -->
      <Layout 
        v-else
        :direction="props.horizontal ? 'horizontal' : 'vertical'" 
        :gap="sizeConfig.paddingX / 3" 
        :padding="props.icon && !props.textVariant && !hasSlot ? 4 : sizeConfig.paddingY"
        class="flex items-center justify-center"
      >
        <Icon 
          v-if="icon" 
          :name="icon" 
          :color="resolvedContent"
          :size="props.size"
          class="flex items-center justify-center" 
        />
        <Typography 
          v-if="!props.icon || props.textVariant || hasSlot"
          :variant="textVariant || sizeConfig.textVariant" 
          :role="props.size === 'xs' ? 'label' : props.size === 'sm' ? 'label' : props.size === 'md' ? 'label' : props.size === 'lg' ? 'label' : 'title'"
          :style="{ color: `var(--md-sys-color-${resolvedContent})` }"
          :class="textClasses"
        >
          <slot />
        </Typography>
      </Layout>
    </template>

    <!-- SPLIT MODE: Composite capsule -->
    <div v-else class="flex items-center w-full h-full">
      <!-- Main Section (Left) -->
      <Shape 
        :radius="[resolvedRadius, 'NONE', 'NONE', resolvedRadius]" 
        stretch 
        :color="resolvedSurface"
        :stroke="resolvedBorder"
        :stroke-width="props.variant === 'outlined' ? 2 : 0"
        :elevation="resolvedElevation"
        :padding-x="pixelRadius"
        class="flex-1"
      >
        <Layout 
          :direction="props.horizontal ? 'horizontal' : 'vertical'" 
          :gap="sizeConfig.paddingX / 3" 
          :padding="props.icon && !props.textVariant && !hasSlot ? 4 : sizeConfig.paddingY"
          class="flex items-center justify-center"
        >
          <Icon v-if="icon" :name="icon" :color="resolvedContent" :size="props.size" class="flex items-center justify-center" />
          <Typography 
            v-if="!props.icon || props.textVariant || hasSlot"
            :variant="textVariant || sizeConfig.textVariant" 
            :role="props.size === 'xs' ? 'label' : props.size === 'sm' ? 'label' : props.size === 'md' ? 'label' : props.size === 'lg' ? 'label' : 'title'"
            :style="{ color: `var(--md-sys-color-${resolvedContent})` }"
            :class="textClasses"
          >
            <slot />
          </Typography>
        </Layout>
      </Shape>

      <!-- Dropdown Section (Right) -->
      <Shape 
        :radius="['NONE', resolvedRadius, resolvedRadius, 'NONE']" 
        stretch 
        :color="resolvedSurface"
        :stroke="resolvedBorder"
        :stroke-width="props.variant === 'outlined' ? 2 : 0"
        :elevation="resolvedElevation"
        :padding-x="pixelRadius"
        class="w-12 flex items-center justify-center"
      >
        <div class="relative w-full h-full flex items-center justify-center">
          <Icon 
            :name="trailingIcon || 'expand_more'" 
            :color="resolvedContent" 
            :size="props.size" 
            :class="['transition-transform duration-300', isOpen ? 'rotate-180' : '']"
          />
        </div>
      </Shape>
    </div>
  </button>
</template>

<script setup lang="ts">
import { ref, computed, useSlots } from 'vue';
import Layout from '@/components/atoms/M3Layout/layout/Layout.vue';
import Typography from '@/components/atoms/Typography/Typography.vue';
import Icon from '@/components/atoms/Icon/Icon.vue';
import Shape from '@/components/atoms/M3Shape/Shape.vue';
import { M3_BUTTON_SPECS, type M3ButtonSize, type M3ButtonVariant, type M3ButtonShape } from './specs';
import { SPACING_TOKENS } from '@/constants/spacing';
import { CORNER_RADIUS, type CornerRadius } from '@/constants/corners';

interface Props {
  variant?: M3ButtonVariant;
  size?: M3ButtonSize;
  shape?: M3ButtonShape;
  icon?: string;
  textVariant?: string;
  horizontal?: boolean;
  radius?: CornerRadius;
  split?: boolean;
  trailingIcon?: string;
  isOpen?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'filled',
  size: 'md',
  shape: 'round',
  textVariant: undefined,
  horizontal: true,
  split: false,
  trailingIcon: 'expand_more',
  isOpen: false,
});

const slots = useSlots();
const hasSlot = computed(() => !!slots.default);

const emit = defineEmits(['click']);

// Interaction State
const state = ref<'base' | 'hover' | 'active' | 'focused'>('base');

const sizeConfig = computed(() => {
  const spec = M3_BUTTON_SPECS.sizes[props.size];
  const resolve = (token: any) => {
    if (typeof token === 'number') return token;
    return SPACING_TOKENS[token] || 0;
  };
  return {
    height: resolve(spec.height),
    paddingX: resolve(spec.paddingX),
    paddingY: resolve(spec.paddingY),
    textVariant: spec.textVariant,
    label: spec.label,
  };
});

const resolvedRadius = computed(() => {
  if (state.value === 'active') {
    if (props.shape === 'round') return 'S';
    if (props.shape === 'square') return 'FULL';
    return props.radius || 'FULL';
  }
  if (props.radius) return props.radius;
  return M3_BUTTON_SPECS.shapes[props.shape]?.radius || 'FULL';
});

const variantSpec = computed(() => M3_BUTTON_SPECS.variants[props.variant]);

const pixelRadius = computed(() => {
  const r = resolvedRadius.value;
  if (typeof r === 'number') return r;
  if (r === 'FULL') return sizeConfig.value.height / 2;
  
  // We need to resolve the token (e.g., 'S', 'M', 'L') to its numeric value from CORNER_RADIUS
  // We import CORNER_RADIUS at the top, so we can use it here.
  const resolved = (r as any);
  const val = (typeof resolved === 'string' && resolved in CORNER_RADIUS) 
    ? CORNER_RADIUS[resolved as any] 
    : 0;
    
  return typeof val === 'number' ? val : 0;
});

// Dynamic State Resolvers
const resolvedSurface = computed(() => {
  const s = variantSpec.value.surface;
  if (typeof s === 'object') return s.base;
  return s;
});

const resolvedContent = computed(() => {
  const c = variantSpec.value.content;
  return typeof c === 'object' ? c[state.value] : c;
});

const resolvedBorder = computed(() => {
  const b = variantSpec.value.border;
  return typeof b === 'object' ? b[state.value] : b;
});

const resolvedElevation = computed(() => {
  const e = variantSpec.value.elevation;
  return typeof e === 'object' ? e[state.value] : e || 'level0';
});

const variantWrapperClass = computed(() => {
  switch (props.variant) {
    case 'elevated': return ''; 
    case 'outlined': return '';
    default: return '';
  }
});

const textClasses = {
  filled: 'text-black',
  tonal: 'text-black',
  elevated: 'text-black',
  outlined: 'text-black',
  text: 'text-black',
}[props.variant || 'filled'];

const containerStyle = computed(() => {
  const spec = M3_BUTTON_SPECS.variants[props.variant];
  const isIconButton = props.icon && !props.textVariant && !hasSlot.value;
  return {
    minHeight: `${sizeConfig.value.height}px`,
    height: `${sizeConfig.value.height}px`,
    minWidth: isIconButton ? `${sizeConfig.value.height}px` : 'auto',
    width: isIconButton ? `${sizeConfig.value.height}px` : 'auto',
    '--color-accent': spec.surface,
    boxShadow: 'none',
  };
});
</script>

<style scoped>
.text-primary { color: var(--color-primario); }
.text-on-primary { color: #ffffff; }
.text-secondary-container { color: var(--color-secondary, #e8def8); }
.text-on-secondary-container { color: #1d192b; }
</style>
