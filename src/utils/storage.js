import { defaultSiteData } from '../data/defaultSite'

export const STORAGE_KEY = 'oldhome_site_data'
export const ADMIN_PASSWORD_KEY = 'oldhome_admin_password'
export const ADMIN_SESSION_KEY = 'oldhome_admin_session'
export const DEFAULT_ADMIN_PASSWORD = 'oldhome2024'

const REMOVED_OUTDOOR_IMAGES = new Set(['oldhome-cyprus-hotel-exterior-02.jpg'])

const STALE_ROOM_IMAGE_MARKERS = [
  'oldhome-cyprus-room-001-',
  'oldhome-cyprus-room-002-01',
  'oldhome-cyprus-hotel-exterior-02',
  'oldhome-cyprus-room-bathroom-001-01',
]

const STALE_PRICING_ROOM_IMAGES = new Set([
  'oldhome-cyprus-room-003-01.jpg',
  'oldhome-cyprus-room-001-01.jpg',
  'oldhome-cyprus-room-002-01.jpg',
  'oldhome-cyprus-pricing-room-double.jpg',
  'oldhome-cyprus-pricing-room-double-wide.jpg',
  'oldhome-cyprus-pricing-room-single.jpg',
  'oldhome-cyprus-pricing-room-double-03.jpg',
  'oldhome-cyprus-pricing-room-triple.jpg',
])

function usesStaleRoomImages(images = []) {
  return images.some((img) => STALE_ROOM_IMAGE_MARKERS.some((marker) => String(img).includes(marker)))
}

function mergePricingRooms(baseRooms, savedRooms, savedRevision = 0) {
  const baseRevision = defaultSiteData.pricingRoomsRevision ?? 0
  const needsImageRefresh = savedRevision < baseRevision

  if (!Array.isArray(savedRooms)) return baseRooms
  const savedByName = new Map(savedRooms.map((room) => [room.name, room]))
  return baseRooms.map((room) => {
    const saved = savedByName.get(room.name)
    if (!saved) return room
    const stale = STALE_PRICING_ROOM_IMAGES.has(saved.image) || needsImageRefresh
    return {
      ...saved,
      ...room,
      price: saved.price ?? room.price,
      oldPrice: saved.oldPrice ?? room.oldPrice,
      image: stale ? room.image : saved.image || room.image,
      imageAlt: stale ? room.imageAlt : saved.imageAlt || room.imageAlt,
      features: stale || !saved.features?.length ? room.features : saved.features,
      featured: saved.featured ?? room.featured,
    }
  })
}

function mergeShowcaseRooms(baseRooms, savedRooms) {
  if (!Array.isArray(savedRooms)) return baseRooms
  const savedById = new Map(savedRooms.map((room) => [room.id, room]))
  return baseRooms.map((room) => {
    const saved = savedById.get(room.id)
    if (!saved) return room
    const stale = usesStaleRoomImages(saved.images)
    return {
      ...saved,
      ...room,
      price: saved.price ?? room.price,
      oldPrice: saved.oldPrice ?? room.oldPrice,
      images: stale ? room.images : saved.images?.length ? saved.images : room.images,
      description: stale ? room.description : saved.description || room.description,
      type: stale ? room.type : saved.type || room.type,
      features: stale || !saved.features?.length ? room.features : saved.features,
      availability: saved.availability ?? room.availability ?? 'available',
      occupiedUntil:
        (saved.availability ?? room.availability ?? 'available') === 'occupied_until'
          ? saved.occupiedUntil || room.occupiedUntil || ''
          : undefined,
    }
  })
}

function filterOutdoorGallery(items) {
  return (items || []).filter((item) => item?.src && !REMOVED_OUTDOOR_IMAGES.has(item.src))
}

export function resolveAsset(path) {
  if (!path) return ''
  if (path.startsWith('http') || path.startsWith('data:') || path.startsWith('/')) {
    return path.startsWith('/') ? `${import.meta.env.BASE_URL}${path.slice(1)}` : path
  }
  return `${import.meta.env.BASE_URL}${path}`
}

/** Eksik veya eski localStorage kayıtlarını varsayılanlarla birleştirir. */
function cloneData(data) {
  return JSON.parse(JSON.stringify(data))
}

export function mergeSiteData(raw) {
  const base = cloneData(defaultSiteData)
  if (!raw || typeof raw !== 'object') return base

  return {
    ...base,
    ...raw,
    hero: { ...base.hero, ...(raw.hero || {}), imageMobile: raw.hero?.imageMobile || base.hero.imageMobile },
    about: { ...base.about, ...(raw.about || {}) },
    contact: { ...base.contact, ...(raw.contact || {}) },
    social: { ...base.social, ...(raw.social || {}) },
    footer: { ...base.footer, ...(raw.footer || {}) },
    roomsNote: raw.roomsNote ?? base.roomsNote,
    pricingRoomsRevision: base.pricingRoomsRevision,
    rooms: mergePricingRooms(base.rooms, raw.rooms, raw.pricingRoomsRevision ?? 0),
    showcaseRooms: mergeShowcaseRooms(base.showcaseRooms, raw.showcaseRooms),
    outdoorGallery: filterOutdoorGallery(Array.isArray(raw.outdoorGallery) ? raw.outdoorGallery : base.outdoorGallery),
    gallery: filterOutdoorGallery(Array.isArray(raw.gallery) ? raw.gallery : base.gallery),
  }
}

export function hydrateSiteData(raw) {
  const data = mergeSiteData(raw)

  return {
    ...data,
    hero: {
      ...data.hero,
      image: resolveAsset(data.hero?.image),
      imageMobile: resolveAsset(data.hero?.imageMobile),
    },
    about: {
      ...data.about,
      image: resolveAsset(data.about?.image),
    },
    rooms: (data.rooms || []).map((room) => ({
      ...room,
      image: resolveAsset(room?.image),
    })),
    showcaseRooms: (data.showcaseRooms || []).map((room) => ({
      ...room,
      images: (room?.images || []).map(resolveAsset),
    })),
    outdoorGallery: (data.outdoorGallery || []).map((item) => ({
      ...item,
      src: resolveAsset(item?.src),
    })),
    gallery: (data.gallery || []).map((item) => ({
      ...item,
      src: resolveAsset(item?.src),
    })),
  }
}

export function dehydrateSiteData(hydrated) {
  const strip = (url) => {
    if (!url) return ''
    const base = import.meta.env.BASE_URL
    if (url.startsWith(base)) return url.slice(base.length)
    return url
  }

  return {
    ...hydrated,
    hero: {
      ...hydrated.hero,
      image: strip(hydrated.hero?.image),
    },
    about: {
      ...hydrated.about,
      image: strip(hydrated.about?.image),
    },
    rooms: (hydrated.rooms || []).map((room) => ({
      ...room,
      image: strip(room.image),
    })),
    showcaseRooms: (hydrated.showcaseRooms || []).map((room) => ({
      ...room,
      images: (room.images || []).map(strip),
    })),
    outdoorGallery: (hydrated.outdoorGallery || []).map((item) => ({
      ...item,
      src: strip(item.src),
    })),
    gallery: (hydrated.gallery || []).map((item) => ({
      ...item,
      src: strip(item.src),
    })),
  }
}

export function loadRawSiteData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return mergeSiteData(JSON.parse(saved))
  } catch {
    // Bozuk kayıt varsa varsayılana dön
  }
  return cloneData(defaultSiteData)
}

export function saveRawSiteData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function resetRawSiteData() {
  localStorage.removeItem(STORAGE_KEY)
  return cloneData(defaultSiteData)
}

export function getAdminPassword() {
  return localStorage.getItem(ADMIN_PASSWORD_KEY) || DEFAULT_ADMIN_PASSWORD
}

export function setAdminPassword(password) {
  localStorage.setItem(ADMIN_PASSWORD_KEY, password)
}

export function isAdminLoggedIn() {
  return sessionStorage.getItem(ADMIN_SESSION_KEY) === '1'
}

export function setAdminSession(active) {
  if (active) sessionStorage.setItem(ADMIN_SESSION_KEY, '1')
  else sessionStorage.removeItem(ADMIN_SESSION_KEY)
}

export function exportSiteJson(data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `old-home-site-${new Date().toISOString().slice(0, 10)}.json`
  a.click()
  URL.revokeObjectURL(url)
}

/** Canlı site için public/site-data.json dosyasını indirir. */
export function exportPublishedSiteJson(data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'site-data.json'
  a.click()
  URL.revokeObjectURL(url)
}
