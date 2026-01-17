"use client"

import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Trash2, ArrowLeft } from "lucide-react"
import { ensureNumber } from "@/lib/utils"

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, total, clearCart } = useCart()

  if (cart.length === 0) {
    return (
      <main>
        <div className="bg-primary text-primary-foreground py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold">Shopping Cart</h1>
          </div>
        </div>

        <section className="py-20 bg-background">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-lg text-muted-foreground mb-8">Your cart is empty</p>
            <Link href="/products">
              <Button size="lg">
                <ArrowLeft className="w-4 h-4 mr-2" />
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Shopping Cart</h1>
          <p className="mt-2 opacity-90">{cart.length} items in your cart</p>
        </div>
      </div>

      {/* Cart Content */}
      <section className="py-12 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <Card key={item.product.id}>
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      {/* Product Image */}
                      <div className="relative w-24 h-24 flex-shrink-0 bg-muted rounded">
                        <Image
                          src={item.product.image_url || "/placeholder.svg?height=96&width=96&query=artifact"}
                          alt={item.product.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1">
                        <Link href={`/products/${item.product.id}`}>
                          <h3 className="font-semibold text-lg hover:text-primary transition-colors mb-2">
                            {item.product.name}
                          </h3>
                        </Link>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{item.product.description}</p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 border border-border rounded-lg p-1">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="px-2 py-1 hover:bg-muted rounded"
                            >
                              −
                            </button>
                            <span className="px-3 font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="px-2 py-1 hover:bg-muted rounded"
                              disabled={item.quantity >= item.product.stock_quantity}
                            >
                              +
                            </button>
                          </div>

                          <Button variant="destructive" size="sm" onClick={() => removeFromCart(item.product.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-right flex flex-col justify-between">
                        <div className="text-sm text-muted-foreground">
                          ${ensureNumber(item.product.price).toFixed(2)} each
                        </div>
                        <div className="text-2xl font-bold text-primary">
                          ${(ensureNumber(item.product.price) * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <div className="text-center pt-4">
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
                  <div className="flex justify-between pb-4 border-b border-border">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${total.toFixed(2)}</span>
                  </div>

                  {/* Shipping */}
                  <div className="flex justify-between pb-4 border-b border-border">
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
                    <Button size="lg" className="w-full mt-6">
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
                  <div className="text-center text-xs text-muted-foreground mt-6 pt-6 border-t border-border">
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
