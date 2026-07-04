import { useState } from 'react'
import { GripVertical } from 'lucide-react'
import { useSite } from '../../context/SiteContext'
import { AdminCard, AdminField, AdminInput, AdminSaveNote } from '../ui/AdminField'

export default function GalleryPanel() {
  const { rawData, updateSite } = useSite()
  const [dragIndex, setDragIndex] = useState(null)
  const items = rawData.outdoorGallery || []

  const updateOutdoorItem = (index, key, value) =>
    updateSite((prev) => {
      const outdoorGallery = [...(prev.outdoorGallery || [])]
      outdoorGallery[index] = { ...outdoorGallery[index], [key]: value }
      return { ...prev, outdoorGallery }
    })

  const reorder = (from, to) => {
    if (from === null || from === to) return
    updateSite((prev) => {
      const outdoorGallery = [...(prev.outdoorGallery || [])]
      const [moved] = outdoorGallery.splice(from, 1)
      outdoorGallery.splice(to, 0, moved)
      return { ...prev, outdoorGallery }
    })
  }

  return (
    <div className="space-y-6">
      <AdminSaveNote />
      <p className="text-sm text-ink/60">Görselleri tutup sürükleyerek sıralayabilirsiniz.</p>

      {items.map((item, index) => (
        <AdminCard
          key={`${item.src}-${index}`}
          title={
            <span className="flex items-center gap-2">
              <span
                draggable
                onDragStart={() => setDragIndex(index)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => {
                  reorder(dragIndex, index)
                  setDragIndex(null)
                }}
                onDragEnd={() => setDragIndex(null)}
                className="cursor-grab text-ink/30"
              >
                <GripVertical className="h-4 w-4" />
              </span>
              Dış Mekân {index + 1}
            </span>
          }
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Dosya adı">
              <AdminInput value={item.src} onChange={(e) => updateOutdoorItem(index, 'src', e.target.value)} />
            </AdminField>
            <AdminField label="Etiket">
              <AdminInput value={item.label} onChange={(e) => updateOutdoorItem(index, 'label', e.target.value)} />
            </AdminField>
            <AdminField label="Alt metin">
              <AdminInput value={item.alt} onChange={(e) => updateOutdoorItem(index, 'alt', e.target.value)} />
            </AdminField>
            <AdminField label="Kategori">
              <AdminInput value={item.category} onChange={(e) => updateOutdoorItem(index, 'category', e.target.value)} />
            </AdminField>
          </div>
          <img
            src={`${import.meta.env.BASE_URL}${item.src}`}
            alt={item.alt}
            className="mt-2 aspect-[16/10] w-full rounded-xl object-cover object-center"
          />
        </AdminCard>
      ))}
    </div>
  )
}
