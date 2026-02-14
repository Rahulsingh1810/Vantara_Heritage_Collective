import crypto from 'crypto'
import { sql } from '@/lib/db'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: 'Missing payment details' },
        { status: 400 }
      )
    }

    // 1️⃣ Verify the Razorpay payment signature
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex')

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 400 }
      )
    }

    // 2️⃣ Find the order by razorpay_order_id
    const orders = await sql`
      SELECT id, total_amount FROM orders
      WHERE razorpay_order_id = ${razorpay_order_id}
      LIMIT 1
    `

    if (orders.length === 0) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    const order = orders[0]

    // 3️⃣ Update order status
    await sql`
      UPDATE orders
      SET payment_status = 'paid',
          status = 'processing',
          updated_at = NOW()
      WHERE id = ${order.id}
    `

    // 4️⃣ Insert payment record (ignore if already exists from webhook)
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

    return NextResponse.json({ success: true, orderId: order.id })
  } catch (error) {
    console.error('Success verification error:', error)
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    )
  }
}
