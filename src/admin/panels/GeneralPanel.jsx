import { useSite } from '../../context/SiteContext'
import { AdminCard, AdminField, AdminInput, AdminTextarea, AdminSaveNote } from '../ui/AdminField'

export default function GeneralPanel() {
  const { rawData, updateSite } = useSite()

  const setHero = (key, value) =>
    updateSite((prev) => ({ ...prev, hero: { ...prev.hero, [key]: value } }))

  const setAbout = (key, value) =>
    updateSite((prev) => ({ ...prev, about: { ...prev.about, [key]: value } }))

  const setStat = (index, key, value) =>
    updateSite((prev) => {
      const stats = [...prev.about.stats]
      stats[index] = { ...stats[index], [key]: value }
      return { ...prev, about: { ...prev.about, stats } }
    })

  const setFooter = (value) =>
    updateSite((prev) => ({ ...prev, footer: { slogan: value } }))

  const setRoomsNote = (value) => updateSite((prev) => ({ ...prev, roomsNote: value }))

  return (
    <div className="space-y-6">
      <AdminSaveNote />

      <AdminCard title="Hero (Ana Karşılama)">
        <AdminField label="Marka Adı">
          <AdminInput value={rawData.hero.brand} onChange={(e) => setHero('brand', e.target.value)} />
        </AdminField>
        <AdminField label="Welcome Home">
          <AdminInput value={rawData.hero.welcome} onChange={(e) => setHero('welcome', e.target.value)} />
        </AdminField>
        <AdminField label="Alt Başlık">
          <AdminInput value={rawData.hero.subtitle} onChange={(e) => setHero('subtitle', e.target.value)} />
        </AdminField>
        <AdminField label="Açıklama">
          <AdminTextarea value={rawData.hero.description} onChange={(e) => setHero('description', e.target.value)} />
        </AdminField>
        <AdminField label="Ana Sayfa Görseli" hint="public/ klasöründeki dosya (örn. oldhome-cyprus-hotel-exterior.jpg)">
          <AdminInput value={rawData.hero.image || ''} onChange={(e) => setHero('image', e.target.value)} />
        </AdminField>
      </AdminCard>

      <AdminCard title="Hakkımızda">
        <AdminField label="Başlık">
          <AdminInput value={rawData.about.title} onChange={(e) => setAbout('title', e.target.value)} />
        </AdminField>
        <AdminField label="Paragraf">
          <AdminTextarea rows={5} value={rawData.about.paragraph} onChange={(e) => setAbout('paragraph', e.target.value)} />
        </AdminField>
        <AdminField label="Hakkımızda Görseli" hint="public/ klasöründeki SEO dosya adı">
          <AdminInput value={rawData.about.image || ''} onChange={(e) => setAbout('image', e.target.value)} />
        </AdminField>
        <AdminField label="Görsel Alt Metni (EN)">
          <AdminInput value={rawData.about.imageAlt || ''} onChange={(e) => setAbout('imageAlt', e.target.value)} />
        </AdminField>
        <div className="grid gap-4 sm:grid-cols-3">
          {rawData.about.stats.map((stat, i) => (
            <div key={i} className="space-y-3 rounded-xl border border-wine/10 bg-cream p-4">
              <AdminField label={`İstatistik ${i + 1} - Değer`}>
                <AdminInput value={stat.value} onChange={(e) => setStat(i, 'value', e.target.value)} />
              </AdminField>
              <AdminField label="Etiket">
                <AdminInput value={stat.label} onChange={(e) => setStat(i, 'label', e.target.value)} />
              </AdminField>
            </div>
          ))}
        </div>
      </AdminCard>

      <AdminCard title="Diğer Metinler">
        <AdminField label="Oda Notu (çocuk ücretsiz)">
          <AdminInput value={rawData.roomsNote} onChange={(e) => setRoomsNote(e.target.value)} />
        </AdminField>
        <AdminField label="Footer Sloganı">
          <AdminInput value={rawData.footer.slogan} onChange={(e) => setFooter(e.target.value)} />
        </AdminField>
      </AdminCard>
    </div>
  )
}
