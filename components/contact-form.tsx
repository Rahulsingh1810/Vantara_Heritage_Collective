'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok && data.success) {
        toast.success('Message sent successfully!')
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        })
      } else {
        toast.error(data.error || 'Failed to send message. Please try again.')
      }
    } catch (error) {
      console.error('Contact form submission error:', error)
      toast.error('An unexpected error occurred. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-(--color-wine-red)">Name</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            className="w-full rounded-lg border border-(--color-wine-red)/25 bg-(--color-ivory) px-4 py-2 text-(--color-wine-red) placeholder:text-(--color-wine-red)/50 focus:border-(--color-wine-red) focus:ring-2 focus:ring-(--color-wine-red)/40 focus:outline-none"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-(--color-wine-red)">Email</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            className="w-full rounded-lg border border-(--color-wine-red)/25 bg-(--color-ivory) px-4 py-2 text-(--color-wine-red) placeholder:text-(--color-wine-red)/50 focus:border-(--color-wine-red) focus:ring-2 focus:ring-(--color-wine-red)/40 focus:outline-none"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-(--color-wine-red)">Subject</label>
        <input
          type="text"
          required
          value={formData.subject}
          onChange={e => setFormData({ ...formData, subject: e.target.value })}
          className="w-full rounded-lg border border-(--color-wine-red)/25 bg-(--color-ivory) px-4 py-2 text-(--color-wine-red) placeholder:text-(--color-wine-red)/50 focus:border-(--color-wine-red) focus:ring-2 focus:ring-(--color-wine-red)/40 focus:outline-none"
          placeholder="Topic of inquiry"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-(--color-wine-red)">Message</label>
        <textarea
          rows={5}
          required
          value={formData.message}
          onChange={e => setFormData({ ...formData, message: e.target.value })}
          className="w-full resize-none rounded-lg border border-(--color-wine-red)/25 bg-(--color-ivory) px-4 py-2 text-(--color-wine-red) placeholder:text-(--color-wine-red)/50 focus:border-(--color-wine-red) focus:ring-2 focus:ring-(--color-wine-red)/40 focus:outline-none"
          placeholder="Your message..."
        />
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        size="lg"
        className="w-full bg-(--color-wine-red) text-(--color-ivory) hover:bg-(--color-wine-red)/90"
      >
        {isLoading ? 'Sending Message...' : 'Send Message'}
      </Button>
    </form>
  )
}
