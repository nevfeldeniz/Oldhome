import { Instagram } from 'lucide-react'
import { useSite } from '../context/SiteContext'

const variants = {
  nav: 'grid h-10 w-10 place-items-center rounded-ui border border-wine/20 bg-parchment/80 text-wine transition-colors hover:border-wine/40 hover:bg-parchment sm:border-cream/40 sm:bg-cream/10 sm:text-white sm:hover:bg-cream/20',
  navSolid:
    'grid h-10 w-10 place-items-center rounded-ui border border-wine/20 bg-parchment text-wine transition-colors hover:bg-cream',
  footer:
    'grid h-10 w-10 place-items-center rounded-ui border border-cream/20 bg-cream/5 text-cream transition-colors hover:bg-cream/15',
  contact:
    'inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-ui border border-wine/25 bg-cream px-4 py-2.5 text-sm font-semibold text-wine-dark transition-colors hover:border-wine/40 hover:bg-parchment',
}

export default function InstagramLink({ variant = 'nav', className = '', label }) {
  const { site } = useSite()
  const url = site.social?.instagram

  if (!url || url === '#') return null

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Old Home Guest House Instagram — @oldhomecyprus"
      className={`${variants[variant] || variants.nav} ${className}`}
    >
      <Instagram className="h-5 w-5 shrink-0" aria-hidden />
      {label && <span>{label}</span>}
    </a>
  )
}
