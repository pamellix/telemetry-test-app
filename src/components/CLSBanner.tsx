'use client';

import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Button } from '@salutejs/plasma-web';
import { IconClose } from '@salutejs/plasma-icons';
import { tokens } from './theme/tokens';

const slideInAnimation = keyframes`
    from {
        transform: translateY(-100%);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
`;

const pulseAnimation = keyframes`
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
`;

const BannerContainer = styled.div<{ visible: boolean }>`
    position: relative;
    background: linear-gradient(135deg, 
        ${({ theme }) => theme.colors.statusWarning}15 0%,
        ${({ theme }) => theme.colors.statusInfo}20 50%,
        ${({ theme }) => theme.colors.statusSuccess}15 100%
    );
    border: 2px solid ${({ theme }) => theme.colors.statusWarning};
    border-radius: ${({ theme }) => theme.borderRadius.xl};
    margin: ${({ theme }) => theme.spacing[4]} 0;
    padding: ${({ theme }) => theme.spacing[6]};
    display: ${props => props.visible ? 'block' : 'none'};
    animation: ${slideInAnimation} 0.8s ease-out;
    box-shadow: ${({ theme }) => theme.shadow.lg};
    overflow: hidden;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, 
            transparent, 
            ${({ theme }) => theme.colors.statusInfo}30, 
            transparent
        );
        animation: shimmer 3s infinite;
    }
    
    @keyframes shimmer {
        0% { left: -100%; }
        100% { left: 100%; }
    }
`;

const BannerContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${({ theme }) => theme.spacing[4]};
    position: relative;
    z-index: 1;
    
    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        gap: ${({ theme }) => theme.spacing[3]};
    }
`;

const TextSection = styled.div`
    flex: 1;
`;

const BannerTitle = styled.h3`
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.colors.statusWarning};
    margin: 0 0 ${({ theme }) => theme.spacing[2]} 0;
    font-family: ${({ theme }) => theme.typography.fontPrimary};
    animation: ${pulseAnimation} 2s infinite;
`;

const BannerDescription = styled.p`
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    color: ${({ theme }) => theme.colors.textPrimary};
    margin: 0;
    line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
    font-family: ${({ theme }) => theme.typography.fontPrimary};
`;

const BannerActions = styled.div`
    display: flex;
    gap: ${({ theme }) => theme.spacing[3]};
    align-items: center;
    
    @media (max-width: 768px) {
        width: 100%;
        justify-content: flex-end;
    }
`;

const CloseButton = styled(Button)`
    min-width: auto;
    padding: ${({ theme }) => theme.spacing[2]};
`;

const MetricsBadge = styled.div`
    background-color: ${({ theme }) => theme.colors.statusInfoBg};
    color: ${({ theme }) => theme.colors.statusInfo};
    padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[4]};
    border-radius: ${({ theme }) => theme.borderRadius.full};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    font-family: ${({ theme }) => theme.typography.fontPrimary};
`;

interface CLSBannerProps {
    onClose?: () => void;
}

export function CLSBanner({ onClose }: CLSBannerProps) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(true);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setVisible(false);
        onClose?.();
    };

    return (
        <BannerContainer visible={visible}>
            <BannerContent>
                <TextSection>
                    <BannerTitle>🎨 CLS Metrics Test Active!</BannerTitle>
                    <BannerDescription>
                        Тестируем метрику <strong>Cumulative Layout Shift</strong> для оптимизации производительности. 
                        Этот баннер появился динамически для имитации сдвига макета.
                    </BannerDescription>
                </TextSection>
                
                <BannerActions>
                    <MetricsBadge style={{
                        backgroundColor: tokens.colors.statusInfoBg,
                        color: tokens.colors.textInverse,
                    }}>CLS Debug</MetricsBadge>
                    <CloseButton
                        view="clear"
                        size="s"
                        onClick={handleClose}
                        contentLeft={<IconClose size="xs" />}
                    />
                </BannerActions>
            </BannerContent>
        </BannerContainer>
    );
} 