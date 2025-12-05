import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

type TabType = 'hotels' | 'pages' | 'content';

interface Hotel {
  id: number;
  name: string;
  location: string;
  price: number;
  image_url: string;
  features: string[];
}

interface Page {
  id: number;
  slug: string;
  h1: string;
  title: string;
  description: string;
  content?: string;
}

interface Content {
  id: number;
  key: string;
  value: string;
  description?: string;
  page?: string;
}

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState<TabType>('hotels');
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [pages, setPages] = useState<Page[]>([]);
  const [content, setContent] = useState<Content[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const [hotelForm, setHotelForm] = useState({
    name: '',
    location: '',
    price: 0,
    image_url: '',
    features: ''
  });

  const [pageForm, setPageForm] = useState({
    slug: '',
    h1: '',
    title: '',
    description: '',
    content: ''
  });

  const [contentForm, setContentForm] = useState({
    key: '',
    value: '',
    description: '',
    page: ''
  });

  const getAuthToken = () => localStorage.getItem('auth_token');

  const checkAuth = async () => {
    const token = getAuthToken();
    if (!token) {
      navigate('/login');
      return false;
    }

    try {
      const response = await fetch('https://functions.poehali.dev/dbebc829-69b9-4540-b823-4ccb6056efd7', {
        headers: { 'X-Auth-Token': token }
      });
      
      if (!response.ok) {
        navigate('/login');
        return false;
      }
      return true;
    } catch {
      navigate('/login');
      return false;
    }
  };

  useEffect(() => {
    checkAuth().then(isAuth => {
      if (isAuth) {
        fetchHotels();
        fetchPages();
        fetchContent();
      }
    });
  }, []);

  const fetchHotels = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/82ea708f-5e97-4f6c-87b6-720c95d9d5db');
      const data = await response.json();
      setHotels(data);
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось загрузить отели', variant: 'destructive' });
    }
  };

  const fetchPages = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/d7ec4198-c892-4d40-90a7-6b891932711b');
      const data = await response.json();
      setPages(data);
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось загрузить страницы', variant: 'destructive' });
    }
  };

  const fetchContent = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/9060a72f-0e7c-4252-ba69-f0e562211c8e');
      const data = await response.json();
      setContent(data);
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось загрузить контент', variant: 'destructive' });
    }
  };

  const handleSaveHotel = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = getAuthToken();
    
    try {
      const url = editingId 
        ? `https://functions.poehali.dev/82ea708f-5e97-4f6c-87b6-720c95d9d5db/${editingId}`
        : 'https://functions.poehali.dev/82ea708f-5e97-4f6c-87b6-720c95d9d5db';

      const response = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-Auth-Token': token || ''
        },
        body: JSON.stringify({
          ...hotelForm,
          features: hotelForm.features.split(',').map(f => f.trim())
        })
      });

      if (response.ok) {
        toast({ title: 'Успешно', description: editingId ? 'Отель обновлен' : 'Отель создан' });
        setHotelForm({ name: '', location: '', price: 0, image_url: '', features: '' });
        setIsEditing(false);
        setEditingId(null);
        fetchHotels();
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось сохранить отель', variant: 'destructive' });
    }
  };

  const handleSavePage = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = getAuthToken();
    
    try {
      const url = editingId 
        ? `https://functions.poehali.dev/d7ec4198-c892-4d40-90a7-6b891932711b/${editingId}`
        : 'https://functions.poehali.dev/d7ec4198-c892-4d40-90a7-6b891932711b';

      const response = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-Auth-Token': token || ''
        },
        body: JSON.stringify(pageForm)
      });

      if (response.ok) {
        toast({ title: 'Успешно', description: editingId ? 'Страница обновлена' : 'Страница создана' });
        setPageForm({ slug: '', h1: '', title: '', description: '', content: '' });
        setIsEditing(false);
        setEditingId(null);
        fetchPages();
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось сохранить страницу', variant: 'destructive' });
    }
  };

  const handleSaveContent = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = getAuthToken();
    
    try {
      const url = editingId 
        ? `https://functions.poehali.dev/9060a72f-0e7c-4252-ba69-f0e562211c8e/${editingId}`
        : 'https://functions.poehali.dev/9060a72f-0e7c-4252-ba69-f0e562211c8e';

      const response = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-Auth-Token': token || ''
        },
        body: JSON.stringify(contentForm)
      });

      if (response.ok) {
        toast({ title: 'Успешно', description: editingId ? 'Контент обновлен' : 'Контент создан' });
        setContentForm({ key: '', value: '', description: '', page: '' });
        setIsEditing(false);
        setEditingId(null);
        fetchContent();
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось сохранить контент', variant: 'destructive' });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Админ-панель</h1>
          <Button variant="outline" onClick={handleLogout}>
            <Icon name="LogOut" size={20} className="mr-2" />
            Выйти
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-2 mb-6">
          <Button 
            variant={activeTab === 'hotels' ? 'default' : 'outline'}
            onClick={() => { setActiveTab('hotels'); setIsEditing(false); }}
          >
            <Icon name="Hotel" size={20} className="mr-2" />
            Отели
          </Button>
          <Button 
            variant={activeTab === 'pages' ? 'default' : 'outline'}
            onClick={() => { setActiveTab('pages'); setIsEditing(false); }}
          >
            <Icon name="FileText" size={20} className="mr-2" />
            Страницы
          </Button>
          <Button 
            variant={activeTab === 'content' ? 'default' : 'outline'}
            onClick={() => { setActiveTab('content'); setIsEditing(false); }}
          >
            <Icon name="Type" size={20} className="mr-2" />
            Тексты
          </Button>
        </div>

        {activeTab === 'hotels' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Управление отелями</h2>
              <Button onClick={() => {
                setIsEditing(!isEditing);
                setEditingId(null);
                setHotelForm({ name: '', location: '', price: 0, image_url: '', features: '' });
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
                            features: hotel.features.join(', ')
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
        )}

        {activeTab === 'pages' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Управление страницами</h2>
              <Button onClick={() => {
                setIsEditing(!isEditing);
                setEditingId(null);
                setPageForm({ slug: '', h1: '', title: '', description: '', content: '' });
              }}>
                <Icon name={isEditing ? "X" : "Plus"} size={20} className="mr-2" />
                {isEditing ? 'Отмена' : 'Добавить страницу'}
              </Button>
            </div>

            {isEditing && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>{editingId ? 'Редактировать' : 'Новая'} страница</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSavePage} className="space-y-4">
                    <Input
                      required
                      placeholder="URL (slug)"
                      value={pageForm.slug}
                      onChange={(e) => setPageForm({ ...pageForm, slug: e.target.value })}
                    />
                    <Input
                      required
                      placeholder="Заголовок H1"
                      value={pageForm.h1}
                      onChange={(e) => setPageForm({ ...pageForm, h1: e.target.value })}
                    />
                    <Input
                      required
                      placeholder="Title (SEO)"
                      value={pageForm.title}
                      onChange={(e) => setPageForm({ ...pageForm, title: e.target.value })}
                    />
                    <Textarea
                      required
                      placeholder="Description (SEO)"
                      value={pageForm.description}
                      onChange={(e) => setPageForm({ ...pageForm, description: e.target.value })}
                    />
                    <div>
                      <label className="block text-sm font-medium mb-2">Контент</label>
                      <ReactQuill
                        theme="snow"
                        value={pageForm.content}
                        onChange={(value) => setPageForm({ ...pageForm, content: value })}
                        className="bg-background"
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      {editingId ? 'Обновить' : 'Создать'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            <div className="grid gap-4">
              {pages.map((page) => (
                <Card key={page.id}>
                  <CardContent className="pt-6 flex justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{page.h1}</h3>
                      <p className="text-sm text-muted-foreground">/{page.slug}</p>
                      <p className="text-sm mt-1"><strong>Title:</strong> {page.title}</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => {
                        setPageForm({
                          slug: page.slug,
                          h1: page.h1,
                          title: page.title,
                          description: page.description,
                          content: page.content || ''
                        });
                        setEditingId(page.id);
                        setIsEditing(true);
                      }}
                    >
                      <Icon name="Pencil" size={16} />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Управление текстами</h2>
              <Button onClick={() => {
                setIsEditing(!isEditing);
                setEditingId(null);
                setContentForm({ key: '', value: '', description: '', page: '' });
              }}>
                <Icon name={isEditing ? "X" : "Plus"} size={20} className="mr-2" />
                {isEditing ? 'Отмена' : 'Добавить текст'}
              </Button>
            </div>

            {isEditing && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>{editingId ? 'Редактировать' : 'Новый'} текст</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSaveContent} className="space-y-4">
                    <Input
                      required
                      placeholder="Ключ (например, hero_title)"
                      value={contentForm.key}
                      onChange={(e) => setContentForm({ ...contentForm, key: e.target.value })}
                    />
                    <Textarea
                      required
                      placeholder="Значение"
                      value={contentForm.value}
                      onChange={(e) => setContentForm({ ...contentForm, value: e.target.value })}
                    />
                    <Input
                      placeholder="Описание"
                      value={contentForm.description}
                      onChange={(e) => setContentForm({ ...contentForm, description: e.target.value })}
                    />
                    <Input
                      placeholder="Страница (home, footer и т.д.)"
                      value={contentForm.page}
                      onChange={(e) => setContentForm({ ...contentForm, page: e.target.value })}
                    />
                    <Button type="submit" className="w-full">
                      {editingId ? 'Обновить' : 'Создать'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            <div className="grid gap-4">
              {content.map((item) => (
                <Card key={item.id}>
                  <CardContent className="pt-6 flex justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{item.key}</h3>
                        <span className="text-xs bg-muted px-2 py-1 rounded">{item.page}</span>
                      </div>
                      <p className="text-sm">{item.value}</p>
                      {item.description && (
                        <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                      )}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => {
                        setContentForm({
                          key: item.key,
                          value: item.value,
                          description: item.description || '',
                          page: item.page || ''
                        });
                        setEditingId(item.id);
                        setIsEditing(true);
                      }}
                    >
                      <Icon name="Pencil" size={16} />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
