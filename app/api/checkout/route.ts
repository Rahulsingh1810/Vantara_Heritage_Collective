import { type NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { orderId, items, email } = await request.json()

    // Simplified order processing without Stripe
    // Orders are now created directly in the checkout page
    // and confirmed via the success page

    return NextResponse.json({
      success: true,
      message: 'Order processed successfully',
      orderId
    })
  } catch (error) {
    console.error('Order processing error:', error)
    return NextResponse.json({ error: 'Failed to process order' }, { status: 500 })
  }
}
