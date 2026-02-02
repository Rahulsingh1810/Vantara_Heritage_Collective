'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import CartIcon from './cart-icon'
import { useUser } from '@/lib/user-context'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { user } = useUser()

  const closeMenu = () => setIsOpen(false)

  const links = [
    { label: 'Home', href: '/' },
    { label: 'Our Story', href: '/our-story' },
    { label: 'Products', href: '/products' },
    { label: 'B2B', href: '/b2b' },
    { label: 'Transforming Spaces', href: '/transforming-spaces' },
    { label: 'Contact', href: '/contact' }
  ]

  return (
    <>
      {/* TOP BAR (DESKTOP + MOBILE SAME AS BEFORE) */}
      <nav className="sticky top-0 z-50 border-b border-(--color-wine-red) bg-(--color-wine-red) text-(--color-ivory) shadow-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/">
              <img src="/ivoryLogo.svg" className="h-12" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden gap-8 md:flex">
              {links.map(link => (
                <Link key={link.href} href={link.href} className="transition hover:text-(--color-ivory)/80">
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">
              <CartIcon />

              {/* User */}
              {user ? (
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-(--color-ivory) text-sm font-bold text-(--color-wine-red)"
                >
                  {user.name?.charAt(0)}
                </button>
              ) : (
                <Link href="/auth/login" className="text-sm">
                  Sign In
                </Link>
              )}

              {/* Mobile Toggle */}
              <button onClick={() => setIsOpen(true)} className="md:hidden">
                <Menu className="h-7 w-7" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE SHEET */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            />

            {/* Bottom Sheet */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 22 }}
              className="fixed right-0 bottom-0 left-0 z-50 rounded-t-3xl bg-(--color-ivory) px-6 pt-6 pb-10 shadow-2xl md:hidden"
            >
              {/* Header */}
              <div className="mb-8 flex items-center justify-between">
                <p className="text-lg font-bold text-(--color-wine-red)">Explore</p>
                <button onClick={closeMenu} className="rounded-full bg-(--color-wine-red)/10 p-2">
                  <X className="h-6 w-6 text-(--color-wine-red)" />
                </button>
              </div>

              {/* Links */}
              <div className="space-y-3">
                {links.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      className="flex items-center justify-between rounded-xl border border-(--color-wine-red)/15 px-5 py-4 text-lg font-medium text-(--color-wine-red) transition hover:bg-(--color-wine-red) hover:text-(--color-ivory)"
                    >
                      {link.label}
                      <span className="text-sm opacity-60">→</span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {!user && (
                <Link
                  href="/auth/login"
                  onClick={closeMenu}
                  className="mt-8 block rounded-xl bg-(--color-wine-red) px-6 py-4 text-center font-semibold text-(--color-ivory)"
                >
                  Sign In
                </Link>
              )}

              <p className="mt-10 text-center text-xs text-(--color-wine-red)/50">Vadānya Heritage Collective</p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
