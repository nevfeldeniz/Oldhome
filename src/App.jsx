import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SiteProvider } from './context/SiteContext'
import HomePage from './pages/HomePage'
import AdminApp from './admin/AdminApp'

// GitHub Pages alt yolu: /Oldhome/
const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

export default function App() {
  return (
    <SiteProvider>
      <BrowserRouter basename={basename}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin/*" element={<AdminApp />} />
        </Routes>
      </BrowserRouter>
    </SiteProvider>
  )
}
