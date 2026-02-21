import nodemailer from 'nodemailer'

interface OrderItem {
  product_name: string
  product_url?: string
  quantity: number
  unit_price: number
}

interface OrderEmailData {
  orderNumber: string
  orderId: string
  customerName: string
  customerEmail: string
  customerPhone: string
  shippingAddress: string
  items: OrderItem[]
  totalAmount: number // in paise
  paymentId?: string
  paymentMethod?: string
}

function getTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  })
}

function buildItemsHTML(items: OrderItem[]): string {
  return items
    .map(
      item => `
      <tr>
        <td style="padding: 14px 16px; border-bottom: 1px solid #f0e6e8;">
          <div style="font-weight: 600; color: #722F37; font-size: 15px;">${item.product_name}</div>
          ${item.product_url ? `<div style="margin-top: 4px;"><a href="${item.product_url}" style="color: #9a5a60; font-size: 12px; text-decoration: none;">View Product →</a></div>` : ''}
        </td>
        <td style="padding: 14px 16px; border-bottom: 1px solid #f0e6e8; text-align: center; color: #722F37; font-size: 14px;">${item.quantity}</td>
        <td style="padding: 14px 16px; border-bottom: 1px solid #f0e6e8; text-align: center; color: #722F37; font-size: 14px;">₹${(item.unit_price / 100).toFixed(2)}</td>
        <td style="padding: 14px 16px; border-bottom: 1px solid #f0e6e8; text-align: right; color: #722F37; font-weight: 600; font-size: 14px;">₹${((item.unit_price * item.quantity) / 100).toFixed(2)}</td>
      </tr>`
    )
    .join('')
}

function buildCustomerEmail(data: OrderEmailData): string {
  const totalInRupees = (data.totalAmount / 100).toFixed(2)
  const totalItems = data.items.reduce((sum, i) => sum + i.quantity, 0)

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin: 0; padding: 0; background-color: #faf7f2; font-family: 'Georgia', 'Times New Roman', serif;">
  <div style="max-width: 640px; margin: 0 auto; background-color: #ffffff;">

    <!-- Header -->
    <div style="background-color: #722F37; padding: 40px 32px; text-align: center;">
      <h1 style="margin: 0; color: #faf7f2; font-size: 28px; font-weight: 700; letter-spacing: 2px;">VADĀNYA</h1>
      <p style="margin: 6px 0 0; color: #faf7f2; font-size: 12px; letter-spacing: 4px; text-transform: uppercase; opacity: 0.85;">Heritage Collective</p>
    </div>

    <!-- Success Banner -->
    <div style="background-color: #f8f0e8; padding: 32px; text-align: center; border-bottom: 2px solid #722F37;">
      <div style="font-size: 48px; margin-bottom: 12px;">✓</div>
      <h2 style="margin: 0; color: #722F37; font-size: 24px; font-weight: 700;">Order Confirmed!</h2>
      <p style="margin: 8px 0 0; color: #9a5a60; font-size: 14px;">Thank you for your purchase, ${data.customerName}!</p>
    </div>

    <!-- Order Info -->
    <div style="padding: 32px;">
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tr>
          <td style="padding: 8px 0; color: #9a5a60; font-size: 13px;">Order Number</td>
          <td style="padding: 8px 0; color: #722F37; font-weight: 700; text-align: right; font-size: 14px;">${data.orderNumber}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #9a5a60; font-size: 13px;">Date</td>
          <td style="padding: 8px 0; color: #722F37; text-align: right; font-size: 14px;">${new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Kolkata' })}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #9a5a60; font-size: 13px;">Total Items</td>
          <td style="padding: 8px 0; color: #722F37; text-align: right; font-size: 14px;">${totalItems}</td>
        </tr>
        ${data.paymentId ? `<tr><td style="padding: 8px 0; color: #9a5a60; font-size: 13px;">Payment ID</td><td style="padding: 8px 0; color: #722F37; text-align: right; font-size: 14px;">${data.paymentId}</td></tr>` : ''}
      </table>

      <!-- Items Table -->
      <h3 style="color: #722F37; font-size: 16px; margin: 0 0 16px; padding-bottom: 8px; border-bottom: 2px solid #722F37;">Order Items</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background-color: #faf7f2;">
            <th style="padding: 12px 16px; text-align: left; color: #9a5a60; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Product</th>
            <th style="padding: 12px 16px; text-align: center; color: #9a5a60; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Qty</th>
            <th style="padding: 12px 16px; text-align: center; color: #9a5a60; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Price</th>
            <th style="padding: 12px 16px; text-align: right; color: #9a5a60; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${buildItemsHTML(data.items)}
        </tbody>
      </table>

      <!-- Total -->
      <div style="margin-top: 20px; padding: 20px; background-color: #722F37; border-radius: 8px; text-align: right;">
        <span style="color: #faf7f2; font-size: 14px; opacity: 0.85;">Total Amount</span>
        <div style="color: #faf7f2; font-size: 28px; font-weight: 700; margin-top: 4px;">₹${totalInRupees}</div>
      </div>

      <!-- Shipping Address -->
      <div style="margin-top: 24px; padding: 20px; background-color: #faf7f2; border-radius: 8px; border-left: 4px solid #722F37;">
        <h4 style="margin: 0 0 8px; color: #722F37; font-size: 14px;">Shipping Address</h4>
        <p style="margin: 0; color: #9a5a60; font-size: 14px; line-height: 1.6;">${data.shippingAddress}</p>
      </div>

      <!-- What's Next -->
      <div style="margin-top: 32px;">
        <h3 style="color: #722F37; font-size: 16px; margin: 0 0 16px;">What Happens Next?</h3>
        <table style="width: 100%; border-collapse: collapse;">
          ${[
            { num: '1', text: 'Your order is being carefully packed by our artisans' },
            { num: '2', text: 'You will receive a tracking number once shipped' },
            { num: '3', text: 'Delivery within 7-14 business days domestically' }
          ]
            .map(
              step => `
            <tr>
              <td style="padding: 10px 0; vertical-align: top; width: 36px;">
                <div style="width: 28px; height: 28px; background-color: #722F37; color: #faf7f2; border-radius: 50%; text-align: center; line-height: 28px; font-size: 13px; font-weight: 700;">${step.num}</div>
              </td>
              <td style="padding: 10px 0; padding-left: 12px; color: #722F37; font-size: 14px;">${step.text}</td>
            </tr>`
            )
            .join('')}
        </table>
      </div>
    </div>

    <!-- Footer -->
    <div style="background-color: #722F37; padding: 28px 32px; text-align: center;">
      <p style="margin: 0; color: #faf7f2; font-size: 13px; opacity: 0.85;">Need help? Reply to this email or contact us</p>
      <p style="margin: 8px 0 0; color: #faf7f2; font-size: 11px; opacity: 0.6;">© ${new Date().getFullYear()} Vadānya Heritage Collective</p>
    </div>
  </div>
</body>
</html>`
}

function buildOwnerEmail(data: OrderEmailData): string {
  const totalInRupees = (data.totalAmount / 100).toFixed(2)
  const totalItems = data.items.reduce((sum, i) => sum + i.quantity, 0)

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: 'Segoe UI', Arial, sans-serif;">
  <div style="max-width: 640px; margin: 0 auto; background-color: #ffffff;">

    <!-- Header -->
    <div style="background-color: #1a1a2e; padding: 24px 32px;">
      <h1 style="margin: 0; color: #ffffff; font-size: 20px;">🛒 New Order Received!</h1>
      <p style="margin: 6px 0 0; color: #a0a0c0; font-size: 13px;">${new Date().toLocaleString('en-IN', { dateStyle: 'full', timeStyle: 'short', timeZone: 'Asia/Kolkata' })}</p>
    </div>

    <!-- Quick Stats -->
    <div style="display: flex; padding: 0;">
      <div style="flex: 1; padding: 20px; text-align: center; background-color: #722F37;">
        <div style="color: #faf7f2; font-size: 24px; font-weight: 700;">₹${totalInRupees}</div>
        <div style="color: #faf7f2; font-size: 11px; text-transform: uppercase; opacity: 0.8; margin-top: 4px;">Total Amount</div>
      </div>
      <div style="flex: 1; padding: 20px; text-align: center; background-color: #8a3a42;">
        <div style="color: #faf7f2; font-size: 24px; font-weight: 700;">${totalItems}</div>
        <div style="color: #faf7f2; font-size: 11px; text-transform: uppercase; opacity: 0.8; margin-top: 4px;">Total Items</div>
      </div>
    </div>

    <div style="padding: 32px;">
      <!-- Customer Details -->
      <h3 style="color: #1a1a2e; font-size: 15px; margin: 0 0 16px; padding-bottom: 8px; border-bottom: 2px solid #722F37;">👤 Customer Details</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 28px;">
        <tr>
          <td style="padding: 8px 0; color: #888; font-size: 13px; width: 140px;">Name</td>
          <td style="padding: 8px 0; color: #1a1a2e; font-weight: 600; font-size: 14px;">${data.customerName}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #888; font-size: 13px;">Email</td>
          <td style="padding: 8px 0; color: #1a1a2e; font-size: 14px;"><a href="mailto:${data.customerEmail}" style="color: #722F37; text-decoration: none;">${data.customerEmail}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #888; font-size: 13px;">Phone</td>
          <td style="padding: 8px 0; color: #1a1a2e; font-size: 14px;"><a href="tel:${data.customerPhone}" style="color: #722F37; text-decoration: none;">${data.customerPhone}</a></td>
        </tr>
      </table>

      <!-- Order Details -->
      <h3 style="color: #1a1a2e; font-size: 15px; margin: 0 0 16px; padding-bottom: 8px; border-bottom: 2px solid #722F37;">📦 Order Details</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
        <tr>
          <td style="padding: 8px 0; color: #888; font-size: 13px; width: 140px;">Order Number</td>
          <td style="padding: 8px 0; color: #1a1a2e; font-weight: 700; font-size: 14px;">${data.orderNumber}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #888; font-size: 13px;">Order ID</td>
          <td style="padding: 8px 0; color: #1a1a2e; font-size: 13px; font-family: monospace;">${data.orderId}</td>
        </tr>
        ${data.paymentId ? `<tr><td style="padding: 8px 0; color: #888; font-size: 13px;">Payment ID</td><td style="padding: 8px 0; color: #1a1a2e; font-size: 13px; font-family: monospace;">${data.paymentId}</td></tr>` : ''}
        ${data.paymentMethod ? `<tr><td style="padding: 8px 0; color: #888; font-size: 13px;">Payment Method</td><td style="padding: 8px 0; color: #1a1a2e; font-size: 14px; text-transform: capitalize;">${data.paymentMethod}</td></tr>` : ''}
      </table>

      <!-- Items -->
      <h3 style="color: #1a1a2e; font-size: 15px; margin: 24px 0 16px; padding-bottom: 8px; border-bottom: 2px solid #722F37;">🛍️ Items Ordered</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background-color: #f5f5f5;">
            <th style="padding: 10px 12px; text-align: left; color: #888; font-size: 11px; text-transform: uppercase;">Product</th>
            <th style="padding: 10px 12px; text-align: center; color: #888; font-size: 11px; text-transform: uppercase;">Qty</th>
            <th style="padding: 10px 12px; text-align: center; color: #888; font-size: 11px; text-transform: uppercase;">Unit Price</th>
            <th style="padding: 10px 12px; text-align: right; color: #888; font-size: 11px; text-transform: uppercase;">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          ${data.items
            .map(
              item => `
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #eee;">
                <div style="font-weight: 600; color: #1a1a2e; font-size: 14px;">${item.product_name}</div>
                ${item.product_url ? `<a href="${item.product_url}" style="color: #722F37; font-size: 11px; text-decoration: none;">View →</a>` : ''}
              </td>
              <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center; font-size: 14px;">${item.quantity}</td>
              <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center; font-size: 14px;">₹${(item.unit_price / 100).toFixed(2)}</td>
              <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right; font-weight: 600; font-size: 14px;">₹${((item.unit_price * item.quantity) / 100).toFixed(2)}</td>
            </tr>`
            )
            .join('')}
        </tbody>
      </table>

      <!-- Total -->
      <div style="margin-top: 16px; padding: 16px 20px; background-color: #1a1a2e; border-radius: 8px; text-align: right;">
        <span style="color: #a0a0c0; font-size: 13px;">Grand Total</span>
        <div style="color: #ffffff; font-size: 26px; font-weight: 700; margin-top: 4px;">₹${totalInRupees}</div>
      </div>

      <!-- Shipping Address -->
      <div style="margin-top: 24px; padding: 16px 20px; background-color: #faf7f2; border-radius: 8px; border-left: 4px solid #722F37;">
        <h4 style="margin: 0 0 8px; color: #722F37; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">📍 Shipping Address</h4>
        <p style="margin: 0; color: #444; font-size: 14px; line-height: 1.6;">${data.shippingAddress}</p>
      </div>
    </div>

    <!-- Footer -->
    <div style="background-color: #1a1a2e; padding: 20px 32px; text-align: center;">
      <p style="margin: 0; color: #a0a0c0; font-size: 11px;">Vadānya Heritage Collective — Order Notification</p>
    </div>
  </div>
</body>
</html>`
}

export async function sendOrderConfirmationEmails(data: OrderEmailData): Promise<void> {
  try {
    const transporter = getTransporter()
    const totalInRupees = (data.totalAmount / 100).toFixed(2)

    // 1. Email to customer
    await transporter.sendMail({
      from: `"${process.env.EMAIL_NAME}" <${process.env.EMAIL}>`,
      to: data.customerEmail,
      subject: `Order Confirmed — ${data.orderNumber} | Vadānya Heritage Collective`,
      html: buildCustomerEmail(data)
    })

    // 2. Email to owner
    await transporter.sendMail({
      from: `"${process.env.EMAIL_NAME}" <${process.env.EMAIL}>`,
      to: process.env.RECIPIENT_EMAIL,
      replyTo: data.customerEmail,
      subject: `🛒 New Order: ${data.orderNumber} — ₹${totalInRupees} from ${data.customerName}`,
      html: buildOwnerEmail(data)
    })

    console.log(`[EMAIL] Order confirmation emails sent for ${data.orderNumber}`)
  } catch (error) {
    // Don't throw — email failure should not break the payment flow
    console.error('[EMAIL] Failed to send order confirmation:', error)
  }
}
