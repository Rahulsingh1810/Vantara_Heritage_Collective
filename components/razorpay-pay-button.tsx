'use client'

import { useState, useCallback, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

declare global {
  interface Window {
    Razorpay: any
  }
}

interface RazorpayPayButtonProps {
  /** Cart items to send to the orders API */
  items: Array<{
    product: {
      id: number | string
      slug?: string
      productTitle: string
      productPrice: number
      productImage: string | null
    }
    quantity: number
  }>
  /** Total amount in INR (rupees, not paise) */
  totalAmount: number
  /** Called after successful payment verification with the orderId */
  onSuccess: (orderId: string) => void
  /** Called when payment fails or is dismissed */
  onFailure?: (reason: string) => void
  /** Optional async callback that runs BEFORE payment (e.g. save customer profile). Return false to abort. */
  onBeforePayment?: () => Promise<boolean>
  /** Whether the button should be disabled */
  disabled?: boolean
  /** Custom class name for the button */
  className?: string
  /** Custom button text */
  children?: React.ReactNode
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise(resolve => {
    if (typeof window !== 'undefined' && window.Razorpay) {
      resolve(true)
      return
    }
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export default function RazorpayPayButton({
  items,
  totalAmount,
  onSuccess,
  onFailure,
  onBeforePayment,
  disabled = false,
  className = '',
  children
}: RazorpayPayButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [scriptLoaded, setScriptLoaded] = useState(false)

  // Pre-load the Razorpay script on mount
  useEffect(() => {
    loadRazorpayScript().then(setScriptLoaded)
  }, [])

  const handlePayment = useCallback(async () => {
    if (!scriptLoaded) {
      const loaded = await loadRazorpayScript()
      if (!loaded) {
        toast.error('Failed to load payment gateway. Please refresh and try again.')
        onFailure?.('script_load_failed')
        return
      }
    }

    setIsProcessing(true)

    try {
      // Run pre-payment callback (e.g. save customer profile)
      if (onBeforePayment) {
        const shouldContinue = await onBeforePayment()
        if (!shouldContinue) {
          setIsProcessing(false)
          return
        }
      }

      // 1. Create order + Razorpay order on server
      const orderRes = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          total_amount: totalAmount
        })
      })

      if (!orderRes.ok) {
        const err = await orderRes.json()
        toast.error(err.error || 'Failed to create order')
        onFailure?.('order_creation_failed')
        setIsProcessing(false)
        return
      }

      const orderData = await orderRes.json()

      // 2. Open Razorpay checkout modal
      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Vadānya Heritage Collective',
        description: 'Purchase of Heritage Artifacts',
        order_id: orderData.razorpayOrderId,
        prefill: orderData.prefill,
        theme: { color: '#722F37' },
        handler: async (response: {
          razorpay_order_id: string
          razorpay_payment_id: string
          razorpay_signature: string
        }) => {
          // 3. Verify payment signature on server
          try {
            const verifyRes = await fetch('/api/checkout/success', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              })
            })

            const result = await verifyRes.json()

            if (result.success) {
              toast.success('Payment successful!')
              onSuccess(result.orderId)
            } else {
              toast.error('Payment verification failed. Please contact support.')
              onFailure?.('verification_failed')
            }
          } catch {
            toast.error('Could not verify payment. If money was deducted, it will be reconciled automatically.')
            onFailure?.('verification_error')
          } finally {
            setIsProcessing(false)
          }
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false)
            toast.info('Payment cancelled. If you already completed the payment, it will be updated automatically.')
            onFailure?.('dismissed')
          }
        }
      }

      const rzp = new window.Razorpay(options)

      rzp.on('payment.failed', (resp: { error: { description: string } }) => {
        setIsProcessing(false)
        toast.error(`Payment failed: ${resp.error.description}`)
        onFailure?.('payment_failed')
      })

      rzp.open()
    } catch (error) {
      console.error('Payment error:', error)
      toast.error('Something went wrong. Please try again.')
      onFailure?.('unknown_error')
      setIsProcessing(false)
    }
  }, [items, totalAmount, onSuccess, onFailure, onBeforePayment, scriptLoaded])

  return (
    <Button type="button" size="lg" disabled={disabled || isProcessing} onClick={handlePayment} className={className}>
      {isProcessing ? 'Processing...' : children || '\uD83D\uDD12 Pay Now'}
    </Button>
  )
}
