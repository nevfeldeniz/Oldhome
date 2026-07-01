import { useMemo } from 'react'
import { useSite } from '../context/SiteContext'

export default function PhotoGallery() {
  const { site } = useSite()

  const images = useMemo(() => {
    const seen = new Set()
    const items = []

    for (const item of site.outdoorGallery || []) {
      if (!item?.src || seen.has(item.src)) continue
      seen.add(item.src)
      items.push(item)
    }

    for (const item of site.gallery || []) {
      if (!item?.src || seen.has(item.src)) continue
      seen.add(item.src)
      items.push(item)
    }

    return items
  }, [site.outdoorGallery, site.gallery])

  if (!images.length) return null

  return (
    <section id="gallery" className="bg-sand py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow justify-center">Foto Galeri</p>
          <h2 className="mt-3 text-3xl font-semibold text-wine-dark sm:text-4xl">Mekânımızdan kareler</h2>
          <p className="mt-3 text-base text-ink/70">
            Odalarımızdan dış mekânlarımıza kadar tesisimizi keşfedin.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {images.map((image, index) => (
            <figure
              key={image.src}
              className="group overflow-hidden rounded-xl border border-wine/10 bg-cream"
            >
              <img
                src={image.src}
                alt={image.alt || `Old Home Guest House galeri ${index + 1}`}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
              {image.label && (
                <figcaption className="px-3 py-2 text-xs font-medium text-ink/60">{image.label}</figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
