import { useSite } from '../context/SiteContext'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import QuickInfoBar from '../components/QuickInfoBar'
import DiscoverRooms from '../components/DiscoverRooms'
import WhyUs from '../components/WhyUs'
import About from '../components/About'
import Rooms from '../components/Rooms'
import Amenities from '../components/Amenities'
import PhotoGallery from '../components/PhotoGallery'
import LocationSection from '../components/LocationSection'
import Reviews from '../components/Reviews'
import Contact from '../components/Contact'
import CtaBanner from '../components/CtaBanner'
import Footer from '../components/Footer'
import StructuredData from '../components/seo/StructuredData'
import SeoManager from '../components/seo/SeoManager'

export default function HomePage() {
  const { site } = useSite()
  const seo = site.seo || {}

  return (
    <>
      <SeoManager
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        ogTitle={seo.ogTitle}
        ogDescription={seo.ogDescription}
        ogImage={seo.ogImage}
        ogImageAlt={seo.ogImageAlt}
      />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-ui focus:bg-wine-dark focus:px-4 focus:py-2 focus:text-white"
      >
        Ana içeriğe atla
      </a>

      <Navbar />

      <main id="main-content" className="min-h-screen bg-cream text-ink">
        <Hero />
        <QuickInfoBar />
        <Rooms />
        <WhyUs />
        <About />
        <DiscoverRooms />
        <Amenities />
        <PhotoGallery />
        <LocationSection />
        <Reviews />
        <Contact />
        <CtaBanner />
      </main>

      <Footer />
      <StructuredData />
    </>
  )
}
