/** Canlı sitedeki site-data.json ile admin (localStorage) verisini karşılaştırır. */

import { fetchLiveSiteData } from './fetchSiteData'

export async function fetchPublishedSiteSnapshot() {
  return fetchLiveSiteData()
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
