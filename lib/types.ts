export interface Vendor {
  id: number
  name: string
  description: string
  image_url: string
  created_at: string
  updated_at: string
}

export interface Category {
  id: number
  name: string
  description: string
  created_at: string
}

export interface Product {
  id: number
  name: string
  description: string
  price: number
  category_id: number
  vendor_id: number
  image_url: string
  image_urls: string[]
  stock_quantity: number
  featured: boolean
  created_at: string
  updated_at: string
}

export interface Order {
  id: number
  customer_email: string
  customer_name: string
  customer_address: string
  customer_phone: string
  total_amount: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  stripe_payment_id: string
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: number
  order_id: number
  product_id: number
  quantity: number
  price: number
  created_at: string
}

export interface CartItem {
  product: Product
  quantity: number
}
