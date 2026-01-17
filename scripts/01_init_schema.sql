-- Create vendors table
CREATE TABLE IF NOT EXISTS vendors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  vendor_id INTEGER NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  image_url VARCHAR(500),
  image_urls TEXT[], -- JSON array stored as text for multiple images
  stock_quantity INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  customer_email VARCHAR(255) NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_address TEXT NOT NULL,
  customer_phone VARCHAR(20),
  total_amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending', -- pending, processing, shipped, delivered, cancelled
  stripe_payment_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_vendor ON products(vendor_id);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);

-- Insert sample vendors
INSERT INTO vendors (name, description, image_url) VALUES
('Artisan Ceramics', 'Hand-crafted ceramic pottery from local artisans', 'https://images.unsplash.com/photo-1565193566173-7cda482f2ad9?w=400'),
('Heritage Textiles', 'Traditional woven fabrics and tapestries', 'https://images.unsplash.com/photo-1603122347063-1db11c22b3b7?w=400'),
('Wood Masters', 'Fine wooden sculptures and functional art', 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=400'),
('Metal Artisans', 'Wrought iron and brass decorative pieces', 'https://images.unsplash.com/photo-1578951389326-a8167ba28de0?w=400'),
('Stone Sculptors', 'Traditional stone carvings and sculptures', 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=400')
ON CONFLICT (name) DO NOTHING;

-- Insert sample categories
INSERT INTO categories (name, description) VALUES
('Pottery & Ceramics', 'Traditional ceramic artifacts and decorative pieces'),
('Textiles & Rugs', 'Hand-woven fabrics, tapestries, and traditional rugs'),
('Sculptures', 'Stone and wood sculptural artworks'),
('Metalware', 'Decorative and functional metal artifacts'),
('Jewelry', 'Traditional and heritage jewelry pieces'),
('Home Décor', 'Decorative items for home and spaces')
ON CONFLICT (name) DO NOTHING;

-- Insert sample products
INSERT INTO products (name, description, price, category_id, vendor_id, image_url, stock_quantity, featured) VALUES
('Handmade Ceramic Vase', 'Beautiful blue ceramic vase with traditional patterns', 89.99, 1, 1, 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=400', 15, TRUE),
('Woven Wall Tapestry', 'Traditional hand-woven tapestry with intricate designs', 199.99, 2, 2, 'https://images.unsplash.com/photo-1603122347063-1db11c22b3b7?w=400', 8, TRUE),
('Stone Buddha Sculpture', 'Hand-carved stone Buddha statue for meditation spaces', 349.99, 3, 5, 'https://images.unsplash.com/photo-1578951389326-a8167ba28de0?w=400', 5, TRUE),
('Brass Decorative Mirror', 'Antique-style brass framed mirror', 159.99, 4, 4, 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=400', 12, FALSE),
('Traditional Kilim Rug', 'Authentic hand-woven kilim rug from heritage artisans', 449.99, 2, 2, 'https://images.unsplash.com/photo-1603122347063-1db11c22b3b7?w=400', 4, TRUE),
('Wooden Box with Inlay', 'Hand-carved wooden jewelry box with intricate inlay work', 129.99, 3, 3, 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=400', 10, FALSE);
