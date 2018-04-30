
const statics = [
  './',
  './styles.css',
  './app.js',
];

self.addEventListener('install', async (event) => {
  const cache = await caches.open('swapi-statics');
  cache.addAll(statics);
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);
  if (url.origin === location.origin) {
    // static assets
    event.respondWith(cacheFirst(req));
  } else if (!url.origin.includes('chrome-extension')) {
    event.respondWith(networkFirst(req));
  }
});


async function networkFirst (req) {
  const cache = await caches.open('swapi-dynamic');
  try {
    const res = await fetch(req);
    cache.put(req, res.clone());
    return res;
  } catch (error) {
    return await cache.match(req);
  }
}

async function cacheFirst (req) {
  const cachedResponse = await caches.match(req);
  return cachedResponse || fetch(req);
}
