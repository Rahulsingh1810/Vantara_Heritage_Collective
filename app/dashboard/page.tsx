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
  id: number
  email: string
  name: string
  phone?: string
  address?: string
  city?: string
  state?: string
  zip?: string
}

interface Order {
  id: number
  customer_name: string
  customer_email: string
  customer_phone: string
  customer_address: string
  total_amount: number
  status: string
  created_at: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/auth/me')

        if (!response.ok) {
          router.push('/auth/login')
          return
        }

        const data = await response.json()
        setUser(data.user)

        // Fetch user's orders
        const ordersResponse = await fetch(`/api/orders?email=${data.user.email}`)
        if (ordersResponse.ok) {
          const ordersData = await ordersResponse.json()
          setOrders(ordersData)
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
        router.push('/auth/login')
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [router])

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  if (isLoading) {
    return (
      <main className="bg-background min-h-screen py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">Loading...</div>
        </div>
      </main>
    )
  }

  if (!user) {
    return null
  }

  return (
    <main className="bg-background min-h-screen py-12">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold">My Dashboard</h1>
          <Button variant="outline" onClick={handleLogout} className="gap-2 bg-transparent">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* User Profile & Stats */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">{user && <ProfileEditor user={user} onUpdate={setUser} />}</div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Account Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <p className="text-primary text-3xl font-bold">{orders.length}</p>
                <p className="text-muted-foreground">Total Orders</p>
              </div>
              <div className="border-t pt-4 text-center">
                <p className="text-primary text-2xl font-bold">
                  ${orders.reduce((sum, order) => sum + ensureNumber(order.total_amount), 0).toFixed(2)}
                </p>
                <p className="text-muted-foreground">Total Spent</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Order History
            </CardTitle>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
              <div className="py-12 text-center">
                <ShoppingBag className="text-muted-foreground mx-auto mb-4 h-12 w-12 opacity-50" />
                <p className="text-muted-foreground mb-4">No orders yet</p>
                <Link href="/products">
                  <Button>Start Shopping</Button>
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-border border-b">
                      <th className="px-4 py-3 text-left font-semibold">Order ID</th>
                      <th className="px-4 py-3 text-left font-semibold">Date</th>
                      <th className="px-4 py-3 text-left font-semibold">Total</th>
                      <th className="px-4 py-3 text-left font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order.id} className="border-border hover:bg-muted border-b transition">
                        <td className="px-4 py-3">#{order.id}</td>
                        <td className="px-4 py-3">{new Date(order.created_at).toLocaleDateString()}</td>
                        <td className="px-4 py-3 font-semibold">${ensureNumber(order.total_amount).toFixed(2)}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`rounded-full px-3 py-1 text-sm font-medium ${
                              order.status === 'completed'
                                ? 'bg-green-100 text-green-800'
                                : order.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {order.status}
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
