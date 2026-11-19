import { isDemo } from "@/lib/demo";
import { cleanupSandboxes } from "@/lib/model-store";

export const dynamic = "force-dynamic";

/** Täglich (vercel.json): Demo-Vorschauen älter als 24 h löschen. */
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return Response.json({ error: "Nicht erlaubt" }, { status: 401 });
  }
  if (!isDemo()) return Response.json({ ok: true, removed: 0 });
  const removed = await cleanupSandboxes(24 * 3600 * 1000);
  return Response.json({ ok: true, removed });
}
