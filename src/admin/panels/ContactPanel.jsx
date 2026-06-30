import { useSite } from '../../context/SiteContext'
import { AdminCard, AdminField, AdminInput, AdminSaveNote } from '../ui/AdminField'

export default function ContactPanel() {
  const { rawData, updateSite } = useSite()

  const setContact = (key, value) =>
    updateSite((prev) => ({ ...prev, contact: { ...prev.contact, [key]: value } }))

  const setPhone = (index, value) =>
    updateSite((prev) => {
      const phones = [...prev.contact.phones]
      phones[index] = value
      return { ...prev, contact: { ...prev.contact, phones } }
    })

  const setPhoneLink = (index, value) =>
    updateSite((prev) => {
      const phoneLinks = [...prev.contact.phoneLinks]
      phoneLinks[index] = value
      return { ...prev, contact: { ...prev.contact, phoneLinks } }
    })

  return (
    <div className="space-y-6">
      <AdminSaveNote />

      <AdminCard title="İletişim Bilgileri">
        <AdminField label="Adres">
          <AdminInput value={rawData.contact.address} onChange={(e) => setContact('address', e.target.value)} />
        </AdminField>
        <AdminField label="E-Posta">
          <AdminInput type="email" value={rawData.contact.email} onChange={(e) => setContact('email', e.target.value)} />
        </AdminField>

        <div className="grid gap-4 sm:grid-cols-2">
          {[0, 1].map((i) => (
            <div key={i} className="space-y-3 rounded-xl border border-wine/10 bg-cream p-4">
              <AdminField label={`Telefon ${i + 1} (görünen)`}>
                <AdminInput value={rawData.contact.phones[i] || ''} onChange={(e) => setPhone(i, e.target.value)} />
              </AdminField>
              <AdminField label="Arama linki (tel:)" hint="Örn: +905331139862">
                <AdminInput value={rawData.contact.phoneLinks[i] || ''} onChange={(e) => setPhoneLink(i, e.target.value)} />
              </AdminField>
            </div>
          ))}
        </div>
      </AdminCard>
    </div>
  )
}
