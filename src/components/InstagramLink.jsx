import { Instagram } from 'lucide-react'
import { useSite } from '../context/SiteContext'

/** Resmi Instagram profili — mobil uygulama ve tarayıcıda açılır */
export const INSTAGRAM_URL = 'https://www.instagram.com/oldhomecyprus/'

const variants = {
  nav: 'grid h-10 w-10 place-items-center rounded-ui border border-white/35 bg-white/10 text-white backdrop-blur-sm transition-colors hover:border-white/50 hover:bg-white/20 sm:border-cream/40 sm:bg-cream/10 sm:hover:bg-cream/20',
  navSolid:
    'grid h-10 w-10 place-items-center rounded-ui border border-wine/20 bg-parchment text-wine transition-colors hover:bg-cream',
  footer:
    'grid h-10 w-10 place-items-center rounded-ui border border-cream/20 bg-cream/5 text-cream transition-colors hover:bg-cream/15',
  contact:
    'inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-ui border border-wine/25 bg-cream px-4 py-2.5 text-sm font-semibold text-wine-dark transition-colors hover:border-wine/40 hover:bg-parchment',
}

export default function InstagramLink({ variant = 'nav', className = '', label }) {
  const { site } = useSite()
  const url = site.social?.instagram || INSTAGRAM_URL

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram profilimiz @oldhomecyprus"
      className={`${variants[variant] || variants.nav} ${className}`}
    >
      <Instagram className="h-5 w-5 shrink-0" aria-hidden />
      {label && <span>{label}</span>}
    </a>
  )
}
