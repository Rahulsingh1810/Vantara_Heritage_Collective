'use client'

import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useCart } from '@/components/cart'

export default function CartIcon() {
  const { itemCount, isLoaded } = useCart()

  if (!isLoaded) {
    return <ShoppingCart className="h-6 w-6 text-[#F5EFE6]" />
  }

  return (
    <Link href="/cart" className="relative">
      <ShoppingCart className="h-6 w-6 text-[#F5EFE6] transition hover:opacity-80" />

      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#F5EFE6] text-xs font-semibold text-[#6f1c27]">
          {itemCount}
        </span>
      )}
    </Link>
  )
}
