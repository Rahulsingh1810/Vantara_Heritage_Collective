"use client"

import { ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/components/cart-provider"

export default function CartIcon() {
  const { itemCount, isLoaded } = useCart()

  if (!isLoaded) {
    return <ShoppingCart className="w-6 h-6 text-foreground" />
  }

  return (
    <Link href="/cart" className="relative">
      <ShoppingCart className="w-6 h-6 text-foreground hover:text-primary transition-colors" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
          {itemCount}
        </span>
      )}
    </Link>
  )
}
