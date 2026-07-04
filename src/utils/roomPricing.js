/** Oda tipine göre konaklama ücretleri */

export const DEFAULT_RATE_PLANS = {
  max2: [
    { guests: 1, label: '1 Kişilik Konaklama', price: '2.200 TL', oldPrice: '2.200 TL' },
    { guests: 2, label: '2 Kişilik Konaklama', price: '2.700 TL', oldPrice: '3.200 TL' },
  ],
  max3: [
    { guests: 1, label: '1 Kişilik Konaklama', price: '2.200 TL', oldPrice: '2.200 TL' },
    { guests: 2, label: '2 Kişilik Konaklama', price: '2.700 TL', oldPrice: '3.200 TL' },
    { guests: 3, label: '3 Kişilik Konaklama', price: '2.700 TL', oldPrice: '3.500 TL' },
  ],
}

function resolveMaxGuests(type, maxGuests) {
  if (maxGuests != null) return maxGuests >= 3 ? 3 : 2
  return type === '3 Kişilik' ? 3 : 2
}

export function getRoomRateList(type, ratePlans, maxGuests) {
  const max = resolveMaxGuests(type, maxGuests)
  const plans = ratePlans || DEFAULT_RATE_PLANS
  const key = max >= 3 ? 'max3' : 'max2'
  return plans[key] || DEFAULT_RATE_PLANS[key]
}

export function hasDiscountedRates(type, ratePlans, maxGuests) {
  return getRoomRateList(type, ratePlans, maxGuests).some((rate) => rate.oldPrice && rate.oldPrice !== rate.price)
}

export function getLowestRate(type, ratePlans, maxGuests) {
  return getRoomRateList(type, ratePlans, maxGuests)[0]?.price ?? ''
}

/** @deprecated Tek fiyat gösterimi için — geriye dönük uyumluluk */
export function getShowcasePricing(type, ratePlans, maxGuests) {
  const rates = getRoomRateList(type, ratePlans, maxGuests)
  const discounted = rates.find((rate) => rate.oldPrice && rate.oldPrice !== rate.price)
  if (discounted) {
    return { price: discounted.price, oldPrice: discounted.oldPrice }
  }
  return { price: rates[0]?.price ?? '', oldPrice: undefined }
}

export function normalizeRatePlans(raw) {
  if (!raw || typeof raw !== 'object') return DEFAULT_RATE_PLANS
  return {
    max2: Array.isArray(raw.max2) && raw.max2.length ? raw.max2 : DEFAULT_RATE_PLANS.max2,
    max3: Array.isArray(raw.max3) && raw.max3.length ? raw.max3 : DEFAULT_RATE_PLANS.max3,
  }
}
