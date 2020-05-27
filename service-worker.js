const CACHE_NAME = 'pwa-pertama-v0.0.112';

const js = [
    '/js/materialize.min.js',
    '/js/app.js',
    '/js/main.js',
    './manifest.json',
]

const css = [
    '/css/materialize.min.css',
    '/css/font.css',
]

const html = [
    // App Shell
    '/',
    '/nav/nav.html',
    '/nav/sidenav.html',

    // Static pages
    '/pages/jonathan.html',
    '/pages/joseph.html',
    '/pages/jotaro.html',
    '/pages/josuke.html',
]

const img = [
    // Icons
    '/img/icons/apple.png',
    '/img/icons/favicon.ico',
    '/img/icons/favicon16.png',
    '/img/icons/favicon32.png',
    '/img/icons/icon192.png',
    '/img/icons/icon512.png',

    // Sidenav image
    '/img/jojo.svg',

    // Character photos
    '/img/part1/dio.png',
    '/img/part1/jojo.png',
    '/img/part2/kars.png',
    '/img/part2/jojo.png',
    '/img/part3/DIO.png',
    '/img/part3/jojo.png',
    '/img/part4/kira.jpg',
    '/img/part4/jojo.png',
]



self.addEventListener('install', async (e) => {
    e.waitUntil(addCache());

    async function addCache() {
        const cache = await caches.open(CACHE_NAME);
        await cache.addAll([...js, ...css, ...html, ...img]);
    }
})

self.addEventListener('fetch', async (e) => {
    e.respondWith(loadCache());

    async function loadCache() {
        const response = await caches.match(e.request, { cacheName: CACHE_NAME });
        if (response) {
            console.log(`Service Worker: Menggunakan aset dari cache: ${e.response.url}`);
            return response;
        }

        console.log(`Service Worker: Menggunakan aset dari server: ${e.request.url}`);
        return fetch(e.request);
    }
})

self.addEventListener('activate', async (e) => {
    e.waitUntil(deleteCache());

    async function deleteCache() {
        const cacheNames = await caches.keys();
        await Promise.all(
            cacheNames.map((cacheName) => {
                if (cacheName != CACHE_NAME) {
                    console.log(`Service Worker: Cache ${cacheName} dihapus`);
                    return caches.delete(cacheName);
                }
            })
        )
    }
})