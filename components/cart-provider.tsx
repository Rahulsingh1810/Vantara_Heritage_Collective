'use client'

import type React from 'react'
import { createContext, useContext, useState, useEffect } from 'react'
import type { CartItem } from '@/lib/types'
import { getCart, saveCart, getCartTotal } from '@/lib/cart'

interface CartContextType {
  cart: CartItem[]
  addToCart: (product: any, quantity: number) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  total: number
  itemCount: number
  isLoaded: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = getCart()
    // Transform savedCart to match CartItem structure if needed
    const transformedCart = savedCart.map((item: any) => 
      item.product ? item : { product: { id: item.slug }, quantity: item.quantity }
    )
    setCart(transformedCart)
    setIsLoaded(true)
  }, [])

  const handleAddToCart = (product: any, quantity: number) => {
    const newCart = [...cart]
    const existingItem = newCart.find(item => item.product.id === product.id)

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      newCart.push({ product, quantity })
    }

    setCart(newCart)
    saveCart(newCart.map(item => ({
      slug: item.product.slug,
      quantity: item.quantity
    })))
  }

  const handleRemoveFromCart = (productId: number) => {
    const newCart = cart.filter(item => item.product.id !== productId)
    setCart(newCart)
    saveCart(newCart.map(item => ({
      slug: item.product.slug,
      quantity: item.quantity
    })))
  }

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId)
      return
    }

    const newCart = cart.map(item => (item.product.id === productId ? { ...item, quantity } : item))

    setCart(newCart)
    saveCart(newCart.map(item => ({
      slug: item.product.slug,
      quantity: item.quantity
    })))
  }

  const handleClearCart = () => {
    setCart([])
    localStorage.removeItem('heritage_cart')
  }

  const total = getCartTotal(cart)
  const itemCount = cart.reduce((count, item) => count + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart: handleAddToCart,
        removeFromCart: handleRemoveFromCart,
        updateQuantity: handleUpdateQuantity,
        clearCart: handleClearCart,
        total,
        itemCount,
        isLoaded
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
