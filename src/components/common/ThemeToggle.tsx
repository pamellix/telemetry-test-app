'use client';

import React from 'react';
import { Switch } from '@salutejs/plasma-web';
import { useTheme } from '../theme/ThemeContext';

export function SimpleThemeToggle() {
    const { isDark, toggleTheme } = useTheme();

    return (
        <Switch
            checked={isDark}
            onChange={toggleTheme}
            label={isDark ? 'Темная тема' : 'Светлая тема'}
            labelPosition="before"
        />
    );
} 