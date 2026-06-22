// FORGE Service Worker — minimal, no fetch interception
// Exists purely to satisfy Chrome's PWA installability requirement.
// Does NOT intercept any fetch requests so it cannot cause blank screens.
const CACHE_NAME = 'forge-v1';

self.addEventListener('install', () => { self.skipWaiting(); });

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// No fetch handler — intentionally omitted to prevent blank screen bugs.
