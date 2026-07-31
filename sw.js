const CACHE_NAME = 'my-app-v1';
const urlsToCache = [
  './index.html',
  './manifest.json',
  './icon-192.png'
  // CSSやJSファイルがあればここに追加します
];

// インストール時にファイルをキャッシュ
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

// オフライン時はキャッシュからファイルを表示
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
