import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { defaultSiteData } from '../data/defaultSite'
import {
  hydrateSiteData,
  mergeSiteData,
  saveRawSiteData,
  resetRawSiteData,
  exportSiteJson,
  STORAGE_KEY,
} from '../utils/storage'

const SiteContext = createContext(null)

function readStoredData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return mergeSiteData(JSON.parse(saved))
  } catch {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      /* private mode */
    }
  }
  return null
}

async function fetchPublishedData() {
  if (typeof fetch === 'undefined') return null

  try {
    const res = await fetch(`${import.meta.env.BASE_URL}site-data.json`)
    if (res.ok) return mergeSiteData(await res.json())
  } catch {
    /* offline veya yavaş bağlantı */
  }
  return null
}

export function SiteProvider({ children }) {
  const [rawData, setRawData] = useState(() => readStoredData() || mergeSiteData(defaultSiteData))

  useEffect(() => {
    const stored = readStoredData()
    if (stored) {
      setRawData(stored)
      return
    }

    let cancelled = false
    fetchPublishedData().then((published) => {
      if (!cancelled && published) setRawData(published)
    })

    return () => {
      cancelled = true
    }
  }, [])

  const site = useMemo(() => {
    try {
      return hydrateSiteData(rawData)
    } catch {
      return hydrateSiteData(defaultSiteData)
    }
  }, [rawData])

  const updateSite = (updater) => {
    setRawData((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater }
      try {
        saveRawSiteData(next)
      } catch {
        /* localStorage dolu veya gizli mod */
      }
      return next
    })
  }

  const resetSite = () => {
    const defaults = resetRawSiteData()
    setRawData(defaults)
  }

  const importSite = (jsonString) => {
    const parsed = JSON.parse(jsonString)
    const merged = mergeSiteData(parsed)
    if (!merged.hero || !merged.rooms?.length || !merged.showcaseRooms?.length) {
      throw new Error('Geçersiz site dosyası.')
    }
    saveRawSiteData(merged)
    setRawData(merged)
  }

  const exportSite = () => exportSiteJson(rawData)

  return (
    <SiteContext.Provider value={{ site, rawData, updateSite, resetSite, importSite, exportSite }}>
      {children}
    </SiteContext.Provider>
  )
}

export function useSite() {
  const ctx = useContext(SiteContext)
  if (!ctx) throw new Error('useSite, SiteProvider içinde kullanılmalıdır.')
  return ctx
}
