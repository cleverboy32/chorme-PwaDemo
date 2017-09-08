'use strict'

let cacheName = 'pwa-demo-assets';
let imgCacheName = 'pwa-img';
let filesToCache;

filesToCache = [
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

});

// 监听推送事件 然后显示通知
self.addEventListener('push', function(event) {
    console.log('[Service Worker] Push Received.');
    console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);
  
    const title = 'Push Codelab';
    const options = {
        body: 'Yay it works.',
        icon: 'assets/imgs/48.png',
        badge: 'assets/imgs/48.png'
    };
  
    event.waitUntil(self.registration.showNotification(title, options));
  });

// 监听通知的点击事件
self.addEventListener('notificationclick', function(event) {
console.log('[Service Worker] Notification click Received.');

event.notification.close();

event.waitUntil(
    clients.openWindow('https://developers.google.com/web/')
);
});

