// Cart management utilities
import type { CartItem } from "./types"

const CART_STORAGE_KEY = "heritage_cart"

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return []
  try {
    const cart = localStorage.getItem(CART_STORAGE_KEY)
    return cart ? JSON.parse(cart) : []
  } catch {
    return []
  }
}

export function saveCart(cart: CartItem[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
}

export function addToCart(product: any, quantity = 1): CartItem[] {
  const cart = getCart()
  const existingItem = cart.find((item) => item.product.id === product.id)

  if (existingItem) {
    existingItem.quantity += quantity
  } else {
    cart.push({ product, quantity })
  }

  saveCart(cart)
  return cart
}

export function removeFromCart(productId: number): CartItem[] {
  const cart = getCart()
  const filtered = cart.filter((item) => item.product.id !== productId)
  saveCart(filtered)
  return filtered
}

export function updateCartQuantity(productId: number, quantity: number): CartItem[] {
  const cart = getCart()
  const item = cart.find((item) => item.product.id === productId)

  if (item) {
    if (quantity <= 0) {
      return removeFromCart(productId)
    }
    item.quantity = quantity
  }

  saveCart(cart)
  return cart
}

export function clearCart(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(CART_STORAGE_KEY)
}

export function getCartTotal(cart: CartItem[]): number {
  return cart.reduce((total, item) => total + item.product.price * item.quantity, 0)
}
