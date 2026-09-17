import { Hono } from "hono";
import { Env } from "../middleware/auth";
import { hashPassword, verifyPassword, signToken } from "../utils";

const auth = new Hono<Env>();

auth.post("/register", async (c) => {
  const { name, email, password, phone } = await c.req.json();
  if (!name || !email || !password) return c.json({ error: "Name, email and password are required" }, 400);

  const existing = await c.env.DB.prepare("SELECT id FROM users WHERE email = ?").bind(email).first();
  if (existing) return c.json({ error: "An account with this email already exists" }, 409);

  const password_hash = await hashPassword(password);
  const result = await c.env.DB.prepare(
    "INSERT INTO users (name, email, password_hash, phone) VALUES (?, ?, ?, ?)"
  ).bind(name, email, password_hash, phone ?? null).run();

  const userId = result.meta.last_row_id as number;
  const token = await signToken({ userId }, c.env.JWT_SECRET);
  return c.json({ token, user: { id: userId, name, email } }, 201);
});

auth.post("/login", async (c) => {
  const { email, password } = await c.req.json();
  const user = await c.env.DB.prepare("SELECT * FROM users WHERE email = ?").bind(email).first<any>();
  if (!user || !(await verifyPassword(password, user.password_hash))) {
    return c.json({ error: "Invalid email or password" }, 401);
  }
  const token = await signToken({ userId: user.id }, c.env.JWT_SECRET);
  return c.json({ token, user: { id: user.id, name: user.name, email: user.email } });
});

export default auth;
