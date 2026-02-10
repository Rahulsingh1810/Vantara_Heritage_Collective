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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold">Shopping Cart</h1>
          <p className="mt-2 opacity-90">{cart.length} items in your cart</p>
        </div>
      </div>

      {/* Content */}
      <section className="bg-background py-12 sm:py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:gap-10 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="space-y-6 lg:col-span-2">
              {cart.map(item => (
                <Card
                  key={item.product.id}
                  className="border border-(--color-wine-red)/15 bg-(--color-ivory) shadow-md"
                >
                  <CardContent className="p-5 sm:p-6 md:p-8">
                    <div className="flex flex-row items-start gap-4 sm:gap-6">
                      {/* Image */}
                      <div className="relative h-24 w-24 sm:h-28 sm:w-28 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                        <Image
                          src={item.product.productImage || '/placeholder.svg'}
                          alt={item.product.productTitle}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Middle - product info & controls */}
                      <div className="flex min-w-0 flex-1 flex-col">
                        <Link href={`/products/${item.product.slug}`}>
                          <h3 className="mb-2 text-base sm:text-lg font-semibold text-(--color-wine-red) hover:underline line-clamp-2">
                            {item.product.productTitle}
                          </h3>
                        </Link>

                        {/* Quantity + Remove */}
                        <div className="mt-3 sm:mt-4 flex items-center gap-3 sm:gap-4">
                          <div className="flex items-center rounded-lg border border-(--color-wine-red)/30 bg-white px-1.5 sm:px-2">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="px-2.5 py-1 text-base sm:text-lg font-semibold text-(--color-wine-red) hover:bg-(--color-wine-red)/10"
                            >
                              −
                            </button>
                            <span className="px-3 sm:px-4 font-semibold text-(--color-wine-red)">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              disabled={item.quantity >= (item.product.productStock ?? 0)}
                              className="px-2.5 py-1 text-base sm:text-lg font-semibold text-(--color-wine-red) hover:bg-(--color-wine-red)/10 disabled:opacity-40"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="rounded-lg border border-(--color-wine-red)/30 p-2 text-(--color-wine-red) hover:bg-(--color-wine-red)/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Price - fixed min-width + no wrap */}
                      <div className="flex flex-col justify-between items-end min-w-[110px] sm:min-w-[130px] md:min-w-[150px] text-right">
                        <span className="text-xs sm:text-sm text-(--color-wine-red)/60 whitespace-nowrap">
                          ₹{item.product.productPrice.toFixed(2)} each
                        </span>
                        <span className="text-lg sm:text-xl md:text-2xl font-bold text-(--color-wine-red) whitespace-nowrap">
                          ₹{(item.product.productPrice * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <div className="pt-6 text-center">
                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="border-(--color-wine-red)/30 text-(--color-wine-red) hover:bg-(--color-wine-red)/10"
                >
                  Clear Cart
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:sticky lg:top-6 h-fit">
              <Card className="border border-(--color-wine-red)/20 bg-(--color-ivory) shadow-xl">
                <CardHeader className="pb-2 sm:pb-4">
                  <CardTitle className="text-(--color-wine-red)">Order Summary</CardTitle>
                </CardHeader>

                <CardContent className="px-5 py-6 sm:p-8 space-y-5 sm:space-y-6">
                  <div className="flex justify-between border-b border-(--color-wine-red)/15 pb-4">
                    <span className="text-(--color-wine-red)/70">Subtotal</span>
                    <span className="font-medium text-(--color-wine-red)">₹{total.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between border-b border-(--color-wine-red)/15 pb-4">
                    <span className="text-(--color-wine-red)/70">Shipping</span>
                    <span className="text-sm text-(--color-wine-red)/70">Calculated at checkout</span>
                  </div>

                  <div className="flex justify-between text-lg sm:text-xl font-bold">
                    <span className="text-(--color-wine-red)">Total</span>
                    <span className="text-(--color-wine-red)">₹{total.toFixed(2)}</span>
                  </div>

                  <Link href="/checkout">
                    <Button
                      size="lg"
                      className="mt-4 w-full bg-(--color-wine-red) text-(--color-ivory) hover:bg-(--color-wine-red)/90"
                    >
                      Proceed to Checkout
                    </Button>
                  </Link>

                  <Link href="/products">
                    <Button
                      variant="outline"
                      className="w-full border-(--color-wine-red)/30 text-(--color-wine-red) hover:bg-(--color-wine-red)/10"
                    >
                      Continue Shopping
                    </Button>
                  </Link>

                  <div className="mt-6 border-t border-(--color-wine-red)/15 pt-6 text-center text-xs text-(--color-wine-red)/70">
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