// Serileştirilebilir varsayılan site verisi (görsel yolları dosya adı olarak).
// Admin paneli bu yapıyı düzenler; asset() çözümlemesi hydrateSiteData() ile yapılır.

const withDefaultAvailability = (rooms) =>
  rooms.map((room) => ({ availability: 'available', ...room }))

export const defaultSiteData = {
  pricingRoomsRevision: 5,

  hero: {
    brand: 'Old Home Guest House',
    welcome: 'Welcome Home',
    subtitle: 'Konforlu Konaklama, Sıcak Bir Yuva Hissi',
    description:
      'Rahatlığı ve huzuru bir araya getirerek misafirlerimize unutulmaz bir konaklama deneyimi sunuyoruz.',
    image: 'oldhome-cyprus-hotel-exterior.jpg',
    imageMobile: 'oldhome-cyprus-hero-mobile.png',
  },

  about: {
    title: 'Hakkımızda',
    paragraph:
      'Old Home Guest House, 2 katlı ve toplam 11 odasıyla hizmet veren, sıcak ve samimi bir butik oteldir. İster iş ister tatil amaçlı seyahat edin, evinizin konforunda ağırlamaktan mutluluk duyarız. Gün içinde sürekli temizlenen hijyenik ortamımızda misafirlerimizin rahatı her zaman önceliğimizdir.',
    image: 'oldhome-cyprus-garden-lounge.jpg',
    imageAlt: 'Modern outdoor lounge area with grey wicker furniture at Old Home Guest House Cyprus',
    stats: [
      { value: '2', label: 'Katlı Bina' },
      { value: '11', label: 'Konforlu Oda' },
      { value: '7/24', label: 'Güvenlik & İkram' },
    ],
  },

  roomsNote: '0-6 yaş arası çocuklar tüm odalarımızda ücretsizdir.',

  rooms: [
    {
      id: 'pricing-single',
      name: '1 Kişilik Konaklama',
      price: '2.200 TL',
      capacity: '1–2 Misafir',
      image: 'oldhome-cyprus-pricing-room-single.jpg',
      imageAlt: 'Tek kişilik oda — Old Home Boutique Hotel Kıbrıs',
      features: ['Konforlu tek kişilik kullanım', 'Klima', 'Ücretsiz Wi-Fi', 'Özel banyo'],
      featured: false,
    },
    {
      id: 'pricing-double',
      name: '2 Kişilik Konaklama',
      price: '2.700 TL',
      oldPrice: '3.200 TL',
      capacity: '1–2 Misafir',
      image: 'oldhome-cyprus-pricing-room-double-03.jpg',
      imageAlt: 'Geniş çift kişilik oda, TV ünitesi ve oturma köşesi — Old Home Boutique Hotel Kıbrıs',
      features: ['Çift kişilik geniş yatak', 'Klima', 'Ücretsiz Wi-Fi', 'Çay & kahve ikramı'],
      featured: true,
    },
    {
      id: 'pricing-triple',
      name: '3 Kişilik Konaklama',
      price: '2.700 TL',
      oldPrice: '3.500 TL',
      capacity: '1–3 Misafir',
      image: 'oldhome-cyprus-pricing-room-triple.jpg',
      imageAlt: 'Üç kişilik oda — Old Home Boutique Hotel Kıbrıs',
      features: ['Geniş aile odası', 'Esnek yatak düzeni', 'Klima', 'Ücretsiz Wi-Fi', 'Özel banyo'],
      featured: false,
    },
  ],

  showcaseRooms: withDefaultAvailability([
    { id: 1, number: 'Oda 001', type: 'Çift', availability: 'occupied', description: 'Zemin katta, ferah ve aydınlık çift kişilik odamız. Sıcak ahşap tonları ve konforlu yatağıyla huzurlu bir konaklama sunar.', price: '2.700 TL', oldPrice: '3.200 TL', images: ['oldhome-cyprus-room-001-01.jpg', 'oldhome-cyprus-room-001-03.jpg'], features: ['Ücretsiz Wi-Fi', 'Klima', 'Çift Kişilik Yatak', 'Çay & Kahve İkramı', 'Smart TV', 'Özel Banyo', 'Saç Kurutma Makinesi', 'Günlük Temizlik'] },
    { id: 2, number: 'Oda 002', type: 'Çift', availability: 'occupied', description: 'Yenilenen ferah çift kişilik odamız. Geniş yatak, pencere kenarı hasır oturma köşesi, Smart TV, mini buzdolabı ve mermer banyosuyla konforlu bir konaklama sunar.', price: '2.700 TL', oldPrice: '3.200 TL', images: ['oldhome-cyprus-room-002-01.jpg', 'oldhome-cyprus-room-002-02.jpg'], features: ['Ücretsiz Wi-Fi', 'Klima', 'Çift Kişilik Yatak', 'Çay & Kahve İkramı', 'Smart TV', 'Özel Banyo', 'Mini Buzdolabı', 'Günlük Temizlik'] },
    { id: 3, number: 'Oda 003', type: 'Tek', availability: 'occupied', description: 'Minimalist ve aydınlık tek kişilik odamız. Konforlu yatak, çalışma masası, Smart TV ve mini buzdolabı ile sakin bir konaklama sunar.', price: '2.200 TL', images: ['oldhome-cyprus-room-003-01.jpg', 'oldhome-cyprus-room-003-02.jpg'], features: ['Ücretsiz Wi-Fi', 'Klima', 'Çay & Kahve İkramı', 'Smart TV', 'Özel Banyo', 'Mini Buzdolabı', 'Günlük Temizlik'] },
    { id: 4, number: 'Oda 004', type: 'Çift', availability: 'occupied', description: 'Yenilenen çift kişilik odamız. Geniş yatak, ayna karşılı oturma köşesi, Smart TV, mini buzdolabı ve mermer banyosuyla konforlu bir konaklama sunar.', price: '2.700 TL', oldPrice: '3.200 TL', images: ['oldhome-cyprus-room-004-01.jpg', 'oldhome-cyprus-room-004-02.jpg'], features: ['Ücretsiz Wi-Fi', 'Klima', 'Çift Kişilik Yatak', 'Çay & Kahve İkramı', 'Smart TV', 'Özel Banyo', 'Mini Buzdolabı', 'Günlük Temizlik'] },
    { id: 5, number: 'Oda 005', type: 'Tek', availability: 'occupied', description: 'Modern ve ferah tek kişilik odamız. Beyaz minimalist tasarım, konforlu yatak, duvar tipi Smart TV, mini buzdolabı, çalışma köşesi ve mermer kaplı özel banyosuyla yalnız seyahat eden misafirler için idealdir.', price: '2.200 TL', images: ['oldhome-cyprus-room-005-01.jpg', 'oldhome-cyprus-room-005-04.jpg'], features: ['Ücretsiz Wi-Fi', 'Klima', 'Çay & Kahve İkramı', 'Smart TV', 'Özel Banyo', 'Mini Buzdolabı', 'Günlük Temizlik'] },
    { id: 6, number: 'Oda 006', type: 'Çift', description: 'Yenilenen ferah çift kişilik odamız. Geniş yatak, hasır oturma köşesi, boy aynası, Smart TV, mini buzdolabı ve mermer banyosuyla konforlu bir konaklama sunar.', price: '2.700 TL', oldPrice: '3.200 TL', images: ['oldhome-cyprus-room-006-01.jpg', 'oldhome-cyprus-room-006-02.jpg'], features: ['Ücretsiz Wi-Fi', 'Klima', 'Çift Kişilik Yatak', 'Çay & Kahve İkramı', 'Smart TV', 'Özel Banyo', 'Mini Buzdolabı', 'Günlük Temizlik'] },
    { id: 7, number: 'Oda 007', type: '3 Kişilik', description: 'Yenilenen üç kişilik odamız. Çift ve tek kişilik yatak düzeni, manzaralı pencere kenarı hasır oturma köşesi, Smart TV, mini buzdolabı ve mermer banyosuyla aileler için idealdir.', price: '2.700 TL', oldPrice: '3.500 TL', images: ['oldhome-cyprus-room-007-01.jpg', 'oldhome-cyprus-room-007-03.jpg'], features: ['Ücretsiz Wi-Fi', 'Klima', 'Geniş Aile Yatağı', 'Çay & Kahve İkramı', 'Smart TV', 'Özel Banyo', 'Mini Buzdolabı', 'Günlük Temizlik'] },
    { id: 8, number: 'Oda 008', type: '3 Kişilik', description: 'Üç kişilik odamız; mermer zemin, çift kişilik ve tek kişilik yatak düzeniyle 3 misafire kadar konaklama imkânı sunar. Hasır oturma köşesi, Smart TV, mini buzdolabı ve şık mermer banyosuyla modern ve konforlu bir konaklama sağlar.', price: '2.700 TL', oldPrice: '3.500 TL', images: ['oldhome-cyprus-room-008-01.jpg', 'oldhome-cyprus-room-008-04.jpg'], features: ['Ücretsiz Wi-Fi', 'Klima', 'Geniş Aile Yatağı', 'Çay & Kahve İkramı', 'Smart TV', 'Özel Banyo', 'Mini Buzdolabı', 'Günlük Temizlik'] },
    { id: 9, number: 'Oda 009', type: 'Çift', description: 'Aydınlık ve minimalist odamız. Konforlu çift kişilik yatak, pencere kenarı hasır oturma köşesi, geniş gömme gardırop, Smart TV, mini buzdolabı ve mermer kaplı özel banyosuyla keyifli bir konaklama sunar.', price: '2.700 TL', oldPrice: '3.200 TL', images: ['oldhome-cyprus-room-009-01.jpg', 'oldhome-cyprus-room-009-04.jpg'], features: ['Ücretsiz Wi-Fi', 'Klima', 'Çift Kişilik Yatak', 'Çay & Kahve İkramı', 'Smart TV', 'Özel Banyo', 'Mini Buzdolabı', 'Günlük Temizlik'] },
    { id: 10, number: 'Oda 010', type: 'Çift', description: 'Yenilenen çift kişilik odamız. Geniş yatak, hasır oturma köşesi, boy aynalı gardırop, Smart TV, mini buzdolabı ve mermer banyosuyla romantik bir konaklama sunar.', price: '2.700 TL', oldPrice: '3.200 TL', images: ['oldhome-cyprus-room-010-01.jpg', 'oldhome-cyprus-room-010-02.jpg'], features: ['Ücretsiz Wi-Fi', 'Klima', 'Çift Kişilik Yatak', 'Çay & Kahve İkramı', 'Smart TV', 'Özel Banyo', 'Mini Buzdolabı', 'Günlük Temizlik'] },
    { id: 11, number: 'Oda 011', type: 'Tek', description: 'Üst katta yer alan, aydınlık ve minimalist odamız. Konforlu tek kişilik yatak, mermer zemin, geniş ayna, Smart TV, mini buzdolabı, çalışma köşesi ve yağmur duşlu mermer banyosuyla yalnız seyahat eden misafirler için idealdir.', price: '2.200 TL', images: ['oldhome-cyprus-room-011-01.jpg', 'oldhome-cyprus-room-011-04.jpg'], features: ['Ücretsiz Wi-Fi', 'Klima', 'Çay & Kahve İkramı', 'Smart TV', 'Özel Banyo', 'Mini Buzdolabı', 'Günlük Temizlik'] },
  ]),

  outdoorGallery: [
    {
      src: 'oldhome-cyprus-hotel-exterior-03.jpg',
      alt: 'Front facade and outdoor terrace at Old Home Boutique Hotel Cyprus',
      label: 'Genel Dış Cephe',
      category: 'exterior',
    },
    {
      src: 'oldhome-cyprus-terrace-02.jpg',
      alt: 'Welcome terrace and curved architecture at Old Home Boutique Hotel Cyprus',
      label: 'Karşılama Alanı',
      category: 'terrace',
    },
    {
      src: 'oldhome-cyprus-hotel-sign.jpg',
      alt: 'Old Home guest house sign at Old Home Boutique Hotel Cyprus',
      label: 'Old Home Tabelası',
      category: 'terrace',
    },
    {
      src: 'oldhome-cyprus-terrace-03.jpg',
      alt: 'Shaded terrace lounge at Old Home Boutique Hotel Cyprus',
      label: 'Gölgeli Teras',
      category: 'lounge',
    },
    {
      src: 'oldhome-cyprus-garden-seating-01.jpg',
      alt: 'Garden seating area with wicker furniture at Old Home Boutique Hotel Cyprus',
      label: 'Hasır Oturma',
      category: 'lounge',
    },
    {
      src: 'oldhome-cyprus-garden-seating-02.jpg',
      alt: 'Outdoor lounge corner at Old Home Boutique Hotel Cyprus',
      label: 'Dinlenme Köşesi',
      category: 'lounge',
    },
  ],

  gallery: [
    {
      src: 'oldhome-cyprus-terrace-03.jpg',
      alt: 'Shaded terrace lounge at Old Home Boutique Hotel Cyprus',
      label: 'Teras',
    },
    {
      src: 'oldhome-cyprus-garden-seating-02.jpg',
      alt: 'Outdoor lounge corner at Old Home Boutique Hotel Cyprus',
      label: 'Oturma Köşesi',
    },
  ],

  contact: {
    address: 'Lala Mustafa Paşa Sk-1065, Lefkoşa 99010',
    placeName: 'Old Home Guest House',
    phones: ['0539 113 98 62', '0539 113 98 48'],
    email: 'info@oldhomecyprus.com',
    phoneLinks: ['+905391139862', '+905391139848'],
  },

  social: {
    whatsapp: '905391139862',
    whatsappMessage: 'Merhaba, Old Home Guest House için rezervasyon yapmak istiyorum.',
    instagram: 'https://www.instagram.com/oldhomecyprus/',
    facebook: 'https://www.facebook.com/',
  },

  footer: {
    slogan: 'Rahat, Temiz ve Güvenli. Sizi Bekliyor...',
  },
}
