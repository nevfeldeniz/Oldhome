import { useMemo } from 'react'
import { useSite } from '../../context/SiteContext'
import { SEO, assetUrl } from '../../config/seo'

export default function StructuredData() {
  const { site } = useSite()
  const { contact, hero } = site
  const placeholders = SEO.structuredData

  const jsonLd = useMemo(() => {
    const heroImage = hero?.image || SEO.ogImage
    const imageUrl = heroImage.startsWith('http') ? heroImage : assetUrl(heroImage)

    return {
      '@context': 'https://schema.org',
      '@type': 'Hotel',
      '@id': `${getCanonicalUrl('/')}#hotel`,
      name: contact?.placeName || SEO.siteName,
      alternateName: hero?.brand || SEO.siteName,
      url: getCanonicalUrl('/'),
      image: imageUrl,
      description: SEO.description,
      telephone: contact?.phoneLinks?.[0] || placeholders.telephone,
      email: contact?.email || placeholders.email,
      priceRange: placeholders.priceRange,
      address: {
        '@type': 'PostalAddress',
        streetAddress: contact?.address || placeholders.streetAddress,
        addressLocality: placeholders.addressLocality,
        postalCode: placeholders.postalCode,
        addressCountry: placeholders.addressCountry,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '35.1856',
        longitude: '33.3823',
      },
      amenityFeature: [
        { '@type': 'LocationFeatureSpecification', name: 'Free WiFi', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Air Conditioning', value: true },
      ],
      numberOfRooms: 11,
      checkinTime: '14:00',
      checkoutTime: '11:00',
      sameAs: [site.social?.instagram, site.social?.facebook].filter(Boolean),
    }
  }, [contact, hero, site.social])

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
