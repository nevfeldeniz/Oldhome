import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { defaultSiteData } from '../data/defaultSite'
import {
  hydrateSiteData,
  saveRawSiteData,
  resetRawSiteData,
  exportSiteJson,
  STORAGE_KEY,
} from '../utils/storage'

const SiteContext = createContext(null)

async function fetchPublishedData() {
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}site-data.json?t=${Date.now()}`)
    if (res.ok) return await res.json()
  } catch {
    // Ağ hatası — varsayılana düş
  }
  return null
}

function loadInitialData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch {
    // Bozuk kayıt
  }
  return null
}

export function SiteProvider({ children }) {
  const [rawData, setRawData] = useState(defaultSiteData)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function init() {
      const local = loadInitialData()
      if (local) {
        setRawData(local)
        setLoading(false)
        return
      }

      const published = await fetchPublishedData()
      setRawData(published || structuredClone(defaultSiteData))
      setLoading(false)
    }
    init()
  }, [])

  const site = useMemo(() => hydrateSiteData(rawData), [rawData])

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
    if (!parsed.hero || !parsed.rooms || !parsed.showcaseRooms) {
      throw new Error('Geçersiz site dosyası.')
    }
    saveRawSiteData(parsed)
    setRawData(parsed)
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
