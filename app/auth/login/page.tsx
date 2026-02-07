'use client'

import type React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertCircle, LogIn, Globe } from 'lucide-react'
import { useUser } from '@/lib/user-context'
import { signInWithGoogle } from '@/lib/auth-client'
import { firebaseLogin } from '@/lib/firebase-login'

export default function LoginPage() {
  const router = useRouter()
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
      router.push('/products')
    } catch (err) {
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
      await firebaseLogin(idToken) // this sets the cookie via backend
      await refetchUser()
      router.push('/products')
    } catch (err: any) {
      setError(
        err.code === 'auth/popup-closed-by-user' ? 'Sign-in was cancelled' : 'Google sign-in failed. Please try again.'
      )
    } finally {
      setGoogleLoading(false)
    }
  }

  return (
    <main className="bg-background flex min-h-screen items-center justify-center py-12">
      <div className="w-full max-w-md px-4">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="mb-2 text-3xl">Welcome Back</CardTitle>
            <p className="text-muted-foreground">Sign in to your Heritage Collective account</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-destructive/10 border-destructive/30 flex gap-3 rounded-lg border p-4">
                  <AlertCircle className="text-destructive mt-0.5 h-5 w-5 flex-shrink-0" />
                  <p className="text-destructive text-sm">{error}</p>
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm font-medium">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border-border focus:ring-primary w-full rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="border-border focus:ring-primary w-full rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none"
                  placeholder="••••••••"
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
              disabled={googleLoading || isLoading}
            >
              <Globe className="h-5 w-5" />
              {googleLoading ? 'Connecting...' : 'Sign in with Google'}
            </Button>

            <p className="text-muted-foreground mt-6 text-center text-sm">
              Don't have an account?{' '}
              <Link href="/auth/register" className="text-primary font-medium hover:underline">
                Create one
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
