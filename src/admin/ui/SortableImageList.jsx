import { useRef, useState } from 'react'
import { GripVertical, ImagePlus, Replace, Upload, X } from 'lucide-react'
import { previewSrc } from '../../utils/imageOptimize'

export default function SortableImageList({ items = [], onChange, previewBase = '', roomFolder = '' }) {
  const [dragIndex, setDragIndex] = useState(null)
  const fileRef = useRef(null)
  const replaceIndexRef = useRef(null)

  const list = items.length ? items : ['']

  const commit = (next) => onChange(next)

  const reorder = (from, to) => {
    if (from === null || from === to) return
    const next = [...list]
    const [moved] = next.splice(from, 1)
    next.splice(to, 0, moved)
    commit(next)
  }

  const updateAt = (index, value) => {
    const next = [...list]
    next[index] = value
    commit(next)
  }

  const removeAt = (index) => {
    const next = list.filter((_, i) => i !== index)
    commit(next.length ? next : [''])
  }

  const addEmpty = () => commit([...list.filter(Boolean), ''])

  const handleFiles = (fileList, replaceIndex = null) => {
    const files = Array.from(fileList || [])
    if (!files.length) return
    const names = files.map((file) => (roomFolder ? `${roomFolder}/${file.name}` : file.name))
    if (replaceIndex !== null) {
      const next = [...list]
      next[replaceIndex] = names[0]
      if (names.length > 1) next.splice(replaceIndex + 1, 0, ...names.slice(1))
      commit(next)
    } else {
      commit([...list.filter(Boolean), ...names])
    }
  }

  return (
    <div className="space-y-3">
      <ul className="space-y-2">
        {list.map((src, index) => (
          <li
            key={`img-${index}`}
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
            {src ? (
              <img
                src={previewSrc(src, previewBase)}
                alt=""
                className="h-14 w-20 shrink-0 rounded-lg object-cover"
              />
            ) : (
              <span className="grid h-14 w-20 shrink-0 place-items-center rounded-lg bg-parchment text-[10px] text-ink/40">
                Önizleme
              </span>
            )}
            <input
              type="text"
              value={src}
              onChange={(e) => updateAt(index, e.target.value)}
              className="min-w-0 flex-1 rounded-lg border border-wine/15 px-3 py-2 text-xs text-ink outline-none focus:border-wine"
              placeholder="dosya-adı.jpg"
            />
            <button
              type="button"
              onClick={() => {
                replaceIndexRef.current = index
                fileRef.current?.click()
              }}
              className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-ink/40 hover:bg-wine/5 hover:text-wine"
              title="Fotoğraf değiştir"
              aria-label="Fotoğraf değiştir"
            >
              <Replace className="h-4 w-4" />
            </button>
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
          onClick={addEmpty}
          className="inline-flex items-center gap-2 rounded-xl border border-dashed border-wine/25 px-4 py-2.5 text-sm text-wine transition hover:border-wine/40 hover:bg-wine/5"
        >
          <ImagePlus className="h-4 w-4" />
          Fotoğraf satırı ekle
        </button>
        <button
          type="button"
          onClick={() => {
            replaceIndexRef.current = null
            fileRef.current?.click()
          }}
          className="inline-flex items-center gap-2 rounded-xl border border-wine/20 bg-wine/5 px-4 py-2.5 text-sm font-medium text-wine transition hover:bg-wine/10"
        >
          <Upload className="h-4 w-4" />
          Fotoğraf ekle (çoklu)
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            handleFiles(e.target.files, replaceIndexRef.current)
            e.target.value = ''
            replaceIndexRef.current = null
          }}
        />
      </div>

      {roomFolder && (
        <p className="text-xs text-ink/55">
          Seçilen dosya adları kaydedilir. Dosyaları <code className="text-wine">public/{roomFolder}/</code>{' '}
          klasörüne koyun; sonra <strong>Kaydet ve Yayınla</strong> deyin.
        </p>
      )}
    </div>
  )
}
