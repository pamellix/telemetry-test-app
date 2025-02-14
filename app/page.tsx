'use client'

import {useEffect, useState} from "react";
import {NextWebVitalsMetric} from "next/app";
import {WebTelemetryKVInit} from "@/analytics";
import './main.css'

export function reportWebVitals(metrics: NextWebVitalsMetric) {
  WebTelemetryKVInit.push({
    key: metrics.name,
    value: Math.round(metrics.value)
  })
}

export default function Home() {

  const [data, setData] = useState<Array<{title: string, id: number, body: string, url: string}>>([]);

  useEffect(() => {

    fetch('http://localhost:3000/api/posts')
        .then(response => response.json())
        .then(res => setData(res))

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
  }, [])

  return (<main>
    <div style={{margin: '0 auto', textAlign: 'center'}}>Я - Тестовый список!</div>
    <ul className="list">
      {data.map((item) => (
          <li key={item.id} className="list--item">
            <h4 className="title">{item.title}</h4>
            <img src={item.url}/>
            <p>{item.body}</p>
          </li>
      ))}
    </ul>
  </main>);
}
