import { checkPassword, issueToken } from "@/lib/admin-auth";
import { isDemo, newSandboxId, sandboxCookie, sandboxIdFrom } from "@/lib/demo";

export const dynamic = "force-dynamic";

export function GET() {
  return Response.json({ demo: isDemo() });
}

export async function POST(req: Request) {
  const { password } = (await req.json().catch(() => ({}))) as { password?: string };
  if (!checkPassword(password)) {
    await new Promise((r) => setTimeout(r, 700));
    return Response.json({ error: "Falsches Passwort" }, { status: 401 });
  }
  const headers = new Headers();
  if (isDemo() && !sandboxIdFrom(req)) headers.append("Set-Cookie", sandboxCookie(newSandboxId()));
  return Response.json({ token: issueToken(), demo: isDemo() }, { headers });
}
