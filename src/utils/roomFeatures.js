/** Tüm odalarda bulunması gereken temel özellikler */
export const BASE_ROOM_FEATURES = [
  'Klima',
  'Ücretsiz Wi-Fi',
  'Smart TV',
  'Özel Banyo',
  'Çay & Kahve İkramı',
  'Günlük Temizlik',
  'Saç Kurutma Makinesi',
  'Ütü',
]

/** Opsiyonel — odalara eklenebilir */
export const EXTRA_ROOM_FEATURES = [
  'Mini Buzdolabı',
  'Çalışma Masası',
  'Geniş Oda',
  'Geniş Çift Kişilik Yatak',
  'Esnek Yatak Düzeni',
  'Elbise Dolabı',
  'Komodin',
  'Askılık',
]

export const ALL_ROOM_FEATURE_OPTIONS = [...BASE_ROOM_FEATURES, ...EXTRA_ROOM_FEATURES]
