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
  (1, 'Unstitched Lawn', 'unstitched-lawn', 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&auto=format&fit=crop'),
  (2, 'Ready to Wear', 'ready-to-wear', 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500&auto=format&fit=crop'),
  (3, 'Bridal & Formals', 'bridal-formals', 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&auto=format&fit=crop'),
  (4, 'Co-Ord Sets', 'co-ord-sets', 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&auto=format&fit=crop'),
  (5, 'Kurtas & Tops', 'kurtas-tops', 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500&auto=format&fit=crop'),
  (6, 'Shawls & Dupattas', 'shawls-dupattas', 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=500&auto=format&fit=crop');

-- Insert ZAHA Collections
INSERT INTO collections (id, name, slug, image_url) VALUES
  (1, 'Festive Lawn ''26', 'festive-lawn-26', 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&auto=format&fit=crop'),
  (2, 'Livin'' La Zaha', 'livin-la-zaha', 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&auto=format&fit=crop'),
  (3, 'ZAHA Lawn ''26', 'zaha-lawn-26', 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=500&auto=format&fit=crop'),
  (4, 'Amaya Printed Lawn', 'amaya-lawn', 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&auto=format&fit=crop'),
  (5, 'New Arrivals', 'new-arrivals', 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500&auto=format&fit=crop'),
  (6, 'Best Sellers', 'best-sellers', 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&auto=format&fit=crop');

-- Insert ZAHA Products with High-Resolution Fashion Photography
INSERT INTO products
  (id, name, slug, description, fabric, price, compare_at_price, gender, category_id, collection_id, image_url, image_url_alt, colors, sizes, rating, review_count, is_best_seller, is_new_arrival, stock)
VALUES
  (1, 'Crimson Crush (ZRW-21287)', 'crimson-crush', 'Vibrant crimson lawn set with heavy schiffli neckline detailing, contrast organza borders, and digital printed lawn dupatta.', 'Lawn', 4725, 9450, 'women', 2, 6, 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop', 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&auto=format&fit=crop', 'Crimson Red, Gold', 'XS,S,M,L,XL', 4.9, 142, 1, 0, 20),
  (2, 'Sehyr Velvet Kurta Set', 'sehyr-velvet', 'Plum micro-velvet shirt with intricate marori work along cuffs and neckline, paired with silk trousers.', 'Micro Velvet', 6570, 10950, 'women', 2, 6, 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format&fit=crop', 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=800&auto=format&fit=crop', 'Plum, Antique Gold', 'S,M,L', 4.8, 98, 1, 0, 15),
  (3, 'Blue Poppy (ZF26-02)', 'blue-poppy', 'Royal blue 3-piece festive embroidered lawn outfit with silk tissue dupatta and cutwork trousers.', 'Embroidered Lawn', 11858, 13950, 'women', 1, 1, 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=800&auto=format&fit=crop', 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&auto=format&fit=crop', 'Royal Blue, Ivory', 'Unstitched', 4.9, 76, 1, 1, 25),
  (4, 'Sunny Side (Livin'' La Zaha)', 'sunny-side', 'Mustard yellow oversized shirt and straight trousers with contemporary pop floral prints.', 'Pure Cotton Crepe', 11600, NULL, 'women', 4, 2, 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop', 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop', 'Mustard, Coral', 'S,M,L', 4.7, 53, 0, 1, 18),
  (5, 'Aysel Festive Lawn', 'aysel-festive-lawn', 'Soft mint 3-piece embroidered lawn ensemble with jacquard dupatta and lace trims.', 'Lawn / Jacquard', 5245, 8500, 'women', 1, 1, 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&auto=format&fit=crop', 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop', 'Mint Green, Pearl', 'Unstitched', 4.8, 110, 1, 0, 30),
  (6, 'Bi Yun (碧韵 - ZL26-06)', 'bi-yun', 'Luxury printed silk chiffon shirt with delicate gota touch-ups and pure chiffon dupatta.', 'Silk Chiffon', 12450, NULL, 'women', 3, 5, 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&auto=format&fit=crop', 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&auto=format&fit=crop', 'Emerald Green, Gold', 'S,M,L,XL', 5.0, 34, 0, 1, 12),
  (7, 'Gossamer Silk Velvet Suit', 'gossamer-silk-velvet', 'Deep maroon hand-embellished velvet shirt with organza embroidered dupatta and raw silk trousers.', 'Velvet / Organza', 16500, 19500, 'women', 3, 6, 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=800&auto=format&fit=crop', 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format&fit=crop', 'Maroon, Antique Gold', 'S,M,L', 4.9, 67, 1, 0, 14),
  (8, 'Zaha Rush Printed Set', 'zaha-rush-set', 'Relaxed 2-piece monochrome shirt and trousers set cut in lightweight summer lawn.', 'Lawn', 5850, NULL, 'women', 4, 5, 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop', 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop', 'Monochrome Black', 'S,M,L,XL', 4.6, 42, 0, 1, 22),
  (9, 'Staples Lawn Shirt', 'staples-lawn-shirt', 'Straight-cut everyday kurti with delicate schiffli sleeves and minimal collar detail.', '100% Lawn', 3950, NULL, 'women', 5, 6, 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&auto=format&fit=crop', 'https://images.unsplash.com/photo-1551803091-e20673f15770?w=800&auto=format&fit=crop', 'Off White, Peach', 'XS,S,M,L,XL', 4.7, 85, 1, 0, 35),
  (10, 'Zaria Chikankari Lawn', 'zaria-chikankari', 'Allover white chikankari embroidered lawn shirt with organza schiffli borders.', 'Chikankari Lawn', 7200, 8500, 'women', 5, 5, 'https://images.unsplash.com/photo-1551803091-e20673f15770?w=800&auto=format&fit=crop', 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&auto=format&fit=crop', 'Pristine White', 'S,M,L,XL', 4.8, 59, 0, 1, 20),
  (11, 'Miraya Organza Formal', 'miraya-organza-formal', 'Dusty pink organza shirt embellished with zardozi, pearls, and sequins paired with dupatta.', 'Organza', 18500, NULL, 'women', 3, 5, 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&auto=format&fit=crop', 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&auto=format&fit=crop', 'Dusty Pink', 'S,M,L', 5.0, 28, 0, 1, 10),
  (12, 'Nura Jacquard Sherwani Kurta', 'nura-jacquard-kurta', 'Men''s self-jacquard cotton kurta with hidden button placket and mandarin collar.', 'Cotton Jacquard', 6800, NULL, 'men', 5, 6, 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&auto=format&fit=crop', 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop', 'Midnight Blue, Black', 'S,M,L,XL,XXL', 4.8, 40, 1, 0, 16);
