import { BedDouble } from 'lucide-react'
import { useSite } from '../context/SiteContext'
import { getWhatsAppUrl } from '../utils/whatsapp'
import WhatsAppIcon from './WhatsAppIcon'
import OptimizedImage from './ui/OptimizedImage'

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
    <section id="home" className="relative" aria-label="Welcome">
      {/* Mobilde 16:9 — bina tam genişlikte görünür; masaüstünde tam ekran */}
      <div className="relative aspect-video w-full sm:aspect-auto sm:min-h-screen">
        <OptimizedImage
          src={heroImage}
          alt="Old Home Guest House boutique hotel exterior and terrace in Cyprus"
          width={1920}
          height={1080}
          sizes="100vw"
          priority
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/15" aria-hidden="true" />
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10 sm:from-black/25 sm:to-black/10"
          aria-hidden="true"
        />

        <div className="absolute inset-x-0 bottom-0 z-10 px-4 pb-8 pt-16 text-center sm:inset-0 sm:flex sm:flex-col sm:items-center sm:justify-end sm:px-8 sm:pb-20 sm:pt-32 md:justify-center md:pb-24">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-white/75 sm:mb-4">
            Köşklüçiftlik · Lefkoşa, Kıbrıs
          </p>

          <h1 className="font-serif text-3xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl">
            Old Home Guest House
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base font-normal leading-relaxed text-white/90 sm:mt-5 sm:text-xl">
            Konforlu konaklama, sıcak bir yuva hissi
          </p>

          <div className="mx-auto mt-8 flex w-full max-w-md flex-col gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:justify-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta"
              aria-label="WhatsApp ile rezervasyon yapın"
            >
              <WhatsAppIcon />
              WhatsApp ile Rezervasyon
            </a>
            <a href="#rooms" className="btn-hero-secondary" aria-label="Odalar bölümüne git">
              <BedDouble className="h-5 w-5" aria-hidden />
              Odaları Gör
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
