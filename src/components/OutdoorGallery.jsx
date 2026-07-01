import { motion } from 'framer-motion'
import { Sofa, Sun, Umbrella } from 'lucide-react'
import { useSite } from '../context/SiteContext'
import { fadeUp, Reveal, SectionHeading } from './Section'

const journeySteps = [
  { key: 'exterior', label: 'Dış Cephe', icon: Sun },
  { key: 'terrace', label: 'Teras', icon: Umbrella },
  { key: 'lounge', label: 'Oturma Köşesi', icon: Sofa },
]

const categoryLabels = {
  exterior: 'Dış Cephe',
  terrace: 'Teras',
  lounge: 'Oturma Köşesi',
}

const gridSpans = [
  'sm:col-span-2 lg:col-span-7 lg:row-span-2',
  'lg:col-span-5',
  'lg:col-span-5',
  'lg:col-span-7',
  'lg:col-span-4',
  'lg:col-span-4',
  'lg:col-span-4',
]

export default function OutdoorGallery() {
  const { site } = useSite()
  const items = site.outdoorGallery || []

  if (!items.length) return null

  const [featured, ...rest] = items

  return (
    <section id="outdoor" className="relative overflow-hidden bg-gradient-to-b from-parchment via-cream to-sand py-24 sm:py-32">
      <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-wine/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-wine/8 blur-3xl" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-wine/25 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Dış Mekân"
          title="Bahçeden oturma köşesine"
          subtitle="Old Home'un beyaz cephesinden gölgeli terasa, oradan da konforlu dış oturma alanlarına uzanan huzurlu bir yolculuk."
        />

        <Reveal delay={0.08} className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-3 sm:gap-0">
          {journeySteps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={step.key} className="flex items-center">
                <div className="flex items-center gap-2 rounded-full border border-wine/15 bg-cream/80 px-4 py-2 shadow-sm shadow-wine/5 backdrop-blur-sm">
                  <Icon className="h-4 w-4 text-wine" />
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-wine-dark">
                    {step.label}
                  </span>
                </div>
                {index < journeySteps.length - 1 && (
                  <span className="mx-2 hidden h-px w-10 bg-gradient-to-r from-wine/30 to-wine/10 sm:block" />
                )}
              </div>
            )
          })}
        </Reveal>

        <motion.figure
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="group relative mt-14 overflow-hidden rounded-[2rem] border border-wine/15 shadow-2xl shadow-wine/15"
        >
          <div className="absolute left-6 top-6 z-10 flex items-center gap-2 rounded-full bg-cream/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-wine shadow-lg backdrop-blur-sm">
            <Sun className="h-3.5 w-3.5" />
            {featured.label}
          </div>
          <img
            src={featured.src}
            alt={featured.alt}
            loading="lazy"
            decoding="async"
            className="aspect-[21/9] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-wine-dark/55 via-wine-dark/10 to-transparent" />
          <figcaption className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <p className="max-w-2xl font-serif text-xl text-cream sm:text-2xl">
              Köşklüçiftlik sokaklarında sizi karşılayan beyaz cephe ve ferah teras.
            </p>
          </figcaption>
        </motion.figure>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          transition={{ staggerChildren: 0.08 }}
          className="mt-8 grid auto-rows-[220px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[200px]"
        >
          {rest.map((item, index) => (
            <motion.figure
              key={item.src}
              variants={fadeUp}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className={`group relative overflow-hidden rounded-3xl border border-wine/10 bg-cream shadow-lg shadow-wine/5 ${gridSpans[index] || 'lg:col-span-4'}`}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-wine-dark/70 via-wine-dark/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
              <figcaption className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-3 p-4 sm:p-5">
                <div>
                  <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.22em] text-cream/75">
                    {categoryLabels[item.category] || item.category}
                  </span>
                  <span className="font-serif text-lg text-cream">{item.label}</span>
                </div>
                <span className="rounded-full border border-cream/25 bg-cream/10 px-2.5 py-1 text-[11px] font-medium text-cream/90 backdrop-blur-sm">
                  {String(index + 2).padStart(2, '0')}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>

        <Reveal delay={0.1} className="mx-auto mt-14 max-w-3xl rounded-3xl border border-wine/10 bg-cream/70 px-6 py-8 text-center shadow-inner shadow-wine/5 backdrop-blur-sm sm:px-10">
          <p className="font-serif text-xl italic text-wine-dark sm:text-2xl">
            “Gün batımında terasta çayınızı yudumlayın, evinizdeymiş gibi hissedin.”
          </p>
          <p className="mt-3 text-sm text-ink/60">Açık hava oturma alanları · Gölgeli teras · Sakin bahçe atmosferi</p>
        </Reveal>
      </div>
    </section>
  )
}
