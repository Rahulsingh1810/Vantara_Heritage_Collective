import { NextResponse } from 'next/server'
import { getServerSessionUser } from '@/lib/auth-server'
import { sql } from '@/lib/db'

export async function POST(req: Request) {
  const user = await getServerSessionUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const data = await req.json()

  await sql`
    INSERT INTO customers (
      user_id, name, phone, address_line1, address_line2, city, state, pincode, country
    )
    VALUES (
      ${user.id}, ${data.name}, ${data.phone}, ${data.address_line1},
      ${data.address_line2}, ${data.city}, ${data.state}, ${data.pincode},
      ${data.country || 'India'}
    )
    ON CONFLICT (user_id)
    DO UPDATE SET
      name = EXCLUDED.name,
      phone = EXCLUDED.phone,
      address_line1 = EXCLUDED.address_line1,
      address_line2 = EXCLUDED.address_line2,
      city = EXCLUDED.city,
      state = EXCLUDED.state,
      pincode = EXCLUDED.pincode,
      country = EXCLUDED.country,
      updated_at = NOW()
  `

  return NextResponse.json({ success: true })
}
