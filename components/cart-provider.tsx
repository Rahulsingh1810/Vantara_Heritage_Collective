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
  async function loadCart() {
    const savedCart = getCart() // [{ slug, quantity }]

    if (!savedCart.length) {
      setIsLoaded(true)
      return
    }

    try {
      const slugs = savedCart.map((item: any) => item.slug)
      const products = await getProductsBySlugs(slugs)

      const hydratedCart = savedCart.map((item: any) => {
        const product = products.find((p: any) => p.slug === item.slug)

        if (!product) return null

        return {
            product: {
              id: product.productId,
              slug: product.slug,
              productTitle: product.productTitle,
              productPrice: product.productPrice,
              productStock: product.productStock,
              image:
                product.productImagesCollection?.items?.[0]?.url
                  ? product.productImagesCollection.items[0].url
                  : '/traditional-indian-artifact.jpg',
            },
          quantity: item.quantity
        }
      }).filter(Boolean)

      setCart(hydratedCart)
    } catch (err) {
      console.error('Failed to hydrate cart:', err)
      setCart([])
    } finally {
      setIsLoaded(true)
    }
  }

  loadCart()
}, [])


 const handleAddToCart = (product: any, quantity: number) => {
  setCart(prevCart => {
    const existingItem = prevCart.find(item => item.product.id === product.id)

    let updatedCart

    if (existingItem) {
      updatedCart = prevCart.map(item =>
        item.product.id === product.id
          ? {
              ...item,
              quantity: Math.min(item.quantity + quantity, product.productStock ?? 99)
            }
          : item
      )
    } else {
      updatedCart = [...prevCart, { product, quantity }]
    }

    saveCart(
      updatedCart.map(item => ({
        slug: item.product.slug,
        quantity: item.quantity
      }))
    )

    return updatedCart
  })
}


  const handleRemoveFromCart = (productId: number) => {
    const newCart = cart.filter(item => item.product.id !== productId)
    setCart(newCart)
    saveCart(
      newCart.map(item => ({
        slug: item.product.slug,
        quantity: item.quantity
      }))
    )
  }

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId)
      return
    }

    const newCart = cart.map(item => (item.product.id === productId ? { ...item, quantity } : item))

    setCart(newCart)
    saveCart(
      newCart.map(item => ({
        slug: item.product.slug,
        quantity: item.quantity
      }))
    )
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
