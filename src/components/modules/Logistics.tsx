import React from 'react';
import { Truck, MapPin, Navigation, Clock, Fuel, AlertCircle, CheckCircle, Package, Plus, Download } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

const logisticsStats = [
  { title: 'Активные рейсы', value: '127', icon: Truck, color: '#FF9800' },
  { title: 'Транспортных средств', value: '64', icon: Navigation, color: '#2196F3' },
  { title: 'Средняя скорость', value: '68 км/ч', icon: Clock, color: '#4CAF50' },
  { title: 'Расход топлива', value: '24.3 л/100км', icon: Fuel, color: '#F44336' },
];

const activeRoutes = [
  { id: 'R-2024-145', vehicle: 'А123БВ', driver: 'Иванов И.И.', from: 'Нефтебаза №1', to: 'АЗС №147', progress: 75, status: 'active', eta: '14:30' },
  { id: 'R-2024-146', vehicle: 'Е456ГД', driver: 'Петров П.П.', from: 'Терминал №5', to: 'Нефтебаза №3', progress: 45, status: 'active', eta: '16:15' },
  { id: 'R-2024-147', vehicle: 'К789ЗИ', driver: 'Сидоров С.С.', from: 'АЗС №92', to: 'Нефтебаза №1', progress: 90, status: 'active', eta: '15:00' },
  { id: 'R-2024-148', vehicle: 'М012ЛН', driver: 'Козлов К.К.', from: 'Нефтебаза №3', to: 'Терминал №5', progress: 20, status: 'delayed', eta: '17:30' },
];

const vehicles = [
  { id: 'А123БВ', type: 'Бензовоз', capacity: 24000, status: 'active', mileage: 145230, nextMaintenance: '15.01.2025' },
  { id: 'Е456ГД', type: 'Бензовоз', capacity: 24000, status: 'active', mileage: 98450, nextMaintenance: '20.12.2024' },
  { id: 'К789ЗИ', type: 'Автоцистерна', capacity: 18000, status: 'active', mileage: 203680, nextMaintenance: '05.01.2025' },
  { id: 'М012ЛН', type: 'Бензовоз', capacity: 24000, status: 'maintenance', mileage: 176920, nextMaintenance: 'На ТО' },
];

export function Logistics() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'delayed':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'maintenance':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'В пути';
      case 'delayed':
        return 'Задержка';
      case 'maintenance':
        return 'ТО';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Логистический учёт</h1>
          <p className="text-muted-foreground">
            Управление перевозками и транспортом
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Отчёты
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Новый рейс
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {logisticsStats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={idx} className="p-6 bg-white/50 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-2">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}15` }}
                >
                  <Icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Map Placeholder */}
      <Card className="p-6 bg-white/50 backdrop-blur-sm">
        <h2 className="text-xl font-semibold mb-4">Карта маршрутов в реальном времени</h2>
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg h-[400px] flex items-center justify-center border-2 border-dashed border-border relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          <div className="text-center relative z-10">
            <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
            <p className="text-lg font-semibold mb-2">GPS-трекинг транспорта</p>
            <p className="text-sm text-muted-foreground mb-4">
              Интерактивная карта с треками всех транспортных средств
            </p>
            <div className="flex gap-2 justify-center">
              <Badge className="bg-green-100 text-green-700 border-green-300">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
                127 активных
              </Badge>
              <Badge className="bg-blue-100 text-blue-700 border-blue-300">
                <Navigation className="w-3 h-3 mr-1" />
                Обновление: 5 сек
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Active Routes */}
      <Card className="p-6 bg-white/50 backdrop-blur-sm">
        <h2 className="text-xl font-semibold mb-4">Активные рейсы</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Номер рейса</TableHead>
                <TableHead>ТС / Водитель</TableHead>
                <TableHead>Маршрут</TableHead>
                <TableHead>Прогресс</TableHead>
                <TableHead>ETA</TableHead>
                <TableHead>Статус</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeRoutes.map((route) => (
                <TableRow key={route.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium">{route.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{route.vehicle}</p>
                      <p className="text-sm text-muted-foreground">{route.driver}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm">
                      <span>{route.from}</span>
                      <Navigation className="w-4 h-4 text-primary" />
                      <span>{route.to}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all"
                          style={{ width: `${route.progress}%` }}
                        />
                      </div>
                      <span className="text-sm">{route.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{route.eta}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(route.status)}>
                      {getStatusText(route.status)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Vehicle Fleet */}
      <Card className="p-6 bg-white/50 backdrop-blur-sm">
        <h2 className="text-xl font-semibold mb-4">Парк транспортных средств</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Гос. номер</TableHead>
                <TableHead>Тип</TableHead>
                <TableHead>Вместимость</TableHead>
                <TableHead>Пробег</TableHead>
                <TableHead>Следующее ТО</TableHead>
                <TableHead>Статус</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vehicles.map((vehicle) => (
                <TableRow key={vehicle.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium">{vehicle.id}</TableCell>
                  <TableCell>{vehicle.type}</TableCell>
                  <TableCell>{vehicle.capacity.toLocaleString()} л</TableCell>
                  <TableCell>{vehicle.mileage.toLocaleString()} км</TableCell>
                  <TableCell>{vehicle.nextMaintenance}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(vehicle.status)}>
                      {getStatusText(vehicle.status)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-gradient-to-br from-orange-50 to-white border-orange-200 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
              <Navigation className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold">Планировщик маршрутов</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Оптимизация маршрутов доставки
          </p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-50 to-white border-blue-200 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <Truck className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold">Управление ТС</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Добавление и обслуживание транспорта
          </p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-white border-purple-200 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
              <Package className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold">ТТН и документы</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Товарно-транспортные накладные
          </p>
        </Card>
      </div>
    </div>
  );
}
