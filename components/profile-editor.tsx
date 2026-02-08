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
        setError(data.error || 'Failed to update profile')
        setIsSaving(false)
        return
      }

      const updatedUser = { ...formData }
      setIsEditing(false)
      onUpdate?.(updatedUser)
    } catch {
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
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Profile Information</CardTitle>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)} variant="outline" className='text-(--color-wine-red)' size="sm">
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
          {/* Name */}
          <Field label="Full Name" value={formData.name} editing={isEditing}>
            <input name="name" value={formData.name} onChange={handleChange} className="input" />
          </Field>

          {/* Email (read only) */}
          <Field label="Email" value={formData.email} editing={false} />

          {/* Phone */}
          <Field label="Phone" value={formData.phone} editing={isEditing}>
            <input name="phone" value={formData.phone || ''} onChange={handleChange} className="input" />
          </Field>

          {/* Address Line 1 */}
          <Field label="Address Line 1" value={formData.address_line1} editing={isEditing}>
            <input name="address_line1" value={formData.address_line1 || ''} onChange={handleChange} className="input" />
          </Field>

          {/* Address Line 2 */}
          <Field label="Address Line 2" value={formData.address_line2} editing={isEditing}>
            <input name="address_line2" value={formData.address_line2 || ''} onChange={handleChange} className="input" />
          </Field>

          {/* City */}
          <Field label="City" value={formData.city} editing={isEditing}>
            <input name="city" value={formData.city || ''} onChange={handleChange} className="input" />
          </Field>

          {/* State */}
          <Field label="State" value={formData.state} editing={isEditing}>
            <input name="state" value={formData.state || ''} onChange={handleChange} className="input" />
          </Field>

          {/* Pincode */}
          <Field label="Pincode" value={formData.pincode} editing={isEditing}>
            <input name="pincode" value={formData.pincode || ''} onChange={handleChange} className="input" />
          </Field>
        </div>

        {isEditing && (
          <div className="flex gap-3 pt-4">
            <Button onClick={handleSave} disabled={isSaving} className="gap-2">
              <Check className="h-4 w-4" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button onClick={handleCancel} variant="outline" className="gap-2">
              <X className="h-4 w-4" />
              Cancel
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

/* Reusable Field wrapper */
function Field({ label, value, editing, children }: any) {
  return (
    <div>
      <label className="text-(--color-ivory)/70 mb-1 block text-sm">{label}</label>
      {editing && children ? (
        children
      ) : (
        <p className="text-lg font-semibold">{value || 'Not provided'}</p>
      )}
    </div>
  )
}
