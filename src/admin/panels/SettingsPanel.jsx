import { useRef, useState } from 'react'
import { Download, Upload, RotateCcw, KeyRound, Link2, ShieldCheck } from 'lucide-react'
import { useSite } from '../../context/SiteContext'
import { getAdminPassword, setAdminPassword } from '../../utils/storage'
import { getPublishConfig, testPublishConnection } from '../../utils/livePublish'
import { PUBLISH_TARGET } from '../../config/publish'
import { AdminCard, AdminField, AdminInput } from '../ui/AdminField'

export default function SettingsPanel() {
  const { exportSite, importSite, resetSite, saveAndPublish, updatePublishConfig, publishing } = useSite()
  const fileRef = useRef(null)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [publishConfig, setPublishConfig] = useState(() => getPublishConfig())
  const [testing, setTesting] = useState(false)

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

  const handlePublishConfigSave = (e) => {
    e.preventDefault()
    updatePublishConfig(publishConfig)
    setMessage('Yayın bağlantısı kaydedildi. Artık «Değişiklikleri Kaydet ve Yayınla» butonunu kullanabilirsiniz.')
  }

  const handleTestConnection = async () => {
    setTesting(true)
    setMessage('')
    updatePublishConfig(publishConfig)
    try {
      const result = await testPublishConnection()
      setMessage(`Bağlantı başarılı. Hedef repo: ${result.repo || `${PUBLISH_TARGET.owner}/${PUBLISH_TARGET.repo}`}`)
    } catch (err) {
      setMessage(err.message || 'Bağlantı testi başarısız.')
    } finally {
      setTesting(false)
    }
  }

  const handlePublishNow = async () => {
    updatePublishConfig(publishConfig)
    const result = await saveAndPublish()
    if (result.ok) {
      setMessage('Değişiklikler canlı siteye yayınlandı.')
    }
  }

  return (
    <div className="space-y-6">
      {message && (
        <p className="rounded-xl border border-wine/20 bg-wine/5 px-4 py-3 text-sm text-wine">{message}</p>
      )}

      <AdminCard title="Canlı Yayın Bağlantısı (bir kez kurulur)">
        <p className="text-sm leading-relaxed text-ink/65">
          Admin panelindeki «Değişiklikleri Kaydet ve Yayınla» butonu, site verisini otomatik olarak GitHub&apos;a
          yükler. Bu bağlantı site sahibi tarafından yalnızca bir kez ayarlanır; sonrasında teknik bilgi gerekmez.
        </p>
        <p className="mt-2 text-sm text-ink/60">
          Hedef repo: <code className="text-wine">{PUBLISH_TARGET.owner}/{PUBLISH_TARGET.repo}</code>
        </p>
        <form onSubmit={handlePublishConfigSave} className="mt-4 space-y-4">
          <AdminField label="Yayın API Adresi" hint="Cloudflare Worker URL (ör. https://oldhome-publish.xxx.workers.dev)">
            <AdminInput
              value={publishConfig.apiUrl}
              onChange={(e) => setPublishConfig((prev) => ({ ...prev, apiUrl: e.target.value }))}
              placeholder="https://..."
            />
          </AdminField>
          <AdminField label="Yayın Şifresi" hint="Worker'da tanımlanan PUBLISH_SECRET ile aynı olmalı">
            <AdminInput
              type="password"
              value={publishConfig.secret}
              onChange={(e) => setPublishConfig((prev) => ({ ...prev, secret: e.target.value }))}
              placeholder="Güvenli bir şifre"
            />
          </AdminField>
          <div className="flex flex-wrap gap-3">
            <button type="submit" className="btn-primary">
              <Link2 className="h-4 w-4" />
              Bağlantıyı Kaydet
            </button>
            <button type="button" onClick={handleTestConnection} disabled={testing} className="btn-outline">
              <ShieldCheck className="h-4 w-4" />
              {testing ? 'Test ediliyor…' : 'Bağlantıyı Test Et'}
            </button>
            <button type="button" onClick={handlePublishNow} disabled={publishing} className="btn-outline">
              {publishing ? 'Yayınlanıyor…' : 'Şimdi Yayınla'}
            </button>
          </div>
        </form>
        <details className="mt-4 rounded-xl border border-wine/10 bg-sand/40 px-4 py-3 text-sm text-ink/70">
          <summary className="cursor-pointer font-medium text-wine">Kurulum (site sahibi — bir kez)</summary>
          <ol className="mt-3 list-decimal space-y-2 pl-5">
            <li>Cloudflare hesabında <code>workers/</code> klasöründeki worker&apos;ı deploy edin.</li>
            <li>Worker&apos;a <code>GITHUB_TOKEN</code> (repo yazma izni) ve <code>PUBLISH_SECRET</code> ekleyin.</li>
            <li>Worker URL ve şifreyi yukarıya girin, «Bağlantıyı Kaydet» deyin.</li>
            <li>Artık herkes admin panelinden tek tuşla yayınlayabilir.</li>
          </ol>
        </details>
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
