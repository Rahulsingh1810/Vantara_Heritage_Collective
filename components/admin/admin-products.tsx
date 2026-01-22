'use client'

import type React from 'react'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Trash2, Edit2 } from 'lucide-react'
import type { Product } from '@/lib/types'
import { ensureNumber } from '@/lib/utils'

interface Category {
  id: number
  name: string
}

interface Vendor {
  id: number
  name: string
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category_id: '',
    vendor_id: '',
    image_url: '',
    stock_quantity: ''
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [productsRes, categoriesRes, vendorsRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/categories'),
        fetch('/api/vendors')
      ])

      const productsData = await productsRes.json()
      const categoriesData = await categoriesRes.json()
      const vendorsData = await vendorsRes.json()

      setProducts(productsData)
      setCategories(categoriesData)
      setVendors(vendorsData)
    } catch (error) {
      console.error('Error fetching data:', error)
      setError('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!formData.name || !formData.price || !formData.category_id || !formData.vendor_id) {
      setError('Please fill in all required fields')
      return
    }

    try {
      const method = editingId ? 'PUT' : 'POST'
      const url = editingId ? `/api/products/${editingId}` : '/api/products'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: Number.parseFloat(formData.price),
          category_id: Number.parseInt(formData.category_id),
          vendor_id: Number.parseInt(formData.vendor_id),
          stock_quantity: Number.parseInt(formData.stock_quantity)
        })
      })

      if (response.ok) {
        setFormData({
          name: '',
          description: '',
          price: '',
          category_id: '',
          vendor_id: '',
          image_url: '',
          stock_quantity: ''
        })
        setShowForm(false)
        setEditingId(null)
        fetchData()
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Failed to save product')
      }
    } catch (error) {
      console.error('Error saving product:', error)
      setError('An error occurred while saving the product')
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      const response = await fetch(`/api/products/${id}`, { method: 'DELETE' })
      if (response.ok) {
        fetchData()
      } else {
        setError('Failed to delete product')
      }
    } catch (error) {
      console.error('Error deleting product:', error)
      setError('An error occurred while deleting the product')
    }
  }

  const handleEdit = (product: Product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: ensureNumber(product.price).toString(),
      category_id: product.category_id.toString(),
      vendor_id: product.vendor_id.toString(),
      image_url: product.image_url,
      stock_quantity: product.stock_quantity.toString()
    })
    setEditingId(product.id)
    setShowForm(true)
    setError(null)
  }

  if (loading) {
    return <div className="py-12 text-center">Loading products...</div>
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Products Management</CardTitle>
          <Button onClick={() => setShowForm(!showForm)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </CardHeader>

        {showForm && (
          <CardContent className="border-t pt-6">
            {error && <div className="bg-destructive/10 text-destructive mb-4 rounded-lg p-3">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <input
                  type="text"
                  placeholder="Product Name"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="border-border rounded-lg border px-3 py-2"
                  required
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={formData.price}
                  onChange={e => setFormData({ ...formData, price: e.target.value })}
                  className="border-border rounded-lg border px-3 py-2"
                  required
                  step="0.01"
                />

                <select
                  value={formData.category_id}
                  onChange={e => setFormData({ ...formData, category_id: e.target.value })}
                  className="border-border rounded-lg border px-3 py-2"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>

                <select
                  value={formData.vendor_id}
                  onChange={e => setFormData({ ...formData, vendor_id: e.target.value })}
                  className="border-border rounded-lg border px-3 py-2"
                  required
                >
                  <option value="">Select Vendor</option>
                  {vendors.map(vendor => (
                    <option key={vendor.id} value={vendor.id}>
                      {vendor.name}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  placeholder="Stock Quantity"
                  value={formData.stock_quantity}
                  onChange={e => setFormData({ ...formData, stock_quantity: e.target.value })}
                  className="border-border rounded-lg border px-3 py-2"
                  required
                />
                <input
                  type="url"
                  placeholder="Image URL"
                  value={formData.image_url}
                  onChange={e => setFormData({ ...formData, image_url: e.target.value })}
                  className="border-border rounded-lg border px-3 py-2"
                />
              </div>
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                className="border-border w-full rounded-lg border px-3 py-2"
                rows={3}
              />
              <div className="flex gap-2">
                <Button type="submit">{editingId ? 'Update Product' : 'Create Product'}</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowForm(false)
                    setEditingId(null)
                    setFormData({
                      name: '',
                      description: '',
                      price: '',
                      category_id: '',
                      vendor_id: '',
                      image_url: '',
                      stock_quantity: ''
                    })
                    setError(null)
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        )}
      </Card>

      {/* Products Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-border border-b">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold">Name</th>
                  <th className="px-6 py-3 text-left font-semibold">Price</th>
                  <th className="px-6 py-3 text-left font-semibold">Stock</th>
                  <th className="px-6 py-3 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id} className="border-border hover:bg-muted/50 border-b">
                    <td className="px-6 py-4">{product.name}</td>
                    <td className="px-6 py-4">${ensureNumber(product.price).toFixed(2)}</td>
                    <td className="px-6 py-4">{product.stock_quantity}</td>
                    <td className="flex gap-2 px-6 py-4">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(product)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(product.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
