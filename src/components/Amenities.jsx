import { motion } from 'framer-motion'
import {
  Wifi,
  Snowflake,
  ShieldCheck,
  Coffee,
  UtensilsCrossed,
  Sparkles,
} from 'lucide-react'
import { amenities } from '../data/site'
import { SectionHeading, fadeUp } from './Section'

// Veri dosyasındaki ikon adlarını gerçek bileşenlerle eşler.
const iconMap = {
  Wifi,
  Snowflake,
  ShieldCheck,
  Coffee,
  UtensilsCrossed,
  Sparkles,
}

export default function Amenities() {
  return (
    <section id="amenities" className="bg-sand py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="İmkanlarımız & Hizmetler"
          title="Konforunuz için her detay düşünüldü"
          subtitle="Misafirlerimizin kendini evinde hissetmesi için sunduğumuz ayrıcalıklar."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ staggerChildren: 0.1 }}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {amenities.map((item) => {
            const Icon = iconMap[item.icon]
            return (
              <motion.div
                key={item.title}
                variants={fadeUp}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="group rounded-2xl border border-wine/10 bg-parchment p-7 transition-all
                  duration-300 hover:-translate-y-1.5 hover:border-wine/40 hover:shadow-xl hover:shadow-wine/15"
              >
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-wine/10 text-wine transition-colors group-hover:bg-wine group-hover:text-cream">
                  {Icon && <Icon className="h-7 w-7" />}
                </span>
                <h3 className="mt-5 text-xl font-semibold text-wine-dark">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{item.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
