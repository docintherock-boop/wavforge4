const CACHE_NAME='wavforge-v2.1';
const ASSETS=['podcast-editor.html','manifest.json','icon-192.svg','apple-touch-icon.svg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==CACHE_NAME).map(n=>caches.delete(n)))));self.clients.claim()});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{if(res.status===200){const c=res.clone();caches.open(CACHE_NAME).then(cache=>cache.put(e.request,c))}return res})).catch(()=>caches.match('podcast-editor.html')))});
