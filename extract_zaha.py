import urllib.request
import json
import re

url = 'https://www.zaha.pk/products.json?limit=30'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as response:
    data = json.loads(response.read().decode())

products = data.get('products', [])

clean_prods = []
for i, p in enumerate(products[:16]):
    raw_title = p.get('title', '')
    handle = p.get('handle', f'product-{i+1}')
    body = p.get('body_html', '')
    desc = re.sub('<[^<]+?>', '', body)
    desc = re.sub(r'\s+', ' ', desc).strip()
    if len(desc) > 180:
        desc = desc[:177] + '...'
    if not desc:
        desc = f'Original Zaha {raw_title} ensemble cut from premium fabrics with intricate detailing.'
    
    price_val = float(p['variants'][0]['price']) if p.get('variants') else 8950.0
    price = int(price_val)
    
    images = [img['src'] for img in p.get('images', [])]
    img1 = images[0] if len(images) > 0 else 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800'
    img2 = images[1] if len(images) > 1 else img1

    tags = ' '.join(p.get('tags', [])).lower()
    
    cat_slug = 'ready-to-wear'
    cat_name = 'Ready to Wear'
    cat_id = 2
    if 'dupatta' in raw_title.lower():
        cat_slug = 'shawls-dupattas'
        cat_name = 'Shawls & Dupattas'
        cat_id = 6
    elif 'unstitched' in tags or ('lawn' in raw_title.lower() and 'stitched' not in tags):
        cat_slug = 'unstitched-lawn'
        cat_name = 'Unstitched Lawn'
        cat_id = 1
    elif 'co-ord' in raw_title.lower() or '2 pc' in tags or 'shirt | trouser' in body.lower():
        cat_slug = 'co-ord-sets'
        cat_name = 'Co-Ord Sets'
        cat_id = 4

    col_id = (i % 6) + 1
    
    clean_prods.append({
        'id': i + 1,
        'name': raw_title,
        'slug': handle,
        'description': desc,
        'fabric': 'Lawn / Jacquard' if 'jacquard' in body.lower() else ('Silk Chiffon' if 'chiffon' in body.lower() else 'Premium Lawn'),
        'price': price,
        'compare_at_price': int(price * 1.25) if i % 3 == 0 else None,
        'gender': 'women',
        'category_id': cat_id,
        'category_slug': cat_slug,
        'category_name': cat_name,
        'collection_id': col_id,
        'image_url': img1,
        'image_url_alt': img2,
        'colors': 'Multicolor, Pastel',
        'sizes': 'S,M,L,XL',
        'rating': round(4.5 + (i % 5) * 0.1, 1),
        'review_count': 35 + i * 7,
        'is_best_seller': 1 if i % 2 == 0 else 0,
        'is_new_arrival': 1 if i % 2 == 1 else 0
    })

# Format products.js
js_content = f"""// Real ZAHA Products & Collections fetched directly from zaha.pk

export const categories = [
  {{ id: 1, name: "Unstitched Lawn", slug: "unstitched-lawn", image_url: "{clean_prods[0]['image_url']}" }},
  {{ id: 2, name: "Ready to Wear", slug: "ready-to-wear", image_url: "{clean_prods[1]['image_url']}" }},
  {{ id: 3, name: "Bridal & Formals", slug: "bridal-formals", image_url: "{clean_prods[2]['image_url']}" }},
  {{ id: 4, name: "Co-Ord Sets", slug: "co-ord-sets", image_url: "{clean_prods[3]['image_url']}" }},
  {{ id: 5, name: "Kurtas & Tops", slug: "kurtas-tops", image_url: "{clean_prods[4]['image_url']}" }},
  {{ id: 6, name: "Shawls & Dupattas", slug: "shawls-dupattas", image_url: "{clean_prods[8]['image_url']}" }},
];

export const collections = [
  {{ id: 1, name: "Festive Lawn '26", slug: "festive-lawn-26", image_url: "{clean_prods[0]['image_url']}" }},
  {{ id: 2, name: "Livin' La Zaha", slug: "livin-la-zaha", image_url: "{clean_prods[1]['image_url']}" }},
  {{ id: 3, name: "ZAHA Lawn '26", slug: "zaha-lawn-26", image_url: "{clean_prods[2]['image_url']}" }},
  {{ id: 4, name: "Amaya Printed Lawn", slug: "amaya-lawn", image_url: "{clean_prods[3]['image_url']}" }},
  {{ id: 5, name: "New Arrivals", slug: "new-arrivals", image_url: "{clean_prods[4]['image_url']}" }},
  {{ id: 6, name: "Best Sellers", slug: "best-sellers", image_url: "{clean_prods[5]['image_url']}" }},
];

export const products = {json.dumps(clean_prods, indent=2)};
"""

with open('frontend/src/data/products.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

# Format seed.sql
sql_lines = [
    "-- Clear existing data",
    "DELETE FROM order_items;",
    "DELETE FROM orders;",
    "DELETE FROM cart_items;",
    "DELETE FROM wishlist;",
    "DELETE FROM products;",
    "DELETE FROM categories;",
    "DELETE FROM collections;",
    "",
    "-- Insert ZAHA Categories",
    "INSERT INTO categories (id, name, slug, image_url) VALUES",
    f"  (1, 'Unstitched Lawn', 'unstitched-lawn', '{clean_prods[0]['image_url']}'),",
    f"  (2, 'Ready to Wear', 'ready-to-wear', '{clean_prods[1]['image_url']}'),",
    f"  (3, 'Bridal & Formals', 'bridal-formals', '{clean_prods[2]['image_url']}'),",
    f"  (4, 'Co-Ord Sets', 'co-ord-sets', '{clean_prods[3]['image_url']}'),",
    f"  (5, 'Kurtas & Tops', 'kurtas-tops', '{clean_prods[4]['image_url']}'),",
    f"  (6, 'Shawls & Dupattas', 'shawls-dupattas', '{clean_prods[8]['image_url']}');",
    "",
    "-- Insert ZAHA Collections",
    "INSERT INTO collections (id, name, slug, image_url) VALUES",
    f"  (1, 'Festive Lawn ''26', 'festive-lawn-26', '{clean_prods[0]['image_url']}'),",
    f"  (2, 'Livin'' La Zaha', 'livin-la-zaha', '{clean_prods[1]['image_url']}'),",
    f"  (3, 'ZAHA Lawn ''26', 'zaha-lawn-26', '{clean_prods[2]['image_url']}'),",
    f"  (4, 'Amaya Printed Lawn', 'amaya-lawn', '{clean_prods[3]['image_url']}'),",
    f"  (5, 'New Arrivals', 'new-arrivals', '{clean_prods[4]['image_url']}'),",
    f"  (6, 'Best Sellers', 'best-sellers', '{clean_prods[5]['image_url']}');",
    "",
    "-- Insert ZAHA Products from zaha.pk",
    "INSERT INTO products",
    "  (id, name, slug, description, fabric, price, compare_at_price, gender, category_id, collection_id, image_url, image_url_alt, colors, sizes, rating, review_count, is_best_seller, is_new_arrival, stock)",
    "VALUES"
]

val_rows = []
for p in clean_prods:
    name_esc = p['name'].replace("'", "''")
    desc_esc = p['description'].replace("'", "''")
    comp_val = p['compare_at_price'] if p['compare_at_price'] else 'NULL'
    row = f"  ({p['id']}, '{name_esc}', '{p['slug']}', '{desc_esc}', '{p['fabric']}', {p['price']}, {comp_val}, '{p['gender']}', {p['category_id']}, {p['collection_id']}, '{p['image_url']}', '{p['image_url_alt']}', '{p['colors']}', '{p['sizes']}', {p['rating']}, {p['review_count']}, {p['is_best_seller']}, {p['is_new_arrival']}, 20)"
    val_rows.append(row)

sql_lines.append(",\n".join(val_rows) + ";")

with open('backend/seed.sql', 'w', encoding='utf-8') as f:
    f.write("\n".join(sql_lines))

print("Successfully generated frontend/src/data/products.js and backend/seed.sql with real zaha.pk products!")
