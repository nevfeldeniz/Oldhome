import { useEffect, useState } from 'react'
import { fetchPublishedSiteSnapshot, hasUnpublishedRoomAvailability } from '../../utils/publishStatus'

export function usePublishStatus(rawData) {
  const [publishedData, setPublishedData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    fetchPublishedSiteSnapshot().then((data) => {
      if (!cancelled) {
        setPublishedData(data)
        setLoading(false)
      }
    })

    return () => {
      cancelled = true
    }
  }, [])

  const roomAvailabilityOutOfSync = hasUnpublishedRoomAvailability(rawData, publishedData)

  return { loading, roomAvailabilityOutOfSync }
}
