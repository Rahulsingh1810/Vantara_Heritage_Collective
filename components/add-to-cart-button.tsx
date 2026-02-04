'use client'

import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/components/cart-provider'
import { useState } from 'react'
import type { Product } from '@/type/page'

interface AddToCartButtonProps {
  product: Product
  disabled?: boolean
  className?: string
}

export default function AddToCartButton({ product, disabled = false, className }: AddToCartButtonProps) {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)

const handleAddToCart = () => {
  const normalizedProduct = {
    ...product,
    id: product.productId,   // ✅ map Contentful → cart format
  }

  addToCart(normalizedProduct, quantity)
  setQuantity(1)
}


  if (disabled) {
    return (
      <Button size="lg" disabled className={`w-full ${className ?? ''}`}>
        Out of Stock
      </Button>
    )
  }

  return (
    <div className={`flex gap-2 ${className ?? ''}`}>
      <div className="flex flex-1 items-center gap-2">
        <button
          onClick={() => setQuantity(q => Math.max(1, q - 1))}
          className="border-border hover:bg-muted rounded border px-3 py-2"
        >
          −
        </button>

        <span className="w-8 text-center font-medium">{quantity}</span>

        <button
          onClick={() => setQuantity(q => Math.min(product.productStock, q + 1))}
          className="border-border hover:bg-muted rounded border px-3 py-2"
        >
          +
        </button>
      </div>

      <Button onClick={handleAddToCart} size="lg" className="flex-1">
        <ShoppingCart className="mr-2 h-4 w-4" />
        Add to Cart
      </Button>
    </div>
  )
}
