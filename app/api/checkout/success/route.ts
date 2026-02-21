import crypto from 'crypto'
import { sql } from '@/lib/db'
import { type NextRequest, NextResponse } from 'next/server'
import { sendOrderConfirmationEmails } from '@/lib/order-emails'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: 'Missing payment details' }, { status: 400 })
    }

    // 1️⃣ Verify the Razorpay payment signature
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex')

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 })
    }

    // 2️⃣ Find the order + customer details
    const orders = await sql`
      SELECT o.*, c.name as customer_name, c.phone as customer_phone,
             u.email as customer_email
      FROM orders o
      LEFT JOIN customers c ON o.customer_id = c.id
      LEFT JOIN users u ON c.user_id = u.id
      WHERE o.razorpay_order_id = ${razorpay_order_id}
      LIMIT 1
    `

    if (orders.length === 0) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    const order = orders[0]

    // 3️⃣ Insert payment record (ignore if already exists from webhook)
    const existing = await sql`
      SELECT id FROM payments WHERE razorpay_payment_id = ${razorpay_payment_id}
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
          raw_response
        ) VALUES (
          ${order.id},
          ${razorpay_order_id},
          ${razorpay_payment_id},
          ${order.total_amount},
          'captured',
          'unknown',
          ${JSON.stringify(body)}
        )
      `
    }

    // 4️⃣ Only update status + send emails if not already paid (prevents race with webhook)
    if (order.payment_status !== 'paid') {
      await sql`
        UPDATE orders
        SET payment_status = 'paid',
            status = 'processing',
            updated_at = NOW()
        WHERE id = ${order.id}
      `

      // 5️⃣ Fetch order items for email
      const items = await sql`
        SELECT product_name, product_url, quantity, unit_price
        FROM order_items WHERE order_id = ${order.id}
      `

      // 6️⃣ Parse address
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

      // 7️⃣ Send confirmation emails (awaited so serverless doesn't exit early)
      await sendOrderConfirmationEmails({
        orderNumber: order.order_number,
        orderId: order.id,
        customerName: order.customer_name || 'Customer',
        customerEmail: order.customer_email || '',
        customerPhone: order.customer_phone || '',
        shippingAddress: addressStr,
        items: items as any[],
        totalAmount: Number(order.total_amount),
        paymentId: razorpay_payment_id
      })
    }

    return NextResponse.json({ success: true, orderId: order.id })
  } catch (error) {
    console.error('Success verification error:', error)
    return NextResponse.json({ error: 'Failed to verify payment' }, { status: 500 })
  }
}
