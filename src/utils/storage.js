import { defaultSiteData } from '../data/defaultSite'

export const STORAGE_KEY = 'oldhome_site_data'
export const ADMIN_PASSWORD_KEY = 'oldhome_admin_password'
export const ADMIN_SESSION_KEY = 'oldhome_admin_session'
export const DEFAULT_ADMIN_PASSWORD = 'oldhome2024'

export function resolveAsset(path) {
  if (!path) return ''
  if (path.startsWith('http') || path.startsWith('data:') || path.startsWith('/')) {
    return path.startsWith('/') ? `${import.meta.env.BASE_URL}${path.slice(1)}` : path
  }
  return `${import.meta.env.BASE_URL}${path}`
}

export function hydrateSiteData(raw) {
  return {
    ...raw,
    hero: {
      ...raw.hero,
      image: resolveAsset(raw.hero?.image),
    },
    about: {
      ...raw.about,
      image: resolveAsset(raw.about?.image),
    },
    rooms: raw.rooms.map((room) => ({
      ...room,
      image: resolveAsset(room.image),
    })),
    showcaseRooms: raw.showcaseRooms.map((room) => ({
      ...room,
      images: room.images.map(resolveAsset),
    })),
    outdoorGallery: (raw.outdoorGallery || []).map((item) => ({
      ...item,
      src: resolveAsset(item.src),
    })),
    gallery: raw.gallery.map((item) => ({
      ...item,
      src: resolveAsset(item.src),
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
    rooms: hydrated.rooms.map((room) => ({
      ...room,
      image: strip(room.image),
    })),
    showcaseRooms: hydrated.showcaseRooms.map((room) => ({
      ...room,
      images: room.images.map(strip),
    })),
    outdoorGallery: (hydrated.outdoorGallery || []).map((item) => ({
      ...item,
      src: strip(item.src),
    })),
    gallery: hydrated.gallery.map((item) => ({
      ...item,
      src: strip(item.src),
    })),
  }
}

export function loadRawSiteData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch {
    // Bozuk kayıt varsa varsayılana dön
  }
  return structuredClone(defaultSiteData)
}

export function saveRawSiteData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function resetRawSiteData() {
  localStorage.removeItem(STORAGE_KEY)
  return structuredClone(defaultSiteData)
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
