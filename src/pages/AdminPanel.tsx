import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import HotelsTab from '@/components/admin/HotelsTab';
import PagesTab from '@/components/admin/PagesTab';
import ContentTab from '@/components/admin/ContentTab';

type TabType = 'hotels' | 'pages' | 'content';

interface Hotel {
  id: number;
  name: string;
  location: string;
  price: number;
  image_url: string;
  features: string[];
  gallery: string[];
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
    features: '',
    gallery: ''
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
          features: hotelForm.features.split(',').map(f => f.trim()),
          gallery: hotelForm.gallery ? hotelForm.gallery.split(',').map(g => g.trim()) : []
        })
      });

      if (response.ok) {
        toast({ title: 'Успешно', description: editingId ? 'Отель обновлен' : 'Отель создан' });
        setHotelForm({ name: '', location: '', price: 0, image_url: '', features: '', gallery: '' });
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
          <HotelsTab
            hotels={hotels}
            isEditing={isEditing}
            editingId={editingId}
            hotelForm={hotelForm}
            setIsEditing={setIsEditing}
            setEditingId={setEditingId}
            setHotelForm={setHotelForm}
            handleSaveHotel={handleSaveHotel}
          />
        )}

        {activeTab === 'pages' && (
          <PagesTab
            pages={pages}
            isEditing={isEditing}
            editingId={editingId}
            pageForm={pageForm}
            setIsEditing={setIsEditing}
            setEditingId={setEditingId}
            setPageForm={setPageForm}
            handleSavePage={handleSavePage}
          />
        )}

        {activeTab === 'content' && (
          <ContentTab
            content={content}
            isEditing={isEditing}
            editingId={editingId}
            contentForm={contentForm}
            setIsEditing={setIsEditing}
            setEditingId={setEditingId}
            setContentForm={setContentForm}
            handleSaveContent={handleSaveContent}
          />
        )}
      </div>
    </div>
  );
};

export default AdminPanel;