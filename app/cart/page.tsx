'use client'

import { useCart } from '@/components/cart'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { Trash2, ArrowLeft } from 'lucide-react'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, total, clearCart, isLoaded } = useCart()

  if (!isLoaded) {
    return <div className="py-20 text-center text-(--color-wine-red)">Loading cart…</div>
  }

  if (cart.length === 0) {
    return (
      <main>
        <div className="w-full bg-(--color-wine-red) py-12">
          <div className="mx-auto max-w-7xl px-4 text-(--color-ivory)">
            <h1 className="text-4xl font-bold">Shopping Cart</h1>
          </div>
        </div>

        <section className="bg-background py-20">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <p className="mb-8 text-lg text-(--color-wine-red)/70">Your cart is empty</p>

            <Link href="/products">
              <Button size="lg" className="bg-(--color-wine-red) text-(--color-ivory) hover:bg-(--color-wine-red)/90">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main>
      {/* Header */}
      <div className="bg-(--color-wine-red) py-12 text-(--color-ivory)">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-4xl font-bold">Shopping Cart</h1>
          <p className="mt-2 opacity-90">{cart.length} items in your cart</p>
        </div>
      </div>

      {/* Content */}
      <section className="bg-background py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            {/* Items */}
            <div className="space-y-6 lg:col-span-2">
              {cart.map(item => (
                <Card
                  key={item.product.id}
                  className="border border-[var(--color-wine-red)]/15 bg-[var(--color-ivory)] shadow-md"
                >
                  <CardContent className="p-8">
                    <div className="flex gap-6">
                      {/* Image */}
                      <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                        <Image
                          src={item.product.productImage || '/placeholder.svg'}
                          alt={item.product.productTitle}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1">
                        <Link href={`/products/${item.product.slug}`}>
                          <h3 className="mb-2 text-lg font-semibold text-[var(--color-wine-red)] hover:underline">
                            {item.product.productTitle}
                          </h3>
                        </Link>

                        {/* Quantity Controls */}
                        <div className="mt-4 flex items-center gap-4">
                          <div className="flex items-center rounded-lg border border-[var(--color-wine-red)]/30 bg-white px-2">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="px-3 py-1 text-lg font-semibold text-[var(--color-wine-red)] hover:bg-[var(--color-wine-red)]/10"
                            >
                              −
                            </button>

                            <span className="px-3 font-semibold text-[var(--color-wine-red)]">{item.quantity}</span>

                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              disabled={item.quantity >= (item.product.productStock ?? 0)}
                              className="px-3 py-1 text-lg font-semibold text-[var(--color-wine-red)] hover:bg-[var(--color-wine-red)]/10 disabled:opacity-40"
                            >
                              +
                            </button>
                          </div>

                          {/* Remove */}
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="rounded-lg border border-[var(--color-wine-red)]/30 p-2 text-[var(--color-wine-red)] hover:bg-[var(--color-wine-red)]/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="flex flex-col justify-between text-right">
                        <span className="text-sm text-[var(--color-wine-red)]/60">
                          ₹{item.product.productPrice.toFixed(2)} each
                        </span>

                        <span className="text-2xl font-bold text-[var(--color-wine-red)]">
                          ₹{(item.product.productPrice * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <div className="pt-4 text-center">
                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="border-[var(--color-wine-red)]/30 text-[var(--color-wine-red)]"
                >
                  Clear Cart
                </Button>
              </div>
            </div>

            {/* Summary */}
            <div>
              <Card className="sticky top-24 border border-[var(--color-wine-red)]/20 bg-[var(--color-ivory)] shadow-xl">
                <CardHeader>
                  <CardTitle className="text-[var(--color-wine-red)]">Order Summary</CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="flex justify-between border-b border-[var(--color-wine-red)]/15 pb-4">
                    <span className="text-[var(--color-wine-red)]/70">Subtotal</span>
                    <span className="font-medium text-[var(--color-wine-red)]">₹{total.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between border-b border-[var(--color-wine-red)]/15 pb-4">
                    <span className="text-[var(--color-wine-red)]/70">Shipping</span>
                    <span className="text-sm text-[var(--color-wine-red)]/70">Calculated at checkout</span>
                  </div>

                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-[var(--color-wine-red)]">Total</span>
                    <span className="text-[var(--color-wine-red)]">₹{total.toFixed(2)}</span>
                  </div>

                  <Link href="/checkout">
                    <Button
                      size="lg"
                      className="mt-4 w-full bg-[var(--color-wine-red)] text-[var(--color-ivory)] hover:bg-[var(--color-wine-red)]/90"
                    >
                      Proceed to Checkout
                    </Button>
                  </Link>

                  <Link href="/products">
                    <Button
                      variant="outline"
                      className="w-full border-[var(--color-wine-red)]/30 text-[var(--color-wine-red)]"
                    >
                      Continue Shopping
                    </Button>
                  </Link>

                  <div className="mt-6 border-t border-[var(--color-wine-red)]/15 pt-6 text-center text-xs text-[var(--color-wine-red)]/70">
                    <p className="mb-2">✓ Secure Checkout</p>
                    <p>Your order information is safe and secure</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
