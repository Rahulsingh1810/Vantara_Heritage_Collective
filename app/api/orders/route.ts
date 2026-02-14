import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { getRazorpay } from '@/lib/razorpay'
import { getServerSessionUser } from '@/lib/auth-server'

export async function POST(req: Request) {
  try {
    const user = await getServerSessionUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { items, total_amount } = await req.json()

    if (!items?.length || !total_amount) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }

    // 1️⃣ Get customer profile
    const customers = await sql`
      SELECT * FROM customers WHERE user_id = ${user.id} LIMIT 1
    `
    const customer = customers[0]
    if (!customer) {
      return NextResponse.json({ error: 'Customer profile missing' }, { status: 400 })
    }

    const orderNumber = `ORD_${Date.now()}`

    // Razorpay expects amount in paise (1 INR = 100 paise)
    const amountInPaise = Math.round(total_amount * 100)

    // 2️⃣ Create order in DB
    const orders = await sql`
      INSERT INTO orders (
        customer_id,
        order_number,
        total_amount,
        address
      )
      VALUES (
        ${customer.id},
        ${orderNumber},
        ${amountInPaise},
        ${JSON.stringify({
          name: customer.name,
          phone: customer.phone,
          address_line1: customer.address_line1,
          address_line2: customer.address_line2,
          city: customer.city,
          state: customer.state,
          pincode: customer.pincode,
          country: customer.country
        })}
      )
      RETURNING id
    `
    const order = orders[0]

    // 3️⃣ Insert order items
    for (const item of items) {
      const unitPriceInPaise = Math.round(item.product.productPrice * 100)
      await sql`
        INSERT INTO order_items (
          order_id,
          product_id,
          product_name,
          product_url,
          quantity,
          unit_price
        )
        VALUES (
          ${order.id},
          ${String(item.product.id)},
          ${item.product.productTitle},
          ${item.product.productImage || ''},
          ${item.quantity},
          ${unitPriceInPaise}
        )
      `
    }

    // 4️⃣ Create Razorpay order with detailed notes for dashboard visibility
    // Razorpay allows max 15 keys, 256 chars per value
    const itemsSummary = items
      .map(
        (item: any, i: number) =>
          `${i + 1}. ${item.product.productTitle} x${item.quantity} @${item.product.productPrice}`
      )
      .join(' | ')

    const address = customer.address_line1
      ? [
          customer.address_line1,
          customer.address_line2,
          customer.city,
          customer.state,
          customer.pincode,
          customer.country
        ]
          .filter(Boolean)
          .join(', ')
      : 'N/A'

    const productSlugs = items.map((item: any) => item.product.slug || item.product.id).join(', ')

    const rpOrder = await getRazorpay().orders.create({
      amount: amountInPaise,
      currency: 'INR',
      receipt: orderNumber,
      notes: {
        order_id: order.id,
        order_number: orderNumber,
        customer_name: customer.name || 'N/A',
        customer_email: user.email || 'N/A',
        customer_phone: customer.phone || 'N/A',
        shipping_address: address.substring(0, 256),
        total_items: String(items.reduce((sum: number, i: any) => sum + i.quantity, 0)),
        items_summary: itemsSummary.substring(0, 256),
        product_slugs: productSlugs.substring(0, 256),
        amount_inr: `₹${(amountInPaise / 100).toFixed(2)}`
      }
    })

    // 5️⃣ Save Razorpay order ID on our order
    await sql`
      UPDATE orders
      SET razorpay_order_id = ${rpOrder.id}
      WHERE id = ${order.id}
    `

    return NextResponse.json({
      orderId: order.id,
      orderNumber,
      razorpayOrderId: rpOrder.id,
      amount: amountInPaise,
      currency: 'INR',
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      prefill: {
        name: customer.name,
        email: user.email,
        contact: customer.phone
      }
    })
  } catch (err) {
    console.error('Order creation failed:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
