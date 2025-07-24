'use client';

import React from 'react';
import styled from 'styled-components';
import { IconSettings, IconMoreHorizontal } from '@salutejs/plasma-icons';

import { SimpleThemeToggle } from './common/ThemeToggle';
import { useTheme } from './theme/ThemeContext';

const navigationItems = [
    { label: 'Leonardo', href: 'https://ru.wikipedia.org/wiki/Леонардо_да_Винчи' },
    { label: 'Donatello', href: 'https://ru.wikipedia.org/wiki/Донателло' },
    { label: 'Michelangelo', href: 'https://ru.wikipedia.org/wiki/Микеланджело' },
    { label: 'Raphael', href: 'https://ru.wikipedia.org/wiki/Рафаэль_Санти' },
];

const HeaderContainer = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background-color: ${({ theme }) => theme.colors.surfacePrimary}CC; /* 80% opacity */
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderPrimary};
    color: ${({ theme }) => theme.colors.textPrimary};
    font-family: ${({ theme }) => theme.typography.fontPrimary};
    transition: all ${({ theme }) => theme.transition.base};
`;

const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${({ theme }) => theme.spacing[6]};

    @media (min-width: 600px) {
        padding: 0 ${({ theme }) => theme.spacing[8]};
    }
`;

const Toolbar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${({ theme }) => theme.spacing[2]} 0;
    min-height: 64px;
`;

const LogoSection = styled.div`
    display: flex;
    align-items: center;
`;

const LogoIcon = styled.div`
    width: 32px;
    height: 32px;
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    background-color: ${({ theme }) => theme.colors.actionPrimary};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: ${({ theme }) => theme.spacing[4]};
    box-shadow: ${({ theme }) => theme.shadow.sm};
    transition: background-color ${({ theme }) => theme.transition.base};
`;

const LogoText = styled.div`
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    color: ${({ theme }) => theme.colors.textPrimary};
    margin: 0;
    font-family: ${({ theme }) => theme.typography.fontPrimary};
    transition: color ${({ theme }) => theme.transition.base};
`;

const Navigation = styled.nav`
    display: none;
    align-items: center;
    gap: ${({ theme }) => theme.spacing[4]};

    @media (min-width: 768px) {
        display: flex;
    }
`;

const NavButton = styled.button`
    margin: 0 ${({ theme }) => theme.spacing[1]};
    padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[4]};
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    text-transform: none;
    border-radius: ${({ theme }) => theme.borderRadius.full};
    border: none;
    background: transparent;
    cursor: pointer;
    font-family: ${({ theme }) => theme.typography.fontPrimary};
    transition: all ${({ theme }) => theme.transition.base};

    &:hover {
        background-color: ${({ theme }) => theme.colors.backgroundSecondary};
        color: ${({ theme }) => theme.colors.actionPrimary};
    }

    &:focus {
        outline: 2px solid ${({ theme }) => theme.colors.borderFocus};
        outline-offset: 2px;
    }
`;

const RightSection = styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing[4]};
`;

const MobileMenuButton = styled.button`
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.textSecondary};
    border: none;
    background: transparent;
    padding: ${({ theme }) => theme.spacing[2]};
    cursor: pointer;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    transition: all ${({ theme }) => theme.transition.base};

    &:hover {
        background-color: ${({ theme }) => theme.colors.backgroundSecondary};
        color: ${({ theme }) => theme.colors.actionPrimary};
    }

    &:focus {
        outline: 2px solid ${({ theme }) => theme.colors.borderFocus};
        outline-offset: 2px;
    }

    @media (min-width: 768px) {
        display: none;
    }
`;

const MobileMenu = styled.div<{ open: boolean }>`
    position: absolute;
    top: 100%;
    right: ${({ theme }) => theme.spacing[4]};
    background: ${({ theme }) => theme.colors.surfaceElevated};
    border-radius: ${({ theme }) => theme.borderRadius.xl};
    border: 1px solid ${({ theme }) => theme.colors.borderPrimary};
    box-shadow: ${({ theme }) => theme.shadow.xl};
    margin-top: ${({ theme }) => theme.spacing[2]};
    padding: ${({ theme }) => theme.spacing[2]} 0;
    min-width: 200px;
    display: ${(props) => (props.open ? 'block' : 'none')};
    backdrop-filter: blur(12px);
    transition: all ${({ theme }) => theme.transition.base};
`;

const MobileMenuItem = styled.button`
    width: 100%;
    text-align: left;
    padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
    border: none;
    background: transparent;
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    color: ${({ theme }) => theme.colors.textSecondary};
    cursor: pointer;
    font-family: ${({ theme }) => theme.typography.fontPrimary};
    transition: all ${({ theme }) => theme.transition.base};

    &:hover {
        background-color: ${({ theme }) => theme.colors.backgroundSecondary};
        color: ${({ theme }) => theme.colors.actionPrimary};
    }

    &:focus {
        outline: 2px solid ${({ theme }) => theme.colors.borderFocus};
        outline-offset: -2px;
    }
`;

const DesktopThemeToggle = styled.div`
    display: none;
    align-items: center;

    @media (min-width: 768px) {
        display: flex;
    }
`;

const MobileThemeToggle = styled.div`
    padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing[2]};
    border-top: 1px solid ${({ theme }) => theme.colors.borderPrimary};
    margin-top: ${({ theme }) => theme.spacing[2]};
`;

const MobileThemeToggleLabel = styled.span`
    font-size: 14px;
    color: ${({ theme }) => theme.colors.textSecondary};
`;

export function Header() {
    const { colors } = useTheme();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleNavigationClick = (href: string) => {
        // Закрываем мобильное меню
        handleMenuClose();

        // Открываем Wikipedia в новой вкладке
        window.open(href, '_blank', 'noopener,noreferrer');
    };

    // Закрываем меню при клике вне его
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (anchorEl && !anchorEl.contains(event.target as Node)) {
                handleMenuClose();
            }
        };

        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [anchorEl, open]);

    return (
        <HeaderContainer>
            <Container>
                <Toolbar>
                    <LogoSection>
                        <LogoIcon>
                            <IconSettings size="s" color={colors.textInverse} />
                        </LogoIcon>
                        <LogoText>Renaissance Artists</LogoText>
                    </LogoSection>

                    {/* Desktop Navigation */}
                    <Navigation>
                        {navigationItems.map((item) => (
                            <NavButton key={item.href} onClick={() => handleNavigationClick(item.href)}>
                                {item.label}
                            </NavButton>
                        ))}
                    </Navigation>

                    {/* Right Section with Theme Toggle */}
                    <RightSection>
                        {/* Desktop Theme Toggle - visible on desktop */}
                        <DesktopThemeToggle>
                            <SimpleThemeToggle />
                        </DesktopThemeToggle>

                        {/* Mobile Menu */}
                        <div style={{ position: 'relative' }}>
                            <MobileMenuButton onClick={handleMenuOpen}>
                                <IconMoreHorizontal size="s" />
                            </MobileMenuButton>
                            <MobileMenu open={open}>
                                {navigationItems.map((item) => (
                                    <MobileMenuItem key={item.href} onClick={() => handleNavigationClick(item.href)}>
                                        {item.label}
                                    </MobileMenuItem>
                                ))}
                                <MobileThemeToggle>
                                    <MobileThemeToggleLabel>Тема:</MobileThemeToggleLabel>
                                    <SimpleThemeToggle />
                                </MobileThemeToggle>
                            </MobileMenu>
                        </div>
                    </RightSection>
                </Toolbar>
            </Container>
        </HeaderContainer>
    );
} 