import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import HeroSection from "@/components/HeroSection";
import HotelCatalog from "@/components/HotelCatalog";
import SPASection from "@/components/SPASection";
import ContactForm from "@/components/ContactForm";
import { useNavigate } from "react-router-dom";

const packages = [
  {
    title: "Романтический уик-энд",
    price: "95 000",
    features: [
      "2 ночи в люкс-номере",
      "Ужин в панорамном ресторане",
      "SPA для двоих",
      "Шампанское и фрукты",
    ],
  },
  {
    title: "Деловая поездка",
    price: "120 000",
    features: [
      "3 ночи",
      "Переговорная комната",
      "Трансфер бизнес-класса",
      "Личный ассистент",
    ],
  },
  {
    title: "Wellness-retreat",
    price: "180 000",
    features: [
      "5 ночей",
      "Ежедневные SPA-процедуры",
      "Персональный тренер",
      "Детокс-меню от шеф-повара",
    ],
  },
];

const reviews = [
  {
    name: "Екатерина Волкова",
    rating: 5,
    text: "Безупречный сервис! Личный дворецкий предугадывал все наши желания. SPA-комплекс мирового уровня.",
    hotel: "Grand Palace Moscow",
  },
  {
    name: "Александр Соколов",
    rating: 5,
    text: "Останавливался на деловой встрече. Идеальное расположение, высочайший уровень комфорта и конфиденциальности.",
    hotel: "Boutique Lux Arbat",
  },
  {
    name: "Мария Белова",
    rating: 5,
    text: "Отмечали годовщину. Романтический пакет превзошёл все ожидания — ужин с видом на Москву незабываем!",
    hotel: "Premium Towers",
  },
];

const Index = () => {
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleBookPackage = (packageTitle: string) => {
    scrollToSection("contact");
    setTimeout(() => {
      const messageInput = document.querySelector(
        'textarea[placeholder*="сообщение"]',
      ) as HTMLTextAreaElement;
      if (messageInput) {
        messageInput.value = `Здравствуйте! Хочу забронировать пакет "${packageTitle}".`;
        messageInput.focus();
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-dark">
              BOOKING & PREMIUM HOTELS
            </h1>
            <div className="hidden md:flex gap-8 items-center">
              <button
                onClick={() => scrollToSection("catalog")}
                className="text-sm hover:text-gold transition-colors"
              >
                Каталог
              </button>
              <button
                onClick={() => scrollToSection("spa")}
                className="text-sm hover:text-gold transition-colors"
              >
                SPA
              </button>
              <button
                onClick={() => scrollToSection("packages")}
                className="text-sm hover:text-gold transition-colors"
              >
                Предложения
              </button>
              <button
                onClick={() => scrollToSection("reviews")}
                className="text-sm hover:text-gold transition-colors"
              >
                Отзывы
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-sm hover:text-gold transition-colors"
              >
                Контакты
              </button>
              <Button className="bg-gold hover:bg-gold/90 text-dark">
                +7 (495) 179-74-44
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <HeroSection onScrollToSection={scrollToSection} />

      <HotelCatalog />

      <SPASection />

      <section id="packages" className="py-20 px-6 bg-dark text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-light mb-4">Эксклюзивные пакеты</h2>
            <p className="text-gray-300 text-lg">
              Готовые предложения для незабываемого отдыха
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Card
                key={index}
                className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
              >
                <CardHeader>
                  <CardTitle className="text-2xl text-white">
                    {pkg.title}
                  </CardTitle>
                  <CardDescription className="text-3xl font-bold text-gold mt-4">
                    {pkg.price} ₽
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    {pkg.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 text-gray-300"
                      >
                        <Icon
                          name="Check"
                          size={16}
                          className="text-gold mt-1"
                        />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button
                    className="w-full bg-gold hover:bg-gold/90 text-dark"
                    onClick={() => handleBookPackage(pkg.title)}
                  >
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
            <p className="text-gray-600 text-lg">
              Что говорят о нас наши гости
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <Card key={index} className="border-none shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(review.rating)].map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={16}
                        className="fill-gold text-gold"
                      />
                    ))}
                  </div>
                  <CardTitle className="text-xl">{review.name}</CardTitle>
                  <CardDescription className="text-sm text-gray-500">
                    {review.hotel}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed italic">
                    "{review.text}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <ContactForm />

      <footer className="bg-dark text-white py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-gold">
                BOOKING & PREMIUM HOTELS
              </h3>
              <p className="text-gray-400 text-sm">
                Бронирование премиум-отелей в Москве
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Услуги</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-gold transition-colors">
                    Бронирование
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gold transition-colors">
                    SPA & Wellness
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gold transition-colors">
                    Консьерж
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={14} />
                  +7 (495) 179-74-44
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={14} />
                  booking@booking.events
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
            <p>© 2024 Booking & Premium Hotels Moscow. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
