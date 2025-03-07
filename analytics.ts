import { WebTelemetryCanvasApp } from '@sberdevices/web-telemetry/lib/presets/WebTelemetryCanvasApp';
import { WebTelemetryResources } from '@sberdevices/web-telemetry/lib/presets/WebTelemetryResources';
import { WebTelemetryKV } from '@sberdevices/web-telemetry/lib/presets/WebTelemetryKV';

const defaultConfig = {
    projectName: '',
    disabled: false,
    endpoint: 'https://metrics.prom.third-party-app.sberdevices.ru',
    debug: false,
    delay: 2000,
    buffSize: 25,
    frameTime: true,
};

export const webTelemetryResourcesInit = () => {
    return new WebTelemetryResources('speed-demo', {
        ...defaultConfig,
        projectName: 'speed-demo-resources',
        debug: process.env.NODE_ENV === 'development',
    })
}

export const webTelemetryCanvasAppInit = () => {
    const webTelemetryCanvasApp = new WebTelemetryCanvasApp({
        ...defaultConfig,
        projectName: 'speed-demo',
        debug: process.env.NODE_ENV === 'development',
    });
    webTelemetryCanvasApp.setMetric('appVersion', process.env.NEXT_PUBLIC_RELEASE ?? '');
    return webTelemetryCanvasApp;
};

export const WebTelemetryKVInit = new WebTelemetryKV({
    ...defaultConfig,
    projectName: 'speed-demo-metrics',
    debug: process.env.NODE_ENV === 'development'
})
