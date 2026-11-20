const CACHE_NAME="docscan-ai-v3";
const SHELL=["./","./index.html","./manifest.webmanifest","./vendor/tesseract.min.js","./vendor/worker.min.js","./vendor/jspdf.umd.min.js"];
self.addEventListener("install",event=>event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener("activate",event=>event.waitUntil(self.clients.claim()));
self.addEventListener("fetch",event=>{
  if(event.request.method!=="GET") return;
  const url=new URL(event.request.url);
  if(url.origin!==self.location.origin) return;
  event.respondWith(caches.open(CACHE_NAME).then(async cache=>{
    const cached=await cache.match(event.request);
    if(cached) return cached;
    const response=await fetch(event.request);
    if(response && response.ok) event.waitUntil(cache.put(event.request,response.clone()));
    return response;
  }));
});
