import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <main>
      <div className="bg-primary text-primary-foreground py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Page Not Found</h1>
        </div>
      </div>

      <section className="bg-background flex min-h-96 items-center justify-center py-20">
        <div className="mx-auto max-w-md px-4 text-center">
          <div className="text-primary mb-6 text-6xl font-bold">404</div>
          <h2 className="mb-4 text-2xl font-bold">Oops! Page not found</h2>
          <p className="text-muted-foreground mb-8">
            Sorry, the page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
          <Link href="/">
            <Button size="lg">Go Back Home</Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
