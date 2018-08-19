//Service Worker init by Nemie
/**
 *Created With love by Nehemie, All the way from Udacity  
 */
var staticCacheName = 'artverb-static-v4';
//commentqwqwqwqwqw
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(staticCacheName).then((cache) => {
            return cache.addAll([
                './',
                './assets/css/main.css',
                './assets/css/codemirror.css',
                './assets/js/idb.js',
                './assets/js/indexController.js',
                './assets/js/main.js',
                './assets/js/codemirror.js'
                //'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/css/bootstrap.min.css',
                //https://use.fontawesome.com/releases/v5.1.0/css/all.css',
            ]);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.filter((cacheName) => {
                    return cacheName.startsWith('artverb-static-') &&
                        cacheName != staticCacheName;
                }).map((cacheName) => {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) =>{
    const requestURL = new URL(event.request.url);

    if(requestURL.origin === location.origin){
        if(requestURL.pathname === '/'){
            event.respondWith(caches.match('/'));
            return;
        }
    }


    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('message', (event) => {
    if (event.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
});

