import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onScrollToSection: (sectionId: string) => void;
}

const HeroSection = ({ onScrollToSection }: HeroSectionProps) => {
  return (
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
              <Button size="lg" className="bg-dark hover:bg-dark/90 text-white px-8" onClick={() => onScrollToSection('contact')}>
                Забронировать
              </Button>
              <Button size="lg" variant="outline" className="border-dark text-dark hover:bg-dark hover:text-white" onClick={() => onScrollToSection('catalog')}>
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
  );
};

export default HeroSection;
