import React from 'react';
import { Metadata } from 'next';

import ThemeRegistry from '@/src/components/ThemeRegistry';

export const metadata: Metadata = {
    title: 'Turtle Artists | Галерея художников Возрождения',
    description: 'Знакомство с великими художниками эпохи Возрождения: Леонардо да Винчи, Донателло, Микеланджело и Рафаэль',
    keywords: 'возрождение, leonardo, donatello, michelangelo, raphael, renaissance, artists',
    icons: {
        icon: '/favicon.ico',
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ru">
            <body>
                <ThemeRegistry>{children}</ThemeRegistry>
            </body>
        </html>
    );
}
