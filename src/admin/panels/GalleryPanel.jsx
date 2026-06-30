import { useSite } from '../../context/SiteContext'
import { AdminCard, AdminField, AdminInput, AdminSaveNote } from '../ui/AdminField'

export default function GalleryPanel() {
  const { rawData, updateSite } = useSite()

  const updateItem = (index, key, value) =>
    updateSite((prev) => {
      const gallery = [...prev.gallery]
      gallery[index] = { ...gallery[index], [key]: value }
      return { ...prev, gallery }
    })

  return (
    <div className="space-y-6">
      <AdminSaveNote />

      {rawData.gallery.map((item, index) => (
        <AdminCard key={index} title={`Galeri ${index + 1}`}>
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Dosya adı" hint="public/ klasöründeki görsel">
              <AdminInput value={item.src} onChange={(e) => updateItem(index, 'src', e.target.value)} />
            </AdminField>
            <AdminField label="Etiket">
              <AdminInput value={item.label} onChange={(e) => updateItem(index, 'label', e.target.value)} />
            </AdminField>
            <AdminField label="Alt metin (alt)">
              <AdminInput value={item.alt} onChange={(e) => updateItem(index, 'alt', e.target.value)} />
            </AdminField>
          </div>
          <img
            src={`${import.meta.env.BASE_URL}${item.src}`}
            alt={item.alt}
            className="mt-2 h-36 w-full rounded-xl object-cover"
          />
        </AdminCard>
      ))}
    </div>
  )
}
