import type { NextWebVitalsMetric } from 'next/app';

let timeout: NodeJS.Timeout | undefined;
let queue: Array<NextWebVitalsMetric & { page: string }> = [];

export const addToQueue = (metric: NextWebVitalsMetric): void => {
  queue.push({
    ...metric,
    page: window.location.href,
  });
};

export const sendVitals = (): void => {
  if (!timeout) {
    timeout = setTimeout(() => {
      if (!queue.length) {
        return;
      }
      if (
        process.env.NODE_ENV === 'production' &&
        window.location.hostname === 'wbeuil.com'
      ) {
        const body = JSON.stringify(queue);
        const url = '/api/metrics/webvitals';
        if (navigator.sendBeacon) {
          navigator.sendBeacon(url, body);
        } else {
          fetch(url, { body, method: 'POST', keepalive: true });
        }
      }
      queue = [];
      clearTimeout(timeout as NodeJS.Timeout);
      timeout = undefined;
    }, 5 * 1000);
  }
};
