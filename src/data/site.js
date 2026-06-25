// =====================================================================
//  Old Home Guest House - Merkezi içerik dosyası
//  Tüm metinleri, fiyatları ve iletişim bilgilerini buradan güncelleyin.
// =====================================================================

// public/ klasöründeki görseller için "base" yoluna duyarlı yardımcı.
// GitHub Pages gibi alt yolda yayınlandığında (ör. /depo-adi/) yolu otomatik düzeltir.
export const asset = (path) => `${import.meta.env.BASE_URL}${path}`

export const navLinks = [
  { label: 'Ana Sayfa', href: '#home' },
  { label: 'Hakkımızda', href: '#about' },
  { label: 'Odalarımız', href: '#rooms' },
  { label: 'İmkanlar', href: '#amenities' },
  { label: 'İletişim', href: '#contact' },
]

export const hero = {
  brand: 'Old Home Guest House',
  welcome: 'Welcome Home',
  subtitle: 'Konforlu Konaklama, Sıcak Bir Yuva Hissi',
  description:
    'Rahatlığı ve huzuru bir araya getirerek misafirlerimize unutulmaz bir konaklama deneyimi sunuyoruz.',
}

export const about = {
  title: 'Hakkımızda',
  paragraph:
    'Old Home Guest House, 2 katlı ve toplam 11 odasıyla hizmet veren, sıcak ve samimi bir butik oteldir. İster iş ister tatil amaçlı seyahat edin, evinizin konforunda ağırlamaktan mutluluk duyarız. Gün içinde sürekli temizlenen hijyenik ortamımızda misafirlerimizin rahatı her zaman önceliğimizdir.',
  stats: [
    { value: '2', label: 'Katlı Bina' },
    { value: '11', label: 'Konforlu Oda' },
    { value: '7/24', label: 'Güvenlik & İkram' },
  ],
}

// İkon adları lucide-react ile eşleşir (bkz. Amenities.jsx)
export const amenities = [
  {
    icon: 'Wifi',
    title: 'Ücretsiz Wi-Fi',
    description: 'Tesis genelinde kesintisiz erişim.',
  },
  {
    icon: 'Snowflake',
    title: 'Klima',
    description: 'Tüm odalarımızda klima konforu.',
  },
  {
    icon: 'ShieldCheck',
    title: '7/24 Güvenlik',
    description: 'Güvenliğiniz için 7/24 hizmetinizdeyiz.',
  },
  {
    icon: 'Coffee',
    title: 'Sınırsız İkram',
    description: 'Gün boyu sınırsız ücretsiz çay ve kahve ikramı.',
  },
  {
    icon: 'UtensilsCrossed',
    title: 'Yemek Opsiyonları',
    description: 'İsteğe bağlı kahvaltı, öğle ve akşam yemeği seçenekleri.',
  },
  {
    icon: 'Sparkles',
    title: 'Sürekli Temizlik',
    description: 'Gün içinde sürekli yenilenen ve temizlenen hijyenik odalar.',
  },
]

export const rooms = [
  {
    name: '1 Kişilik Oda',
    price: '2.200 TL',
    capacity: '1 Misafir',
    image: asset('room-1.png'),
    features: ['Tek kişilik konforlu yatak', 'Klima & Ücretsiz Wi-Fi', 'Özel banyo', 'Günlük temizlik'],
    featured: false,
  },
  {
    name: '2 Kişilik Oda',
    price: '2.700 TL',
    oldPrice: '3.200 TL',
    capacity: '2 Misafir',
    image: asset('room-2.png'),
    features: ['Çift kişilik geniş yatak', 'Klima & Ücretsiz Wi-Fi', 'Özel banyo', 'Sınırsız çay & kahve'],
    featured: true,
  },
  {
    name: '3 Kişilik Oda',
    price: '3.500 TL',
    capacity: '3 Misafir',
    image: asset('room-3.png'),
    features: ['Geniş aile odası', 'Klima & Ücretsiz Wi-Fi', 'Özel banyo', 'Esnek yatak düzeni'],
    featured: false,
  },
]

export const roomsNote = '0-6 yaş arası çocuklar tüm odalarımızda ücretsizdir.'

export const gallery = [
  {
    src: asset('hero-building.png'),
    alt: 'Otel dış cephesi',
    label: 'Dış Cephe',
  },
  {
    src: asset('room.png'),
    alt: 'Şık yatak odası',
    label: 'Yatak Odası',
  },
  {
    src: asset('bathroom.png'),
    alt: 'Modern banyo',
    label: 'Banyo',
  },
]

export const contact = {
  address: 'Lala Mustafa Paşa Sokak 18 ve 18A, Köşklüçiftlik / Lefkoşa, Kıbrıs',
  phones: ['0533 113 98 62', '0539 113 98 48'],
  email: 'info@oldhomecyprus.com',
  // Telefon linkleri için temizlenmiş (boşluksuz) numaralar
  phoneLinks: ['+905331139862', '+905391139848'],
}

export const footer = {
  slogan: 'Rahat, Temiz ve Güvenli. Sizi Bekliyor...',
}
