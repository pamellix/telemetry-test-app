'use client';

import React, { useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import {
    ServerStyleSheet,
    StyleSheetManager,
    ThemeProvider as StyledThemeProvider,
    createGlobalStyle,
} from 'styled-components';

import { ThemeProvider, useTheme, useThemeColors } from './theme/ThemeContext';
import { createTokens } from './theme/tokens';

// Создаем глобальные стили с поддержкой темной темы
const GlobalStyle = createGlobalStyle`
    ${({ theme }) => `
        :root {
            /* Базовые стили для сброса */
            --transition-fast: ${theme.transition.fast};
            --transition-base: ${theme.transition.base};
            --transition-slow: ${theme.transition.slow};
        }

        * {
            box-sizing: border-box;
        }

        html {
            font-family: ${theme.typography.fontPrimary};
            line-height: 1.5;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        body {
            margin: 0;
            padding: 0;
            background-color: ${theme.colors.backgroundPrimary};
            color: ${theme.colors.textPrimary};
            font-size: 1rem;
            font-weight: 400;
            transition: 
                background-color ${theme.transition.base},
                color ${theme.transition.base};
        }

        /* Сброс стилей для заголовков */
        h1, h2, h3, h4, h5, h6 {
            margin: 0;
            font-weight: 600;
            color: ${theme.colors.textPrimary};
            transition: color ${theme.transition.base};
        }

        /* Сброс стилей для параграфов */
        p {
            margin: 0;
            color: ${theme.colors.textPrimary};
            transition: color ${theme.transition.base};
        }

        /* Сброс стилей для ссылок */
        a {
            color: ${theme.colors.actionPrimary};
            text-decoration: none;
            transition: color ${theme.transition.fast};

            &:hover {
                color: ${theme.colors.actionPrimaryHover};
            }
        }

        /* Сброс стилей для кнопок */
        button {
            border: none;
            background: none;
            cursor: pointer;
            font-family: inherit;
            font-size: inherit;
            outline: none;
            transition: all ${theme.transition.fast};
            color: ${theme.colors.textPrimary};

            &:focus-visible {
                outline: 2px solid ${theme.colors.borderFocus};
                outline-offset: 2px;
            }
        }

        /* Сброс стилей для инпутов */
        input, textarea, select {
            font-family: inherit;
            font-size: inherit;
            border: 1px solid ${theme.colors.borderPrimary};
            border-radius: 0.25rem;
            padding: 0.5rem 0.75rem;
            background-color: ${theme.colors.surfacePrimary};
            color: ${theme.colors.textPrimary};
            transition: 
                border-color ${theme.transition.fast},
                background-color ${theme.transition.base},
                color ${theme.transition.base};

            &:hover {
                border-color: ${theme.colors.borderSecondary};
            }

            &:focus {
                outline: none;
                border-color: ${theme.colors.borderFocus};
            }
        }

        /* Утилитарные классы */
        .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }

        /* Класс для плавного перехода всех свойств */
        .theme-transition {
            transition: all ${theme.transition.base};
        }
    `}
`;

// Внутренний компонент для обеспечения styled-components
const StyledThemeProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { theme } = useTheme();
    const colors = useThemeColors();
    const tokens = createTokens(theme);

    return (
        <StyledThemeProvider theme={{ ...tokens, colors }}>
            <GlobalStyle />
            {children}
        </StyledThemeProvider>
    );
};

interface ThemeRegistryProps {
    children: React.ReactNode;
}

export default function ThemeRegistry({ children }: ThemeRegistryProps) {
    const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

    useServerInsertedHTML(() => {
        const styles = styledComponentsStyleSheet.getStyleElement();
        styledComponentsStyleSheet.instance.clearTag();
        return <>{styles}</>;
    });

    if (typeof window !== 'undefined') {
        return (
            <ThemeProvider>
                <StyledThemeProviderWrapper>{children}</StyledThemeProviderWrapper>
            </ThemeProvider>
        );
    }

    return (
        <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
            <ThemeProvider>
                <StyledThemeProviderWrapper>{children}</StyledThemeProviderWrapper>
            </ThemeProvider>
        </StyleSheetManager>
    );
} 