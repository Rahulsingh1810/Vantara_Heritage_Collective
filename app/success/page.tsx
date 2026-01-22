'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useCart } from '@/components/cart-provider'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import { ensureNumber } from '@/lib/utils'
import { motion } from 'framer-motion'
import ContactFormPopup from '@/components/contact-form-popup'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const { clearCart } = useCart()
  const orderId = searchParams.get('orderId')
  const [orderDetails, setOrderDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Clear the cart after successful purchase
    clearCart()

    // Fetch order details
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
    }
  }, [orderId, clearCart])

  return (
    <main>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="from-primary to-accent text-primary-foreground bg-gradient-to-r py-16 md:py-24"
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
          <h1 className="text-4xl font-bold text-balance md:text-5xl">Thank You for Your Order!</h1>
          <p className="mt-4 text-lg opacity-90">Your heritage artifacts are on their way</p>
        </div>
      </motion.div>

      {/* Success Content */}
      <section className="bg-background py-20">
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
              <CheckCircle className="text-primary mx-auto mb-6 h-24 w-24" />
            </motion.div>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Order Confirmed</h2>
            <p className="text-muted-foreground text-lg text-balance">
              Thank you for supporting traditional artisans and cultural heritage!
            </p>
          </motion.div>

          {/* Order Details */}
          {loading ? (
            <div className="py-12 text-center">Loading order details...</div>
          ) : orderDetails ? (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="border-primary/30 mb-8 border-2">
                <CardHeader className="bg-muted/50">
                  <CardTitle className="text-2xl">Order Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="border-border flex justify-between border-b py-3">
                    <span className="text-muted-foreground">Order Number</span>
                    <span className="text-lg font-bold"># {orderDetails.id}</span>
                  </div>
                  <div className="border-border flex justify-between border-b py-3">
                    <span className="text-muted-foreground">Order Date</span>
                    <span className="font-medium">{new Date(orderDetails.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="border-border flex justify-between border-b py-3">
                    <span className="text-muted-foreground">Customer Name</span>
                    <span className="font-medium">{orderDetails.customer_name}</span>
                  </div>
                  <div className="border-border flex justify-between border-b py-3">
                    <span className="text-muted-foreground">Email</span>
                    <span className="font-medium">{orderDetails.customer_email}</span>
                  </div>
                  <div className="bg-primary/5 flex justify-between rounded-lg px-4 py-3">
                    <span className="text-muted-foreground font-semibold">Total Amount</span>
                    <span className="text-primary text-3xl font-bold">
                      ${ensureNumber(orderDetails.total_amount).toFixed(2)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : null}

          {/* Next Steps */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="from-primary/5 to-accent/5 border-primary/20 mb-8 bg-gradient-to-r">
              <CardContent className="p-8">
                <h3 className="mb-6 text-xl font-bold text-balance">What Happens Next?</h3>
                <ul className="space-y-4">
                  <motion.li
                    whileHover={{ x: 10 }}
                    className="hover:bg-background/50 flex gap-4 rounded-lg p-4 transition-colors"
                  >
                    <span className="text-primary flex-shrink-0 text-2xl font-bold">1</span>
                    <span className="text-sm">We've sent a confirmation email with all order details</span>
                  </motion.li>
                  <motion.li
                    whileHover={{ x: 10 }}
                    className="hover:bg-background/50 flex gap-4 rounded-lg p-4 transition-colors"
                  >
                    <span className="text-primary flex-shrink-0 text-2xl font-bold">2</span>
                    <span className="text-sm">Your order is being carefully packed by our team</span>
                  </motion.li>
                  <motion.li
                    whileHover={{ x: 10 }}
                    className="hover:bg-background/50 flex gap-4 rounded-lg p-4 transition-colors"
                  >
                    <span className="text-primary flex-shrink-0 text-2xl font-bold">3</span>
                    <span className="text-sm">Tracking information will be sent as soon as it ships</span>
                  </motion.li>
                  <motion.li
                    whileHover={{ x: 10 }}
                    className="hover:bg-background/50 flex gap-4 rounded-lg p-4 transition-colors"
                  >
                    <span className="text-primary flex-shrink-0 text-2xl font-bold">4</span>
                    <span className="text-sm">Delivery typically within 7-14 business days domestically</span>
                  </motion.li>
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
            <Link href="/products" className="flex-1">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full">
                <Button size="lg" className="w-full">
                  Continue Shopping
                </Button>
              </motion.div>
            </Link>
            <Link href="/" className="flex-1">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full">
                <Button variant="outline" size="lg" className="w-full bg-transparent">
                  Back to Home
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      <ContactFormPopup />
    </main>
  )
}
