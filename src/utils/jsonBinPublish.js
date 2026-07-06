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

async function parseJsonBinResponse(res) {
  const payload = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(payload.message || payload.error || `JSONBin hatası (HTTP ${res.status})`)
  }
  return payload
}

export async function createJsonBinWithData(accountMasterKey, data) {
  const res = await fetch(`${JSONBIN_API}/b`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Master-Key': accountMasterKey,
      'X-Bin-Private': 'false',
    },
    body: JSON.stringify(data),
  })

  const payload = await parseJsonBinResponse(res)
  const binId = payload.metadata?.id
  if (!binId) throw new Error('JSONBin oluşturulamadı.')

  const keyRes = await fetch(`${JSONBIN_API}/b/${binId}/access-keys`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Master-Key': accountMasterKey,
    },
    body: JSON.stringify({ name: 'oldhome-public-read' }),
  })

  const keyPayload = await parseJsonBinResponse(keyRes)
  const accessKey = keyPayload.key || keyPayload.accessKey

  if (!accessKey) {
    throw new Error(
      'Okuma anahtarı oluşturulamadı. JSONBin panelinden bu bin için «Access Key» oluşturup Ayarlar\'a manuel girin.',
    )
  }

  return { binId, masterKey: accountMasterKey, accessKey }
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

  await parseJsonBinResponse(res)
  return { ok: true }
}

export async function fetchJsonBinRecord(binId, accessKey) {
  const res = await fetch(`${JSONBIN_API}/b/${binId}/latest`, {
    headers: { 'X-Access-Key': accessKey },
    cache: 'no-store',
  })

  const payload = await parseJsonBinResponse(res)
  return payload.record
}

export function downloadPublishConfigFile(binId, accessKey) {
  const content = JSON.stringify({ enabled: true, binId, accessKey }, null, 2)
  const blob = new Blob([content], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'publish-config.json'
  a.click()
  URL.revokeObjectURL(url)
}
