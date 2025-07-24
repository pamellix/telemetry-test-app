'use client';

import {
    white,
    blackPrimary,
    blackSecondary,
    blackTertiary,
    backgroundPrimary,
    surfaceSolid01,
    surfaceSolid02,
    surfaceSolid03,
    surfaceCard,
    accent,
    success,
    warning,
    critical,
    buttonPrimary,
    buttonPrimaryHover,
    buttonSecondary,
    buttonSecondaryHover,
    inputBorder,
    inputBorderHover,
    inputBorderFocus,
} from '@salutejs/plasma-tokens-web';
// Импортируем дополнительные цвета из новых токенов
import {
    textAccent,
    textPositive,
    textWarning,
    textNegative,
    textAccentGradient,
    surfaceAccentGradient,
    surfacePositive,
    surfaceWarning,
    surfaceNegative,
    surfaceAccent,
} from '@salutejs/plasma-tokens-web/new';
// Импортируем темную тему из plasma-tokens
import { dark } from '@salutejs/plasma-tokens-web/themes';

// Типы для темы
export type ThemeType = 'light' | 'dark' | 'system';

// Структура цветов для одной темы
export interface ThemeColors {
    // Text colors - Цвета текста
    textPrimary: string;
    textSecondary: string;
    textTertiary: string;
    textInverse: string;

    // Background colors - Цвета фона
    backgroundPrimary: string;
    backgroundSecondary: string;
    backgroundTertiary: string;
    backgroundAccent: string;

    // Surface colors - Поверхности
    surfacePrimary: string;
    surfaceSecondary: string;
    surfaceElevated: string;

    // Transparent surface colors - Полупрозрачные поверхности
    surfaceTransparentWhite95: string;
    surfaceTransparentWhite90: string;
    surfaceTransparentWhite80: string;

    // Border colors - Цвета границ
    borderPrimary: string;
    borderSecondary: string;
    borderFocus: string;

    // Action colors - Цвета действий
    actionPrimary: string;
    actionPrimaryHover: string;
    actionSecondary: string;
    actionSecondaryHover: string;

    // Status colors - Статусные цвета
    statusSuccess: string;
    statusSuccessBg: string;
    statusWarning: string;
    statusWarningBg: string;
    statusError: string;
    statusErrorBg: string;
    statusInfo: string;
    statusInfoBg: string;

    // Accent colors for features
    accent1: string;
    accent1Bg: string;
    accent2: string;
    accent2Bg: string;
    accent3: string;
    accent3Bg: string;
    accent4: string;
    accent4Bg: string;
    accent5: string;
    accent5Bg: string;
}

const getLightThemeColors = (): ThemeColors => ({
    // Text colors - Цвета текста
    textPrimary: blackPrimary,
    textSecondary: blackSecondary,
    textTertiary: blackTertiary,
    textInverse: white,

    // Background colors - Цвета фона
    backgroundPrimary: backgroundPrimary,
    backgroundSecondary: surfaceSolid01,
    backgroundTertiary: surfaceSolid02,
    backgroundAccent: surfaceSolid03,

    // Surface colors - Поверхности
    surfacePrimary: white,
    surfaceSecondary: surfaceSolid01,
    surfaceElevated: surfaceCard,

    // Transparent surface colors - Полупрозрачные поверхности
    surfaceTransparentWhite95: white + 'F2',
    surfaceTransparentWhite90: white + 'E6',
    surfaceTransparentWhite80: white + 'CC',

    // Border colors - Цвета границ
    borderPrimary: inputBorder,
    borderSecondary: inputBorderHover,
    borderFocus: inputBorderFocus,

    // Action colors - Цвета действий
    actionPrimary: buttonPrimary,
    actionPrimaryHover: buttonPrimaryHover,
    actionSecondary: buttonSecondary,
    actionSecondaryHover: buttonSecondaryHover,

    // Status colors - Статусные цвета
    statusSuccess: success,
    statusSuccessBg: surfacePositive,
    statusWarning: warning,
    statusWarningBg: surfaceWarning,
    statusError: critical,
    statusErrorBg: surfaceNegative,
    statusInfo: accent,
    statusInfoBg: surfaceAccent,

    // Accent colors for features
    accent1: textAccent,
    accent1Bg: surfaceAccent,
    accent2: textPositive,
    accent2Bg: surfacePositive,
    accent3: textWarning,
    accent3Bg: surfaceWarning,
    accent4: textNegative,
    accent4Bg: surfaceNegative,
    accent5: textAccentGradient,
    accent5Bg: surfaceAccentGradient,
});

const getDarkThemeColors = (): ThemeColors => ({
    // Text colors - используем цвета из темной темы plasma
    textPrimary: dark[':root']['--plasma-colors-primary'],
    textSecondary: dark[':root']['--plasma-colors-secondary'],
    textTertiary: dark[':root']['--plasma-colors-tertiary'],
    textInverse: dark[':root']['--plasma-colors-white-primary'], // More correct inverse

    // Background colors - используем фоны из темной темы plasma
    backgroundPrimary: dark[':root']['--plasma-colors-background'],
    backgroundSecondary: dark[':root']['--plasma-colors-surface-solid01'],
    backgroundTertiary: dark[':root']['--plasma-colors-surface-solid02'],
    backgroundAccent: dark[':root']['--plasma-colors-surface-solid03'],

    // Surface colors - используем поверхности из plasma
    surfacePrimary: dark[':root']['--plasma-colors-surface-card'] || dark[':root']['--plasma-colors-background'],
    surfaceSecondary: dark[':root']['--plasma-colors-surface-solid01'],
    surfaceElevated: dark[':root']['--plasma-colors-surface-solid02'],

    // Transparent surface colors - используем значения из plasma
    surfaceTransparentWhite95: dark[':root']['--plasma-colors-black'] + 'F2',
    surfaceTransparentWhite90: dark[':root']['--plasma-colors-black'] + 'E6',
    surfaceTransparentWhite80: dark[':root']['--plasma-colors-black'] + 'CC',

    // Border colors - используем границы из plasma
    borderPrimary: dark[':root']['--plasma-colors-input-border'],
    borderSecondary: dark[':root']['--plasma-colors-input-border-hover'],
    borderFocus: dark[':root']['--plasma-colors-input-border-focus'] || dark[':root']['--plasma-colors-accent'],

    // Action colors - используем кнопки из plasma
    actionPrimary: dark[':root']['--plasma-colors-button-primary'],
    actionPrimaryHover: dark[':root']['--plasma-colors-button-primary-hover'],
    actionSecondary: dark[':root']['--plasma-colors-surface-solid01'],
    actionSecondaryHover: dark[':root']['--plasma-colors-surface-solid02'],

    // Status colors - используем статусные цвета из plasma
    statusSuccess: dark[':root']['--plasma-colors-success'],
    statusSuccessBg: dark[':root']['--surface-positive'],
    statusWarning: dark[':root']['--plasma-colors-warning'],
    statusWarningBg: dark[':root']['--surface-warning'],
    statusError: dark[':root']['--plasma-colors-critical'],
    statusErrorBg: dark[':root']['--surface-negative'],
    statusInfo: dark[':root']['--plasma-colors-accent'],
    statusInfoBg: dark[':root']['--surface-accent'],

    // Accent colors for features - используем цвета из plasma
    accent1: dark[':root']['--plasma-colors-accent'],
    accent1Bg: dark[':root']['--surface-accent'],
    accent2: dark[':root']['--plasma-colors-success'],
    accent2Bg: dark[':root']['--surface-positive'],
    accent3: dark[':root']['--plasma-colors-warning'],
    accent3Bg: dark[':root']['--surface-warning'],
    accent4: dark[':root']['--plasma-colors-critical'],
    accent4Bg: dark[':root']['--surface-negative'],
    accent5: dark[':root']['--plasma-colors-accent'],
    accent5Bg: dark[':root']['--surface-accent'],
});

// Функция для получения цветов темы
export const getThemeColors = (theme: 'light' | 'dark'): ThemeColors => {
    return theme === 'dark' ? getDarkThemeColors() : getLightThemeColors();
};

const typography = {
    // Font families - основной шрифт plasma
    fontPrimary: `'SB Sans Text', 'SBSansText', 'Helvetica', 'Arial', sans-serif`,
    fontMono: `'SFMono-Regular', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace`,
    // ... остальная типографика
    // Font sizes - размеры шрифтов
    fontSize: {
        xs: '0.75rem', // 12px
        sm: '0.875rem', // 14px
        base: '1rem', // 16px
        lg: '1.125rem', // 18px
        xl: '1.25rem', // 20px
        '2xl': '1.5rem', // 24px
        '3xl': '1.875rem', // 30px
        '4xl': '2.25rem', // 36px
        '5xl': '3rem', // 48px
        '6xl': '3.75rem', // 60px
    },

    // Font weights - веса шрифтов
    fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
    },

    // Line heights - межстрочные интервалы
    lineHeight: {
        none: 1,
        tight: 1.25,
        snug: 1.375,
        normal: 1.5,
        relaxed: 1.625,
        loose: 2,
    },
};

const spacing = {
    px: '1px',
    0: '0',
    1: '0.25rem', // 4px
    2: '0.5rem', // 8px
    3: '0.75rem', // 12px
    4: '1rem', // 16px
    5: '1.25rem', // 20px
    6: '1.5rem', // 24px
    8: '2rem', // 32px
    10: '2.5rem', // 40px
    12: '3rem', // 48px
    16: '4rem', // 64px
    20: '5rem', // 80px
    24: '6rem', // 96px
};

const borderRadius = {
    sm: '0.25rem', // 4px
    md: '0.5rem', // 8px
    lg: '1rem', // 16px
    xl: '1.5rem', // 24px
    full: '9999px',
};

const shadow = {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
};

const transition = {
    fast: '150ms ease-in-out',
    base: '200ms ease-in-out',
    slow: '300ms ease-in-out',
};

// Функция для создания полного объекта токенов для styled-components
export const createTokens = (theme: 'light' | 'dark' | ThemeType) => {
    const resolvedTheme = theme === 'system' ? 'light' : theme; // default for SSR
    return {
        colors: getThemeColors(resolvedTheme),
        typography,
        spacing,
        borderRadius,
        shadow,
        transition,
    };
};

export const tokens = createTokens('light'); // Экспортируем токены светлой темы по умолчанию
export type Tokens = ReturnType<typeof createTokens>; 