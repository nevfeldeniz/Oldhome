import { ArrowRight } from 'lucide-react'
import { useSite } from '../context/SiteContext'

export default function FeaturedRooms() {
  const { site } = useSite()
  const featured = site.showcaseRooms.slice(0, 3)

  return (
    <section id="rooms" className="section-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow justify-center">Odalarımız</p>
          <h2 className="mt-3 text-3xl font-semibold text-wine-dark sm:text-4xl">Konforlu odalarımız</h2>
          <p className="mt-4 text-base leading-relaxed text-ink/65">
            Temiz, ferah ve huzurlu odalarımızdan size en uygun olanı seçin.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((room, index) => (
            <article key={room.id} className="card-booking flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={room.images[0]}
                  alt={`Oda ${index + 1} - Old Home Guest House`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-semibold text-wine-dark">Oda {index + 1}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/65 line-clamp-2">
                  {room.description.split('.')[0]}.
                </p>
                <a href="#room-showcase" className="btn-outline mt-6 w-full sm:w-auto">
                  Detayları Gör
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
