/** Oda tipine göre galeri fiyatları */
export function getShowcasePricing(type) {
  switch (type) {
    case 'Tek':
      return { price: '2.200 TL', oldPrice: undefined }
    case 'Çift':
      return { price: '2.700 TL', oldPrice: '3.200 TL' }
    case '3 Kişilik':
      return { price: '2.700 TL', oldPrice: '3.500 TL' }
    default:
      return { price: '', oldPrice: undefined }
  }
}
