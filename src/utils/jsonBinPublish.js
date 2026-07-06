const JSONBIN_API = 'https://api.jsonbin.io/v3'

export const PUBLISH_CONFIG_KEY = 'oldhome_jsonbin_config'

export function getStoredPublishConfig() {
  try {
    const saved = localStorage.getItem(PUBLISH_CONFIG_KEY)
    if (saved) return JSON.parse(saved)
  } catch {
    /* geçersiz kayıt */
  }
  return null
}

export function saveStoredPublishConfig(config) {
  localStorage.setItem(PUBLISH_CONFIG_KEY, JSON.stringify(config))
}

export function clearStoredPublishConfig() {
  localStorage.removeItem(PUBLISH_CONFIG_KEY)
}

async function parseJsonBinResponse(res, step = '') {
  const payload = await res.json().catch(() => ({}))
  if (!res.ok) {
    const detail = payload.message || payload.error || `HTTP ${res.status}`
    throw new Error(step ? `${step}: ${detail}` : detail)
  }
  return payload
}

/** Yeni public bin oluşturur (okuma anahtarı gerekmez — bin herkese açık). */
export async function createJsonBinWithData(accountMasterKey, data) {
  const trimmedKey = accountMasterKey.trim()
  if (!trimmedKey) throw new Error('JSONBin X-Master-Key boş olamaz.')

  const res = await fetch(`${JSONBIN_API}/b`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Master-Key': trimmedKey,
      'X-Bin-Private': 'false',
      'X-Bin-Name': 'oldhome-site-data',
    },
    body: JSON.stringify(data),
  })

  const payload = await parseJsonBinResponse(res, 'Bin oluşturulamadı')
  const binId = payload.metadata?.id
  if (!binId) throw new Error('Bin oluşturuldu ama ID alınamadı.')

  return {
    binId,
    masterKey: trimmedKey,
    accessKey: '',
    isPublic: true,
  }
}

export async function updateJsonBin(binId, masterKey, data) {
  const res = await fetch(`${JSONBIN_API}/b/${binId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Master-Key': masterKey,
    },
    body: JSON.stringify(data),
  })

  await parseJsonBinResponse(res, 'Yayınlama başarısız')
  return { ok: true }
}

export async function fetchJsonBinRecord(binId, accessKey = '') {
  const headers = {}
  if (accessKey) headers['X-Access-Key'] = accessKey

  const res = await fetch(`${JSONBIN_API}/b/${binId}/latest`, {
    headers,
    cache: 'no-store',
  })

  const payload = await parseJsonBinResponse(res, 'Site verisi okunamadı')
  return payload.record
}

export function downloadPublishConfigFile(binId, accessKey = '') {
  const content = JSON.stringify({ enabled: true, binId, accessKey, isPublic: !accessKey }, null, 2)
  const blob = new Blob([content], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'publish-config.json'
  a.click()
  URL.revokeObjectURL(url)
}

/** Kurulum öncesi anahtarın geçerli olup olmadığını dener. */
export async function validateJsonBinMasterKey(accountMasterKey) {
  const res = await fetch(`${JSONBIN_API}/b`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Master-Key': accountMasterKey.trim(),
      'X-Bin-Private': 'true',
      'X-Bin-Name': 'oldhome-test',
    },
    body: JSON.stringify({ test: true }),
  })

  const payload = await parseJsonBinResponse(res, 'Anahtar geçersiz')
  const binId = payload.metadata?.id
  if (binId) {
    await fetch(`${JSONBIN_API}/b/${binId}`, {
      method: 'DELETE',
      headers: { 'X-Master-Key': accountMasterKey.trim() },
    }).catch(() => {})
  }
  return true
}
