'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts'
import { Download } from 'lucide-react'
import { ensureNumber } from '@/lib/utils'
import { useState, useEffect } from 'react'

interface AnalyticsProps {
  orderStats: any[]
}

export default function AdminAnalytics({ orderStats }: AnalyticsProps) {
  const [orders, setOrders] = useState<any[]>([])
  const [salesByDate, setSalesByDate] = useState<any[]>([])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders')
        if (response.ok) {
          const data = await response.json()
          setOrders(data)
          processDateSales(data)
        }
      } catch (error) {
        console.error('Error fetching orders:', error)
      }
    }

    fetchOrders()
  }, [])

  const processDateSales = (data: any[]) => {
    const dateMap = new Map()
    data.forEach(order => {
      const date = new Date(order.created_at).toLocaleDateString()
      const current = dateMap.get(date) || { date, revenue: 0, orders: 0 }
      current.revenue += ensureNumber(order.total_amount)
      current.orders += 1
      dateMap.set(date, current)
    })
    setSalesByDate(Array.from(dateMap.values()).slice(-7))
  }

  const chartData = orderStats.map(stat => ({
    name: stat.status.charAt(0).toUpperCase() + stat.status.slice(1),
    orders: stat.count,
    revenue: stat.total_revenue || 0
  }))

  const colors = ['#6b4423', '#8b5a2b', '#a0826d', '#bf9060', '#d4a574']

  const exportSalesReport = () => {
    const csv = [['Date', 'Orders', 'Revenue'], ...salesByDate.map(d => [d.date, d.orders, `$${d.revenue.toFixed(2)}`])]
      .map(row => row.join(','))
      .join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `sales_report_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  const exportCustomerList = () => {
    const uniqueCustomers = Array.from(new Map(orders.map(o => [o.customer_email, o])).values())
    const csv = [
      ['Name', 'Email', 'Phone', 'Address', 'Total Orders', 'Total Spent'],
      ...uniqueCustomers.map(c => {
        const customerOrders = orders.filter(o => o.customer_email === c.customer_email)
        const totalSpent = customerOrders.reduce((sum, o) => sum + ensureNumber(o.total_amount), 0)
        return [
          c.customer_name,
          c.customer_email,
          c.customer_phone,
          c.customer_address,
          customerOrders.length,
          `$${totalSpent.toFixed(2)}`
        ]
      })
    ]
      .map(row => row.join(','))
      .join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `customer_list_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  return (
    <div className="space-y-6">
      {/* Sales Over Time chart and export buttons */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Sales Over Time (Last 7 Days)</CardTitle>
          <Button onClick={exportSalesReport} size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesByDate}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#6b4423" strokeWidth={2} name="Revenue ($)" />
              <Line type="monotone" dataKey="orders" stroke="#d4a574" strokeWidth={2} name="Orders" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Revenue by Status */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Order Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#6b4423" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Order Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Order Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, orders }) => `${name}: ${orders}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="orders"
                >
                  {colors.map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Stats Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Order Status Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            {chartData.map(stat => (
              <div key={stat.name} className="bg-muted/50 rounded-lg p-4 text-center">
                <p className="text-muted-foreground mb-2 text-sm">{stat.name}</p>
                <p className="text-2xl font-bold">{stat.orders}</p>
                <p className="text-muted-foreground mt-2 text-xs">${ensureNumber(stat.revenue).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Customer export button */}
      <Card>
        <CardHeader>
          <CardTitle>Export Data</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={exportCustomerList} className="gap-2">
            <Download className="h-4 w-4" />
            Export Customer List
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
