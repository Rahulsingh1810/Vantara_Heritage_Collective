import { NextResponse } from 'next/server'
import { getServerSessionUser } from '@/lib/auth-server'
import { sql } from '@/lib/db'

export async function GET() {
  const user = await getServerSessionUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const customers = await sql`
    SELECT *
    FROM customers
    WHERE user_id = ${user.id}
    LIMIT 1
  `

  return NextResponse.json(customers[0] || {})
}
