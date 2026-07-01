import { Check, MapPin, MessageCircle, Shield, Sparkles, Volume2 } from 'lucide-react'

const reasons = [
  { icon: Sparkles, text: 'Temiz ve konforlu odalar' },
  { icon: Volume2, text: 'Sessiz ve huzurlu ortam' },
  { icon: MapPin, text: 'Merkezi konum' },
  { icon: MessageCircle, text: 'Hızlı WhatsApp rezervasyonu' },
  { icon: Shield, text: 'Sıcak ve samimi hizmet' },
]

export default function WhyUs() {
  return (
    <section id="about-trust" className="section-parchment !pt-8 sm:!pt-10 lg:!pt-12" aria-labelledby="why-us-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <header className="mx-auto max-w-2xl text-center">
          <h2 id="why-us-heading" className="text-3xl font-semibold text-wine-dark sm:text-4xl">
            Neden Old Home Guest House?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink/65">
            Güven veren, tutarlı ve samimi bir butik konaklama deneyimi.
          </p>
        </header>

        <ul className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2 lg:max-w-none lg:grid-cols-5">
          {reasons.map(({ icon: Icon, text }) => (
            <li key={text} className="card-booking-alt flex flex-col items-center px-4 py-7 text-center">
              <span className="grid h-11 w-11 place-items-center rounded-ui bg-cream text-wine">
                <Icon className="h-5 w-5" />
              </span>
              <span className="mt-4 text-sm font-medium leading-snug text-ink/80">{text}</span>
              <Check className="mt-3 h-4 w-4 text-wine" aria-hidden />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
