"use client"

import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import CartIcon from "./cart-icon"
import { useUser } from "@/lib/user-context"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { user } = useUser()

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      setShowUserMenu(false)
      window.location.href = "/"
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
              ◆
            </div>
            The Heritage Collective
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/products" className="text-foreground hover:text-primary transition-colors">
              Products
            </Link>
            <Link href="/b2b" className="text-foreground hover:text-primary transition-colors font-semibold">
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
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent transition-colors"
                >
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <span className="text-sm font-medium hidden sm:inline text-foreground">{user.name}</span>
                </button>
              ) : (
                <Link
                  href="/auth/login"
                  className="text-foreground hover:text-primary transition-colors text-sm font-medium"
                >
                  Sign In
                </Link>
              )}

              {/* User Dropdown */}
              {showUserMenu && user && (
                <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-lg py-2 z-50">
                  <div className="px-4 py-3 border-b border-border">
                    <p className="font-semibold text-foreground">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                  <Link href="/dashboard" className="block px-4 py-2 hover:bg-muted transition-colors">
                    My Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-muted transition-colors text-destructive"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/" className="block px-3 py-2 text-foreground hover:bg-muted rounded">
              Home
            </Link>
            <Link href="/about" className="block px-3 py-2 text-foreground hover:bg-muted rounded">
              About
            </Link>
            <Link href="/products" className="block px-3 py-2 text-foreground hover:bg-muted rounded">
              Products
            </Link>
            <Link href="/b2b" className="block px-3 py-2 text-foreground hover:bg-muted rounded font-semibold">
              B2B
            </Link>
            <Link href="/transforming-spaces" className="block px-3 py-2 text-foreground hover:bg-muted rounded">
              Transforming Spaces
            </Link>
            <Link href="/contact" className="block px-3 py-2 text-foreground hover:bg-muted rounded">
              Contact
            </Link>
            {!user && (
              <Link href="/auth/register" className="block px-3 py-2 text-foreground hover:bg-muted rounded">
                Create Account
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
