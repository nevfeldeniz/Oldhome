import { BedDouble, MessageCircle } from 'lucide-react'
import { useSite } from '../context/SiteContext'
import { getWhatsAppUrl } from '../utils/whatsapp'

const FALLBACK_HERO = `${import.meta.env.BASE_URL}oldhome-cyprus-hotel-exterior.jpg`

export default function Hero() {
  const { site } = useSite()
  const { hero, contact, social } = site
  const heroImage = hero.image || FALLBACK_HERO
  const whatsappUrl = getWhatsAppUrl(
    social?.whatsapp || contact.phoneLinks[0],
    social?.whatsappMessage,
  )

  return (
    <section id="home" className="relative flex min-h-[88vh] items-end sm:min-h-screen sm:items-center">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Old Home Guest House dış cephe ve teras görünümü"
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/85 via-charcoal-900/45 to-charcoal-900/25" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-4xl px-4 pb-12 pt-28 text-center sm:px-8 sm:pb-20 sm:pt-32">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-cream/80">
          Köşklüçiftlik · Lefkoşa, Kıbrıs
        </p>

        <h1 className="font-serif text-4xl font-semibold leading-tight text-cream sm:text-5xl md:text-6xl">
          Old Home Guest House
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-lg font-medium leading-relaxed text-cream/90 sm:text-xl">
          Konforlu konaklama, sıcak bir yuva hissi
        </p>

        <div className="mx-auto mt-8 flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp w-full sm:w-auto"
          >
            <MessageCircle className="h-5 w-5" />
            WhatsApp ile Rezervasyon
          </a>
          <a href="#rooms" className="btn-hero-secondary w-full sm:w-auto">
            <BedDouble className="h-5 w-5" />
            Odaları Gör
          </a>
        </div>
      </div>
    </section>
  )
}
