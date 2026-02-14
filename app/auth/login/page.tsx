'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Globe } from 'lucide-react'
import { useUser } from '@/lib/user-context'
import { signInWithGoogle } from '@/lib/auth-client'
import { firebaseLogin } from '@/lib/firebase-login'

export default function LoginPage() {
  const router = useRouter()
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
      router.push('/products')
    } catch (err: any) {
      setError(
        err.code === 'auth/popup-closed-by-user' ? 'Sign-in was cancelled' : 'Google sign-in failed. Please try again.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-(--color-ivory) py-12">
      <div className="w-full max-w-md px-6">
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
              variant="default"
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
              <Link href="/auth/register" className="font-medium text-(--color-wine-red) hover:underline">
                Create one
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
