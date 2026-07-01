import { motion } from 'framer-motion'
import { Users, Check, MessageCircle, Baby } from 'lucide-react'
import { useSite } from '../context/SiteContext'
import { SectionHeading, fadeUp } from './Section'
import { getWhatsAppUrl } from '../utils/whatsapp'

export default function Rooms() {
  const { site } = useSite()
  const { rooms, roomsNote, contact, social } = site
  const whatsappUrl = getWhatsAppUrl(
    social?.whatsapp || contact.phoneLinks[0],
    social?.whatsappMessage,
  )
  return (
    <section id="fiyatlar" className="bg-cream py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Odalarımız & Fiyatlar"
          title="Size en uygun odayı seçin"
          subtitle="Her bütçeye ve ihtiyaca uygun, temiz ve konforlu oda seçenekleri."
        />

        {/* Çocuk ücretsiz vurgusu */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mt-8 flex w-fit items-center gap-2.5 rounded-full border border-wine/30 bg-wine/10 px-5 py-2.5 text-sm text-wine"
        >
          <Baby className="h-4 w-4" />
          <span>{roomsNote}</span>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ staggerChildren: 0.12 }}
          className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3"
        >
          {rooms.map((room) => (
            <motion.article
              key={room.name}
              variants={fadeUp}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className={`group relative flex flex-col overflow-hidden rounded-3xl border bg-parchment transition-all duration-300 hover:-translate-y-2 ${
                room.featured
                  ? 'border-wine/60 shadow-xl shadow-wine/15'
                  : 'border-wine/10 hover:border-wine/40 hover:shadow-lg hover:shadow-wine/10'
              }`}
            >
              {room.oldPrice && (
                <span className="absolute left-4 top-4 z-10 rounded-full bg-red-700 px-3 py-1 text-xs font-semibold text-white shadow-lg">
                  İndirim
                </span>
              )}
              {room.featured && (
                <span className="absolute right-4 top-4 z-10 rounded-full bg-wine px-3 py-1 text-xs font-semibold text-cream">
                  En Popüler
                </span>
              )}

              {/* Görsel */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={room.image}
                  alt={room.imageAlt || `${room.name} at Old Home Boutique Hotel Cyprus`}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-parchment to-transparent" />
              </div>

              {/* İçerik */}
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-wine-dark">{room.name}</h3>
                  <span className="inline-flex items-center gap-1.5 text-xs text-ink/60">
                    <Users className="h-4 w-4 text-wine" />
                    {room.capacity}
                  </span>
                </div>

                <ul className="mt-5 flex flex-1 flex-col gap-2.5">
                  {room.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 text-sm text-ink/75">
                      <Check className="h-4 w-4 flex-none text-wine" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-end justify-between border-t border-wine/10 pt-5">
                  <div>
                    {room.oldPrice && (
                      <p className="text-sm font-medium text-ink/40 line-through">
                        {room.oldPrice}
                      </p>
                    )}
                    <p className="font-serif text-2xl font-semibold text-wine">{room.price}</p>
                    <p className="text-xs text-ink/50">gecelik</p>
                  </div>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp !px-5 !py-2.5 !text-xs"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Rezervasyon
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
