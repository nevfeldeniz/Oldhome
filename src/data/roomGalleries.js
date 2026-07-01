// Oda galerileri — dosya yolları public/rooms/ altındadır.
// Tekrarlayan açılar elendi; her bölümden en iyi tek kare seçildi.

export const roomGalleries = {
  '001': {
    id: 'room-1',
    title: 'Room 001',
    images: [
      {
        src: 'rooms/001/01.png',
        alt: 'Wide view of Room 001 at Old Home Cyprus showing double bed, white wardrobe, wicker chair and ensuite bathroom entrance',
        category: 'overview',
      },
      {
        src: 'rooms/001/02.png',
        alt: 'Hotel room interior at Old Home Cyprus showing bed with white linens, grey headboard and seating area by the window',
        category: 'bed',
      },
      {
        src: 'rooms/001/03.png',
        alt: 'Second angle of Room 001 at Old Home Cyprus featuring double bed, round wicker chair and marble-tiled bathroom view',
        category: 'angle',
      },
      {
        src: 'rooms/001/04.png',
        alt: 'Window seating area in Room 001 at Old Home Cyprus with grey nest chairs, white cushions and zebra blinds',
        category: 'view',
      },
      {
        src: 'rooms/001/14.png',
        alt: 'Bathroom vanity and sink at Old Home Cyprus Room 001 with grey marble tiles, mirror and complimentary toiletries',
        category: 'sink',
      },
      {
        src: 'rooms/001/15.png',
        alt: 'Ensuite bathroom at Old Home Cyprus Room 001 with white toilet, glass shower cabin and grey marble tiling',
        category: 'shower',
      },
      {
        src: 'rooms/001/17.png',
        alt: 'In-room entertainment and refreshment station at Old Home Cyprus Room 001 with flat-screen TV, mini-fridge and kettle',
        category: 'detail',
      },
      {
        src: 'rooms/001/19.png',
        alt: 'Glossy white wardrobe and bed detail in Room 001 at Old Home Cyprus with premium minimalist interior design',
        category: 'detail',
      },
    ],
  },
  '002': {
    id: 'room-2',
    title: 'Room 002',
    images: [
      {
        src: 'rooms/002/01.png',
        alt: 'Wide view of Room 002 at Old Home Cyprus showing single and double beds, wicker seating area and ensuite bathroom entrance',
        category: 'overview',
      },
      {
        src: 'rooms/002/02.png',
        alt: 'Triple room sleeping area at Old Home Cyprus Room 002 with single and double beds, white linens and marble bathroom view',
        category: 'bed',
      },
      {
        src: 'rooms/002/03.png',
        alt: 'Second angle of Room 002 at Old Home Cyprus featuring single and double beds, grey headboard and bathroom doorway',
        category: 'angle',
      },
      {
        src: 'rooms/002/04.png',
        alt: 'Window seating area in Room 002 at Old Home Cyprus with two grey nest chairs, white cushions and zebra blinds',
        category: 'view',
      },
      {
        src: 'rooms/002/05.png',
        alt: 'Bathroom vanity and sink at Old Home Cyprus Room 002 with grey marble tiles, mirror and complimentary toiletries',
        category: 'sink',
      },
      {
        src: 'rooms/002/06.png',
        alt: 'Ensuite bathroom at Old Home Cyprus Room 002 with glass shower cabin, white toilet, towel rack and grey marble tiling',
        category: 'shower',
      },
      {
        src: 'rooms/002/07.png',
        alt: 'In-room entertainment and storage at Old Home Cyprus Room 002 with flat-screen TV, mini-fridge, wardrobe and wicker chair',
        category: 'detail',
      },
      {
        src: 'rooms/002/08.png',
        alt: 'Bathroom vanity in Room 002 at Old Home Cyprus looking into the bedroom with marble tiles and modern white sink',
        category: 'detail',
      },
    ],
  },
}

/** Oda numarasından galeri verisini döndürür (örn. "Oda 001" → "001") */
export function getRoomGallery(roomNumber) {
  const id = roomNumber.replace(/\D/g, '').padStart(3, '0')
  return roomGalleries[id] || null
}

/** Kart önizlemesi için ilk N görsel yolu */
export function getRoomPreviewImages(roomNumber, count = 4) {
  const gallery = getRoomGallery(roomNumber)
  if (!gallery) return null
  return gallery.images.slice(0, count).map((img) => img.src)
}
