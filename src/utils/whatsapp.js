export function getWhatsAppUrl(phone, message = 'Merhaba, Old Home Guest House için rezervasyon yapmak istiyorum.') {
  const clean = String(phone || '').replace(/\D/g, '')
  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`
}
