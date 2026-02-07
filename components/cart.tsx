'use client'

import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'

/* -------------------------------- TYPES -------------------------------- */

export interface CartProduct {
  id: number
  slug: string
  productTitle: string
  productPrice: number
  productStock: number
  productImage: string
}

export interface CartItem {
  product: CartProduct
  quantity: number
}

/* ------------------------------ STORAGE -------------------------------- */

const CART_KEY = 'heritage_cart'

function getCart(): CartItem[] {
  if (typeof window === 'undefined') return []

  try {
    const data = localStorage.getItem(CART_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

function saveCart(cart: CartItem[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(CART_KEY, JSON.stringify(cart))
}

function getCartTotal(cart: CartItem[]) {
  return cart.reduce((sum, item) => sum + item.product.productPrice * item.quantity, 0)
}

/* ------------------------------ CONTEXT -------------------------------- */

interface CartContextType {
  cart: CartItem[]
  addToCart: (product: CartProduct, quantity: number) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  total: number
  itemCount: number
  isLoaded: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

/* ------------------------------ PROVIDER -------------------------------- */

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load cart from localStorage
  useEffect(() => {
    const saved = getCart()
    if (saved?.length) setCart(saved)
    setIsLoaded(true)
  }, [])

  const addToCart = (product: CartProduct, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id)

      let updated: CartItem[]

      if (existing) {
        updated = prev.map(i =>
          i.product.id === product.id
            ? {
                ...i,
                quantity: Math.min(i.quantity + quantity, product.productStock)
              }
            : i
        )
      } else {
        updated = [...prev, { product, quantity }]
      }

      saveCart(updated)
      return updated
    })
  }

  const removeFromCart = (productId: number) => {
    const updated = cart.filter(i => i.product.id !== productId)
    setCart(updated)
    saveCart(updated)
  }

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) return removeFromCart(productId)

    const updated = cart.map(i => (i.product.id === productId ? { ...i, quantity } : i))

    setCart(updated)
    saveCart(updated)
  }

  const clearCart = () => {
    setCart([])
    localStorage.removeItem(CART_KEY)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total: getCartTotal(cart),
        itemCount: cart.reduce((c, i) => c + i.quantity, 0),
        isLoaded
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

/* ------------------------------ HOOK -------------------------------- */

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}

/* -------------------------- ADD TO CART BUTTON ------------------------- */

export function AddToCartButton({ product, disabled = false }: { product: any; disabled?: boolean }) {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)

  const handleAdd = () => {
    const normalized: CartProduct = {
      id: product.productId,
      slug: product.slug,
      productTitle: product.productTitle,
      productPrice: product.productPrice,
      productStock: product.productStock,
      productImage: product.productImagesCollection?.items?.[0]?.url || '/traditional-indian-artifact.jpg'
    }

    addToCart(normalized, quantity)
    setQuantity(1)
  }

  if (disabled) {
    return (
      <Button size="lg" disabled className="w-full">
        Out of Stock
      </Button>
    )
  }

  return (
    <div className="flex gap-3">
      <div className="flex items-center gap-2">
        <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="rounded border px-3 py-2">
          −
        </button>

        <span className="w-8 text-center">{quantity}</span>

        <button
          onClick={() => setQuantity(q => Math.min(product.productStock, q + 1))}
          className="rounded border px-3 py-2"
        >
          +
        </button>
      </div>

      <Button onClick={handleAdd} size="lg" className="flex-1">
        <ShoppingCart className="mr-2 h-4 w-4" />
        Add to Cart
      </Button>
    </div>
  )
}
