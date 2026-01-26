// Cart management utilities
import type { CartItem } from './types'


const CART_STORAGE_KEY = 'heritage_cart_slugs'
const CONTENTFUL_CREDENTIALS_KEY = 'contentful_credentials'


// Cart now stores array of { slug, quantity }
export function getCart(): { slug: string; quantity: number }[] {
  if (typeof window === 'undefined') return []
  try {
    const cart = localStorage.getItem(CART_STORAGE_KEY)
    return cart ? JSON.parse(cart) : []
  } catch {
    return []
  }
}

export function saveCart(cart: { slug: string; quantity: number }[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
}

// Add product slug and quantity to cart
export function addToCartSlug(slug: string, quantity = 1): { slug: string; quantity: number }[] {
  const cart = getCart()
  const existingItem = cart.find(item => item.slug === slug)
  if (existingItem) {
    existingItem.quantity += quantity
  } else {
    cart.push({ slug, quantity })
  }
  saveCart(cart)
  return cart
}

export function removeFromCartSlug(slug: string): { slug: string; quantity: number }[] {
  const cart = getCart()
  const filtered = cart.filter(item => item.slug !== slug)
  saveCart(filtered)
  return filtered
}

export function updateCartQuantitySlug(slug: string, quantity: number): { slug: string; quantity: number }[] {
  const cart = getCart()
  const item = cart.find(item => item.slug === slug)
  if (item) {
    if (quantity <= 0) {
      return removeFromCartSlug(slug)
    }
    item.quantity = quantity
  }
  saveCart(cart)
  return cart
}

export function clearCart(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(CART_STORAGE_KEY)
}

// Store Contentful credentials in localStorage
export function saveContentfulCredentials(credentials: any): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(CONTENTFUL_CREDENTIALS_KEY, JSON.stringify(credentials))
}

export function getContentfulCredentials(): any {
  if (typeof window === 'undefined') return null
  try {
    const creds = localStorage.getItem(CONTENTFUL_CREDENTIALS_KEY)
    return creds ? JSON.parse(creds) : null
  } catch {
    return null
  }
}

// Fetch product details from Contentful for all slugs in cart
import fetchProductBySlug from '@/utils/queries/slugpage'
export async function fetchCartProductsFromContentful() {
  const cart = getCart()
  const products = await Promise.all(
    cart.map(async item => {
      const product = await fetchProductBySlug(item.slug)
      return product ? { ...product, quantity: item.quantity } : null
    })
  )

  return products.filter(Boolean)
}
export function getCartTotal(cart: CartItem[]): number {
  return cart.reduce((total, item) => total + item.product.price * item.quantity, 0)
}
