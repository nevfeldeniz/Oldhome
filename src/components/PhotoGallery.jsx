import { useMemo } from 'react'
import { useSite } from '../context/SiteContext'
import OptimizedImage from './ui/OptimizedImage'

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
    <section id="gallery" className="section-cream" aria-labelledby="gallery-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <header className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow justify-center">Foto Galeri</p>
          <h2 id="gallery-heading" className="mt-3 text-3xl font-semibold text-wine-dark sm:text-4xl">
            Mekânımızdan kareler
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink/65">
            Odalarımızdan dış mekânlarımıza kadar tesisimizi keşfedin.
          </p>
        </header>

        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {images.map((image, index) => (
            <figure key={image.src} className="card-booking group">
              <OptimizedImage
                src={image.src}
                alt={image.alt || `Old Home Guest House Cyprus photo gallery image ${index + 1}`}
                width={800}
                height={600}
                sizes="(max-width: 1024px) 50vw, 33vw"
                className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
              {image.label && (
                <figcaption className="px-4 py-3 text-xs font-medium text-ink/60">{image.label}</figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
