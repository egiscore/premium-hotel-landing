import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

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
}

interface AdminPanelProps {
  hotels: Hotel[];
  onDelete: (id: number) => void;
  onUpdate: (hotel: Hotel) => void;
  onCreate: (hotel: Omit<Hotel, 'id'>) => void;
  onClose: () => void;
}

const AdminPanel = ({ hotels, onDelete, onUpdate, onCreate, onClose }: AdminPanelProps) => {
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  const [editingHotel, setEditingHotel] = useState<Hotel | null>(null);
  const [creatingHotel, setCreatingHotel] = useState(false);
  const [formData, setFormData] = useState<Partial<Hotel>>({});

  const handleDelete = (id: number) => {
    onDelete(id);
    setConfirmDelete(null);
  };

  const handleEdit = (hotel: Hotel) => {
    setEditingHotel(hotel);
    setFormData(hotel);
  };

  const handleCreate = () => {
    setCreatingHotel(true);
    setFormData({
      name: '',
      location: '',
      address: '',
      price: 0,
      description: '',
      image_url: '',
      features: [],
      amenities: [],
      rating: 5.0,
      stars: 5,
      check_in_time: '14:00',
      check_out_time: '12:00',
      display_order: 0
    });
  };

  const handleSave = () => {
    if (editingHotel) {
      onUpdate({ ...editingHotel, ...formData } as Hotel);
      setEditingHotel(null);
    } else if (creatingHotel) {
      onCreate(formData as Omit<Hotel, 'id'>);
      setCreatingHotel(false);
    }
    setFormData({});
  };

  const handleCancel = () => {
    setEditingHotel(null);
    setCreatingHotel(false);
    setFormData({});
  };

  const updateField = (field: keyof Hotel, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateArrayField = (field: 'features' | 'amenities', value: string) => {
    const items = value.split(',').map(item => item.trim()).filter(Boolean);
    updateField(field, items);
  };

  if (editingHotel || creatingHotel) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between border-b">
            <CardTitle>{editingHotel ? 'Редактировать отель' : 'Создать отель'}</CardTitle>
            <Button variant="ghost" size="icon" onClick={handleCancel}>
              <Icon name="X" size={20} />
            </Button>
          </CardHeader>
          <CardContent className="p-6 overflow-y-auto">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Название отеля *</Label>
                <Input
                  id="name"
                  value={formData.name || ''}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="The Ritz-Carlton Moscow"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Район *</Label>
                  <Input
                    id="location"
                    value={formData.location || ''}
                    onChange={(e) => updateField('location', e.target.value)}
                    placeholder="Тверская"
                  />
                </div>
                <div>
                  <Label htmlFor="price">Цена за ночь (₽) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price || 0}
                    onChange={(e) => updateField('price', parseInt(e.target.value))}
                    placeholder="45000"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Адрес</Label>
                <Input
                  id="address"
                  value={formData.address || ''}
                  onChange={(e) => updateField('address', e.target.value)}
                  placeholder="ул. Тверская, д. 3"
                />
              </div>

              <div>
                <Label htmlFor="description">Описание</Label>
                <Textarea
                  id="description"
                  value={formData.description || ''}
                  onChange={(e) => updateField('description', e.target.value)}
                  placeholder="Краткое описание отеля..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="image_url">URL изображения *</Label>
                <Input
                  id="image_url"
                  value={formData.image_url || ''}
                  onChange={(e) => updateField('image_url', e.target.value)}
                  placeholder="https://..."
                />
              </div>

              <div>
                <Label htmlFor="features">Особенности (через запятую)</Label>
                <Input
                  id="features"
                  value={formData.features?.join(', ') || ''}
                  onChange={(e) => updateArrayField('features', e.target.value)}
                  placeholder="Вид на Кремль, Ресторан, Спа-центр"
                />
              </div>

              <div>
                <Label htmlFor="amenities">Удобства (через запятую)</Label>
                <Input
                  id="amenities"
                  value={formData.amenities?.join(', ') || ''}
                  onChange={(e) => updateArrayField('amenities', e.target.value)}
                  placeholder="Бассейн, Фитнес-центр, Консьерж"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="rating">Рейтинг</Label>
                  <Input
                    id="rating"
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={formData.rating || 5.0}
                    onChange={(e) => updateField('rating', parseFloat(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="stars">Звезд</Label>
                  <Input
                    id="stars"
                    type="number"
                    min="1"
                    max="5"
                    value={formData.stars || 5}
                    onChange={(e) => updateField('stars', parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="rooms_count">Номеров</Label>
                  <Input
                    id="rooms_count"
                    type="number"
                    value={formData.rooms_count || ''}
                    onChange={(e) => updateField('rooms_count', parseInt(e.target.value))}
                    placeholder="200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Телефон</Label>
                  <Input
                    id="phone"
                    value={formData.phone || ''}
                    onChange={(e) => updateField('phone', e.target.value)}
                    placeholder="+7 (495) 123-45-67"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="info@hotel.com"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="website">Сайт</Label>
                <Input
                  id="website"
                  value={formData.website || ''}
                  onChange={(e) => updateField('website', e.target.value)}
                  placeholder="https://hotel.com"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="check_in_time">Заезд</Label>
                  <Input
                    id="check_in_time"
                    value={formData.check_in_time || '14:00'}
                    onChange={(e) => updateField('check_in_time', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="check_out_time">Выезд</Label>
                  <Input
                    id="check_out_time"
                    value={formData.check_out_time || '12:00'}
                    onChange={(e) => updateField('check_out_time', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="display_order">Порядок</Label>
                  <Input
                    id="display_order"
                    type="number"
                    value={formData.display_order || 0}
                    onChange={(e) => updateField('display_order', parseInt(e.target.value))}
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <Button onClick={handleSave} className="bg-gold hover:bg-gold/90 text-dark">
                  <Icon name="Save" size={16} className="mr-2" />
                  Сохранить
                </Button>
                <Button variant="outline" onClick={handleCancel}>
                  Отмена
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between border-b">
          <CardTitle>Управление отелями ({hotels.length})</CardTitle>
          <div className="flex gap-2">
            <Button
              onClick={handleCreate}
              size="sm"
              className="bg-gold hover:bg-gold/90 text-dark"
            >
              <Icon name="Plus" size={16} className="mr-2" />
              Добавить отель
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6 overflow-y-auto">
          <div className="space-y-4">
            {hotels.map((hotel) => (
              <div
                key={hotel.id}
                className="flex items-center gap-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <img
                  src={hotel.image_url}
                  alt={hotel.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{hotel.name}</h3>
                  <p className="text-sm text-muted-foreground">{hotel.location}</p>
                  <p className="text-sm font-medium mt-1">{hotel.price.toLocaleString()} ₽/ночь</p>
                  {hotel.rating && (
                    <div className="flex items-center gap-1 mt-1">
                      <Icon name="Star" size={14} className="text-gold fill-gold" />
                      <span className="text-sm">{hotel.rating}</span>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(hotel)}
                  >
                    <Icon name="Edit" size={16} className="mr-2" />
                    Изменить
                  </Button>
                  {confirmDelete === hotel.id ? (
                    <>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(hotel.id)}
                      >
                        Подтвердить
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setConfirmDelete(null)}
                      >
                        Отмена
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setConfirmDelete(hotel.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Icon name="Trash2" size={16} className="mr-2" />
                      Удалить
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPanel;
