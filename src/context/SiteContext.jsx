import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { defaultSiteData } from '../data/defaultSite'
import {
  hydrateSiteData,
  mergeSiteData,
  saveRawSiteData,
  resetRawSiteData,
  exportSiteJson,
  exportPublishedSiteJson,
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
    const res = await fetch(`${import.meta.env.BASE_URL}site-data.json`, { cache: 'no-store' })
    if (res.ok) return mergeSiteData(await res.json())
  } catch {
    /* offline veya yavaş bağlantı */
  }
  return null
}

function isAdminPath(pathname = '') {
  return /\/admin(\/|$)/.test(pathname)
}

export function SiteProvider({ children }) {
  const location = useLocation()
  const onAdmin = isAdminPath(location.pathname)

  const [rawData, setRawData] = useState(() => mergeSiteData(defaultSiteData))

  useEffect(() => {
    let cancelled = false

    if (onAdmin) {
      setRawData(readStoredData() || mergeSiteData(defaultSiteData))
      return undefined
    }

    fetchPublishedData().then((published) => {
      if (!cancelled) setRawData(published || mergeSiteData(defaultSiteData))
    })

    return () => {
      cancelled = true
    }
  }, [onAdmin, location.pathname])

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
  const publishSite = () => exportPublishedSiteJson(rawData)

  return (
    <SiteContext.Provider
      value={{ site, rawData, updateSite, resetSite, importSite, exportSite, publishSite, onAdmin }}
    >
      {children}
    </SiteContext.Provider>
  )
}

export function useSite() {
  const ctx = useContext(SiteContext)
  if (!ctx) throw new Error('useSite, SiteProvider içinde kullanılmalıdır.')
  return ctx
}
