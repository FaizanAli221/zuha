-- Clear existing data
DELETE FROM order_items;
DELETE FROM orders;
DELETE FROM cart_items;
DELETE FROM wishlist;
DELETE FROM products;
DELETE FROM categories;
DELETE FROM collections;

-- Insert ZAHA Categories
INSERT INTO categories (id, name, slug, image_url) VALUES
  (1, 'Unstitched Lawn', 'unstitched-lawn', 'https://placehold.co/400x400/6e2a2a/f6f2ea?text=Unstitched+Lawn'),
  (2, 'Ready to Wear', 'ready-to-wear', 'https://placehold.co/400x400/1c1b19/f6f2ea?text=Ready+To+Wear'),
  (3, 'Bridal & Formals', 'bridal-formals', 'https://placehold.co/400x400/b9975b/1c1b19?text=Bridal+%26+Formals'),
  (4, 'Co-Ord Sets', 'co-ord-sets', 'https://placehold.co/400x400/6b7156/f6f2ea?text=Co-Ord+Sets'),
  (5, 'Kurtas & Tops', 'kurtas-tops', 'https://placehold.co/400x400/2a2926/f6f2ea?text=Kurtas'),
  (6, 'Shawls & Dupattas', 'shawls-dupattas', 'https://placehold.co/400x400/7a3333/f6f2ea?text=Dupattas');

-- Insert ZAHA Collections
INSERT INTO collections (id, name, slug, image_url) VALUES
  (1, 'Festive Lawn ''26', 'festive-lawn-26', 'https://placehold.co/300x300/6e2a2a/f6f2ea?text=Festive+Lawn'),
  (2, 'Livin'' La Zaha', 'livin-la-zaha', 'https://placehold.co/300x300/1c1b19/f6f2ea?text=Livin+La+Zaha'),
  (3, 'ZAHA Lawn ''26', 'zaha-lawn-26', 'https://placehold.co/300x300/b9975b/1c1b19?text=ZAHA+Lawn'),
  (4, 'Amaya Printed Lawn', 'amaya-lawn', 'https://placehold.co/300x300/6b7156/f6f2ea?text=Amaya+Lawn'),
  (5, 'New Arrivals', 'new-arrivals', 'https://placehold.co/300x300/2a2926/f6f2ea?text=New+Arrivals'),
  (6, 'Best Sellers', 'best-sellers', 'https://placehold.co/300x300/7a3333/f6f2ea?text=Best+Sellers');

-- Insert ZAHA Products
INSERT INTO products
  (id, name, slug, description, fabric, price, compare_at_price, gender, category_id, collection_id, image_url, image_url_alt, colors, sizes, rating, review_count, is_best_seller, is_new_arrival, stock)
VALUES
  (1, 'Crimson Crush (ZRW-21287)', 'crimson-crush', 'Vibrant crimson lawn set with heavy schiffli neckline detailing, contrast organza borders, and digital printed lawn dupatta.', 'Lawn', 4725, 9450, 'women', 2, 6, 'https://placehold.co/600x800/6e2a2a/f6f2ea?text=Crimson+Crush', 'https://placehold.co/600x800/7a3333/f6f2ea?text=Crimson+Detail', 'Crimson Red, Gold', 'XS,S,M,L,XL', 4.9, 142, 1, 0, 20),
  (2, 'Sehyr Velvet Kurta Set', 'sehyr-velvet', 'Plum micro-velvet shirt with intricate marori work along cuffs and neckline, paired with silk trousers.', 'Micro Velvet', 6570, 10950, 'women', 2, 6, 'https://placehold.co/600x800/1c1b19/f6f2ea?text=Sehyr+Velvet', 'https://placehold.co/600x800/2a2926/f6f2ea?text=Sehyr+Detail', 'Plum, Antique Gold', 'S,M,L', 4.8, 98, 1, 0, 15),
  (3, 'Blue Poppy (ZF26-02)', 'blue-poppy', 'Royal blue 3-piece festive embroidered lawn outfit with silk tissue dupatta and cutwork trousers.', 'Embroidered Lawn', 11858, 13950, 'women', 1, 1, 'https://placehold.co/600x800/1b365d/f6f2ea?text=Blue+Poppy', 'https://placehold.co/600x800/2b466d/f6f2ea?text=Blue+Poppy+Detail', 'Royal Blue, Ivory', 'Unstitched', 4.9, 76, 1, 1, 25),
  (4, 'Sunny Side (Livin'' La Zaha)', 'sunny-side', 'Mustard yellow oversized shirt and straight trousers with contemporary pop floral prints.', 'Pure Cotton Crepe', 11600, NULL, 'women', 4, 2, 'https://placehold.co/600x800/b9975b/1c1b19?text=Sunny+Side', 'https://placehold.co/600x800/c4a870/1c1b19?text=Sunny+Side+Detail', 'Mustard, Coral', 'S,M,L', 4.7, 53, 0, 1, 18),
  (5, 'Aysel Festive Lawn', 'aysel-festive-lawn', 'Soft mint 3-piece embroidered lawn ensemble with jacquard dupatta and lace trims.', 'Lawn / Jacquard', 5245, 8500, 'women', 1, 1, 'https://placehold.co/600x800/6b7156/f6f2ea?text=Aysel+Festive', 'https://placehold.co/600x800/7c8265/f6f2ea?text=Aysel+Detail', 'Mint Green, Pearl', 'Unstitched', 4.8, 110, 1, 0, 30),
  (6, 'Bi Yun (碧韵 - ZL26-06)', 'bi-yun', 'Luxury printed silk chiffon shirt with delicate gota touch-ups and pure chiffon dupatta.', 'Silk Chiffon', 12450, NULL, 'women', 3, 5, 'https://placehold.co/600x800/2a2926/f6f2ea?text=Bi+Yun+Chiffon', 'https://placehold.co/600x800/3a3833/f6f2ea?text=Bi+Yun+Detail', 'Emerald Green, Gold', 'S,M,L,XL', 5.0, 34, 0, 1, 12),
  (7, 'Gossamer Silk Velvet Suit', 'gossamer-silk-velvet', 'Deep maroon hand-embellished velvet shirt with organza embroidered dupatta and raw silk trousers.', 'Velvet / Organza', 16500, 19500, 'women', 3, 6, 'https://placehold.co/600x800/5c1d24/f6f2ea?text=Gossamer+Velvet', 'https://placehold.co/600x800/6c2d34/f6f2ea?text=Gossamer+Detail', 'Maroon, Antique Gold', 'S,M,L', 4.9, 67, 1, 0, 14),
  (8, 'Zaha Rush Printed Set', 'zaha-rush-set', 'Relaxed 2-piece monochrome shirt and trousers set cut in lightweight summer lawn.', 'Lawn', 5850, NULL, 'women', 4, 5, 'https://placehold.co/600x800/222222/f6f2ea?text=Zaha+Rush+Set', 'https://placehold.co/600x800/333333/f6f2ea?text=Zaha+Rush+Detail', 'Monochrome Black', 'S,M,L,XL', 4.6, 42, 0, 1, 22),
  (9, 'Staples Lawn Shirt', 'staples-lawn-shirt', 'Straight-cut everyday kurti with delicate schiffli sleeves and minimal collar detail.', '100% Lawn', 3950, NULL, 'women', 5, 6, 'https://placehold.co/600x800/f6f2ea/1c1b19?text=Staples+Kurti', 'https://placehold.co/600x800/e8e2d4/1c1b19?text=Staples+Detail', 'Off White, Peach', 'XS,S,M,L,XL', 4.7, 85, 1, 0, 35),
  (10, 'Zaria Chikankari Lawn', 'zaria-chikankari', 'Allover white chikankari embroidered lawn shirt with organza schiffli borders.', 'Chikankari Lawn', 7200, 8500, 'women', 5, 5, 'https://placehold.co/600x800/e8e2d4/1c1b19?text=Zaria+Chikankari', 'https://placehold.co/600x800/d8d2c4/1c1b19?text=Zaria+Detail', 'Pristine White', 'S,M,L,XL', 4.8, 59, 0, 1, 20),
  (11, 'Miraya Organza Formal', 'miraya-organza-formal', 'Dusty pink organza shirt embellished with zardozi, pearls, and sequins paired with dupatta.', 'Organza', 18500, NULL, 'women', 3, 5, 'https://placehold.co/600x800/cbb3bf/1c1b19?text=Miraya+Organza', 'https://placehold.co/600x800/dbc3cf/1c1b19?text=Miraya+Detail', 'Dusty Pink', 'S,M,L', 5.0, 28, 0, 1, 10),
  (12, 'Nura Jacquard Sherwani Kurta', 'nura-jacquard-kurta', 'Men''s self-jacquard cotton kurta with hidden button placket and mandarin collar.', 'Cotton Jacquard', 6800, NULL, 'men', 5, 6, 'https://placehold.co/600x800/1c1b19/b9975b?text=Nura+Men+Kurta', 'https://placehold.co/600x800/2a2926/b9975b?text=Nura+Detail', 'Midnight Blue, Black', 'S,M,L,XL,XXL', 4.8, 40, 1, 0, 16);
