'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import CartIcon from './cart-icon'
import { useUser } from '@/lib/user-context'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { user } = useUser()

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      setShowUserMenu(false)
      window.location.href = '/'
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-[#5a1620] bg-[#6f1c27] text-[#F5EFE6]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-[#F5EFE6]">
            <img
              src="/ivoryLogo.svg"
              alt="Vandanya Heritage Collective Logo"
              className="h-12 w-auto rounded object-contain md:h-14"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <Link href="/" className="transition-colors hover:text-[#F5EFE6]/80">
              Home
            </Link>
            <Link href="/our-story" className="transition-colors hover:text-[#F5EFE6]/80">
              Our Story
            </Link>
            <Link href="/products" className="transition-colors hover:text-[#F5EFE6]/80">
              Products
            </Link>
            <Link href="/b2b" className="font-semibold transition-colors hover:text-[#F5EFE6]/80">
              B2B
            </Link>
            <Link href="/transforming-spaces" className="transition-colors hover:text-[#F5EFE6]/80">
              Transforming Spaces
            </Link>
            <Link href="/contact" className="transition-colors hover:text-[#F5EFE6]/80">
              Contact
            </Link>
          </div>

          {/* Cart, Auth & Mobile Menu */}
          <div className="flex items-center gap-4">
            <CartIcon />

            {/* User Menu */}
            <div className="relative">
              {user ? (
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-[#5a1620]"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F5EFE6] text-sm font-bold text-[#6f1c27]">
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="hidden text-sm font-medium sm:inline">{user.name}</span>
                </button>
              ) : (
                <Link
                  href="/auth/login"
                  className="text-sm font-medium transition-colors hover:text-[#F5EFE6]/80"
                >
                  Sign In
                </Link>
              )}

              {/* User Dropdown */}
              {showUserMenu && user && (
                <div className="absolute right-0 z-50 mt-2 w-56 rounded-lg border border-[#5a1620] bg-[#6f1c27] py-2 shadow-lg">
                  <div className="border-b border-[#5a1620] px-4 py-3">
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-[#e6dccf]">{user.email}</p>
                  </div>
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 transition-colors hover:bg-[#5a1620]"
                  >
                    My Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-red-300 transition-colors hover:bg-[#5a1620]"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="absolute inset-0 z-40 bg-[#6f1c27] px-6 pt-20 text-[#F5EFE6] md:hidden">
            <div className="space-y-4">
              <Link href="/" className="block rounded px-3 py-2 text-lg hover:bg-[#5a1620]">
                Home
              </Link>
              <Link href="/about" className="block rounded px-3 py-2 text-lg hover:bg-[#5a1620]">
                About
              </Link>
              <Link href="/products" className="block rounded px-3 py-2 text-lg hover:bg-[#5a1620]">
                Products
              </Link>
              <Link
                href="/b2b"
                className="block rounded px-3 py-2 text-lg font-semibold hover:bg-[#5a1620]"
              >
                B2B
              </Link>
              <Link
                href="/transforming-spaces"
                className="block rounded px-3 py-2 text-lg hover:bg-[#5a1620]"
              >
                Transforming Spaces
              </Link>
              <Link href="/contact" className="block rounded px-3 py-2 text-lg hover:bg-[#5a1620]">
                Contact
              </Link>

              {!user && (
                <Link
                  href="/auth/register"
                  className="block rounded px-3 py-2 text-lg hover:bg-[#5a1620]"
                >
                  Create Account
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
