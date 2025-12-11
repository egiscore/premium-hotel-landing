import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import HotelGallery from "@/components/HotelGallery";
import BookingDialog from "@/components/BookingDialog";

interface Hotel {
  id: number;
  name: string;
  location: string;
  address?: string;
  price: number;
  description?: string;
  image_url: string;
  features: string[];
  amenities?: string[];
  rating?: number;
  stars?: number;
  rooms_count?: number;
  phone?: string;
  email?: string;
  website?: string;
  check_in_time?: string;
  check_out_time?: string;
  display_order?: number;
  gallery?: string[];
}

const staticHotels: Hotel[] = [
  {
    id: 1,
    name: "The Ritz-Carlton Moscow",
    location: "Центр Москвы",
    address: "Тверская ул., 3",
    price: 65000,
    description: "Терраса O2 Lounge с панорамными видами на Кремль. Роскошные номера с эксклюзивным дизайном и безупречным сервисом.",
    image_url: "https://cdn.poehali.dev/files/ritz-carlton-moscow-premier-luxury-hotel-red-square-russia-capital.jpg",
    features: ["O2 Lounge терраса", "Вид на Кремль", "Президентские люксы", "SPA-центр"],
    rating: 5,
    stars: 5,
    gallery: [
      "https://cdn.poehali.dev/files/ritz-carlton-moscow-premier-luxury-hotel-red-square-russia-capital.jpg",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1200&q=80"
    ]
  },
  {
    id: 2,
    name: "Four Seasons Hotel Moscow",
    location: "Манежная площадь",
    address: "Охотный ряд, 2",
    price: 70000,
    description: "Историческое здание на Манежной площади. Президентские люксы с видом на Кремль и роскошный бассейн.",
    image_url: "https://cdn.poehali.dev/files/48058_0.jpg",
    features: ["Президентские люксы", "Бассейн", "Ресторан Quadrum", "Консьерж 24/7"],
    rating: 5,
    stars: 5,
    gallery: [
      "https://cdn.poehali.dev/files/48058_0.jpg",
      "https://cdn.poehali.dev/files/scale_1200.jpg",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80"
    ]
  },
  {
    id: 3,
    name: "St. Regis Moscow Nikolskaya",
    location: "Никольская улица",
    address: "Никольская ул., 12",
    price: 68000,
    description: "Гранд-лобби в классическом стиле. Легендарный butler service — персональный дворецкий для каждого гостя.",
    image_url: "https://cdn.poehali.dev/files/resize_1200_630_true_crop_3000_1687_0_155_q90_3073561_0893584398edadda732241273.jpeg",
    features: ["Butler service", "Гранд-лобби", "Люксы с историей", "St. Regis Bar"],
    rating: 5,
    stars: 5,
    gallery: [
      "https://cdn.poehali.dev/files/resize_1200_630_true_crop_3000_1687_0_155_q90_3073561_0893584398edadda732241273.jpeg",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80",
      "https://images.unsplash.com/photo-1549294413-26f195200c16?w=1200&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=80",
      "https://images.unsplash.com/photo-1609766975528-20be4f0e0e8c?w=1200&q=80",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&q=80"
    ]
  },
  {
    id: 4,
    name: "Ararat Park Hyatt Moscow",
    location: "Неглинная",
    address: "Неглинная ул., 4",
    price: 58000,
    description: "Фасад с видом на Неглинную. Легендарный Conservatory Lounge Bar с роялем и живой музыкой.",
    image_url: "https://cdn.poehali.dev/files/channels4_profile.jpg",
    features: ["Conservatory Lounge", "Живая музыка", "Ararat Restaurant", "Wellness-центр"],
    rating: 5,
    stars: 5,
    gallery: [
      "https://cdn.poehali.dev/files/channels4_profile.jpg",
      "https://cdn.poehali.dev/files/HYATT_(3375505027).jpg",
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=1200&q=80",
      "https://images.unsplash.com/photo-1587985064135-0366536eab42?w=1200&q=80"
    ]
  },
  {
    id: 5,
    name: "Swissôtel Красные Холмы",
    location: "Таганская",
    address: "Космодамианская наб., 52/6",
    price: 42000,
    description: "Небоскрёб Красные Холмы с панорамами на Москву с высоты птичьего полёта. Современный дизайн и швейцарское качество.",
    image_url: "https://cdn.poehali.dev/files/120233_medium.jpg",
    features: ["Панорамные виды", "Sky Lounge", "Фитнес-центр", "Бизнес-залы"],
    rating: 5,
    stars: 5,
    gallery: [
      "https://cdn.poehali.dev/files/120233_medium.jpg",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
      "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=1200&q=80",
      "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=1200&q=80",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&q=80"
    ]
  },
  {
    id: 6,
    name: "Hotel Metropol Moscow",
    location: "Театральная площадь",
    address: "Театральный проезд, 2",
    price: 55000,
    description: "Историческая мозаика в стиле модерн. Витражные залы и легендарный ресторан с куполом начала XX века.",
    image_url: "https://cdn.poehali.dev/files/hotel_501609_d4e11c1b930835e6e3549ae645b1f367.jpg",
    features: ["Мозаика модерн", "Витражные залы", "Историческая архитектура", "Купольный ресторан"],
    rating: 5,
    stars: 5,
    gallery: [
      "https://cdn.poehali.dev/files/hotel_501609_d4e11c1b930835e6e3549ae645b1f367.jpg",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80",
      "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=1200&q=80",
      "https://images.unsplash.com/photo-1609766975528-20be4f0e0e8c?w=1200&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=80"
    ]
  },
  {
    id: 7,
    name: "Bulgari Hotel Moscow",
    location: "Центр Москвы",
    address: "Петровка ул., 7",
    price: 85000,
    description: "Итальянская роскошь в самом сердце Москвы. Золото и мрамор в спа-центре с эксклюзивными процедурами.",
    image_url: "https://cdn.poehali.dev/files/stella-di-mosca-hotelresidences-moskva-jk-2136945806-6.jpg",
    features: ["Bulgari SPA", "Золото и мрамор", "Итальянский ресторан", "Эксклюзивный дизайн"],
    rating: 5,
    stars: 5,
    gallery: [
      "https://cdn.poehali.dev/files/stella-di-mosca-hotelresidences-moskva-jk-2136945806-6.jpg",
      "https://cdn.poehali.dev/files/b_a2c9601bbd29d926038921a5b7a2ff5f.jpg",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&q=80",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200&q=80",
      "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=1200&q=80"
    ]
  },
  {
    id: 8,
    name: "Mandarin Oriental Moscow",
    location: "Китай-город",
    address: "Большая Никитская ул., 7",
    price: 62000,
    description: "Восточная эстетика в сочетании с московской историей. Терраса на крыше с видами на центр города.",
    image_url: "https://cdn.poehali.dev/files/XXXL (1).png",
    features: ["Терраса на крыше", "Восточный дизайн", "Mandarin Bar", "Спа-процедуры"],
    rating: 5,
    stars: 5,
    gallery: [
      "https://cdn.poehali.dev/files/XXXL (1).png",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=1200&q=80",
      "https://images.unsplash.com/photo-1631049035182-249067d7618e?w=1200&q=80",
      "https://images.unsplash.com/photo-1587985064135-0366536eab42?w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=1200&q=80"
    ]
  },
  {
    id: 9,
    name: "Radisson Collection Hotel Moscow",
    location: "Киевская",
    address: "Площадь Киевского Вокзала, 2",
    price: 38000,
    description: "Wellness СПА-центр с бассейнами и зонами релаксации. Идеально для восстановления сил после деловых встреч.",
    image_url: "https://cdn.poehali.dev/files/27816e13c77ceefcfdd9c451be13237e.jpg",
    features: ["Wellness СПА", "Бассейны", "Зоны релаксации", "Фитнес-центр"],
    rating: 5,
    stars: 5,
    gallery: [
      "https://cdn.poehali.dev/files/27816e13c77ceefcfdd9c451be13237e.jpg",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80",
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=1200&q=80",
      "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=1200&q=80",
      "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=1200&q=80",
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&q=80"
    ]
  },
  {
    id: 10,
    name: "Golden Ring Hotel",
    location: "Смоленская",
    address: "Смоленская ул., 5",
    price: 35000,
    description: "Бизнес-центр для деловых встреч. Современные конференц-залы и профессиональное обслуживание.",
    image_url: "https://cdn.poehali.dev/files/Гостиница-Голден-ринг-в-Москве-800x535.jpg",
    features: ["Конференц-залы", "Бизнес-центр", "Переговорные", "Деловой лаундж"],
    rating: 5,
    stars: 5,
    gallery: [
      "https://cdn.poehali.dev/files/Гостиница-Голден-ринг-в-Москве-800x535.jpg",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&q=80",
      "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=1200&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&q=80",
      "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=1200&q=80"
    ]
  },
  {
    id: 11,
    name: "The Savoy Hotel Moscow",
    location: "Рождественка",
    address: "Рождественка ул., 3",
    price: 48000,
    description: "Исторический фасад начала XX века на улице Рождественка. Классическая архитектура и современный сервис.",
    image_url: "https://cdn.poehali.dev/files/photo0jpg.jpg",
    features: ["Исторический фасад", "Классическая архитектура", "Ресторан Savoy", "Консьерж-сервис"],
    rating: 5,
    stars: 5,
    gallery: [
      "https://cdn.poehali.dev/files/photo0jpg.jpg",
      "https://images.unsplash.com/photo-1631049552240-59c37f38802b?w=1200&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=80",
      "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=1200&q=80",
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&q=80",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&q=80"
    ]
  }
];

const HotelCatalog = () => {
  const [selectedLocation, setSelectedLocation] = useState("Все");
  const [selectedPriceRange, setSelectedPriceRange] = useState<{
    min: number;
    max: number;
  } | null>(null);
  const [bookingDialog, setBookingDialog] = useState<{
    open: boolean;
    hotel: Hotel | null;
  }>({ open: false, hotel: null });

  const locations = [
    "Все",
    ...Array.from(new Set(staticHotels.map((h) => h.location))),
  ];

  const priceRanges = [
    { label: "Все цены", min: 0, max: Infinity },
    { label: "До 30 000 ₽", min: 0, max: 30000 },
    { label: "30 000 - 50 000 ₽", min: 30000, max: 50000 },
    { label: "От 50 000 ₽", min: 50000, max: Infinity },
  ];

  const filteredHotels = staticHotels.filter((hotel) => {
    const locationMatch =
      selectedLocation === "Все" || hotel.location === selectedLocation;
    const priceMatch =
      !selectedPriceRange ||
      (hotel.price >= selectedPriceRange.min &&
        hotel.price <= selectedPriceRange.max);
    return locationMatch && priceMatch;
  });

  return (
    <section id="catalog" className="py-20 px-6 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-light mb-4">Каталог премиум-отелей</h2>
          <p className="text-gray-600 text-lg">
            Избранные отели Москвы для самых взыскательных гостей
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-5 mb-12">
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-3">
              <Icon name="MapPin" size={18} className="text-gold" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-4 py-2 rounded-md border border-gray-200 focus:border-gold focus:outline-none text-sm min-w-[200px]"
              >
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-3">
              <Icon name="DollarSign" size={18} className="text-gold" />
              <select
                onChange={(e) => {
                  const range = priceRanges[parseInt(e.target.value)];
                  setSelectedPriceRange(
                    range.min === 0 && range.max === Infinity ? null : range,
                  );
                }}
                className="px-4 py-2 rounded-md border border-gray-200 focus:border-gold focus:outline-none text-sm min-w-[200px]"
              >
                {priceRanges.map((range, index) => (
                  <option key={index} value={index}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHotels.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600">Отели не найдены</p>
            </div>
          ) : (
            filteredHotels.map((hotel) => (
              <Card
                key={hotel.id}
                className="overflow-hidden hover:shadow-xl transition-shadow duration-300 border-none"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={hotel.image_url}
                    alt={hotel.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <CardContent className="p-6">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-2xl font-light mb-2">
                      {hotel.name}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Icon name="MapPin" size={16} />
                      {hotel.location}
                    </CardDescription>
                  </CardHeader>

                  {hotel.description && (
                    <p className="text-sm text-gray-600 mb-4">
                      {hotel.description}
                    </p>
                  )}

                  {hotel.features && hotel.features.length > 0 && (
                    <div className="space-y-2 mb-4">
                      {hotel.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm"
                        >
                          <Icon
                            name="Check"
                            size={14}
                            className="text-gold flex-shrink-0"
                          />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {hotel.gallery && hotel.gallery.length > 0 && (
                    <HotelGallery
                      images={hotel.gallery}
                      hotelName={hotel.name}
                    />
                  )}

                  <div className="flex items-center justify-between pt-4 border-t mt-4">
                    <div>
                      <p className="text-sm text-gray-500">от</p>
                      <p className="text-2xl font-semibold">
                        {hotel.price.toLocaleString()} ₽
                      </p>
                      <p className="text-xs text-gray-500">за ночь</p>
                    </div>
                    <Button
                      className="bg-gold hover:bg-gold/90 text-dark"
                      onClick={() => setBookingDialog({ open: true, hotel })}
                    >
                      Забронировать
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {bookingDialog.open && bookingDialog.hotel && (
        <BookingDialog
          open={bookingDialog.open}
          onOpenChange={(open) => setBookingDialog({ open, hotel: null })}
          hotelName={bookingDialog.hotel.name}
          pricePerNight={bookingDialog.hotel.price}
        />
      )}
    </section>
  );
};

export default HotelCatalog;