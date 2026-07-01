import { Home } from 'lucide-react'
import { useSite } from '../context/SiteContext'
import { Reveal } from './Section'

const FALLBACK_ABOUT_IMAGE = `${import.meta.env.BASE_URL}oldhome-cyprus-room-interior-001-01.jpg`

export default function About() {
  const { site } = useSite()
  const { about } = site
  const aboutImage = about.image || FALLBACK_ABOUT_IMAGE
  const aboutAlt = about.imageAlt || 'Room interior at Old Home Boutique Hotel Cyprus'

  return (
    <section id="about" className="bg-parchment py-24 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <Reveal className="relative">
          <div className="overflow-hidden rounded-3xl border border-wine/15 shadow-xl shadow-wine/10">
            <img
              src={aboutImage}
              alt={aboutAlt}
              loading="lazy"
              decoding="async"
              className="h-[420px] w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          <div className="absolute -bottom-5 -right-5 -z-10 hidden h-full w-full rounded-3xl border border-wine/30 sm:block" />
        </Reveal>

        <div className="flex flex-col gap-6">
          <Reveal className="section-eyebrow">
            <Home className="h-4 w-4" />
            <span>{about.title}</span>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="text-3xl font-semibold leading-snug text-wine-dark sm:text-4xl">
              Evinizin konforunda, <span className="text-wine">sıcak bir yuva</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-ink/75 leading-relaxed">{about.paragraph}</p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-2 grid grid-cols-3 gap-4">
              {about.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-wine/15 bg-cream p-4 text-center"
                >
                  <p className="font-serif text-2xl font-semibold text-wine sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-ink/60">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
