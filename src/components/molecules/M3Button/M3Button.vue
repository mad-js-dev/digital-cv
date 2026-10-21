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
    <!-- STANDARD MODE: Single surface -->
    <template v-if="!split">
      <M3Surface 
        v-if="props.variant !== 'text'"
        :radius="resolvedRadius" 
        :color="variantSpec.surfaceRole"
        :variant="variantSpec.surfaceVariant"
        :elevation="variantSpec.elevation"
        :state="state"
        :padding-x="sizeConfig.paddingX"
        :padding-y="sizeConfig.paddingY"
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
            :size="props.size"
            class="flex items-center justify-center" 
          />
          <Typography 
            v-if="!props.icon || props.textVariant || hasSlot"
            :variant="textVariant || sizeConfig.textVariant" 
            :role="props.size === 'xs' ? 'label' : props.size === 'sm' ? 'label' : props.size === 'md' ? 'label' : props.size === 'lg' ? 'label' : 'title'"
            :class="textClasses"
          >
            <slot />
          </Typography>
        </Layout>
      </M3Surface>

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
          :size="props.size"
          class="flex items-center justify-center" 
        />
        <Typography 
          v-if="!props.icon || props.textVariant || hasSlot"
          :variant="textVariant || sizeConfig.textVariant" 
          :role="props.size === 'xs' ? 'label' : props.size === 'sm' ? 'label' : props.size === 'md' ? 'label' : props.size === 'lg' ? 'label' : 'title'"
          :class="textClasses"
        >
          <slot />
        </Typography>
      </Layout>
    </template>

    <!-- SPLIT MODE: Composite surfaces -->
    <div v-else class="flex items-center w-full h-full">
      <!-- Main Section (Left) -->
      <M3Surface 
        :radius="[resolvedRadius, 'NONE', 'NONE', resolvedRadius]" 
        :color="variantSpec.surfaceRole"
        :variant="variantSpec.surfaceVariant"
        :elevation="variantSpec.elevation"
        :state="state"
        :padding-x="sizeConfig.paddingX"
        :padding-y="sizeConfig.paddingY"
        class="flex-1"
      >
        <Layout 
          :direction="props.horizontal ? 'horizontal' : 'vertical'" 
          :gap="sizeConfig.paddingX / 3" 
          :padding="props.icon && !props.textVariant && !hasSlot ? 4 : sizeConfig.paddingY"
          class="flex items-center justify-center"
        >
          <Icon v-if="icon" :name="icon" :size="props.size" class="flex items-center justify-center" />
          <Typography 
            v-if="!props.icon || props.textVariant || hasSlot"
            :variant="textVariant || sizeConfig.textVariant" 
            :role="props.size === 'xs' ? 'label' : props.size === 'sm' ? 'label' : props.size === 'md' ? 'label' : props.size === 'lg' ? 'label' : 'title'"
            :class="textClasses"
          >
            <slot />
          </Typography>
        </Layout>
      </M3Surface>

      <!-- Dropdown Section (Right) -->
      <M3Surface 
        :radius="['NONE', resolvedRadius, resolvedRadius, 'NONE']" 
        :color="variantSpec.surfaceRole"
        :variant="variantSpec.surfaceVariant"
        :elevation="variantSpec.elevation"
        :state="state"
        :padding-x="sizeConfig.paddingX"
        :padding-y="sizeConfig.paddingY"
        class="w-12 flex items-center justify-center"
      >
        <div class="relative w-full h-full flex items-center justify-center">
          <Icon 
            :name="trailingIcon || 'expand_more'" 
            :size="props.size" 
            :class="['transition-transform duration-300', isOpen ? 'rotate-180' : '']"
          />
        </div>
      </M3Surface>
    </div>
  </button>
</template>

<script setup lang="ts">
import { ref, computed, useSlots } from 'vue';
import Layout from '@/components/atoms/M3Layout/layout/Layout.vue';
import Typography from '@/components/atoms/Typography/Typography.vue';
import Icon from '@/components/atoms/Icon/Icon.vue';
import M3Surface from '@/components/atoms/M3Surface/M3Surface.vue'; // Corrected import path check
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
  toggled?: boolean;
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
  toggled: false,
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
  if (props.toggled) return 'M';
  if (props.radius) return props.radius;
  return M3_BUTTON_SPECS.shapes[props.shape]?.radius || 'FULL';
});

const variantSpec = computed(() => M3_BUTTON_SPECS.variants[props.variant]);

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
