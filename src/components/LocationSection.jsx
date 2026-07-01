import { ExternalLink, MapPin } from 'lucide-react'
import { useSite } from '../context/SiteContext'
import { getMapsEmbedUrl, getMapsOpenUrl } from '../utils/maps'
import { SectionIntro } from './Section'

export default function LocationSection() {
  const { site } = useSite()
  const { contact } = site
  const placeName = contact.placeName || 'Old Home Guest House'
  const mapsOpenUrl = getMapsOpenUrl(contact)

  return (
    <section id="location" className="section-cream" aria-labelledby="location-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <SectionIntro
          id="location-heading"
          eyebrow={
            <>
              <MapPin className="h-4 w-4" aria-hidden />
              Konum
            </>
          }
          title="Bizi ziyaret edin"
          subtitle="Kıbrıs'ta merkezi ve ulaşımı kolay bir konumda yer almaktadır."
        >
          <p className="mt-3 font-serif text-lg font-semibold text-wine-dark">{placeName}</p>
          <p className="mt-1 text-sm text-ink/60">{contact.address}</p>
          <a
            href={mapsOpenUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-wine hover:underline"
          >
            Google Maps&apos;te aç
            <ExternalLink className="h-4 w-4" aria-hidden />
          </a>
        </SectionIntro>

        <div className="card-booking mt-10 overflow-hidden">
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
