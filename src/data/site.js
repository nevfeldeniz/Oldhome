// Statik menü linkleri (admin panelinden değiştirilmez)
export const navLinks = [
  { label: 'Ana Sayfa', href: '#home' },
  { label: 'Hakkımızda', href: '#about' },
  { label: 'Odalarımız', href: '#rooms' },
  { label: 'Oda Galerisi', href: '#room-showcase' },
  { label: 'Dış Mekân', href: '#outdoor' },
  { label: 'İmkanlar', href: '#amenities' },
  { label: 'İletişim', href: '#contact' },
]

// İkon adları lucide-react ile eşleşir (Amenities.jsx)
export const amenities = [
  { icon: 'Wifi', title: 'Ücretsiz Wi-Fi', description: 'Tesis genelinde kesintisiz erişim.' },
  { icon: 'Snowflake', title: 'Klima', description: 'Tüm odalarımızda klima konforu.' },
  { icon: 'ShieldCheck', title: '7/24 Güvenlik', description: 'Güvenliğiniz için 7/24 hizmetinizdeyiz.' },
  { icon: 'Coffee', title: 'Sınırsız İkram', description: 'Gün boyu sınırsız ücretsiz çay ve kahve ikramı.' },
  { icon: 'UtensilsCrossed', title: 'Yemek Opsiyonları', description: 'İsteğe bağlı kahvaltı, öğle ve akşam yemeği seçenekleri.' },
  { icon: 'Sparkles', title: 'Sürekli Temizlik', description: 'Gün içinde sürekli yenilenen ve temizlenen hijyenik odalar.' },
]

export const asset = (path) => `${import.meta.env.BASE_URL}${path}`
