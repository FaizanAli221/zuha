import { Hono } from "hono";
import { Env } from "../middleware/auth";

const products = new Hono<Env>();

// GET /api/products?gender=women&category=kurtas&collection=best-sellers&best_seller=1&new_arrival=1&search=kurta&limit=12
products.get("/", async (c) => {
  const { gender, category, collection, best_seller, new_arrival, search, limit } = c.req.query();

  let sql = `
    SELECT p.*, c.name AS category_name, c.slug AS category_slug, co.name AS collection_name, co.slug AS collection_slug
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    LEFT JOIN collections co ON p.collection_id = co.id
    WHERE 1=1
  `;
  const params: any[] = [];

  if (gender) { sql += " AND p.gender = ?"; params.push(gender); }
  if (category) { sql += " AND c.slug = ?"; params.push(category); }
  if (collection) { sql += " AND co.slug = ?"; params.push(collection); }
  if (best_seller) { sql += " AND p.is_best_seller = 1"; }
  if (new_arrival) { sql += " AND p.is_new_arrival = 1"; }
  if (search) { sql += " AND (p.name LIKE ? OR p.description LIKE ?)"; params.push(`%${search}%`, `%${search}%`); }

  sql += " ORDER BY p.created_at DESC";
  if (limit) { sql += " LIMIT ?"; params.push(Number(limit)); }

  const { results } = await c.env.DB.prepare(sql).bind(...params).all();
  return c.json({ products: results });
});

products.get("/:slug", async (c) => {
  const slug = c.req.param("slug");
  const product = await c.env.DB.prepare(
    `SELECT p.*, c.name AS category_name, c.slug AS category_slug, co.name AS collection_name, co.slug AS collection_slug
     FROM products p
     LEFT JOIN categories c ON p.category_id = c.id
     LEFT JOIN collections co ON p.collection_id = co.id
     WHERE p.slug = ?`
  ).bind(slug).first();

  if (!product) return c.json({ error: "Product not found" }, 404);
  return c.json({ product });
});

export default products;
