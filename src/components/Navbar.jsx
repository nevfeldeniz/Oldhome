import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TreePine, Menu, X } from 'lucide-react'
import { navLinks } from '../data/site'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cream/90 backdrop-blur-md border-b border-wine/15 shadow-lg shadow-wine/10'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2.5 group">
          <span className="grid h-10 w-10 place-items-center rounded-full border border-wine/40 bg-parchment transition-colors group-hover:border-wine">
            <TreePine className="h-5 w-5 text-wine" />
          </span>
          <span className="leading-tight">
            <span className="block font-serif text-base font-semibold text-wine-dark sm:text-lg">
              Old Home
            </span>
            <span className="block text-[10px] uppercase tracking-[0.3em] text-wine/70">
              Guest House
            </span>
          </span>
        </a>

        {/* Masaüstü menü */}
        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative text-sm font-medium text-ink/80 transition-colors hover:text-wine
                  after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-wine
                  after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#contact" className="btn-primary hidden lg:inline-flex">
          Rezervasyon Yap
        </a>

        {/* Mobil menü butonu */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-full border border-wine/30 text-wine lg:hidden"
          aria-label="Menüyü aç/kapat"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobil açılır menü */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-wine/15 bg-cream/95 backdrop-blur-md lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 py-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-3 text-sm font-medium text-ink/90 transition-colors hover:bg-wine/10 hover:text-wine"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a href="#contact" onClick={() => setOpen(false)} className="btn-primary w-full">
                  Rezervasyon Yap
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
