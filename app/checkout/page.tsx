'use client'

import type React from 'react'
import { useState, type FormEvent } from 'react'
import { useCart } from '@/components/cart'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
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

  const inputClass =
    'w-full rounded-lg border border-(--color-wine-red)/25 bg-(--color-ivory) px-4 py-2 text-(--color-wine-red) placeholder:text-(--color-wine-red)/50 focus:border-(--color-wine-red) focus:ring-2 focus:ring-(--color-wine-red)/40 focus:outline-none'

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

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

    const order = await orderResponse.json()

    setOrderCreated(true)
    clearCart()

    setTimeout(() => {
      window.location.href = `/success?orderId=${order.id}`
    }, 1200)
  }

  if (orderCreated) {
    return (
      <div className="flex min-h-screen items-center justify-center text-(--color-wine-red)">✓ Order Confirmed</div>
    )
  }

  return (
    <main>
      {/* Header */}
      <div className="bg-(--color-wine-red) py-14 text-(--color-ivory)">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-4xl font-bold tracking-wide">Checkout</h1>
        </div>
      </div>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-3">
            {/* FORM */}
            <div className="lg:col-span-2">
              <Card className="border border-(--color-wine-red)/20 bg-(--color-ivory) shadow-xl">
                <CardHeader>
                  <CardTitle className="text-(--color-wine-red)">Shipping Information</CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {(['email', 'name', 'address'] as const).map(field => (
                      <div key={field}>
                        <label className="mb-2 block text-sm font-medium text-(--color-wine-red) capitalize">
                          {field}
                        </label>
                        <input
                          name={field}
                          value={formData[field]}
                          onChange={handleChange}
                          className={inputClass}
                          required
                        />
                      </div>
                    ))}

                    <div className="grid gap-4 md:grid-cols-3">
                      {(['city', 'state', 'zip'] as const).map(field => (
                        <div key={field}>
                          <label className="mb-2 block text-sm font-medium text-(--color-wine-red) capitalize">
                            {field}
                          </label>
                          <input
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            className={inputClass}
                            required
                          />
                        </div>
                      ))}
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-(--color-wine-red)">Phone</label>
                      <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={inputClass}
                        required
                      />
                    </div>

                    <div className="flex gap-4 pt-6">
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isLoading}
                        className="flex-1 bg-(--color-wine-red) text-(--color-ivory) hover:bg-(--color-wine-red)/90"
                      >
                        Complete Order
                      </Button>

                      <Link href="/cart" className="flex-1">
                        <Button
                          size="lg"
                          variant="outline"
                          className="w-full border-(--color-wine-red) text-(--color-wine-red)"
                        >
                          Back to Cart
                        </Button>
                      </Link>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* ORDER SUMMARY */}
            <Card className="sticky top-24 overflow-hidden border border-(--color-wine-red)/20 bg-(--color-ivory) shadow-xl">
              <div className="border-b border-(--color-wine-red)/15 bg-(--color-wine-red)/5 px-6 py-4">
                <h3 className="font-semibold tracking-wide text-(--color-wine-red)">Order Summary</h3>
              </div>

              <CardContent className="space-y-6 p-6">
                {cart.map(item => (
                  <div
                    key={item.product.id}
                    className="flex items-center gap-4 rounded-lg border border-(--color-wine-red)/10 bg-white/40 p-3"
                  >
                    <div className="relative h-14 w-14 overflow-hidden rounded">
                      <Image src={item.product.productImage} alt="" fill className="object-cover" />
                    </div>

                    <div className="flex-1 text-(--color-wine-red)">
                      <p className="text-sm font-medium">{item.product.productTitle}</p>
                      <p className="text-xs opacity-70">Qty {item.quantity}</p>
                    </div>

                    <span className="text-sm text-(--color-wine-red)">
                      ₹{(item.product.productPrice * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}

                <div className="space-y-3 border-t border-(--color-wine-red)/20 pt-4 text-(--color-wine-red)">
                  <div className="flex justify-between text-sm opacity-80">
                    <span>Subtotal</span>
                    <span>₹{ensureNumber(total).toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>₹{ensureNumber(total).toFixed(2)}</span>
                  </div>
                </div>

                <div className="rounded-lg bg-(--color-wine-red)/5 py-3 text-center text-xs text-(--color-wine-red)">
                  ✓ Secure checkout
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
}
