import { ref, computed, onMounted } from 'vue';
import { M3_COLOR_PALETTES } from '@/constants/colors';

export type ThemeMode = 'light' | 'dark';

const currentTheme = ref<ThemeMode>('light'); // Set to light for the white background requested

export function useTheme() {
  const theme = computed({
    get: () => currentTheme.value,
    set: (val: ThemeMode) => {
      currentTheme.value = val;
      applyTheme(val);
    },
  });

  function applyTheme(mode: ThemeMode) {
    const root = document.documentElement;
    
    Object.entries(M3_COLOR_PALETTES).forEach(([role, palette]) => {
      const color = palette[mode];
      // Inject as --md-sys-color-role
      root.style.setProperty(`--md-sys-color-${role}`, color);
    });
  }

  onMounted(() => {
    applyTheme(currentTheme.value);
  });

  return {
    theme,
    applyTheme,
  };
}
