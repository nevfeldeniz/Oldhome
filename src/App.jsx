import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Amenities from './components/Amenities'
import Rooms from './components/Rooms'
import Gallery from './components/Gallery'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Amenities />
        <Rooms />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
