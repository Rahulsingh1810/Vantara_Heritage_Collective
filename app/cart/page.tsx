'use client'

import { useCart } from '@/components/cart-provider'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { Trash2, ArrowLeft } from 'lucide-react'
import { ensureNumber } from '@/lib/utils'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, total, clearCart } = useCart()

  if (cart.length === 0) {
    return (
      <main>
        <div className="bg-primary text-primary-foreground py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold">Shopping Cart</h1>
          </div>
        </div>

        <section className="bg-background py-20">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <p className="text-muted-foreground mb-8 text-lg">Your cart is empty</p>
            <Link href="/products">
              <Button size="lg">
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
      <div className="bg-primary text-primary-foreground py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Shopping Cart</h1>
          <p className="mt-2 opacity-90">{cart.length} items in your cart</p>
        </div>
      </div>

      {/* Cart Content */}
      <section className="bg-background py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="space-y-4 lg:col-span-2">
              {cart.map(item => (
                <Card key={item.product.id}>
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      {/* Product Image */}
                      <div className="bg-muted relative h-24 w-24 flex-shrink-0 rounded">
                        <Image
                          src={item.product.image_url || '/placeholder.svg?height=96&width=96&query=artifact'}
                          alt={item.product.name}
                          fill
                          className="rounded object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1">
                        <Link href={`/products/${item.product.id}`}>
                          <h3 className="hover:text-primary mb-2 text-lg font-semibold transition-colors">
                            {item.product.name}
                          </h3>
                        </Link>
                        <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">{item.product.description}</p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-4">
                          <div className="border-border flex items-center gap-2 rounded-lg border p-1">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="hover:bg-muted rounded px-2 py-1"
                            >
                              −
                            </button>
                            <span className="px-3 font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="hover:bg-muted rounded px-2 py-1"
                              disabled={item.quantity >= item.product.stock_quantity}
                            >
                              +
                            </button>
                          </div>

                          <Button variant="destructive" size="sm" onClick={() => removeFromCart(item.product.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="flex flex-col justify-between text-right">
                        <div className="text-muted-foreground text-sm">
                          ${ensureNumber(item.product.price).toFixed(2)} each
                        </div>
                        <div className="text-primary text-2xl font-bold">
                          ${(ensureNumber(item.product.price) * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <div className="pt-4 text-center">
                <Button variant="outline" onClick={clearCart} className="bg-transparent">
                  Clear Cart
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Subtotal */}
                  <div className="border-border flex justify-between border-b pb-4">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${total.toFixed(2)}</span>
                  </div>

                  {/* Shipping */}
                  <div className="border-border flex justify-between border-b pb-4">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">Calculated at checkout</span>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">${ensureNumber(total).toFixed(2)}</span>
                  </div>

                  {/* Checkout Button */}
                  <Link href="/checkout">
                    <Button size="lg" className="mt-6 w-full">
                      Proceed to Checkout
                    </Button>
                  </Link>

                  {/* Continue Shopping */}
                  <Link href="/products">
                    <Button variant="outline" className="w-full bg-transparent">
                      Continue Shopping
                    </Button>
                  </Link>

                  {/* Secure Badge */}
                  <div className="text-muted-foreground border-border mt-6 border-t pt-6 text-center text-xs">
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
