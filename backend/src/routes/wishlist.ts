import { Hono } from "hono";
import { Env, requireAuth } from "../middleware/auth";

const wishlist = new Hono<Env>();
wishlist.use("*", requireAuth);

wishlist.get("/", async (c) => {
  const userId = c.get("userId");
  const { results } = await c.env.DB.prepare(
    `SELECT w.id AS wishlist_id, p.*
     FROM wishlist w JOIN products p ON w.product_id = p.id
     WHERE w.user_id = ? ORDER BY w.created_at DESC`
  ).bind(userId).all();
  return c.json({ items: results });
});

wishlist.post("/", async (c) => {
  const userId = c.get("userId");
  const { product_id } = await c.req.json();
  if (!product_id) return c.json({ error: "product_id is required" }, 400);

  await c.env.DB.prepare("INSERT OR IGNORE INTO wishlist (user_id, product_id) VALUES (?, ?)")
    .bind(userId, product_id).run();
  return c.json({ success: true }, 201);
});

wishlist.delete("/:product_id", async (c) => {
  const userId = c.get("userId");
  const productId = c.req.param("product_id");
  await c.env.DB.prepare("DELETE FROM wishlist WHERE user_id = ? AND product_id = ?")
    .bind(userId, productId).run();
  return c.json({ success: true });
});

export default wishlist;
