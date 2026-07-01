import { useEffect, useState } from 'react'
import { MessageCircle, Menu, X, TreePine } from 'lucide-react'
import { navLinks } from '../data/site'
import { useSite } from '../context/SiteContext'
import { getWhatsAppUrl } from '../utils/whatsapp'

export default function Navbar() {
  const { site } = useSite()
  const { contact, social } = site
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  const whatsappUrl = getWhatsAppUrl(
    social?.whatsapp || contact.phoneLinks[0],
    social?.whatsappMessage,
  )

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
        scrolled || open
          ? 'border-b border-wine/15 bg-cream/95 shadow-md backdrop-blur-md'
          : 'bg-charcoal-900/30 backdrop-blur-sm'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-8 sm:py-4">
        <a href="#home" className="flex min-w-0 items-center gap-2.5">
          <span
            className={`grid h-10 w-10 flex-none place-items-center rounded-full border ${
              scrolled || open ? 'border-wine/40 bg-parchment' : 'border-cream/40 bg-cream/10'
            }`}
          >
            <TreePine className={`h-5 w-5 ${scrolled || open ? 'text-wine' : 'text-cream'}`} />
          </span>
          <span className="min-w-0 leading-tight">
            <span
              className={`block truncate font-serif text-base font-semibold sm:text-lg ${
                scrolled || open ? 'text-wine-dark' : 'text-cream'
              }`}
            >
              Old Home
            </span>
            <span
              className={`block text-[10px] uppercase tracking-[0.25em] ${
                scrolled || open ? 'text-wine/70' : 'text-cream/70'
              }`}
            >
              Guest House
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-wine ${
                  scrolled ? 'text-ink/80' : 'text-cream/90'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp hidden !px-4 !py-2.5 !text-xs sm:!text-sm lg:inline-flex"
          >
            <MessageCircle className="h-4 w-4" />
            Rezervasyon
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={`grid h-10 w-10 place-items-center rounded-full border lg:hidden ${
              scrolled || open ? 'border-wine/30 text-wine' : 'border-cream/40 text-cream'
            }`}
            aria-label="Menüyü aç/kapat"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-wine/15 bg-cream/98 lg:hidden">
          <ul className="flex flex-col gap-1 px-4 py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-sm font-medium text-ink/90 hover:bg-wine/10 hover:text-wine"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="btn-whatsapp w-full"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp ile Rezervasyon
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
