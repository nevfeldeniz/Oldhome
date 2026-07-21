import { useRef, useState } from 'react'
import { GripVertical, ImagePlus, Star, Upload, X } from 'lucide-react'
import { compressImageFile, previewSrc } from '../../utils/imageOptimize'

export default function SortableImageList({
  items = [],
  onChange,
  previewBase = '',
  roomFolder = '',
  allowDataUrl = true,
}) {
  const [dragIndex, setDragIndex] = useState(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef(null)

  const reorder = (from, to) => {
    if (from === null || from === to) return
    const next = [...items]
    const [moved] = next.splice(from, 1)
    next.splice(to, 0, moved)
    onChange(next)
  }

  const removeAt = (index) => {
    onChange(items.filter((_, i) => i !== index))
  }

  const setCover = (index) => {
    if (index === 0) return
    const next = [...items]
    const [moved] = next.splice(index, 1)
    next.unshift(moved)
    onChange(next)
  }

  const handleFiles = async (fileList) => {
    const files = Array.from(fileList || [])
    if (!files.length) return
    setBusy(true)
    setError('')
    try {
      const added = []
      for (const file of files) {
        if (allowDataUrl) {
          const { dataUrl, fileName } = await compressImageFile(file)
          // Küçük görseller data URL; büyükse dosya adı öner
          if (dataUrl.length < 80_000) {
            added.push(dataUrl)
          } else {
            const suggested = roomFolder ? `${roomFolder}/${fileName}` : fileName
            added.push(suggested)
            setError(
              (prev) =>
                prev ||
                `${fileName} büyük olduğu için dosya adı olarak eklendi. Dosyayı public/${suggested} konumuna koyun.`,
            )
          }
        } else {
          const suggested = roomFolder ? `${roomFolder}/${file.name}` : file.name
          added.push(suggested)
        }
      }
      onChange([...items.filter(Boolean), ...added])
    } catch (err) {
      setError(err.message || 'Yükleme başarısız.')
    } finally {
      setBusy(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  return (
    <div className="space-y-3">
      <ul className="space-y-2">
        {items.map((src, index) => (
          <li
            key={`${String(src).slice(0, 40)}-${index}`}
            draggable
            onDragStart={() => setDragIndex(index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => {
              reorder(dragIndex, index)
              setDragIndex(null)
            }}
            onDragEnd={() => setDragIndex(null)}
            className={`flex items-center gap-3 rounded-xl border bg-cream p-2 transition ${
              dragIndex === index ? 'border-wine/40 opacity-60' : 'border-wine/10'
            }`}
          >
            <span className="cursor-grab text-ink/35 active:cursor-grabbing" aria-hidden>
              <GripVertical className="h-4 w-4" />
            </span>
            {src && (
              <img
                src={previewSrc(src, previewBase)}
                alt=""
                className="h-14 w-20 shrink-0 rounded-lg object-cover"
              />
            )}
            <div className="min-w-0 flex-1 space-y-1">
              <input
                type="text"
                value={src.startsWith('data:') ? `(yüklenen görsel ${index + 1})` : src}
                onChange={(e) => {
                  if (src.startsWith('data:')) return
                  const next = [...items]
                  next[index] = e.target.value
                  onChange(next)
                }}
                readOnly={src.startsWith('data:')}
                className="w-full rounded-lg border border-wine/15 px-3 py-2 text-xs text-ink outline-none focus:border-wine"
                placeholder="dosya-adı.jpg veya rooms/001/foto.jpg"
              />
              {index === 0 && (
                <p className="text-[11px] font-medium text-wine">Kapak fotoğrafı</p>
              )}
            </div>
            {index !== 0 && (
              <button
                type="button"
                onClick={() => setCover(index)}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-ink/40 hover:bg-amber-50 hover:text-amber-700"
                title="Kapak yap"
                aria-label="Kapak fotoğrafı yap"
              >
                <Star className="h-4 w-4" />
              </button>
            )}
            <button
              type="button"
              onClick={() => removeAt(index)}
              className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-ink/40 hover:bg-red-50 hover:text-red-600"
              aria-label="Görseli kaldır"
            >
              <X className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onChange([...items, ''])}
          className="inline-flex items-center gap-2 rounded-xl border border-dashed border-wine/25 px-4 py-2.5 text-sm text-wine transition hover:border-wine/40 hover:bg-wine/5"
        >
          <ImagePlus className="h-4 w-4" />
          Dosya adı ekle
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={() => fileRef.current?.click()}
          className="inline-flex items-center gap-2 rounded-xl border border-wine/20 bg-wine/5 px-4 py-2.5 text-sm font-medium text-wine transition hover:bg-wine/10 disabled:opacity-60"
        >
          <Upload className="h-4 w-4" />
          {busy ? 'Yükleniyor…' : 'Fotoğraf yükle (çoklu)'}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {roomFolder && (
        <p className="text-xs text-ink/55">
          Önerilen klasör: <code className="text-wine">public/{roomFolder}/</code>
        </p>
      )}
      {error && <p className="text-xs text-amber-800">{error}</p>}
    </div>
  )
}
