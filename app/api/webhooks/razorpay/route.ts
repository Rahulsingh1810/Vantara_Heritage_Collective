import crypto from 'crypto'
import { sql } from '@/lib/db'
import { sendOrderConfirmationEmails } from '@/lib/order-emails'

export async function POST(req: Request) {
  try {
    const body = await req.text()
    const signature = req.headers.get('x-razorpay-signature')

    if (!signature) {
      return new Response('Missing signature', { status: 401 })
    }

    // 1️⃣ Verify webhook signature
    const expected = crypto.createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET!).update(body).digest('hex')

    if (signature !== expected) {
      return new Response('Invalid signature', { status: 401 })
    }

    const event = JSON.parse(body)

    // 2️⃣ Handle payment.captured — payment was successful
    if (event.event === 'payment.captured') {
      const p = event.payload.payment.entity

      // Find the order + customer details
      const orders = await sql`
        SELECT o.*, c.name as customer_name, c.phone as customer_phone,
               u.email as customer_email
        FROM orders o
        LEFT JOIN customers c ON o.customer_id = c.id
        LEFT JOIN users u ON c.user_id = u.id
        WHERE o.razorpay_order_id = ${p.order_id}
        LIMIT 1
      `
      const order = orders[0]
      const orderId = order?.id || null

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

      // Update order status to paid + processing, and send emails
      // Only send emails if order was NOT already paid (avoid duplicate emails)
      if (orderId && order.payment_status !== 'paid') {
        await sql`
          UPDATE orders
          SET payment_status = 'paid',
              status = 'processing',
              updated_at = NOW()
          WHERE id = ${orderId}
        `

        // Fetch order items for email
        const items = await sql`
          SELECT product_name, product_url, quantity, unit_price
          FROM order_items WHERE order_id = ${orderId}
        `

        // Parse address
        let addressStr = 'N/A'
        try {
          const addr = typeof order.address === 'string' ? JSON.parse(order.address) : order.address
          addressStr = [
            addr.name,
            addr.address_line1,
            addr.address_line2,
            addr.city,
            addr.state,
            addr.pincode,
            addr.country
          ]
            .filter(Boolean)
            .join(', ')
        } catch {}

        // Send confirmation emails (awaited so serverless doesn't exit early)
        await sendOrderConfirmationEmails({
          orderNumber: order.order_number,
          orderId: orderId,
          customerName: order.customer_name || p.email || 'Customer',
          customerEmail: order.customer_email || p.email || '',
          customerPhone: order.customer_phone || p.contact || '',
          shippingAddress: addressStr,
          items: items as any[],
          totalAmount: Number(order.total_amount),
          paymentId: p.id,
          paymentMethod: p.method
        })
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
