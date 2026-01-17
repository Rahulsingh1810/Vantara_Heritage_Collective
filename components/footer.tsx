import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-lg mb-4">The Heritage Collective</h3>
            <p className="text-sm opacity-90">
              Preserving and celebrating traditional artifacts and cultural treasures.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:opacity-80 transition-opacity">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:opacity-80 transition-opacity">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:opacity-80 transition-opacity">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="font-semibold mb-4">Information</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/faq" className="hover:opacity-80 transition-opacity">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:opacity-80 transition-opacity">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:opacity-80 transition-opacity">
                  Returns
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-sm opacity-90">Email: info@heritagecollective.com</p>
            <p className="text-sm opacity-90">Phone: +1 (555) 123-4567</p>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-90">
          <p>&copy; 2026 The Heritage Collective. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
