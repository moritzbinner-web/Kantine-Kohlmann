import "server-only";
import { cookies } from "next/headers";

/**
 * Demo-/Sandbox-Modus (DEMO_MODE=1): Besucher können das Admin-Panel ausprobieren.
 * Jede Sitzung bekommt ein eigenes Cookie "sbx"; gespeichert wird nur eine Vorschau
 * unter sandbox/<id>/ — der freigegebene Stand der Website wird nie verändert.
 * Hochgeladene Dateien bleiben im Browser (IndexedDB + Service Worker /sbx-sw.js).
 */
export const isDemo = () => process.env.DEMO_MODE === "1";
export const SBX_COOKIE = "sbx";
const SBX_RE = /^[a-f0-9]{32}$/;

export async function getSandboxId(): Promise<string | null> {
  if (!isDemo()) return null;
  try {
    const v = (await cookies()).get(SBX_COOKIE)?.value ?? "";
    return SBX_RE.test(v) ? v : null;
  } catch {
    return null; // außerhalb eines Requests (Build)
  }
}

export function sandboxIdFrom(req: Request): string | null {
  const m = /(?:^|;\s*)sbx=([a-f0-9]{32})/.exec(req.headers.get("cookie") ?? "");
  return m ? m[1] : null;
}

export function newSandboxId(): string {
  const a = new Uint8Array(16);
  crypto.getRandomValues(a);
  return Array.from(a, (b) => b.toString(16).padStart(2, "0")).join("");
}

export const sandboxCookie = (id: string) =>
  `${SBX_COOKIE}=${id}; Path=/; HttpOnly; SameSite=Lax${process.env.NODE_ENV === "production" ? "; Secure" : ""}`;

/** Platzhalter für Original-Video-Links, die im Demo-Panel nicht angezeigt werden */
export const HIDDEN_VIDEO = "__original__";
