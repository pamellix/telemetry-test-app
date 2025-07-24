'use client';

import React from 'react';
import styled from 'styled-components';
import { Chip } from '@salutejs/plasma-web';

const FooterContainer = styled.footer`
    background-color: ${({ theme }) => theme.colors.backgroundSecondary};
    border-top: 1px solid ${({ theme }) => theme.colors.borderPrimary};
    padding: ${({ theme }) => theme.spacing[12]} 0 ${({ theme }) => theme.spacing[6]};
    font-family: ${({ theme }) => theme.typography.fontPrimary};
    transition:
        background-color ${({ theme }) => theme.transition.base},
        border-color ${({ theme }) => theme.transition.base};
`;

const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${({ theme }) => theme.spacing[6]};

    @media (min-width: 600px) {
        padding: 0 ${({ theme }) => theme.spacing[8]};
    }
`;

const FooterContent = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing[8]};
    margin-bottom: ${({ theme }) => theme.spacing[8]};

    @media (min-width: 768px) {
        grid-template-columns: repeat(4, 1fr);
    }
`;

const FooterSection = styled.div`
    @media (max-width: 767px) {
        text-align: center;
    }
`;

const FooterTitle = styled.h3`
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.textPrimary};
    margin: 0 0 ${({ theme }) => theme.spacing[4]} 0;
    font-family: ${({ theme }) => theme.typography.fontPrimary};
    transition: color ${({ theme }) => theme.transition.base};
`;

const FooterText = styled.p`
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
    margin: 0 0 ${({ theme }) => theme.spacing[4]} 0;
    font-family: ${({ theme }) => theme.typography.fontPrimary};
    transition: color ${({ theme }) => theme.transition.base};
`;

const FooterList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const FooterListItem = styled.li`
    margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const FooterLink = styled.a`
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    color: ${({ theme }) => theme.colors.textSecondary};
    text-decoration: none;
    transition: color ${({ theme }) => theme.transition.base};
    font-family: ${({ theme }) => theme.typography.fontPrimary};

    &:hover {
        color: ${({ theme }) => theme.colors.actionPrimary};
    }

    &:focus {
        outline: 2px solid ${({ theme }) => theme.colors.borderFocus};
        outline-offset: 2px;
        border-radius: ${({ theme }) => theme.borderRadius.md};
    }
`;

const Divider = styled.hr`
    border: none;
    border-top: 1px solid ${({ theme }) => theme.colors.borderPrimary};
    margin: ${({ theme }) => theme.spacing[6]} 0;
    transition: border-color ${({ theme }) => theme.transition.base};
`;

const BottomSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.spacing[4]};
    text-align: center;

    @media (min-width: 768px) {
        flex-direction: row;
        justify-content: space-between;
        text-align: left;
    }
`;

const Copyright = styled.p`
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    color: ${({ theme }) => theme.colors.textSecondary};
    margin: 0;
    font-family: ${({ theme }) => theme.typography.fontPrimary};
    transition: color ${({ theme }) => theme.transition.base};
`;

const TagContainer = styled.div`
    display: flex;
    gap: ${({ theme }) => theme.spacing[2]};
    flex-wrap: wrap;
    justify-content: center;

    @media (min-width: 768px) {
        justify-content: flex-end;
    }
`;

export function Footer() {
    return (
        <FooterContainer>
            <Container>
                <FooterContent>
                    <FooterSection>
                        <FooterTitle>SaluteDevices</FooterTitle>
                        <FooterText>
                            СалютДевайсы - это команда разработчиков, которые создают инновационные устройства и инструменты.
                        </FooterText>
                    </FooterSection>

                    <FooterSection>
                        <FooterTitle>Художники</FooterTitle>
                        <FooterList>
                            <FooterListItem>
                                <FooterLink href="https://ru.wikipedia.org/wiki/Леонардо_да_Винчи" target="_blank">
                                    Леонардо да Винчи
                                </FooterLink>
                            </FooterListItem>
                            <FooterListItem>
                                <FooterLink href="https://ru.wikipedia.org/wiki/Донателло" target="_blank">
                                    Донателло
                                </FooterLink>
                            </FooterListItem>
                            <FooterListItem>
                                <FooterLink href="https://ru.wikipedia.org/wiki/Микеланджело" target="_blank">
                                    Микеланджело
                                </FooterLink>
                            </FooterListItem>
                            <FooterListItem>
                                <FooterLink href="https://ru.wikipedia.org/wiki/Рафаэль_Санти" target="_blank">
                                    Рафаэль Санти
                                </FooterLink>
                            </FooterListItem>
                        </FooterList>
                    </FooterSection>

                    <FooterSection>
                        <FooterTitle>Полезные ссылки</FooterTitle>
                        <FooterList>
                            <FooterListItem>
                                <FooterLink href="https://ru.wikipedia.org/wiki/Возрождение" target="_blank">
                                    Возрождение
                                </FooterLink>
                            </FooterListItem>
                            <FooterListItem>
                                <FooterLink href="https://www.nick.com/global" target="_blank">
                                    Nickelodeon
                                </FooterLink>
                            </FooterListItem>
                        </FooterList>
                    </FooterSection>

                    <FooterSection>
                        <FooterTitle>Черепашки-Ниндзя</FooterTitle>
                        <FooterList>
                            <FooterListItem>
                                <FooterLink href="https://ru.wikipedia.org/wiki/Леонардо_(Черепашки-ниндзя)" target="_blank">
                                    Леонардо
                                </FooterLink>
                            </FooterListItem>
                            <FooterListItem>
                                <FooterLink href="https://ru.wikipedia.org/wiki/Донателло_(Черепашки-ниндзя)" target="_blank">
                                    Донателло
                                </FooterLink>
                            </FooterListItem>
                            <FooterListItem>
                                <FooterLink href="https://ru.wikipedia.org/wiki/Микеланджело_(Черепашки-ниндзя)" target="_blank">
                                    Микеланджело
                                </FooterLink>
                            </FooterListItem>
                            <FooterListItem>
                                <FooterLink href="https://ru.wikipedia.org/wiki/Рафаэль_(Черепашки-ниндзя)" target="_blank">
                                    Рафаэль
                                </FooterLink>
                            </FooterListItem>
                        </FooterList>
                    </FooterSection>

                </FooterContent>

                <Divider />

                <BottomSection>
                    <Copyright>©2025 СалютДевайсы</Copyright>

                    <TagContainer>
                        <Chip text="Renaissance" size="xs" hasClear={false} view="secondary" />
                        <Chip text="Nickelodeon" size="xs" hasClear={false} view="secondary" />
                        <Chip text="SaluteDevices" size="xs" hasClear={false} view="secondary" />
                    </TagContainer>
                </BottomSection>
            </Container>
        </FooterContainer>
    );
} 