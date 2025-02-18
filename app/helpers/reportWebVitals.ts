import {NextWebVitalsMetric} from 'next/app';
import {WebTelemetryKVInit} from '@/analytics';

export function reportWebVitals(metrics: NextWebVitalsMetric) {
    WebTelemetryKVInit.push({
        key: metrics.name,
        value: Math.round(metrics.value),
    });
}