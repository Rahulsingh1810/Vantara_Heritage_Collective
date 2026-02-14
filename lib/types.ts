export interface IVendor {
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

export type Media = {
  sys: {
    id: string
  }
  url: string
  title?: string
  description?: string
  height?: number
  width?: number
  contentType: string
}

export interface Product {
  productId: number | string
  productTitle: string
  productDescription: string
  slug: string
  productCulturalSignificance?: string
  productCategory: string
  productCare?: string
  vendor?: IVendor
  productPrice: number
  productStock: number
  productWeight?: number
  productDimensions?: string
  productOrigin?: string
  productMaterial?: string
  productImagesCollection?: Media[]
  placementsAndStylingNotes?: string
  inYourSpace?: string
}

export interface Order {
  id: string
  customer_id: string
  order_number: string
  razorpay_order_id: string | null
  total_amount: number
  currency: string
  status: 'created' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  payment_status: 'pending' | 'paid' | 'failed'
  address: Record<string, string>
  tracking_number: string | null
  courier_name: string | null
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

export interface CartProduct {
  id: number
  slug: string
  productTitle: string
  productPrice: number
  productImagesCollection?: any
  productStock: number
  productImage: string | null
}

export interface CartItem {
  product: CartProduct
  quantity: number
}
