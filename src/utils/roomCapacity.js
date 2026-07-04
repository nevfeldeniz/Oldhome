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

export function getRoomTypeLabel(type) {
  switch (type) {
    case 'Tek':
      return 'Tek Kişilik'
    case 'Çift':
      return 'Çift Kişilik'
    case '3 Kişilik':
      return '3 Kişilik'
    default:
      return type
  }
}

export function getRoomMaxCapacityLabel(type) {
  return type === '3 Kişilik' ? 'Maksimum 3 Misafir' : 'Maksimum 2 Misafir'
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
