import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

interface Page {
  id: number;
  slug: string;
  h1: string;
  title: string;
  description: string;
  content?: string;
  is_published: boolean;
}

const Admin = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    slug: '',
    h1: '',
    title: '',
    description: '',
    content: ''
  });
  const { toast } = useToast();

  const fetchPages = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/d7ec4198-c892-4d40-90a7-6b891932711b');
      const data = await response.json();
      setPages(data);
    } catch (error) {
      toast({
        title: 'Ошибка загрузки',
        description: 'Не удалось загрузить страницы',
        variant: 'destructive'
      });
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingId 
        ? `https://functions.poehali.dev/d7ec4198-c892-4d40-90a7-6b891932711b/${editingId}`
        : 'https://functions.poehali.dev/d7ec4198-c892-4d40-90a7-6b891932711b';
      
      const response = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast({
          title: 'Успешно',
          description: editingId ? 'Страница обновлена' : 'Страница создана'
        });
        setFormData({ slug: '', h1: '', title: '', description: '', content: '' });
        setIsAdding(false);
        setEditingId(null);
        fetchPages();
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось сохранить страницу',
        variant: 'destructive'
      });
    }
  };

  const handleEdit = (page: Page) => {
    setFormData({
      slug: page.slug,
      h1: page.h1,
      title: page.title,
      description: page.description,
      content: page.content || ''
    });
    setEditingId(page.id);
    setIsAdding(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Удалить эту страницу?')) return;
    
    try {
      await fetch(`https://functions.poehali.dev/d7ec4198-c892-4d40-90a7-6b891932711b/${id}`, {
        method: 'DELETE'
      });
      toast({ title: 'Удалено', description: 'Страница удалена' });
      fetchPages();
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось удалить страницу',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Управление страницами</h1>
          <Button onClick={() => {
            setIsAdding(!isAdding);
            setEditingId(null);
            setFormData({ slug: '', h1: '', title: '', description: '', content: '' });
          }}>
            <Icon name={isAdding ? "X" : "Plus"} size={20} className="mr-2" />
            {isAdding ? 'Отмена' : 'Добавить страницу'}
          </Button>
        </div>

        {isAdding && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingId ? 'Редактировать' : 'Новая'} страница</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">URL (slug)</label>
                  <Input
                    required
                    placeholder="about-us"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Заголовок H1</label>
                  <Input
                    required
                    placeholder="О нашей компании"
                    value={formData.h1}
                    onChange={(e) => setFormData({ ...formData, h1: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Title (SEO)</label>
                  <Input
                    required
                    placeholder="О нас - Премиум отели Москвы"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description (SEO)</label>
                  <Textarea
                    required
                    placeholder="Описание страницы для поисковых систем"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Контент (необязательно)</label>
                  <Textarea
                    placeholder="Дополнительный контент страницы"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={5}
                  />
                </div>

                <Button type="submit" className="w-full">
                  {editingId ? 'Обновить' : 'Создать'} страницу
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4">
          {pages.map((page) => (
            <Card key={page.id}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-semibold">{page.h1}</h3>
                      <span className="text-sm text-muted-foreground">/{page.slug}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">
                      <strong>Title:</strong> {page.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Description:</strong> {page.description}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(page)}>
                      <Icon name="Pencil" size={16} />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(page.id)}>
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;