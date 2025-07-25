'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '@salutejs/plasma-web';
import { IconTimerFill } from '@salutejs/plasma-icons';

const INPDelayContainer = styled.div<{ visible: boolean }>`
    position: fixed;
    bottom: ${({ theme }) => theme.spacing[20]}; /* Над кнопкой Apple */
    left: ${({ theme }) => theme.spacing[8]};
    z-index: 1000;
    opacity: ${props => props.visible ? 1 : 0};
    transform: ${props => props.visible ? 'translateY(0)' : 'translateY(100px)'};
    transition: all ${({ theme }) => theme.transition.slow};

    @media (max-width: 768px) {
        bottom: ${({ theme }) => theme.spacing[16]};
        left: ${({ theme }) => theme.spacing[6]};
    }
`;

const INPDelayBtn = styled(Button)`
    border-radius: ${({ theme }) => theme.borderRadius.full};
    box-shadow: ${({ theme }) => theme.shadow.xl};
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    transition: all ${({ theme }) => theme.transition.base};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    
    &:hover {
        box-shadow: ${({ theme }) => `${theme.shadow.xl}, 0 0 20px ${theme.colors.actionPrimary}40`};
        transform: translateY(-2px);
    }

    &:active {
        transform: translateY(0px);
    }
`;

// Глобальное состояние для INP задержки
export const INPDelayContext = React.createContext({
    isDelayActive: false,
    setIsDelayActive: () => {},
});

export function INPDelayButton() {
    const [visible, setVisible] = useState(false);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(true);
        }, 3000); // Появляется через 3 секунды

        return () => clearTimeout(timer);
    }, []);

    const handleToggleDelay = () => {
        const newState = !isActive;
        setIsActive(newState);
        
        // Устанавливаем глобальное состояние
        (window as unknown as { inpDelayActive: boolean }).inpDelayActive = newState;
        
        // Уведомляем все компоненты об изменении
        window.dispatchEvent(new CustomEvent('inpDelayChanged', { 
            detail: { isActive: newState } 
        }));
    };

    return (
        <INPDelayContainer visible={visible}>
            <INPDelayBtn
                view={isActive ? "warning" : "primary"}
                size="l"
                onClick={handleToggleDelay}
                contentRight={<IconTimerFill size="s" />}
            >
                {isActive ? 'Disable INP delay' : 'Change INP delay'}
            </INPDelayBtn>
        </INPDelayContainer>
    );
} 