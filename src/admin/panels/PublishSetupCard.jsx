import { useState } from 'react'
import { CheckCircle, Loader2, Wand2, Download } from 'lucide-react'
import { useSite } from '../../context/SiteContext'
import { isLivePublishConfigured } from '../../config/publish'
import {
  createJsonBinWithData,
  downloadPublishConfigFile,
  getStoredPublishConfig,
  saveStoredPublishConfig,
} from '../../utils/jsonBinPublish'
import { AdminCard, AdminField, AdminInput } from '../ui/AdminField'

export default function PublishSetupCard() {
  const { rawData } = useSite()
  const [masterKey, setMasterKey] = useState('')
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')
  const [config, setConfig] = useState(() => getStoredPublishConfig())
  const publishReady = isLivePublishConfigured()

  const handleSetup = async (e) => {
    e.preventDefault()
    if (!masterKey.trim()) {
      setMessage('JSONBin Master Key gerekli.')
      return
    }

    setStatus('loading')
    setMessage('')

    try {
      const created = await createJsonBinWithData(masterKey.trim(), rawData)
      saveStoredPublishConfig(created)
      setConfig(created)
      downloadPublishConfigFile(created.binId, created.accessKey)
      setMasterKey('')
      setStatus('success')
      setMessage(
        'Kurulum tamam! publish-config.json indirildi. Dosyayı public/ klasörüne koyup GitHub\'a bir kez yükleyin. Sonrasında yalnızca «Kaydet ve Yayınla» yeterli.',
      )
    } catch (err) {
      setStatus('error')
      setMessage(err.message || 'Kurulum başarısız.')
    }
  }

  const handleRedownload = () => {
    if (!config?.binId || !config?.accessKey) return
    downloadPublishConfigFile(config.binId, config.accessKey)
    setMessage('publish-config.json tekrar indirildi.')
  }

  if (publishReady) {
    return (
      <AdminCard title="Canlı Yayınlama">
        <div className="flex items-start gap-3 text-sm text-emerald-800">
          <CheckCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <div>
            <p className="font-semibold">Aktif — tek tıkla yayınlama hazır</p>
            <p className="mt-1 text-emerald-900/80">
              Değişiklik yaptıktan sonra üstteki <strong>Değişiklikleri Kaydet ve Yayınla</strong> butonuna basın.
              Ziyaretçiler birkaç saniye içinde güncel içeriği görür.
            </p>
            {config?.binId && (
              <p className="mt-2 text-xs text-emerald-900/60">
                JSONBin ID: <code>{config.binId}</code>
              </p>
            )}
          </div>
        </div>
        {config?.binId && (
          <button type="button" onClick={handleRedownload} className="btn-outline mt-4">
            <Download className="h-4 w-4" />
            publish-config.json İndir
          </button>
        )}
        {message && <p className="mt-3 text-sm text-wine">{message}</p>}
      </AdminCard>
    )
  }

  return (
    <AdminCard title="Canlı Yayınlama Kurulumu (tek seferlik, ~3 dk)">
      <ol className="list-decimal space-y-2 pl-5 text-sm text-ink/70">
        <li>
          <a href="https://jsonbin.io" target="_blank" rel="noopener noreferrer" className="text-wine underline">
            jsonbin.io
          </a>{' '}
          sitesine ücretsiz kayıt olun.
        </li>
        <li>
          Dashboard → <strong>API Keys</strong> → <strong>X-Master-Key</strong> değerini kopyalayın.
        </li>
        <li>Aşağıya yapıştırıp <strong>Otomatik Kur</strong>&apos;a basın.</li>
        <li>İndirilen <code className="text-wine">publish-config.json</code> dosyasını projenin{' '}
          <code className="text-wine">public/</code> klasörüne kaydedin ve GitHub&apos;a yükleyin (bir kez).</li>
      </ol>

      <form onSubmit={handleSetup} className="mt-4 space-y-4">
        <AdminField label="JSONBin X-Master-Key">
          <AdminInput
            type="password"
            value={masterKey}
            onChange={(e) => setMasterKey(e.target.value)}
            placeholder="ör. $2a$10$..."
            autoComplete="off"
          />
        </AdminField>
        <button type="submit" disabled={status === 'loading'} className="btn-primary">
          {status === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
          Otomatik Kur
        </button>
      </form>

      {message && (
        <p
          className={`mt-4 rounded-xl border px-4 py-3 text-sm ${
            status === 'error' ? 'border-red-200 bg-red-50 text-red-800' : 'border-wine/20 bg-wine/5 text-wine'
          }`}
        >
          {message}
        </p>
      )}
    </AdminCard>
  )
}
