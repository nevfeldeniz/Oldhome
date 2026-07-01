import { Star } from 'lucide-react'
import { SectionIntro } from './Section'

const reviews = [
  {
    name: 'Ayşe K.',
    rating: 5,
    text: 'Temiz, sakin ve çok samimi bir ortam. WhatsApp üzerinden hızlıca rezervasyon yaptım, kesinlikle tavsiye ederim.',
  },
  {
    name: 'Mehmet Y.',
    rating: 5,
    text: 'Merkezi konumda, odalar ferah ve konforlu. Personel ilgili ve güler yüzlü. Tekrar tercih edeceğim.',
  },
  {
    name: 'Elif S.',
    rating: 5,
    text: 'Butik otel havasında, ev gibi hissettiren bir konaklama. Fiyat-performans açısından çok memnun kaldık.',
  },
]

function Stars({ count }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} yıldız`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  )
}

export default function Reviews() {
  return (
    <section id="reviews" className="section-parchment" aria-labelledby="reviews-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <SectionIntro
          id="reviews-heading"
          eyebrow="Misafir Yorumları"
          title="Misafirlerimiz ne diyor?"
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <blockquote key={review.name} className="card-booking flex flex-col p-6">
              <Stars count={review.rating} />
              <p className="mt-4 flex-1 text-sm leading-relaxed text-ink/75">&ldquo;{review.text}&rdquo;</p>
              <footer className="mt-4 border-t border-wine/[0.08] pt-4 text-sm font-semibold text-wine-dark">
                {review.name}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
