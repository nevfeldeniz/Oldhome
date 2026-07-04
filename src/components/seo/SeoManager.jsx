import { useEffect } from 'react'

import { SEO, getCanonicalUrl, assetUrl } from '../../config/seo'



/**

 * Updates document head for client-side routes and admin-editable SEO.

 */

export default function SeoManager({

  title = SEO.title,

  description = SEO.description,

  keywords = '',

  ogTitle,

  ogDescription,

  ogImage,

  ogImageAlt,

  robots = 'index, follow',

  canonicalPath = '/',

}) {

  useEffect(() => {

    document.title = title



    const setMeta = (name, content, isProperty = false) => {

      if (!content) return

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

    setMeta('keywords', keywords)

    setMeta('robots', robots)



    const resolvedOgImage = ogImage

      ? ogImage.startsWith('http')

        ? ogImage

        : assetUrl(ogImage.replace(/^\//, ''))

      : getCanonicalUrl('/').replace(/\/$/, '') + '/' + SEO.ogImage



    setMeta('og:title', ogTitle || title, true)

    setMeta('og:description', ogDescription || description, true)

    setMeta('og:image', resolvedOgImage, true)

    setMeta('og:image:alt', ogImageAlt || SEO.ogImageAlt, true)

    setMeta('twitter:title', ogTitle || title)

    setMeta('twitter:description', ogDescription || description)

    setMeta('twitter:image', resolvedOgImage)



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

  }, [title, description, keywords, ogTitle, ogDescription, ogImage, ogImageAlt, robots, canonicalPath])



  return null

}

