'use client'

import {useEffect, useRef, useState} from 'react';
import {NextWebVitalsMetric} from 'next/app';
import {WebTelemetryKVInit} from '@/analytics';
import {NewsItem} from '@/components/NewsItem';
import './main.css'

export function reportWebVitals(metrics: NextWebVitalsMetric) {
    WebTelemetryKVInit.push({
        key: metrics.name,
        value: Math.round(metrics.value),
    });
}


// export async function getStaticProps() {
//     const { fixturesNews } = await import('@/fixtures/news');
//
//     return {
//         props: {
//             serverSideNews: fixturesNews.slice(0, 1).map(({ items, ...rest }) => ({
//                 ...rest,
//                 items: items.slice(0, 4),
//             })),
//         },
//     };
// };

export default function Home() {
    const [data, setData] = useState<Array<{name: string, items: Array<{ guid: string, pictureSet: string, title: string, description: string }>}>>();
    const [isClientNewsAvailable, setIsClientNewsAvailable] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3000/api/posts')
            .then((response) => response.json())
            .then((res) => {
                setData(res);
                setIsClientNewsAvailable(true);
            });

        import('@/analytics')
            .then((module) => {
                console.log('Analytics module loaded:', module);
                if (module.webTelemetryResourcesInit) {
                    console.log('Initializing analytics...');
                    module.webTelemetryResourcesInit().start();
                } else {
                    console.error('webTelemetryResourcesInit is not defined in the module');
                }
            })
            .catch((error) => {
                console.error('Failed to load analytics module:', error);
            });
    }, []);

    const isFMPSent = useRef(false);

    useEffect(() => {
        if (isClientNewsAvailable && !isFMPSent.current) {
            const FMP = Math.round(performance.now());
            isFMPSent.current = true;
            import('@/analytics').then(({ webTelemetryCanvasAppInit }) => {
                const webTelemetryCanvasApp = webTelemetryCanvasAppInit();
                webTelemetryCanvasApp.setMetric('FMP', FMP);
                webTelemetryCanvasApp.send();
            });
        }
    }, [isClientNewsAvailable]);

    return (
        <div className="container">
            <header className="header">
                <h1>Speed Metrics</h1>
            </header>
            {data && data.map(({ name, items }) => (
                <div key={name} className="newsCategory">
                    <h2>{name}</h2>
                    <div className="newsGallery">
                        {items && items.map(({ guid, pictureSet, title, description }, index) => (
                            <NewsItem
                                key={guid}
                                guid={guid}
                                pictureSet={pictureSet}
                                title={title}
                                description={description}
                                position={index + 1}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}