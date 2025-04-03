import { WebTelemetryKV } from '@sberdevices/web-telemetry/lib/presets/WebTelemetryKV';

export const WebTelemetryKVInit = new WebTelemetryKV({
    projectName: 'speed-demo-metrics',
    debug: process.env.NODE_ENV === 'development'
})
