const CACHE = "quiz-vinteum-v5";
const ASSETS = [
  "./",
  "index.html",
  "style.css",
  "app.js",
  "config.js",
  "questions.js",
  "manifest.webmanifest",
  "stand.html",
  "stand.js",
  "shared.js",
  "vendor/qrcode.js",
  "assets/icon.svg",
  "assets/icon-192.png",
  "assets/icon-512.png",
  "assets/apple-touch-icon.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Rede primeiro: sempre pega a versão mais nova quando há internet (evita arquivos misturados
// de versões diferentes). Se a rede falhar ou demorar mais de 4s, usa o que está guardado.
function fromCache(req) {
  return caches.match(req, { ignoreSearch: true }).then((hit) => hit || (req.mode === "navigate" ? caches.match("index.html") : null));
}

function networkFirst(req) {
  return new Promise((resolve) => {
    let done = false;
    const finish = (res) => { if (!done && res) { done = true; resolve(res); } };
    const timer = setTimeout(() => fromCache(req).then(finish), 4000);
    fetch(req, { cache: "no-cache" })
      .then((res) => {
        clearTimeout(timer);
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
        }
        finish(res);
      })
      .catch(() => {
        clearTimeout(timer);
        fromCache(req).then((hit) => finish(hit || Response.error()));
      });
  });
}

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  e.respondWith(networkFirst(req));
});
