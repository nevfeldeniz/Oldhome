import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Eye, Images } from 'lucide-react'
import { useSite } from '../context/SiteContext'
import { SectionHeading, fadeUp } from './Section'
import RoomModal from './RoomModal'
import RoomPriceDisplay from './RoomPriceDisplay'
import OptimizedImage from './ui/OptimizedImage'
import { getShowcasePricing } from '../utils/roomPricing'
import { getRoomGallery } from '../data/roomGalleries'

import { getRoomCapacityShort } from '../utils/roomCapacity'

const filters = [
  { value: 'Tümü', label: 'Tümü' },
  { value: 'Tek', label: 'Tek Kişilik' },
  { value: 'Çift', label: 'Çift Kişilik' },
  { value: '3 Kişilik', label: '3 Kişilik' },
]

const capacityLabel = (type) => getRoomCapacityShort(type)

const typeLabel = (type) => getRoomCapacityShort(type)

export default function RoomShowcase() {
  const { site } = useSite()
  const { showcaseRooms } = site
  const [activeFilter, setActiveFilter] = useState('Tümü')
  const [selectedRoom, setSelectedRoom] = useState(null)

  const visibleRooms =
    activeFilter === 'Tümü'
      ? showcaseRooms
      : showcaseRooms.filter((room) => room.type === activeFilter)

  return (
    <section
      className="section-parchment hidden lg:block"
      aria-labelledby="discover-rooms-heading-desktop"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <SectionHeading
          id="discover-rooms-heading-desktop"
          eyebrow="Odalarımız"
          title="Odalarımızı Keşfedin"
          subtitle="Her odanın fotoğraflarını, özelliklerini ve fiyatını detaylıca görebilir, size en uygun olanı seçebilirsiniz."
        />

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {filters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => setActiveFilter(filter.value)}
              className={`rounded-ui px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
                activeFilter === filter.value
                  ? 'bg-wine-dark text-white shadow-card'
                  : 'border border-wine/20 bg-cream text-wine-dark hover:border-wine/35'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visibleRooms.map((room) => {
              const gallery = getRoomGallery(room.number)
              const coverImage = gallery?.images[0]?.src ?? room.images[0]
              const photoCount = gallery?.images.length ?? room.images.length

              return (
              <motion.article
                key={room.id}
                layout
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                exit={{ opacity: 0, scale: 0.95 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedRoom(room)}
                className="card-booking-alt group flex cursor-pointer flex-col"
              >
                <div className="relative h-52 overflow-hidden">
                  <OptimizedImage
                    src={coverImage}
                    alt={`${room.number} at Old Home Guest House boutique hotel in Cyprus`}
                    width={800}
                    height={416}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  {getShowcasePricing(room.type).oldPrice && (
                    <span className="absolute left-3 top-12 rounded-ui bg-wine-dark px-2.5 py-1 text-[10px] font-semibold text-white">
                      İndirim
                    </span>
                  )}

                  <span className="absolute left-3 top-3 rounded-ui bg-wine-dark px-3 py-1 text-xs font-semibold text-white">
                    {typeLabel(room.type)}
                  </span>

                  <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-ui bg-black/55 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    <Images className="h-3.5 w-3.5" />
                    {photoCount}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-xl font-semibold text-wine-dark">{room.number}</h3>
                    <span className="inline-flex items-center gap-1.5 text-xs text-ink/55">
                      <Users className="h-4 w-4 text-wine" />
                      {capacityLabel(room.type)}
                    </span>
                  </div>

                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink/65">{room.description}</p>

                  <div className="mt-5 flex items-end justify-between border-t border-black/[0.06] pt-4">
                    <div>
                      <RoomPriceDisplay type={room.type} price={room.price} oldPrice={room.oldPrice} size="sm" />
                      <p className="text-[11px] text-ink/50">gecelik</p>
                    </div>
                    <span className="btn-primary !min-h-[40px] !px-4 !py-2 !text-xs">
                      <Eye className="h-4 w-4" />
                      Detayları İncele
                    </span>
                  </div>
                </div>
              </motion.article>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedRoom && <RoomModal room={selectedRoom} onClose={() => setSelectedRoom(null)} />}
      </AnimatePresence>
    </section>
  )
}
