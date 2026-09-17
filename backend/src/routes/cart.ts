import { Hono } from "hono";
import { Env, requireAuth } from "../middleware/auth";

const cart = new Hono<Env>();
cart.use("*", requireAuth);

cart.get("/", async (c) => {
  const userId = c.get("userId");
  const { results } = await c.env.DB.prepare(
    `SELECT ci.id, ci.quantity, ci.size, ci.color, p.*
     FROM cart_items ci JOIN products p ON ci.product_id = p.id
     WHERE ci.user_id = ? ORDER BY ci.created_at DESC`
  ).bind(userId).all();
  return c.json({ items: results });
});

cart.post("/", async (c) => {
  const userId = c.get("userId");
  const { product_id, size, color, quantity } = await c.req.json();
  if (!product_id) return c.json({ error: "product_id is required" }, 400);

  const result = await c.env.DB.prepare(
    "INSERT INTO cart_items (user_id, product_id, size, color, quantity) VALUES (?, ?, ?, ?, ?)"
  ).bind(userId, product_id, size ?? null, color ?? null, quantity ?? 1).run();

  return c.json({ id: result.meta.last_row_id }, 201);
});

cart.patch("/:id", async (c) => {
  const userId = c.get("userId");
  const id = c.req.param("id");
  const { quantity } = await c.req.json();
  await c.env.DB.prepare("UPDATE cart_items SET quantity = ? WHERE id = ? AND user_id = ?")
    .bind(quantity, id, userId).run();
  return c.json({ success: true });
});

cart.delete("/:id", async (c) => {
  const userId = c.get("userId");
  const id = c.req.param("id");
  await c.env.DB.prepare("DELETE FROM cart_items WHERE id = ? AND user_id = ?").bind(id, userId).run();
  return c.json({ success: true });
});

export default cart;
