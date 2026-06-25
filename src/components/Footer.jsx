import { TreePine, Phone, Mail, MapPin } from 'lucide-react'
import { navLinks, contact, footer, hero } from '../data/site'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-wine-dark text-cream">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Marka */}
          <div>
            <a href="#home" className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-cream/40 bg-cream/10">
                <TreePine className="h-5 w-5 text-cream" />
              </span>
              <span className="font-serif text-lg font-semibold text-cream">{hero.brand}</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">
              {hero.subtitle}
            </p>
          </div>

          {/* Hızlı linkler */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-cream/90">Menü</h4>
            <ul className="mt-4 grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-cream/70 transition-colors hover:text-cream"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-cream/90">İletişim</h4>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-cream/70">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 flex-none text-cream" />
                <span>{contact.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 flex-none text-cream" />
                <span>{contact.phones.join(' | ')}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 flex-none text-cream" />
                <a href={`mailto:${contact.email}`} className="transition-colors hover:text-cream">
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Slogan */}
        <div className="mt-12 border-t border-cream/15 pt-8 text-center">
          <p className="font-serif text-lg italic text-cream">{footer.slogan}</p>
          <p className="mt-4 text-xs text-cream/50">
            © {year} {hero.brand}. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  )
}
