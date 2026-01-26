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
    <nav className="bg-background border-border sticky top-0 z-50 border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-primary flex items-center gap-2 text-xl font-bold">
            <img
              src="/logo.png"
              alt="The Heritage Collective Logo"
              className="h-10 w-10 object-contain rounded"
              style={{ maxWidth: '2.5rem', maxHeight: '2.5rem' }}
            />
            <span>The Heritage Collective</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <Link href="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/products" className="text-foreground hover:text-primary transition-colors">
              Products
            </Link>
            <Link href="/b2b" className="text-foreground hover:text-primary font-semibold transition-colors">
              B2B
            </Link>
            <Link href="/transforming-spaces" className="text-foreground hover:text-primary transition-colors">
              Transforming Spaces
            </Link>
            <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
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
                  className="hover:bg-accent flex items-center gap-2 rounded-lg px-3 py-2 transition-colors"
                >
                  <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold">
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="text-foreground hidden text-sm font-medium sm:inline">{user.name}</span>
                </button>
              ) : (
                <Link
                  href="/auth/login"
                  className="text-foreground hover:text-primary text-sm font-medium transition-colors"
                >
                  Sign In
                </Link>
              )}

              {/* User Dropdown */}
              {showUserMenu && user && (
                <div className="bg-card border-border absolute right-0 z-50 mt-2 w-56 rounded-lg border py-2 shadow-lg">
                  <div className="border-border border-b px-4 py-3">
                    <p className="text-foreground font-semibold">{user.name}</p>
                    <p className="text-muted-foreground text-sm">{user.email}</p>
                  </div>
                  <Link href="/dashboard" className="hover:bg-muted block px-4 py-2 transition-colors">
                    My Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="hover:bg-muted text-destructive w-full px-4 py-2 text-left transition-colors"
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
          <div className="space-y-2 pb-4 md:hidden">
            <Link href="/" className="text-foreground hover:bg-muted block rounded px-3 py-2">
              Home
            </Link>
            <Link href="/about" className="text-foreground hover:bg-muted block rounded px-3 py-2">
              About
            </Link>
            <Link href="/products" className="text-foreground hover:bg-muted block rounded px-3 py-2">
              Products
            </Link>
            <Link href="/b2b" className="text-foreground hover:bg-muted block rounded px-3 py-2 font-semibold">
              B2B
            </Link>
            <Link href="/transforming-spaces" className="text-foreground hover:bg-muted block rounded px-3 py-2">
              Transforming Spaces
            </Link>
            <Link href="/contact" className="text-foreground hover:bg-muted block rounded px-3 py-2">
              Contact
            </Link>
            {!user && (
              <Link href="/auth/register" className="text-foreground hover:bg-muted block rounded px-3 py-2">
                Create Account
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
