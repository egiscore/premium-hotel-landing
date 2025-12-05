import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const hotels = [
  {
    id: 1,
    name: 'Grand Palace Moscow',
    location: 'Тверская улица',
    price: '45 000',
    image: 'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/c8299e4a-9525-4f37-9541-1c8a816e7eb7.jpg',
    features: ['Личный дворецкий', 'Панорамный ресторан', 'SPA-комплекс']
  },
  {
    id: 2,
    name: 'Boutique Lux Arbat',
    location: 'Центр Москвы',
    price: '38 000',
    image: 'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/d743b16f-8265-4a09-a059-652f9c042f19.jpg',
    features: ['5 звёзд', 'Бутик-отель', 'VIP-зона']
  },
  {
    id: 3,
    name: 'Premium Towers',
    location: 'Москва-Сити',
    price: '52 000',
    image: 'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/c8299e4a-9525-4f37-9541-1c8a816e7eb7.jpg',
    features: ['Апартаменты люкс', 'Панорамный вид', 'Консьерж 24/7']
  },
  {
    id: 4,
    name: 'Imperial Suite Hotel',
    location: 'Патриаршие пруды',
    price: '62 000',
    image: 'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/cf76723f-e195-46b5-b0f1-18b27cbeccde.jpg',
    features: ['Исторический особняк', 'Винный погреб', 'Библиотека и камин']
  },
  {
    id: 5,
    name: 'Skyline Residence',
    location: 'Кутузовский проспект',
    price: '48 000',
    image: 'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/c8299e4a-9525-4f37-9541-1c8a816e7eb7.jpg',
    features: ['Панорамные окна', 'Фитнес-клуб', 'Крытый бассейн']
  },
  {
    id: 6,
    name: 'Royal Garden Hotel',
    location: 'Замоскворечье',
    price: '42 000',
    image: 'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/d743b16f-8265-4a09-a059-652f9c042f19.jpg',
    features: ['Парковая зона', 'Терраса на крыше', 'Michelin ресторан']
  },
  {
    id: 7,
    name: 'Metropolitan Elite',
    location: 'Остоженка',
    price: '55 000',
    image: 'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/cf76723f-e195-46b5-b0f1-18b27cbeccde.jpg',
    features: ['Дизайнерские интерьеры', 'Арт-галерея', 'Сигарная комната']
  },
  {
    id: 8,
    name: 'Crystal Palace',
    location: 'Рублёвское шоссе',
    price: '68 000',
    image: 'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/c8299e4a-9525-4f37-9541-1c8a816e7eb7.jpg',
    features: ['Загородный комплекс', 'Конюшня и верховая езда', 'Частный пляж']
  },
  {
    id: 9,
    name: 'Heritage Boutique',
    location: 'Чистые пруды',
    price: '41 000',
    image: 'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/d743b16f-8265-4a09-a059-652f9c042f19.jpg',
    features: ['Антикварная мебель', 'Камерная атмосфера', 'Домашний кинотеатр']
  },
  {
    id: 10,
    name: 'Platinum Prestige',
    location: 'Пресненская набережная',
    price: '72 000',
    image: 'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/c8299e4a-9525-4f37-9541-1c8a816e7eb7.jpg',
    features: ['Пентхаусы премиум', 'Вертолётная площадка', 'Личный шеф-повар']
  },
  {
    id: 11,
    name: 'Renaissance Mansion',
    location: 'Сретенский бульвар',
    price: '58 000',
    image: 'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/cf76723f-e195-46b5-b0f1-18b27cbeccde.jpg',
    features: ['Особняк XIX века', 'Мраморный холл', 'Коллекция живописи']
  },
  {
    id: 12,
    name: 'Velvet Suite',
    location: 'Маросейка',
    price: '46 000',
    image: 'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/d743b16f-8265-4a09-a059-652f9c042f19.jpg',
    features: ['Барокко интерьеры', 'Спа с хаммамом', 'Бутик-отель 12 номеров']
  },
  {
    id: 13,
    name: 'Diamond Heights',
    location: 'Воробьёвы горы',
    price: '65 000',
    image: 'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/c8299e4a-9525-4f37-9541-1c8a816e7eb7.jpg',
    features: ['Панорама на Москву-реку', 'Infinity бассейн', 'Michelin гастрономия']
  },
  {
    id: 14,
    name: 'Noble Residence',
    location: 'Поварская улица',
    price: '53 000',
    image: 'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/cf76723f-e195-46b5-b0f1-18b27cbeccde.jpg',
    features: ['Дворянская усадьба', 'Частный двор-сад', 'Камины в номерах']
  },
  {
    id: 15,
    name: 'Emerald Park Hotel',
    location: 'Серебряный Бор',
    price: '75 000',
    image: 'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/c8299e4a-9525-4f37-9541-1c8a816e7eb7.jpg',
    features: ['Лесопарковая зона', 'Частный причал', 'Эко-веллнес центр']
  },
  {
    id: 16,
    name: 'Marquis Collection',
    location: 'Большая Никитская',
    price: '61 000',
    image: 'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/d743b16f-8265-4a09-a059-652f9c042f19.jpg',
    features: ['Люксовая классика', 'Библиотека с редкими изданиями', 'Личный сомелье']
  },
  {
    id: 17,
    name: 'Aurora Sky Suites',
    location: 'Золотые ключи',
    price: '70 000',
    image: 'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/cf76723f-e195-46b5-b0f1-18b27cbeccde.jpg',
    features: ['Панорамные люксы', 'SPA с видом на Кремль', 'Бутлерский сервис']
  },
  {
    id: 18,
    name: 'Imperial Garden',
    location: 'Крымский вал',
    price: '49 000',
    image: 'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/c8299e4a-9525-4f37-9541-1c8a816e7eb7.jpg',
    features: ['Парк Горького рядом', 'Терраса с видом', 'Йога-студия на крыше']
  }
];

const HotelCatalog = () => {
  const [selectedLocation, setSelectedLocation] = useState('Все');
  const [priceRange, setPriceRange] = useState('Все');

  const locations = ['Все', 'Центр Москвы', 'Тверская улица', 'Москва-Сити', 'Патриаршие пруды', 'Кутузовский проспект', 'Замоскворечье', 'Остоженка', 'Рублёвское шоссе', 'Чистые пруды', 'Пресненская набережная', 'Сретенский бульвар', 'Маросейка', 'Воробьёвы горы', 'Поварская улица', 'Серебряный Бор', 'Большая Никитская', 'Золотые ключи', 'Крымский вал'];
  const priceRanges = [
    { label: 'Все', min: 0, max: Infinity },
    { label: 'До 45 000 ₽', min: 0, max: 45000 },
    { label: '45 000 - 55 000 ₽', min: 45000, max: 55000 },
    { label: '55 000 - 65 000 ₽', min: 55000, max: 65000 },
    { label: 'От 65 000 ₽', min: 65000, max: Infinity }
  ];

  const filteredHotels = hotels.filter(hotel => {
    const hotelPrice = parseInt(hotel.price.replace(/\s/g, ''));
    const selectedPriceRange = priceRanges.find(r => r.label === priceRange);
    
    const locationMatch = selectedLocation === 'Все' || hotel.location === selectedLocation;
    const priceMatch = !selectedPriceRange || (hotelPrice >= selectedPriceRange.min && hotelPrice <= selectedPriceRange.max);
    
    return locationMatch && priceMatch;
  });

  return (
    <section id="catalog" className="py-20 px-6 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-light mb-4">Каталог премиум-отелей</h2>
          <p className="text-gray-600 text-lg">Избранные отели Москвы для самых взыскательных гостей</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-12">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-3 text-gray-700">
                <Icon name="MapPin" size={16} className="inline mr-2" />
                Локация
              </label>
              <div className="grid grid-cols-2 gap-2">
                {locations.map(location => (
                  <button
                    key={location}
                    onClick={() => setSelectedLocation(location)}
                    className={`px-4 py-2 rounded-md text-sm transition-all ${
                      selectedLocation === location
                        ? 'bg-gold text-dark font-medium'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {location}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-3 text-gray-700">
                <Icon name="Wallet" size={16} className="inline mr-2" />
                Цена за ночь
              </label>
              <div className="space-y-2">
                {priceRanges.map(range => (
                  <button
                    key={range.label}
                    onClick={() => setPriceRange(range.label)}
                    className={`w-full px-4 py-2 rounded-md text-sm transition-all text-left ${
                      priceRange === range.label
                        ? 'bg-gold text-dark font-medium'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Найдено отелей: <span className="font-semibold text-dark">{filteredHotels.length}</span>
            </p>
            {(selectedLocation !== 'Все' || priceRange !== 'Все') && (
              <button
                onClick={() => {
                  setSelectedLocation('Все');
                  setPriceRange('Все');
                }}
                className="text-sm text-gold hover:text-dark transition-colors flex items-center gap-1"
              >
                <Icon name="X" size={14} />
                Сбросить фильтры
              </button>
            )}
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {filteredHotels.length === 0 ? (
            <div className="col-span-3 text-center py-12">
              <Icon name="SearchX" size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-xl text-gray-600">По выбранным фильтрам отели не найдены</p>
              <p className="text-sm text-gray-500 mt-2">Попробуйте изменить параметры поиска</p>
            </div>
          ) : (
            filteredHotels.map((hotel, index) => (
            <Card key={hotel.id} className="overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
              <div className="h-64 overflow-hidden">
                <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">{hotel.name}</CardTitle>
                <CardDescription className="flex items-center gap-2 text-base">
                  <Icon name="MapPin" size={16} />
                  {hotel.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  {hotel.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <Icon name="Check" size={16} className="text-gold" />
                      {feature}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <p className="text-sm text-gray-500">от</p>
                    <p className="text-2xl font-semibold">{hotel.price} ₽</p>
                    <p className="text-xs text-gray-500">за ночь</p>
                  </div>
                  <Button className="bg-gold hover:bg-gold/90 text-dark">
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