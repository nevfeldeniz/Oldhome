import { getStoredPublishConfig } from '../utils/jsonBinPublish'

/** GitHub deposu (yedek senkron için). */
export const PUBLISH_TARGET = {
  owner: import.meta.env.VITE_GITHUB_OWNER || 'nevfeldeniz',
  repo: import.meta.env.VITE_GITHUB_REPO || 'Oldhome',
  branch: import.meta.env.VITE_GITHUB_BRANCH || 'main',
  filePath: 'public/site-data.json',
}

let cachedPublicConfig = null

export async function getPublicPublishConfig() {
  if (cachedPublicConfig) return cachedPublicConfig

  try {
    const res = await fetch(`${import.meta.env.BASE_URL}publish-config.json`, { cache: 'no-store' })
    if (res.ok) {
      const data = await res.json()
      if (data.enabled && data.binId) {
        cachedPublicConfig = data
        return data
      }
    }
  } catch {
    /* publish-config yok */
  }

  const envBin = import.meta.env.VITE_JSONBIN_BIN_ID
  const envAccess = import.meta.env.VITE_JSONBIN_ACCESS_KEY
  if (envBin && envAccess) {
    cachedPublicConfig = { enabled: true, binId: envBin, accessKey: envAccess }
    return cachedPublicConfig
  }

  return null
}

/** Ziyaretçilerin okuduğu site-data.json adresi (Worker modu). */
export function getSiteDataUrl() {
  const custom = import.meta.env.VITE_SITE_DATA_URL
  if (custom) return custom
  return `${import.meta.env.BASE_URL}site-data.json`
}

export function getPublishApiUrl() {
  return (import.meta.env.VITE_PUBLISH_API_URL || '').replace(/\/$/, '')
}

export function getActivePublishConfig() {
  const stored = getStoredPublishConfig()
  if (stored?.binId && stored?.masterKey) return { mode: 'jsonbin', ...stored }

  const envBin = import.meta.env.VITE_JSONBIN_BIN_ID
  const envMaster = import.meta.env.VITE_JSONBIN_MASTER_KEY
  if (envBin && envMaster) {
    return {
      mode: 'jsonbin',
      binId: envBin,
      masterKey: envMaster,
      accessKey: import.meta.env.VITE_JSONBIN_ACCESS_KEY || '',
      isPublic: true,
    }
  }

  // publish-config.json'daki binId + localStorage masterKey birleşimi
  if (cachedPublicConfig?.binId && stored?.masterKey) {
    return {
      mode: 'jsonbin',
      binId: cachedPublicConfig.binId,
      masterKey: stored.masterKey,
      accessKey: cachedPublicConfig.accessKey || '',
      isPublic: true,
    }
  }

  const apiUrl = getPublishApiUrl()
  const secret = import.meta.env.VITE_PUBLISH_SECRET
  if (apiUrl && secret) return { mode: 'worker', apiUrl, secret }

  return null
}

export function isLivePublishConfigured() {
  if (getActivePublishConfig()) return true
  // public config yüklendikten sonra masterKey bağlanabilir
  const stored = getStoredPublishConfig()
  return Boolean(stored?.masterKey && (stored?.binId || cachedPublicConfig?.binId))
}
