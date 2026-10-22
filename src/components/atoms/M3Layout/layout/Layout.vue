<template>
  <div class="layout" :class="{ 'layout--grow': merged.grow }" :style="style">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
  layoutDefaults,
  resolveSpacing,
  type LayoutSettings,
} from './layout.defaults';

interface Props {
  /** Flex direction. Defaults from settings/layoutDefaults. */
  direction?: LayoutSettings['direction'];
  /** Gap between children (px). */
  gap?: number;
  /** Padding — number (all sides) or per-side object. */
  padding?: LayoutSettings['padding'];
  /** Margin — number (all sides) or per-side object. */
  margin?: LayoutSettings['margin'];
  /** align-items. */
  align?: LayoutSettings['align'];
  /** justify-content. */
  justify?: LayoutSettings['justify'];
  /** Allow children to wrap. */
  wrap?: boolean;
  /** Stretch children to fill the container (flex: 1 on direct children). */
  grow?: boolean;
  /** Override object — wins over layoutDefaults. */
  settings?: LayoutSettings;
}

const props = withDefaults(
  defineProps<Props>(),
  {},
);

const merged = computed<LayoutSettings>(() => {
  const s = props.settings ?? {};
  return {
    ...layoutDefaults,
    ...s,
    direction: props.direction ?? s.direction ?? layoutDefaults.direction,
    gap: props.gap ?? s.gap ?? layoutDefaults.gap,
    padding: props.padding ?? s.padding ?? layoutDefaults.padding,
    margin: props.margin ?? s.margin ?? layoutDefaults.margin,
    align: props.align ?? s.align ?? layoutDefaults.align,
    justify: props.justify ?? s.justify ?? layoutDefaults.justify,
    wrap: props.wrap ?? s.wrap ?? layoutDefaults.wrap,
    grow: props.grow ?? s.grow ?? layoutDefaults.grow,
  };
});

const style = computed(() => {
  const st: Record<string, string> = {
    display: 'flex',
    flexDirection: merged.value.direction === 'horizontal' ? 'row' : 'column',
    alignItems: merged.value.align ?? 'stretch',
    justifyContent: merged.value.justify ?? 'flex-start',
    flexWrap: merged.value.wrap ? 'wrap' : 'nowrap',
  };
  if (merged.value.gap !== undefined) st.gap = `${merged.value.gap}px`;
  const pad = resolveSpacing(merged.value.padding);
  if (pad) st.padding = pad;
  const mar = resolveSpacing(merged.value.margin);
  if (mar) st.margin = mar;
  return st;
});
</script>

<style scoped>
.layout {
  box-sizing: border-box;
}
</style>

<style>
.layout--grow > * {
  flex: 1 1 0%;
}
</style>
