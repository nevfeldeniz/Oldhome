import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { useSite } from '../context/SiteContext'
import { SectionHeading, Reveal } from './Section'
import { getWhatsAppUrl } from '../utils/whatsapp'

export default function Contact() {
  const { site } = useSite()
  const { contact, social } = site

  const whatsappUrl = getWhatsAppUrl(
    social?.whatsapp || contact.phoneLinks[0],
    social?.whatsappMessage,
  )

  return (
    <section id="contact" className="bg-parchment py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <SectionHeading
          eyebrow="İletişim"
          title="Rezervasyon & Bilgi"
          subtitle="Sorularınız ve rezervasyonlarınız için WhatsApp üzerinden anında ulaşabilirsiniz."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal>
            <ContactCard icon={MessageCircle} title="WhatsApp">
              <p className="text-ink/75">En hızlı rezervasyon yolu</p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp mt-4 w-full !text-sm"
              >
                WhatsApp ile Yaz
              </a>
            </ContactCard>
          </Reveal>

          <Reveal delay={0.05}>
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
          </Reveal>

          <Reveal delay={0.1}>
            <ContactCard icon={Mail} title="E-Posta">
              <a
                href={`mailto:${contact.email}`}
                className="text-ink/75 transition-colors hover:text-wine"
              >
                info@oldhomecyprus.com
              </a>
            </ContactCard>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="mt-6">
          <ContactCard icon={MapPin} title="Adres">
            <p className="text-ink/75">{contact.address}</p>
            <a href="#location" className="mt-3 inline-block text-sm font-medium text-wine hover:underline">
              Haritada gör →
            </a>
          </ContactCard>
        </Reveal>
      </div>
    </section>
  )
}

function ContactCard({ icon: Icon, title, children }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-wine/10 bg-cream p-6">
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-wine/10 text-wine">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-4 text-sm font-semibold uppercase tracking-wider text-wine-dark">{title}</h3>
      <div className="mt-2 flex flex-1 flex-col text-sm leading-relaxed">{children}</div>
    </div>
  )
}
