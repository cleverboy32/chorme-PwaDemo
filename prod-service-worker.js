'use strict'

let cacheName = 'pwa-demo-assets';
// let imgCacheName = 'pwa-img';
let filesToCache;

filesToCache = [
    '/chorme-PwaDemo',
    '/chorme-PwaDemo/index.html',
    '/chorme-PwaDemo/manifest.json'
];

self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log('sw install');
            return cache.addAll(filesToCache);
        })
    );
});

// 更新缓存
self.addEventListener('activate', function (e) {
    e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
    if (/\.jpg$|.png$|.js$|.map$/.test(e.request.url) && e.request.url.indexOf('hot-update.js') === '-1') {
        console.log(e.request.url);
        e.respondWith(
            caches.match(e.request).then(function (response) {
                let requestToCache = e.request.clone();
                if (response) {
                    fetch(requestToCache).then((res) => {
                        if (res && res.status === 200) {
                            caches.open(cacheName).then(function (cache) {
                                cache.delete(requestToCache);
                                cache.put(requestToCache, res.clone());
                            });
                        }
                    });
                    return response;
                }

                return fetch(requestToCache).then((res) => {
                    if (!res || res.status !== 200) {
                        return res;
                    }
                    var responseToCache = res.clone();
                    caches.open(cacheName).then(function (cache) {
                        cache.put(requestToCache, responseToCache);
                    });
                    return res;
                });
            })
        );
    } else {
        return fetch(e.request);
    }
});

// 监听推送事件 然后显示通知
self.addEventListener('push', function (event) {
    console.log('[Service Worker] Push Received.');
    console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

    const title = 'Push Codelab';
    const options = {
        body: 'Yay it works.',
        icon: 'img/48.png',
        badge: 'img/48.png'
    };

    event.waitUntil(self.registration.showNotification(title, options));
});

// 监听通知的点击事件
self.addEventListener('notificationclick', function (event) {
    console.log('[Service Worker] Notification click Received.');

    event.notification.close();

    event.waitUntil(
        clients.openWindow('https://developers.google.com/web/') // eslint-disable-line
    );
});
