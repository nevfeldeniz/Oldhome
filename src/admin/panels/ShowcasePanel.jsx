import { useState } from 'react'
import {
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
} from 'lucide-react'
import { useSite } from '../../context/SiteContext'
import { getRoomMaxCapacityLabel } from '../../utils/roomCapacity'
import { ROOM_AVAILABILITY, ROOM_AVAILABILITY_OPTIONS } from '../../utils/roomAvailability'
import { createEmptyShowcaseRoom } from '../../utils/storage'
import RoomAvailabilityBadge from '../../components/RoomAvailabilityBadge'
import FeatureChecklist from '../ui/FeatureChecklist'
import SortableImageList from '../ui/SortableImageList'
import { AdminCard, AdminField, AdminInput, AdminTextarea, AdminSelect, AdminSaveNote } from '../ui/AdminField'

export default function ShowcasePanel() {
  const { rawData, updateSite } = useSite()
  const rooms = rawData.showcaseRooms || []
  const [openId, setOpenId] = useState(rooms[0]?.id)

  const setRooms = (nextRooms) =>
    updateSite((prev) => ({
      ...prev,
      showcaseRooms: nextRooms.map((room, index) => ({ ...room, sortOrder: index })),
    }))

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

  const addRoom = () => {
    const room = createEmptyShowcaseRoom(rooms)
    setRooms([...rooms, room])
    setOpenId(room.id)
  }

  const deleteRoom = (id) => {
    const room = rooms.find((item) => item.id === id)
    if (!window.confirm(`“${room?.number || 'Oda'}” silinsin mi? Bu işlem geri alınabilir (Üstteki Geri Al).`)) return
    const next = rooms.filter((item) => item.id !== id)
    setRooms(next)
    if (openId === id) setOpenId(next[0]?.id ?? null)
  }

  const toggleHidden = (id) =>
    updateSite((prev) => ({
      ...prev,
      showcaseRooms: prev.showcaseRooms.map((room) =>
        room.id === id ? { ...room, hidden: !room.hidden } : room,
      ),
    }))

  const moveRoom = (id, direction) => {
    const index = rooms.findIndex((room) => room.id === id)
    if (index < 0) return
    const target = index + direction
    if (target < 0 || target >= rooms.length) return
    const next = [...rooms]
    const [moved] = next.splice(index, 1)
    next.splice(target, 0, moved)
    setRooms(next)
  }

  return (
    <div className="space-y-6">
      <AdminSaveNote />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink/60">{rooms.length} oda — gizlenenler sitede görünmez</p>
        <button type="button" onClick={addRoom} className="btn-primary !px-4 !py-2 text-sm">
          <Plus className="h-4 w-4" />
          Yeni Oda Ekle
        </button>
      </div>

      {rooms.map((room, index) => {
        const isOpen = openId === room.id
        const folder = `rooms/${String(room.id).padStart(3, '0')}`
        return (
          <AdminCard
            key={room.id}
            title={room.number}
            action={
              <div className="flex flex-wrap items-center gap-1">
                <button
                  type="button"
                  onClick={() => moveRoom(room.id, -1)}
                  disabled={index === 0}
                  className="rounded-lg p-1.5 text-ink/45 hover:bg-wine/5 hover:text-wine disabled:opacity-30"
                  aria-label="Yukarı taşı"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => moveRoom(room.id, 1)}
                  disabled={index === rooms.length - 1}
                  className="rounded-lg p-1.5 text-ink/45 hover:bg-wine/5 hover:text-wine disabled:opacity-30"
                  aria-label="Aşağı taşı"
                >
                  <ArrowDown className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => toggleHidden(room.id)}
                  className="rounded-lg p-1.5 text-ink/45 hover:bg-wine/5 hover:text-wine"
                  aria-label={room.hidden ? 'Aktif et' : 'Gizle'}
                  title={room.hidden ? 'Sitede göster' : 'Siteden gizle'}
                >
                  {room.hidden ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
                <button
                  type="button"
                  onClick={() => deleteRoom(room.id)}
                  className="rounded-lg p-1.5 text-ink/45 hover:bg-red-50 hover:text-red-700"
                  aria-label="Odayı sil"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : room.id)}
                  className="inline-flex items-center gap-1 text-sm text-wine"
                >
                  {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  {isOpen ? 'Kapat' : 'Düzenle'}
                </button>
              </div>
            }
          >
            <div className="flex flex-wrap items-center gap-3 text-sm text-ink/60">
              <span className="rounded-full bg-wine/10 px-3 py-1 font-medium text-wine">
                {getRoomMaxCapacityLabel(room)}
              </span>
              <RoomAvailabilityBadge room={room} />
              {room.hidden && (
                <span className="rounded-full bg-ink/10 px-3 py-1 text-xs font-medium text-ink/70">Gizli</span>
              )}
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

                <AdminField label="Galeri Görselleri" hint="Sürükleyerek sıralayın · İlk fotoğraf kapaktır">
                  <SortableImageList
                    items={room.images?.length ? room.images : []}
                    onChange={(images) => updateImages(room.id, images)}
                    previewBase={import.meta.env.BASE_URL}
                    roomFolder={folder}
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
