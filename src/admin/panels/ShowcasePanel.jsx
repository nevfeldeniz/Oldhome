import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useSite } from '../../context/SiteContext'
import { getShowcasePricing } from '../../utils/roomPricing'
import { ROOM_AVAILABILITY, ROOM_AVAILABILITY_OPTIONS } from '../../utils/roomAvailability'
import RoomAvailabilityBadge from '../../components/RoomAvailabilityBadge'
import { AdminCard, AdminField, AdminInput, AdminTextarea, AdminSelect, AdminSaveNote } from '../ui/AdminField'

export default function ShowcasePanel() {
  const { rawData, updateSite } = useSite()
  const [openId, setOpenId] = useState(rawData.showcaseRooms[0]?.id)

  const updateRoom = (id, key, value) =>
    updateSite((prev) => ({
      ...prev,
      showcaseRooms: prev.showcaseRooms.map((room) => {
        if (room.id !== id) return room
        const next = { ...room, [key]: value }
        if (key === 'type') {
          const pricing = getShowcasePricing(value)
          next.price = pricing.price
          if (pricing.oldPrice) next.oldPrice = pricing.oldPrice
          else delete next.oldPrice
        }
        return next
      }),
    }))

  const updateImages = (id, value) =>
    updateSite((prev) => ({
      ...prev,
      showcaseRooms: prev.showcaseRooms.map((room) =>
        room.id === id
          ? { ...room, images: value.split('\n').map((s) => s.trim()).filter(Boolean) }
          : room,
      ),
    }))

  const updateFeatures = (id, value) =>
    updateSite((prev) => ({
      ...prev,
      showcaseRooms: prev.showcaseRooms.map((room) =>
        room.id === id
          ? { ...room, features: value.split('\n').map((s) => s.trim()).filter(Boolean) }
          : room,
      ),
    }))

  const updateAvailability = (id, availability) =>
    updateSite((prev) => ({
      ...prev,
      showcaseRooms: prev.showcaseRooms.map((room) => {
        if (room.id !== id) return room
        const next = { ...room, availability }
        if (availability !== ROOM_AVAILABILITY.OCCUPIED_UNTIL) delete next.occupiedUntil
        return next
      }),
    }))

  const updateOccupiedUntil = (id, occupiedUntil) =>
    updateSite((prev) => ({
      ...prev,
      showcaseRooms: prev.showcaseRooms.map((room) =>
        room.id === id ? { ...room, occupiedUntil } : room,
      ),
    }))

  return (
    <div className="space-y-6">
      <AdminSaveNote />

      {rawData.showcaseRooms.map((room) => {
        const isOpen = openId === room.id
        return (
          <AdminCard
            key={room.id}
            title={room.number}
            action={
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : room.id)}
                className="inline-flex items-center gap-1 text-sm text-wine"
              >
                {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                {isOpen ? 'Kapat' : 'Düzenle'}
              </button>
            }
          >
            <div className="flex flex-wrap items-center gap-3 text-sm text-ink/60">
              <span className="rounded-full bg-wine/10 px-3 py-1 text-wine">{room.type}</span>
              <RoomAvailabilityBadge room={room} />
              {room.oldPrice && <span className="line-through">{room.oldPrice}</span>}
              <span className="font-medium text-wine">{room.price}</span>
            </div>

            {isOpen && (
              <div className="mt-4 space-y-4 border-t border-wine/10 pt-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <AdminField label="Oda Numarası">
                    <AdminInput value={room.number} onChange={(e) => updateRoom(room.id, 'number', e.target.value)} />
                  </AdminField>
                  <AdminField label="Oda Tipi">
                    <AdminSelect value={room.type} onChange={(e) => updateRoom(room.id, 'type', e.target.value)}>
                      <option value="Tek">Tek Kişilik</option>
                      <option value="Çift">Çift Kişilik</option>
                      <option value="3 Kişilik">3 Kişilik</option>
                    </AdminSelect>
                  </AdminField>
                  <AdminField label="Fiyat">
                    <AdminInput value={room.price} onChange={(e) => updateRoom(room.id, 'price', e.target.value)} />
                  </AdminField>
                  <AdminField label="Eski Fiyat (indirimli odalar)">
                    <AdminInput
                      value={room.oldPrice || ''}
                      onChange={(e) => updateRoom(room.id, 'oldPrice', e.target.value || undefined)}
                      placeholder="Örn. 3.200 TL"
                    />
                  </AdminField>
                </div>

                <AdminField label="Açıklama">
                  <AdminTextarea
                    rows={4}
                    value={room.description}
                    onChange={(e) => updateRoom(room.id, 'description', e.target.value)}
                  />
                </AdminField>

                <AdminField
                  label="Müsaitlik Durumu"
                  hint="Sitede yalnızca seçtiğiniz durum görünür. Misafirler oda kartında bu bilgiyi görür."
                >
                  <AdminSelect
                    value={room.availability || ROOM_AVAILABILITY.AVAILABLE}
                    onChange={(e) => updateAvailability(room.id, e.target.value)}
                  >
                    {ROOM_AVAILABILITY_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </AdminSelect>
                  <p className="mt-2 text-xs text-ink/50">
                    {
                      ROOM_AVAILABILITY_OPTIONS.find(
                        (option) => option.value === (room.availability || ROOM_AVAILABILITY.AVAILABLE),
                      )?.hint
                    }
                  </p>
                </AdminField>

                {(room.availability || ROOM_AVAILABILITY.AVAILABLE) === ROOM_AVAILABILITY.OCCUPIED_UNTIL && (
                  <AdminField
                    label="Dolu olduğu son tarih"
                    hint="Örn. 15 Temmuz seçilirse sitede “15 Temmuz'a kadar dolu” yazar."
                  >
                    <AdminInput
                      type="date"
                      value={room.occupiedUntil || ''}
                      onChange={(e) => updateOccupiedUntil(room.id, e.target.value)}
                    />
                  </AdminField>
                )}

                <AdminField label="Görseller (4 adet, her satıra bir dosya adı)" hint="public/ klasöründeki dosyalar">
                  <AdminTextarea rows={4} value={room.images.join('\n')} onChange={(e) => updateImages(room.id, e.target.value)} />
                </AdminField>

                <AdminField label="Özellikler (her satıra bir tane)">
                  <AdminTextarea rows={5} value={room.features.join('\n')} onChange={(e) => updateFeatures(room.id, e.target.value)} />
                </AdminField>

                {room.images[0] && (
                  <img
                    src={`${import.meta.env.BASE_URL}${room.images[0]}`}
                    alt={`${room.number} at Old Home Boutique Hotel Cyprus`}
                    className="h-40 w-full rounded-xl object-cover"
                  />
                )}
              </div>
            )}
          </AdminCard>
        )
      })}
    </div>
  )
}
