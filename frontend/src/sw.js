import { urlsToCache } from "./urlsToCache";

const CACHE_NAME = 'lubriplus-cache-v1';
// Instalación del Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 Archivos cacheados con éxito');
        return cache.addAll(urlsToCache);
      })
  );
});

// Estrategia: Primero buscar en Cache, si no, ir a la Red
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});