import { BedDouble, Coffee, MessageCircle, Wifi } from 'lucide-react'
import { useSite } from '../context/SiteContext'

const ICON_MAP = {
  bed: BedDouble,
  wifi: Wifi,
  coffee: Coffee,
  message: MessageCircle,
}

export default function QuickInfoBar() {
  const { site } = useSite()
  const items = site.quickInfoBar || []

  return (
    <aside aria-label="Hızlı bilgiler" className="border-y border-wine/[0.06] bg-parchment py-5">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 sm:grid-cols-4 sm:gap-4 sm:px-8">
        {items.map(({ icon, label }) => {
          const Icon = ICON_MAP[icon] || BedDouble
          return (
            <div
              key={`${icon}-${label}`}
              className="flex items-center gap-2.5 rounded-ui border border-wine/[0.06] bg-cream/70 px-3 py-3 sm:justify-center sm:px-4"
            >
              <Icon className="h-4 w-4 flex-none text-wine/80" aria-hidden />
              <span className="text-xs font-medium leading-snug text-ink/70 sm:text-sm">{label}</span>
            </div>
          )
        })}
      </div>
    </aside>
  )
}
