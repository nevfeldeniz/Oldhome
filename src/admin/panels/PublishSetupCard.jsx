import { useEffect, useState } from 'react'
import { CheckCircle, Loader2, Link2, Wand2, Download } from 'lucide-react'
import { useSite } from '../../context/SiteContext'
import { getPublicPublishConfig, isLivePublishConfigured } from '../../config/publish'
import {
  createJsonBinWithData,
  downloadPublishConfigFile,
  getStoredPublishConfig,
  saveStoredPublishConfig,
  updateJsonBin,
} from '../../utils/jsonBinPublish'
import { AdminCard, AdminField, AdminInput } from '../ui/AdminField'

export default function PublishSetupCard() {
  const { rawData } = useSite()
  const [masterKey, setMasterKey] = useState('')
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')
  const [config, setConfig] = useState(() => getStoredPublishConfig())
  const [publicBinId, setPublicBinId] = useState('')
  const [ready, setReady] = useState(() => isLivePublishConfigured())

  useEffect(() => {
    getPublicPublishConfig().then((pub) => {
      if (pub?.binId) setPublicBinId(pub.binId)
    })
  }, [])

  const finishReady = (nextConfig) => {
    saveStoredPublishConfig(nextConfig)
    setConfig(nextConfig)
    setReady(true)
    setMasterKey('')
    setStatus('success')
  }

  const handleLinkExisting = async (e) => {
    e.preventDefault()
    if (!masterKey.trim()) {
      setMessage('JSONBin Master Key gerekli.')
      return
    }
    if (!publicBinId) {
      setMessage('publish-config.json içinde binId bulunamadı.')
      return
    }

    setStatus('loading')
    setMessage('')
    try {
      await updateJsonBin(publicBinId, masterKey.trim(), rawData)
      const next = {
        binId: publicBinId,
        masterKey: masterKey.trim(),
        accessKey: '',
        isPublic: true,
      }
      finishReady(next)
      setMessage('Mevcut yayın bağlantısı bağlandı. Artık Kaydet ve Yayınla çalışır.')
    } catch (err) {
      setStatus('error')
      setMessage(
        (err.message || 'Bağlantı başarısız.') +
          ' Master Key, bu bin\'i oluşturan hesaba ait olmalı.',
      )
    }
  }

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
      finishReady(created)
      downloadPublishConfigFile(created.binId, created.accessKey)
      setMessage(
        'Kurulum tamam! publish-config.json indirildi. Dosyayı public/ klasörüne koyup GitHub\'a bir kez yükleyin.',
      )
    } catch (err) {
      setStatus('error')
      const hint =
        err.message?.includes('401') || err.message?.toLowerCase().includes('invalid')
          ? ' X-Master-Key yanlış olabilir — jsonbin.io → API Keys sayfasından tekrar kopyalayın.'
          : ''
      setMessage((err.message || 'Kurulum başarısız.') + hint)
    }
  }

  const handleRedownload = () => {
    if (!config?.binId) return
    downloadPublishConfigFile(config.binId, config.accessKey || '')
    setMessage('publish-config.json tekrar indirildi.')
  }

  if (ready) {
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
            {(config?.binId || publicBinId) && (
              <p className="mt-2 text-xs text-emerald-900/60">
                JSONBin ID: <code>{config?.binId || publicBinId}</code>
              </p>
            )}
          </div>
        </div>
        <button type="button" onClick={handleRedownload} className="btn-outline mt-4">
          <Download className="h-4 w-4" />
          publish-config.json İndir
        </button>
        {message && <p className="mt-3 text-sm text-wine">{message}</p>}
      </AdminCard>
    )
  }

  return (
    <AdminCard title="Canlı Yayınlama Kurulumu (tek seferlik)">
      {publicBinId ? (
        <>
          <p className="text-sm leading-relaxed text-ink/70">
            Sitede zaten bir yayın kutusu var (<code className="text-wine">{publicBinId}</code>).
            Aynı JSONBin hesabının <strong>X-Master-Key</strong> değerini yapıştırıp bağlayın.
          </p>
          <form onSubmit={handleLinkExisting} className="mt-4 space-y-4">
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
              {status === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Link2 className="h-4 w-4" />}
              Mevcut Kutuya Bağlan
            </button>
          </form>
        </>
      ) : (
        <>
          <ol className="list-decimal space-y-2 pl-5 text-sm text-ink/70">
            <li>
              <a href="https://jsonbin.io" target="_blank" rel="noopener noreferrer" className="text-wine underline">
                jsonbin.io
              </a>{' '}
              ücretsiz kayıt
            </li>
            <li>API Keys → X-Master-Key kopyala</li>
            <li>Aşağıya yapıştır → Otomatik Kur</li>
            <li>İndirilen publish-config.json dosyasını public/ klasörüne koyup GitHub&apos;a yükle</li>
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
        </>
      )}

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
