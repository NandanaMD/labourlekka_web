import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// HARDCODED fallback colors - these NEVER depend on external imports
const FALLBACK_COLORS = {
  background: '#F8FAFC',
  primary: '#475569',
  surface: '#FFFFFF',
  onSurface: '#0F172A',
};

// Import themes AFTER defining fallbacks
let lightTheme;
let Colors;
let getThemeByVariant;
let setActiveThemeVariant;
let THEME_VARIANTS;
try {
  const themes = require('./themes');
  lightTheme = themes.lightTheme;
  Colors = themes.Colors;
  getThemeByVariant = themes.getThemeByVariant;
  setActiveThemeVariant = themes.setActiveThemeVariant;
  THEME_VARIANTS = themes.THEME_VARIANTS;
} catch (e) {
  // Create minimal fallback theme
  lightTheme = {
    colors: FALLBACK_COLORS,
  };
  Colors = FALLBACK_COLORS;
  getThemeByVariant = () => lightTheme;
  setActiveThemeVariant = () => 'classic';
  THEME_VARIANTS = {
    CLASSIC: 'classic',
    MIDNIGHT_BLUE: 'midnight_blue',
  };
}

// Create safe default theme
const safeTheme = lightTheme && lightTheme.colors ? lightTheme : { colors: FALLBACK_COLORS };

const ThemeContext = createContext({
  theme: safeTheme,
  isDark: false,
  isThemeReady: false,
  themePreference: THEME_VARIANTS.CLASSIC,
  changeTheme: () => {},
  THEME_OPTIONS: {
    CLASSIC: THEME_VARIANTS.CLASSIC,
    MIDNIGHT_BLUE: THEME_VARIANTS.MIDNIGHT_BLUE,
    LIGHT: THEME_VARIANTS.CLASSIC,
    DARK: THEME_VARIANTS.MIDNIGHT_BLUE,
    SYSTEM: THEME_VARIANTS.CLASSIC,
  },
});

const THEME_STORAGE_KEY = '@app_theme_preference';

// Theme options
export const THEME_OPTIONS = {
  CLASSIC: THEME_VARIANTS.CLASSIC,
  MIDNIGHT_BLUE: THEME_VARIANTS.MIDNIGHT_BLUE,
  // Backward-compatible aliases
  LIGHT: THEME_VARIANTS.CLASSIC,
  DARK: THEME_VARIANTS.MIDNIGHT_BLUE,
  SYSTEM: THEME_VARIANTS.CLASSIC,
};

const normalizeThemePreference = (preference) => {
  if (
    preference === THEME_OPTIONS.MIDNIGHT_BLUE ||
    preference === THEME_OPTIONS.DARK ||
    preference === 'dark'
  ) {
    return THEME_OPTIONS.MIDNIGHT_BLUE;
  }

  return THEME_OPTIONS.CLASSIC;
};

export const ThemeProvider = ({ children }) => {
  const [themePreference, setThemePreference] = useState(THEME_OPTIONS.CLASSIC);
  const [currentTheme, setCurrentTheme] = useState(safeTheme);
  const [isDark, setIsDark] = useState(false);
  const [isThemeReady, setIsThemeReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    const initializeTheme = async () => {
      try {
        const savedPreference = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        const resolvedPreference = normalizeThemePreference(savedPreference);
        const appliedPreference = setActiveThemeVariant(resolvedPreference);
        const nextTheme = getThemeByVariant(appliedPreference);

        if (!mounted) {
          return;
        }

        setThemePreference(appliedPreference);
        setCurrentTheme(nextTheme && nextTheme.colors ? nextTheme : safeTheme);
        setIsDark(appliedPreference === THEME_OPTIONS.MIDNIGHT_BLUE);
      } catch (error) {
        const fallbackPreference = setActiveThemeVariant(THEME_OPTIONS.CLASSIC);
        if (!mounted) {
          return;
        }

        setThemePreference(fallbackPreference);
        setCurrentTheme(getThemeByVariant(fallbackPreference));
        setIsDark(false);
      } finally {
        if (mounted) {
          setIsThemeReady(true);
        }
      }
    };

    initializeTheme();

    return () => {
      mounted = false;
    };
  }, []);

  const changeTheme = async (newPreference) => {
    const resolvedPreference = normalizeThemePreference(newPreference);
    const appliedPreference = setActiveThemeVariant(resolvedPreference);
    const nextTheme = getThemeByVariant(appliedPreference);

    setThemePreference(appliedPreference);
    setCurrentTheme(nextTheme && nextTheme.colors ? nextTheme : safeTheme);
    setIsDark(appliedPreference === THEME_OPTIONS.MIDNIGHT_BLUE);

    await AsyncStorage.setItem(THEME_STORAGE_KEY, appliedPreference);
  };

  const value = {
    theme: currentTheme,
    isDark,
    isThemeReady,
    themePreference,
    changeTheme,
    THEME_OPTIONS,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  // Multiple layers of fallback protection
  if (!context) {
    return {
      theme: { colors: FALLBACK_COLORS },
      isDark: false,
      isThemeReady: true,
      themePreference: THEME_OPTIONS.CLASSIC,
      changeTheme: () => {},
      THEME_OPTIONS,
    };
  }
  
  if (!context.theme) {
    return {
      ...context,
      theme: { colors: FALLBACK_COLORS },
    };
  }
  
  if (!context.theme.colors) {
    return {
      ...context,
      theme: { ...context.theme, colors: FALLBACK_COLORS },
    };
  }
  
  return context;
};

// Export Colors for direct use
export { Colors };
