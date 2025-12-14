import React from 'react';
import { 
  Droplet, 
  BarChart3, 
  Truck, 
  Wrench, 
  Leaf, 
  Shield,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity
} from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { SimpleLineChart, SimplePieChart } from '../SimpleChart';
import { ModuleType } from '../Dashboard';

interface OverviewProps {
  onNavigateToModule: (module: ModuleType) => void;
}

const kpiData = [
  { 
    title: 'Общий объём продукции', 
    value: '45,240', 
    unit: 'тонн', 
    change: '+12.5%', 
    trend: 'up',
    icon: Droplet,
    color: '#7B00E5'
  },
  { 
    title: 'Финансовый оборот', 
    value: '₽842.5М', 
    unit: 'в месяц', 
    change: '+8.3%', 
    trend: 'up',
    icon: BarChart3,
    color: '#4CAF50'
  },
  { 
    title: 'Активные перевозки', 
    value: '127', 
    unit: 'рейсов', 
    change: '-2.1%', 
    trend: 'down',
    icon: Truck,
    color: '#FF9800'
  },
  { 
    title: 'Открытые заявки', 
    value: '34', 
    unit: 'сервисных', 
    change: '+5 новых', 
    trend: 'neutral',
    icon: Wrench,
    color: '#2196F3'
  },
];

const volumeData = [
  { month: 'Янв', volume: 38500, target: 40000 },
  { month: 'Фев', volume: 41200, target: 40000 },
  { month: 'Мар', volume: 39800, target: 40000 },
  { month: 'Апр', volume: 42100, target: 40000 },
  { month: 'Май', volume: 44300, target: 40000 },
  { month: 'Июн', volume: 45240, target: 40000 },
];

const productDistribution = [
  { name: 'АИ-92', value: 35, color: '#7B00E5' },
  { name: 'АИ-95', value: 30, color: '#4CAF50' },
  { name: 'Дизель', value: 25, color: '#FF9800' },
  { name: 'Прочее', value: 10, color: '#2196F3' },
];

const recentAlerts = [
  { 
    id: 1, 
    type: 'warning', 
    title: 'Превышение лимита выбросов', 
    location: 'Нефтебаза №3', 
    time: '10 мин назад',
    module: 'ecology' as ModuleType
  },
  { 
    id: 2, 
    type: 'success', 
    title: 'Поставка успешно завершена', 
    location: 'АЗС №147', 
    time: '1 час назад',
    module: 'logistics' as ModuleType
  },
  { 
    id: 3, 
    type: 'error', 
    title: 'Отказ оборудования', 
    location: 'Терминал №5', 
    time: '2 часа назад',
    module: 'warranty' as ModuleType
  },
  { 
    id: 4, 
    type: 'info', 
    title: 'Новая заявка на сервис', 
    location: 'АЗС №92', 
    time: '3 часа назад',
    module: 'service' as ModuleType
  },
];

const quickModules = [
  { 
    id: 'volume-quality' as ModuleType, 
    title: 'Объёмы и качество', 
    icon: Droplet, 
    color: '#7B00E5',
    stats: '45.2К тонн',
    status: 'В норме'
  },
  { 
    id: 'finance' as ModuleType, 
    title: 'Финансы', 
    icon: BarChart3, 
    color: '#4CAF50',
    stats: '₽842.5М',
    status: '+8.3%'
  },
  { 
    id: 'logistics' as ModuleType, 
    title: 'Логистика', 
    icon: Truck, 
    color: '#FF9800',
    stats: '127 рейсов',
    status: 'Активно'
  },
  { 
    id: 'service' as ModuleType, 
    title: 'Сервис', 
    icon: Wrench, 
    color: '#2196F3',
    stats: '34 заявки',
    status: '5 новых'
  },
  { 
    id: 'ecology' as ModuleType, 
    title: 'Экология', 
    icon: Leaf, 
    color: '#4CAF50',
    stats: '98.2%',
    status: 'Соответствие'
  },
  { 
    id: 'warranty' as ModuleType, 
    title: 'Гарантия', 
    icon: Shield, 
    color: '#F44336',
    stats: '12 случаев',
    status: '3 открытых'
  },
];

export function Overview({ onNavigateToModule }: OverviewProps) {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return <Activity className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Обзор системы</h1>
        <p className="text-muted-foreground">
          Текущий статус всех бизнес-процессов в реальном времени
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <Card key={idx} className="p-6 bg-white/50 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${kpi.color}15` }}
                >
                  <Icon className="w-6 h-6" style={{ color: kpi.color }} />
                </div>
                {kpi.trend === 'up' && <TrendingUp className="w-5 h-5 text-green-500" />}
                {kpi.trend === 'down' && <TrendingDown className="w-5 h-5 text-red-500" />}
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{kpi.title}</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold">{kpi.value}</p>
                  <span className="text-sm text-muted-foreground">{kpi.unit}</span>
                </div>
                <p className={`text-sm ${kpi.trend === 'up' ? 'text-green-600' : kpi.trend === 'down' ? 'text-red-600' : 'text-blue-600'}`}>
                  {kpi.change}
                </p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Volume Chart */}
        <Card className="col-span-1 lg:col-span-2 p-6 bg-white/50 backdrop-blur-sm">
          <h3 className="text-lg font-semibold mb-4">Динамика объёмов производства</h3>
          <SimpleLineChart 
            data={volumeData} 
            xKey="month"
            lines={[
              { key: 'volume', color: '#7B00E5', name: 'Факт' },
              { key: 'target', color: '#4CAF50', name: 'План', dashed: true }
            ]}
          />
        </Card>

        {/* Product Distribution */}
        <Card className="p-6 bg-white/50 backdrop-blur-sm">
          <h3 className="text-lg font-semibold mb-4">Распределение продукции</h3>
          <SimplePieChart data={productDistribution} />
        </Card>
      </div>

      {/* Quick Access Modules */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Быстрый доступ к модулям</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickModules.map((module) => {
            const Icon = module.icon;
            return (
              <Card 
                key={module.id}
                className="p-6 bg-white/50 backdrop-blur-sm hover:shadow-lg transition-all cursor-pointer group"
                onClick={() => onNavigateToModule(module.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: `${module.color}15` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: module.color }} />
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {module.status}
                  </Badge>
                </div>
                <h3 className="font-semibold mb-1">{module.title}</h3>
                <p className="text-2xl font-bold" style={{ color: module.color }}>
                  {module.stats}
                </p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Alerts */}
      <Card className="p-6 bg-white/50 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Последние события</h2>
          <Button variant="outline" size="sm">
            Смотреть все
          </Button>
        </div>
        <div className="space-y-3">
          {recentAlerts.map((alert) => (
            <div 
              key={alert.id}
              className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={() => onNavigateToModule(alert.module)}
            >
              <div className="mt-1">
                {getAlertIcon(alert.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium">{alert.title}</p>
                <p className="text-sm text-muted-foreground">{alert.location}</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap">
                <Clock className="w-3 h-3" />
                {alert.time}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}