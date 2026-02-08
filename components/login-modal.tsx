'use client'

import { useState } from 'react'
import { useUser } from '@/lib/user-context'
import { signInWithGoogle } from '@/lib/auth-client'
import { firebaseLogin } from '@/lib/firebase-login'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, Globe, LogIn, X } from 'lucide-react'

export default function LoginModal({ onClose }: { onClose: () => void }) {
  const { refetchUser } = useUser()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        const data = await response.json()
        setError(data.error || 'Login failed')
        return
      }

      await refetchUser()
      onClose() // close modal after login
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true)
    setError('')

    try {
      const result = await signInWithGoogle()
      const idToken = await result.user.getIdToken()
      await firebaseLogin(idToken)
      await refetchUser()
      onClose()
    } catch {
      setError('Google sign-in failed.')
    } finally {
      setGoogleLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-md">
        <button onClick={onClose} className="absolute -top-10 right-0 text-white">
          <X />
        </button>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Welcome Back</CardTitle>
            <p className="text-muted-foreground">Sign in to continue checkout</p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-destructive/10 border-destructive/30 flex gap-3 rounded-lg border p-4">
                  <AlertCircle className="text-destructive mt-0.5 h-5 w-5" />
                  <p className="text-destructive text-sm">{error}</p>
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm font-medium">Email</label>
                <input
                  name="email"
                  type="email"
                  onChange={handleChange}
                  className="border-border w-full rounded-lg border px-4 py-2"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Password</label>
                <input
                  name="password"
                  type="password"
                  onChange={handleChange}
                  className="border-border w-full rounded-lg border px-4 py-2"
                  required
                />
              </div>

              <Button type="submit" className="w-full gap-2" disabled={isLoading}>
                <LogIn className="h-4 w-4" />
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="border-border w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card text-muted-foreground px-2">Or continue with</span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={handleGoogleSignIn}
              disabled={googleLoading}
            >
              <Globe className="h-5 w-5" />
              {googleLoading ? 'Connecting...' : 'Sign in with Google'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
