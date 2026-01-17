"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { useState } from "react"
import type { Product } from "@/lib/types"

interface AddToCartButtonProps {
  product: Product
  disabled?: boolean
}

export default function AddToCartButton({ product, disabled = false }: AddToCartButtonProps) {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [showInput, setShowInput] = useState(false)

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setQuantity(1)
    setShowInput(false)
  }

  if (disabled) {
    return (
      <Button size="lg" disabled className="w-full">
        Out of Stock
      </Button>
    )
  }

  return (
    <div className="flex gap-2">
      {showInput && (
        <div className="flex items-center gap-2 flex-1">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3 py-2 border border-border rounded hover:bg-muted"
          >
            −
          </button>
          <span className="text-center flex-1 font-medium">{quantity}</span>
          <button
            onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
            className="px-3 py-2 border border-border rounded hover:bg-muted"
          >
            +
          </button>
        </div>
      )}
      <Button onClick={handleAddToCart} size="lg" className="flex-1">
        <ShoppingCart className="w-4 h-4 mr-2" />
        Add to Cart
      </Button>
    </div>
  )
}
