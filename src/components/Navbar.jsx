import { useEffect, useState } from 'react'
import { Menu, X, TreePine } from 'lucide-react'
import { navLinks } from '../data/site'
import { useSite } from '../context/SiteContext'
import { getWhatsAppUrl } from '../utils/whatsapp'
import WhatsAppIcon from './WhatsAppIcon'

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
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isSolid = scrolled || open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isSolid ? 'border-b border-wine/[0.08] bg-cream/95 shadow-nav backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-8">
        <a href="#home" className="flex min-w-0 items-center gap-2.5">
          <span
            className={`grid h-10 w-10 flex-none place-items-center rounded-ui border ${
              isSolid ? 'border-wine/20 bg-parchment' : 'border-cream/40 bg-cream/10 backdrop-blur-sm'
            }`}
          >
            <TreePine className={`h-5 w-5 ${isSolid ? 'text-wine' : 'text-white'}`} />
          </span>
          <span className="min-w-0 leading-tight">
            <span
              className={`block truncate font-serif text-base font-semibold sm:text-lg ${
                isSolid ? 'text-wine-dark' : 'text-white'
              }`}
            >
              Old Home
            </span>
            <span
              className={`block text-[10px] uppercase tracking-[0.22em] ${
                isSolid ? 'text-ink/50' : 'text-white/70'
              }`}
            >
              Guest House
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-wine ${
                  isSolid ? 'text-ink/75' : 'text-white/90'
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
            className="btn-cta hidden !min-h-[44px] !px-5 !py-2.5 !text-xs lg:inline-flex sm:!text-sm"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Rezervasyon
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={`grid h-10 w-10 place-items-center rounded-ui border lg:hidden ${
              isSolid ? 'border-wine/20 text-wine-dark' : 'border-white/35 text-white'
            }`}
            aria-label="Menüyü aç/kapat"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-wine/[0.08] bg-parchment lg:hidden">
          <ul className="flex flex-col gap-1 px-4 py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-ui px-3 py-3 text-sm font-medium text-ink/85 hover:bg-cream/80"
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
                className="btn-cta w-full"
              >
                <WhatsAppIcon />
                WhatsApp ile Rezervasyon
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
