import { motion } from 'framer-motion'
import { Users, Check, Baby } from 'lucide-react'
import { useSite } from '../context/SiteContext'
import { SectionHeading, fadeUp } from './Section'
import { getWhatsAppUrl } from '../utils/whatsapp'
import WhatsAppIcon from './WhatsAppIcon'

export default function Rooms() {
  const { site } = useSite()
  const { rooms, roomsNote, contact, social } = site
  const whatsappUrl = getWhatsAppUrl(
    social?.whatsapp || contact.phoneLinks[0],
    social?.whatsappMessage,
  )

  return (
    <section id="fiyatlar" className="section-alt">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <SectionHeading
          eyebrow="Odalarımız & Fiyatlar"
          title="Size en uygun odayı seçin"
          subtitle="Her bütçeye ve ihtiyaca uygun, temiz ve konforlu oda seçenekleri."
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mt-8 flex w-fit items-center gap-2.5 rounded-ui border border-wine/15 bg-surface-white px-5 py-3 text-sm text-wine shadow-card"
        >
          <Baby className="h-4 w-4" />
          <span>{roomsNote}</span>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ staggerChildren: 0.1 }}
          className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {rooms.map((room) => (
            <motion.article
              key={room.name}
              variants={fadeUp}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className={`card-booking relative flex flex-col ${room.featured ? 'ring-1 ring-wine/20' : ''}`}
            >
              {room.oldPrice && (
                <span className="absolute left-4 top-4 z-10 rounded-ui bg-wine-dark px-3 py-1 text-xs font-semibold text-white">
                  İndirim
                </span>
              )}
              {room.featured && (
                <span className="absolute right-4 top-4 z-10 rounded-ui bg-wine px-3 py-1 text-xs font-semibold text-white">
                  En Popüler
                </span>
              )}

              <div className="relative h-56 overflow-hidden">
                <img
                  src={room.image}
                  alt={room.imageAlt || `${room.name} at Old Home Guest House`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-wine-dark">{room.name}</h3>
                  <span className="inline-flex items-center gap-1.5 text-xs text-ink/55">
                    <Users className="h-4 w-4 text-wine" />
                    {room.capacity}
                  </span>
                </div>

                <ul className="mt-5 flex flex-1 flex-col gap-2.5">
                  {room.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 text-sm text-ink/70">
                      <Check className="h-4 w-4 flex-none text-wine" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-end justify-between border-t border-black/[0.06] pt-5">
                  <div>
                    {room.oldPrice && (
                      <p className="text-sm font-medium text-ink/40 line-through">{room.oldPrice}</p>
                    )}
                    <p className="font-serif text-2xl font-semibold text-wine">{room.price}</p>
                    <p className="text-xs text-ink/50">gecelik</p>
                  </div>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-cta !min-h-[44px] !px-4 !py-2.5 !text-xs"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
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
