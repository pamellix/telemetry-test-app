import { WebTelemetryKV } from '@salutejs/web-telemetry/lib/presets/WebTelemetryKV';

export const TELEMETRY_ENDPOINT =
    process.env.NEXT_PUBLIC_TELEMETRY_ENDPOINT ?? 'https://metrics.prom.third-party-app.sberdevices.ru';

export const WebTelemetryKVInit = new WebTelemetryKV({
    endpoint: TELEMETRY_ENDPOINT,
    projectName: 'speed-demo-metrics',
    debug: process.env.NODE_ENV === 'development',
});
