'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LogOut, ShoppingBag, ChevronDown, ChevronUp } from 'lucide-react'
import ProfileEditor from '@/components/profile-editor'
import { ensureNumber } from '@/lib/utils'
import { useUser } from '@/lib/user-context'

interface User {
  id: string
  email: string
  name: string
  phone?: string
  address_line1?: string
  address_line2?: string
  city?: string
  state?: string
  pincode?: string
  country?: string
}

interface OrderItem {
  product_name: string
  quantity: number
  unit_price: number
}

interface Order {
  id: string
  order_number: string
  total_amount: number
  status: string
  payment_status: string
  created_at: string
  items: OrderItem[]
}

export default function DashboardPage() {
  const router = useRouter()
  const { refetchUser } = useUser()
  const [user, setUser] = useState<User | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'include' })
        if (!res.ok) {
          router.push('/auth/login')
          return
        }

        const data = await res.json()
        setUser(data.user)

        const ordersRes = await fetch('/api/orders', { credentials: 'include' })
        if (ordersRes.ok) {
          const ordersData = await ordersRes.json()
          setOrders(ordersData)
        }
      } catch (err) {
        console.error('Dashboard fetch error:', err)
        router.push('/auth/login')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [router])

  const handleLogout = async () => {
    try {
      // Optional: Firebase sign out
      try {
        const { signOut } = await import('firebase/auth')
        const { auth } = await import('@/lib/firebase')
        await signOut(auth)
      } catch (firebaseErr) {
        console.warn('Firebase sign-out skipped or failed', firebaseErr)
      }

      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      })

      if (!res.ok) {
        throw new Error('Logout request failed')
      }

      await refetchUser()
      router.push('/')
      router.refresh()
    } catch (err) {
      console.error('Logout error:', err)
      alert('Failed to log out. Please try again.')
    }
  }

  if (isLoading) return <div className="p-12 text-center">Loading...</div>
  if (!user) return null

  return (
    <main className="bg-background min-h-screen py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-bold text-(--color-wine-red) md:text-4xl">My Dashboard</h1>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="gap-2 border-(--color-wine-red) text-(--color-ivory) hover:bg-(--color-wine-red) hover:text-(--color-ivory)"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        <div className="mb-10 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ProfileEditor user={user} onUpdate={setUser} />
          </div>

          <Card className="h-fit border-(--color-wine-red)/30 bg-(--color-ivory)">
            <CardHeader className="pb-4">
              <CardTitle className="text-(--color-wine-red)">Account Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="text-center">
                <p className="text-4xl font-bold text-(--color-wine-red)">{orders.length}</p>
                <p className="mt-1 text-(--color-wine-red)/70">Total Orders</p>
              </div>
              <div className="border-t border-(--color-wine-red)/20 pt-6 text-center">
                <p className="text-4xl font-bold text-(--color-wine-red)">
                  ₹{orders.reduce((sum, o) => sum + ensureNumber(o.total_amount), 0).toFixed(2)}
                </p>
                <p className="mt-1 text-(--color-wine-red)/70">Total Spent</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-(--color-wine-red)/30 bg-(--color-ivory) shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-(--color-wine-red)">
              <ShoppingBag className="h-5 w-5" />
              Order History
            </CardTitle>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
              <div className="py-16 text-center">
                <ShoppingBag className="mx-auto mb-6 h-16 w-16 text-(--color-wine-red)/40" />
                <p className="mb-4 text-lg text-(--color-wine-red)/70">No orders yet</p>
                <Link href="/products">
                  <Button className="bg-(--color-wine-red) hover:bg-(--color-wine-red)/90">Start Shopping</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map(order => {
                  const isExpanded = expandedOrder === order.id
                  return (
                    <div key={order.id} className="overflow-hidden rounded-xl border border-(--color-wine-red)/20">
                      {/* Order summary row */}
                      <button
                        onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-(--color-wine-red) transition-colors hover:bg-(--color-wine-red)/5"
                      >
                        <div className="flex flex-1 flex-wrap items-center gap-x-8 gap-y-2">
                          <span className="font-semibold">#{order.order_number}</span>
                          <span className="text-sm text-(--color-wine-red)/60">
                            {new Date(order.created_at).toLocaleDateString('en-IN', {
                              timeZone: 'Asia/Kolkata',
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </span>
                          <span className="text-sm text-(--color-wine-red)/60">
                            {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                          </span>
                          <span className="ml-auto font-bold">₹{ensureNumber(order.total_amount).toFixed(2)}</span>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5 shrink-0 text-(--color-wine-red)/50" />
                        ) : (
                          <ChevronDown className="h-5 w-5 shrink-0 text-(--color-wine-red)/50" />
                        )}
                      </button>

                      {/* Expanded details */}
                      {isExpanded && (
                        <div className="border-t border-(--color-wine-red)/15 bg-(--color-wine-red)/[0.02] px-5 py-4">
                          <h4 className="mb-3 text-sm font-semibold text-(--color-wine-red)/70">Order Items</h4>
                          <div className="space-y-2">
                            {order.items.map((item, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between rounded-lg bg-white/60 px-4 py-3 text-(--color-wine-red)"
                              >
                                <div>
                                  <p className="font-medium">{item.product_name}</p>
                                  <p className="text-sm text-(--color-wine-red)/50">Qty: {item.quantity}</p>
                                </div>
                                <p className="font-semibold">₹{ensureNumber(item.unit_price).toFixed(2)}</p>
                              </div>
                            ))}
                          </div>
                          {order.items.length === 0 && (
                            <p className="py-2 text-sm text-(--color-wine-red)/50">No item details available.</p>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
