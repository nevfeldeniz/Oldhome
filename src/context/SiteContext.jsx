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

async function fetchPublishedData() {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 5000)

  try {
    const res = await fetch(`${import.meta.env.BASE_URL}site-data.json`, {
      signal: controller.signal,
    })
    if (res.ok) {
      const json = await res.json()
      return mergeSiteData(json)
    }
  } catch {
    // Ağ hatası veya zaman aşımı
  } finally {
    clearTimeout(timeout)
  }
  return null
}

function loadInitialData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return mergeSiteData(JSON.parse(saved))
  } catch {
    localStorage.removeItem(STORAGE_KEY)
  }
  return null
}

export function SiteProvider({ children }) {
  const [rawData, setRawData] = useState(defaultSiteData)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function init() {
      try {
        const local = loadInitialData()
        if (local) {
          setRawData(local)
          return
        }

        const published = await fetchPublishedData()
        setRawData(published || structuredClone(defaultSiteData))
      } catch {
        setRawData(structuredClone(defaultSiteData))
      } finally {
        setLoading(false)
      }
    }
    init()
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
      saveRawSiteData(next)
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

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream text-wine">
        <p className="font-serif text-lg">Yükleniyor...</p>
      </div>
    )
  }

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
