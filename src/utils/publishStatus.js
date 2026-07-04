/** Canlı sitedeki site-data.json ile admin (localStorage) verisini karşılaştırır. */

import { getLiveSiteDataUrl } from '../config/publish'

export async function fetchPublishedSiteSnapshot() {
  if (typeof fetch === 'undefined') return null

  try {
    const res = await fetch(getLiveSiteDataUrl(true), { cache: 'no-store' })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

function roomAvailabilityKey(room = {}) {
  return `${room.id}:${room.availability || 'available'}:${room.occupiedUntil || ''}`
}

export function getRoomAvailabilitySignature(rooms = []) {
  return [...rooms]
    .sort((a, b) => String(a.id).localeCompare(String(b.id)))
    .map(roomAvailabilityKey)
    .join('|')
}

export function hasUnpublishedRoomAvailability(localData, publishedData) {
  if (!publishedData?.showcaseRooms?.length) return false
  const localSig = getRoomAvailabilitySignature(localData?.showcaseRooms)
  const publishedSig = getRoomAvailabilitySignature(publishedData.showcaseRooms)
  return localSig !== publishedSig
}
