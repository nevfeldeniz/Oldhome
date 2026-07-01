// Serileştirilebilir varsayılan site verisi (görsel yolları dosya adı olarak).
// Admin paneli bu yapıyı düzenler; asset() çözümlemesi hydrateSiteData() ile yapılır.

export const defaultSiteData = {
  hero: {
    brand: 'Old Home Guest House',
    welcome: 'Welcome Home',
    subtitle: 'Konforlu Konaklama, Sıcak Bir Yuva Hissi',
    description:
      'Rahatlığı ve huzuru bir araya getirerek misafirlerimize unutulmaz bir konaklama deneyimi sunuyoruz.',
    image: 'oldhome-cyprus-hotel-exterior.jpg',
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
      name: '1 Kişilik Oda',
      price: '2.200 TL',
      capacity: '1 Misafir',
      image: 'oldhome-cyprus-room-003-01.jpg',
      imageAlt: 'Single room at Old Home Boutique Hotel Cyprus',
      features: ['Tek kişilik konforlu yatak', 'Klima & Ücretsiz Wi-Fi', 'Özel banyo', 'Günlük temizlik'],
      featured: false,
    },
    {
      name: '2 Kişilik Oda',
      price: '2.700 TL',
      oldPrice: '3.200 TL',
      capacity: '2 Misafir',
      image: 'oldhome-cyprus-room-001-01.jpg',
      imageAlt: 'Double room at Old Home Boutique Hotel Cyprus',
      features: ['Çift kişilik geniş yatak', 'Klima & Ücretsiz Wi-Fi', 'Özel banyo', 'Sınırsız çay & kahve'],
      featured: true,
    },
    {
      name: '3 Kişilik Oda',
      price: '2.700 TL',
      oldPrice: '3.500 TL',
      capacity: '3 Misafir',
      image: 'oldhome-cyprus-room-002-01.jpg',
      imageAlt: 'Triple room at Old Home Boutique Hotel Cyprus',
      features: ['Geniş aile odası', 'Klima & Ücretsiz Wi-Fi', 'Özel banyo', 'Esnek yatak düzeni'],
      featured: false,
    },
  ],

  showcaseRooms: [
    { id: 1, number: 'Oda 001', type: 'Çift', description: 'Zemin katta, ferah ve aydınlık çift kişilik odamız. Sıcak ahşap tonları ve konforlu yatağıyla huzurlu bir konaklama sunar.', price: '2.700 TL', oldPrice: '3.200 TL', images: ['oldhome-cyprus-room-001-01.jpg', 'oldhome-cyprus-room-001-02.jpg', 'oldhome-cyprus-room-001-03.jpg', 'oldhome-cyprus-room-001-04.jpg'], features: ['Ücretsiz Wi-Fi', 'Klima', 'Çift Kişilik Yatak', 'Çay & Kahve İkramı', 'Smart TV', 'Özel Banyo', 'Saç Kurutma Makinesi', 'Günlük Temizlik'] },
    { id: 2, number: 'Oda 002', type: '3 Kişilik', description: 'Tek kişilik ve çift kişilik yatak düzeniyle aileler veya üç kişilik gruplar için ideal ferah odamız. Oturma köşesi ve geniş banyosuyla konforlu bir konaklama sunar.', price: '2.700 TL', oldPrice: '3.500 TL', images: ['oldhome-cyprus-room-002-01.jpg', 'oldhome-cyprus-room-002-02.jpg', 'oldhome-cyprus-room-002-03.jpg', 'oldhome-cyprus-room-002-04.jpg'], features: ['Ücretsiz Wi-Fi', 'Klima', 'Geniş Aile Yatağı', 'Çay & Kahve İkramı', 'Smart TV', 'Özel Banyo', 'Mini Buzdolabı', 'Günlük Temizlik'] },
    { id: 3, number: 'Oda 003', type: 'Tek', description: 'Minimalist ve aydınlık tek kişilik odamız. Konforlu yatak, çalışma masası, Smart TV ve mini buzdolabı ile sakin bir konaklama sunar.', price: '2.200 TL', images: ['oldhome-cyprus-room-003-01.jpg', 'oldhome-cyprus-room-003-02.jpg', 'oldhome-cyprus-room-003-03.jpg', 'oldhome-cyprus-room-003-04.jpg'], features: ['Ücretsiz Wi-Fi', 'Klima', 'Çay & Kahve İkramı', 'Smart TV', 'Özel Banyo', 'Mini Buzdolabı', 'Günlük Temizlik'] },
    { id: 4, number: 'Oda 004', type: 'Çift', description: 'Modern dekoru ve özel banyosuyla çiftler için sıcak bir yuva hissi veren odamız.', price: '2.700 TL', oldPrice: '3.200 TL', images: ['oldhome-cyprus-room-001-01.jpg', 'oldhome-cyprus-room-001-02.jpg', 'oldhome-cyprus-room-bathroom-001-01.jpg', 'oldhome-cyprus-hotel-exterior-02.jpg'], features: ['Ücretsiz Wi-Fi', 'Klima', 'Çift Kişilik Yatak', 'Çay & Kahve İkramı', 'Smart TV', 'Özel Banyo', 'Saç Kurutma Makinesi', 'Günlük Temizlik'] },
    { id: 5, number: 'Oda 005', type: 'Tek', description: 'Modern ve ferah tek kişilik odamız. Beyaz minimalist tasarım, konforlu yatak, duvar tipi Smart TV, mini buzdolabı, çalışma köşesi ve mermer kaplı özel banyosuyla yalnız seyahat eden misafirler için idealdir.', price: '2.200 TL', images: ['oldhome-cyprus-room-005-01.jpg', 'oldhome-cyprus-room-005-02.jpg', 'oldhome-cyprus-room-005-03.jpg', 'oldhome-cyprus-room-005-04.jpg'], features: ['Ücretsiz Wi-Fi', 'Klima', 'Çay & Kahve İkramı', 'Smart TV', 'Özel Banyo', 'Mini Buzdolabı', 'Günlük Temizlik'] },
    { id: 6, number: 'Oda 006', type: '3 Kişilik', description: 'Üç kişilik odamız; çift kişilik ve tek kişilik yatak düzeniyle en fazla 3 misafir konaklayabilir. Pencere kenarı oturma köşesi, Smart TV, mini buzdolabı ve mermer kaplı özel banyosuyla aileler ve arkadaş grupları için idealdir.', price: '2.700 TL', oldPrice: '3.500 TL', images: ['oldhome-cyprus-room-006-01.jpg', 'oldhome-cyprus-room-006-02.jpg', 'oldhome-cyprus-room-006-03.jpg', 'oldhome-cyprus-room-006-04.jpg'], features: ['Ücretsiz Wi-Fi', 'Klima', 'Geniş Aile Yatağı', 'Çay & Kahve İkramı', 'Smart TV', 'Özel Banyo', 'Mini Buzdolabı', 'Günlük Temizlik'] },
    { id: 7, number: 'Oda 007', type: '3 Kişilik', description: 'En geniş aile odalarımızdan biri. İki ayrı yatak alanı ve rahat bir oturma köşesi sunar.', price: '2.700 TL', oldPrice: '3.500 TL', images: ['oldhome-cyprus-room-002-01.jpg', 'oldhome-cyprus-room-001-02.jpg', 'oldhome-cyprus-room-bathroom-001-01.jpg', 'oldhome-cyprus-hotel-exterior-02.jpg'], features: ['Ücretsiz Wi-Fi', 'Klima', 'Geniş Aile Yatağı', 'Çay & Kahve İkramı', 'Smart TV', 'Özel Banyo', 'Mini Buzdolabı', 'Günlük Temizlik'] },
    { id: 8, number: 'Oda 008', type: '3 Kişilik', description: 'Üç kişilik odamız; mermer zemin, çift kişilik ve tek kişilik yatak düzeniyle 3 misafire kadar konaklama imkânı sunar. Hasır oturma köşesi, Smart TV, mini buzdolabı ve şık mermer banyosuyla modern ve konforlu bir konaklama sağlar.', price: '2.700 TL', oldPrice: '3.500 TL', images: ['oldhome-cyprus-room-008-01.jpg', 'oldhome-cyprus-room-008-02.jpg', 'oldhome-cyprus-room-008-03.jpg', 'oldhome-cyprus-room-008-04.jpg'], features: ['Ücretsiz Wi-Fi', 'Klima', 'Geniş Aile Yatağı', 'Çay & Kahve İkramı', 'Smart TV', 'Özel Banyo', 'Mini Buzdolabı', 'Günlük Temizlik'] },
    { id: 9, number: 'Oda 009', type: 'Çift', description: 'Aydınlık ve minimalist odamız. Konforlu çift kişilik yatak, pencere kenarı hasır oturma köşesi, geniş gömme gardırop, Smart TV, mini buzdolabı ve mermer kaplı özel banyosuyla keyifli bir konaklama sunar.', price: '2.700 TL', oldPrice: '3.200 TL', images: ['oldhome-cyprus-room-009-01.jpg', 'oldhome-cyprus-room-009-02.jpg', 'oldhome-cyprus-room-009-03.jpg', 'oldhome-cyprus-room-009-04.jpg'], features: ['Ücretsiz Wi-Fi', 'Klima', 'Çift Kişilik Yatak', 'Çay & Kahve İkramı', 'Smart TV', 'Özel Banyo', 'Mini Buzdolabı', 'Günlük Temizlik'] },
    { id: 10, number: 'Oda 010', type: 'Çift', description: 'Geniş yatağı ve ferah banyosuyla öne çıkan, romantik bir konaklama için ideal odamız.', price: '2.700 TL', oldPrice: '3.200 TL', images: ['oldhome-cyprus-room-001-01.jpg', 'oldhome-cyprus-room-001-02.jpg', 'oldhome-cyprus-room-bathroom-001-01.jpg', 'oldhome-cyprus-hotel-exterior-02.jpg'], features: ['Ücretsiz Wi-Fi', 'Klima', 'Çift Kişilik Yatak', 'Çay & Kahve İkramı', 'Smart TV', 'Özel Banyo', 'Saç Kurutma Makinesi', 'Günlük Temizlik'] },
    { id: 11, number: 'Oda 011', type: 'Tek', description: 'Üst katta yer alan, aydınlık ve minimalist odamız. Konforlu tek kişilik yatak, mermer zemin, geniş ayna, Smart TV, mini buzdolabı, çalışma köşesi ve yağmur duşlu mermer banyosuyla yalnız seyahat eden misafirler için idealdir.', price: '2.200 TL', images: ['oldhome-cyprus-room-011-01.jpg', 'oldhome-cyprus-room-011-02.jpg', 'oldhome-cyprus-room-011-03.jpg', 'oldhome-cyprus-room-011-04.jpg'], features: ['Ücretsiz Wi-Fi', 'Klima', 'Çay & Kahve İkramı', 'Smart TV', 'Özel Banyo', 'Mini Buzdolabı', 'Günlük Temizlik'] },
  ],

  outdoorGallery: [
    {
      src: 'oldhome-cyprus-hotel-exterior-02.jpg',
      alt: 'Wide view of the boutique hotel exterior at Old Home Boutique Hotel Cyprus',
      label: 'Genel Dış Cephe',
      category: 'exterior',
    },
    {
      src: 'oldhome-cyprus-hotel-exterior-03.jpg',
      alt: 'Front facade and outdoor terrace at Old Home Boutique Hotel Cyprus',
      label: 'Cephe & Teras',
      category: 'exterior',
    },
    {
      src: 'oldhome-cyprus-terrace-01.jpg',
      alt: 'Outdoor terrace with seating at Old Home Boutique Hotel Cyprus',
      label: 'Bahçe Terası',
      category: 'terrace',
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
      src: 'oldhome-cyprus-hotel-exterior-02.jpg',
      alt: 'Wide view of the boutique hotel exterior at Old Home Boutique Hotel Cyprus',
      label: 'Dış Cephe',
    },
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
    instagram: 'https://www.instagram.com/',
    facebook: 'https://www.facebook.com/',
  },

  footer: {
    slogan: 'Rahat, Temiz ve Güvenli. Sizi Bekliyor...',
  },
}
