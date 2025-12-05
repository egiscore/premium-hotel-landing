import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const SPASection = () => {
  return (
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
  );
};

export default SPASection;
