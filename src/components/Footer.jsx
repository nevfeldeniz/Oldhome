import { Mail, MapPin, Phone, TreePine } from 'lucide-react'
import { navLinks } from '../data/site'
import { useSite } from '../context/SiteContext'
import { getWhatsAppUrl } from '../utils/whatsapp'
import WhatsAppIcon from './WhatsAppIcon'
import InstagramLink, { INSTAGRAM_URL } from './InstagramLink'
import FacebookLink from './FacebookLink'

export default function Footer() {
  const { site } = useSite()
  const { contact, footer, hero, social } = site
  const year = new Date().getFullYear()

  const whatsappUrl = getWhatsAppUrl(
    social?.whatsapp || contact.phoneLinks[0],
    social?.whatsappMessage,
  )

  return (
    <footer className="bg-wine-dark text-cream">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <a href="#home" className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-ui border border-cream/40 bg-cream/10">
                <TreePine className="h-5 w-5 text-cream" />
              </span>
              <span className="font-serif text-lg font-semibold text-cream">{hero.brand}</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">{footer.slogan}</p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <InstagramLink variant="footer" />
              <FacebookLink variant="footer" />
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="grid h-10 w-10 place-items-center rounded-ui border border-cream/20 bg-cream/5 text-cream transition-colors hover:bg-cream/15"
              >
                <WhatsAppIcon className="h-5 w-5" />
              </a>
            </div>
            {social?.instagram && (
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm text-cream/60 transition-colors hover:text-cream"
              >
                @oldhomecyprus
              </a>
            )}
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-cream/90">Menü</h3>
            <ul className="mt-4 grid gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-cream/70 transition-colors hover:text-cream">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 lg:col-span-2">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-cream/90">İletişim</h3>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-cream/70">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 flex-none text-cream" />
                <span>
                  <span className="block font-medium text-cream/90">
                    {contact.placeName || 'Old Home Guest House'}
                  </span>
                  {contact.address}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 flex-none text-cream" />
                <span>{contact?.phones?.join(' · ') || ''}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 flex-none text-cream" />
                <a href={`mailto:${contact.email}`} className="transition-colors hover:text-cream">
                  info@oldhomecyprus.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-cream/15 pt-6 text-center">
          <p className="text-xs text-cream/50">
            © {year} Old Home Guest House. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  )
}
