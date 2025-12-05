import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Hotel {
  id: number;
  name: string;
  location: string;
  price: number;
  image_url: string;
  features: string[];
  gallery: string[];
}

interface HotelForm {
  name: string;
  location: string;
  price: number;
  image_url: string;
  features: string;
  gallery: string;
}

interface HotelsTabProps {
  hotels: Hotel[];
  isEditing: boolean;
  editingId: number | null;
  hotelForm: HotelForm;
  setIsEditing: (value: boolean) => void;
  setEditingId: (value: number | null) => void;
  setHotelForm: (value: HotelForm) => void;
  handleSaveHotel: (e: React.FormEvent) => void;
}

const HotelsTab = ({
  hotels,
  isEditing,
  editingId,
  hotelForm,
  setIsEditing,
  setEditingId,
  setHotelForm,
  handleSaveHotel,
}: HotelsTabProps) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Управление отелями</h2>
        <Button onClick={() => {
          setIsEditing(!isEditing);
          setEditingId(null);
          setHotelForm({ name: '', location: '', price: 0, image_url: '', features: '', gallery: '' });
        }}>
          <Icon name={isEditing ? "X" : "Plus"} size={20} className="mr-2" />
          {isEditing ? 'Отмена' : 'Добавить отель'}
        </Button>
      </div>

      {isEditing && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{editingId ? 'Редактировать' : 'Новый'} отель</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveHotel} className="space-y-4">
              <Input
                required
                placeholder="Название отеля"
                value={hotelForm.name}
                onChange={(e) => setHotelForm({ ...hotelForm, name: e.target.value })}
              />
              <Input
                required
                placeholder="Локация"
                value={hotelForm.location}
                onChange={(e) => setHotelForm({ ...hotelForm, location: e.target.value })}
              />
              <Input
                required
                type="number"
                placeholder="Цена"
                value={hotelForm.price}
                onChange={(e) => setHotelForm({ ...hotelForm, price: Number(e.target.value) })}
              />
              <Input
                required
                placeholder="URL изображения"
                value={hotelForm.image_url}
                onChange={(e) => setHotelForm({ ...hotelForm, image_url: e.target.value })}
              />
              <Textarea
                required
                placeholder="Особенности (через запятую)"
                value={hotelForm.features}
                onChange={(e) => setHotelForm({ ...hotelForm, features: e.target.value })}
              />
              <Textarea
                placeholder="URL фотографий галереи (через запятую)"
                value={hotelForm.gallery}
                onChange={(e) => setHotelForm({ ...hotelForm, gallery: e.target.value })}
                rows={3}
              />
              <Button type="submit" className="w-full">
                {editingId ? 'Обновить' : 'Создать'}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {hotels.map((hotel) => (
          <Card key={hotel.id}>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <img src={hotel.image_url} alt={hotel.name} className="w-32 h-32 object-cover rounded" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{hotel.name}</h3>
                  <p className="text-sm text-muted-foreground">{hotel.location}</p>
                  <p className="text-lg font-bold mt-2">{hotel.price.toLocaleString()} ₽</p>
                  <div className="flex gap-2 mt-2">
                    {hotel.features.map((f, i) => (
                      <span key={i} className="text-xs bg-muted px-2 py-1 rounded">{f}</span>
                    ))}
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    setHotelForm({
                      name: hotel.name,
                      location: hotel.location,
                      price: hotel.price,
                      image_url: hotel.image_url,
                      features: hotel.features.join(', '),
                      gallery: (hotel.gallery || []).join(', ')
                    });
                    setEditingId(hotel.id);
                    setIsEditing(true);
                  }}
                >
                  <Icon name="Pencil" size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HotelsTab;