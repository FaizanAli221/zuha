import { Hono } from "hono";
import { Env } from "../middleware/auth";

const categories = new Hono<Env>();

categories.get("/", async (c) => {
  const { results } = await c.env.DB.prepare("SELECT * FROM categories ORDER BY name").all();
  return c.json({ categories: results });
});

export default categories;
