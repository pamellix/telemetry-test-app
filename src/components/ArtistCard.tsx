'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { Card } from '@salutejs/plasma-web';

interface ArtistCardProps {
    name: string;
    quality: string;
    image: string;
    artistImage: string;
    description: string;
    descriptionCartoon: string;
    qualityCartoon: string;
}

const StyledCard = styled(Card)`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: ${({ theme }) => theme.colors.surfacePrimary};
    border: 1px solid ${({ theme }) => theme.colors.borderPrimary};
    border-radius: ${({ theme }) => theme.borderRadius.xl};
    overflow: hidden;
    transition: all ${({ theme }) => theme.transition.base};
    box-shadow: ${({ theme }) => theme.shadow.md};

    &:hover {
        transform: translateY(-4px);
        box-shadow: ${({ theme }) => theme.shadow.xl};
        border-color: ${({ theme }) => theme.colors.borderSecondary};
    }
`;

const ImageContainer = styled.div`
    position: relative;
    width: 100%;
    height: 300px;
    overflow: hidden;
    background-color: ${({ theme }) => theme.colors.backgroundSecondary};
`;

const StyledImage = styled(Image)`
    object-fit: cover;
    transition: transform ${({ theme }) => theme.transition.base};

    &:hover {
        transform: scale(1.05);
    }
`;

const CardContent = styled.div`
    padding: ${({ theme }) => theme.spacing[6]};
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing[4]};
`;

const ArtistName = styled.h3`
    font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.colors.textPrimary};
    margin: 0;
    font-family: ${({ theme }) => theme.typography.fontPrimary};
`;

const QualityBadge = styled.div`
    display: inline-flex;
    align-items: center;
    padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[4]};
    background: linear-gradient(135deg, 
        ${({ theme }) => theme.colors.accent1Bg} 0%, 
        ${({ theme }) => theme.colors.accent2Bg} 50%, 
        ${({ theme }) => theme.colors.accent3Bg} 100%);
    background-size: 200% 200%;
    color: white;
    border-radius: ${({ theme }) => theme.borderRadius.full};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    font-family: ${({ theme }) => theme.typography.fontPrimary};
    align-self: flex-start;
    transition: all ${({ theme }) => theme.transition.base};
    position: relative;
    overflow: hidden;
    box-shadow: ${({ theme }) => theme.shadow.sm};

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, 
            transparent, 
            rgba(255, 255, 255, 0.15), 
            transparent);
        transition: left 0.5s;
    }

    &:hover {
        transform: translateY(-1px);
        box-shadow: ${({ theme }) => theme.shadow.md};
        background-position: 100% 100%;
        
        &::before {
            left: 100%;
        }
    }
`;

const Description = styled.p`
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
    margin: 0;
    flex: 1;
`;

const CardActions = styled.div`
    display: flex;
    gap: ${({ theme }) => theme.spacing[3]};
    margin-top: auto;
`;

const StyledButton = styled.button`
    width: 100%;
    padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
    background: linear-gradient(135deg, 
        ${({ theme }) => theme.colors.accent1Bg} 0%, 
        ${({ theme }) => theme.colors.accent2Bg} 50%, 
        ${({ theme }) => theme.colors.accent3Bg} 100%);
    background-size: 200% 200%;
    border: none;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    color: white;
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    font-family: ${({ theme }) => theme.typography.fontPrimary};
    cursor: pointer;
    transition: all ${({ theme }) => theme.transition.base};
    position: relative;
    overflow: hidden;
    box-shadow: ${({ theme }) => theme.shadow.md};

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, 
            transparent, 
            rgba(255, 255, 255, 0.2), 
            transparent);
        transition: left 0.5s;
    }

    &:hover {
        transform: translateY(-2px);
        box-shadow: ${({ theme }) => theme.shadow.lg};
        background-position: 100% 100%;
        
        &::before {
            left: 100%;
        }
    }

    &:active {
        transform: translateY(0);
        box-shadow: ${({ theme }) => theme.shadow.md};
    }

    &:focus {
        outline: 2px solid ${({ theme }) => theme.colors.borderFocus};
        outline-offset: 2px;
    }
`;

export function ArtistCard({ name, quality, image, artistImage, description, descriptionCartoon, qualityCartoon }: ArtistCardProps) {
    const [showArtistImage, setShowArtistImage] = useState(false);

    const currentImage = showArtistImage ? artistImage : image;
    const buttonText = showArtistImage ? 'Показать черепашку' : 'Показать художника';

    const handleToggleImage = async () => {
        // Проверяем активна ли INP задержка
        const isDelayActive = (window as unknown as { inpDelayActive: boolean }).inpDelayActive || false;
        
        if (isDelayActive) {
            
            // Искусственная задержка 750ms в основном потоке
            await new Promise(resolve => setTimeout(resolve, 750));
            
        }
        
        setShowArtistImage(!showArtistImage);
    };

    return (
        <StyledCard roundness={20}>
            <ImageContainer>
                <StyledImage
                    src={currentImage}
                    alt={showArtistImage ? `Портрет ${name}` : `Черепашка ${name}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                />
            </ImageContainer>
            
            <CardContent>
                <ArtistName>{name}</ArtistName>
                <QualityBadge>{showArtistImage ? quality : qualityCartoon}</QualityBadge>
                <Description>{showArtistImage ? description : descriptionCartoon}</Description>
                
                <CardActions>
                    <StyledButton onClick={handleToggleImage}>
                        {buttonText}
                    </StyledButton>
                </CardActions>
            </CardContent>
        </StyledCard>
    );
} 