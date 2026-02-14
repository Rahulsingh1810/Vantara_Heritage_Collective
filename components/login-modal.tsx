'use client'

import { useState } from 'react'
import { useUser } from '@/lib/user-context'
import { signInWithGoogle } from '@/lib/auth-client'
import { firebaseLogin } from '@/lib/firebase-login'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Globe, X } from 'lucide-react'

interface LoginModalProps {
  onClose: () => void
}

export default function LoginModal({ onClose }: LoginModalProps) {
  const { refetchUser } = useUser()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    setError('')

    try {
      const result = await signInWithGoogle()
      const idToken = await result.user.getIdToken()
      await firebaseLogin(idToken)
      await refetchUser()
      onClose()
    } catch (err: any) {
      const message =
        err.code === 'auth/popup-closed-by-user' ? 'Sign-in was cancelled' : 'Google sign-in failed. Please try again.'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-1 text-(--color-ivory)/80 transition-colors hover:text-(--color-ivory)"
          aria-label="Close login modal"
        >
          <X className="h-8 w-8" />
        </button>

        <Card className="border-(--color-wine-red)/30 bg-(--color-ivory) shadow-lg">
          <CardHeader className="pb-2 text-center">
            <CardTitle className="font-serif text-3xl text-(--color-wine-red)">Welcome Back</CardTitle>
            <p className="mt-2 text-(--color-wine-red)/70">Sign in to your Heritage Collective account</p>
          </CardHeader>

          <CardContent className="space-y-8 pt-6">
            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50/80 p-4 text-sm text-red-800">{error}</div>
            )}

            <Button
              size="lg"
              className="w-full gap-3 bg-(--color-wine-red) font-medium text-(--color-ivory) shadow-sm hover:bg-(--color-wine-red)/90"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
            >
              <Globe className="h-5 w-5" />
              {isLoading ? 'Connecting...' : 'Sign in with Google'}
            </Button>

            <p className="text-center text-sm text-(--color-wine-red)/70">
              Don't have an account?{' '}
              <a
                href="/auth/register"
                className="font-medium text-(--color-wine-red) hover:underline"
                onClick={e => {
                  e.preventDefault()
                  onClose()
                  window.location.href = '/auth/register'
                }}
              >
                Create one
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
