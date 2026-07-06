import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useSite } from '../../context/SiteContext'
import { getRoomMaxCapacityLabel } from '../../utils/roomCapacity'
import { ROOM_AVAILABILITY, ROOM_AVAILABILITY_OPTIONS } from '../../utils/roomAvailability'
import RoomAvailabilityBadge from '../../components/RoomAvailabilityBadge'
import FeatureChecklist from '../ui/FeatureChecklist'
import SortableImageList from '../ui/SortableImageList'
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
        if (key === 'type' && value === '3 Kişilik') next.maxGuests = 3
        if (key === 'type' && value !== '3 Kişilik' && !next.maxGuests) next.maxGuests = 2
        return next
      }),
    }))

  const updateImages = (id, images) =>
    updateSite((prev) => ({
      ...prev,
      showcaseRooms: prev.showcaseRooms.map((room) =>
        room.id === id ? { ...room, images: images.filter(Boolean) } : room,
      ),
    }))

  const updateFeatures = (id, features) =>
    updateSite((prev) => ({
      ...prev,
      showcaseRooms: prev.showcaseRooms.map((room) =>
        room.id === id ? { ...room, features } : room,
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
              <span className="rounded-full bg-wine/10 px-3 py-1 font-medium text-wine">
                {getRoomMaxCapacityLabel(room)}
              </span>
              <RoomAvailabilityBadge room={room} />
            </div>

            {isOpen && (
              <div className="mt-4 space-y-4 border-t border-wine/10 pt-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <AdminField label="Oda Numarası">
                    <AdminInput value={room.number} onChange={(e) => updateRoom(room.id, 'number', e.target.value)} />
                  </AdminField>
                  <AdminField label="Oda Tipi (filtre)">
                    <AdminSelect value={room.type} onChange={(e) => updateRoom(room.id, 'type', e.target.value)}>
                      <option value="Tek">Tek Kişilik</option>
                      <option value="Çift">Çift Kişilik</option>
                      <option value="3 Kişilik">3 Kişilik</option>
                    </AdminSelect>
                  </AdminField>
                  <AdminField label="Maksimum Kapasite">
                    <AdminSelect
                      value={room.maxGuests ?? (room.type === '3 Kişilik' ? 3 : 2)}
                      onChange={(e) => updateRoom(room.id, 'maxGuests', Number(e.target.value))}
                    >
                      <option value={2}>Maksimum 2 Misafir</option>
                      <option value={3}>Maksimum 3 Misafir</option>
                    </AdminSelect>
                  </AdminField>
                </div>

                <AdminField label="Açıklama">
                  <AdminTextarea
                    rows={4}
                    value={room.description}
                    onChange={(e) => updateRoom(room.id, 'description', e.target.value)}
                  />
                </AdminField>

                <AdminField label="Müsaitlik Durumu">
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
                </AdminField>

                {(room.availability || ROOM_AVAILABILITY.AVAILABLE) === ROOM_AVAILABILITY.OCCUPIED_UNTIL && (
                  <AdminField label="Dolu olduğu son tarih">
                    <AdminInput
                      type="date"
                      value={room.occupiedUntil || ''}
                      onChange={(e) => updateOccupiedUntil(room.id, e.target.value)}
                    />
                  </AdminField>
                )}

                <AdminField label="Galeri Görselleri" hint="Sürükleyerek sıralayın">
                  <SortableImageList
                    items={room.images?.length ? room.images : ['']}
                    onChange={(images) => updateImages(room.id, images)}
                    previewBase={import.meta.env.BASE_URL}
                  />
                </AdminField>

                <AdminField label="Oda Özellikleri">
                  <FeatureChecklist
                    selected={room.features}
                    onChange={(features) => updateFeatures(room.id, features)}
                  />
                </AdminField>
              </div>
            )}
          </AdminCard>
        )
      })}
    </div>
  )
}
