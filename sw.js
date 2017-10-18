let cacheName = 'pwa-demo-assets';
let filesToCache;

filesToCache = [
    '/chorme-PwaDemo',
    '/chorme-PwaDemo/index.html',
    '/chorme-PwaDemo/img/48.png',
    '/chorme-PwaDemo/img/96.png',
    '/chorme-PwaDemo/img/192.png',
    '/chorme-PwaDemo/static/js/app.7f9c885fcb779bd60ab3.js',
    '/chorme-PwaDemo/static/js/app.7f9c885fcb779bd60ab3.js.map',
    '/chorme-PwaDemo/static/js/registerSw.bbb5360efe11e16ce241.js',
    '/chorme-PwaDemo/static/js/registerSw.bbb5360efe11e16ce241.js.map',
    '/chorme-PwaDemo/static/js/manifest.575c1c4599a5d63fe761.js',
    '/chorme-PwaDemo/static/js/manifest.575c1c4599a5d63fe761.js.map',
    '/chorme-PwaDemo/static/js/vendor.03c11b30cbc224e4ab9e.js',
    '/chorme-PwaDemo/static/js/vendor.03c11b30cbc224e4ab9e.js.map',
    '/chorme-PwaDemo/static/css/app.c52d3f17e9a2a01c75ac1837c4c04c5c.css',
    '/chorme-PwaDemo/static/css/app.c52d3f17e9a2a01c75ac1837c4c04c5c.css.map',
    '/chorme-PwaDemo/manifest.json',
    '/chorme-PwaDemo/sw.js'
    
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
    caches.delete(cacheName);
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
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
        clients.openWindow('https://developers.google.com/web/')
    );
});
