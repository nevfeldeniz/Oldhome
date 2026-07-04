import { useSite } from '../../context/SiteContext'
import { AdminCard } from '../ui/AdminField'

export default function DashboardPanel() {
  const { site } = useSite()
  const occupied = site.showcaseRooms.filter((r) => r.availability === 'occupied').length
  const available = site.showcaseRooms.filter((r) => r.availability === 'available').length

  const stats = [
    { label: 'Toplam Oda', value: site.showcaseRooms.length, hint: 'Galeri odaları' },
    { label: 'Rezervasyona Açık', value: available, hint: 'Müsait odalar' },
    { label: 'Dolu / Kapalı', value: occupied, hint: 'Dolu işaretli' },
    { label: 'Fiyat Kartı', value: site.rooms.length, hint: 'Ana sayfa fiyat bölümü' },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-wine/10 bg-gradient-to-br from-cream to-parchment p-5 shadow-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-wine/70">{s.label}</p>
            <p className="mt-2 font-serif text-4xl font-semibold text-wine-dark">{s.value}</p>
            <p className="mt-1 text-xs text-ink/50">{s.hint}</p>
          </div>
        ))}
      </div>

      <AdminCard title="Hızlı Kontrol Listesi">
        <ul className="grid gap-2 text-sm text-ink/70 sm:grid-cols-2">
          <li>• Oda düzenlemeleri otomatik kaydedilir.</li>
          <li>• Müsaitlik ve fiyat değişiklikleri için <strong>Canlı Siteye Yayınla</strong> gerekir.</li>
          <li>• Görseller <code className="text-wine">public/</code> klasörüne yüklenir.</li>
          <li>• Admin: <code className="text-wine">/Oldhome/admin</code></li>
        </ul>
      </AdminCard>
    </div>
  )
}
