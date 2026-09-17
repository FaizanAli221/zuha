import { Hono } from "hono";
import { Env, requireAuth } from "../middleware/auth";

const orders = new Hono<Env>();
orders.use("*", requireAuth);

// Create an order from the items currently in the user's cart.
orders.post("/", async (c) => {
  const userId = c.get("userId");
  const { shipping_name, shipping_address, shipping_city, shipping_phone, payment_method } = await c.req.json();

  if (!shipping_name || !shipping_address || !shipping_city || !shipping_phone) {
    return c.json({ error: "Shipping details are incomplete" }, 400);
  }

  const { results: cartItems } = await c.env.DB.prepare(
    `SELECT ci.*, p.name AS product_name, p.price FROM cart_items ci
     JOIN products p ON ci.product_id = p.id WHERE ci.user_id = ?`
  ).bind(userId).all<any>();

  if (!cartItems.length) return c.json({ error: "Your cart is empty" }, 400);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const orderResult = await c.env.DB.prepare(
    `INSERT INTO orders (user_id, total, shipping_name, shipping_address, shipping_city, shipping_phone, payment_method)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).bind(userId, total, shipping_name, shipping_address, shipping_city, shipping_phone, payment_method ?? "cod").run();

  const orderId = orderResult.meta.last_row_id;

  for (const item of cartItems) {
    await c.env.DB.prepare(
      `INSERT INTO order_items (order_id, product_id, product_name, size, color, quantity, price)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    ).bind(orderId, item.product_id, item.product_name, item.size, item.color, item.quantity, item.price).run();
  }

  await c.env.DB.prepare("DELETE FROM cart_items WHERE user_id = ?").bind(userId).run();

  return c.json({ order_id: orderId, total }, 201);
});

orders.get("/", async (c) => {
  const userId = c.get("userId");
  const { results } = await c.env.DB.prepare("SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC").bind(userId).all();
  return c.json({ orders: results });
});

orders.get("/:id", async (c) => {
  const userId = c.get("userId");
  const id = c.req.param("id");
  const order = await c.env.DB.prepare("SELECT * FROM orders WHERE id = ? AND user_id = ?").bind(id, userId).first();
  if (!order) return c.json({ error: "Order not found" }, 404);
  const { results: items } = await c.env.DB.prepare("SELECT * FROM order_items WHERE order_id = ?").bind(id).all();
  return c.json({ order, items });
});

export default orders;
