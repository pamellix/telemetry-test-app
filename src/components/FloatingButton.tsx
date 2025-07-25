'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '@salutejs/plasma-web';
import { IconNavigationArrow } from '@salutejs/plasma-icons';

const FloatingContainer = styled.div<{ visible: boolean }>`
    position: fixed;
    bottom: ${({ theme }) => theme.spacing[8]};
    right: ${({ theme }) => theme.spacing[8]};
    z-index: 1000;
    opacity: ${props => props.visible ? 1 : 0};
    transform: ${props => props.visible ? 'translateY(0)' : 'translateY(100px)'};
    transition: all ${({ theme }) => theme.transition.slow};

    @media (max-width: 768px) {
        bottom: ${({ theme }) => theme.spacing[6]};
        right: ${({ theme }) => theme.spacing[6]};
    }
`;

const FloatingBtn = styled(Button)`
    border-radius: ${({ theme }) => theme.borderRadius.full};
    box-shadow: ${({ theme }) => theme.shadow.xl};
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    transition: all ${({ theme }) => theme.transition.base};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    
    &:hover {
        box-shadow: ${({ theme }) => theme.shadow.xl}, 
                   0 0 20px ${({ theme }) => theme.colors.actionPrimary}40;
        transform: translateY(-2px);
    }

    &:active {
        transform: translateY(0px);
    }
`;

export function FloatingButton() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const handleClick = () => {
        window.open('https://pagespeed.web.dev/analysis/https-turtle-artists-vercel-app/cvcixpx7ni?form_factor=desktop', '_blank', 'noopener,noreferrer');
    };

    return (
        <FloatingContainer visible={visible}>
            <FloatingBtn
                view="primary"
                size="l"
                onClick={handleClick}
                contentRight={<IconNavigationArrow size="s" />}
            >
                Page Speed
            </FloatingBtn>
        </FloatingContainer>
    );
} 