'use client'

import type React from 'react'
import { useState, type FormEvent } from 'react'
import { useCart } from '@/components/cart-provider'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import { ensureNumber } from '@/lib/utils'

export default function CheckoutPage() {
  const { cart, total, clearCart } = useCart()
  const [isLoading, setIsLoading] = useState(false)
  const [orderCreated, setOrderCreated] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: ''
  })

  if (cart.length === 0) {
    return (
      <main>
        <div className="bg-primary text-primary-foreground py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold">Checkout</h1>
          </div>
        </div>
        <section className="bg-background py-20">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <p className="text-muted-foreground mb-8 text-lg">Your cart is empty. Add items before checking out.</p>
            <Link href="/products">
              <Button size="lg">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Products
              </Button>
            </Link>
          </div>
        </section>
      </main>
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Create order in database
      const orderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_email: formData.email,
          customer_name: formData.name,
          customer_address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}`,
          customer_phone: formData.phone,
          total_amount: total
        })
      })

      if (!orderResponse.ok) {
        throw new Error('Failed to create order')
      }

      const order = await orderResponse.json()

      // Initialize Stripe and create payment session
      setOrderCreated(true)
      clearCart()

      // Redirect to success page after a delay
      setTimeout(() => {
        window.location.href = `/success?orderId=${order.id}`
      }, 1500)
    } catch (error) {
      console.error('Checkout error:', error)
      setIsLoading(false)
    }
  }

  // Order confirmation message
  if (orderCreated) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-6xl">✓</div>
          <p className="text-xl font-semibold">Order Confirmed!</p>
          <p className="text-muted-foreground mt-2">Redirecting...</p>
        </div>
      </div>
    )
  }

  return (
    <main>
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Checkout</h1>
        </div>
      </div>

      {/* Checkout Content */}
      <section className="bg-background py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email */}
                    <div>
                      <label className="mb-2 block text-sm font-medium">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border-border focus:ring-primary w-full rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none"
                        required
                      />
                    </div>

                    {/* Full Name */}
                    <div>
                      <label className="mb-2 block text-sm font-medium">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="border-border focus:ring-primary w-full rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none"
                        required
                      />
                    </div>

                    {/* Address */}
                    <div>
                      <label className="mb-2 block text-sm font-medium">Street Address</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="border-border focus:ring-primary w-full rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none"
                        required
                      />
                    </div>

                    {/* City, State, Zip */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <div>
                        <label className="mb-2 block text-sm font-medium">City</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className="border-border focus:ring-primary w-full rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium">State</label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          className="border-border focus:ring-primary w-full rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium">ZIP Code</label>
                        <input
                          type="text"
                          name="zip"
                          value={formData.zip}
                          onChange={handleChange}
                          className="border-border focus:ring-primary w-full rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none"
                          required
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="mb-2 block text-sm font-medium">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="border-border focus:ring-primary w-full rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none"
                        required
                      />
                    </div>

                    {/* Checkout Button */}
                    <div className="flex gap-4 pt-6">
                      <Button type="submit" size="lg" className="flex-1" disabled={isLoading}>
                        {isLoading ? 'Processing...' : 'Complete Order'}
                      </Button>
                      <Link href="/cart" className="flex-1">
                        <Button type="button" variant="outline" size="lg" className="w-full bg-transparent">
                          Back to Cart
                        </Button>
                      </Link>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Items */}
                  <div className="border-border max-h-96 space-y-3 overflow-y-auto border-b pb-4">
                    {cart.map(item => (
                      <div key={item.product.id} className="flex gap-3">
                        <div className="bg-muted relative h-12 w-12 flex-shrink-0 rounded">
                          <Image
                            src={item.product.image_url || '/placeholder.svg?height=48&width=48&query=artifact'}
                            alt={item.product.name}
                            fill
                            className="rounded object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="line-clamp-1 text-sm font-medium">{item.product.name}</p>
                          <p className="text-muted-foreground text-xs">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-right text-sm font-medium">
                          ${(ensureNumber(item.product.price) * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${ensureNumber(total).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>Calculated</span>
                    </div>
                    <div className="border-border flex justify-between border-t pt-2 text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">${ensureNumber(total).toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Security Info */}
                  <div className="text-muted-foreground border-border border-t pt-4 text-center text-xs">
                    <p className="mb-2">✓ Secure Order Processing</p>
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
