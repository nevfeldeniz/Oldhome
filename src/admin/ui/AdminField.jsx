export function AdminField({ label, children, hint }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-wine-dark">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-ink/50">{hint}</span>}
    </label>
  )
}

export function AdminInput({ className = '', ...props }) {
  return (
    <input
      className={`w-full rounded-xl border border-wine/20 bg-cream px-4 py-2.5 text-sm text-ink outline-none transition focus:border-wine focus:ring-2 focus:ring-wine/20 ${className}`}
      {...props}
    />
  )
}

export function AdminTextarea({ className = '', rows = 4, ...props }) {
  return (
    <textarea
      rows={rows}
      className={`w-full resize-y rounded-xl border border-wine/20 bg-cream px-4 py-2.5 text-sm text-ink outline-none transition focus:border-wine focus:ring-2 focus:ring-wine/20 ${className}`}
      {...props}
    />
  )
}

export function AdminSelect({ className = '', children, ...props }) {
  return (
    <select
      className={`w-full rounded-xl border border-wine/20 bg-cream px-4 py-2.5 text-sm text-ink outline-none transition focus:border-wine focus:ring-2 focus:ring-wine/20 ${className}`}
      {...props}
    >
      {children}
    </select>
  )
}

export function AdminCard({ title, children, action }) {
  return (
    <section className="rounded-2xl border border-wine/10 bg-parchment p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h3 className="font-serif text-xl font-semibold text-wine-dark">{title}</h3>
        {action}
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  )
}

export function AdminSaveNote({ liveHint = false } = {}) {
  return (
    <p className="rounded-xl border border-wine/15 bg-wine/5 px-4 py-3 text-sm text-wine">
      Değişiklikler otomatik kaydedilir.
      {liveHint
        ? ' Canlı sitede görünmesi için üstteki «Değişiklikleri Kaydet ve Yayınla» butonuna basın.'
        : ' Admin panelini yenilediğinizde güncel içerik görünür.'}
    </p>
  )
}
