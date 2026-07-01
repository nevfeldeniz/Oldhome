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
    <section id="about-trust" className="bg-parchment py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold text-wine-dark sm:text-4xl">Neden Old Home Guest House?</h2>
          <p className="mt-3 text-base text-ink/70">
            Booking.com kalitesinde güven veren bir konaklama deneyimi sunuyoruz.
          </p>
        </div>

        <ul className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2 lg:max-w-none lg:grid-cols-5">
          {reasons.map(({ icon: Icon, text }) => (
            <li
              key={text}
              className="flex flex-col items-center rounded-2xl border border-wine/10 bg-cream px-4 py-6 text-center"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full bg-wine/10 text-wine">
                <Icon className="h-5 w-5" />
              </span>
              <span className="mt-3 text-sm font-medium leading-snug text-ink/85">{text}</span>
              <Check className="mt-2 h-4 w-4 text-wine" aria-hidden />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
