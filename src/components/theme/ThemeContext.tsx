'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';

import { ThemeType, getThemeColors, ThemeColors } from './tokens';

interface ThemeContextType {
    theme: ThemeType;
    colors: ThemeColors;
    setTheme: (theme: ThemeType) => void;
    toggleTheme: () => void;
    isDark: boolean;
    isLight: boolean;
    isSystem: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const getSavedTheme = (): ThemeType => {
    if (typeof window === 'undefined') return 'system';
    try {
        const saved = localStorage.getItem('theme');
        return saved && ['light', 'dark', 'system'].includes(saved) ? (saved as ThemeType) : 'system';
    } catch (error) {
        console.warn('Error reading theme from localStorage:', error);
        return 'system';
    }
};

const saveTheme = (theme: ThemeType): void => {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem('theme', theme);
    } catch (error) {
        console.warn('Error saving theme to localStorage:', error);
    }
};

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setThemeState] = useState<ThemeType>(getSavedTheme);
    const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const getSystemTheme = () => (mediaQuery.matches ? 'dark' : 'light');

        const handleThemeChange = () => {
            const savedTheme = getSavedTheme();
            setThemeState(savedTheme);
            if (savedTheme === 'system') {
                setResolvedTheme(getSystemTheme());
            } else {
                setResolvedTheme(savedTheme);
            }
        };

        handleThemeChange(); // Set initial theme

        const handleChange = (e: MediaQueryListEvent) => {
            if (getSavedTheme() === 'system') {
                setResolvedTheme(e.matches ? 'dark' : 'light');
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        window.addEventListener('storage', handleThemeChange); // Listen for changes from other tabs

        return () => {
            mediaQuery.removeEventListener('change', handleChange);
            window.removeEventListener('storage', handleThemeChange);
        };
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', resolvedTheme);
    }, [resolvedTheme]);

    const setTheme = (newTheme: ThemeType) => {
        saveTheme(newTheme);
        setThemeState(newTheme);
        if (newTheme === 'system') {
            if (typeof window !== 'undefined') {
                setResolvedTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
            }
        } else {
            setResolvedTheme(newTheme);
        }
    };

    const toggleTheme = () => {
        const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    };

    const colors = useMemo(() => getThemeColors(resolvedTheme), [resolvedTheme]);

    const value: ThemeContextType = {
        theme,
        colors,
        setTheme,
        toggleTheme,
        isDark: resolvedTheme === 'dark',
        isLight: resolvedTheme === 'light',
        isSystem: theme === 'system',
    };

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const useThemeColors = (): ThemeColors => {
    const { colors } = useTheme();
    return colors;
};

export default ThemeContext; 