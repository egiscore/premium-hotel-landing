import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Content {
  id: number;
  key: string;
  value: string;
  description?: string;
  page?: string;
}

interface ContentForm {
  key: string;
  value: string;
  description: string;
  page: string;
}

interface ContentTabProps {
  content: Content[];
  isEditing: boolean;
  editingId: number | null;
  contentForm: ContentForm;
  setIsEditing: (value: boolean) => void;
  setEditingId: (value: number | null) => void;
  setContentForm: (value: ContentForm) => void;
  handleSaveContent: (e: React.FormEvent) => void;
}

const ContentTab = ({
  content,
  isEditing,
  editingId,
  contentForm,
  setIsEditing,
  setEditingId,
  setContentForm,
  handleSaveContent,
}: ContentTabProps) => {
  return (
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
  );
};

export default ContentTab;
