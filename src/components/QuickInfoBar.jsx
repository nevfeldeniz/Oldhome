import { BedDouble, Coffee, MessageCircle, Wifi } from 'lucide-react'

const items = [
  { icon: BedDouble, label: '11 Konforlu Oda' },
  { icon: Wifi, label: 'Ücretsiz Wi-Fi' },
  { icon: Coffee, label: 'Ücretsiz Çay & Kahve' },
  { icon: MessageCircle, label: '7/24 WhatsApp Desteği' },
]

export default function QuickInfoBar() {
  return (
    <aside aria-label="Hızlı bilgiler" className="border-y border-wine/[0.06] bg-parchment py-5">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 sm:grid-cols-4 sm:gap-4 sm:px-8">
        {items.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-2.5 rounded-ui border border-wine/[0.06] bg-cream/70 px-3 py-3 sm:justify-center sm:px-4"
          >
            <Icon className="h-4 w-4 flex-none text-wine/80" aria-hidden />
            <span className="text-xs font-medium leading-snug text-ink/70 sm:text-sm">{label}</span>
          </div>
        ))}
      </div>
    </aside>
  )
}
