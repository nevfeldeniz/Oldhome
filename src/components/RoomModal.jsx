import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  X,
  ChevronLeft,
  ChevronRight,
  Users,
  Phone,
  Check,
  Wifi,
  Snowflake,
  Coffee,
  Tv,
  Bath,
  BedDouble,
  Wind,
  Sparkles,
} from 'lucide-react'
import { useSite } from '../context/SiteContext'

// Özellik metnini ikonla eşleştirir; bilinmeyenler için varsayılan Check.
const featureIcons = {
  'Ücretsiz Wi-Fi': Wifi,
  Klima: Snowflake,
  'Çay & Kahve İkramı': Coffee,
  'Smart TV': Tv,
  'Özel Banyo': Bath,
  'Çift Kişilik Yatak': BedDouble,
  'Geniş Aile Yatağı': BedDouble,
  'Saç Kurutma Makinesi': Wind,
  'Günlük Temizlik': Sparkles,
}

export default function RoomModal({ room, onClose }) {
  const { site } = useSite()
  const { contact } = site
  const [current, setCurrent] = useState(0)
  const total = room.images.length

  const next = useCallback(() => setCurrent((i) => (i + 1) % total), [total])
  const prev = useCallback(() => setCurrent((i) => (i - 1 + total) % total), [total])

  // Esc ile kapat, ok tuşlarıyla gezin
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, next, prev])

  // Modal açıkken arka plan kaymasını engelle
  useEffect(() => {
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal-900/70 p-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
        className="relative grid max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-3xl bg-cream shadow-2xl lg:grid-cols-2"
      >
        {/* Kapat butonu */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Kapat"
          className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full bg-charcoal-900/60 text-cream backdrop-blur transition-colors hover:bg-wine"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Sol / üst: Görsel kaydırıcı */}
        <div className="relative h-64 bg-charcoal-900 sm:h-80 lg:h-auto">
          {room.images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${room.number} - görsel ${i + 1}`}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                i === current ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}

          {/* İleri / geri okları */}
          <button
            type="button"
            onClick={prev}
            aria-label="Önceki görsel"
            className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-cream/80 text-wine shadow transition-colors hover:bg-cream"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Sonraki görsel"
            className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-cream/80 text-wine shadow transition-colors hover:bg-cream"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Noktalı gösterge */}
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {room.images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrent(i)}
                aria-label={`Görsel ${i + 1}`}
                className={`h-2.5 rounded-full transition-all ${
                  i === current ? 'w-6 bg-cream' : 'w-2.5 bg-cream/50 hover:bg-cream/80'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Sağ / alt: Detaylar */}
        <div className="flex flex-col overflow-y-auto p-6 sm:p-8">
          <span className="section-eyebrow">{room.type} Oda</span>
          <h3 className="mt-2 font-serif text-3xl font-semibold text-wine-dark">{room.number}</h3>

          <span className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-wine/10 px-3 py-1 text-xs font-medium text-wine">
            <Users className="h-3.5 w-3.5" />
            {room.type === 'Tek' ? '1 Misafir' : room.type === 'Çift' ? '2 Misafir' : '3 Misafir'}
          </span>

          <p className="mt-4 text-sm leading-relaxed text-ink/75">{room.description}</p>

          {/* Özellikler - ikonlu liste */}
          <div className="mt-6">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-wine-dark">
              Oda Özellikleri
            </h4>
            <ul className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {room.features.map((feature) => {
                const Icon = featureIcons[feature] || Check
                return (
                  <li key={feature} className="flex items-center gap-2.5 text-sm text-ink/75">
                    <span className="grid h-7 w-7 flex-none place-items-center rounded-lg bg-wine/10 text-wine">
                      <Icon className="h-4 w-4" />
                    </span>
                    {feature}
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Fiyat + rezervasyon */}
          <div className="mt-auto flex flex-col gap-4 border-t border-wine/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-serif text-3xl font-semibold text-wine">{room.price}</p>
              <p className="text-xs text-ink/50">gecelik · 0-6 yaş çocuk ücretsiz</p>
            </div>
            <a href={`tel:${contact.phoneLinks[0]}`} className="btn-primary">
              <Phone className="h-4 w-4" />
              Bu Odayı Rezerve Et
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
