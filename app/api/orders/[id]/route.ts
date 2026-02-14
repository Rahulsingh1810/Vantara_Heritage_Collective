import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const orders = await sql`
      SELECT
        o.*,
        c.name as customer_name,
        c.phone as customer_phone
      FROM orders o
      LEFT JOIN customers c ON o.customer_id = c.id
      WHERE o.id = ${id}
      LIMIT 1
    `

    if (orders.length === 0) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    const order = orders[0]

    // Fetch order items
    const items = await sql`
      SELECT * FROM order_items
      WHERE order_id = ${id}
      ORDER BY created_at ASC
    `

    // Convert amount from paise back to rupees for display
    const totalInRupees = Number(order.total_amount) / 100

    return NextResponse.json({
      ...order,
      total_amount: totalInRupees,
      items,
    })
  } catch (error) {
    console.error('Error fetching order:', error)
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    )
  }
}
