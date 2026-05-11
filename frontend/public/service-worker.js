const CACHE_NAME = 'lubriplus-v1';
const assets = [
  '/',
  '/index.html',
  '/n-index.css',
  '/static/js/bundle.js'
];

// Instalación: Guardar archivos base en caché
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Estrategia: Cargar de caché y actualizar de red
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});