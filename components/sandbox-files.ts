"use client";

/** Demo-Sandbox: Uploads bleiben im Browser (IndexedDB), ausgeliefert vom Service Worker /sbx-sw.js. */
const DB = "sbx-files";
const STORE = "files";

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const r = indexedDB.open(DB, 1);
    r.onupgradeneeded = () => r.result.createObjectStore(STORE);
    r.onsuccess = () => resolve(r.result);
    r.onerror = () => reject(r.error);
  });
}

export async function registerSandboxWorker(): Promise<boolean> {
  if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return false;
  try {
    await navigator.serviceWorker.register("/sbx-sw.js", { scope: "/" });
    await navigator.serviceWorker.ready;
    if (navigator.serviceWorker.controller) return true;
    // Erste Aktivierung: warten, bis der Worker die Seite übernimmt
    await new Promise<void>((resolve) => {
      const t = window.setTimeout(resolve, 3000);
      navigator.serviceWorker.addEventListener("controllerchange", () => { window.clearTimeout(t); resolve(); }, { once: true });
    });
    return Boolean(navigator.serviceWorker.controller);
  } catch {
    return false;
  }
}

export async function storeSandboxFile(file: File): Promise<string> {
  if (!(await registerSandboxWorker())) throw new Error("Dieser Browser unterstützt die Demo-Uploads nicht (Service Worker).");
  const id = Array.from(crypto.getRandomValues(new Uint8Array(12)), (b) => b.toString(16).padStart(2, "0")).join("");
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put({ blob: file, type: file.type, name: file.name, at: Date.now() }, id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error ?? new Error("Speichern im Browser fehlgeschlagen (Speicher voll?)"));
  });
  const safe = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-").replace(/^-+|-+$/g, "") || "datei";
  return `/sbx-file/${id}/${safe}`;
}

export async function clearSandboxFiles(): Promise<void> {
  try {
    const db = await openDb();
    await new Promise<void>((resolve) => {
      const tx = db.transaction(STORE, "readwrite");
      tx.objectStore(STORE).clear();
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    });
  } catch {
    /* nichts zu löschen */
  }
}
