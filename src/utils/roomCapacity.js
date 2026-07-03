/** Oda tipine göre kartlarda gösterilen kapasite metinleri */

export function getRoomCapacityTitle(type) {
  switch (type) {
    case 'Tek':
      return '1–2 Kişi Konaklamaya Uygun'
    case 'Çift':
      return '1–2 Kişi Konaklamaya Uygun'
    case '3 Kişilik':
      return '1–3 Kişi Konaklamaya Uygun'
    default:
      return '1–2 Kişi Konaklamaya Uygun'
  }
}

export function getRoomCapacityShort(type) {
  switch (type) {
    case 'Tek':
      return '1–2 Misafir'
    case 'Çift':
      return '1–2 Misafir'
    case '3 Kişilik':
      return '1–3 Misafir'
    default:
      return '1–2 Misafir'
  }
}
