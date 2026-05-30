// Minimal admin auth. Set ADMIN_TOKEN in the environment for production.
// Defaults to "veer-admin" for local/demo use.
import { NextRequest } from "next/server";

export const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "veer-admin";

export function isAdmin(req: NextRequest): boolean {
  const header = req.headers.get("authorization") || "";
  const token = header.replace(/^Bearer\s+/i, "").trim();
  return token === ADMIN_TOKEN;
}
