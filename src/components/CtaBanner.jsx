import { useSite } from '../context/SiteContext'
import { getWhatsAppUrl } from '../utils/whatsapp'
import WhatsAppIcon from './WhatsAppIcon'

export default function CtaBanner() {
  const { site } = useSite()
  const { contact, social } = site
  const whatsappUrl = getWhatsAppUrl(
    social?.whatsapp || contact.phoneLinks[0],
    social?.whatsappMessage,
  )

  return (
    <section className="section-alt border-y border-black/[0.04]">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-8">
        <h2 className="font-serif text-2xl font-semibold leading-snug text-wine-dark sm:text-3xl">
          En iyi fiyat için doğrudan bizimle rezervasyon yapın
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink/65">
          Aracı komisyonu yok — WhatsApp ile anında ulaşın, hızlıca yerinizi ayırtın.
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-cta mx-auto mt-8 max-w-md text-base"
        >
          <WhatsAppIcon />
          WhatsApp ile Rezervasyon
        </a>
      </div>
    </section>
  )
}
