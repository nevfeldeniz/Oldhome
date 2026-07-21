import { defaultSiteData } from '../data/defaultSite'
import { normalizeRatePlans } from './roomPricing'

export const STORAGE_KEY = 'oldhome_site_data'
export const ADMIN_PASSWORD_KEY = 'oldhome_admin_password'
export const ADMIN_SESSION_KEY = 'oldhome_admin_session'
export const DEFAULT_ADMIN_PASSWORD = 'oldhome2024'
export const SITE_SYNC_CHANNEL = 'oldhome_site_sync'

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

function normalizeOldPrice(value) {
  if (value === undefined || value === null) return undefined
  const trimmed = String(value).trim()
  return trimmed ? trimmed : undefined
}

function mergePricingRooms(baseRooms, savedRooms, savedRevision = 0) {
  const baseRevision = defaultSiteData.pricingRoomsRevision ?? 0
  const needsImageRefresh = savedRevision < baseRevision

  if (!Array.isArray(savedRooms) || savedRooms.length === 0) return baseRooms

  const baseById = new Map(baseRooms.map((room) => [room.id, room]))
  const baseByName = new Map(baseRooms.map((room) => [room.name, room]))

  return savedRooms.map((saved, index) => {
    const base = baseById.get(saved.id) || baseByName.get(saved.name) || baseRooms[index] || {}
    const stale = STALE_PRICING_ROOM_IMAGES.has(saved.image) || needsImageRefresh
    return {
      ...base,
      ...saved,
      id: saved.id || base.id || `pricing-${index + 1}`,
      name: saved.name || base.name || `Kart ${index + 1}`,
      price: saved.price ?? base.price ?? '',
      oldPrice: normalizeOldPrice(saved.oldPrice !== undefined ? saved.oldPrice : base.oldPrice),
      image: stale ? base.image : saved.image || base.image,
      imageAlt: stale ? base.imageAlt : saved.imageAlt || base.imageAlt,
      features: saved.features?.length ? saved.features : base.features || [],
      featured: saved.featured ?? base.featured ?? false,
      capacity: saved.capacity ?? base.capacity ?? '',
    }
  })
}

/** Kaydedilmiş oda listesi kaynak doğrudur — ekle / sil / gizle / sıra desteklenir. */
function mergeShowcaseRooms(baseRooms, savedRooms) {
  if (!Array.isArray(savedRooms) || savedRooms.length === 0) return baseRooms

  const baseById = new Map(baseRooms.map((room) => [room.id, room]))

  return savedRooms
    .map((saved, index) => {
      const base = baseById.get(saved.id) || {}
      const stale = usesStaleRoomImages(saved.images)
      const availability = saved.availability ?? base.availability ?? 'available'
      return {
        ...base,
        ...saved,
        id: saved.id ?? base.id ?? `room-${index + 1}`,
        number: saved.number || base.number || `Oda ${index + 1}`,
        type: saved.type || base.type || 'Çift',
        maxGuests: saved.maxGuests ?? base.maxGuests ?? (saved.type === '3 Kişilik' ? 3 : 2),
        description: saved.description ?? base.description ?? '',
        features: Array.isArray(saved.features) && saved.features.length ? saved.features : base.features || [],
        images: stale && base.images?.length ? base.images : saved.images?.length ? saved.images : base.images || [],
        availability,
        occupiedUntil: availability === 'occupied_until' ? saved.occupiedUntil || base.occupiedUntil || '' : undefined,
        hidden: Boolean(saved.hidden),
        sortOrder: saved.sortOrder ?? index,
      }
    })
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
}

function filterOutdoorGallery(items) {
  return (items || []).filter((item) => item?.src && !REMOVED_OUTDOOR_IMAGES.has(item.src))
}

export function resolveAsset(path) {
  if (!path) return ''
  if (path.startsWith('http') || path.startsWith('data:') || path.startsWith('blob:')) return path
  if (path.startsWith('/')) return `${import.meta.env.BASE_URL}${path.slice(1)}`
  return `${import.meta.env.BASE_URL}${path}`
}

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
    seo: { ...base.seo, ...(raw.seo || {}) },
    quickInfoBar: Array.isArray(raw.quickInfoBar) ? raw.quickInfoBar : base.quickInfoBar,
    ratePlans: normalizeRatePlans(raw.ratePlans ?? base.ratePlans),
    roomsNote: raw.roomsNote ?? base.roomsNote,
    pricingRoomsRevision: base.pricingRoomsRevision,
    showcaseRoomsRevision: base.showcaseRoomsRevision,
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
      oldPrice: normalizeOldPrice(room?.oldPrice),
    })),
    showcaseRooms: (data.showcaseRooms || [])
      .filter((room) => !room.hidden)
      .map((room) => ({
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
    if (url.startsWith('data:') || url.startsWith('http') || url.startsWith('blob:')) return url
    const base = import.meta.env.BASE_URL
    if (url.startsWith(base)) return url.slice(base.length)
    return url
  }

  return {
    ...hydrated,
    hero: {
      ...hydrated.hero,
      image: strip(hydrated.hero?.image),
      imageMobile: strip(hydrated.hero?.imageMobile),
    },
    about: {
      ...hydrated.about,
      image: strip(hydrated.about?.image),
    },
    rooms: (hydrated.rooms || []).map((room) => ({
      ...room,
      image: strip(room.image),
      oldPrice: normalizeOldPrice(room.oldPrice),
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
    /* bozuk kayıt */
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

export function exportPublishedSiteJson(data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'site-data.json'
  a.click()
  URL.revokeObjectURL(url)
}

export function createEmptyShowcaseRoom(existing = []) {
  const nextIndex = existing.length + 1
  const maxId = existing.reduce((max, room) => Math.max(max, Number(room.id) || 0), 0)
  return {
    id: maxId + 1,
    number: `Oda ${nextIndex}`,
    type: 'Çift',
    maxGuests: 2,
    description: '',
    features: ['Ücretsiz Wi-Fi', 'Klima', 'Smart TV', 'Özel Banyo'],
    images: [],
    availability: 'available',
    hidden: false,
    sortOrder: existing.length,
  }
}

export function broadcastSiteSync() {
  try {
    if (typeof BroadcastChannel === 'undefined') return
    const channel = new BroadcastChannel(SITE_SYNC_CHANNEL)
    channel.postMessage({ type: 'site-updated', at: Date.now() })
    channel.close()
  } catch {
    /* desteklenmiyor */
  }
}
