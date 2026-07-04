import { useSite } from '../../context/SiteContext'
import { AdminCard, AdminField, AdminInput, AdminTextarea, AdminSaveNote } from '../ui/AdminField'

export default function SeoPanel() {
  const { rawData, updateSite } = useSite()
  const seo = rawData.seo || {}

  const setSeo = (key, value) =>
    updateSite((prev) => ({
      ...prev,
      seo: { ...(prev.seo || {}), [key]: value },
    }))

  return (
    <div className="space-y-6">
      <AdminSaveNote />

      <AdminCard title="SEO — Arama Motorları">
        <AdminField label="Sayfa Başlığı (Title)" hint="Google arama sonuçlarında görünen başlık">
          <AdminInput value={seo.title || ''} onChange={(e) => setSeo('title', e.target.value)} />
        </AdminField>
        <AdminField label="Meta Açıklama (Description)" hint="150–160 karakter önerilir">
          <AdminTextarea rows={3} value={seo.description || ''} onChange={(e) => setSeo('description', e.target.value)} />
        </AdminField>
        <AdminField label="Meta Keywords" hint="Virgülle ayırın: otel, kıbrıs, lefkoşa">
          <AdminInput value={seo.keywords || ''} onChange={(e) => setSeo('keywords', e.target.value)} />
        </AdminField>
      </AdminCard>

      <AdminCard title="Open Graph — Sosyal Paylaşım">
        <AdminField label="OG Başlık">
          <AdminInput value={seo.ogTitle || ''} onChange={(e) => setSeo('ogTitle', e.target.value)} />
        </AdminField>
        <AdminField label="OG Açıklama">
          <AdminTextarea rows={2} value={seo.ogDescription || ''} onChange={(e) => setSeo('ogDescription', e.target.value)} />
        </AdminField>
        <AdminField label="OG Görsel" hint="public/ klasöründeki dosya adı">
          <AdminInput value={seo.ogImage || ''} onChange={(e) => setSeo('ogImage', e.target.value)} />
        </AdminField>
        <AdminField label="OG Görsel Alt Metni">
          <AdminInput value={seo.ogImageAlt || ''} onChange={(e) => setSeo('ogImageAlt', e.target.value)} />
        </AdminField>
        {seo.ogImage && (
          <img
            src={`${import.meta.env.BASE_URL}${seo.ogImage}`}
            alt={seo.ogImageAlt || 'OG önizleme'}
            className="mt-2 h-40 w-full max-w-md rounded-xl object-cover"
          />
        )}
      </AdminCard>
    </div>
  )
}
