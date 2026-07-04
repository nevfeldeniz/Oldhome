import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import { useLocation } from 'react-router-dom'

import { defaultSiteData } from '../data/defaultSite'

import { getLiveSiteDataUrl } from '../config/publish'

import {

  hydrateSiteData,

  mergeSiteData,

  saveRawSiteData,

  resetRawSiteData,

  exportSiteJson,

  STORAGE_KEY,

} from '../utils/storage'

import { isPublishConfigured, publishSiteDataLive, savePublishConfig } from '../utils/livePublish'



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



  const urls = [getLiveSiteDataUrl(true), `${import.meta.env.BASE_URL}site-data.json?t=${Date.now()}`]



  for (const url of urls) {

    try {

      const res = await fetch(url, { cache: 'no-store' })

      if (res.ok) return mergeSiteData(await res.json())

    } catch {

      /* sonraki kaynağı dene */

    }

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

  const [publishing, setPublishing] = useState(false)

  const [publishMessage, setPublishMessage] = useState('')

  const [publishError, setPublishError] = useState('')

  const [lastPublishedAt, setLastPublishedAt] = useState(null)
  const [publishConfigVersion, setPublishConfigVersion] = useState(0)



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



  const saveAndPublish = async () => {

    setPublishing(true)

    setPublishError('')

    setPublishMessage('')



    try {

      saveRawSiteData(rawData)

      await publishSiteDataLive(rawData)

      const now = new Date()

      setLastPublishedAt(now)

      setPublishMessage('Değişiklikler yayınlandı. Canlı site birkaç saniye içinde güncellenir.')

      return { ok: true }

    } catch (err) {

      const message = err.message || 'Yayın başarısız oldu.'

      setPublishError(message)

      return { ok: false, error: message }

    } finally {

      setPublishing(false)

    }

  }



  const clearPublishFeedback = () => {

    setPublishMessage('')

    setPublishError('')

  }



  const updatePublishConfig = (config) => {

    savePublishConfig(config)

    setPublishConfigVersion((version) => version + 1)

  }



  return (

    <SiteContext.Provider

      value={{

        site,

        rawData,

        updateSite,

        resetSite,

        importSite,

        exportSite,

        saveAndPublish,

        updatePublishConfig,

        publishing,

        publishMessage,

        publishError,

        lastPublishedAt,

        clearPublishFeedback,

        publishConfigured: publishConfigVersion >= 0 && isPublishConfigured(),

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

