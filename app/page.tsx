'use client'

import { useState, useEffect } from 'react';
import { NewsItem } from '@/components/NewsItem';
import './main.css';
import {
    WebTelemetryMonitoringWebAppWithWebVitals
} from "@sberdevices/web-telemetry/lib/presets/WebTelemetryMonitoringWebAppWithWebVitals";

export default function Home() {
    const [data, setData] = useState<Array<{ name: string, items: Array<{ guid: string, pictureSet: string, title: string, description: string }> }>>();

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';

    useEffect(() => {
        fetch(`${backendUrl}/api/posts`)
            .then((response) => response.json())
            .then(async (res) => {
                const updatedData = await addImagesToNews(res);
                setData(updatedData);
            });
    
        const monitorInstance = WebTelemetryMonitoringWebAppWithWebVitals.Instance({
            projectName: 'speed-demo',
            debug: process.env.NODE_ENV === 'development',
        });
    
        setTimeout(() => {
            const ad = document.createElement('div');
            ad.innerHTML = '<div style="height: 400px; background: #FFEE8C; color: black; margin: 0">Хоба! Тут тестируется CLS</div>';
            
            const header = document.querySelector('.header');
            if (header) {
                header.after(ad);
            }
        }, 5000);
    
        monitorInstance.webApp.send();
        monitorInstance.startMonitoring();
        monitorInstance.startWebVitals();
    }, [backendUrl]);

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
            <header className="header" style={{backgroundColor: '#7c0A02', margin: '0'}}>
                <h1>Speed Metrics</h1>
            </header>
            {data && data.map(({ name, items }) => (
                <div key={name} className="newsCategory">
                    <h2 style={{textAlign: 'center'}}>{name}</h2>
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
