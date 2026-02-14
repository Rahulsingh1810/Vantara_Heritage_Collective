import Razorpay from 'razorpay'

let _razorpay: Razorpay | null = null

export function getRazorpay(): Razorpay {
  if (!_razorpay) {
    const key_id = process.env.RAZORPAY_KEY_ID
    const key_secret = process.env.RAZORPAY_KEY_SECRET

    if (!key_id || !key_secret) {
      throw new Error(
        'Missing RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET environment variables'
      )
    }

    _razorpay = new Razorpay({ key_id, key_secret })
  }
  return _razorpay
}
