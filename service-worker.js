'use strict'

let cacheName = 'pwa-demo-assets';
let imgCacheName = 'pwa-img';
let filesToCache;

filesToCache = [
    '/',
    '/index.js',
    '/app.js',
    // '/assets/imgs/48.png',
    // '/assets/imgs/96.png',
    // '/assets/imgs/192.png',
    // '/manifest.json'
];

self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log('sw install');
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then(function (response) {
            return response || fetch(e.request);
        })
    );

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
