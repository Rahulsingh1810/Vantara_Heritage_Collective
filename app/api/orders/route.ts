// import { NextResponse } from 'next/server'
// import { sql } from '@/lib/db'
// import { razorpay } from '@/lib/razorpay'
// import { getServerSessionUser } from '@/lib/auth-server'

// export async function POST(req: Request) {
//   try {
//     const user = await getServerSessionUser()
//     if (!user) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//     }

//     const { items, total_amount } = await req.json()

//     if (!items?.length || !total_amount) {
//       return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
//     }

//     // 1️⃣ Get customer profile
//     const customers = await sql`
//       SELECT * FROM customers WHERE user_id = ${user.id} LIMIT 1
//     `
//     const customer = customers[0]
//     if (!customer) {
//       return NextResponse.json({ error: 'Customer profile missing' }, { status: 400 })
//     }

//     const orderNumber = `ORD_${Date.now()}`

//     // 2️⃣ Create order
//     const orders = await sql`
//       INSERT INTO orders (
//         customer_id,
//         order_number,
//         total_amount,
//         address
//       )
//       VALUES (
//         ${customer.id},
//         ${orderNumber},
//         ${total_amount},
//         ${JSON.stringify(customer)}
//       )
//       RETURNING id
//     `
//     const order = orders[0]

//     // 3️⃣ Insert order items
//     for (const item of items) {
//       await sql`
//         INSERT INTO order_items (
//           order_id,
//           product_id,
//           product_name,
//           product_url,
//           quantity,
//           unit_price
//         )
//         VALUES (
//           ${order.id},
//           ${item.product.id},
//           ${item.product.productTitle},
//           ${item.product.productImage},
//           ${item.quantity},
//           ${item.product.productPrice}
//         )
//       `
//     }

//     // 4️⃣ Create Razorpay order
//     const rpOrder = await razorpay.orders.create({
//       amount: total_amount,
//       currency: 'INR',
//       receipt: orderNumber,
//       notes: {
//         order_id: order.id,
//         customer_name: customer.name,
//         phone: customer.phone
//       }
//     })

//     // 5️⃣ Save Razorpay ID
//     await sql`
//       UPDATE orders
//       SET razorpay_order_id = ${rpOrder.id}
//       WHERE id = ${order.id}
//     `

//     return NextResponse.json({
//       orderId: order.id,
//       razorpayOrderId: rpOrder.id,
//       amount: total_amount
//     })

//   } catch (err) {
//     console.error('Order creation failed:', err)
//     return NextResponse.json({ error: 'Server error' }, { status: 500 })
//   }
// }
