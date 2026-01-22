import { sql } from '@/lib/db'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    let orders
    if (email) {
      orders = await sql`SELECT * FROM orders WHERE customer_email = ${email} ORDER BY created_at DESC`
    } else {
      orders = await sql`SELECT * FROM orders ORDER BY created_at DESC`
    }
    return NextResponse.json(orders)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { customer_email, customer_name, customer_address, customer_phone, total_amount, stripe_payment_id } = body

    const result = await sql`
      INSERT INTO orders (customer_email, customer_name, customer_address, customer_phone, total_amount, stripe_payment_id)
      VALUES (${customer_email}, ${customer_name}, ${customer_address}, ${customer_phone}, ${total_amount}, ${stripe_payment_id})
      RETURNING *
    `

    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}
