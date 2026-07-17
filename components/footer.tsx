import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[var(--color-wine-red)] text-[var(--color-ivory)]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block">
              <Image
                src="/Ivory.png" // or /logo.svg
                alt="Vadānya Heritage Collective Logo"
                width={140}
                height={60}
                className="mb-4 object-contain"
                priority
              />
            </Link>
            <p className="text-sm opacity-90">Reimagining cultural treasures in iconic living spaces</p>
            <a
              href="https://www.instagram.com/vadanyaheritage/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--color-ivory)]/30 px-4 py-2 text-sm transition-all hover:bg-[var(--color-ivory)]/10"
              aria-label="Follow us on Instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              Follow Us
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/our-story" className="transition-opacity hover:opacity-80">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/products" className="transition-opacity hover:opacity-80">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-opacity hover:opacity-80">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="mb-4 font-semibold">Information</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy-policy" className="transition-opacity hover:opacity-80">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/shipping-returns" className="transition-opacity hover:opacity-80">
                  Shipping & Returns
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-semibold">Contact</h4>
            <p className="text-sm opacity-90">
              Address: No. 33, 2nd Cross, SBM Colony, Brindavan Nagar, Mathikere, Bengaluru – 560054
            </p>
            <p className="mt-2 text-sm opacity-90">Phone: +91 7259311212</p>
            <p className="mt-2 text-sm opacity-90">Email: info@vadanyaheritage.in</p>
          </div>
        </div>

        <div className="border-primary-foreground/20 border-t pt-8 text-center text-sm opacity-90">
          <p>&copy; 2026 Vadānya Heritage Collective. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
