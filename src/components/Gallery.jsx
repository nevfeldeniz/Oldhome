import { motion } from 'framer-motion'
import { useSite } from '../context/SiteContext'
import { SectionHeading, fadeUp } from './Section'

export default function Gallery() {
  const { site } = useSite()
  const { gallery } = site

  return (
    <section id="gallery" className="bg-sand py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Galeri"
          title="Mekanımızdan kareler"
          subtitle="Sizi konforlu ve huzurlu atmosferimizde ağırlamak için hazırız."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ staggerChildren: 0.1 }}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {gallery.map((image) => (
            <motion.figure
              key={image.alt}
              variants={fadeUp}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="group relative overflow-hidden rounded-2xl border border-wine/10"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-wine-dark/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <figcaption className="absolute bottom-4 left-4 translate-y-2 text-sm font-medium text-cream opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {image.label}
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
