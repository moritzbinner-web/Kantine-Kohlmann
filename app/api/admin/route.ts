import { isAuthorized, unauthorized } from "@/lib/admin-auth";
import { isDemo, sandboxIdFrom } from "@/lib/demo";
import { resetModel, storageKind, writeModel } from "@/lib/model-store";
import { defaultModel, getSiteModel, type SiteModel } from "@/lib/site-model";

export const dynamic = "force-dynamic";

/** GET = Inhalte lesen · PUT = speichern (Demo: nur Vorschau dieser Sitzung) · DELETE = Grundzustand */
export async function GET(req: Request) {
  if (!isAuthorized(req)) return unauthorized();
  const model = await getSiteModel();
  return Response.json({ model, storage: storageKind(), demo: isDemo() }, { headers: { "Cache-Control": "no-store" } });
}

export async function PUT(req: Request) {
  if (!isAuthorized(req)) return unauthorized();
  const sbx = sandboxIdFrom(req);
  if (isDemo() && !sbx) return Response.json({ error: "Demo-Sitzung fehlt – bitte neu anmelden" }, { status: 400 });
  const raw = await req.text();
  if (raw.length > 1_500_000) return Response.json({ error: "Inhalt zu groß" }, { status: 413 });
  const body = JSON.parse(raw) as SiteModel;
  if (!body || body.version !== 1 || !body.index || !body.restaurant || !body.bar) {
    return Response.json({ error: "Ungültiges Modell" }, { status: 400 });
  }
  const model: SiteModel = { ...body, updatedAt: new Date().toISOString() };
  await writeModel(model, sbx);
  return Response.json({ ok: true, updatedAt: model.updatedAt });
}

export async function DELETE(req: Request) {
  if (!isAuthorized(req)) return unauthorized();
  await resetModel(sandboxIdFrom(req));
  return Response.json({ ok: true, model: defaultModel() });
}
