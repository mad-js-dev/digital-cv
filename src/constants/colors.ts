/**
 * Material 3 Color System
 * 
 * M3 uses a role-based color system. Instead of picking a specific color, 
 * components use a "Role" (e.g., 'primary'). The actual color value of 
 * that role changes based on the active theme (Light vs Dark).
 * 
 * Reference: https://m3.material.io/styles/color/roles
 */

export const M3_COLOR_PALETTES = {
  primary: {
    light: '#6750A4',
    dark: '#D0BCFF',
  },
  onPrimary: {
    light: '#FFFFFF',
    dark: '#381E72',
  },
  primaryContainer: {
    light: '#EADDFF',
    dark: '#4F378B',
  },
  onPrimaryContainer: {
    light: '#21005D',
    dark: '#EADDFF',
  },
  secondary: {
    light: '#625B71',
    dark: '#CFC8E1',
  },
  onSecondary: {
    light: '#FFFFFF',
    dark: '#332D41',
  },
  secondaryContainer: {
    light: '#E8DEF8',
    dark: '#4A435E',
  },
  onSecondaryContainer: {
    light: '#1D192B',
    dark: '#E8DEF8',
  },
  tertiary: {
    light: '#7D5260',
    dark: '#EFB8C8',
  },
  onTertiary: {
    light: '#FFFFFF',
    dark: '#33111D',
  },
  tertiaryContainer: {
    light: '#FFD8E4',
    dark: '#492C35',
  },
  onTertiaryContainer: {
    light: '#31111D',
    dark: '#FFD8E4',
  },
  error: {
    light: '#B3261E',
    dark: '#F2B8B5',
  },
  onError: {
    light: '#FFFFFF',
    dark: '#601410',
  },
  errorContainer: {
    light: '#F9DEDC',
    dark: '#93000A',
  },
  onErrorContainer: {
    light: '#410002',
    dark: '#F9DEDC',
  },
  surface: {
    light: '#FEF7FF',
    dark: '#1C1B1F',
  },
  onSurface: {
    light: '#1C1B1F',
    dark: '#E6E1E5',
  },
  surfaceVariant: {
    light: '#E7E0EC',
    dark: '#49454F',
  },
  onSurfaceVariant: {
    light: '#49454F',
    dark: '#CAC4D0',
  },
  surfaceContainerLowest: {
    light: '#FFFFFF',
    dark: '#000000',
  },
  surfaceContainerLow: {
    light: '#F7F2FA',
    dark: '#1D1B20',
  },
  surfaceContainer: {
    light: '#F3EDF7',
    dark: '#211F26',
  },
  surfaceContainerHigh: {
    light: '#ECE6F0',
    dark: '#2B2930',
  },
  surfaceContainerHighest: {
    light: '#E6E0E9',
    dark: '#36343B',
  },
  surfaceBright: {
    light: '#F3EDF7',
    dark: '#3C3B3F',
  },
  surfaceDim: {
    light: '#D0C9D0',
    dark: '#141216',
  },
  outline: {
    light: '#79747E',
    dark: '#938F99',
  },
  outlineVariant: {
    light: '#CAC4D0',
    dark: '#49454F',
  },
  // Utility Roles (Extended M3)
  success: {
    light: '#2E7D32',
    dark: '#81C784',
  },
  onSuccess: {
    light: '#FFFFFF',
    dark: '#003300',
  },
  successContainer: {
    light: '#C8E6C9',
    dark: '#1B5E20',
  },
  onSuccessContainer: {
    light: '#003300',
    dark: '#C8E6C9',
  },
  warning: {
    light: '#F9A825',
    dark: '#FDD835',
  },
  onWarning: {
    light: '#FFFFFF',
    dark: '#332B00',
  },
  warningContainer: {
    light: '#FFF1B8',
    dark: '#5D4037',
  },
  onWarningContainer: {
    light: '#332B00',
    dark: '#FFF1B8',
  },
  info: {
    light: '#1976D2',
    dark: '#82B1FF',
  },
  onInfo: {
    light: '#FFFFFF',
    dark: '#001A33',
  },
  infoContainer: {
    light: '#BBDEFB',
    dark: '#0D47A1',
  },
  onInfoContainer: {
    light: '#001A33',
    dark: '#BBDEFB',
  },
} as const;

export type ColorRole = keyof typeof M3_COLOR_PALETTES;

export const M3_COLOR_ROLES = {
  primary: 'primary',
  onPrimary: 'onPrimary',
  primaryContainer: 'primaryContainer',
  onPrimaryContainer: 'onPrimaryContainer',
  secondary: 'secondary',
  onSecondary: 'onSecondary',
  secondaryContainer: 'secondaryContainer',
  onSecondaryContainer: 'onSecondaryContainer',
  tertiary: 'tertiary',
  onTertiary: 'onTertiary',
  tertiaryContainer: 'tertiaryContainer',
  onTertiaryContainer: 'onTertiaryContainer',
  error: 'error',
  onError: 'onError',
  errorContainer: 'errorContainer',
  onErrorContainer: 'onErrorContainer',
  surface: 'surface',
  onSurface: 'onSurface',
  surfaceVariant: 'surfaceVariant',
  onSurfaceVariant: 'onSurfaceVariant',
  outline: 'outline',
  outlineVariant: 'outlineVariant',
} as const;
