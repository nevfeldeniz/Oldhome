import { motion } from 'framer-motion'
import { BedDouble, Phone } from 'lucide-react'
import { hero } from '../data/site'

// Afişten kırpılmış, sadece bina kısmını gösteren görsel (public/ klasöründe)
const HERO_IMAGE = `${import.meta.env.BASE_URL}hero-building.png`

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Arka plan görseli (placeholder) */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Old Home Guest House dış cephe"
          className="h-full w-full object-cover"
        />
        {/* Gerçek fotoğrafın görünmesi için daha açık, krem tonlu overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-cream/60 via-cream/45 to-cream" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-5 pt-28 pb-20 text-center sm:px-8"
      >
        <motion.span variants={item} className="section-eyebrow mb-6">
          Köşklüçiftlik · Lefkoşa, Kıbrıs
        </motion.span>

        <motion.h1
          variants={item}
          className="font-serif text-4xl font-semibold leading-tight text-wine-dark sm:text-6xl md:text-7xl"
        >
          {hero.brand}
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-3 font-serif text-2xl italic text-wine sm:text-3xl md:text-4xl"
        >
          {hero.welcome}
        </motion.p>

        <motion.p
          variants={item}
          className="mt-6 text-lg font-medium tracking-wide text-ink sm:text-xl"
        >
          {hero.subtitle}
        </motion.p>

        <motion.p variants={item} className="mt-4 max-w-2xl text-ink/70 leading-relaxed">
          {hero.description}
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a href="#rooms" className="btn-primary">
            <BedDouble className="h-4 w-4" />
            Odaları İncele
          </a>
          <a href="#contact" className="btn-outline">
            <Phone className="h-4 w-4" />
            İletişime Geç
          </a>
        </motion.div>
      </motion.div>

      {/* Aşağı kaydırma ipucu */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ opacity: { delay: 1.2 }, y: { repeat: Infinity, duration: 2, delay: 1.2 } }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <span className="flex h-10 w-6 items-start justify-center rounded-full border border-wine/50 p-1.5">
          <span className="h-2 w-1 rounded-full bg-wine" />
        </span>
      </motion.div>
    </section>
  )
}
