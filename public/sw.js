importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.1.0/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

workbox.core.setCacheNameDetails({
  prefix: 'my-app',
  suffix: 'v1'
});

workbox.precaching.precacheAndRoute([
  {
    "url": "app.js",
    "revision": "2066b59f09154370ec3e79fd23bf92e5"
  },
  {
    "url": "images/icons/icon-128x128.png",
    "revision": "d81079d516f4f8a47ca63b3878d5684c"
  },
  {
    "url": "images/icons/icon-144x144.png",
    "revision": "e66500d3b58d58148924b6cb83a2c0b1"
  },
  {
    "url": "images/icons/icon-152x152.png",
    "revision": "5dbe4a90fa5fb299b6bc12fb16b85ff7"
  },
  {
    "url": "images/icons/icon-192x192.png",
    "revision": "1328443d9eacf5eadb43bc0e36fed82d"
  },
  {
    "url": "images/icons/icon-384x384.png",
    "revision": "5f72c3b327372a94e8847dff06a5f320"
  },
  {
    "url": "images/icons/icon-512x512.png",
    "revision": "d3267bc597fbcd3c57c92e51cfe1fe80"
  },
  {
    "url": "images/icons/icon-72x72.png",
    "revision": "30150595f4fc141d438bfe3916f0cb48"
  },
  {
    "url": "images/icons/icon-96x96.png",
    "revision": "23fde43892e7f262f144056395a67933"
  },
  {
    "url": "index.html",
    "revision": "a0f022963e86d9c2c2226cd8bd2588ff"
  },
  {
    "url": "manifest.json",
    "revision": "1e66c7c67bce94e934369405e1fcd7b7"
  },
  {
    "url": "styles.css",
    "revision": "f944db4bd52a8c7022daed298a531038"
  },
  {
    "url": "workbox-config.js",
    "revision": "5f0217b08cf31f2143d86d2bd742dd56"
  }
]);

workbox.routing.registerRoute(
  /https:\/\/swapi.co\/api\/(\.*)/,
  workbox.strategies.networkFirst(),
);

workbox.routing.registerRoute(
  // Cache CSS files
  /.*\.css/,
  // Use cache but update in the background ASAP
  workbox.strategies.staleWhileRevalidate({
    // Use a custom cache name
    cacheName: 'css-cache',
  })
);

workbox.routing.registerRoute(
  // Cache image files
  /.*\.(?:png|jpg|jpeg|svg|gif)/,
  // Use the cache if it's available
  workbox.strategies.cacheFirst({
    // Use a custom cache name
    cacheName: 'image-cache',
    plugins: [
      new workbox.expiration.Plugin({
        // Cache only 20 images
        maxEntries: 20,
        // Cache for a maximum of a week
        maxAgeSeconds: 7 * 24 * 60 * 60,
      })
    ],
  })
);
