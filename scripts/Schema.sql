-- ============================
-- CUSTOMERS
-- ============================
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Identity
  email TEXT UNIQUE NOT NULL,

  -- Contact
  name TEXT,
  phone TEXT,

  -- Reusable address (last used)
  address_line1 TEXT,
  address_line2 TEXT,
  city TEXT,
  state TEXT,
  pincode TEXT,
  country TEXT DEFAULT 'India',

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================
-- ORDERS (IMMUTABLE SNAPSHOT)
-- ============================
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,

  -- Order identifiers
  order_number TEXT UNIQUE NOT NULL,
  razorpay_order_id TEXT UNIQUE,

  -- Product snapshot
  product_id TEXT NOT NULL,
  product_name TEXT NOT NULL,
  product_url TEXT NOT NULL,

  -- Payment
  amount INTEGER NOT NULL,          -- paise
  currency TEXT DEFAULT 'INR',
  status TEXT DEFAULT 'created',    -- created | paid | failed | refunded

  -- Delivery address snapshot
  address JSONB NOT NULL,

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================
-- PAYMENTS (WEBHOOK SOURCE)
-- ============================
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  razorpay_payment_id TEXT UNIQUE NOT NULL,
  razorpay_order_id TEXT NOT NULL,

  amount INTEGER NOT NULL,
  status TEXT NOT NULL,             -- captured | failed
  method TEXT,

  email TEXT,
  contact TEXT,

  raw_response JSONB NOT NULL,

  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================
-- INDEXES (IMPORTANT)
-- ============================

CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
CREATE INDEX idx_orders_razorpay_order_id ON orders(razorpay_order_id);
CREATE INDEX idx_payments_razorpay_payment_id ON payments(razorpay_payment_id);
