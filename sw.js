/* GasLedger SW v6 — network-first for HTML, clears all old caches */
var CACHE = 'gasledger-v6';
self.addEventListener('install', function(e) {
  e.waitUntil(caches.open(CACHE).then(function(c) {
    return c.addAll(['./index.html','./manifest.json']);
  }).then(function() { return self.skipWaiting(); }));
});
self.addEventListener('activate', function(e) {
  e.waitUntil(caches.keys().then(function(keys) {
    return Promise.all(keys.filter(function(k){return k!==CACHE;}).map(function(k){return caches.delete(k);}));
  }).then(function() { return self.clients.claim(); }));
});
self.addEventListener('fetch', function(e) {
  var url = e.request.url;
  if (url.includes('firebaseapp.com')||url.includes('googleapis.com')||url.includes('gstatic.com/firebasejs')||url.includes('cdnjs')||url.includes('fonts.g')) {
    e.respondWith(fetch(e.request)); return;
  }
  if (e.request.mode==='navigate'||url.endsWith('.html')) {
    e.respondWith(fetch(e.request).catch(function(){return caches.match('./index.html');})); return;
  }
  e.respondWith(caches.match(e.request).then(function(c){return c||fetch(e.request);}));
});
