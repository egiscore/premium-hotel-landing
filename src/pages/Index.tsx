import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
  }
];

const packages = [
  {
    title: 'Романтический уик-энд',
    price: '95 000',
    features: ['2 ночи в люкс-номере', 'Ужин в панорамном ресторане', 'SPA для двоих', 'Шампанское и фрукты']
  },
  {
    title: 'Деловая поездка',
    price: '120 000',
    features: ['3 ночи', 'Переговорная комната', 'Трансфер бизнес-класса', 'Личный ассистент']
  },
  {
    title: 'Wellness-retreat',
    price: '180 000',
    features: ['5 ночей', 'Ежедневные SPA-процедуры', 'Персональный тренер', 'Детокс-меню от шеф-повара']
  }
];

const reviews = [
  {
    name: 'Екатерина Волкова',
    rating: 5,
    text: 'Безупречный сервис! Личный дворецкий предугадывал все наши желания. SPA-комплекс мирового уровня.',
    hotel: 'Grand Palace Moscow'
  },
  {
    name: 'Александр Соколов',
    rating: 5,
    text: 'Останавливался на деловой встрече. Идеальное расположение, высочайший уровень комфорта и конфиденциальности.',
    hotel: 'Boutique Lux Arbat'
  },
  {
    name: 'Мария Белова',
    rating: 5,
    text: 'Отмечали годовщину. Романтический пакет превзошёл все ожидания — ужин с видом на Москву незабываем!',
    hotel: 'Premium Towers'
  }
];

const Index = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Спасибо! Наш консьерж свяжется с вами в ближайшее время.');
    setFormData({ name: '', phone: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-dark">PREMIUM HOTELS</h1>
            <div className="hidden md:flex gap-8 items-center">
              <a href="#catalog" className="text-sm hover:text-gold transition-colors">Каталог</a>
              <a href="#spa" className="text-sm hover:text-gold transition-colors">SPA</a>
              <a href="#packages" className="text-sm hover:text-gold transition-colors">Предложения</a>
              <a href="#reviews" className="text-sm hover:text-gold transition-colors">Отзывы</a>
              <a href="#contact" className="text-sm hover:text-gold transition-colors">Контакты</a>
              <Button className="bg-gold hover:bg-gold/90 text-dark">
                +7 (495) 123-45-67
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white -z-10"></div>
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-6xl md:text-7xl font-light mb-6 leading-tight">
                Роскошь<br />в сердце<br />Москвы
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Премиум-отели с безупречным сервисом, личным дворецким и SPA-комплексами мирового класса
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="bg-dark hover:bg-dark/90 text-white px-8">
                  Забронировать
                </Button>
                <Button size="lg" variant="outline" className="border-dark text-dark hover:bg-dark hover:text-white">
                  Каталог отелей
                </Button>
              </div>
            </div>
            <div className="animate-scale-in">
              <img 
                src="https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/c8299e4a-9525-4f37-9541-1c8a816e7eb7.jpg"
                alt="Luxury Hotel Lobby"
                className="rounded-lg shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-light mb-4">Каталог премиум-отелей</h2>
            <p className="text-gray-600 text-lg">Избранные отели Москвы для самых взыскательных гостей</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {hotels.map((hotel, index) => (
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
            ))}
          </div>
        </div>
      </section>

      <section id="spa" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/cf76723f-e195-46b5-b0f1-18b27cbeccde.jpg"
                alt="Luxury SPA"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div>
              <h2 className="text-5xl font-light mb-6">SPA & Wellness</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Полный спектр услуг спа и велнеса с лучшими мастерами. Индивидуальный подход к каждому гостю и использование премиальной косметики.
              </p>
              <div className="space-y-4">
                {[
                  'Массаж и spa-процедуры мирового класса',
                  'Хаммам и финская сауна',
                  'Косметология и anti-age программы',
                  'Йога и медитации с инструктором',
                  'Детокс-программы и здоровое питание'
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Icon name="Sparkles" size={20} className="text-gold mt-1" />
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
              <Button size="lg" className="mt-8 bg-dark hover:bg-dark/90 text-white">
                Узнать подробнее
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="packages" className="py-20 px-6 bg-dark text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-light mb-4">Эксклюзивные пакеты</h2>
            <p className="text-gray-300 text-lg">Готовые предложения для незабываемого отдыха</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">{pkg.title}</CardTitle>
                  <CardDescription className="text-3xl font-bold text-gold mt-4">
                    {pkg.price} ₽
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    {pkg.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2 text-gray-300">
                        <Icon name="Check" size={16} className="text-gold mt-1" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full bg-gold hover:bg-gold/90 text-dark">
                    Забронировать пакет
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-light mb-4">Отзывы гостей</h2>
            <p className="text-gray-600 text-lg">Что говорят о нас наши гости</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <Card key={index} className="border-none shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(review.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={16} className="fill-gold text-gold" />
                    ))}
                  </div>
                  <CardTitle className="text-xl">{review.name}</CardTitle>
                  <CardDescription className="text-sm text-gray-500">{review.hotel}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed italic">"{review.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-light mb-4">Консьерж-сервис</h2>
            <p className="text-gray-600 text-lg">Наш консьерж поможет подобрать идеальный отель и организует вашу поездку</p>
          </div>
          <Card className="border-none shadow-xl">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Ваше имя</label>
                    <Input 
                      required
                      placeholder="Введите имя"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Телефон</label>
                    <Input 
                      required
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input 
                    required
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Сообщение</label>
                  <Textarea 
                    required
                    placeholder="Расскажите о ваших пожеланиях..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>
                <Button type="submit" size="lg" className="w-full bg-dark hover:bg-dark/90 text-white">
                  Отправить запрос
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="bg-dark text-white py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-gold">PREMIUM HOTELS</h3>
              <p className="text-gray-400 text-sm">Бронирование премиум-отелей в Москве</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Услуги</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-gold transition-colors">Бронирование</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">SPA & Wellness</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Консьерж</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={14} />
                  +7 (495) 123-45-67
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={14} />
                  info@premiumhotels.ru
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="MapPin" size={14} />
                  Москва, Тверская 1
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Соцсети</h4>
              <div className="flex gap-4">
                <a href="#" className="hover:text-gold transition-colors">
                  <Icon name="Instagram" size={20} />
                </a>
                <a href="#" className="hover:text-gold transition-colors">
                  <Icon name="Facebook" size={20} />
                </a>
                <a href="#" className="hover:text-gold transition-colors">
                  <Icon name="Twitter" size={20} />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 Premium Hotels Moscow. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
