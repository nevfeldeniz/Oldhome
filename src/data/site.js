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
  { label: 'Oda Galerisi', href: '#room-showcase' },
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

// =====================================================================
//  ODA GALERİSİ (Room Showcase) - 11 oda
//  Kendi fotoğraflarını eklemek için sadece "images" dizisindeki
//  bağlantıları değiştirmen yeterli (her oda için 4 görsel).
//  Şimdilik public/ klasöründeki mevcut görseller placeholder olarak kullanılıyor.
// =====================================================================

// Oda tipine göre varsayılan fiyat ve ana görsel eşlemesi
const roomTypeDefaults = {
  Tek: { price: '2.200 TL', main: 'room-1.png' },
  Çift: { price: '2.700 TL', main: 'room-2.png' },
  '3 Kişilik': { price: '3.500 TL', main: 'room-3.png' },
}

// Her odaya 4 görsellik bir set üretir (ana görsel + ortak placeholder'lar)
const buildImages = (main) =>
  [main, 'room.png', 'bathroom.png', 'hero-building.png'].map((p) => asset(p))

const showcaseSeed = [
  { number: '101', type: 'Çift', desc: 'Zemin katta, ferah ve aydınlık çift kişilik odamız. Sıcak ahşap tonları ve konforlu yatağıyla huzurlu bir konaklama sunar.' },
  { number: '102', type: 'Tek', desc: 'Tek başına seyahat edenler için ideal, sakin ve kompakt odamız. Çalışma için uygun, sessiz bir köşe.' },
  { number: '103', type: '3 Kişilik', desc: 'Aileler için geniş, üç kişilik konaklamaya uygun ferah odamız. Esnek yatak düzeni ve bol depolama alanı.' },
  { number: '104', type: 'Çift', desc: 'Modern dekoru ve özel banyosuyla çiftler için sıcak bir yuva hissi veren odamız.' },
  { number: '105', type: 'Tek', desc: 'Bütçe dostu, temiz ve şık tek kişilik odamız. Tüm temel konfor detaylarıyla donatılmıştır.' },
  { number: '201', type: 'Çift', desc: 'Üst katta, gün ışığı alan keyifli çift kişilik odamız. Dinlenme koltuğu ve şehir köşesi manzarası.' },
  { number: '202', type: '3 Kişilik', desc: 'En geniş aile odalarımızdan biri. İki ayrı yatak alanı ve rahat bir oturma köşesi sunar.' },
  { number: '203', type: 'Çift', desc: 'Sıcak krem tonlarıyla huzur veren, çift kişilik premium odamız. Sessiz arka cephe.' },
  { number: '204', type: 'Tek', desc: 'Pratik ve konforlu tek kişilik odamız; iş seyahatleri için ideal bir seçenek.' },
  { number: '205', type: 'Çift', desc: 'Geniş yatağı ve ferah banyosuyla öne çıkan, romantik bir konaklama için ideal odamız.' },
  { number: '206', type: '3 Kişilik', desc: 'Üst katın köşesinde yer alan, bol ışıklı ve geniş üç kişilik odamız. Kalabalık aileler için uygun.' },
]

const featuresByType = {
  Tek: ['Ücretsiz Wi-Fi', 'Klima', 'Çay & Kahve İkramı', 'Smart TV', 'Özel Banyo', 'Günlük Temizlik'],
  Çift: ['Ücretsiz Wi-Fi', 'Klima', 'Çift Kişilik Yatak', 'Çay & Kahve İkramı', 'Smart TV', 'Özel Banyo', 'Saç Kurutma Makinesi', 'Günlük Temizlik'],
  '3 Kişilik': ['Ücretsiz Wi-Fi', 'Klima', 'Geniş Aile Yatağı', 'Çay & Kahve İkramı', 'Smart TV', 'Özel Banyo', 'Mini Buzdolabı', 'Günlük Temizlik'],
}

export const showcaseRooms = showcaseSeed.map((room, index) => ({
  id: index + 1,
  number: `Oda ${room.number}`,
  type: room.type,
  description: room.desc,
  price: roomTypeDefaults[room.type].price,
  // Bir odaya kendi fotoğraflarını vermek için yukarıdaki showcaseSeed
  // satırına `images: ['oda101-1.png', 'oda101-2.png', ...]` ekle (public/ içindeki dosyalar).
  // Aksi halde tipe göre varsayılan placeholder görseller kullanılır.
  images: room.images
    ? room.images.map((p) => asset(p))
    : buildImages(roomTypeDefaults[room.type].main),
  features: featuresByType[room.type],
}))

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
