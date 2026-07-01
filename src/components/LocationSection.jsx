import { ExternalLink, MapPin } from 'lucide-react'
import { useSite } from '../context/SiteContext'
import { getMapsEmbedUrl, getMapsOpenUrl } from '../utils/maps'

export default function LocationSection() {
  const { site } = useSite()
  const { contact } = site
  const placeName = contact.placeName || 'Old Home Guest House'
  const mapsOpenUrl = getMapsOpenUrl(contact)

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
          <p className="mt-3 font-serif text-lg font-semibold text-wine-dark">{placeName}</p>
          <p className="mt-1 text-sm text-ink/60">{contact.address}</p>
          <a
            href={mapsOpenUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-wine hover:underline"
          >
            Google Maps&apos;te aç
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-wine/15 shadow-lg shadow-wine/10">
          <iframe
            title={`${placeName} konumu - Google Maps`}
            src={getMapsEmbedUrl(contact)}
            className="h-[320px] w-full sm:h-[420px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  )
}
