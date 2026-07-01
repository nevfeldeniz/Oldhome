import { motion } from 'framer-motion'
import { Wifi, Snowflake, ShieldCheck, Coffee, UtensilsCrossed, Sparkles } from 'lucide-react'
import { amenities } from '../data/site'
import { SectionHeading, fadeUp } from './Section'

const iconMap = { Wifi, Snowflake, ShieldCheck, Coffee, UtensilsCrossed, Sparkles }

export default function Amenities() {
  return (
    <section id="amenities" className="section-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <SectionHeading
          eyebrow="İmkanlarımız & Hizmetler"
          title="Konforunuz için her detay düşünüldü"
          subtitle="Misafirlerimizin kendini evinde hissetmesi için sunduğumuz ayrıcalıklar."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ staggerChildren: 0.08 }}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {amenities.map((item) => {
            const Icon = iconMap[item.icon]
            return (
              <motion.div
                key={item.title}
                variants={fadeUp}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="card-booking p-7"
              >
                <span className="grid h-12 w-12 place-items-center rounded-ui bg-parchment text-wine">
                  {Icon && <Icon className="h-6 w-6" />}
                </span>
                <h3 className="mt-5 text-lg font-semibold text-wine-dark">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{item.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
