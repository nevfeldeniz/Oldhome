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

// Bölüm başlıkları için ortak düzen.
export function SectionHeading({ eyebrow, title, subtitle, align = 'center' }) {
  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'
  return (
    <Reveal className={`flex flex-col ${alignment} max-w-2xl gap-4`}>
      {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-wine-dark">{title}</h2>
      {subtitle && <p className="text-ink/70 leading-relaxed">{subtitle}</p>}
    </Reveal>
  )
}
