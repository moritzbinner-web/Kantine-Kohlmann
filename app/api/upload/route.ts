import { isAuthorized, unauthorized } from "@/lib/admin-auth";
import { isDemo } from "@/lib/demo";
import { storeFile } from "@/lib/model-store";

export const dynamic = "force-dynamic";
const TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];

/** Bild-Upload (Rohdaten, Name in ?name=). Das Panel verkleinert vorher. Demo: gesperrt, Bilder bleiben im Browser. */
export async function POST(req: Request) {
  if (!isAuthorized(req)) return unauthorized();
  if (isDemo()) return Response.json({ error: "Im Demo-Modus bleiben Bilder im Browser" }, { status: 403 });
  const type = (req.headers.get("content-type") ?? "").split(";")[0];
  if (!TYPES.includes(type)) return Response.json({ error: "Nur JPG, PNG, WebP, GIF oder AVIF" }, { status: 415 });
  const bytes = await req.arrayBuffer();
  if (!bytes.byteLength || bytes.byteLength > 4.4e6) return Response.json({ error: "Datei leer oder zu groß" }, { status: 413 });
  const name = new URL(req.url).searchParams.get("name") ?? "bild";
  return Response.json({ url: await storeFile(name, bytes, type) });
}
