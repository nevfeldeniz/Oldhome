import { getRoomRateList } from '../utils/roomPricing'

const guestEmoji = {
  1: '👤',
  2: '👥',
  3: '👨‍👩‍👧',
}

export default function RoomRateList({ type, compact = false, showTitle = true }) {
  const rates = getRoomRateList(type)

  return (
    <div>
      {showTitle && (
        <p
          className={
            compact
              ? 'text-[11px] font-semibold uppercase tracking-wider text-wine-dark'
              : 'text-sm font-semibold uppercase tracking-wider text-wine-dark'
          }
        >
          Konaklama Ücretleri
        </p>
      )}
      <ul className={showTitle ? (compact ? 'mt-1.5 space-y-1.5' : 'mt-2.5 space-y-2.5') : compact ? 'space-y-1.5' : 'space-y-2.5'}>
        {rates.map((rate) => (
          <li key={rate.guests} className="flex items-start justify-between gap-2">
            <span
              className={
                compact
                  ? 'min-w-0 text-[11px] leading-snug text-ink/70'
                  : 'min-w-0 text-sm leading-snug text-ink/70'
              }
            >
              <span aria-hidden="true">{guestEmoji[rate.guests]} </span>
              {rate.label}
            </span>
            <div className="shrink-0 text-right">
              <p className={compact ? 'text-[10px] font-medium text-ink/40 line-through' : 'text-xs font-medium text-ink/40 line-through'}>
                {rate.oldPrice}
              </p>
              <p className={compact ? 'font-serif text-sm font-semibold text-wine' : 'font-serif text-lg font-semibold text-wine'}>
                {rate.price}{' '}
                <span className={compact ? 'font-sans text-[10px] font-normal text-ink/50' : 'font-sans text-xs font-normal text-ink/50'}>
                  / Gece
                </span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
