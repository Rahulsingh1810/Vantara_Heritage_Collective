import { cookies } from 'next/headers'
import { sql } from './db'

export async function getServerSessionUser() {
  const cookieStore = await cookies()

  // We stored Firebase UID directly in cookie
  const firebaseUid = cookieStore.get('session')?.value
  if (!firebaseUid) return null

  const users = await sql`
    SELECT id, email, name
    FROM users
    WHERE firebase_uid = ${firebaseUid}
    LIMIT 1
  `

  return users[0] || null
}
