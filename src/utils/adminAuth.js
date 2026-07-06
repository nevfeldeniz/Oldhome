import { loadRawSiteData } from './storage'

const ADMIN_SALT = 'oldhome-admin-v1'

/** Varsayılan şifre (oldhome2024) için önceden hesaplanmış hash */
export const DEFAULT_ADMIN_PASSWORD_HASH =
  '3bc54e00a941c7f985826ec1c2f7a67a6329173e129a15b33de5c296eca652d5'

export async function hashAdminPassword(password) {
  const data = new TextEncoder().encode(`${ADMIN_SALT}${password}`)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

export async function verifyAdminPassword(password, storedHash) {
  const hash = storedHash || DEFAULT_ADMIN_PASSWORD_HASH
  const inputHash = await hashAdminPassword(password)
  return inputHash === hash
}

export async function resolveAdminPasswordHash() {
  try {
    const local = loadRawSiteData()?.adminPasswordHash
    if (local) return local
  } catch {
    /* ignore */
  }

  try {
    const res = await fetch(`${import.meta.env.BASE_URL}site-data.json?t=${Date.now()}`, {
      cache: 'no-store',
    })
    if (res.ok) {
      const published = await res.json()
      if (published?.adminPasswordHash) return published.adminPasswordHash
    }
  } catch {
    /* offline */
  }

  return DEFAULT_ADMIN_PASSWORD_HASH
}
