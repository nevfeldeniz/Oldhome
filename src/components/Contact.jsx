import { MapPin, Phone, Mail } from 'lucide-react'
import { useSite } from '../context/SiteContext'
import { SectionHeading, Reveal } from './Section'

export default function Contact() {
  const { site } = useSite()
  const { contact } = site
  const MAP_QUERY = encodeURIComponent(contact.address)

  return (
    <section id="contact" className="bg-parchment py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="İletişim"
          title="Rezervasyon & Bilgi"
          subtitle="Sorularınız ve rezervasyonlarınız için bize ulaşmaktan çekinmeyin. Sizi ağırlamaktan mutluluk duyarız."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {/* İletişim bilgileri */}
          <Reveal className="flex flex-col gap-5">
            <ContactCard icon={MapPin} title="Adres">
              <p className="text-ink/75">{contact.address}</p>
            </ContactCard>

            <ContactCard icon={Phone} title="Telefon">
              <div className="flex flex-col gap-1">
                {contact.phones.map((phone, i) => (
                  <a
                    key={phone}
                    href={`tel:${contact.phoneLinks[i]}`}
                    className="text-ink/75 transition-colors hover:text-wine"
                  >
                    {phone}
                  </a>
                ))}
              </div>
            </ContactCard>

            <ContactCard icon={Mail} title="E-Posta">
              <a
                href={`mailto:${contact.email}`}
                className="text-ink/75 transition-colors hover:text-wine"
              >
                {contact.email}
              </a>
            </ContactCard>

            <a href={`tel:${contact.phoneLinks[0]}`} className="btn-primary mt-2 w-fit">
              <Phone className="h-4 w-4" />
              Hemen Rezervasyon Yap
            </a>
          </Reveal>

          {/* Harita */}
          <Reveal delay={0.1} className="overflow-hidden rounded-3xl border border-wine/15 shadow-lg shadow-wine/10">
            <iframe
              title="Old Home Guest House konumu"
              src={`https://www.google.com/maps?q=${MAP_QUERY}&output=embed`}
              className="h-full min-h-[360px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function ContactCard({ icon: Icon, title, children }) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-wine/10 bg-cream p-6 transition-colors hover:border-wine/30">
      <span className="grid h-12 w-12 flex-none place-items-center rounded-xl bg-wine/10 text-wine">
        <Icon className="h-6 w-6" />
      </span>
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-wine-dark">{title}</h3>
        <div className="mt-1.5 text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  )
}
