'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Globe } from 'lucide-react'
import { signInWithGoogle } from '@/lib/auth-client'

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    setError('')

    try {
      await signInWithGoogle()
      // After Google sign-in, backend should create user if new
      router.push('/products')
    } catch (err: any) {
      setError(
        err.code === 'auth/popup-closed-by-user'
          ? 'Sign-up was cancelled'
          : 'Google sign-up failed. Please try again.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="bg-(--color-ivory) flex min-h-screen items-center justify-center py-12">
      <div className="w-full max-w-md px-6">
        <Card className="border-(--color-wine-red)/30 bg-(--color-ivory) shadow-lg">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-3xl font-serif text-(--color-wine-red)">
              Join the Collective
            </CardTitle>
            <p className="mt-2 text-(--color-wine-red)/70">
              Create your Heritage Collective account
            </p>
          </CardHeader>

          <CardContent className="pt-6 space-y-8">
            {error && (
              <div className="rounded-lg bg-red-50/80 border border-red-200 p-4 text-sm text-red-800">
                {error}
              </div>
            )}

            <Button
              variant="default"
              size="lg"
              className="w-full gap-3 bg-(--color-wine-red) hover:bg-(--color-wine-red)/90 text-(--color-ivory) font-medium shadow-sm"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
            >
              <Globe className="h-5 w-5" />
              {isLoading ? 'Connecting...' : 'Sign up with Google'}
            </Button>

            <p className="text-center text-sm text-(--color-wine-red)/70">
              Already have an account?{' '}
              <Link
                href="/auth/login"
                className="font-medium text-(--color-wine-red) hover:underline"
              >
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}