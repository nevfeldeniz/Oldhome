import { getShowcasePricing } from '../utils/roomPricing'

const sizeClasses = {
  sm: { old: 'text-sm', current: 'text-xl', badge: 'text-[10px]' },
  md: { old: 'text-sm', current: 'text-2xl', badge: 'text-[10px]' },
  lg: { old: 'text-base', current: 'text-3xl', badge: 'text-xs' },
}

export default function RoomPriceDisplay({
  type,
  price,
  oldPrice,
  maxGuests,
  ratePlans,
  size = 'md',
  className = '',
}) {
  const defaults = getShowcasePricing(type, ratePlans, maxGuests)
  const displayPrice = price || defaults.price
  const displayOldPrice = oldPrice !== undefined ? oldPrice : defaults.oldPrice
  const hasDiscount = displayOldPrice && displayOldPrice !== displayPrice
  const s = sizeClasses[size] || sizeClasses.md

  return (
    <div className={className}>
      {hasDiscount && (
        <p className={`${s.old} font-medium text-ink/40 line-through`}>{displayOldPrice}</p>
      )}
      <p className={`font-serif ${s.current} font-semibold text-wine`}>{displayPrice}</p>
    </div>
  )
}
