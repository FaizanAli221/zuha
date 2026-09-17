import { Hono } from "hono";
import { cors } from "hono/cors";
import { Env } from "./middleware/auth";

import products from "./routes/products";
import categories from "./routes/categories";
import collections from "./routes/collections";
import auth from "./routes/auth";
import cart from "./routes/cart";
import wishlist from "./routes/wishlist";
import orders from "./routes/orders";

const app = new Hono<Env>();

app.use("*", cors());

app.get("/", (c) => c.json({ name: "ZUHA API", status: "ok" }));

app.route("/api/products", products);
app.route("/api/categories", categories);
app.route("/api/collections", collections);
app.route("/api/auth", auth);
app.route("/api/cart", cart);
app.route("/api/wishlist", wishlist);
app.route("/api/orders", orders);

app.notFound((c) => c.json({ error: "Not found" }, 404));
app.onError((err, c) => {
  console.error(err);
  return c.json({ error: "Internal server error" }, 500);
});

export default app;
