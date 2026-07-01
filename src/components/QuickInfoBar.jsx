import { BedDouble, MapPin, MessageCircle, Wifi } from 'lucide-react'

const items = [
  { icon: MapPin, label: 'Kıbrıs Konumu' },
  { icon: BedDouble, label: 'Özel Odalar' },
  { icon: Wifi, label: 'Ücretsiz WiFi' },
  { icon: MessageCircle, label: 'Kolay WhatsApp Rezervasyon' },
]

export default function QuickInfoBar() {
  return (
    <section aria-label="Hızlı bilgiler" className="border-y border-wine/10 bg-cream">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 py-4 sm:grid-cols-4 sm:gap-4 sm:px-8 sm:py-5">
        {items.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-2.5 rounded-xl bg-parchment/80 px-3 py-2.5 sm:justify-center sm:px-4"
          >
            <Icon className="h-4 w-4 flex-none text-wine" aria-hidden />
            <span className="text-xs font-medium leading-snug text-ink/80 sm:text-sm">{label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
