import crypto from 'crypto'
import { sql } from '@/lib/db'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get('x-razorpay-signature')!

  const expected = crypto.createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET!).update(body).digest('hex')

  if (signature !== expected) {
    return new Response('Invalid signature', { status: 401 })
  }

  const event = JSON.parse(body)

  if (event.event === 'payment.captured') {
    const p = event.payload.payment.entity
    const existing = await sql`
      SELECT id FROM payments
      WHERE razorpay_payment_id = ${p.id}
    `

    if (existing.length === 0) {
      await sql`
        INSERT INTO payments (
          razorpay_payment_id,
          razorpay_order_id,
          amount,
          status,
          method,
          email,
          contact,
          raw_response
        ) VALUES (
          ${p.id},
          ${p.order_id},
          ${p.amount},
          ${p.status},
          ${p.method},
          ${p.email},
          ${p.contact},
          ${p}
        )
      `
      await sql`
        UPDATE orders
        SET status = 'paid'
        WHERE razorpay_order_id = ${p.order_id}
      `
    }
  }

  return new Response('OK')
}
