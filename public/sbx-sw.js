/* Demo-Sandbox: liefert im Browser gespeicherte Uploads (IndexedDB) unter /sbx-file/<id>/<name> aus —
   auch wenn next/image sie über /_next/image?url=/sbx-file/… anfragt. Nichts davon liegt auf dem Server. */
const DB = 'sbx-files', STORE = 'files';
const openDb = () => new Promise((res, rej) => {
  const r = indexedDB.open(DB, 1);
  r.onupgradeneeded = () => r.result.createObjectStore(STORE);
  r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error);
});
const getFile = async (id) => { const db = await openDb(); return new Promise((res, rej) => { const q = db.transaction(STORE).objectStore(STORE).get(id); q.onsuccess = () => res(q.result); q.onerror = () => rej(q.error); }); };
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', (e) => {
  const u = new URL(e.request.url);
  if (u.origin !== self.location.origin || e.request.method !== 'GET') return;
  let p = u.pathname;
  if (p === '/_next/image') { const inner = u.searchParams.get('url') || ''; if (!inner.startsWith('/sbx-file/')) return; p = inner; }
  if (!p.startsWith('/sbx-file/')) return;
  const id = p.split('/')[2];
  e.respondWith(getFile(id).then((f) => f
    ? new Response(f.blob, { headers: { 'Content-Type': f.type || 'application/octet-stream', 'Cache-Control': 'no-store' } })
    : new Response('Demo-Datei nicht gefunden (sie liegt nur im Browser, in dem sie hochgeladen wurde).', { status: 404 })).catch(() => new Response('Fehler', { status: 500 })));
});
