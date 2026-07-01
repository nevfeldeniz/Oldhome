import { Instagram, Mail, MapPin, Phone } from 'lucide-react'
import { useSite } from '../context/SiteContext'
import { SectionHeading, Reveal } from './Section'
import { getMapsOpenUrl } from '../utils/maps'
import { getWhatsAppUrl } from '../utils/whatsapp'
import WhatsAppIcon from './WhatsAppIcon'
import InstagramLink from './InstagramLink'

export default function Contact() {
  const { site } = useSite()
  const { contact, social } = site

  const whatsappUrl = getWhatsAppUrl(
    social?.whatsapp || contact.phoneLinks[0],
    social?.whatsappMessage,
  )

  const primaryPhone = contact?.phones?.[0]
  const secondaryPhone = contact?.phones?.[1]
  const primaryTel = contact?.phoneLinks?.[0]
  const secondaryTel = contact?.phoneLinks?.[1]

  return (
    <section id="contact" className="section-parchment" aria-labelledby="contact-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <SectionHeading
          id="contact-heading"
          eyebrow="İletişim"
          title="Rezervasyon & Bilgi"
          subtitle="Sorularınız ve rezervasyonlarınız için WhatsApp üzerinden anında ulaşabilirsiniz."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal>
            <ContactCard icon={WhatsAppIcon} title="WhatsApp" isIconComponent>
              <p className="text-ink/65">En hızlı rezervasyon yolu</p>
              {primaryPhone && (
                <p className="mt-1 text-sm font-medium text-wine-dark">{primaryPhone}</p>
              )}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta mt-5 w-full !text-sm"
                aria-label="WhatsApp ile mesaj gönderin"
              >
                <WhatsAppIcon />
                WhatsApp ile Yaz
              </a>
            </ContactCard>
          </Reveal>

          <Reveal delay={0.08}>
            <ContactCard icon={Instagram} title="Instagram">
              <p className="text-ink/65">Fotoğraflar ve güncellemeler</p>
              <p className="mt-1 text-sm font-medium text-wine-dark">@oldhomecyprus</p>
              <InstagramLink variant="contact" label="Profili Gör" className="mt-5" />
            </ContactCard>
          </Reveal>

          <Reveal delay={0.05}>
            <ContactCard icon={Phone} title="Ana Telefon">
              {primaryPhone && primaryTel ? (
                <>
                  <a
                    href={`tel:${primaryTel}`}
                    className="text-lg font-semibold text-wine-dark transition-colors hover:text-wine"
                  >
                    {primaryPhone}
                  </a>
                  <p className="mt-1 text-xs text-ink/50">Rezervasyon ve bilgi hattı</p>
                </>
              ) : null}
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
            <p className="font-medium text-wine-dark">{contact.placeName || 'Old Home Guest House'}</p>
            <p className="mt-1 text-ink/65">{contact.address}</p>
            <a
              href={getMapsOpenUrl(contact)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm font-medium text-wine hover:underline"
            >
              Haritada gör →
            </a>
          </ContactCard>
        </Reveal>

        {secondaryPhone && secondaryTel && (
          <Reveal delay={0.14} className="mt-6">
            <div className="card-booking-alt px-6 py-5 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-wine/80">
                  İkinci telefon hattı
                </p>
                <p className="mt-1 text-sm text-ink/55">Alternatif ulaşım numarası</p>
              </div>
              <a
                href={`tel:${secondaryTel}`}
                className="mt-3 inline-flex items-center gap-2 text-lg font-semibold text-wine-dark transition-colors hover:text-wine sm:mt-0"
              >
                <Phone className="h-5 w-5 text-wine" />
                {secondaryPhone}
              </a>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}

function ContactCard({ icon: Icon, title, children, isIconComponent = false }) {
  return (
    <div className="card-booking-alt flex h-full flex-col p-6">
      <span className="grid h-11 w-11 place-items-center rounded-ui bg-cream text-wine">
        {isIconComponent ? <Icon className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
      </span>
      <h3 className="mt-4 text-sm font-semibold uppercase tracking-wider text-wine-dark">{title}</h3>
      <div className="mt-2 flex flex-1 flex-col text-sm leading-relaxed">{children}</div>
    </div>
  )
}
