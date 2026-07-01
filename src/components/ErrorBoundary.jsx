import { Component } from 'react'
import { Link } from 'react-router-dom'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error) {
    console.error('Site render hatası:', error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-4 text-center text-ink">
          <p className="text-sm font-semibold uppercase tracking-wider text-wine">Bir sorun oluştu</p>
          <h1 className="mt-3 font-serif text-2xl font-semibold text-wine-dark">Sayfa yüklenemedi</h1>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-ink/70">
            Tarayıcı önbelleğinde eski veri kalmış olabilir. Aşağıdaki adımları deneyin.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => {
                try {
                  localStorage.removeItem('oldhome_site_data')
                } catch {
                  /* ignore */
                }
                window.location.reload()
              }}
              className="btn-primary"
            >
              Önbelleği Temizle ve Yenile
            </button>
            <Link to="/" className="btn-outline" onClick={() => this.setState({ hasError: false })}>
              Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
