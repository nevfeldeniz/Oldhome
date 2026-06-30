// Serileştirilebilir varsayılan site verisi (görsel yolları dosya adı olarak).
// Admin paneli bu yapıyı düzenler; asset() çözümlemesi hydrateSiteData() ile yapılır.

export const defaultSiteData = {
  hero: {
    brand: 'Old Home Guest House',
    welcome: 'Welcome Home',
    subtitle: 'Konforlu Konaklama, Sıcak Bir Yuva Hissi',
    description:
      'Rahatlığı ve huzuru bir araya getirerek misafirlerimize unutulmaz bir konaklama deneyimi sunuyoruz.',
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
      price: '3.500 TL',
      capacity: '3 Misafir',
      image: 'room-3.png',
      features: ['Geniş aile odası', 'Klima & Ücretsiz Wi-Fi', 'Özel banyo', 'Esnek yatak düzeni'],
      featured: false,
    },
  ],

  showcaseRooms: [
    { id: 1, number: 'Oda 001', type: 'Çift', description: 'Zemin katta, ferah ve aydınlık çift kişilik odamız. Sıcak ahşap tonları ve konforlu yatağıyla huzurlu bir konaklama sunar.', price: '2.700 TL', images: ['rooms/001/01.png', 'rooms/001/02.png', 'rooms/001/03.png', 'rooms/001/04.png'], features: ['Ücretsiz Wi-Fi', 'Klima', 'Çift Kişilik Yatak', 'Çay & Kahve İkramı', 'Smart TV', 'Özel Banyo', 'Saç Kurutma Makinesi', 'Günlük Temizlik'] },
    { id: 2, number: 'Oda 002', type: 'Tek', description: 'Tek başına seyahat edenler için ideal, sakin ve kompakt odamız. Çalışma için uygun, sessiz bir köşe.', price: '2.200 TL', images: ['room-1.png', 'room.png', 'bathroom.png', 'hero-building.png'], features: ['Ücretsiz Wi-Fi', 'Klima', 'Çay & Kahve İkramı', 'Smart TV', 'Özel Banyo', 'Günlük Temizlik'] },
    { id: 3, number: 'Oda 003', type: '3 Kişilik', description: 'Aileler için geniş, üç kişilik konaklamaya uygun ferah odamız. Esnek yatak düzeni ve bol depolama alanı.', price: '3.500 TL', images: ['room-3.png', 'room.png', 'bathroom.png', 'hero-building.png'], features: ['Ücretsiz Wi-Fi', 'Klima', 'Geniş Aile Yatağı', 'Çay & Kahve İkramı', 'Smart TV', 'Özel Banyo', 'Mini Buzdolabı', 'Günlük Temizlik'] },
    { id: 4, number: 'Oda 004', type: 'Çift', description: 'Modern dekoru ve özel banyosuyla çiftler için sıcak bir yuva hissi veren odamız.', price: '2.700 TL', images: ['room-2.png', 'room.png', 'bathroom.png', 'hero-building.png'], features: ['Ücretsiz Wi-Fi', 'Klima', 'Çift Kişilik Yatak', 'Çay & Kahve İkramı', 'Smart TV', 'Özel Banyo', 'Saç Kurutma Makinesi', 'Günlük Temizlik'] },
    { id: 5, number: 'Oda 005', type: 'Tek', description: 'Bütçe dostu, temiz ve şık tek kişilik odamız. Tüm temel konfor detaylarıyla donatılmıştır.', price: '2.200 TL', images: ['room-1.png', 'room.png', 'bathroom.png', 'hero-building.png'], features: ['Ücretsiz Wi-Fi', 'Klima', 'Çay & Kahve İkramı', 'Smart TV', 'Özel Banyo', 'Günlük Temizlik'] },
    { id: 6, number: 'Oda 006', type: 'Çift', description: 'Üst katta, gün ışığı alan keyifli çift kişilik odamız. Dinlenme koltuğu ve şehir köşesi manzarası.', price: '2.700 TL', images: ['room-2.png', 'room.png', 'bathroom.png', 'hero-building.png'], features: ['Ücretsiz Wi-Fi', 'Klima', 'Çift Kişilik Yatak', 'Çay & Kahve İkramı', 'Smart TV', 'Özel Banyo', 'Saç Kurutma Makinesi', 'Günlük Temizlik'] },
    { id: 7, number: 'Oda 007', type: '3 Kişilik', description: 'En geniş aile odalarımızdan biri. İki ayrı yatak alanı ve rahat bir oturma köşesi sunar.', price: '3.500 TL', images: ['room-3.png', 'room.png', 'bathroom.png', 'hero-building.png'], features: ['Ücretsiz Wi-Fi', 'Klima', 'Geniş Aile Yatağı', 'Çay & Kahve İkramı', 'Smart TV', 'Özel Banyo', 'Mini Buzdolabı', 'Günlük Temizlik'] },
    { id: 8, number: 'Oda 008', type: 'Çift', description: 'Sıcak krem tonlarıyla huzur veren, çift kişilik premium odamız. Sessiz arka cephe.', price: '2.700 TL', images: ['room-2.png', 'room.png', 'bathroom.png', 'hero-building.png'], features: ['Ücretsiz Wi-Fi', 'Klima', 'Çift Kişilik Yatak', 'Çay & Kahve İkramı', 'Smart TV', 'Özel Banyo', 'Saç Kurutma Makinesi', 'Günlük Temizlik'] },
    { id: 9, number: 'Oda 009', type: 'Tek', description: 'Pratik ve konforlu tek kişilik odamız; iş seyahatleri için ideal bir seçenek.', price: '2.200 TL', images: ['room-1.png', 'room.png', 'bathroom.png', 'hero-building.png'], features: ['Ücretsiz Wi-Fi', 'Klima', 'Çay & Kahve İkramı', 'Smart TV', 'Özel Banyo', 'Günlük Temizlik'] },
    { id: 10, number: 'Oda 010', type: 'Çift', description: 'Geniş yatağı ve ferah banyosuyla öne çıkan, romantik bir konaklama için ideal odamız.', price: '2.700 TL', images: ['room-2.png', 'room.png', 'bathroom.png', 'hero-building.png'], features: ['Ücretsiz Wi-Fi', 'Klima', 'Çift Kişilik Yatak', 'Çay & Kahve İkramı', 'Smart TV', 'Özel Banyo', 'Saç Kurutma Makinesi', 'Günlük Temizlik'] },
    { id: 11, number: 'Oda 011', type: '3 Kişilik', description: 'Üst katın köşesinde yer alan, bol ışıklı ve geniş üç kişilik odamız. Kalabalık aileler için uygun.', price: '3.500 TL', images: ['room-3.png', 'room.png', 'bathroom.png', 'hero-building.png'], features: ['Ücretsiz Wi-Fi', 'Klima', 'Geniş Aile Yatağı', 'Çay & Kahve İkramı', 'Smart TV', 'Özel Banyo', 'Mini Buzdolabı', 'Günlük Temizlik'] },
  ],

  gallery: [
    { src: 'hero-building.png', alt: 'Otel dış cephesi', label: 'Dış Cephe' },
    { src: 'room.png', alt: 'Şık yatak odası', label: 'Yatak Odası' },
    { src: 'bathroom.png', alt: 'Modern banyo', label: 'Banyo' },
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
