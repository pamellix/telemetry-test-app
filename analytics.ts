import { WebTelemetryCanvasApp } from '@sberdevices/web-telemetry/lib/presets/WebTelemetryCanvasApp';
import { WebTelemetryResources } from '@sberdevices/web-telemetry/lib/presets/WebTelemetryResources';
import { WebTelemetryKV } from '@sberdevices/web-telemetry/lib/presets/WebTelemetryKV';

export const webTelemetryResourcesInit = () => {
    return new WebTelemetryResources('speed-demo', {
        projectName: 'speed-demo-resources',
        debug: process.env.NODE_ENV === 'development',
    })
}

export const webTelemetryCanvasAppInit = () => {
    const webTelemetryCanvasApp = new WebTelemetryCanvasApp({
        projectName: 'speed-demo',
        debug: process.env.NODE_ENV === 'development',
    });
    webTelemetryCanvasApp.setMetric('appVersion', process.env.NEXT_PUBLIC_RELEASE ?? '');
    return webTelemetryCanvasApp;
};

export const WebTelemetryKVInit = new WebTelemetryKV({
    projectName: 'speed-demo-metrics',
    debug: process.env.NODE_ENV === 'development'
})
