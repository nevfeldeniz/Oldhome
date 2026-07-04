import { useState } from 'react'
import { GripVertical, X } from 'lucide-react'

export default function SortableImageList({ items = [], onChange, previewBase = '' }) {
  const [dragIndex, setDragIndex] = useState(null)

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

  return (
    <ul className="space-y-2">
      {items.map((src, index) => (
        <li
          key={`${src}-${index}`}
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
              src={`${previewBase}${src}`}
              alt=""
              className="h-14 w-20 shrink-0 rounded-lg object-cover"
            />
          )}
          <input
            type="text"
            value={src}
            onChange={(e) => {
              const next = [...items]
              next[index] = e.target.value
              onChange(next)
            }}
            className="min-w-0 flex-1 rounded-lg border border-wine/15 px-3 py-2 text-xs text-ink outline-none focus:border-wine"
            placeholder="dosya-adı.jpg"
          />
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
      <li>
        <button
          type="button"
          onClick={() => onChange([...items, ''])}
          className="w-full rounded-xl border border-dashed border-wine/25 py-2.5 text-sm text-wine transition hover:border-wine/40 hover:bg-wine/5"
        >
          + Görsel ekle
        </button>
      </li>
    </ul>
  )
}
