'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { Button, Card } from '@salutejs/plasma-web';
import { tokens } from './theme/tokens';

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
    background-color: ${({ theme }) => theme.colors.accent1Bg};
    color: ${({ theme }) => theme.colors.accent1};
    border-radius: ${({ theme }) => theme.borderRadius.full};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    align-self: flex-start;
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
                <QualityBadge style={{
                    backgroundColor: showArtistImage ? tokens.colors.accent1Bg : tokens.colors.accent2Bg,
                    color: "white",
                }}>{showArtistImage ? quality : qualityCartoon}</QualityBadge>
                <Description>{showArtistImage ? description : descriptionCartoon}</Description>
                
                <CardActions>
                    <Button
                        view="primary"
                        size="s"
                        onClick={handleToggleImage}
                        stretch
                    >
                        {buttonText}
                    </Button>
                </CardActions>
            </CardContent>
        </StyledCard>
    );
} 