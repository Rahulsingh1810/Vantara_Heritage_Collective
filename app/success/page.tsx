'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useCart } from '@/components/cart'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { CheckCircle, Package, Truck, MapPin, Mail } from 'lucide-react'
import { ensureNumber } from '@/lib/utils'
import { motion } from 'framer-motion'
import ContactFormPopup from '@/components/contact-form-popup'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const { clearCart } = useCart()
  const orderId = searchParams.get('orderId')
  const [orderDetails, setOrderDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Clear cart once on mount — clearCart is intentionally excluded from deps
  // because it is not memoized and would cause an infinite re-render loop
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    clearCart()
  }, [])

  useEffect(() => {
    if (orderId) {
      fetch(`/api/orders/${orderId}`)
        .then(res => res.json())
        .then(data => {
          setOrderDetails(data)
          setLoading(false)
        })
        .catch(error => {
          console.error('Error fetching order:', error)
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [orderId])

  return (
    <main>
      {/* Hero Banner — wine-red theme */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-(--color-wine-red) py-16 text-(--color-ivory) md:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <div className="text-8xl">🎉</div>
          </motion.div>
          <h1 className="text-4xl font-bold tracking-wide text-balance md:text-5xl">Thank You for Your Order!</h1>
          <p className="mt-4 text-lg opacity-80">Your heritage artifacts are on their way</p>
        </div>
      </motion.div>

      {/* Success Content */}
      <section className="bg-(--color-ivory) py-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          {/* Success Icon */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12 text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="inline-block"
            >
              <CheckCircle className="mx-auto mb-6 h-24 w-24 text-(--color-wine-red)" />
            </motion.div>
            <h2 className="mb-4 text-3xl font-bold text-(--color-wine-red) md:text-4xl">Order Confirmed</h2>
            <p className="text-lg text-balance text-(--color-wine-red)/70">
              Thank you for supporting traditional artisans and cultural heritage!
            </p>
          </motion.div>

          {/* Order Details */}
          {loading ? (
            <div className="py-12 text-center text-(--color-wine-red)">Loading order details...</div>
          ) : orderDetails ? (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="mb-8 border-2 border-(--color-wine-red)/30 bg-white shadow-xl">
                <CardHeader className="bg-(--color-wine-red)/5">
                  <CardTitle className="text-2xl text-(--color-wine-red)">Order Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="flex justify-between border-b border-(--color-wine-red)/15 py-3">
                    <span className="text-(--color-wine-red)/60">Order Number</span>
                    <span className="text-lg font-bold text-(--color-wine-red)">
                      {orderDetails.order_number || `#${orderDetails.id}`}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-(--color-wine-red)/15 py-3">
                    <span className="text-(--color-wine-red)/60">Order Date</span>
                    <span className="font-medium text-(--color-wine-red)">
                      {new Date(orderDetails.created_at).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        timeZone: 'Asia/Kolkata'
                      })}
                    </span>
                  </div>
                  {orderDetails.customer_name && (
                    <div className="flex justify-between border-b border-(--color-wine-red)/15 py-3">
                      <span className="text-(--color-wine-red)/60">Customer</span>
                      <span className="font-medium text-(--color-wine-red)">{orderDetails.customer_name}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-b border-(--color-wine-red)/15 py-3">
                    <span className="text-(--color-wine-red)/60">Payment Status</span>
                    <span className="rounded-full bg-(--color-wine-red)/10 px-3 py-1 text-sm font-semibold text-(--color-wine-red) capitalize">
                      {orderDetails.payment_status || 'paid'}
                    </span>
                  </div>
                  <div className="flex justify-between rounded-lg bg-(--color-wine-red)/5 px-4 py-4">
                    <span className="font-semibold text-(--color-wine-red)/70">Total Amount</span>
                    <span className="text-3xl font-bold text-(--color-wine-red)">
                      ₹{ensureNumber(orderDetails.total_amount).toFixed(2)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : null}

          {/* What Happens Next */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="mb-8 border border-(--color-wine-red)/20 bg-white shadow-lg">
              <CardContent className="p-8">
                <h3 className="mb-6 text-xl font-bold text-balance text-(--color-wine-red)">What Happens Next?</h3>
                <ul className="space-y-4">
                  {[
                    {
                      icon: Mail,
                      text: "We've sent a confirmation email with all order details"
                    },
                    {
                      icon: Package,
                      text: 'Your order is being carefully packed by our team'
                    },
                    {
                      icon: Truck,
                      text: 'Tracking information will be sent as soon as it ships'
                    },
                    {
                      icon: MapPin,
                      text: 'Delivery typically within 7-14 business days domestically'
                    }
                  ].map((step, i) => (
                    <motion.li
                      key={i}
                      whileHover={{ x: 10 }}
                      className="flex gap-4 rounded-lg p-4 transition-colors hover:bg-(--color-wine-red)/5"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-(--color-wine-red)/10">
                        <step.icon className="h-5 w-5 text-(--color-wine-red)" />
                      </span>
                      <span className="self-center text-sm text-(--color-wine-red)">{step.text}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
              <Button
                asChild
                size="lg"
                className="w-full bg-(--color-wine-red) text-(--color-ivory) hover:bg-(--color-wine-red)/90"
              >
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full border-(--color-wine-red) bg-transparent text-(--color-wine-red)"
              >
                <Link href="/">Back to Home</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* <ContactFormPopup /> */}
    </main>
  )
}
