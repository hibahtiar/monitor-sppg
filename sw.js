// Monitor SPPG — service worker: aplikasi tetap bisa dibuka tanpa sinyal.
// Halaman diambil dari jaringan dulu (agar versi baru langsung terpakai), cadangan dari simpanan bila offline.
// Tidak pernah menyimpan permintaan ke server sinkron (Google).
const SIMPANAN = 'monitor-sppg-v10';
const BERKAS = ['./', './index.html', './manifest.webmanifest', './ikon-192.png', './ikon-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(SIMPANAN).then(c => c.addAll(BERKAS))); self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.indexOf('monitor-sppg-') === 0 && k !== SIMPANAN).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== self.location.origin) return;
  e.respondWith(fetch(e.request).then(r => {
    if (r.ok) { const salin = r.clone(); caches.open(SIMPANAN).then(c => c.put(e.request, salin)); }
    return r;
  }).catch(() => caches.match(e.request).then(r => r || caches.match('./index.html'))));
});
