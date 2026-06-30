// Oda galerileri — dosya yolları public/rooms/ altındadır.
// Her oda için profesyonel otel galeri sırası (genel → detay).

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
        src: 'rooms/001/05.png',
        alt: 'Cozy seating nook by the window in Room 001 at Old Home Cyprus with natural light and modern decor',
        category: 'view',
      },
      {
        src: 'rooms/001/06.png',
        alt: 'Relaxing corner seating in Room 001 at Old Home Cyprus near window with striped roller blinds',
        category: 'view',
      },
      {
        src: 'rooms/001/07.png',
        alt: 'Ensuite bathroom entrance at Old Home Cyprus Room 001 with glass shower cabin and grey marble tiles',
        category: 'bathroom-entry',
      },
      {
        src: 'rooms/001/08.png',
        alt: 'Modern bathroom at Old Home Cyprus Room 001 with corner glass shower, white vanity sink and marble walls',
        category: 'sink',
      },
      {
        src: 'rooms/001/09.png',
        alt: 'Bathroom vanity and sink area at Old Home Cyprus Room 001 with grey marble tiles and hotel toiletries',
        category: 'sink',
      },
      {
        src: 'rooms/001/10.png',
        alt: 'White ceramic sink and modern faucet in Room 001 bathroom at Old Home Cyprus with marble-patterned walls',
        category: 'sink',
      },
      {
        src: 'rooms/001/11.png',
        alt: 'Compact bathroom sink unit at Old Home Cyprus Room 001 with mirror shelf and complimentary amenities',
        category: 'sink',
      },
      {
        src: 'rooms/001/12.png',
        alt: 'Wall-mounted bathroom vanity with white basin at Old Home Cyprus Room 001 and elegant grey tile finish',
        category: 'sink',
      },
      {
        src: 'rooms/001/13.png',
        alt: 'Minimalist bathroom sink and wood-accent vanity at Old Home Cyprus Room 001 with marble wall tiles',
        category: 'sink',
      },
      {
        src: 'rooms/001/14.png',
        alt: 'Bathroom shelf with toiletries above white sink at Old Home Cyprus Room 001 reflecting clean hotel standards',
        category: 'sink',
      },
      {
        src: 'rooms/001/15.png',
        alt: 'Shower and toilet area in Room 001 bathroom at Old Home Cyprus with curved glass enclosure and mosaic tiles',
        category: 'shower',
      },
      {
        src: 'rooms/001/16.png',
        alt: 'Modern ensuite bathroom at Old Home Cyprus Room 001 featuring white toilet and corner shower with rainfall head',
        category: 'shower',
      },
      {
        src: 'rooms/001/17.png',
        alt: 'In-room entertainment and refreshment station at Old Home Cyprus Room 001 with flat-screen TV, mini-fridge and kettle',
        category: 'detail',
      },
      {
        src: 'rooms/001/18.png',
        alt: 'Hotel room amenity detail at Old Home Cyprus Room 001 showing TV console, tea and coffee tray with mugs and glasses',
        category: 'detail',
      },
      {
        src: 'rooms/001/19.png',
        alt: 'Glossy white wardrobe and bed detail in Room 001 at Old Home Cyprus with premium minimalist interior design',
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
