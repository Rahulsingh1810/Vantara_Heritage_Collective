export default function PrivacyPolicyPage() {
  return (
    <section className="min-h-screen bg-(--color-ivory) py-24">
      <div className="mx-auto max-w-5xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-extrabold text-(--color-wine-red) md:text-5xl">Privacy Policy</h1>
          <p className="mt-4 text-(--color-wine-red)/70">
            At Vadānya Heritage Collective, your privacy is important to us.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-14 leading-relaxed text-(--color-wine-red)/80">
          <div>
            <h2 className="mb-4 text-2xl font-bold">Information We Collect</h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>Personal details such as name, email, phone number, and shipping address.</li>
              <li>
                Payment information processed securely through third-party gateways (we do not store card details).
              </li>
              <li>Browsing data including pages visited, device information, and IP address for analytics.</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-bold">How We Use Your Information</h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>To process and fulfil orders.</li>
              <li>To communicate order updates and customer support responses.</li>
              <li>To improve our website experience and offerings.</li>
              <li>To comply with legal and regulatory requirements.</li>
            </ul>
            <p className="mt-4 font-semibold text-(--color-wine-red)">
              We do not sell, rent, or trade your personal information.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-bold">Data Security</h2>
            <p>
              We take reasonable measures to protect your personal information against unauthorised access, misuse, or
              disclosure. All transactions are processed through secure and trusted platforms.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-bold">Third-Party Services</h2>
            <p>
              We may use third-party tools for payment processing, shipping, analytics, or communication. These
              providers receive only the information necessary to perform their services and operate under their own
              privacy policies.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-bold">Your Rights</h2>
            <p>
              You may request access to, correction of, or deletion of your personal data by contacting us. We will
              respond within a reasonable timeframe.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-bold">Policy Updates</h2>
            <p>This Privacy Policy may be updated periodically. Any changes will be reflected on this page.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
