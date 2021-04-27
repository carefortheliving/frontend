let staticCacheName = "cache-for-offline-pages-1";
let dynamicCacheName = "cache-for-dynamic-data-1";
const OFFLINE_URL = "offline.html";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      cache.add("/");
      cache.add("/index.html");
      cache.add("/offline.html");
      cache.add("/favicon.ico");
      cache.add("/manifest.json");
      cache.add("/android-chrome-192x192.png");
      cache.add("/static/js/bundle.js");
      cache.add("/android-chrome-192x192.png");
      cache.add("/static/js/vendors~main.chunk.js");
      cache.add("/static/js/vendors~main.chunk.js");
      cache.add("/static/js/0.chunk.js");
      cache.add("/static/js/2.chunk.js");
      cache.add("/static/js/3.chunk.js");
      cache.add("/static/js/1.chunk.js");
      cache.add("/static/js/5.chunk.js");
      cache.add("/static/js/bundle.js.map");
      cache.add("/static/js/main.chunk.js.map");
      cache.add("/static/js/vendors~main.chunk.js.map");
      cache.add("/static/js/main.chunk.js");
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key != staticCacheName && key != dynamicCacheName) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((responseFromCache) => {
      if (responseFromCache) return responseFromCache;
      else
        return fetch(event.request)
          .then((responseFromServer) => {
            return caches.open(dynamicCacheName).then((cache) => {
              cache.put(event.request.url, responseFromServer.clone());
              return responseFromServer;
            });
          })
          .catch((err) => {
            return caches.open(staticCacheName).then((cache) => {
              return cache.match("/offline.html");
            });
          });
    })
  );
});

