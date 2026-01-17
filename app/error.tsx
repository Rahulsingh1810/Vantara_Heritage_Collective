"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error)
  }, [error])

  return (
    <main>
      <div className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Something went wrong</h1>
        </div>
      </div>

      <section className="py-20 bg-background flex items-center justify-center min-h-96">
        <div className="max-w-md mx-auto text-center px-4">
          <div className="text-6xl mb-6">⚠️</div>
          <h2 className="text-2xl font-bold mb-4">Oops! An error occurred</h2>
          <p className="text-muted-foreground mb-8">
            Something unexpected happened. Please try again or contact support if the problem persists.
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => reset()}>Try Again</Button>
            <Button variant="outline" onClick={() => (window.location.href = "/")}>
              Go Home
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
