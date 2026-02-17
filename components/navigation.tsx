'use client'

import Link from 'next/link'
import { Menu, X, LogOut } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import CartIcon from './cart-icon'
import { useUser } from '@/lib/user-context'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { user, refetchUser } = useUser()
  const router = useRouter()
  const menuRef = useRef<HTMLDivElement>(null)

  const closeMenu = () => setIsOpen(false)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    try {
      // Optional: Firebase sign out (recommended)
      try {
        const { signOut } = await import('firebase/auth')
        const { auth } = await import('@/lib/firebase') // ← adjust path to your firebase config
        await signOut(auth)
      } catch (firebaseErr) {
        console.warn('Firebase sign-out skipped or failed', firebaseErr)
      }

      // Clear server-side session cookie
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      })

      if (!res.ok) {
        throw new Error('Logout request failed')
      }

      await refetchUser()
      setShowUserMenu(false)
      router.push('/')
    } catch (err) {
      console.error('Logout failed:', err)
      // You can add toast/notification here if you have one
    }
  }

  const links = [
    { label: 'Home', href: '/' },
    { label: 'Our Story', href: '/our-story' },
    { label: 'Products', href: '/products' },
    { label: 'Transforming Spaces', href: '/transforming-spaces' },
    { label: 'Contact', href: '/contact' }
  ]

  return (
    <>
      {/* Desktop + Mobile Top Bar */}
      <nav className="sticky top-0 z-50 border-b border-(--color-wine-red) bg-(--color-wine-red) text-(--color-ivory) shadow-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/">
              <img src="/Ivory.png" className="h-12" alt="Vadānya Heritage Collective" />
            </Link>

            {/* Desktop Links */}
            <div className="hidden gap-8 md:flex">
              {links.map(link => (
                <Link key={link.href} href={link.href} className="transition hover:text-(--color-ivory)/80">
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right side: Cart + User + Mobile Toggle */}
            <div className="flex items-center gap-4">
              <CartIcon />

              {user ? (
                <div
                  className="relative"
                  ref={menuRef}
                  onMouseEnter={() => setShowUserMenu(true)}
                  onMouseLeave={() => setShowUserMenu(false)}
                >
                  <button
                    onClick={() => router.push('/dashboard')}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-(--color-ivory) text-sm font-bold text-(--color-wine-red)"
                    title="Go to Dashboard"
                  >
                    {user.name?.charAt(0)?.toUpperCase() || '?'}
                  </button>

                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.95 }}
                        transition={{ duration: 0.12 }}
                        className="absolute top-full right-0 z-50 mt-2 w-44 rounded-md border border-(--color-wine-red)/20 bg-(--color-ivory) py-1 shadow-lg"
                      >
                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-(--color-wine-red) hover:bg-(--color-wine-red)/10"
                        >
                          <LogOut size={16} />
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link href="/auth/login" className="text-sm">
                  Sign In
                </Link>
              )}

              <button onClick={() => setIsOpen(true)} className="md:hidden">
                <Menu className="h-7 w-7" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Sheet */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            />

            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 22 }}
              className="fixed right-0 bottom-0 left-0 z-50 rounded-t-3xl bg-(--color-ivory) px-6 pt-6 pb-10 shadow-2xl md:hidden"
            >
              <div className="mb-8 flex items-center justify-between">
                <p className="text-lg font-bold text-(--color-wine-red)">Explore</p>
                <button onClick={closeMenu} className="rounded-full bg-(--color-wine-red)/10 p-2">
                  <X className="h-6 w-6 text-(--color-wine-red)" />
                </button>
              </div>

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

              {/* Sign In / Sign Out */}
              {user ? (
                <button
                  onClick={() => {
                    handleLogout()
                    closeMenu()
                  }}
                  className="mt-8 block w-full rounded-xl bg-(--color-wine-red) px-6 py-4 text-center font-semibold text-(--color-ivory) hover:bg-(--color-wine-red)/90"
                >
                  Sign Out
                </button>
              ) : (
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
