import { BedDouble } from 'lucide-react'
import { useSite } from '../context/SiteContext'
import { getWhatsAppUrl } from '../utils/whatsapp'
import { resolveAsset } from '../utils/storage'
import WhatsAppIcon from './WhatsAppIcon'

const FALLBACK_HERO = 'oldhome-cyprus-hotel-exterior-hero-desktop.jpg'
const FALLBACK_HERO_MOBILE = 'oldhome-cyprus-hero-mobile.png'
const HERO_ALT = 'Old Home Guest House boutique hotel exterior in Cyprus'

export default function Hero() {
  const { site } = useSite()
  const { hero, contact, social } = site
  const heroImage = hero.image || resolveAsset(FALLBACK_HERO)
  const heroImageMobile = hero.imageMobile || resolveAsset(FALLBACK_HERO_MOBILE)
  const whatsappUrl = getWhatsAppUrl(
    social?.whatsapp || contact.phoneLinks[0],
    social?.whatsappMessage,
  )

  return (
    <section
      id="home"
      className="relative min-h-[100svh] w-full overflow-hidden sm:min-h-screen"
      aria-label="Welcome"
    >
      <div className="absolute inset-0">
        {/* Mobil: mevcut mobil hero */}
        <img
          src={heroImageMobile}
          alt={HERO_ALT}
          width={1080}
          height={1920}
          decoding="async"
          fetchPriority="high"
          className="h-full w-full object-cover object-center sm:hidden"
        />
        {/* Masaüstü: yeni hero görseli */}
        <img
          src={heroImage}
          alt={HERO_ALT}
          width={1920}
          height={1096}
          decoding="async"
          fetchPriority="high"
          className="hidden h-full w-full object-cover object-center sm:block"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/10 sm:from-black/70 sm:via-black/40 sm:to-black/20"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 hidden bg-gradient-to-r from-black/25 via-transparent to-black/10 sm:block"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-5 pb-10 pt-24 sm:absolute sm:inset-0 sm:min-h-0 sm:items-center sm:justify-center sm:px-8 sm:pb-20 sm:pt-32 sm:text-center">
        <div className="w-full sm:max-w-3xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/80 sm:mb-4">
            Köşklüçiftlik · Lefkoşa, Kıbrıs
          </p>

          <h1 className="mt-3 font-serif text-4xl font-semibold leading-[1.12] text-white sm:mt-0 sm:text-5xl md:text-6xl">
            {hero.brand || 'Old Home Guest House'}
          </h1>

          <p className="mt-3 max-w-xl text-lg leading-relaxed text-white/90 sm:mx-auto sm:mt-5 md:text-xl">
            {hero.subtitle || 'Konforlu konaklama, sıcak bir yuva hissi'}
          </p>

          <div className="mt-8 flex w-full flex-col gap-3 sm:mx-auto sm:mt-10 sm:max-w-none sm:flex-row sm:justify-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta focus-visible:ring-offset-black/40 sm:w-auto"
              aria-label="WhatsApp ile rezervasyon yapın"
            >
              <WhatsAppIcon monochrome className="h-5 w-5 text-white" />
              WhatsApp ile Rezervasyon
            </a>
            <a
              href="#rooms"
              className="btn-hero-secondary sm:w-auto"
              aria-label="Odalar bölümüne git"
            >
              <BedDouble className="h-5 w-5" aria-hidden />
              Odaları Gör
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
