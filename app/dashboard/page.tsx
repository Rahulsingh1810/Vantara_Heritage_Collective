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
        const res = await fetch('/api/auth/me')
        if (!res.ok) return router.push('/auth/login')

        const data = await res.json()
        setUser(data.user)

        const ordersRes = await fetch('/api/orders')
        if (ordersRes.ok) {
          const ordersData = await ordersRes.json()
          setOrders(ordersData)
        }
      } catch (err) {
        console.error(err)
        router.push('/auth/login')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [router])

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/')
  }

  if (isLoading) return <div className="p-12 text-center">Loading...</div>
  if (!user) return null

  return (
    <main className="bg-background min-h-screen py-12">
      <div className="mx-auto max-w-6xl px-4">

        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold">My Dashboard</h1>
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut className="h-4 w-4" /> Logout
          </Button>
        </div>

        <div className="mb-8 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ProfileEditor user={user} onUpdate={setUser} />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Account Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <div>
                <p className="text-(--color-ivory) text-3xl font-bold">{orders.length}</p>
                <p className="text-(--color-ivory)/70">Total Orders</p>
              </div>
              <div className="border-t pt-4">
                <p className="text-(--color-ivory) text-2xl font-bold">
                  ₹{orders.reduce((sum, o) => sum + Number(o.total_amount), 0).toFixed(2)}
                </p>
                <p className="text-(--color-ivory)/70">Total Spent</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" /> Order History
            </CardTitle>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
              <div className="py-12 text-center">
                <ShoppingBag className="text-(--color-ivory)/50 mx-auto mb-4 h-12 w-12 opacity-50" />
                <p className="text-(--color-ivory)/70 mb-4">No orders yet</p>
                <Link href="/products"><Button>Start Shopping</Button></Link>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left">Order #</th>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Total</th>
                    <th className="px-4 py-3 text-left">Payment</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id} className="border-b hover:bg-muted">
                      <td className="px-4 py-3">#{order.order_number}</td>
                      <td className="px-4 py-3">{new Date(order.created_at).toLocaleDateString()}</td>
                      <td className="px-4 py-3 font-semibold">₹{ensureNumber(order.total_amount).toFixed(2)}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-3 py-1 text-sm font-medium ${
                          order.payment_status === 'paid'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.payment_status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </CardContent>
        </Card>

      </div>
    </main>
  )
}
