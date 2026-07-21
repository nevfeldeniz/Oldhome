/** Tarayıcıda görsel sıkıştırma (kaynak dosya adı / data URL için). */

export function compressImageFile(file, { maxWidth = 1600, quality = 0.82 } = {}) {
  return new Promise((resolve, reject) => {
    if (!file?.type?.startsWith('image/')) {
      reject(new Error('Yalnızca görsel dosyaları yüklenebilir.'))
      return
    }

    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Dosya okunamadı.'))
    reader.onload = () => {
      const img = new Image()
      img.onerror = () => reject(new Error('Görsel yüklenemedi.'))
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width)
        const width = Math.round(img.width * scale)
        const height = Math.round(img.height * scale)
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)
        const dataUrl = canvas.toDataURL('image/jpeg', quality)
        resolve({ dataUrl, fileName: file.name, width, height })
      }
      img.src = reader.result
    }
    reader.readAsDataURL(file)
  })
}

export function previewSrc(src, previewBase = '') {
  if (!src) return ''
  if (src.startsWith('http') || src.startsWith('data:') || src.startsWith('blob:') || src.startsWith('/')) {
    return src.startsWith('/') ? `${previewBase}${src.slice(1)}` : src
  }
  return `${previewBase}${src}`
}
