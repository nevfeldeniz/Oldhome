import { resolveAsset } from '../utils/storage'

/**
 * Profesyonel otel galerisi — mobilde 1 sütun, masaüstünde en fazla 3 sütun.
 * Hover zoom yalnızca md+ ekranlarda aktif.
 */
export default function RoomGallery({ gallery, className = '' }) {
  if (!gallery?.images?.length) return null

  return (
    <section id={gallery.id} className={className}>
      <h4 className="mb-4 font-serif text-lg font-semibold text-wine-dark">
        {gallery.title} — Photo Gallery
      </h4>

      <div className="gallery grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {gallery.images.map((image, index) => (
          <figure
            key={image.src}
            className="group overflow-hidden rounded-2xl border border-wine/10 bg-cream"
          >
            <img
              src={resolveAsset(image.src)}
              alt={image.alt}
              loading="lazy"
              decoding="async"
              className="h-auto w-full object-cover transition-transform duration-500 md:group-hover:scale-105"
            />
            {index === 0 && (
              <figcaption className="px-3 py-2 text-xs text-ink/50">
                Main view
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </section>
  )
}
