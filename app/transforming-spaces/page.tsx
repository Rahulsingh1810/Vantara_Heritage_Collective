'use client'

import { RoomInspirationMasterDetail } from './room-inspiration'
import { DesignTipsMasterDetail } from './tips'

export default function Page() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-(--color-wine-red) py-16 text-(--color-ivory) md:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">Transforming Spaces with Heritage</h1>
          <p className="text-lg opacity-90 md:text-xl">
            Learn how to create stunning, culturally rich environments with traditional artifacts.
          </p>
        </div>
      </section>

      {/* Room Inspirations */}
      <RoomInspirationMasterDetail />

      {/* Design Tips */}
      <DesignTipsMasterDetail />
    </main>
  )
}
