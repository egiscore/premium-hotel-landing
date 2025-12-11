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
    name: "Grand Palace Moscow",
    location: "Центр Москвы",
    address: "Тверская ул., 15",
    price: 45000,
    description: "Легендарный отель с историей более 100 лет. Роскошные интерьеры, мраморные колонны и сервис мирового класса.",
    image_url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
    features: ["Панорамный ресторан", "SPA-центр", "Личный дворецкий", "Трансфер"],
    rating: 5,
    stars: 5,
    gallery: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80",
      "https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?w=1200&q=80"
    ]
  },
  {
    id: 2,
    name: "Boutique Lux Arbat",
    location: "Арбат",
    address: "Старый Арбат, 27",
    price: 38000,
    description: "Бутик-отель в самом сердце культурного центра Москвы. Каждый номер — произведение искусства.",
    image_url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
    features: ["Дизайнерские номера", "Арт-галерея", "Завтрак от шеф-повара", "Винный бар"],
    rating: 5,
    stars: 5,
    gallery: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80",
      "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=1200&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&q=80",
      "https://images.unsplash.com/photo-1631049035182-249067d7618e?w=1200&q=80",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=1200&q=80"
    ]
  },
  {
    id: 3,
    name: "Premium Towers",
    location: "Москва-Сити",
    address: "Пресненская наб., 12",
    price: 52000,
    description: "Небоскрёб роскоши с видом на Москву-реку. Идеально для деловых встреч на высшем уровне.",
    image_url: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800",
    features: ["Панорамный бассейн", "Переговорные залы", "Хелипад", "Консьерж 24/7"],
    rating: 5,
    stars: 5,
    gallery: [
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&q=80",
      "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=1200&q=80",
      "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=1200&q=80"
    ]
  },
  {
    id: 4,
    name: "Crystal Garden Hotel",
    location: "Патриаршие пруды",
    address: "Малая Бронная, 18",
    price: 41000,
    description: "Элегантный отель у легендарных прудов. Тишина и комфорт в центре мегаполиса.",
    image_url: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
    features: ["Зимний сад", "Библиотека", "Йога-студия", "Органический ресторан"],
    rating: 5,
    stars: 5,
    gallery: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=80",
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=1200&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1559599238-1c99d946d8d5?w=1200&q=80",
      "https://images.unsplash.com/photo-1587985064135-0366536eab42?w=1200&q=80"
    ]
  },
  {
    id: 5,
    name: "Imperial Suite Residence",
    location: "Кутузовский проспект",
    address: "Кутузовский пр-т, 45",
    price: 48000,
    description: "Резиденция для тех, кто ценит пространство и приватность. Апартаменты премиум-класса.",
    image_url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
    features: ["Апартаменты до 200 м²", "Кухня от Miele", "Личный повар", "Домашний кинотеатр"],
    rating: 5,
    stars: 5,
    gallery: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80",
      "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=1200&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=80",
      "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=1200&q=80",
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&q=80"
    ]
  },
  {
    id: 6,
    name: "Royal Heritage Moscow",
    location: "Красная площадь",
    address: "Никольская ул., 5",
    price: 55000,
    description: "Историческое здание XIX века с видом на Кремль. Царская роскошь и современный комфорт.",
    image_url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
    features: ["Вид на Кремль", "Антикварная мебель", "Музыкальный салон", "Русская баня"],
    rating: 5,
    stars: 5,
    gallery: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80",
      "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=1200&q=80",
      "https://images.unsplash.com/photo-1609766975528-20be4f0e0e8c?w=1200&q=80",
      "https://images.unsplash.com/photo-1631049552240-59c37f38802b?w=1200&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=80",
      "https://images.unsplash.com/photo-1549294413-26f195200c16?w=1200&q=80"
    ]
  }
];

const HotelCatalog = () => {
  const [selectedLocation, setSelectedLocation] = useState("Все");
  const [selectedPriceRange, setSelectedPriceRange] = useState<{
    min: number;
    max: number;
  } | null>(null);

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
                      onClick={() => {
                        const contactSection =
                          document.getElementById("contact");
                        if (contactSection) {
                          contactSection.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                          setTimeout(() => {
                            const messageInput = document.querySelector(
                              'textarea[placeholder*="сообщение"]',
                            ) as HTMLTextAreaElement;
                            if (messageInput) {
                              messageInput.value = `Здравствуйте! Хочу забронировать ${hotel.name}`;
                              messageInput.focus();
                            }
                          }, 500);
                        }
                      }}
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
    </section>
  );
};

export default HotelCatalog;