import { Hono } from "hono";
import { Env } from "../middleware/auth";

const collections = new Hono<Env>();

collections.get("/", async (c) => {
  const { results } = await c.env.DB.prepare("SELECT * FROM collections ORDER BY id").all();
  return c.json({ collections: results });
});

export default collections;
