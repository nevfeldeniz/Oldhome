import { useEffect } from 'react'
import { SEO, getCanonicalUrl } from '../../config/seo'

/**
 * Updates document head for client-side routes (404, admin).
 * Primary meta tags live in index.html for crawlers and first paint.
 */
export default function SeoManager({
  title = SEO.title,
  description = SEO.description,
  robots = 'index, follow',
  canonicalPath = '/',
}) {
  useEffect(() => {
    document.title = title

    const setMeta = (name, content, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name'
      let el = document.querySelector(`meta[${attr}="${name}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    setMeta('description', description)
    setMeta('robots', robots)

    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = getCanonicalUrl(canonicalPath)

    return () => {
      document.title = SEO.title
      setMeta('description', SEO.description)
      setMeta('robots', 'index, follow')
      if (canonical) canonical.href = getCanonicalUrl('/')
    }
  }, [title, description, robots, canonicalPath])

  return null
}
