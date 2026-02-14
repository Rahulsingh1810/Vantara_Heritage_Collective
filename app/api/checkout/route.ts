import { type NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  // This route is no longer used — orders are created via /api/orders
  // and payments are handled via Razorpay modal + /api/checkout/success
  return NextResponse.json({
    success: false,
    message: 'Use /api/orders to create orders with Razorpay payment'
  })
}
