import { MapPin } from 'lucide-react'
import { useSite } from '../context/SiteContext'

export default function LocationSection() {
  const { site } = useSite()
  const { contact } = site
  const mapQuery = encodeURIComponent(contact.address)

  return (
    <section id="location" className="bg-cream py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow justify-center">
            <MapPin className="h-4 w-4" />
            Konum
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-wine-dark sm:text-4xl">Bizi ziyaret edin</h2>
          <p className="mt-4 text-base leading-relaxed text-ink/75">
            Kıbrıs&apos;ta merkezi ve ulaşımı kolay bir konumda yer almaktadır.
          </p>
          <p className="mt-2 text-sm text-ink/60">{contact.address}</p>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-wine/15 shadow-lg shadow-wine/10">
          <iframe
            title="Old Home Guest House konumu - Google Maps"
            src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
            className="h-[320px] w-full sm:h-[420px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  )
}
