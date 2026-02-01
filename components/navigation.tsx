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
      setIsOpen(false)
      window.location.href = '/'
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const closeMenu = () => setIsOpen(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--color-wine-red)] bg-[var(--color-wine-red)] text-[var(--color-ivory)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <img
              src="/ivoryLogo.svg"
              alt="Vandanya Heritage Collective Logo"
              className="h-12 w-auto rounded object-contain md:h-14"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <Link href="/" className="transition-colors hover:text-[var(--color-ivory)]/80">
              Home
            </Link>
            <Link href="/our-story" className="transition-colors hover:text-[var(--color-ivory)]/80">
              Our Story
            </Link>
            <Link href="/products" className="transition-colors hover:text-[var(--color-ivory)]/80">
              Products
            </Link>
            <Link href="/b2b" className="font-semibold transition-colors hover:text-[var(--color-ivory)]/80">
              B2B
            </Link>
            <Link href="/transforming-spaces" className="transition-colors hover:text-[var(--color-ivory)]/80">
              Transforming Spaces
            </Link>
            <Link href="/contact" className="transition-colors hover:text-[var(--color-ivory)]/80">
              Contact
            </Link>
          </div>

          {/* Cart, Auth & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <CartIcon />

            {/* User Menu (desktop + mobile) */}
            <div className="relative">
              {user ? (
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-[var(--color-wine-red-dark)]"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-ivory)] text-sm font-bold text-[var(--color-wine-red)]">
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="hidden text-sm font-medium sm:inline">{user.name}</span>
                </button>
              ) : (
                <Link
                  href="/auth/login"
                  className="text-sm font-medium transition-colors hover:text-[var(--color-ivory)]/80"
                >
                  Sign In
                </Link>
              )}

              {/* User Dropdown */}
              {showUserMenu && user && (
                <div className="absolute right-0 z-50 mt-2 w-56 rounded-lg border border-[var(--color-wine-red)] bg-[var(--color-wine-red)] py-2 shadow-xl md:shadow-2xl">
                  <div className="border-b border-[var(--color-wine-red)] px-4 py-3">
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm opacity-80">{user.email}</p>
                  </div>
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2.5 transition-colors hover:bg-[var(--color-wine-red-dark)]"
                    onClick={() => setShowUserMenu(false)}
                  >
                    My Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2.5 text-left text-red-200 transition-colors hover:bg-[var(--color-wine-red-dark)]"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="md:hidden p-2 -mr-2"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Full-screen Menu */}
      <div
        className={`
          fixed inset-0 z-40 flex flex-col bg-[var(--color-ivory)] text-[var(--color-wine-red)] 
          transition-transform duration-300 ease-in-out md:hidden
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Header with close button */}
        <div className="flex items-center justify-between border-b border-[var(--color-wine-red)]/20 px-6 py-5">
          <div className="text-xl font-bold text-[var(--color-wine-red)]">
            Menu
          </div>
          <button 
            onClick={closeMenu}
            className="rounded-full p-2 hover:bg-[var(--color-wine-red)]/10 transition-colors"
            aria-label="Close menu"
          >
            <X className="h-8 w-8" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-6 py-8">
          <div className="flex flex-col gap-2 text-lg">
            <Link 
              href="/" 
              className="block rounded-lg px-5 py-4 hover:bg-[var(--color-wine-red)]/10 transition-colors"
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link 
              href="/our-story" 
              className="block rounded-lg px-5 py-4 hover:bg-[var(--color-wine-red)]/10 transition-colors"
              onClick={closeMenu}
            >
              Our Story
            </Link>
            <Link 
              href="/products" 
              className="block rounded-lg px-5 py-4 hover:bg-[var(--color-wine-red)]/10 transition-colors"
              onClick={closeMenu}
            >
              Products
            </Link>
            <Link 
              href="/b2b" 
              className="block rounded-lg px-5 py-4 font-semibold hover:bg-[var(--color-wine-red)]/10 transition-colors"
              onClick={closeMenu}
            >
              B2B
            </Link>
            <Link 
              href="/transforming-spaces" 
              className="block rounded-lg px-5 py-4 hover:bg-[var(--color-wine-red)]/10 transition-colors"
              onClick={closeMenu}
            >
              Transforming Spaces
            </Link>
            <Link 
              href="/contact" 
              className="block rounded-lg px-5 py-4 hover:bg-[var(--color-wine-red)]/10 transition-colors"
              onClick={closeMenu}
            >
              Contact
            </Link>

            {/* Auth links when not logged in */}
            {!user && (
              <div className="mt-8 border-t border-[var(--color-wine-red)]/20 pt-8">
                <Link 
                  href="/auth/login"
                  className="block rounded-lg px-5 py-4 hover:bg-[var(--color-wine-red)]/10 transition-colors"
                  onClick={closeMenu}
                >
                  Sign In
                </Link>
                <Link 
                  href="/auth/register"
                  className="block rounded-lg px-5 py-4 hover:bg-[var(--color-wine-red)]/10 transition-colors"
                  onClick={closeMenu}
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}