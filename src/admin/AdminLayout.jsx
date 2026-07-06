import { Link } from 'react-router-dom'
import {
  LayoutDashboard,
  Home,
  Phone,
  BedDouble,
  Grid3X3,
  Images,
  Settings,
  LogOut,
  ExternalLink,
  Search,
  TreePine,
} from 'lucide-react'
import { setAdminSession } from '../utils/storage'
import SavePublishBar from './ui/SavePublishBar'

const menu = [
  { id: 'dashboard', label: 'Genel Bakış', icon: LayoutDashboard },
  { id: 'general', label: 'Ana Sayfa & Hakkımızda', icon: Home },
  { id: 'contact', label: 'İletişim & WhatsApp', icon: Phone },
  { id: 'seo', label: 'SEO & Sosyal', icon: Search },
  { id: 'room-types', label: 'Fiyat Kartları', icon: BedDouble },
  { id: 'showcase', label: 'Oda Galerisi (11 Oda)', icon: Grid3X3 },
  { id: 'gallery', label: 'Dış Mekân', icon: Images },
  { id: 'settings', label: 'Ayarlar', icon: Settings },
]

export default function AdminLayout({ active, onNavigate, onLogout, children }) {
  const handleLogout = () => {
    setAdminSession(false)
    onLogout()
  }

  return (
    <div className="min-h-screen bg-sand lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="border-b border-wine/10 bg-wine-dark text-cream lg:border-b-0 lg:border-r">
        <div className="flex items-center gap-3 border-b border-cream/10 px-5 py-5">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-cream/10">
            <TreePine className="h-5 w-5" />
          </span>
          <div>
            <p className="font-serif font-semibold">Old Home</p>
            <p className="text-xs text-cream/60">Admin Paneli</p>
          </div>
        </div>

        <nav className="flex gap-1 overflow-x-auto p-3 lg:flex-col lg:overflow-visible">
          {menu.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => onNavigate(id)}
              className={`flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm transition ${
                active === id
                  ? 'bg-cream text-wine-dark font-semibold'
                  : 'text-cream/75 hover:bg-cream/10 hover:text-cream'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </nav>

        <div className="hidden border-t border-cream/10 p-3 lg:block">
          <Link
            to="/"
            className="mb-2 flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-cream/75 transition hover:bg-cream/10 hover:text-cream"
          >
            <ExternalLink className="h-4 w-4" />
            Siteyi Görüntüle
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-cream/75 transition hover:bg-red-900/40 hover:text-cream"
          >
            <LogOut className="h-4 w-4" />
            Çıkış Yap
          </button>
        </div>
      </aside>

      <div className="flex min-h-screen flex-col">
        <header className="border-b border-wine/10 bg-parchment px-5 py-4 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h2 className="font-serif text-2xl font-semibold text-wine-dark">
                {menu.find((m) => m.id === active)?.label}
              </h2>
              <p className="text-sm text-ink/55">Değişiklik yaptıktan sonra kaydedip canlı siteye yayınlayın</p>
            </div>
            <div className="flex gap-2 lg:hidden">
              <Link to="/" className="btn-outline !px-4 !py-2 text-xs">
                Site
              </Link>
              <button type="button" onClick={handleLogout} className="btn-primary !px-4 !py-2 text-xs">
                Çıkış
              </button>
            </div>
          </div>
          <div className="mt-4">
            <SavePublishBar />
          </div>
        </header>

        <main className="flex-1 p-5 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
