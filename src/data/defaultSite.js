// Serileştirilebilir varsayılan site verisi (görsel yolları dosya adı olarak).
// Admin paneli bu yapıyı düzenler; asset() çözümlemesi hydrateSiteData() ile yapılır.

export const defaultSiteData = {
  hero: {
    brand: 'Old Home Guest House',
    welcome: 'Welcome Home',
    subtitle: 'Konforlu Konaklama, Sıcak Bir Yuva Hissi',
    description:
      'Rahatlığı ve huzuru bir araya getirerek misafirlerimize unutulmaz bir konaklama deneyimi sunuyoruz.',
    image: 'outdoor/hero.jpg',
  },

  about: {
    title: 'Hakkımızda',
    paragraph:
      'Old Home Guest House, 2 katlı ve toplam 11 odasıyla hizmet veren, sıcak ve samimi bir butik oteldir. İster iş ister tatil amaçlı seyahat edin, evinizin konforunda ağırlamaktan mutluluk duyarız. Gün içinde sürekli temizlenen hijyenik ortamımızda misafirlerimizin rahatı her zaman önceliğimizdir.',
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
      image: 'room-1.png',
      features: ['Tek kişilik konforlu yatak', 'Klima & Ücretsiz Wi-Fi', 'Özel banyo', 'Günlük temizlik'],
      featured: false,
    },
    {
      name: '2 Kişilik Oda',
      price: '2.700 TL',
      oldPrice: '3.200 TL',
      capacity: '2 Misafir',
      image: 'room-2.png',
      features: ['Çift kişilik geniş yatak', 'Klima & Ücretsiz Wi-Fi', 'Özel banyo', 'Sınırsız çay & kahve'],
      featured: true,
    },
    {
      name: '3 Kişilik Oda',
      price: '2.700 TL',
      oldPrice: '3.500 TL',
      capacity: '3 Misafir',
      image: 'room-3.png',
      features: ['Geniş aile odası', 'Klima & Ücretsiz Wi-Fi', 'Özel banyo', 'Esnek yatak düzeni'],
      featured: false,
    },
  ],

  showcaseRooms: [
    { id: 1, number: 'Oda 001', type: 'Çift', description: 'Zemin katta, ferah ve aydınlık çift kişilik odamız. Sıcak ahşap tonları ve konforlu yatağıyla huzurlu bir konaklama sunar.', price: '2.700 TL', oldPrice: '3.200 TL', images: ['rooms/001/01.png', 'rooms/001/02.png', 'rooms/001/03.png', 'rooms/001/04.png'], features: ['Ücretsiz Wi-Fi', 'Klima', 'Çift Kişilik Yatak', 'Çay & Kahve İkramı', 'Smart TV', 'Özel Banyo', 'Saç Kurutma Makinesi', 'Günlük Temizlik'] },
    { id: 2, number: 'Oda 002', type: '3 Kişilik', description: 'Tek kişilik ve çift kişilik yatak düzeniyle aileler veya üç kişilik gruplar için ideal ferah odamız. Oturma köşesi ve geniş banyosuyla konforlu bir konaklama sunar.', price: '2.700 TL', oldPrice: '3.500 TL', images: ['rooms/002/01.png', 'rooms/002/02.png', 'rooms/002/03.png', 'rooms/002/04.png'], features: ['Ücretsiz Wi-Fi', 'Klima', 'Geniş Aile Yatağı', 'Çay & Kahve İkramı', 'Smart TV', 'Özel Banyo', 'Mini Buzdolabı', 'Günlük Temizlik'] },
    { id: 3, number: 'Oda 003', type: 'Tek', description: 'Minimalist ve aydınlık tek kişilik odamız. Konforlu yatak, çalışma masası, Smart TV ve mini buzdolabı ile sakin bir konaklama sunar.', price: '2.200 TL', images: ['rooms/003/01.png', 'rooms/003/02.png', 'rooms/003/03.png', 'rooms/003/04.png'], features: ['Ücretsiz Wi-Fi', 'Klima', 'Çay & Kahve İkramı', 'Smart TV', 'Özel Banyo', 'Mini Buzdolabı', 'Günlük Temizlik'] },
    { id: 4, number: 'Oda 004', type: 'Çift', description: 'Modern dekoru ve özel banyosuyla çiftler için sıcak bir yuva hissi veren odamız.', price: '2.700 TL', oldPrice: '3.200 TL', images: ['room-2.png', 'room.png', 'bathroom.png', 'hero-building.png'], features: ['Ücretsiz Wi-Fi', 'Klima', 'Çift Kişilik Yatak', 'Çay & Kahve İkramı', 'Smart TV', 'Özel Banyo', 'Saç Kurutma Makinesi', 'Günlük Temizlik'] },
    { id: 5, number: 'Oda 005', type: 'Tek', description: 'Modern ve ferah tek kişilik odamız. Beyaz minimalist tasarım, konforlu yatak, duvar tipi Smart TV, mini buzdolabı, çalışma köşesi ve mermer kaplı özel banyosuyla yalnız seyahat eden misafirler için idealdir.', price: '2.200 TL', images: ['rooms/005/01.png', 'rooms/005/02.png', 'rooms/005/03.png', 'rooms/005/04.png'], features: ['Ücretsiz Wi-Fi', 'Klima', 'Çay & Kahve İkramı', 'Smart TV', 'Özel Banyo', 'Mini Buzdolabı', 'Günlük Temizlik'] },
    { id: 6, number: 'Oda 006', type: '3 Kişilik', description: 'Üç kişilik odamız; çift kişilik ve tek kişilik yatak düzeniyle en fazla 3 misafir konaklayabilir. Pencere kenarı oturma köşesi, Smart TV, mini buzdolabı ve mermer kaplı özel banyosuyla aileler ve arkadaş grupları için idealdir.', price: '2.700 TL', oldPrice: '3.500 TL', images: ['rooms/006/01.png', 'rooms/006/02.png', 'rooms/006/03.png', 'rooms/006/04.png'], features: ['Ücretsiz Wi-Fi', 'Klima', 'Geniş Aile Yatağı', 'Çay & Kahve İkramı', 'Smart TV', 'Özel Banyo', 'Mini Buzdolabı', 'Günlük Temizlik'] },
    { id: 7, number: 'Oda 007', type: '3 Kişilik', description: 'En geniş aile odalarımızdan biri. İki ayrı yatak alanı ve rahat bir oturma köşesi sunar.', price: '2.700 TL', oldPrice: '3.500 TL', images: ['room-3.png', 'room.png', 'bathroom.png', 'hero-building.png'], features: ['Ücretsiz Wi-Fi', 'Klima', 'Geniş Aile Yatağı', 'Çay & Kahve İkramı', 'Smart TV', 'Özel Banyo', 'Mini Buzdolabı', 'Günlük Temizlik'] },
    { id: 8, number: 'Oda 008', type: '3 Kişilik', description: 'Üç kişilik odamız; mermer zemin, çift kişilik ve tek kişilik yatak düzeniyle 3 misafire kadar konaklama imkânı sunar. Hasır oturma köşesi, Smart TV, mini buzdolabı ve şık mermer banyosuyla modern ve konforlu bir konaklama sağlar.', price: '2.700 TL', oldPrice: '3.500 TL', images: ['rooms/008/01.png', 'rooms/008/02.png', 'rooms/008/03.png', 'rooms/008/04.png'], features: ['Ücretsiz Wi-Fi', 'Klima', 'Geniş Aile Yatağı', 'Çay & Kahve İkramı', 'Smart TV', 'Özel Banyo', 'Mini Buzdolabı', 'Günlük Temizlik'] },
    { id: 9, number: 'Oda 009', type: 'Çift', description: 'Aydınlık ve minimalist odamız. Konforlu çift kişilik yatak, pencere kenarı hasır oturma köşesi, geniş gömme gardırop, Smart TV, mini buzdolabı ve mermer kaplı özel banyosuyla keyifli bir konaklama sunar.', price: '2.700 TL', oldPrice: '3.200 TL', images: ['rooms/009/01.png', 'rooms/009/02.png', 'rooms/009/03.png', 'rooms/009/04.png'], features: ['Ücretsiz Wi-Fi', 'Klima', 'Çift Kişilik Yatak', 'Çay & Kahve İkramı', 'Smart TV', 'Özel Banyo', 'Mini Buzdolabı', 'Günlük Temizlik'] },
    { id: 10, number: 'Oda 010', type: 'Çift', description: 'Geniş yatağı ve ferah banyosuyla öne çıkan, romantik bir konaklama için ideal odamız.', price: '2.700 TL', oldPrice: '3.200 TL', images: ['room-2.png', 'room.png', 'bathroom.png', 'hero-building.png'], features: ['Ücretsiz Wi-Fi', 'Klima', 'Çift Kişilik Yatak', 'Çay & Kahve İkramı', 'Smart TV', 'Özel Banyo', 'Saç Kurutma Makinesi', 'Günlük Temizlik'] },
    { id: 11, number: 'Oda 011', type: 'Tek', description: 'Üst katta yer alan, aydınlık ve minimalist odamız. Konforlu tek kişilik yatak, mermer zemin, geniş ayna, Smart TV, mini buzdolabı, çalışma köşesi ve yağmur duşlu mermer banyosuyla yalnız seyahat eden misafirler için idealdir.', price: '2.200 TL', images: ['rooms/011/01.png', 'rooms/011/02.png', 'rooms/011/03.png', 'rooms/011/04.png'], features: ['Ücretsiz Wi-Fi', 'Klima', 'Çay & Kahve İkramı', 'Smart TV', 'Özel Banyo', 'Mini Buzdolabı', 'Günlük Temizlik'] },
  ],

  outdoorGallery: [
    {
      src: 'outdoor/01.png',
      alt: 'Old Home Guest House genel dış cephe görünümü, beyaz bina ve teras',
      label: 'Genel Dış Cephe',
      category: 'exterior',
    },
    {
      src: 'outdoor/02.png',
      alt: 'Old Home Guest House ön cephe, teras ve oturma alanları',
      label: 'Cephe & Teras',
      category: 'exterior',
    },
    {
      src: 'outdoor/03.png',
      alt: 'Old Home Guest House geniş teras, şemsiyeler ve bahçe düzeni',
      label: 'Bahçe Terası',
      category: 'terrace',
    },
    {
      src: 'outdoor/04.png',
      alt: 'Old Home Guest House tabela, kavisli mimari ve dış oturma alanı',
      label: 'Karşılama Alanı',
      category: 'terrace',
    },
    {
      src: 'outdoor/05.png',
      alt: 'Old Home Guest House dış tabela ve dekoratif cephe detayı',
      label: 'Old Home Tabelası',
      category: 'terrace',
    },
    {
      src: 'outdoor/06.png',
      alt: 'Old Home Guest House gölgeli teras oturma alanı, hasır mobilya',
      label: 'Gölgeli Teras',
      category: 'lounge',
    },
    {
      src: 'outdoor/07.png',
      alt: 'Old Home Guest House hasır koltuklu dış dinlenme köşesi',
      label: 'Hasır Oturma',
      category: 'lounge',
    },
    {
      src: 'outdoor/08.png',
      alt: 'Old Home Guest House gri rattan mobilyalı oturma köşesi',
      label: 'Dinlenme Köşesi',
      category: 'lounge',
    },
  ],

  gallery: [
    { src: 'outdoor/01.png', alt: 'Old Home Guest House genel dış cephe', label: 'Dış Cephe' },
    { src: 'outdoor/06.png', alt: 'Old Home Guest House gölgeli teras', label: 'Teras' },
    { src: 'outdoor/08.png', alt: 'Old Home Guest House oturma köşesi', label: 'Oturma Köşesi' },
  ],

  contact: {
    address: 'Lala Mustafa Paşa Sokak 18 ve 18A, Köşklüçiftlik / Lefkoşa, Kıbrıs',
    phones: ['0533 113 98 62', '0539 113 98 48'],
    email: 'info@oldhomecyprus.com',
    phoneLinks: ['+905331139862', '+905391139848'],
  },

  footer: {
    slogan: 'Rahat, Temiz ve Güvenli. Sizi Bekliyor...',
  },
}
