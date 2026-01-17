import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main>
      <div className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Page Not Found</h1>
        </div>
      </div>

      <section className="py-20 bg-background flex items-center justify-center min-h-96">
        <div className="max-w-md mx-auto text-center px-4">
          <div className="text-6xl font-bold text-primary mb-6">404</div>
          <h2 className="text-2xl font-bold mb-4">Oops! Page not found</h2>
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
