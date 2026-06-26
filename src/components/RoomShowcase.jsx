import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Eye, Images } from 'lucide-react'
import { showcaseRooms } from '../data/site'
import { SectionHeading, fadeUp } from './Section'
import RoomModal from './RoomModal'

const filters = [
  { value: 'Tümü', label: 'Tümü' },
  { value: 'Tek', label: 'Tek Kişilik' },
  { value: 'Çift', label: 'Çift Kişilik' },
  { value: '3 Kişilik', label: '3 Kişilik' },
]

const capacityLabel = (type) =>
  type === 'Tek' ? '1 Misafir' : type === 'Çift' ? '2 Misafir' : '3 Misafir'

const typeLabel = (type) => (type === '3 Kişilik' ? '3 Kişilik' : `${type} Kişilik`)

export default function RoomShowcase() {
  const [activeFilter, setActiveFilter] = useState('Tümü')
  const [selectedRoom, setSelectedRoom] = useState(null)

  const visibleRooms =
    activeFilter === 'Tümü'
      ? showcaseRooms
      : showcaseRooms.filter((room) => room.type === activeFilter)

  return (
    <section id="room-showcase" className="bg-parchment py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Oda Galerisi"
          title="11 Odamızı Yakından İnceleyin"
          subtitle="Her odanın fotoğraflarını, özelliklerini ve fiyatını detaylıca görebilir, size en uygun olanı seçebilirsiniz."
        />

        {/* Tip filtreleri */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {filters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => setActiveFilter(filter.value)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                activeFilter === filter.value
                  ? 'bg-wine text-cream shadow-md shadow-wine/25'
                  : 'border border-wine/25 text-wine hover:bg-wine/10'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Oda ızgarası */}
        <motion.div
          layout
          className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visibleRooms.map((room) => (
              <motion.article
                key={room.id}
                layout
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                exit={{ opacity: 0, scale: 0.95 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedRoom(room)}
                className="group flex cursor-pointer flex-col overflow-hidden rounded-3xl border border-wine/10 bg-cream shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-wine/15"
              >
                {/* Ana görsel */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={room.images[0]}
                    alt={room.number}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/50 via-transparent to-transparent" />

                  {/* Tip rozeti */}
                  <span className="absolute left-3 top-3 rounded-full bg-wine px-3 py-1 text-xs font-semibold text-cream">
                    {typeLabel(room.type)}
                  </span>

                  {/* Görsel sayısı rozeti */}
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-charcoal-900/60 px-2.5 py-1 text-xs font-medium text-cream backdrop-blur">
                    <Images className="h-3.5 w-3.5" />
                    {room.images.length}
                  </span>
                </div>

                {/* İçerik */}
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-xl font-semibold text-wine-dark">
                      {room.number}
                    </h3>
                    <span className="inline-flex items-center gap-1.5 text-xs text-ink/60">
                      <Users className="h-4 w-4 text-wine" />
                      {capacityLabel(room.type)}
                    </span>
                  </div>

                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink/65">
                    {room.description}
                  </p>

                  <div className="mt-5 flex items-end justify-between border-t border-wine/10 pt-4">
                    <div>
                      <p className="font-serif text-xl font-semibold text-wine">{room.price}</p>
                      <p className="text-[11px] text-ink/50">gecelik</p>
                    </div>
                    <span className="btn-primary !px-4 !py-2 text-xs">
                      <Eye className="h-4 w-4" />
                      Detayları İncele
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Detay modalı */}
      <AnimatePresence>
        {selectedRoom && (
          <RoomModal room={selectedRoom} onClose={() => setSelectedRoom(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
