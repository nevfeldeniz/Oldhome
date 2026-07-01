import { resolveAsset } from '../utils/storage'
import OptimizedImage from './ui/OptimizedImage'

/**
 * Profesyonel otel galerisi — mobilde 1 sütun, masaüstünde en fazla 3 sütun.
 */
export default function RoomGallery({ gallery, className = '' }) {
  if (!gallery?.images?.length) return null

  return (
    <section id={gallery.id} className={className} aria-labelledby={`${gallery.id}-heading`}>
      <h4 id={`${gallery.id}-heading`} className="mb-4 font-serif text-lg font-semibold text-wine-dark">
        {gallery.title} — Photo Gallery
      </h4>

      <div className="gallery grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {gallery.images.map((image, index) => (
          <figure key={image.src} className="card-booking group">
            <OptimizedImage
              src={resolveAsset(image.src)}
              alt={image.alt}
              width={800}
              height={600}
              className="h-auto w-full object-cover transition-transform duration-500 md:group-hover:scale-105"
            />
            {index === 0 && (
              <figcaption className="px-3 py-2 text-xs text-ink/50">Main view</figcaption>
            )}
          </figure>
        ))}
      </div>
    </section>
  )
}
