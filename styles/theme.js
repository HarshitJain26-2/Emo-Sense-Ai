// EmotionSense Design System - Color Tokens
// Ported from the "Digital Empathy" design system

export const Colors = {
  // Backgrounds
  background: '#0b1326',
  surface: '#0b1326',
  surfaceDim: '#0b1326',
  surfaceBright: '#31394d',
  surfaceContainerLowest: '#060e20',
  surfaceContainerLow: '#131b2e',
  surfaceContainer: '#171f33',
  surfaceContainerHigh: '#222a3d',
  surfaceContainerHighest: '#2d3449',

  // On-Surface
  onSurface: '#dae2fd',
  onSurfaceVariant: '#cfc2d6',
  inverseSurface: '#dae2fd',
  inverseOnSurface: '#283044',

  // Outlines
  outline: '#988d9f',
  outlineVariant: '#4d4354',

  // Primary (Neon Purple)
  primary: '#ddb7ff',
  onPrimary: '#490080',
  primaryContainer: '#b76dff',
  onPrimaryContainer: '#400071',
  inversePrimary: '#842bd2',
  primaryFixed: '#f0dbff',
  primaryFixedDim: '#ddb7ff',
  onPrimaryFixed: '#2c0051',
  onPrimaryFixedVariant: '#6900b3',

  // Secondary (Electric Blue)
  secondary: '#adc6ff',
  onSecondary: '#002e6a',
  secondaryContainer: '#0566d9',
  onSecondaryContainer: '#e6ecff',
  secondaryFixed: '#d8e2ff',
  secondaryFixedDim: '#adc6ff',
  onSecondaryFixed: '#001a42',
  onSecondaryFixedVariant: '#004395',

  // Tertiary (Soft Pink)
  tertiary: '#ffb0cd',
  onTertiary: '#640039',
  tertiaryContainer: '#f751a1',
  onTertiaryContainer: '#570032',
  tertiaryFixed: '#ffd9e4',
  tertiaryFixedDim: '#ffb0cd',
  onTertiaryFixed: '#3e0022',
  onTertiaryFixedVariant: '#8c0053',

  // Error
  error: '#ffb4ab',
  onError: '#690005',
  errorContainer: '#93000a',
  onErrorContainer: '#ffdad6',

  // On-Background
  onBackground: '#dae2fd',

  // surfaceTint
  surfaceTint: '#ddb7ff',

  // Gradient helpers
  gradientBlue: '#3B82F6',
  gradientPurple: '#A855F7',
  gradientBlueStart: '#2563EB',
  gradientPurpleEnd: '#9333EA',
};

export const Spacing = {
  xs: 4,
  sm: 12,
  base: 8,
  gutter: 16,
  md: 24,
  lg: 32,
  xl: 48,
  containerPadding: 24,
};

export const BorderRadius = {
  sm: 8,
  DEFAULT: 16,
  md: 24,
  lg: 32,
  xl: 48,
  full: 9999,
};

export const Typography = {
  displayXl: {
    fontFamily: 'Inter_800ExtraBold',
    fontSize: 48,
    lineHeight: 56,
    letterSpacing: -0.96,
  },
  headlineLg: {
    fontFamily: 'Inter_700Bold',
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: -0.32,
  },
  headlineMd: {
    fontFamily: 'Inter_700Bold',
    fontSize: 24,
    lineHeight: 32,
  },
  bodyLg: {
    fontFamily: 'Inter_400Regular',
    fontSize: 18,
    lineHeight: 28,
  },
  bodyMd: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    lineHeight: 24,
  },
  labelBold: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    lineHeight: 20,
  },
};
