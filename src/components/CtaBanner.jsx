import { MessageCircle } from 'lucide-react'
import { useSite } from '../context/SiteContext'
import { getWhatsAppUrl } from '../utils/whatsapp'

export default function CtaBanner() {
  const { site } = useSite()
  const { contact, social } = site
  const whatsappUrl = getWhatsAppUrl(
    social?.whatsapp || contact.phoneLinks[0],
    social?.whatsappMessage,
  )

  return (
    <section className="bg-wine-dark py-14 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-8">
        <h2 className="font-serif text-2xl font-semibold leading-snug text-cream sm:text-3xl">
          En iyi fiyat için doğrudan bizimle rezervasyon yapın
        </h2>
        <p className="mt-3 text-sm text-cream/75 sm:text-base">
          Aracı komisyonu yok — WhatsApp ile anında ulaşın, hızlıca yerinizi ayırtın.
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp mx-auto mt-8 w-full max-w-md text-base sm:text-lg"
        >
          <MessageCircle className="h-5 w-5" />
          WhatsApp ile Rezervasyon
        </a>
      </div>
    </section>
  )
}
