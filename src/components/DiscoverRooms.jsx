import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { BedDouble, ChevronRight } from 'lucide-react'
import { useSite } from '../context/SiteContext'
import RoomModal from './RoomModal'
import { getShowcasePricing } from '../utils/roomPricing'
import { SectionIntro } from './Section'

const typeLabel = (type) => {
  if (type === 'Tek') return 'Tek Kişilik'
  if (type === '3 Kişilik') return '3 Kişilik'
  return 'Çift Kişilik'
}

export default function DiscoverRooms() {
  const { site } = useSite()
  const { showcaseRooms } = site
  const [selectedRoom, setSelectedRoom] = useState(null)

  return (
    <section id="rooms" className="section-parchment" aria-labelledby="discover-rooms-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <SectionIntro
          id="discover-rooms-heading"
          eyebrow="Odalarımız"
          title="Odalarımızı Keşfedin"
          subtitle="11 konforlu odamızdan birini seçin, tek dokunuşla detayları inceleyin."
        />

        <ul className="mt-8 grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 lg:gap-4">
          {showcaseRooms.map((room) => {
            const pricing = getShowcasePricing(room.type)

            return (
              <li key={room.id}>
                <article className="flex items-center gap-3 rounded-ui border border-wine/[0.08] bg-parchment/50 px-3 py-3 transition-colors hover:border-wine/20 hover:bg-parchment sm:px-4 sm:py-3.5">
                  <span
                    className="grid h-11 w-11 flex-none place-items-center rounded-ui bg-cream text-wine"
                    aria-hidden
                  >
                    <BedDouble className="h-5 w-5" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-semibold text-wine-dark">{room.number}</h3>
                    <p className="mt-0.5 text-xs text-ink/55">{typeLabel(room.type)}</p>
                    <p className="mt-1 text-sm font-semibold text-wine">{pricing.price}</p>
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
            )
          })}
        </ul>

        <p className="mt-6 text-center text-sm text-ink/50">
          Fotoğraflar, özellikler ve fiyatlar modal pencerede açılır.
        </p>
      </div>

      <AnimatePresence>
        {selectedRoom && <RoomModal room={selectedRoom} onClose={() => setSelectedRoom(null)} />}
      </AnimatePresence>
    </section>
  )
}
