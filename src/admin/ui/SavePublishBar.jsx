import { Check, Loader2, Save, AlertCircle, Undo2 } from 'lucide-react'
import { useSite } from '../../context/SiteContext'
import { isLivePublishConfigured } from '../../config/publish'

export default function SavePublishBar() {
  const { saveAndPublish, publishState, clearPublishState, undoLastChange, canUndo, dirty } = useSite()
  const configured = isLivePublishConfigured()
  const { status, message, errors = [] } = publishState

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => saveAndPublish()}
          disabled={status === 'loading'}
          className="btn-primary !px-5 !py-2.5 shadow-md disabled:opacity-60"
        >
          {status === 'loading' ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          Değişiklikleri Kaydet ve Yayınla
        </button>

        <button
          type="button"
          onClick={() => undoLastChange()}
          disabled={!canUndo || status === 'loading'}
          className="btn-outline !px-4 !py-2.5 text-sm disabled:opacity-40"
          title="Son değişikliği geri al"
        >
          <Undo2 className="h-4 w-4" />
          Geri Al
        </button>

        {dirty && status !== 'success' && (
          <span className="text-xs font-medium text-amber-800">Kaydedilmemiş değişiklikler var</span>
        )}

        {!configured && (
          <span className="text-xs text-amber-800">
            Tek seferlik kurulum gerekli — Ayarlar bölümüne bakın.
          </span>
        )}

        {status === 'success' && (
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700">
            <Check className="h-4 w-4" />
            Yayınlandı
          </span>
        )}
      </div>

      {(message || errors.length > 0) && (
        <div
          className={`rounded-xl border px-4 py-3 text-sm ${
            status === 'error'
              ? 'border-red-200 bg-red-50 text-red-800'
              : 'border-emerald-200 bg-emerald-50 text-emerald-900'
          }`}
        >
          {message && (
            <p>
              {status === 'error' && <AlertCircle className="mb-0.5 mr-1 inline h-4 w-4" />}
              {message}
              {status !== 'loading' && (
                <button
                  type="button"
                  onClick={clearPublishState}
                  className="ml-2 text-xs underline opacity-70 hover:opacity-100"
                >
                  Kapat
                </button>
              )}
            </p>
          )}
          {errors.length > 0 && (
            <ul className="mt-2 list-disc space-y-1 pl-5 text-xs">
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
