import { useSite } from '../../context/SiteContext'
import { AdminCard } from '../ui/AdminField'

export default function DashboardPanel() {
  const { site } = useSite()

  const stats = [
    { label: 'Oda Tipi', value: site.rooms.length },
    { label: 'Galeri Odası', value: site.showcaseRooms.length },
    { label: 'Dış Mekân Görseli', value: site.outdoorGallery?.length || 0 },
    { label: 'Telefon', value: site.contact.phones.length },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-wine/10 bg-cream p-5 text-center shadow-sm"
          >
            <p className="font-serif text-3xl font-semibold text-wine">{s.value}</p>
            <p className="mt-1 text-sm text-ink/60">{s.label}</p>
          </div>
        ))}
      </div>

      <AdminCard title="Hızlı Bilgi">
        <ul className="space-y-2 text-sm text-ink/70">
          <li>• Sol menüden bölümleri düzenleyin; kayıt otomatik yapılır.</li>
          <li>• Görsel dosyalarını <code className="text-wine">public/</code> klasörüne yükleyin, adminde dosya adını yazın.</li>
          <li>• Ayarlar bölümünden yedek alabilir veya varsayılana dönebilirsiniz.</li>
          <li>• Admin adresi: <code className="text-wine">/Oldhome/admin</code></li>
        </ul>
      </AdminCard>
    </div>
  )
}
