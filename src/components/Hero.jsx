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
    <section id="home" className="relative sm:min-h-screen" aria-label="Welcome">
      {/* Görsel katmanı */}
      <div className="relative h-[38svh] min-h-[200px] max-h-[320px] overflow-hidden sm:absolute sm:inset-0 sm:h-full sm:max-h-none">
        <OptimizedImage
          src={heroImage}
          alt="Old Home Guest House boutique hotel exterior in Cyprus"
          width={1920}
          height={1080}
          sizes="100vw"
          priority
          className="h-full w-full object-cover object-[center_22%] sm:object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent sm:bg-gradient-to-t sm:from-black/70 sm:via-black/40 sm:to-black/20"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 hidden bg-gradient-to-r from-black/25 via-transparent to-black/10 sm:block"
          aria-hidden="true"
        />
      </div>

      {/* İçerik — mobilde krem panel, masaüstünde görsel üstü */}
      <div className="relative z-10 border-b border-wine/[0.06] bg-cream px-4 pb-8 pt-7 text-center sm:absolute sm:inset-0 sm:flex sm:flex-col sm:items-center sm:justify-center sm:border-none sm:bg-transparent sm:px-8 sm:pb-20 sm:pt-32">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-wine sm:mb-4 sm:text-white/80">
          Köşklüçiftlik · Lefkoşa, Kıbrıs
        </p>

        <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight text-wine-dark sm:mt-0 sm:text-5xl sm:text-white md:text-6xl">
          Old Home Guest House
        </h1>

        <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-ink/70 sm:mt-5 sm:text-lg sm:text-white/90 md:text-xl">
          Konforlu konaklama, sıcak bir yuva hissi
        </p>

        <div className="mx-auto mt-7 flex w-full max-w-md flex-col gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:justify-center">
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
          <a
            href="#rooms"
            className="btn-outline sm:!border-white/40 sm:!bg-white/10 sm:!text-white sm:backdrop-blur-sm sm:hover:!border-white/70 sm:hover:!bg-white/20"
            aria-label="Odalar bölümüne git"
          >
            <BedDouble className="h-5 w-5" aria-hidden />
            Odaları Gör
          </a>
        </div>
      </div>
    </section>
  )
}
