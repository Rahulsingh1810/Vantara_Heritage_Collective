'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, X } from 'lucide-react'

interface UserProfile {
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

interface ProfileEditorProps {
  user: UserProfile
  onUpdate?: (user: UserProfile) => void
}

export default function ProfileEditor({ user, onUpdate }: ProfileEditorProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState<UserProfile>(user)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSave = async () => {
    setIsSaving(true)
    setError('')

    try {
      const response = await fetch('/api/customer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          address_line1: formData.address_line1,
          address_line2: formData.address_line2,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          country: formData.country || 'India'
        })
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to update profile')
      }

      setIsEditing(false)
      onUpdate?.({ ...formData })
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
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
    <Card className="border-(--color-wine-red)/30 bg-(--color-ivory) shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-6">
        <CardTitle className="text-(--color-wine-red)">Profile Information</CardTitle>
        {!isEditing && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="border-(--color-wine-red) text-(--color-ivory) hover:bg-(--color-wine-red) hover:text-(--color-ivory)"
          >
            Edit
          </Button>
        )}
      </CardHeader>

      <CardContent>
        {error && (
          <div className="border-destructive/30 bg-destructive/10 text-destructive mb-6 rounded border p-4 text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Left column */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-(--color-wine-red)/70">Full Name</label>
              {isEditing ? (
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border border-(--color-wine-red)/40 bg-(--color-ivory) px-4 py-2.5 text-(--color-wine-red) focus:border-(--color-wine-red) focus:ring-1 focus:ring-(--color-wine-red) focus:outline-none"
                />
              ) : (
                <p className="mt-1 text-lg font-medium text-(--color-wine-red)">{formData.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-(--color-wine-red)/70">Phone</label>
              {isEditing ? (
                <input
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border border-(--color-wine-red)/40 bg-(--color-ivory) px-4 py-2.5 text-(--color-wine-red) focus:border-(--color-wine-red) focus:ring-1 focus:ring-(--color-wine-red) focus:outline-none"
                />
              ) : (
                <p className="mt-1 text-lg font-medium text-(--color-wine-red)">{formData.phone || 'Not provided'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-(--color-wine-red)/70">Address Line 2</label>
              {isEditing ? (
                <input
                  name="address_line2"
                  value={formData.address_line2 || ''}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border border-(--color-wine-red)/40 bg-(--color-ivory) px-4 py-2.5 text-(--color-wine-red) focus:border-(--color-wine-red) focus:ring-1 focus:ring-(--color-wine-red) focus:outline-none"
                />
              ) : (
                <p className="mt-1 text-lg font-medium text-(--color-wine-red)">
                  {formData.address_line2 || 'Not provided'}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-(--color-wine-red)/70">State</label>
              {isEditing ? (
                <input
                  name="state"
                  value={formData.state || ''}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border border-(--color-wine-red)/40 bg-(--color-ivory) px-4 py-2.5 text-(--color-wine-red) focus:border-(--color-wine-red) focus:ring-1 focus:ring-(--color-wine-red) focus:outline-none"
                />
              ) : (
                <p className="mt-1 text-lg font-medium text-(--color-wine-red)">{formData.state || 'Not provided'}</p>
              )}
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-(--color-wine-red)/70">Email</label>
              <p className="mt-1 text-lg font-medium text-(--color-wine-red)">{formData.email}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-(--color-wine-red)/70">Address Line 1</label>
              {isEditing ? (
                <input
                  name="address_line1"
                  value={formData.address_line1 || ''}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border border-(--color-wine-red)/40 bg-(--color-ivory) px-4 py-2.5 text-(--color-wine-red) focus:border-(--color-wine-red) focus:ring-1 focus:ring-(--color-wine-red) focus:outline-none"
                />
              ) : (
                <p className="mt-1 text-lg font-medium text-(--color-wine-red)">
                  {formData.address_line1 || 'Not provided'}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-(--color-wine-red)/70">City</label>
              {isEditing ? (
                <input
                  name="city"
                  value={formData.city || ''}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border border-(--color-wine-red)/40 bg-(--color-ivory) px-4 py-2.5 text-(--color-wine-red) focus:border-(--color-wine-red) focus:ring-1 focus:ring-(--color-wine-red) focus:outline-none"
                />
              ) : (
                <p className="mt-1 text-lg font-medium text-(--color-wine-red)">{formData.city || 'Not provided'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-(--color-wine-red)/70">Pincode</label>
              {isEditing ? (
                <input
                  name="pincode"
                  value={formData.pincode || ''}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border border-(--color-wine-red)/40 bg-(--color-ivory) px-4 py-2.5 text-(--color-wine-red) focus:border-(--color-wine-red) focus:ring-1 focus:ring-(--color-wine-red) focus:outline-none"
                />
              ) : (
                <p className="mt-1 text-lg font-medium text-(--color-wine-red)">{formData.pincode || 'Not provided'}</p>
              )}
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="mt-10 flex flex-wrap gap-4">
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="min-w-[140px] bg-(--color-wine-red) hover:bg-(--color-wine-red)/90"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button
              variant="outline"
              onClick={handleCancel}
              className="min-w-[140px] border-(--color-wine-red) text-(--color-wine-red) hover:bg-(--color-wine-red) hover:text-(--color-ivory)"
            >
              Cancel
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
