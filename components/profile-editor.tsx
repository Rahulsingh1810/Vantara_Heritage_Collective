'use client'

import type React from 'react'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, X } from 'lucide-react'

interface ProfileEditorProps {
  user: {
    id: number
    email: string
    name: string
    phone?: string
    address?: string
    city?: string
    state?: string
    zip?: string
  }
  onUpdate?: (user: any) => void
}

export default function ProfileEditor({ user, onUpdate }: ProfileEditorProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState(user)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSave = async () => {
    setIsSaving(true)
    setError('')

    try {
      const response = await fetch('/api/auth/update-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zip: formData.zip
        })
      })

      if (!response.ok) {
        const data = await response.json()
        setError(data.error || 'Failed to update profile')
        setIsSaving(false)
        return
      }

      const data = await response.json()
      setFormData(data.user)
      setIsEditing(false)
      onUpdate?.(data.user)
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setFormData(user)
    setIsEditing(false)
    setError('')
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Profile Information</CardTitle>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)} variant="outline" size="sm" className="bg-transparent">
            Edit
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <div className="bg-destructive/10 border-destructive/30 text-destructive rounded border p-3 text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Full Name */}
          <div>
            <label className="text-muted-foreground mb-1 block text-sm">Full Name</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border-border focus:ring-primary w-full rounded-lg border px-3 py-2 focus:ring-2 focus:outline-none"
              />
            ) : (
              <p className="text-lg font-semibold">{formData.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-muted-foreground mb-1 block text-sm">Email</label>
            <p className="text-lg font-semibold">{formData.email}</p>
          </div>

          {/* Phone */}
          <div>
            <label className="text-muted-foreground mb-1 block text-sm">Phone</label>
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={formData.phone || ''}
                onChange={handleChange}
                className="border-border focus:ring-primary w-full rounded-lg border px-3 py-2 focus:ring-2 focus:outline-none"
              />
            ) : (
              <p className="text-lg font-semibold">{formData.phone || 'Not provided'}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="text-muted-foreground mb-1 block text-sm">Address</label>
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={formData.address || ''}
                onChange={handleChange}
                className="border-border focus:ring-primary w-full rounded-lg border px-3 py-2 focus:ring-2 focus:outline-none"
              />
            ) : (
              <p className="text-lg font-semibold">{formData.address || 'Not provided'}</p>
            )}
          </div>

          {/* City */}
          <div>
            <label className="text-muted-foreground mb-1 block text-sm">City</label>
            {isEditing ? (
              <input
                type="text"
                name="city"
                value={formData.city || ''}
                onChange={handleChange}
                className="border-border focus:ring-primary w-full rounded-lg border px-3 py-2 focus:ring-2 focus:outline-none"
              />
            ) : (
              <p className="text-lg font-semibold">{formData.city || 'Not provided'}</p>
            )}
          </div>

          {/* State */}
          <div>
            <label className="text-muted-foreground mb-1 block text-sm">State</label>
            {isEditing ? (
              <input
                type="text"
                name="state"
                value={formData.state || ''}
                onChange={handleChange}
                className="border-border focus:ring-primary w-full rounded-lg border px-3 py-2 focus:ring-2 focus:outline-none"
              />
            ) : (
              <p className="text-lg font-semibold">{formData.state || 'Not provided'}</p>
            )}
          </div>

          {/* ZIP */}
          <div>
            <label className="text-muted-foreground mb-1 block text-sm">ZIP Code</label>
            {isEditing ? (
              <input
                type="text"
                name="zip"
                value={formData.zip || ''}
                onChange={handleChange}
                className="border-border focus:ring-primary w-full rounded-lg border px-3 py-2 focus:ring-2 focus:outline-none"
              />
            ) : (
              <p className="text-lg font-semibold">{formData.zip || 'Not provided'}</p>
            )}
          </div>
        </div>

        {isEditing && (
          <div className="flex gap-3 pt-4">
            <Button onClick={handleSave} disabled={isSaving} className="gap-2">
              <Check className="h-4 w-4" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button onClick={handleCancel} variant="outline" className="gap-2 bg-transparent">
              <X className="h-4 w-4" />
              Cancel
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
