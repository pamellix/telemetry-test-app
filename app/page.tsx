'use client';

import React, { useEffect } from 'react';
import styled from 'styled-components';

import { Header } from '@/src/components/Header';
import { ArtistCard } from '@/src/components/ArtistCard';
import { CLSBanner } from '@/src/components/CLSBanner';
import { FloatingButton } from '@/src/components/FloatingButton';
import { INPDelayButton } from '@/src/components/INPDelayButton';
import { Footer } from '@/src/components/Footer';

// Данные художников
const artistsData = [
    {
        name: 'Leonardo da Vinci',
        quality: 'Гениальность',
        image: '/leonardo.jpg',
        artistImage: '/leonardo-artist.jpg',
        description: 'Великий итальянский художник, изобретатель, ученый и мыслитель эпохи Возрождения. Автор "Моны Лизы" и "Тайной вечери". Его универсальные знания охватывали анатомию, инженерию, архитектуру и многие другие области.',
        descriptionCartoon: 'Он — старший из четырёх братьев и самый искусный из них. В большинстве адаптаций Леонардо является лидером команды, а также самым зрелым и дисциплинированным из Черепах. В качестве основного оружия боя Леонардо использует парные катаны.',
        qualityCartoon: 'Расчетливость',
    },
    {
        name: 'Donatello',
        quality: 'Скульптурное мастерство',
        image: '/donatello.jpg',
        artistImage: '/donatello-artist.jpg',
        description: 'Итальянский скульптор эпохи Раннего Возрождения, один из основоположников новой пластики. Первым после античности создал обнаженную статую из бронзы. Его работы отличаются реалистичностью и эмоциональной выразительностью.',
        descriptionCartoon: 'В большинстве адаптаций Донателло третий по старшинству среди братьев. Главная особенность Донателло заключается в его гениальном интеллекте, благодаря которому он изобретает различные гаджеты для членов команды и другие передовые изобретения.',
        qualityCartoon: 'Ум',
    },
    {
        name: 'Michelangelo',
        quality: 'Монументальность',
        image: '/michelangelo.jpg',
        artistImage: '/mickelangelo-artist.jpg',
        description: 'Итальянский скульптор, художник, архитектор и поэт. Автор фресок Сикстинской капеллы, скульптуры "Давид" и "Пьета". Считается одним из величайших мастеров в истории искусства, символом творческой мощи Возрождения.',
        descriptionCartoon: 'Будучи самым младшим из братьев, Микеланджело изображается как незрелый подросток, склонный к каламбурам, испытывающий любовь к скейтбордингу, обладающий чувством юмора и безграничным оптимизмом, а также большой любитель пиццы.',
        qualityCartoon: 'Оптимизм',
    },
    {
        name: 'Raphael',
        quality: 'Гармония',
        image: '/raphael.jpg',
        artistImage: '/raphael-artist.jpg',
        description: 'Итальянский живописец и архитектор, представитель умбрийской школы. Известен своими "Мадоннами" и фресками в Ватикане. Его искусство характеризуется идеальной красотой, гармонией композиции и совершенством техники.',
        descriptionCartoon: 'Второй по старшинству среди братьев, часто конфликтует с лидером группы, Леонардо. Среди братьев отличается темпераментом и цинизмом, представляя собой вспыльчивого, агрессивного, угрюмого, раздражительного и саркастического бунтаря',
        qualityCartoon: 'Спортивность',
    },
];

const PageContainer = styled.div`
    background-color: ${({ theme }) => theme.colors.backgroundPrimary};
    color: ${({ theme }) => theme.colors.textPrimary};
    transition:
        background-color ${({ theme }) => theme.transition.base},
        color ${({ theme }) => theme.transition.base};
    min-height: 100vh;
`;

const ContentContainer = styled.div`
    padding-top: 72px; /* Отступ для фиксированного хедера */
`;

const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${({ theme }) => theme.spacing[6]};

    @media (min-width: 600px) {
        padding: 0 ${({ theme }) => theme.spacing[8]};
    }
`;

const HeroSection = styled.section`
    text-align: center;
    padding: ${({ theme }) => theme.spacing[12]} 0;
    background: linear-gradient(135deg, 
        ${({ theme }) => theme.colors.backgroundPrimary} 0%,
        ${({ theme }) => theme.colors.backgroundSecondary} 100%
    );
`;

const HeroTitle = styled.h1`
    font-size: ${({ theme }) => theme.typography.fontSize['5xl']};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.colors.textPrimary};
    margin: 0 0 ${({ theme }) => theme.spacing[6]} 0;
    font-family: ${({ theme }) => theme.typography.fontPrimary};
    
    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
    }
`;

const HeroSubtitle = styled.p`
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    color: ${({ theme }) => theme.colors.textSecondary};
    margin: 0 auto ${({ theme }) => theme.spacing[8]} auto;
    max-width: 600px;
    line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
    font-family: ${({ theme }) => theme.typography.fontPrimary};
    
    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.typography.fontSize.lg};
    }
`;

const ArtistsSection = styled.section`
    padding: ${({ theme }) => theme.spacing[12]} 0;
`;

const SectionTitle = styled.h2`
    font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.colors.textPrimary};
    text-align: center;
    margin: 0 0 ${({ theme }) => theme.spacing[8]} 0;
    font-family: ${({ theme }) => theme.typography.fontPrimary};
    
    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
    }
`;

const ArtistsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: ${({ theme }) => theme.spacing[8]};
    margin-bottom: ${({ theme }) => theme.spacing[8]};
    
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: ${({ theme }) => theme.spacing[6]};
    }
    
    @media (min-width: 769px) and (max-width: 1200px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

export default function HomePage() {
    useEffect(() => {
        // Инициализация телеметрии
        try {
            import('@sberdevices/web-telemetry/lib/presets/WebTelemetryMonitoringWebAppWithWebVitals').then(({ WebTelemetryMonitoringWebAppWithWebVitals }) => {
                const monitorInstance = WebTelemetryMonitoringWebAppWithWebVitals.Instance({
                    projectName: 'ninja-turtles-and-renaissance-artists',
                    debug: process.env.NODE_ENV === 'development',
                });

                monitorInstance.webApp.send();
                monitorInstance.startMonitoring();
                monitorInstance.startWebVitals();
            });

        } catch (error) {
            console.log('Telemetry not available:', error);
        }
    }, []);

    return (
        <PageContainer>
            <Header />
            <ContentContainer>
                <HeroSection>
                    <Container>
                        <HeroTitle>Черепашки-Ниндзя и художники эпохи Возрождения</HeroTitle>
                        <HeroSubtitle>
                            Узнайте, как Черепашки-Ниндзя получили имена в честь великих художников эпохи Возрождения. 
                            Переключайтесь между портретами мастеров и их мультяшными воплощениями с помощью кнопок на карточках.
                        </HeroSubtitle>
                    </Container>
                </HeroSection>

                <Container>
                    <CLSBanner />
                    
                    <ArtistsSection>
                        <SectionTitle>Великие мастера</SectionTitle>
                        <ArtistsGrid>
                            {artistsData.map((artist) => (
                                <ArtistCard
                                    key={artist.name}
                                    name={artist.name}
                                    quality={artist.quality}
                                    image={artist.image}
                                    artistImage={artist.artistImage}
                                    description={artist.description}
                                    descriptionCartoon={artist.descriptionCartoon}
                                    qualityCartoon={artist.qualityCartoon}
                                />
                            ))}
                        </ArtistsGrid>
                    </ArtistsSection>
                </Container>
            </ContentContainer>
            
            <Footer />
            <INPDelayButton />
            <FloatingButton />
        </PageContainer>
    );
}
