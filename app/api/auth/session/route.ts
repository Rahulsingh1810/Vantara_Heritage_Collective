import { NextResponse } from 'next/server'
import { adminAuth } from '@/lib/firebase-admin'

export async function POST(req: Request) {
  const { idToken } = await req.json()

  try {
    const decoded = await adminAuth.verifyIdToken(idToken)

    const response = NextResponse.json({ success: true })

    response.cookies.set('session', decoded.uid, {
      httpOnly: true,
      secure: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    })

    return response
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}
