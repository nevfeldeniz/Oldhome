import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { defaultSiteData } from '../data/defaultSite'
import { publishSiteDataLive } from '../utils/livePublish'
import { fetchLiveSiteData } from '../utils/fetchSiteData'
import { validateSiteData } from '../utils/validateSite'
import { getPublicPublishConfig } from '../config/publish'
import {
  hydrateSiteData,
  mergeSiteData,
  saveRawSiteData,
  resetRawSiteData,
  exportSiteJson,
  exportPublishedSiteJson,
  STORAGE_KEY,
  SITE_SYNC_CHANNEL,
  broadcastSiteSync,
} from '../utils/storage'

const SiteContext = createContext(null)
const HISTORY_LIMIT = 25

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

function isAdminPath(pathname = '') {
  return /\/admin(\/|$)/.test(pathname)
}

function snapshot(data) {
  return JSON.stringify(data)
}

export function SiteProvider({ children }) {
  const location = useLocation()
  const onAdmin = isAdminPath(location.pathname)

  const [rawData, setRawData] = useState(() => mergeSiteData(defaultSiteData))
  const [publishState, setPublishState] = useState({ status: 'idle', message: '', errors: [] })
  const [dirty, setDirty] = useState(false)
  const [canUndo, setCanUndo] = useState(false)
  const historyRef = useRef([])
  const skipHistoryRef = useRef(false)

  useEffect(() => {
    getPublicPublishConfig()
  }, [])

  useEffect(() => {
    let cancelled = false

    if (onAdmin) {
      const stored = readStoredData() || mergeSiteData(defaultSiteData)
      setRawData(stored)
      historyRef.current = []
      setCanUndo(false)
      setDirty(false)
      return undefined
    }

    fetchLiveSiteData().then((published) => {
      if (!cancelled) setRawData(published || mergeSiteData(defaultSiteData))
    })

    return () => {
      cancelled = true
    }
  }, [onAdmin, location.pathname])

  useEffect(() => {
    if (onAdmin || typeof BroadcastChannel === 'undefined') return undefined

    const channel = new BroadcastChannel(SITE_SYNC_CHANNEL)
    channel.onmessage = (event) => {
      if (event.data?.type !== 'site-updated') return
      fetchLiveSiteData().then((published) => {
        if (published) setRawData(published)
      })
    }

    return () => channel.close()
  }, [onAdmin])

  const site = useMemo(() => {
    try {
      return hydrateSiteData(rawData)
    } catch {
      return hydrateSiteData(defaultSiteData)
    }
  }, [rawData])

  const pushHistory = (prev) => {
    if (skipHistoryRef.current) return
    historyRef.current = [...historyRef.current.slice(-(HISTORY_LIMIT - 1)), snapshot(prev)]
    setCanUndo(historyRef.current.length > 0)
  }

  const updateSite = (updater) => {
    setPublishState({ status: 'idle', message: '', errors: [] })
    setRawData((prev) => {
      pushHistory(prev)
      const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater }
      try {
        saveRawSiteData(next)
      } catch {
        /* localStorage dolu */
      }
      setDirty(true)
      return next
    })
  }

  const undoLastChange = useCallback(() => {
    const previous = historyRef.current.pop()
    setCanUndo(historyRef.current.length > 0)
    if (!previous) return false
    try {
      const parsed = mergeSiteData(JSON.parse(previous))
      skipHistoryRef.current = true
      setRawData(parsed)
      saveRawSiteData(parsed)
      setDirty(true)
      setPublishState({ status: 'idle', message: 'Son değişiklik geri alındı.', errors: [] })
      return true
    } catch {
      return false
    } finally {
      skipHistoryRef.current = false
    }
  }, [])

  const resetSite = () => {
    const defaults = resetRawSiteData()
    historyRef.current = []
    setCanUndo(false)
    setRawData(defaults)
    setDirty(false)
    setPublishState({ status: 'idle', message: '', errors: [] })
  }

  const importSite = (jsonString) => {
    const parsed = JSON.parse(jsonString)
    const merged = mergeSiteData(parsed)
    if (!merged.hero || !merged.rooms?.length || !merged.showcaseRooms?.length) {
      throw new Error('Geçersiz site dosyası.')
    }
    pushHistory(rawData)
    saveRawSiteData(merged)
    setRawData(merged)
    setDirty(true)
    setPublishState({ status: 'idle', message: '', errors: [] })
  }

  const exportSite = () => exportSiteJson(rawData)
  const publishSite = () => exportPublishedSiteJson(rawData)

  const saveAndPublish = useCallback(async () => {
    const validation = validateSiteData(rawData)
    if (!validation.ok) {
      setPublishState({
        status: 'error',
        message: 'Kaydetmeden önce eksik alanları tamamlayın.',
        errors: validation.errors,
      })
      return false
    }

    setPublishState({ status: 'loading', message: '', errors: [] })
    try {
      saveRawSiteData(rawData)
      await publishSiteDataLive(rawData)
      broadcastSiteSync()
      setDirty(false)
      setPublishState({
        status: 'success',
        message: 'Güncelleme başarıyla kaydedildi. Canlı site birkaç saniye içinde güncellenir.',
        errors: [],
      })
      return true
    } catch (err) {
      setPublishState({
        status: 'error',
        message: err.message || 'Yayınlama başarısız oldu.',
        errors: [],
      })
      return false
    }
  }, [rawData])

  const clearPublishState = useCallback(() => {
    setPublishState({ status: 'idle', message: '', errors: [] })
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
        undoLastChange,
        canUndo,
        dirty,
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
