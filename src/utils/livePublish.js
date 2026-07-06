import { getActivePublishConfig, PUBLISH_TARGET } from '../config/publish'
import { updateJsonBin } from './jsonBinPublish'

async function publishViaWorker(apiUrl, secret, data) {
  const res = await fetch(`${apiUrl}/publish`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${secret}`,
    },
    body: JSON.stringify(data),
  })

  let payload = {}
  try {
    payload = await res.json()
  } catch {
    /* yanıt JSON değil */
  }

  if (!res.ok) {
    throw new Error(payload.error || `Yayınlama başarısız (HTTP ${res.status}).`)
  }

  return payload
}

export async function publishSiteDataLive(data) {
  const config = getActivePublishConfig()

  if (!config) {
    throw new Error(
      'Canlı yayınlama kurulmamış. Ayarlar → «Canlı Yayınlama Kurulumu» bölümünden tek seferlik kurulumu tamamlayın.',
    )
  }

  if (config.mode === 'jsonbin') {
    await updateJsonBin(config.binId, config.masterKey, data)
    return { ok: true, mode: 'jsonbin', target: PUBLISH_TARGET }
  }

  const payload = await publishViaWorker(config.apiUrl, config.secret, data)
  return { ok: true, mode: 'worker', target: PUBLISH_TARGET, ...payload }
}
