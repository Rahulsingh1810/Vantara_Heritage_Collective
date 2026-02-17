import { notFound } from 'next/navigation'
import Image from 'next/image'
import { rooms } from '@/lib/transforming-data' // adjust path

interface Props {
  params: Promise<{ slug: string }>
}

export default async function RoomDetailPage({ params }: Props) {
  const { slug } = await params

  const room = rooms.find(r => r.slug === slug)

  if (!room) {
    notFound()
  }

  return (
    <main className="bg-background min-h-screen py-12 md:py-20">
      <div className="mx-auto max-w-5xl px-4">
        {/* Back link */}
        <a href="/transforming-spaces" className="mb-8 inline-block text-(--color-wine-red) hover:underline">
          ← Back to all inspirations
        </a>

        {/* Main Image */}
        <div className="relative mb-10 aspect-[16/9] w-full overflow-hidden rounded-3xl shadow-2xl">
          <Image src={room.mainImg} alt={room.title} fill className="object-fill" priority />
        </div>

        {/* Content */}
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-6 text-4xl font-bold text-(--color-wine-red) md:text-5xl">{room.title}</h1>

          <p className="mb-10 text-lg leading-relaxed text-(--color-wine-red)/80">{room.thumbnailText}</p>

          <div className="my-10 h-px bg-(--color-wine-red)/20" />

          <h2 className="mb-6 text-2xl font-semibold text-(--color-wine-red)">{room.summerSoireeTitle}</h2>

          <p className="text-lg leading-relaxed text-(--color-wine-red)/75">{room.summerSoireeText}</p>
        </div>
      </div>
    </main>
  )
}

// Optional: generate static params for better performance (SSG)
export async function generateStaticParams() {
  return rooms.map(room => ({
    slug: room.slug
  }))
}
