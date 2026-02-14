export default function ShippingReturnsPage() {
  return (
    <section className="min-h-screen bg-(--color-ivory) py-24">
      <div className="mx-auto max-w-5xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-extrabold text-(--color-wine-red) md:text-5xl">
            Shipping, Returns & Exchange Policy
          </h1>
          <p className="mt-4 text-(--color-wine-red)/70">Each Vadānya artefact is handled with care and intention.</p>
        </div>

        <div className="space-y-16 leading-relaxed text-(--color-wine-red)/80">
          {/* Shipping */}
          <div>
            <h2 className="mb-4 text-2xl font-bold">Shipping Policy</h2>
            <ul className="list-disc space-y-3 pl-6">
              <li>Orders are typically shipped within 7–20 days from the date of purchase.</li>
              <li>Dispatch within 7 days is subject to stock availability.</li>
              <li>If additional time is required, customers will be notified.</li>
              <li>Tracking details will be shared once shipped.</li>
              <li>Delivery timelines may vary based on location and logistics partner operations.</li>
            </ul>
          </div>

          {/* Returns */}
          <div>
            <h2 className="mb-4 text-2xl font-bold">Returns & Exchange Policy</h2>
            <ul className="list-disc space-y-3 pl-6">
              <li>Returns or exchanges are accepted within 7 days from the date of receipt.</li>
              <li>Requests are considered only in cases of damaged goods.</li>
              <li>A clear unboxing video (from opening the sealed package to revealing the product) is mandatory.</li>
              <li>Requests without an unboxing video will not be eligible for review.</li>
            </ul>
          </div>

          {/* Conditions */}
          <div>
            <h2 className="mb-4 text-2xl font-bold">Conditions</h2>
            <ul className="list-disc space-y-3 pl-6">
              <li>Products must be unused and returned in original packaging.</li>
              <li>Return instructions will be shared once approved.</li>
              <li>Each case is reviewed individually to ensure fairness and transparency.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
