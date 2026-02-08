import { NextResponse } from 'next/server'
import { getServerSessionUser } from '@/lib/auth-server'
import { sql } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const user = await getServerSessionUser()

    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const rows = await sql`
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
      WHERE u.id = ${user.id}
    `

    return NextResponse.json({ user: rows[0] })
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 })
  }
}
