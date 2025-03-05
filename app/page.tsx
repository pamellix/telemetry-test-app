'use client'

import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { NewsItem } from '@/components/NewsItem';
import './main.css';


export default function Home() {
    const [data, setData] = useState<Array<{ name: string, items: Array<{ guid: string, pictureSet: string, title: string, description: string }> }>>();
    const [isClientNewsAvailable, setIsClientNewsAvailable] = useState(false);

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';

    useEffect(() => {
        fetch(`${backendUrl}/api/posts`)
            .then((response) => response.json())
            .then(async (res) => {
                const updatedData = await addImagesToNews(res);
                setData(updatedData);
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

    useLayoutEffect(() => {
        if (isClientNewsAvailable && !isFMPSent.current) {
            const FMP = Math.round(performance.now());
            isFMPSent.current = true;
            import('@/analytics').then(({ webTelemetryCanvasAppInit }) => {
                const webTelemetryCanvasApp = webTelemetryCanvasAppInit();
                console.log(webTelemetryCanvasApp);
                webTelemetryCanvasApp.setMetric('FMP', FMP);
                webTelemetryCanvasApp.send();
                console.log(webTelemetryCanvasApp);
            });
        }
    }, [isClientNewsAvailable]);

    const addImagesToNews = async (newsData: Array<{name: string, items: Array<{guid: string, title: string, description: string, pictureSet: string}>}>) => {
        const headers = new Headers({
            "Content-Type": "application/json",
            "x-api-key": `${process.env.API_KEY}`
        });

        const requestOptions = {
            method: 'GET',
            headers: headers,
        }

        const imgArray = await Promise.all(
            newsData[0].items.map(async () => {
                const response = await fetch("https://api.thecatapi.com/v1/images/search", requestOptions)
                const result = await response.json();
                return result[0].url;
            })
        );

        newsData[0].items = newsData[0].items.map((item, index) => ({
            ...item,
            pictureSet: imgArray[index]
        }));

        return newsData;
    };

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
                                position={String(index + 1)}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
