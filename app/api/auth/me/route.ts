import { sql } from '@/lib/db'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const userId = request.cookies.get('userId')?.value

    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const users = await sql`
      SELECT
        u.id,
        u.email,
        u.name,
        c.phone,
        c.address_line1,
        c.address_line2,
        c.city,
        c.state,
        c.pincode,
        c.country
      FROM users u
      LEFT JOIN customers c ON c.user_id = u.id
      WHERE u.id = ${userId}
    `

    if (users.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({ user: users[0] })
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 })
  }
}
