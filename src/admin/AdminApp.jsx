import { useState } from 'react'
import { isAdminLoggedIn } from '../utils/storage'
import SeoManager from '../components/seo/SeoManager'
import AdminLogin from './AdminLogin'
import AdminLayout from './AdminLayout'
import DashboardPanel from './panels/DashboardPanel'
import GeneralPanel from './panels/GeneralPanel'
import ContactPanel from './panels/ContactPanel'
import RoomTypesPanel from './panels/RoomTypesPanel'
import ShowcasePanel from './panels/ShowcasePanel'
import GalleryPanel from './panels/GalleryPanel'
import SeoPanel from './panels/SeoPanel'
import SettingsPanel from './panels/SettingsPanel'

const panels = {
  dashboard: DashboardPanel,
  general: GeneralPanel,
  contact: ContactPanel,
  seo: SeoPanel,
  'room-types': RoomTypesPanel,
  showcase: ShowcasePanel,
  gallery: GalleryPanel,
  settings: SettingsPanel,
}

export default function AdminApp() {
  const [loggedIn, setLoggedIn] = useState(isAdminLoggedIn())
  const [active, setActive] = useState('dashboard')

  if (!loggedIn) {
    return (
      <>
        <SeoManager title="Admin Girişi | Old Home Guest House" robots="noindex, nofollow" canonicalPath="/admin" />
        <AdminLogin onSuccess={() => setLoggedIn(true)} />
      </>
    )
  }

  const Panel = panels[active] || DashboardPanel

  return (
    <>
      <SeoManager title="Admin Paneli | Old Home Guest House" robots="noindex, nofollow" canonicalPath="/admin" />
      <AdminLayout
      active={active}
      onNavigate={setActive}
      onLogout={() => setLoggedIn(false)}
    >
      <Panel />
    </AdminLayout>
    </>
  )
}
