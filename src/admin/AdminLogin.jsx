import { useState } from 'react'
import { Lock, TreePine } from 'lucide-react'
import { getAdminPassword, setAdminSession } from '../utils/storage'
import { AdminField, AdminInput } from './ui/AdminField'

export default function AdminLogin({ onSuccess }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === getAdminPassword()) {
      setAdminSession(true)
      onSuccess()
    } else {
      setError('Hatalı şifre. Tekrar deneyin.')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-charcoal-900 px-4">
      <div className="w-full max-w-md rounded-3xl border border-wine/20 bg-cream p-8 shadow-2xl">
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="grid h-14 w-14 place-items-center rounded-full border border-wine/30 bg-parchment">
            <TreePine className="h-7 w-7 text-wine" />
          </span>
          <h1 className="mt-4 font-serif text-2xl font-semibold text-wine-dark">Admin Paneli</h1>
          <p className="mt-2 text-sm text-ink/60">Old Home Guest House yönetim girişi</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <AdminField label="Şifre">
            <AdminInput
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError('')
              }}
              placeholder="Admin şifrenizi girin"
              autoFocus
            />
          </AdminField>

          {error && <p className="text-sm text-red-700">{error}</p>}

          <button type="submit" className="btn-primary w-full">
            <Lock className="h-4 w-4" />
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  )
}
