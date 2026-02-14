'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LogOut, ShoppingBag } from 'lucide-react'
import ProfileEditor from '@/components/profile-editor'
import { ensureNumber } from '@/lib/utils'

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

interface Order {
  id: string
  order_number: string
  total_amount: number
  status: string
  payment_status: string
  created_at: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

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
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      })
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
            className="gap-2 border-(--color-wine-red) text-(--color-wine-red) hover:bg-(--color-wine-red) hover:text-(--color-ivory)"
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
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="border-b border-(--color-wine-red)/30">
                      <th className="px-4 py-4 text-left text-(--color-wine-red)">Order #</th>
                      <th className="px-4 py-4 text-left text-(--color-wine-red)">Date</th>
                      <th className="px-4 py-4 text-left text-(--color-wine-red)">Total</th>
                      <th className="px-4 py-4 text-left text-(--color-wine-red)">Payment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr
                        key={order.id}
                        className="border-b border-(--color-wine-red)/20 hover:bg-(--color-wine-red)/5"
                      >
                        <td className="px-4 py-4">#{order.order_number}</td>
                        <td className="px-4 py-4">{new Date(order.created_at).toLocaleDateString()}</td>
                        <td className="px-4 py-4 font-medium">₹{ensureNumber(order.total_amount).toFixed(2)}</td>
                        <td className="px-4 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                              order.payment_status === 'paid'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {order.payment_status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
