import { getScaledFontSize, getScaledLineHeight } from './fonts';

export const THEME_VARIANTS = {
  CLASSIC: 'classic',
  MIDNIGHT_BLUE: 'midnight_blue',
};

const createPalette = (overrides = {}) => ({
  // Primary Colors
  primary: '#2B3E34',
  primaryLight: '#708C69',
  primaryDark: '#5E7757',

  // Accent Colors
  accent: '#708C69',
  accentLight: '#BDD3CE',
  accentMuted: '#CED8B2',

  // Semantic Colors
  success: '#5E7757',
  successLight: '#D1FAE5',
  warning: '#D97706',
  warningLight: '#FEF3C7',
  error: '#E11D48',
  errorLight: '#FFE4E6',

  // Neutral Colors
  background: '#FCF3E3',
  backgroundTertiary: '#CED8B2',
  surface: '#FFFFFF',
  surfaceAlt: '#F5F5F5',
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  divider: '#E2E8F0',

  // Text Colors
  textPrimary: '#2B3E34',
  textSecondary: '#5E7757',
  textMuted: '#9CA3AF',
  textInverse: '#FFFFFF',

  // Special Purpose
  cardShadow: '#2B3E30',
  overlay: 'rgba(43, 62, 52, 0.5)',

  // Tab Bar Colors
  tabActive: '#708C69',
  tabInactive: '#94A3B8',
  tabIndicator: '#2B3E34',

  // Status / Badge Colors
  present: '#5E7757',
  presentBg: '#E8F0E6',
  halfDay: '#D97706',
  halfDayBg: '#FEF3C7',
  absent: '#E11D48',
  absentBg: '#FFE4E6',

  // Transaction Type Colors
  successBg: '#E8F0E6',
  warningBg: '#FEF3C7',
  infoBg: '#DBEAFE',
  info: '#3B82F6',

  // Balance Colors
  positiveBalance: '#5E7757',
  negativeBalance: '#E11D48',
  zeroBalance: '#5E7757',

  // Category Accent Colors
  categoryBlue: '#3B82F6',
  categoryOrange: '#F59E0B',
  categoryGreen: '#10B981',
  categoryPurple: '#8B5CF6',

  ...overrides,
});

const paletteByVariant = {
  [THEME_VARIANTS.CLASSIC]: createPalette(),
  [THEME_VARIANTS.MIDNIGHT_BLUE]: createPalette({
    // Brand family from provided palette
    primary: '#1C2E4A',
    primaryLight: '#52677D',
    primaryDark: '#0F1A2B',

    // Accent family from provided palette
    accent: '#52677D',
    accentLight: '#BDC4D4',
    accentMuted: '#D1CFC9',

    // Surface hierarchy from provided palette
    background: '#D1CFC9',
    backgroundTertiary: '#BDC4D4',
    surface: '#D1CFC9',
    surfaceAlt: '#BDC4D4',
    border: '#52677D',
    borderLight: '#52677D',
    divider: '#52677D',

    // Text and overlays
    textPrimary: '#0F1A2B',
    textSecondary: '#1C2E4A',
    textMuted: '#52677D',
    textInverse: '#D1CFC9',
    cardShadow: '#0F1A2B',
    overlay: 'rgba(15, 26, 43, 0.56)',

    // Tab colors
    tabActive: '#1C2E4A',
    tabInactive: '#52677D',
    tabIndicator: '#0F1A2B',

    // Status family restricted to provided palette
    success: '#52677D',
    successLight: '#BDC4D4',
    warning: '#1C2E4A',
    warningLight: '#D1CFC9',
    error: '#0F1A2B',
    errorLight: '#BDC4D4',

    present: '#52677D',
    presentBg: '#BDC4D4',
    halfDay: '#1C2E4A',
    halfDayBg: '#D1CFC9',
    absent: '#0F1A2B',
    absentBg: '#BDC4D4',

    successBg: '#BDC4D4',
    warningBg: '#D1CFC9',
    infoBg: '#BDC4D4',
    info: '#52677D',

    positiveBalance: '#52677D',
    negativeBalance: '#0F1A2B',
    zeroBalance: '#1C2E4A',

    categoryBlue: '#52677D',
    categoryOrange: '#1C2E4A',
    categoryGreen: '#0F1A2B',
    categoryPurple: '#1C2E4A',
  }),
};

const resolveVariant = (variant) => (
  variant === THEME_VARIANTS.MIDNIGHT_BLUE
    ? THEME_VARIANTS.MIDNIGHT_BLUE
    : THEME_VARIANTS.CLASSIC
);

let activeThemeVariant = THEME_VARIANTS.CLASSIC;

// This object is intentionally mutated in-place so existing imports keep working.
export const Colors = { ...paletteByVariant[THEME_VARIANTS.CLASSIC] };

const applyPaletteToColors = (palette) => {
  Object.keys(Colors).forEach((key) => {
    if (!Object.prototype.hasOwnProperty.call(palette, key)) {
      delete Colors[key];
    }
  });
  Object.assign(Colors, palette);
};

export const setActiveThemeVariant = (variant) => {
  const resolved = resolveVariant(variant);
  activeThemeVariant = resolved;
  applyPaletteToColors(paletteByVariant[resolved]);
  return resolved;
};

export const getActiveThemeVariant = () => activeThemeVariant;

const buildPaperTheme = (variant) => {
  const palette = paletteByVariant[resolveVariant(variant)];

  return {
    dark: false,
    roundness: 4,
    version: 3,
    isV3: true,
    colors: {
      primary: palette.primary,
      onPrimary: '#FFFFFF',
      primaryContainer: palette.primaryLight,
      onPrimaryContainer: '#FFFFFF',
      secondary: palette.accent,
      onSecondary: '#FFFFFF',
      secondaryContainer: palette.accentMuted,
      onSecondaryContainer: palette.textPrimary,
      tertiary: palette.primaryLight,
      onTertiary: '#FFFFFF',
      tertiaryContainer: palette.surfaceAlt,
      onTertiaryContainer: palette.textPrimary,
      error: palette.error,
      onError: '#FFFFFF',
      errorContainer: palette.errorLight,
      onErrorContainer: palette.error,
      background: palette.background,
      onBackground: palette.textPrimary,
      surface: palette.surface,
      onSurface: palette.textPrimary,
      surfaceVariant: palette.surfaceAlt,
      onSurfaceVariant: palette.textSecondary,
      outline: palette.border,
      outlineVariant: palette.borderLight,
      shadow: palette.cardShadow,
      scrim: palette.overlay,
      inverseSurface: palette.primaryDark,
      inverseOnSurface: palette.textInverse,
      inversePrimary: palette.accentLight,
      elevation: {
        level0: 'transparent',
        level1: palette.surface,
        level2: palette.surface,
        level3: palette.surfaceAlt,
        level4: palette.surfaceAlt,
        level5: palette.surfaceAlt,
      },
      surfaceDisabled: 'rgba(15, 26, 43, 0.12)',
      onSurfaceDisabled: 'rgba(15, 26, 43, 0.38)',
      backdrop: palette.overlay,

      // App-specific colors
      success: palette.success,
      warning: palette.warning,
      info: palette.info,
      present: palette.present,
      halfDay: palette.halfDay,
      absent: palette.absent,
      cardBackground: palette.surface,
      screenBackground: palette.background,
      headerBackground: palette.primary,
      listItemBackground: palette.surface,
      borderColor: palette.border,
      positiveBalance: palette.positiveBalance,
      negativeBalance: palette.negativeBalance,
      zeroBalance: palette.zeroBalance,
    },
    fonts: {
      displayLarge: { fontFamily: 'GoogleSans-Regular', fontSize: getScaledFontSize(57), fontWeight: '400', letterSpacing: 0, lineHeight: getScaledLineHeight(64) },
      displayMedium: { fontFamily: 'GoogleSans-Regular', fontSize: getScaledFontSize(45), fontWeight: '400', letterSpacing: 0, lineHeight: getScaledLineHeight(52) },
      displaySmall: { fontFamily: 'GoogleSans-Regular', fontSize: getScaledFontSize(36), fontWeight: '400', letterSpacing: 0, lineHeight: getScaledLineHeight(44) },
      headlineLarge: { fontFamily: 'GoogleSans-Regular', fontSize: getScaledFontSize(32), fontWeight: '400', letterSpacing: 0, lineHeight: getScaledLineHeight(40) },
      headlineMedium: { fontFamily: 'GoogleSans-Regular', fontSize: getScaledFontSize(28), fontWeight: '400', letterSpacing: 0, lineHeight: getScaledLineHeight(36) },
      headlineSmall: { fontFamily: 'GoogleSans-Regular', fontSize: getScaledFontSize(24), fontWeight: '400', letterSpacing: 0, lineHeight: getScaledLineHeight(32) },
      titleLarge: { fontFamily: 'GoogleSans-Regular', fontSize: getScaledFontSize(22), fontWeight: '400', letterSpacing: 0, lineHeight: getScaledLineHeight(28) },
      titleMedium: { fontFamily: 'GoogleSans-Medium', fontSize: getScaledFontSize(16), fontWeight: '500', letterSpacing: 0.15, lineHeight: getScaledLineHeight(24) },
      titleSmall: { fontFamily: 'GoogleSans-Medium', fontSize: getScaledFontSize(14), fontWeight: '500', letterSpacing: 0.1, lineHeight: getScaledLineHeight(20) },
      labelLarge: { fontFamily: 'GoogleSans-Medium', fontSize: getScaledFontSize(14), fontWeight: '500', letterSpacing: 0.1, lineHeight: getScaledLineHeight(20) },
      labelMedium: { fontFamily: 'GoogleSans-Medium', fontSize: getScaledFontSize(12), fontWeight: '500', letterSpacing: 0.5, lineHeight: getScaledLineHeight(16) },
      labelSmall: { fontFamily: 'GoogleSans-Medium', fontSize: getScaledFontSize(11), fontWeight: '500', letterSpacing: 0.5, lineHeight: getScaledLineHeight(16) },
      bodyLarge: { fontFamily: 'GoogleSans-Regular', fontSize: getScaledFontSize(16), fontWeight: '400', letterSpacing: 0.15, lineHeight: getScaledLineHeight(24) },
      bodyMedium: { fontFamily: 'GoogleSans-Regular', fontSize: getScaledFontSize(14), fontWeight: '400', letterSpacing: 0.25, lineHeight: getScaledLineHeight(20) },
      bodySmall: { fontFamily: 'GoogleSans-Regular', fontSize: getScaledFontSize(12), fontWeight: '400', letterSpacing: 0.4, lineHeight: getScaledLineHeight(16) },
      default: { fontFamily: 'GoogleSans-Regular', fontSize: getScaledFontSize(14), fontWeight: '400', letterSpacing: 0, lineHeight: getScaledLineHeight(20) },
    },
    animation: {
      scale: 1.0,
    },
  };
};

export const lightTheme = buildPaperTheme(THEME_VARIANTS.CLASSIC);
export const midnightBlueTheme = buildPaperTheme(THEME_VARIANTS.MIDNIGHT_BLUE);

// Kept for backward compatibility where "darkTheme" was imported.
export const darkTheme = midnightBlueTheme;

export const getThemeByVariant = (variant) => (
  resolveVariant(variant) === THEME_VARIANTS.MIDNIGHT_BLUE ? midnightBlueTheme : lightTheme
);

// Backward compatibility: old callers still pass a boolean.
export const getTheme = (isDark) => (isDark ? darkTheme : lightTheme);

// Legacy structured export retained for compatibility.
export const theme = {
  colors: {
    brand: {
      primary: Colors.primary,
      secondary: Colors.accent,
      tertiary: Colors.primaryLight,
      shadow: Colors.cardShadow,
    },
    background: {
      primary: Colors.background,
      secondary: Colors.surfaceAlt,
      tertiary: Colors.backgroundTertiary,
      surface: Colors.surface,
    },
    text: {
      primary: Colors.textPrimary,
      secondary: Colors.textSecondary,
      tertiary: Colors.textMuted,
      inverse: Colors.textInverse,
      muted: Colors.textMuted,
    },
    status: {
      success: Colors.success,
      warning: Colors.warning,
      error: Colors.error,
      info: Colors.info,
    },
    interactive: {
      active: Colors.accent,
      hover: Colors.primaryLight,
      disabled: Colors.textMuted,
      focus: Colors.primary,
    },
  },
};

export default Colors;
