import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { rooms } from '@/lib/transforming-data'

export const dynamic = 'force-static'

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
      <div className="mx-auto max-w-7xl px-4">
        {/* Back link */}
        <Link href="/transforming-spaces" className="mb-8 inline-block text-(--color-wine-red) hover:underline">
          ← Back to all inspirations
        </Link>

        <div className="mx-auto max-w-6xl">
          <h1 className="mb-16 text-4xl font-bold text-(--color-wine-red) md:text-5xl">{room.title}</h1>

          {/* ================= Summer Soirée ================= */}

          {(room.summerSoireeImg || room.summerSoireeTitle) && (
            <section className="mb-20">
              <div className="grid items-center gap-16 lg:grid-cols-[460px_1fr]">
                {/* Image */}
                {room.summerSoireeImg && (
                  <div className="overflow-hidden rounded-3xl shadow-2xl">
                    <Image
                      src={room.summerSoireeImg}
                      alt={room.summerSoireeTitle}
                      width={1200}
                      height={1600}
                      priority
                      className="h-auto w-full"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="flex flex-col justify-center">
                  <h2 className="mb-6 text-3xl font-semibold text-(--color-wine-red) md:text-4xl">
                    {room.summerSoireeTitle}
                  </h2>

                  <p className="text-lg leading-8 text-(--color-wine-red)/75">{room.summerSoireeText}</p>
                </div>
              </div>
            </section>
          )}

          {/* Divider */}
          {room.beguilingBlueTitle && <div className="mb-20 h-px bg-(--color-wine-red)/20" />}

          {/* ================= Beguiling Blue ================= */}

          {room.beguilingBlueTitle && (
            <section>
              <div className="grid items-center gap-16 lg:grid-cols-[1fr_460px]">
                {/* Content */}
                <div className="order-2 flex flex-col justify-center lg:order-1">
                  <h2 className="mb-6 text-3xl font-semibold text-(--color-wine-red) md:text-4xl">
                    {room.beguilingBlueTitle}
                  </h2>

                  <p className="text-lg leading-8 text-(--color-wine-red)/75">{room.beguilingBlueText}</p>
                </div>

                {/* Image */}
                {room.beguilingBlueImg && (
                  <div className="order-1 overflow-hidden rounded-3xl shadow-2xl lg:order-2">
                    <Image
                      src={room.beguilingBlueImg}
                      alt={room.beguilingBlueTitle}
                      width={1200}
                      height={1600}
                      className="h-auto w-full"
                    />
                  </div>
                )}
              </div>
            </section>
          )}
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
