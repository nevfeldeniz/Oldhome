import { Link } from 'react-router-dom'
import { Home, MessageCircle } from 'lucide-react'
import SeoManager from '../components/seo/SeoManager'
import { SEO } from '../config/seo'
import { getWhatsAppUrl } from '../utils/whatsapp'

const whatsappUrl = getWhatsAppUrl('905391139862', SEO.description)

export default function NotFoundPage() {
  return (
    <>
      <SeoManager
        title="Sayfa Bulunamadı | Old Home Guest House"
        description="Aradığınız sayfa bulunamadı. Old Home Guest House ana sayfasına dönün veya WhatsApp ile rezervasyon yapın."
        robots="noindex, follow"
        canonicalPath="/404"
      />

      <div className="flex min-h-screen flex-col bg-cream text-ink">
        <header className="border-b border-wine/[0.08] bg-parchment/80 px-4 py-4 sm:px-8">
          <Link to="/" className="font-serif text-lg font-semibold text-wine-dark">
            Old Home Guest House
          </Link>
        </header>

        <main id="main-content" className="flex flex-1 items-center justify-center px-4 py-16 sm:px-8">
          <article className="mx-auto max-w-lg text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-wine">404</p>
            <h1 className="mt-4 font-serif text-3xl font-semibold text-wine-dark sm:text-4xl">
              Sayfa bulunamadı
            </h1>
            <p className="mt-4 text-base leading-relaxed text-ink/70">
              Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir. Ana sayfadan
              odalarımızı inceleyebilir veya WhatsApp ile bize ulaşabilirsiniz.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link to="/" className="btn-primary">
                <Home className="h-5 w-5" aria-hidden />
                Ana Sayfaya Dön
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                aria-label="WhatsApp ile rezervasyon yapın"
              >
                <MessageCircle className="h-5 w-5" aria-hidden />
                WhatsApp Rezervasyon
              </a>
            </div>
          </article>
        </main>

        <footer className="border-t border-wine/[0.08] bg-parchment px-4 py-6 text-center text-sm text-ink/55 sm:px-8">
          © {new Date().getFullYear()} Old Home Guest House
        </footer>
      </div>
    </>
  )
}
