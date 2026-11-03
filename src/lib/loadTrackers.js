import { GA_MEASUREMENT_ID } from './ga4';

// fbevents.js e gtag.js pesam cerca de 450 KB e travam a thread principal no celular.
// O stub do Pixel e do dataLayer continua no _document, então nenhum evento se perde:
// as chamadas ficam na fila e os scripts entram na primeira interação com a página
// (rolar, tocar, teclar) ou, no máximo, TRACKERS_MAX_WAIT_MS depois do load.
const TRACKERS_MAX_WAIT_MS = 4000;
const FB_SRC = 'https://connect.facebook.net/en_US/fbevents.js';
const GTAG_SRC = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
const INTERACTION_EVENTS = ['pointerdown', 'keydown', 'scroll', 'touchstart', 'mousemove'];

function inject(src) {
  const script = document.createElement('script');
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

export function loadTrackers() {
  if (typeof window === 'undefined' || window.__gtxTrackersScheduled) return;
  window.__gtxTrackersScheduled = true;

  let started = false;
  let timer;
  const start = () => {
    if (started) return;
    started = true;
    clearTimeout(timer);
    INTERACTION_EVENTS.forEach((name) => window.removeEventListener(name, start));
    inject(FB_SRC);
    inject(GTAG_SRC);
  };

  INTERACTION_EVENTS.forEach((name) => window.addEventListener(name, start, { passive: true, once: true }));
  const arm = () => {
    timer = setTimeout(start, TRACKERS_MAX_WAIT_MS);
  };
  if (document.readyState === 'complete') arm();
  else window.addEventListener('load', arm, { once: true });
}
