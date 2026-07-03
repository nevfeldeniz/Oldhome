import {
  getRoomAvailabilityLabel,
  getRoomAvailabilityStyle,
  normalizeRoomAvailability,
} from '../utils/roomAvailability'

export default function RoomAvailabilityBadge({ room, className = '', compact = false }) {
  const { availability } = normalizeRoomAvailability(room)
  const label = getRoomAvailabilityLabel(room)
  const style = getRoomAvailabilityStyle(availability)

  return (
    <span
      className={`inline-flex max-w-full items-center gap-1.5 rounded-full px-2.5 py-1 font-semibold tracking-wide backdrop-blur-sm ${compact ? 'text-[10px]' : 'text-[11px]'} ${style.badge} ${className}`}
      title={label}
    >
      <span className={`h-1.5 w-1.5 flex-none rounded-full ${style.dot}`} aria-hidden />
      <span className="truncate">{label}</span>
    </span>
  )
}
