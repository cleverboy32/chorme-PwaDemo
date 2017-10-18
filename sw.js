
let cacheName = 'pwa-demo-assets';

self.addEventListener('install', function (e) {
    console.log('sw install');
    e.waitUntil(self.skipWaiting());
});

// 更新缓存
self.addEventListener('activate', function (e) {
    caches.delete(cacheName);
    e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
    console.log(e.request.url);
    if (/\.jpg$|.png$|.js$|manifest.json|.map$|.html$|.css$|\/$|sw.js/.test(e.request.url)) {
        e.respondWith(
            caches.match(e.request).then(function (response) {
                if (response) {
                    return response;
                }
                var requestToCache = e.request.clone();
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
