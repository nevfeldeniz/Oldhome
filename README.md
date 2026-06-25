# Old Home Guest House

Lefkoşa, Kıbrıs'taki butik otel **Old Home Guest House** için modern, şık ve responsive (mobil uyumlu) tek sayfalık (one-page) web sitesi.

## Teknoloji Yığını

- **React 18** + **Vite** (hızlı geliştirme & build)
- **Tailwind CSS** (özel renk paleti & tipografi)
- **Framer Motion** (giriş ve scroll animasyonları)
- **lucide-react** (ikonlar)
- **Google Fonts**: Playfair Display (başlıklar) & Montserrat (gövde)

## Kurulum & Çalıştırma

Node.js 18+ kurulu olmalıdır.

```bash
# 1. Bağımlılıkları yükle
npm install

# 2. Geliştirme sunucusunu başlat
npm run dev

# 3. Production build (dağıtım için)
npm run build
npm run preview
```

`npm run dev` çalıştıktan sonra terminalde gösterilen adresi (genellikle http://localhost:5173) tarayıcıda açın.

## Proje Yapısı

```
.
├── index.html              # HTML giriş noktası + font preload
├── tailwind.config.js      # Renk paleti, fontlar, animasyonlar
├── src
│   ├── main.jsx            # React giriş noktası
│   ├── index.css           # Tailwind + ortak buton/başlık stilleri
│   ├── App.jsx             # Tüm bölümleri birleştirir
│   ├── data/site.js        # ⭐ TÜM İÇERİK BURADA (metin, fiyat, iletişim)
│   └── components/
│       ├── Section.jsx     # Ortak animasyon & başlık yardımcıları
│       ├── Navbar.jsx
│       ├── Hero.jsx
│       ├── About.jsx
│       ├── Amenities.jsx
│       ├── Rooms.jsx
│       ├── Gallery.jsx
│       ├── Contact.jsx
│       └── Footer.jsx
```

## İçeriği Güncelleme

Site metinleri, oda fiyatları, imkanlar, galeri görselleri ve iletişim bilgilerinin **tamamı** tek bir dosyada toplanmıştır:

> `src/data/site.js`

Buradaki değerleri değiştirmeniz yeterlidir; bileşenleri düzenlemenize gerek yoktur.

- **Oda fiyatları/özellikleri** → `rooms`
- **İmkanlar** → `amenities` (ikon adları `lucide-react` ile eşleşir)
- **İletişim bilgileri** → `contact`
- **Galeri görselleri** → `gallery`

### Görseller

Şu an tüm görseller [Unsplash](https://unsplash.com) placeholder'larıdır. Kendi fotoğraflarınızı kullanmak için:

1. Fotoğrafları `public/` klasörüne kopyalayın (örn. `public/oda-1.jpg`).
2. `src/data/site.js` içindeki ilgili `image` / `src` alanını `/oda-1.jpg` olarak güncelleyin.
3. Hero ve About görselleri için ilgili bileşen dosyasındaki `HERO_IMAGE` / `ABOUT_IMAGE` sabitini değiştirin.

## Renk Paleti

Tema, otelin gerçek tabelasına göre **krem zemin + bordo (şarap) vurgu** olarak ayarlanmıştır.

| Kullanım | Renk |
| --- | --- |
| Ana arka plan (krem) | `#f5efe3` |
| Açık krem (kartlar) | `#faf6ec` |
| Kum / bej bölümler | `#e8dcc4` |
| Bordo vurgu (marka) | `#6e2b3d` |
| Koyu bordo (footer) | `#511f2c` |
| Metin (ink) | `#33272b` |

Bu renkler `tailwind.config.js` içinde `cream`, `parchment`, `sand`, `wine`, `ink` olarak tanımlıdır.
