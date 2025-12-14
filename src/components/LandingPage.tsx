import React, { useState } from 'react';
import { 
  Droplet, 
  BarChart3, 
  Truck, 
  Wrench, 
  Leaf, 
  Shield,
  ChevronRight,
  Check,
  Menu,
  X,
  ArrowRight,
  Zap,
  TrendingUp,
  Lock,
  Globe
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';

interface LandingPageProps {
  onNavigate: () => void;
}

const modules = [
  {
    icon: Droplet,
    title: 'Учёт объёмов и качества',
    description: 'Мониторинг продукции в реальном времени, контроль качества и лабораторные данные',
    color: '#7B00E5'
  },
  {
    icon: BarChart3,
    title: 'Финансовый учёт',
    description: 'Управление документами, задолженностью, инвентаризация и P&L отчеты',
    color: '#4CAF50'
  },
  {
    icon: Truck,
    title: 'Логистический учёт',
    description: 'GPS-трекинг перевозок, оптимизация маршрутов и управление транспортом',
    color: '#FF9800'
  },
  {
    icon: Wrench,
    title: 'Сервисные работы',
    description: 'Система заявок, планирование работ, учёт ресурсов и база знаний',
    color: '#2196F3'
  },
  {
    icon: Leaf,
    title: 'Экологический учёт',
    description: 'Мониторинг выбросов, учёт отходов и регуляторная отчётность',
    color: '#4CAF50'
  },
  {
    icon: Shield,
    title: 'Гарантийные случаи',
    description: 'Регистрация дефектов, анализ причин и статистика надёжности',
    color: '#F44336'
  }
];

const products = [
  {
    title: 'Топлива',
    items: ['Бензин АИ-92, АИ-95, АИ-98', 'Дизельное топливо', 'Авиакеросин', 'Судовое топливо']
  },
  {
    title: 'Спецпродукты',
    items: ['Масла моторные', 'Смазочные материалы', 'Присадки', 'Растворители']
  },
  {
    title: 'Оборудование',
    items: ['ТРК и колонки', 'Резервуары', 'Насосы', 'Системы учёта']
  },
  {
    title: 'Инфраструктура',
    items: ['АЗС', 'Нефтебазы', 'Терминалы', 'Трубопроводы']
  }
];

const benefits = [
  {
    icon: TrendingUp,
    title: 'Снижение затрат',
    value: '20-30%',
    description: 'операционных расходов'
  },
  {
    icon: Check,
    title: 'Точность учёта',
    value: '99.9%',
    description: 'без ошибок'
  },
  {
    icon: Zap,
    title: 'Скорость работы',
    value: '5x',
    description: 'быстрее обработка'
  },
  {
    icon: Lock,
    title: 'Безопасность',
    value: '100%',
    description: 'защита данных'
  }
];

const features = [
  'Интеграция с 1С, SAP, ГЛОНАСС',
  'Работа в режиме оффлайн',
  'Мобильные приложения iOS/Android',
  'API для сторонних систем',
  'Электронная подпись',
  'Автоматическая аналитика с AI',
  'Облачное и on-premise развертывание',
  'Соответствие всем стандартам РФ'
];

export function LandingPage({ onNavigate }: LandingPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState('');

  const handleDemoRequest = () => {
    alert('Демо-запрос отправлен! Наш менеджер свяжется с вами в ближайшее время.');
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#7B00E5] to-[#32005D] flex items-center justify-center">
                <Droplet className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-lg text-foreground">PetroControl PRO</div>
                <div className="text-xs text-muted-foreground">by 1night decision</div>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              <a href="#modules" className="text-sm text-foreground hover:text-primary transition-colors">
                Модули
              </a>
              <a href="#benefits" className="text-sm text-foreground hover:text-primary transition-colors">
                Преимущества
              </a>
              <a href="#products" className="text-sm text-foreground hover:text-primary transition-colors">
                Продукты
              </a>
              <a href="#demo" className="text-sm text-foreground hover:text-primary transition-colors">
                Демо
              </a>
              <Button onClick={onNavigate}>
                Войти в систему
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-border">
            <div className="px-4 py-4 space-y-3">
              <a href="#modules" className="block py-2 text-foreground hover:text-primary">
                Модули
              </a>
              <a href="#benefits" className="block py-2 text-foreground hover:text-primary">
                Преимущества
              </a>
              <a href="#products" className="block py-2 text-foreground hover:text-primary">
                Продукты
              </a>
              <a href="#demo" className="block py-2 text-foreground hover:text-primary">
                Демо
              </a>
              <Button onClick={onNavigate} className="w-full">
                Войти в систему
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#7B00E5]/5 via-transparent to-[#32005D]/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(123,0,229,0.1),transparent_50%)]" />
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-1">
              Умный контроль. Максимальная эффективность.
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#7B00E5] to-[#32005D] bg-clip-text text-transparent">
              Автоматизация процессов нефтегазовой отрасли
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Единая платформа для учёта, контроля и аналитики всех бизнес-процессов. 
              От добычи до реализации.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={onNavigate} className="text-base px-8">
                Демо-доступ
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8">
                Запросить презентацию
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-1">{benefit.value}</div>
                  <div className="text-sm text-foreground">{benefit.title}</div>
                  <div className="text-xs text-muted-foreground">{benefit.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section id="modules" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">6 ключевых модулей</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Комплексное решение для всех аспектов управления нефтегазовым бизнесом
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, idx) => (
              <Card
                key={idx}
                className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group border-2 hover:border-primary/50 bg-white/50 backdrop-blur-sm"
              >
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${module.color}15` }}
                >
                  <module.icon className="w-7 h-7" style={{ color: module.color }} />
                </div>
                <h3 className="text-lg font-semibold mb-3">{module.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {module.description}
                </p>
                <div className="mt-4 flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
                  Подробнее
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Для каких продуктов</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Полный контроль всей номенклатуры нефтегазовой продукции
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, idx) => (
              <Card key={idx} className="p-6 bg-white/50 backdrop-blur-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-4 text-primary">{product.title}</h3>
                <ul className="space-y-2">
                  {product.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Преимущества платформы</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Доказанная эффективность на реальных проектах
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/30 transition-colors">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-base">{feature}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#7B00E5]/5 to-[#32005D]/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Современные технологии</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Надёжный стек для бесперебойной работы
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['React', 'PostgreSQL', 'Docker', 'Kubernetes', 'Redis', 'Elasticsearch', 'FastAPI', 'TimescaleDB'].map((tech, idx) => (
              <Card key={idx} className="p-6 text-center bg-white/80 backdrop-blur-sm hover:shadow-md transition-shadow">
                <Globe className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="font-medium">{tech}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <Card className="p-8 md:p-12 bg-gradient-to-br from-[#7B00E5] to-[#32005D] text-white">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Получить демо-доступ</h2>
              <p className="text-white/90 mb-8">
                Оставьте email и мы предоставим доступ к демо-версии платформы
              </p>

              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 flex-1"
                />
                <Button 
                  onClick={handleDemoRequest}
                  className="bg-white text-primary hover:bg-white/90"
                >
                  Отправить
                </Button>
              </div>

              <p className="text-xs text-white/70 mt-4">
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7B00E5] to-[#32005D] flex items-center justify-center">
                  <Droplet className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-bold">PetroControl PRO</div>
                  <div className="text-xs text-white/60">by 1night decision</div>
                </div>
              </div>
              <p className="text-sm text-white/70">
                Комплексная автоматизация для нефтегазовой отрасли
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Продукт</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#modules" className="hover:text-white transition-colors">Модули</a></li>
                <li><a href="#benefits" className="hover:text-white transition-colors">Преимущества</a></li>
                <li><a href="#products" className="hover:text-white transition-colors">Продукты</a></li>
                <li><a href="#demo" className="hover:text-white transition-colors">Демо</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Компания</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Команда</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Карьера</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Контакты</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Поддержка</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">Документация</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Служба поддержки</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/60">
              © 2024 PetroControl PRO. Все права защищены.
            </p>
            <div className="flex gap-6 text-sm text-white/60">
              <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-white transition-colors">Условия использования</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
