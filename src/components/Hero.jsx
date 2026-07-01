import { BedDouble } from 'lucide-react'
import { useSite } from '../context/SiteContext'
import { getWhatsAppUrl } from '../utils/whatsapp'
import WhatsAppIcon from './WhatsAppIcon'

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
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/35 to-black/15" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/10" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-4xl px-4 pb-14 pt-28 text-center sm:px-8 sm:pb-20 sm:pt-36">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-white/75">
          Köşklüçiftlik · Lefkoşa, Kıbrıs
        </p>

        <h1 className="font-serif text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl">
          Old Home Guest House
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-lg font-normal leading-relaxed text-white/90 sm:text-xl">
          Konforlu konaklama, sıcak bir yuva hissi
        </p>

        <div className="mx-auto mt-10 flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-cta">
            <WhatsAppIcon />
            WhatsApp ile Rezervasyon
          </a>
          <a href="#rooms" className="btn-hero-secondary">
            <BedDouble className="h-5 w-5" />
            Odaları Gör
          </a>
        </div>
      </div>
    </section>
  )
}
