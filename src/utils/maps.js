export function getMapsSearchQuery(contact) {
  if (contact?.mapsQuery) return contact.mapsQuery
  const name = contact?.placeName || 'Old Home Guest House'
  const address = contact?.address || ''
  return address ? `${name}, ${address}` : name
}

export function getMapsEmbedUrl(contact) {
  const query = encodeURIComponent(getMapsSearchQuery(contact))
  return `https://www.google.com/maps?q=${query}&output=embed`
}

export function getMapsOpenUrl(contact) {
  const query = encodeURIComponent(getMapsSearchQuery(contact))
  return `https://www.google.com/maps/search/?api=1&query=${query}`
}
