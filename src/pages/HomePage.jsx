import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import QuickInfoBar from '../components/QuickInfoBar'
import FeaturedRooms from '../components/FeaturedRooms'
import WhyUs from '../components/WhyUs'
import About from '../components/About'
import Rooms from '../components/Rooms'
import Amenities from '../components/Amenities'
import RoomShowcase from '../components/RoomShowcase'
import PhotoGallery from '../components/PhotoGallery'
import LocationSection from '../components/LocationSection'
import Reviews from '../components/Reviews'
import Contact from '../components/Contact'
import CtaBanner from '../components/CtaBanner'
import Footer from '../components/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <Navbar />
      <main>
        <Hero />
        <QuickInfoBar />
        <FeaturedRooms />
        <WhyUs />
        <About />
        <Rooms />
        <Amenities />
        <RoomShowcase />
        <PhotoGallery />
        <LocationSection />
        <Reviews />
        <Contact />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  )
}
