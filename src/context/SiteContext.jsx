import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { defaultSiteData } from '../data/defaultSite'
import { publishSiteDataLive } from '../utils/livePublish'
import { fetchLiveSiteData } from '../utils/fetchSiteData'
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
  return fetchLiveSiteData()
}

function isAdminPath(pathname = '') {
  return /\/admin(\/|$)/.test(pathname)
}

export function SiteProvider({ children }) {
  const location = useLocation()
  const onAdmin = isAdminPath(location.pathname)

  const [rawData, setRawData] = useState(() => mergeSiteData(defaultSiteData))
  const [publishState, setPublishState] = useState({ status: 'idle', message: '' })

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
    setPublishState({ status: 'idle', message: '' })
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
    setPublishState({ status: 'idle', message: '' })
  }

  const importSite = (jsonString) => {
    const parsed = JSON.parse(jsonString)
    const merged = mergeSiteData(parsed)
    if (!merged.hero || !merged.rooms?.length || !merged.showcaseRooms?.length) {
      throw new Error('Geçersiz site dosyası.')
    }
    saveRawSiteData(merged)
    setRawData(merged)
    setPublishState({ status: 'idle', message: '' })
  }

  const exportSite = () => exportSiteJson(rawData)
  const publishSite = () => exportPublishedSiteJson(rawData)

  const saveAndPublish = useCallback(async () => {
    setPublishState({ status: 'loading', message: '' })
    try {
      saveRawSiteData(rawData)
      await publishSiteDataLive(rawData)
      setPublishState({
        status: 'success',
        message: 'Değişiklikler canlı siteye kaydedildi. Ziyaretçiler birkaç saniye içinde görebilir.',
      })
      return true
    } catch (err) {
      setPublishState({
        status: 'error',
        message: err.message || 'Yayınlama başarısız oldu.',
      })
      return false
    }
  }, [rawData])

  const clearPublishState = useCallback(() => {
    setPublishState({ status: 'idle', message: '' })
  }, [])

  return (
    <SiteContext.Provider
      value={{
        site,
        rawData,
        updateSite,
        resetSite,
        importSite,
        exportSite,
        publishSite,
        saveAndPublish,
        publishState,
        clearPublishState,
        onAdmin,
      }}
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
