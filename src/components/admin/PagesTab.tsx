import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface Page {
  id: number;
  slug: string;
  h1: string;
  title: string;
  description: string;
  content?: string;
}

interface PageForm {
  slug: string;
  h1: string;
  title: string;
  description: string;
  content: string;
}

interface PagesTabProps {
  pages: Page[];
  isEditing: boolean;
  editingId: number | null;
  pageForm: PageForm;
  setIsEditing: (value: boolean) => void;
  setEditingId: (value: number | null) => void;
  setPageForm: (value: PageForm) => void;
  handleSavePage: (e: React.FormEvent) => void;
}

const PagesTab = ({
  pages,
  isEditing,
  editingId,
  pageForm,
  setIsEditing,
  setEditingId,
  setPageForm,
  handleSavePage,
}: PagesTabProps) => {
  return (
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
  );
};

export default PagesTab;
