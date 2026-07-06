import { getPublicPublishConfig, getSiteDataUrl } from '../config/publish'
import { fetchJsonBinRecord } from './jsonBinPublish'
import { mergeSiteData } from './storage'

export async function fetchLiveSiteData() {
  const publicCfg = await getPublicPublishConfig()
  if (publicCfg?.binId) {
    try {
      const record = await fetchJsonBinRecord(publicCfg.binId, publicCfg.accessKey)
      if (record) return mergeSiteData(record)
    } catch {
      /* JSONBin erişilemezse site-data.json'a düş */
    }
  }

  try {
    const res = await fetch(getSiteDataUrl(), { cache: 'no-store' })
    if (res.ok) return mergeSiteData(await res.json())
  } catch {
    /* offline */
  }

  return null
}
