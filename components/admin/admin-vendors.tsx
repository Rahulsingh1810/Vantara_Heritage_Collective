'use client'

import type React from 'react'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Trash2, Edit2 } from 'lucide-react'
import type { Vendor } from '@/lib/types'

export default function AdminVendors() {
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image_url: ''
  })

  useEffect(() => {
    fetchVendors()
  }, [])

  const fetchVendors = async () => {
    try {
      const response = await fetch('/api/vendors')
      const data = await response.json()
      setVendors(data)
    } catch (error) {
      console.error('Error fetching vendors:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const method = editingId ? 'PUT' : 'POST'
      const url = editingId ? `/api/vendors/${editingId}` : '/api/vendors'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setFormData({ name: '', description: '', image_url: '' })
        setShowForm(false)
        setEditingId(null)
        fetchVendors()
      }
    } catch (error) {
      console.error('Error saving vendor:', error)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this vendor?')) return

    try {
      const response = await fetch(`/api/vendors/${id}`, { method: 'DELETE' })
      if (response.ok) {
        fetchVendors()
      }
    } catch (error) {
      console.error('Error deleting vendor:', error)
    }
  }

  const handleEdit = (vendor: Vendor) => {
    setFormData({
      name: vendor.name,
      description: vendor.description,
      image_url: vendor.image_url
    })
    setEditingId(vendor.id)
    setShowForm(true)
  }

  if (loading) {
    return <div className="py-12 text-center">Loading vendors...</div>
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Vendors Management</CardTitle>
          <Button onClick={() => setShowForm(!showForm)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Vendor
          </Button>
        </CardHeader>

        {showForm && (
          <CardContent className="border-t pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Vendor Name"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="border-border w-full rounded-lg border px-3 py-2"
                required
              />
              <input
                type="url"
                placeholder="Image URL"
                value={formData.image_url}
                onChange={e => setFormData({ ...formData, image_url: e.target.value })}
                className="border-border w-full rounded-lg border px-3 py-2"
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                className="border-border w-full rounded-lg border px-3 py-2"
                rows={3}
              />
              <div className="flex gap-2">
                <Button type="submit">{editingId ? 'Update Vendor' : 'Create Vendor'}</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowForm(false)
                    setEditingId(null)
                    setFormData({ name: '', description: '', image_url: '' })
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        )}
      </Card>

      {/* Vendors Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-border border-b">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold">Name</th>
                  <th className="px-6 py-3 text-left font-semibold">Description</th>
                  <th className="px-6 py-3 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {vendors.map(vendor => (
                  <tr key={vendor.id} className="border-border hover:bg-muted/50 border-b">
                    <td className="px-6 py-4 font-medium">{vendor.name}</td>
                    <td className="text-muted-foreground line-clamp-1 px-6 py-4 text-sm">{vendor.description}</td>
                    <td className="flex gap-2 px-6 py-4">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(vendor)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(vendor.id)}>
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
