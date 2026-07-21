import { useSite } from '../../context/SiteContext'
import FeatureChecklist from '../ui/FeatureChecklist'
import { AdminCard, AdminField, AdminInput, AdminTextarea, AdminSaveNote } from '../ui/AdminField'

function RatePlanEditor({ title, rates, onChange }) {
  const updateRate = (index, key, value) => {
    const next = rates.map((rate, i) => (i === index ? { ...rate, [key]: value } : rate))
    onChange(next)
  }

  return (
    <div className="rounded-xl border border-wine/10 bg-cream p-4">
      <p className="mb-3 text-sm font-semibold text-wine-dark">{title}</p>
      <div className="space-y-3">
        {rates.map((rate, index) => (
          <div key={rate.guests} className="grid gap-3 rounded-lg border border-wine/10 bg-parchment/60 p-3 sm:grid-cols-3">
            <AdminField label={rate.label}>
              <AdminInput value={rate.label} onChange={(e) => updateRate(index, 'label', e.target.value)} />
            </AdminField>
            <AdminField label="Normal Fiyat (üstü çizili / boş bırakılabilir)">
              <AdminInput
                value={rate.oldPrice || ''}
                onChange={(e) => updateRate(index, 'oldPrice', e.target.value)}
                placeholder="Boş = indirim yok"
              />
            </AdminField>
            <AdminField label="Güncel Fiyat">
              <AdminInput
                value={rate.price || ''}
                onChange={(e) => updateRate(index, 'price', e.target.value)}
                placeholder="2.700 TL"
              />
            </AdminField>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function RoomTypesPanel() {
  const { rawData, updateSite } = useSite()
  const ratePlans = rawData.ratePlans || { max2: [], max3: [] }

  const updateRoom = (index, key, value) =>
    updateSite((prev) => {
      const rooms = [...prev.rooms]
      rooms[index] = { ...rooms[index], [key]: value }
      return { ...prev, rooms }
    })

  const updateFeatures = (index, features) =>
    updateSite((prev) => {
      const rooms = [...prev.rooms]
      rooms[index] = { ...rooms[index], features }
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

  const setRatePlans = (key, rates) =>
    updateSite((prev) => ({
      ...prev,
      ratePlans: { ...(prev.ratePlans || {}), [key]: rates },
    }))

  return (
    <div className="space-y-6">
      <AdminSaveNote />

      <AdminCard title="Konaklama Ücretleri (Tüm Odalar)">
        <p className="text-sm text-ink/60">
          Oda detay kartlarında gösterilen kişi sayısına göre fiyat listesi. Normal fiyat = üstü çizili; kampanya fiyatı = güncel fiyat.
        </p>
        <div className="space-y-4">
          <RatePlanEditor
            title="Maksimum 2 Misafir odalar"
            rates={ratePlans.max2 || []}
            onChange={(rates) => setRatePlans('max2', rates)}
          />
          <RatePlanEditor
            title="Maksimum 3 Misafir odalar"
            rates={ratePlans.max3 || []}
            onChange={(rates) => setRatePlans('max3', rates)}
          />
        </div>
      </AdminCard>

      {rawData.rooms.map((room, index) => (
        <AdminCard
          key={room.id || room.name}
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
            <AdminField label="Kart Başlığı">
              <AdminInput value={room.name} onChange={(e) => updateRoom(index, 'name', e.target.value)} />
            </AdminField>
            <AdminField label="Kapasite Etiketi (fiyat kartında)">
              <AdminInput value={room.capacity} onChange={(e) => updateRoom(index, 'capacity', e.target.value)} />
            </AdminField>
            <AdminField label="Güncel Fiyat">
              <AdminInput value={room.price} onChange={(e) => updateRoom(index, 'price', e.target.value)} />
            </AdminField>
            <AdminField label="Normal Fiyat (üstü çizili — boş = indirim yok)">
              <AdminInput
                value={room.oldPrice || ''}
                onChange={(e) => updateRoom(index, 'oldPrice', e.target.value || undefined)}
                placeholder="Boş bırakılabilir"
              />
            </AdminField>
          </div>
          <AdminField label="Kapak Görseli" hint="public/ klasöründeki dosya adı">
            <AdminInput value={room.image} onChange={(e) => updateRoom(index, 'image', e.target.value)} />
          </AdminField>
          <AdminField label="Oda Özellikleri">
            <FeatureChecklist selected={room.features} onChange={(features) => updateFeatures(index, features)} />
          </AdminField>
        </AdminCard>
      ))}
    </div>
  )
}
