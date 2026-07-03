export const ROOM_AVAILABILITY = {
  AVAILABLE: 'available',
  OCCUPIED: 'occupied',
  LONG_TERM: 'long_term',
  OCCUPIED_UNTIL: 'occupied_until',
}

export const ROOM_AVAILABILITY_OPTIONS = [
  {
    value: ROOM_AVAILABILITY.AVAILABLE,
    label: 'Rezervasyona Açık',
    hint: 'Misafirler bu odayı hemen rezerve edebilir.',
  },
  {
    value: ROOM_AVAILABILITY.OCCUPIED,
    label: 'Dolu',
    hint: 'Oda şu an misafirde; yeni rezervasyon alınmıyor.',
  },
  {
    value: ROOM_AVAILABILITY.LONG_TERM,
    label: 'Uzun Dönem Konaklama',
    hint: 'Oda uzun süreli konaklama için ayrılmış.',
  },
  {
    value: ROOM_AVAILABILITY.OCCUPIED_UNTIL,
    label: 'Belirli tarihe kadar dolu',
    hint: 'Seçtiğiniz tarihe kadar oda dolu görünür.',
  },
]

export function normalizeRoomAvailability(room = {}) {
  const availability = room.availability || ROOM_AVAILABILITY.AVAILABLE
  return {
    availability,
    occupiedUntil:
      availability === ROOM_AVAILABILITY.OCCUPIED_UNTIL ? room.occupiedUntil || '' : undefined,
  }
}

export function formatOccupiedUntil(isoDate) {
  if (!isoDate) return ''
  const date = new Date(`${isoDate}T12:00:00`)
  if (Number.isNaN(date.getTime())) return ''

  const day = date.getDate()
  const month = date.toLocaleDateString('tr-TR', { month: 'long' })
  return `${day} ${month}'a kadar dolu`
}

export function getRoomAvailabilityLabel(room = {}) {
  const { availability, occupiedUntil } = normalizeRoomAvailability(room)

  switch (availability) {
    case ROOM_AVAILABILITY.OCCUPIED:
      return 'Dolu'
    case ROOM_AVAILABILITY.LONG_TERM:
      return 'Uzun Dönem Konaklama'
    case ROOM_AVAILABILITY.OCCUPIED_UNTIL:
      return formatOccupiedUntil(occupiedUntil) || 'Belirli tarihe kadar dolu'
    default:
      return 'Rezervasyona Açık'
  }
}

export function getRoomAvailabilityStyle(availability = ROOM_AVAILABILITY.AVAILABLE) {
  switch (availability) {
    case ROOM_AVAILABILITY.OCCUPIED:
      return {
        badge: 'bg-ink/75 text-white ring-1 ring-white/15',
        dot: 'bg-white/85',
      }
    case ROOM_AVAILABILITY.LONG_TERM:
      return {
        badge: 'bg-amber-800/90 text-amber-50 ring-1 ring-amber-200/20',
        dot: 'bg-amber-200',
      }
    case ROOM_AVAILABILITY.OCCUPIED_UNTIL:
      return {
        badge: 'bg-wine-dark/90 text-white ring-1 ring-white/15',
        dot: 'bg-rose-200',
      }
    default:
      return {
        badge: 'bg-emerald-700/90 text-emerald-50 ring-1 ring-emerald-200/20',
        dot: 'bg-emerald-200',
      }
  }
}
