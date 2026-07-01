import { useSite } from '../../context/SiteContext'
import { AdminCard, AdminField, AdminInput, AdminTextarea, AdminSaveNote } from '../ui/AdminField'

export default function RoomTypesPanel() {
  const { rawData, updateSite } = useSite()

  const updateRoom = (index, key, value) =>
    updateSite((prev) => {
      const rooms = [...prev.rooms]
      rooms[index] = { ...rooms[index], [key]: value }
      return { ...prev, rooms }
    })

  const updateFeatures = (index, value) =>
    updateSite((prev) => {
      const rooms = [...prev.rooms]
      rooms[index] = {
        ...rooms[index],
        features: value.split('\n').map((f) => f.trim()).filter(Boolean),
      }
      return { ...prev, rooms }
    })

  const toggleFeatured = (index) =>
    updateSite((prev) => {
      const rooms = prev.rooms.map((room, i) => ({
        ...room,
        featured: i === index ? !room.featured : false,
      }))
      return { ...prev, rooms }
    })

  return (
    <div className="space-y-6">
      <AdminSaveNote />

      {rawData.rooms.map((room, index) => (
        <AdminCard
          key={room.name}
          title={room.name}
          action={
            <label className="flex items-center gap-2 text-sm text-ink/70">
              <input
                type="checkbox"
                checked={!!room.featured}
                onChange={() => toggleFeatured(index)}
                className="accent-wine"
              />
              En Popüler
            </label>
          }
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Oda Adı">
              <AdminInput value={room.name} onChange={(e) => updateRoom(index, 'name', e.target.value)} />
            </AdminField>
            <AdminField label="Kapasite">
              <AdminInput value={room.capacity} onChange={(e) => updateRoom(index, 'capacity', e.target.value)} />
            </AdminField>
            <AdminField label="Fiyat">
              <AdminInput value={room.price} onChange={(e) => updateRoom(index, 'price', e.target.value)} />
            </AdminField>
            <AdminField label="Eski Fiyat (indirim, boş bırakılabilir)">
              <AdminInput
                value={room.oldPrice || ''}
                onChange={(e) => updateRoom(index, 'oldPrice', e.target.value || undefined)}
              />
            </AdminField>
          </div>
          <AdminField label="Görsel dosyası" hint="public/ klasöründeki dosya adı, örn: oldhome-cyprus-room-001-01.jpg">
            <AdminInput value={room.image} onChange={(e) => updateRoom(index, 'image', e.target.value)} />
          </AdminField>
          <AdminField label="Özellikler (her satıra bir tane)">
            <AdminTextarea
              rows={5}
              value={room.features.join('\n')}
              onChange={(e) => updateFeatures(index, e.target.value)}
            />
          </AdminField>
        </AdminCard>
      ))}
    </div>
  )
}
