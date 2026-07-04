/** Oda tipine göre konaklama ücretleri */

const RATES_MAX_2 = [
  {
    guests: 1,
    label: '1 Kişilik Konaklama',
    price: '2.200 TL',
    oldPrice: '2.200 TL',
  },
  {
    guests: 2,
    label: '2 Kişilik Konaklama',
    price: '2.700 TL',
    oldPrice: '3.200 TL',
  },
]

const RATES_MAX_3 = [
  ...RATES_MAX_2,
  {
    guests: 3,
    label: '3 Kişilik Konaklama',
    price: '2.700 TL',
    oldPrice: '3.500 TL',
  },
]

export function getRoomRateList(type) {
  return type === '3 Kişilik' ? RATES_MAX_3 : RATES_MAX_2
}

export function hasDiscountedRates(type) {
  return getRoomRateList(type).some((rate) => rate.oldPrice !== rate.price)
}

export function getLowestRate(type) {
  return getRoomRateList(type)[0]?.price ?? ''
}

/** @deprecated Tek fiyat gösterimi için — geriye dönük uyumluluk */
export function getShowcasePricing(type) {
  const rates = getRoomRateList(type)
  const discounted = rates.find((rate) => rate.oldPrice !== rate.price)
  if (discounted) {
    return { price: discounted.price, oldPrice: discounted.oldPrice }
  }
  return { price: rates[0]?.price ?? '', oldPrice: undefined }
}
