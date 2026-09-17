import { Context, Next } from "hono";
import { verifyToken } from "../utils";

export type Env = {
  Bindings: { DB: D1Database; JWT_SECRET: string };
  Variables: { userId: number };
};

export async function requireAuth(c: Context<Env>, next: Next) {
  const header = c.req.header("Authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return c.json({ error: "Not authenticated" }, 401);

  const payload = await verifyToken(token, c.env.JWT_SECRET);
  if (!payload || !payload.userId) return c.json({ error: "Invalid or expired token" }, 401);

  c.set("userId", payload.userId as number);
  await next();
}
