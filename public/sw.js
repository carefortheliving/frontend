var staticCacheName = "cache-for-offline-pages";
var dynamicCacheName = "cache-for-dynamic-data";
const OFFLINE_URL = "offline.html";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      cache.addAll([
        "/",
        "/index.html",
        "/offline.html",
        "/favicon.ico",
        "/manifest.json",
        "/android-chrome-192x192.png",
        "/static/js/bundle.js",
        "/static/js/vendors~main.chunk.js",
        "/static/js/main.chunk.js",
        "/static/js/0.chunk.js",
        "/static/js/2.chunk.js",
        "/static/js/3.chunk.js",
        "/static/js/1.chunk.js",
        "/static/js/5.chunk.js",
        "/static/js/bundle.js.map",
        "/static/js/main.chunk.js.map",
        "/static/js/main.chunk.js.map",
        "/static/js/vendors~main.chunk.js.map",
        "/static/js/vendors~main.chunk.js.map"
      ]);
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
