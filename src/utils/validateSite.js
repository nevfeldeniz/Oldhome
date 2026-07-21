/** Kaydetmeden önce eksik / geçersiz alanları kontrol eder. */

export function validateSiteData(data) {
  const errors = []

  if (!data?.hero?.brand?.trim()) errors.push('Ana sayfa: Marka adı boş olamaz.')
  if (!data?.hero?.subtitle?.trim()) errors.push('Ana sayfa: Alt başlık boş olamaz.')
  if (!data?.contact?.email?.trim()) errors.push('İletişim: E-posta boş olamaz.')
  if (!data?.social?.whatsapp?.trim()) errors.push('İletişim: WhatsApp numarası boş olamaz.')
  if (!data?.seo?.title?.trim()) errors.push('SEO: Başlık boş olamaz.')
  if (!data?.seo?.description?.trim()) errors.push('SEO: Açıklama boş olamaz.')

  if (!Array.isArray(data?.rooms) || data.rooms.length === 0) {
    errors.push('Fiyat kartları: En az bir kart olmalı.')
  } else {
    data.rooms.forEach((room, index) => {
      if (!room.name?.trim()) errors.push(`Fiyat kartı ${index + 1}: Başlık gerekli.`)
      if (!room.price?.trim()) errors.push(`Fiyat kartı ${index + 1}: Güncel fiyat gerekli.`)
    })
  }

  if (!Array.isArray(data?.showcaseRooms) || data.showcaseRooms.length === 0) {
    errors.push('Oda galerisi: En az bir oda olmalı.')
  } else {
    data.showcaseRooms.forEach((room, index) => {
      const label = room.number || `Oda ${index + 1}`
      if (!room.number?.trim()) errors.push(`${label}: Oda numarası gerekli.`)
      if (!room.description?.trim()) errors.push(`${label}: Açıklama gerekli.`)
      if (!room.images?.filter(Boolean).length && !room.hidden) {
        errors.push(`${label}: En az bir fotoğraf gerekli (veya odayı gizleyin).`)
      }
      if (room.availability === 'occupied_until' && !room.occupiedUntil) {
        errors.push(`${label}: Dolu olduğu son tarih seçilmeli.`)
      }
    })
  }

  const payloadSize = new Blob([JSON.stringify(data)]).size
  if (payloadSize > 95_000) {
    errors.push(
      `Veri boyutu çok büyük (${Math.round(payloadSize / 1024)} KB). Base64 fotoğraf kullanmayın; public/ klasöründeki dosya adlarını yazın.`,
    )
  }

  return { ok: errors.length === 0, errors }
}
