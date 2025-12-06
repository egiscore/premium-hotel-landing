import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import HotelGallery from '@/components/HotelGallery';

const API_URL = 'https://functions.poehali.dev/82ea708f-5e97-4f6c-87b6-720c95d9d5db';

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

const HotelCatalog = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState('Все');
  const [selectedPriceRange, setSelectedPriceRange] = useState<{ min: number; max: number } | null>(null);

  const locations = ['Все', ...Array.from(new Set(hotels.map(h => h.location)))];
  
  const priceRanges = [
    { label: 'Все цены', min: 0, max: Infinity },
    { label: 'До 30 000 ₽', min: 0, max: 30000 },
    { label: '30 000 - 50 000 ₽', min: 30000, max: 50000 },
    { label: 'От 50 000 ₽', min: 50000, max: Infinity }
  ];

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch hotels');
      const data = await response.json();
      setHotels(data);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredHotels = hotels.filter(hotel => {
    const locationMatch = selectedLocation === 'Все' || hotel.location === selectedLocation;
    const priceMatch = !selectedPriceRange || (hotel.price >= selectedPriceRange.min && hotel.price <= selectedPriceRange.max);
    return locationMatch && priceMatch;
  });

  if (loading) {
    return (
      <section id="catalog" className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-lg text-gray-600">Загрузка каталога...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="catalog" className="py-20 px-6 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-light mb-4">Каталог премиум-отелей</h2>
          <p className="text-gray-600 text-lg">Избранные отели Москвы для самых взыскательных гостей</p>
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
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center gap-3">
              <Icon name="DollarSign" size={18} className="text-gold" />
              <select 
                onChange={(e) => {
                  const range = priceRanges[parseInt(e.target.value)];
                  setSelectedPriceRange(range.min === 0 && range.max === Infinity ? null : range);
                }}
                className="px-4 py-2 rounded-md border border-gray-200 focus:border-gold focus:outline-none text-sm min-w-[200px]"
              >
                {priceRanges.map((range, index) => (
                  <option key={index} value={index}>{range.label}</option>
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
            <Card key={hotel.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 border-none">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={hotel.image_url}
                  alt={hotel.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <CardContent className="p-6">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-2xl font-light mb-2">{hotel.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Icon name="MapPin" size={16} />
                    {hotel.location}
                  </CardDescription>
                </CardHeader>
                
                {hotel.description && (
                  <p className="text-sm text-gray-600 mb-4">{hotel.description}</p>
                )}
                
                {hotel.features && hotel.features.length > 0 && (
                  <div className="space-y-2 mb-4">
                    {hotel.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <Icon name="Check" size={14} className="text-gold flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                {hotel.gallery && hotel.gallery.length > 0 && (
                  <HotelGallery images={hotel.gallery} hotelName={hotel.name} />
                )}
                
                <div className="flex items-center justify-between pt-4 border-t mt-4">
                  <div>
                    <p className="text-sm text-gray-500">от</p>
                    <p className="text-2xl font-semibold">{hotel.price.toLocaleString()} ₽</p>
                    <p className="text-xs text-gray-500">за ночь</p>
                  </div>
                  <Button 
                    className="bg-gold hover:bg-gold/90 text-dark"
                    onClick={() => {
                      const contactSection = document.getElementById('contact');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        setTimeout(() => {
                          const messageInput = document.querySelector('textarea[placeholder*="сообщение"]') as HTMLTextAreaElement;
                          if (messageInput) {
                            messageInput.value = `Здравствуйте! Хочу забронировать отель "${hotel.name}".`;
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