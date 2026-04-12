// XZAI Service Worker — Cache shell for offline support
const CACHE = 'xzai-v1';
const SHELL = [
  '/',
  '/index.html',
  '/news.html',
  '/css/style.css',
  '/js/main.js',
  '/js/ai-engine.js',
  '/js/config.js',
  '/images/logo-xzai.webp',
  '/images/logo-xzai-glow.webp',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // Only cache GET, skip Supabase/API calls
  if (e.request.method !== 'GET') return;
  if (e.request.url.includes('supabase') || e.request.url.includes('api.rss2json')) return;

  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(resp => {
        // Cache HTML + CSS + JS only
        if (resp.ok && /\.(html|css|js|webp|woff2)$/.test(e.request.url)) {
          const clone = resp.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return resp;
      }).catch(() => {
        // Offline fallback
        if (e.request.destination === 'document') return caches.match('/index.html');
      });
    })
  );
});
