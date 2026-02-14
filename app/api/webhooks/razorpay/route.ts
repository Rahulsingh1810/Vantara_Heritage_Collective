import crypto from 'crypto'
import { sql } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const body = await req.text()
    const signature = req.headers.get('x-razorpay-signature')

    if (!signature) {
      return new Response('Missing signature', { status: 401 })
    }

    // 1️⃣ Verify webhook signature
    const expected = crypto
      .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(body)
      .digest('hex')

    if (signature !== expected) {
      return new Response('Invalid signature', { status: 401 })
    }

    const event = JSON.parse(body)

    // 2️⃣ Handle payment.captured — payment was successful
    if (event.event === 'payment.captured') {
      const p = event.payload.payment.entity

      // Find the order linked to this razorpay order
      const orders = await sql`
        SELECT id FROM orders
        WHERE razorpay_order_id = ${p.order_id}
        LIMIT 1
      `
      const orderId = orders[0]?.id || null

      // Insert payment record (idempotent — skip if already exists)
      const existing = await sql`
        SELECT id FROM payments
        WHERE razorpay_payment_id = ${p.id}
      `

      if (existing.length === 0) {
        await sql`
          INSERT INTO payments (
            order_id,
            razorpay_order_id,
            razorpay_payment_id,
            paid_amount,
            status,
            method,
            email,
            contact,
            raw_response
          ) VALUES (
            ${orderId},
            ${p.order_id},
            ${p.id},
            ${p.amount},
            ${p.status},
            ${p.method},
            ${p.email || null},
            ${p.contact || null},
            ${JSON.stringify(p)}
          )
        `
      }

      // Update order status to paid + processing
      if (orderId) {
        await sql`
          UPDATE orders
          SET payment_status = 'paid',
              status = 'processing',
              updated_at = NOW()
          WHERE id = ${orderId}
        `
      }
    }

    // 3️⃣ Handle payment.failed — payment failed or user abandoned
    if (event.event === 'payment.failed') {
      const p = event.payload.payment.entity

      const orders = await sql`
        SELECT id FROM orders
        WHERE razorpay_order_id = ${p.order_id}
        LIMIT 1
      `
      const orderId = orders[0]?.id || null

      // Record the failed payment attempt
      const existing = await sql`
        SELECT id FROM payments
        WHERE razorpay_payment_id = ${p.id}
      `

      if (existing.length === 0) {
        await sql`
          INSERT INTO payments (
            order_id,
            razorpay_order_id,
            razorpay_payment_id,
            paid_amount,
            status,
            method,
            email,
            contact,
            raw_response
          ) VALUES (
            ${orderId},
            ${p.order_id},
            ${p.id},
            ${p.amount},
            'failed',
            ${p.method || 'unknown'},
            ${p.email || null},
            ${p.contact || null},
            ${JSON.stringify(p)}
          )
        `
      }

      // Update order payment_status to failed
      if (orderId) {
        await sql`
          UPDATE orders
          SET payment_status = 'failed',
              updated_at = NOW()
          WHERE id = ${orderId}
        `
      }
    }

    return new Response('OK', { status: 200 })
  } catch (error) {
    console.error('Webhook processing error:', error)
    return new Response('Webhook error', { status: 500 })
  }
}
