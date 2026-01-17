"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import LoadingSpinner from "@/components/loading-spinner"
import AdminDashboard from "@/components/admin/admin-dashboard"

const ADMIN_TOKEN = "4rd5tg79999"

export default function AdminPage() {
  const searchParams = useSearchParams()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState(null)

  useEffect(() => {
    const adminToken = searchParams.get("admin")

    if (adminToken === ADMIN_TOKEN) {
      setIsAuthorized(true)
      // Fetch admin data
      const fetchData = async () => {
        try {
          const [productsRes, ordersRes, vendorsRes, statsRes] = await Promise.all([
            fetch("/api/products"),
            fetch("/api/orders"),
            fetch("/api/vendors"),
            fetch("/api/categories"),
          ])

          const products = await productsRes.json()
          const orders = await ordersRes.json()
          const vendors = await vendorsRes.json()

          setDashboardData({
            totalProducts: Array.isArray(products) ? products.length : 0,
            totalOrders: Array.isArray(orders) ? orders.length : 0,
            totalVendors: Array.isArray(vendors) ? vendors.length : 0,
            orderStats: [],
          })
        } catch (error) {
          console.error("Failed to fetch admin data:", error)
        } finally {
          setIsLoading(false)
        }
      }

      fetchData()
    } else {
      setIsLoading(false)
    }
  }, [searchParams])

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (!isAuthorized) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-100 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-3xl font-bold text-amber-900 mb-4">Access Denied</h1>
          <p className="text-amber-700 mb-6">
            You don't have permission to access the admin panel. Please contact the administrator.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-gradient-to-r from-amber-600 to-yellow-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
          >
            Return to Home
          </a>
        </div>
      </main>
    )
  }

  return <main>{dashboardData && <AdminDashboard data={dashboardData} />}</main>
}
