import "server-only";
import crypto from "node:crypto";
import { isDemo } from "./demo";

/** Passwort: ADMIN_PASSWORD (Demo: fest 1234). Sitzung = HMAC-Token (12 h) als "Authorization: Bearer". */
const password = () => process.env.ADMIN_PASSWORD || (isDemo() ? "1234" : "");
const secret = () => process.env.SESSION_SECRET || process.env.BLOB_READ_WRITE_TOKEN || "kantine-local-dev";
const sign = (p: string) => crypto.createHmac("sha256", secret()).update(p).digest("base64url");
const same = (a: string, b: string) => {
  const x = Buffer.from(a), y = Buffer.from(b);
  return x.length === y.length && crypto.timingSafeEqual(x, y);
};

export const checkPassword = (pw: unknown) => typeof pw === "string" && !!password() && same(pw, password());
export const issueToken = () => { const exp = String(Date.now() + 12 * 3600 * 1000); return `${exp}.${sign(exp)}`; };
export function isAuthorized(req: Request): boolean {
  const m = /^Bearer (\d+)\.([\w-]+)$/.exec(req.headers.get("authorization") ?? "");
  return !!m && Number(m[1]) > Date.now() && same(sign(m[1]), m[2]);
}
export const unauthorized = () => Response.json({ error: "Nicht angemeldet" }, { status: 401 });
