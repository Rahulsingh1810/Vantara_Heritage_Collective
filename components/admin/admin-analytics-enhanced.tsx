"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, TrendingUp } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

interface OrderData {
  id: number
  customer_name: string
  customer_email: string
  customer_phone: string
  customer_address: string
  total_amount: number
  status: string
  created_at: string
}

export default function AdminAnalyticsEnhanced() {
  const [orders, setOrders] = useState<OrderData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [salesByDate, setSalesByDate] = useState<any[]>([])
  const [salesByStatus, setSalesByStatus] = useState<any[]>([])
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [totalOrders, setTotalOrders] = useState(0)
  const [avgOrderValue, setAvgOrderValue] = useState(0)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orders")
        if (response.ok) {
          const data = await response.json()
          setOrders(data)
          processAnalytics(data)
        }
      } catch (error) {
        console.error("Error fetching orders:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const processAnalytics = (orderData: OrderData[]) => {
    // Calculate total revenue
    const revenue = orderData.reduce((sum, order) => sum + Number.parseFloat(order.total_amount.toString()), 0)
    setTotalRevenue(revenue)
    setTotalOrders(orderData.length)
    setAvgOrderValue(orderData.length > 0 ? revenue / orderData.length : 0)

    // Group sales by date
    const dateMap = new Map()
    orderData.forEach((order) => {
      const date = new Date(order.created_at).toLocaleDateString()
      const current = dateMap.get(date) || { date, sales: 0, count: 0 }
      current.sales += Number.parseFloat(order.total_amount.toString())
      current.count += 1
      dateMap.set(date, current)
    })
    setSalesByDate(Array.from(dateMap.values()).slice(-7))

    // Group sales by status
    const statusMap = new Map()
    orderData.forEach((order) => {
      const current = statusMap.get(order.status) || { name: order.status, value: 0 }
      current.value += 1
      statusMap.set(order.status, current)
    })
    setSalesByStatus(Array.from(statusMap.values()))
  }

  const exportToCSV = (data: any[], filename: string) => {
    const csv = [Object.keys(data[0]).join(","), ...data.map((row) => Object.values(row).join(","))].join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
  }

  const COLORS = ["#8b6f47", "#d4a574", "#c89968", "#e8d4c4"]

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">${totalRevenue.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground mt-2">
              <TrendingUp className="w-4 h-4 inline mr-1" />
              {totalOrders} orders
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">{totalOrders}</p>
            <p className="text-sm text-muted-foreground mt-2">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Average Order Value</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">${avgOrderValue.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground mt-2">Per order</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sales Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesByDate}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#8b6f47" strokeWidth={2} name="Revenue ($)" />
                <Line type="monotone" dataKey="count" stroke="#d4a574" strokeWidth={2} name="Orders" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={salesByStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => entry.name}
                  outerRadius={100}
                  fill="#8b6f47"
                  dataKey="value"
                >
                  {salesByStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Export Buttons */}
      <Card>
        <CardHeader>
          <CardTitle>Export Data</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4 flex-wrap">
          <Button
            onClick={() =>
              exportToCSV(
                orders.map((o) => ({
                  "Order ID": o.id,
                  Date: new Date(o.created_at).toLocaleDateString(),
                  Customer: o.customer_name,
                  Email: o.customer_email,
                  Phone: o.customer_phone,
                  Amount: `$${o.total_amount}`,
                  Status: o.status,
                })),
                "sales_report.csv",
              )
            }
            className="gap-2 bg-primary"
          >
            <Download className="w-4 h-4" />
            Export Sales Report
          </Button>

          <Button
            onClick={() =>
              exportToCSV(
                [...new Map(orders.map((o) => [o.customer_email, o])).values()].map((o) => ({
                  Name: o.customer_name,
                  Email: o.customer_email,
                  Phone: o.customer_phone,
                  Address: o.customer_address,
                  "Total Spent": `$${o.total_amount}`,
                })),
                "customer_list.csv",
              )
            }
            variant="outline"
            className="gap-2 bg-transparent"
          >
            <Download className="w-4 h-4" />
            Export Customer List
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
