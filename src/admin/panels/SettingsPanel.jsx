import { useRef, useState } from 'react'
import { Download, Upload, RotateCcw, KeyRound } from 'lucide-react'
import { useSite } from '../../context/SiteContext'
import { getAdminPassword, setAdminPassword } from '../../utils/storage'
import { AdminCard, AdminField, AdminInput } from '../ui/AdminField'

export default function SettingsPanel() {
  const { exportSite, publishSite, importSite, resetSite } = useSite()
  const fileRef = useRef(null)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleImport = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        importSite(reader.result)
        setMessage('Site verisi başarıyla içe aktarıldı.')
      } catch (err) {
        setMessage(err.message || 'İçe aktarma başarısız.')
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  const handleReset = () => {
    if (window.confirm('Tüm değişiklikler silinip varsayılan içeriğe dönülecek. Emin misiniz?')) {
      resetSite()
      setMessage('Site varsayılan ayarlara sıfırlandı.')
    }
  }

  const handlePasswordChange = (e) => {
    e.preventDefault()
    if (newPassword.length < 6) {
      setMessage('Şifre en az 6 karakter olmalı.')
      return
    }
    if (newPassword !== confirmPassword) {
      setMessage('Şifreler eşleşmiyor.')
      return
    }
    setAdminPassword(newPassword)
    setNewPassword('')
    setConfirmPassword('')
    setMessage('Admin şifresi güncellendi.')
  }

  return (
    <div className="space-y-6">
      {message && (
        <p className="rounded-xl border border-wine/20 bg-wine/5 px-4 py-3 text-sm text-wine">{message}</p>
      )}

      <AdminCard title="Canlı Siteye Yayınlama">
        <p className="text-sm leading-relaxed text-ink/65">
          Admin değişiklikleri önce bu tarayıcıya kaydedilir. Tüm ziyaretçilerin görmesi için:
        </p>
        <ol className="list-decimal space-y-2 pl-5 text-sm text-ink/70">
          <li><strong>Canlı Siteye Yayınla</strong> butonuna tıklayın (dosya adı: <code className="text-wine">site-data.json</code>).</li>
          <li>İndirilen dosyayı projenizde <code className="text-wine">public/site-data.json</code> üzerine kaydedin.</li>
          <li>GitHub Desktop ile commit + push yapın (1-2 dk sonra site güncellenir).</li>
        </ol>
        <button type="button" onClick={publishSite} className="btn-primary mt-4">
          <Download className="h-4 w-4" />
          Canlı Siteye Yayınla (site-data.json)
        </button>
      </AdminCard>

      <AdminCard title="Yedekleme">
        <p className="text-sm text-ink/65">
          Tüm site içeriğini JSON dosyası olarak indirin veya daha önce indirdiğiniz yedeği geri yükleyin.
        </p>
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={exportSite} className="btn-primary">
            <Download className="h-4 w-4" />
            Dışa Aktar (JSON)
          </button>
          <button type="button" onClick={() => fileRef.current?.click()} className="btn-outline">
            <Upload className="h-4 w-4" />
            İçe Aktar (JSON)
          </button>
          <input ref={fileRef} type="file" accept=".json" className="hidden" onChange={handleImport} />
        </div>
      </AdminCard>

      <AdminCard title="Şifre Değiştir">
        <p className="text-sm text-ink/65">
          Mevcut şifre: <code className="text-wine">{getAdminPassword()}</code>
        </p>
        <form onSubmit={handlePasswordChange} className="grid gap-4 sm:grid-cols-2">
          <AdminField label="Yeni Şifre">
            <AdminInput type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </AdminField>
          <AdminField label="Yeni Şifre (Tekrar)">
            <AdminInput type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </AdminField>
          <div className="sm:col-span-2">
            <button type="submit" className="btn-primary">
              <KeyRound className="h-4 w-4" />
              Şifreyi Güncelle
            </button>
          </div>
        </form>
      </AdminCard>

      <AdminCard title="Tehlikeli Bölge">
        <p className="text-sm text-ink/65">
          Tüm admin değişikliklerini siler ve siteyi ilk haline döndürür.
        </p>
        <button type="button" onClick={handleReset} className="inline-flex items-center gap-2 rounded-full border border-red-300 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-800 transition hover:bg-red-100">
          <RotateCcw className="h-4 w-4" />
          Varsayılana Sıfırla
        </button>
      </AdminCard>
    </div>
  )
}
