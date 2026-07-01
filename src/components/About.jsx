import { Home } from 'lucide-react'
import { useSite } from '../context/SiteContext'
import { Reveal } from './Section'
import OptimizedImage from './ui/OptimizedImage'

const FALLBACK_ABOUT_IMAGE = `${import.meta.env.BASE_URL}oldhome-cyprus-garden-lounge.jpg`

export default function About() {
  const { site } = useSite()
  const { about } = site
  const aboutImage = about.image || FALLBACK_ABOUT_IMAGE
  const aboutAlt =
    about.imageAlt || 'Garden lounge seating area at Old Home Guest House boutique hotel in Cyprus'

  return (
    <section id="about" className="section-cream" aria-labelledby="about-heading">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative">
          <figure className="card-booking overflow-hidden">
            <OptimizedImage
              src={aboutImage}
              alt={aboutAlt}
              width={800}
              height={560}
              className="h-[420px] w-full object-cover"
            />
          </figure>
        </Reveal>

        <div className="flex flex-col gap-6">
          <Reveal className="section-eyebrow">
            <Home className="h-4 w-4" aria-hidden />
            <span>{about.title}</span>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 id="about-heading" className="text-3xl font-semibold leading-snug text-wine-dark sm:text-4xl">
              Evinizin konforunda, <span className="text-wine">sıcak bir yuva</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="leading-relaxed text-ink/70">{about.paragraph}</p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-2 grid grid-cols-3 gap-4">
              {about.stats.map((stat) => (
                <div key={stat.label} className="card-booking p-4 text-center">
                  <p className="font-serif text-2xl font-semibold text-wine sm:text-3xl">{stat.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-ink/55">{stat.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
