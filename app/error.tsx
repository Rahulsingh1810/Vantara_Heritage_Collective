'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <main>
      <div className="bg-[var(--color-wine-red)] py-12 text-[var(--color-ivory)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Something went wrong</h1>
        </div>
      </div>

      <section className="bg-background flex min-h-96 items-center justify-center py-20">
        <div className="mx-auto max-w-md px-4 text-center">
          <div className="mb-6 text-6xl">⚠️</div>
          <h2 className="mb-4 text-2xl font-bold">Oops! An error occurred</h2>
          <p className="text-muted-foreground mb-8">
            Something unexpected happened. Please try again or contact support if the problem persists.
          </p>
          <div className="flex justify-center gap-4">
            <Button onClick={() => reset()}>Try Again</Button>
            <Button variant="outline" onClick={() => (window.location.href = '/')}>
              Go Home
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
