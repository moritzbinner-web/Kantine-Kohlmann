import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import { del, list, put } from "@vercel/blob";
import type { SiteModel } from "./site-model";
import { isDemo } from "./demo";

/**
 * Speicher für das Seitenmodell und hochgeladene Bilder.
 * Auf Vercel: Vercel Blob (BLOB_READ_WRITE_TOKEN). Lokal: Dateien im Projekt
 * (content/site-model.json, public/uploads/) — beides ist nicht Teil des Deploys.
 * Demo-Modus: jede Sitzung (sbx) hat ihre eigene Vorschau unter sandbox/<id>/;
 * der Live-Stand wird im Demo-Modus nie geschrieben.
 */
const MODEL_PATH = "kantine/site-model.json";
const LOCAL_MODEL = path.join(process.cwd(), ".data", "site-model.json");
const LOCAL_SANDBOX = path.join(process.cwd(), ".sandbox");
const LOCAL_UPLOADS = path.join(process.cwd(), "public", "uploads");

const useBlob = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);
const blobPath = (sbx?: string | null) => (sbx ? `sandbox/${sbx}/site-model.json` : MODEL_PATH);
const localPath = (sbx?: string | null) => (sbx ? path.join(LOCAL_SANDBOX, `${sbx}.json`) : LOCAL_MODEL);

export async function readModel(sbx?: string | null): Promise<SiteModel | null> {
  // Demo ohne Sitzung (oder ohne eigene Vorschau) = freigegebener Grundzustand
  if (isDemo() && !sbx) return null;
  try {
    if (useBlob()) {
      const pathname = blobPath(sbx);
      const { blobs } = await list({ prefix: pathname, limit: 5 });
      const blob = blobs.find((b) => b.pathname === pathname);
      if (!blob) return null;
      // Cache-Buster: die Blob-URL bleibt gleich, der Stand ändert sich
      const res = await fetch(`${blob.url}?v=${new Date(blob.uploadedAt).getTime()}`, {
        cache: "no-store",
      });
      if (!res.ok) return null;
      return (await res.json()) as SiteModel;
    }
    return JSON.parse(await fs.readFile(localPath(sbx), "utf8")) as SiteModel;
  } catch {
    return null;
  }
}

export async function writeModel(model: SiteModel, sbx?: string | null): Promise<void> {
  if (isDemo() && !sbx) throw new Error("Demo: keine Sitzung");
  const body = JSON.stringify(model, null, 2);
  if (useBlob()) {
    await put(blobPath(sbx), body, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
      cacheControlMaxAge: 60,
    });
    return;
  }
  const file = localPath(sbx);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, body + "\n");
}

export async function resetModel(sbx?: string | null): Promise<void> {
  if (isDemo() && !sbx) return;
  if (useBlob()) {
    const pathname = blobPath(sbx);
    const { blobs } = await list({ prefix: pathname, limit: 5 });
    await Promise.all(blobs.filter((b) => b.pathname === pathname).map((b) => del(b.url)));
    return;
  }
  await fs.rm(localPath(sbx), { force: true });
}

/** Demo: Vorschauen löschen, die älter als maxAgeMs sind (Cron). */
export async function cleanupSandboxes(maxAgeMs: number): Promise<number> {
  if (!useBlob()) return 0;
  let cursor: string | undefined;
  let removed = 0;
  do {
    const res = await list({ prefix: "sandbox/", cursor, limit: 1000 });
    const old = res.blobs.filter((b) => Date.now() - new Date(b.uploadedAt).getTime() > maxAgeMs);
    if (old.length) await del(old.map((b) => b.url));
    removed += old.length;
    cursor = res.hasMore ? res.cursor : undefined;
  } while (cursor);
  return removed;
}

/** Datei ablegen, liefert die öffentliche URL (für next/image). */
export async function storeFile(
  fileName: string,
  bytes: ArrayBuffer,
  contentType: string,
): Promise<string> {
  const safe = fileName.toLowerCase().replace(/[^a-z0-9.]+/g, "-").replace(/^-+|-+$/g, "");
  if (useBlob()) {
    const blob = await put(`kantine/uploads/${safe}`, bytes, {
      access: "public",
      addRandomSuffix: true,
      contentType,
    });
    return blob.url;
  }
  await fs.mkdir(LOCAL_UPLOADS, { recursive: true });
  const name = `${Date.now()}-${safe}`;
  await fs.writeFile(path.join(LOCAL_UPLOADS, name), Buffer.from(bytes));
  return `/uploads/${name}`;
}

export const storageKind = () => (isDemo() ? "sandbox" : useBlob() ? "vercel-blob" : "local");
