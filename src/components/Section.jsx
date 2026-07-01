import { motion } from 'framer-motion'

// Görünür olunca yukarı doğru beliren tekrar kullanılabilir animasyon sarmalayıcı.
export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

export function Reveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  )
}

/** Ortak bölüm başlığı — mobilde alt çizgi ve ayırıcı ile */
export function SectionIntro({ eyebrow, title, subtitle, id, className = '', children }) {
  return (
    <header className={`section-head mx-auto max-w-2xl text-center ${className}`}>
      {eyebrow && (
        <>
          <div className="section-eyebrow justify-center">{eyebrow}</div>
          <span className="section-title-rule" aria-hidden="true" />
        </>
      )}
      <h2
        id={id}
        className={`text-3xl font-semibold text-wine-dark sm:text-4xl ${eyebrow ? 'mt-3' : ''}`}
      >
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-base leading-relaxed text-ink/65">{subtitle}</p>}
      {children}
    </header>
  )
}

// Bölüm başlıkları için ortak düzen.
export function SectionHeading({ eyebrow, title, subtitle, align = 'center', id }) {
  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'
  const headingId = id || 'section-heading'
  const ruleAlign = align === 'center' ? 'mx-auto' : ''

  return (
    <Reveal className={`section-head flex flex-col ${alignment} max-w-2xl gap-0 sm:gap-4`}>
      {eyebrow && (
        <>
          <span className="section-eyebrow">{eyebrow}</span>
          <span className={`section-title-rule ${ruleAlign}`} aria-hidden="true" />
        </>
      )}
      <h2
        id={headingId}
        className={`text-3xl font-semibold text-wine-dark sm:text-4xl md:text-5xl ${eyebrow ? 'mt-3 sm:mt-0' : ''}`}
      >
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-base leading-relaxed text-ink/65 sm:text-ink/70">{subtitle}</p>}
    </Reveal>
  )
}
