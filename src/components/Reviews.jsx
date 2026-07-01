import { Star } from 'lucide-react'

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
    <section id="reviews" className="bg-parchment py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow justify-center">Misafir Yorumları</p>
          <h2 className="mt-3 text-3xl font-semibold text-wine-dark sm:text-4xl">Misafirlerimiz ne diyor?</h2>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <blockquote
              key={review.name}
              className="flex flex-col rounded-2xl border border-wine/10 bg-cream p-6 shadow-sm"
            >
              <Stars count={review.rating} />
              <p className="mt-4 flex-1 text-sm leading-relaxed text-ink/80">&ldquo;{review.text}&rdquo;</p>
              <footer className="mt-4 border-t border-wine/10 pt-4 text-sm font-semibold text-wine-dark">
                {review.name}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
