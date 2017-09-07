'use strict'

let cacheName = 'pwa-demo-assets';
let imgCacheName = 'pwa-img';

let filesToCache = [
    '/chorme-PwaDemo',
    '/chorme-PwaDemo/index.html',
    '/chorme-PwaDemo/scripts/app.js',
    '/chorme-PwaDemo/assets/imgs/48.png',
    '/chorme-PwaDemo/assets/imgs/96.png',
    '/chorme-PwaDemo/assets/imgs/192.png',
    '/chorme-PwaDemo/dist/js/app.js',
    '/chorme-PwaDemo/manifest.json'
];

self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('fetch', (e) => {
    console.log(e.request.url);
    if (e.request.url.indexOf('/api/400/200') > -1) {
        e.respondWith(
            caches.open(imgCacheName).then(function (cache) {
                return fetch(e.request).then(function (response) {
                    cache.put(e.request.url, response.clone());
                    return response;
                });
            })
        );
    } else {
        /*
         * The app is asking for app shell files. In this scenario the app uses the
         * "Cache, falling back to the network" offline strategy:
         * https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network
         */
        e.respondWith(
            caches.match(e.request).then(function (response) {
                return response || fetch(e.request);
            })
        );
    }

})
