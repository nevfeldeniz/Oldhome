import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BedDouble, ChevronRight, Eye, Images } from 'lucide-react'
import { useSite } from '../context/SiteContext'
import RoomModal from './RoomModal'
import RoomRateList from './RoomRateList'
import RoomAvailabilityBadge from './RoomAvailabilityBadge'
import OptimizedImage from './ui/OptimizedImage'
import { hasDiscountedRates, getLowestRate } from '../utils/roomPricing'
import { getResolvedRoomGallery } from '../data/roomGalleries'
import { getRoomMaxCapacityLabel } from '../utils/roomCapacity'
import { resolveAsset } from '../utils/storage'
import { SectionIntro, SectionHeading, fadeUp } from './Section'

const filters = [
  { value: 'Tümü', label: 'Tümü' },
  { value: 'Tek', label: 'Tek Kişilik' },
  { value: 'Çift', label: 'Çift Kişilik' },
  { value: '3 Kişilik', label: '3 Kişilik' },
]

export default function DiscoverRooms() {
  const { site } = useSite()
  const { showcaseRooms, ratePlans } = site
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [activeFilter, setActiveFilter] = useState('Tümü')

  const visibleRooms =
    activeFilter === 'Tümü'
      ? showcaseRooms
      : showcaseRooms.filter((room) => room.type === activeFilter)

  return (
    <section id="rooms" className="section-parchment scroll-mt-24" aria-label="Odalarımızı Keşfedin">
      {/* Mobil: kompakt liste */}
      <div className="md:hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <SectionIntro
            id="discover-rooms-heading"
            eyebrow="Odalarımız"
            title="Odalarımızı Keşfedin"
            subtitle="11 konforlu odamızdan birini seçin, tek dokunuşla detayları inceleyin."
          />

          <ul className="mt-8 grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3">
            {showcaseRooms.map((room) => (
                <li key={room.id}>
                  <article className="flex items-center gap-3 rounded-ui border border-wine/[0.08] bg-parchment/50 px-3 py-3 transition-colors hover:border-wine/20 hover:bg-parchment sm:px-4 sm:py-3.5">
                    <span
                      className="grid h-11 w-11 flex-none place-items-center rounded-ui bg-cream text-wine"
                      aria-hidden
                    >
                      <BedDouble className="h-5 w-5" />
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="truncate font-semibold text-wine-dark">{room.number}</h3>
                        <RoomAvailabilityBadge room={room} compact />
                      </div>
                      <p className="mt-0.5 text-xs text-ink/55">{getRoomMaxCapacityLabel(room)}</p>
                      <p className="mt-1 text-sm font-semibold text-wine">{getLowestRate(room.type, ratePlans, room.maxGuests)} / gece&apos;den</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedRoom(room)}
                      className="inline-flex flex-none items-center gap-1 rounded-ui bg-wine-dark px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-wine sm:px-4 sm:text-sm"
                      aria-label={`${room.number} detaylarını incele`}
                    >
                      İncele
                      <ChevronRight className="h-4 w-4" aria-hidden />
                    </button>
                  </article>
                </li>
              ))}
          </ul>

          <p className="mt-6 text-center text-sm text-ink/50">
            Fotoğraflar, özellikler ve fiyatlar modal pencerede açılır.
          </p>
        </div>
      </div>

      {/* Masaüstü: fotoğraflı kartlar */}
      <div className="hidden md:block" aria-labelledby="discover-rooms-heading-desktop">
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
                const gallery = getResolvedRoomGallery(room)
                const coverImage = resolveAsset(gallery?.images[0]?.src ?? room.images[0])
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
                    <div className="relative aspect-[4/3] overflow-hidden bg-parchment">
                      <OptimizedImage
                        src={coverImage}
                        alt={`${room.number} at Old Home Guest House boutique hotel in Cyprus`}
                        width={800}
                        height={600}
                        className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                      {hasDiscountedRates(room.type, ratePlans, room.maxGuests) && (
                        <span className="absolute left-3 top-3 rounded-ui bg-wine-dark px-2.5 py-1 text-[10px] font-semibold text-white">
                          İndirim
                        </span>
                      )}

                      <span
                        className={`absolute left-3 rounded-ui bg-wine-dark px-3 py-1 text-xs font-semibold text-white ${
                          hasDiscountedRates(room.type, ratePlans, room.maxGuests) ? 'top-10' : 'top-3'
                        }`}
                      >
                        {getRoomMaxCapacityLabel(room)}
                      </span>

                      <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-ui bg-black/55 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                        <Images className="h-3.5 w-3.5" />
                        {photoCount}
                      </span>

                      <div className="absolute bottom-3 left-3 right-3">
                        <RoomAvailabilityBadge room={room} />
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="font-serif text-xl font-semibold text-wine-dark">{room.number}</h3>

                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink/65">{room.description}</p>

                      <div className="mt-5 border-t border-black/[0.06] pt-4">
                        <RoomRateList type={room.type} maxGuests={room.maxGuests} ratePlans={ratePlans} compact />
                        <div className="mt-3 flex justify-end">
                          <span className="btn-primary !min-h-[40px] !px-4 !py-2 !text-xs">
                            <Eye className="h-4 w-4" />
                            Detayları İncele
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                )
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {selectedRoom && <RoomModal room={selectedRoom} onClose={() => setSelectedRoom(null)} />}
      </AnimatePresence>
    </section>
  )
}
