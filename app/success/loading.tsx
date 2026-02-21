import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-(--color-ivory)">
      <Loader2 className="h-12 w-12 animate-spin text-(--color-wine-red)" />
      <p className="text-lg font-medium text-(--color-wine-red)/70">Loading your order details...</p>
    </div>
  )
}
