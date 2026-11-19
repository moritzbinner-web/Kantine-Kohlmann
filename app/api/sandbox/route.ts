import { isDemo, sandboxIdFrom } from "@/lib/demo";
import { resetModel } from "@/lib/model-store";

export const dynamic = "force-dynamic";

/** Demo: eigene Vorschau verwerfen (ohne Passwort — betrifft nur die eigene Sitzung). */
export async function DELETE(req: Request) {
  if (!isDemo()) return Response.json({ error: "Kein Demo-Modus" }, { status: 404 });
  const sbx = sandboxIdFrom(req);
  if (sbx) await resetModel(sbx);
  return Response.json({ ok: true });
}
