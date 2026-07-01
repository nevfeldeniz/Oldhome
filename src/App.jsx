import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SiteProvider } from './context/SiteContext'
import ErrorBoundary from './components/ErrorBoundary'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import AdminApp from './admin/AdminApp'

const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

export default function App() {
  return (
    <ErrorBoundary>
      <SiteProvider>
        <BrowserRouter basename={basename}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin/*" element={<AdminApp />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </SiteProvider>
    </ErrorBoundary>
  )
}
