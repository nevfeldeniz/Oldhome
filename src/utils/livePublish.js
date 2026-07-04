import { PUBLISH_TARGET } from '../config/publish'

export const PUBLISH_CONFIG_KEY = 'oldhome_publish_config'

const DEFAULT_CONFIG = {
  apiUrl: import.meta.env.VITE_PUBLISH_API_URL || '',
  secret: import.meta.env.VITE_PUBLISH_SECRET || '',
}

export function getPublishConfig() {
  try {
    const saved = localStorage.getItem(PUBLISH_CONFIG_KEY)
    const parsed = saved ? JSON.parse(saved) : {}
    return {
      apiUrl: parsed.apiUrl || DEFAULT_CONFIG.apiUrl || '',
      secret: parsed.secret || DEFAULT_CONFIG.secret || '',
    }
  } catch {
    return { ...DEFAULT_CONFIG }
  }
}

export function savePublishConfig(config) {
  localStorage.setItem(PUBLISH_CONFIG_KEY, JSON.stringify(config))
}

export function isPublishConfigured() {
  const { apiUrl, secret } = getPublishConfig()
  return Boolean(apiUrl?.trim() && secret?.trim())
}

function utf8ToBase64(str) {
  const bytes = new TextEncoder().encode(str)
  let binary = ''
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte)
  })
  return btoa(binary)
}

/** site-data.json içeriğini yayın API'si üzerinden GitHub'a yükler. */
export async function publishSiteDataLive(data) {
  const { apiUrl, secret } = getPublishConfig()
  if (!apiUrl?.trim() || !secret?.trim()) {
    throw new Error(
      'Yayın bağlantısı kurulmamış. Ayarlar bölümünden yayın API adresini ve şifresini girin.',
    )
  }

  const payload = JSON.stringify(data, null, 2)
  const response = await fetch(apiUrl.replace(/\/$/, ''), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${secret.trim()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: JSON.parse(payload) }),
  })

  let result = {}
  try {
    result = await response.json()
  } catch {
    result = {}
  }

  if (!response.ok) {
    throw new Error(result.error || result.details || 'Yayın başarısız oldu. Ayarları kontrol edin.')
  }

  return {
    ok: true,
    target: PUBLISH_TARGET,
  }
}

export async function testPublishConnection() {
  const { apiUrl, secret } = getPublishConfig()
  if (!apiUrl?.trim() || !secret?.trim()) {
    throw new Error('API adresi ve şifre gerekli.')
  }

  const response = await fetch(`${apiUrl.replace(/\/$/, '')}/health`, {
    headers: { Authorization: `Bearer ${secret.trim()}` },
  })

  if (!response.ok) {
    throw new Error('Bağlantı kurulamadı. API adresi veya şifre hatalı olabilir.')
  }

  return response.json()
}

export { utf8ToBase64 }
