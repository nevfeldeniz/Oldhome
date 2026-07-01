/**
 * SEO — aktif yayın adresi
 *
 * Şu an site GitHub Pages üzerinde:
 *   https://nevfeldeniz.github.io/Oldhome/
 *
 * oldhomecyprus.com bağlandığında yalnızca siteUrl satırını değiştirin:
 *   siteUrl: 'https://oldhomecyprus.com',
 */
export const SEO = {
  siteUrl: 'https://nevfeldeniz.github.io/Oldhome',
  siteName: 'Old Home Guest House',
  locale: 'tr_TR',
  language: 'tr',

  title: "Old Home Guest House | Kıbrıs'ta Konforlu Konaklama",
  description:
    "Old Home Guest House, Kıbrıs'ta konforlu odalar, sıcak bir yuva hissi ve kolay WhatsApp rezervasyonu sunmaktadır.",

  ogTitle: 'Old Home Guest House',
  ogDescription: "Kıbrıs'ta konforlu konaklama ve sıcak bir yuva hissi.",
  ogImage: 'oldhome-cyprus-hotel-exterior.jpg',
  ogImageWidth: 1920,
  ogImageHeight: 1080,
  ogImageAlt: 'Old Home Guest House boutique hotel exterior in Cyprus',

  twitterCard: 'summary_large_image',
  twitterTitle: 'Old Home Guest House',
  twitterDescription: "Kıbrıs'ta konforlu konaklama ve sıcak bir yuva hissi.",

  themeColor: '#511f2c',

  structuredData: {
    telephone: '+905391139862',
    email: 'info@oldhomecyprus.com',
    streetAddress: 'Lala Mustafa Paşa Sk-1065',
    addressLocality: 'Lefkoşa',
    postalCode: '99010',
    addressCountry: 'CY',
    priceRange: '$$',
  },
}

export function getCanonicalUrl(path = '/') {
  const base = SEO.siteUrl.replace(/\/$/, '')
  if (path === '/' || path === '') return `${base}/`
  return `${base}${path.startsWith('/') ? path : `/${path}`}`
}

export function getOgImageUrl() {
  const base = SEO.siteUrl.replace(/\/$/, '')
  return `${base}/${SEO.ogImage.replace(/^\//, '')}`
}

export function absoluteUrl(path = '') {
  return getCanonicalUrl(path)
}

export function assetUrl(filename) {
  const base = SEO.siteUrl.replace(/\/$/, '')
  return `${base}/${filename.replace(/^\//, '')}`
}
