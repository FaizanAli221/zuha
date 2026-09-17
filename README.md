# ZUHA — Pakistani Fashion E-Commerce

A full-stack, portfolio-ready fashion storefront: React + Vite + Tailwind on
the front end, Hono on Cloudflare Workers with a D1 (SQLite) database on the
back end. ZUHA is an original fictional brand — all copy, product names and
imagery placeholders were written for this project.

```
zuha/
  frontend/   React + Vite + Tailwind storefront
  backend/    Hono API on Cloudflare Workers + D1
```

The frontend works fully on its own with local mock data (`src/data/products.js`),
so you can preview and deploy it before the backend exists. Point
`VITE_API_URL` at the deployed Worker to switch it over to live data, auth,
cart persistence and real checkout.

## 1. Frontend — local development

```bash
cd frontend
npm install
npm run dev
```

Open the printed local URL. No backend required at this stage.

## 2. Backend — Cloudflare Workers + D1

```bash
cd backend
npm install

# create the D1 database (one time)
npx wrangler d1 create zuha_db
# copy the returned database_id into wrangler.toml -> [[d1_databases]]

# apply schema + seed data
npm run db:migrate
npm run db:seed

# local dev
npm run dev

# deploy
npm run deploy
```

Deploying prints your Worker URL, e.g. `https://zuha-api.<you>.workers.dev`.

## 3. Connect the frontend to the live API

```bash
cd frontend
cp .env.example .env
# set VITE_API_URL=https://zuha-api.<you>.workers.dev
```

## 4. Deploy the frontend to Cloudflare Pages

```bash
cd frontend
npm run build
npx wrangler pages deploy dist
```

Or connect the `frontend/` folder as a GitHub project in the Cloudflare Pages
dashboard, with build command `npm run build` and output directory `dist`.

## Database schema

`users`, `products`, `categories`, `collections`, `orders`, `order_items`,
`cart_items`, `wishlist`, `admins` — see `backend/schema.sql`.

## API overview

| Method | Path                       | Auth | Description                  |
|--------|----------------------------|------|-------------------------------|
| GET    | /api/products              | -    | List products, filterable     |
| GET    | /api/products/:slug        | -    | Single product                |
| GET    | /api/categories            | -    | List categories               |
| GET    | /api/collections           | -    | List collections               |
| POST   | /api/auth/register         | -    | Create account, returns token |
| POST   | /api/auth/login            | -    | Returns token                 |
| GET/POST/PATCH/DELETE | /api/cart       | ✓    | Manage cart                   |
| GET/POST/DELETE | /api/wishlist          | ✓    | Manage wishlist                |
| GET/POST | /api/orders                | ✓    | Checkout, order history        |

Auth uses a lightweight HMAC-signed token (see `backend/src/utils.ts`) to
avoid an extra dependency — swap in a proper JWT library before production
use, and set a strong `JWT_SECRET` in `wrangler.toml`.

## Notes for a CV / portfolio write-up

- Original brand ("ZUHA"), original copy and placeholder imagery — no
  reused assets from the reference screenshots.
- Clean separation of concerns: reusable components, context-based cart /
  wishlist / auth state, a typed Worker API, normalized relational schema.
- Designed to demo instantly (mock data) and to run for real once deployed
  (D1-backed API), which is a good talking point in an interview.
