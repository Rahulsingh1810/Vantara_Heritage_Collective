'use client'

import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useCart } from '@/components/cart-provider'

export default function CartIcon() {
  const { itemCount, isLoaded } = useCart()

  if (!isLoaded) {
    return <ShoppingCart className="text-foreground h-6 w-6" />
  }

  return (
    <Link href="/cart" className="relative">
      <ShoppingCart className="text-foreground hover:text-primary h-6 w-6 transition-colors" />
      {itemCount > 0 && (
        <span className="bg-primary text-primary-foreground absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full text-xs font-semibold">
          {itemCount}
        </span>
      )}
    </Link>
  )
}
