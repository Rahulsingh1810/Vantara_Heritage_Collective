import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { razorpay } from '@/lib/razorpay'

export async function POST(req: Request) {
  const { email, name, phone, address, product, amount } = await req.json()

  if (!email || !product?.id || !amount) {
    return new NextResponse('Invalid payload', { status: 400 })
  }

  // 1️⃣ Upsert customer
  const [customer] = (await sql`
    INSERT INTO customers (
      email, name, phone,
      address_line1, address_line2,
      city, state, pincode
    )
    VALUES (
      ${email}, ${name}, ${phone},
      ${address.line1}, ${address.line2},
      ${address.city}, ${address.state}, ${address.pincode}
    )
    ON CONFLICT (email)
    DO UPDATE SET
      name = EXCLUDED.name,
      phone = EXCLUDED.phone,
      address_line1 = EXCLUDED.address_line1,
      address_line2 = EXCLUDED.address_line2,
      city = EXCLUDED.city,
      state = EXCLUDED.state,
      pincode = EXCLUDED.pincode
    RETURNING id
  `) as { id: string }[]

  // 2️⃣ Create internal order
  const orderNumber = `ORD_${Date.now()}`

  const [order] = (await sql`
    INSERT INTO orders (
      customer_id,
      order_number,
      product_id,
      product_name,
      product_url,
      amount,
      address
    )
    VALUES (
      ${customer.id},
      ${orderNumber},
      ${product.id},
      ${product.name},
      ${product.url},
      ${amount},
      ${address}
    )
    RETURNING id
  `) as { id: string }[]

  // 3️⃣ Create Razorpay order
  const rpOrder = await razorpay.orders.create({
    amount,
    currency: 'INR',
    receipt: orderNumber
  })

  // 4️⃣ Save Razorpay order id
  await sql`
    UPDATE orders
    SET razorpay_order_id = ${rpOrder.id}
    WHERE id = ${order.id}
  `

  return NextResponse.json({
    razorpayOrderId: rpOrder.id,
    amount
  })
}
