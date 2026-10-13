export const GA_MEASUREMENT_ID = 'G-VH9BW7ET06';

export function trackGaEvent(name, params = {}) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
  }
  window.gtag('event', name, params);
  if (name !== 'generate_lead') return;
  // GA4 holds custom events for several seconds. pagehide sends that batch now,
  // so the lead hit leaves before the thank you page opens.
  const hide = typeof PageTransitionEvent === 'function'
    ? new PageTransitionEvent('pagehide', { persisted: false })
    : new Event('pagehide');
  window.dispatchEvent(hide);
}
