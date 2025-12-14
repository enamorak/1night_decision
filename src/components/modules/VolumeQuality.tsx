import React, { useState } from 'react';
import { 
  Droplet, 
  MapPin, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Clock,
  Filter,
  Download,
  Plus,
  Search,
  FileText,
  Beaker
} from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { SimpleLineChart } from '../SimpleChart';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

const facilityData = [
  { id: 1, name: 'Нефтебаза №1', location: 'Москва', volume: 12450, status: 'active', quality: 99.8 },
  { id: 2, name: 'АЗС №147', location: 'Санкт-Петербург', volume: 3420, status: 'active', quality: 99.5 },
  { id: 3, name: 'Терминал №5', location: 'Казань', volume: 8930, status: 'warning', quality: 98.2 },
  { id: 4, name: 'Нефтебаза №3', location: 'Новосибирск', volume: 10120, status: 'active', quality: 99.9 },
  { id: 5, name: 'АЗС №92', location: 'Екатеринбург', volume: 2890, status: 'maintenance', quality: 99.0 },
];

const volumeTrend = [
  { date: '01.12', ai92: 15000, ai95: 12000, diesel: 18000 },
  { date: '05.12', ai92: 16500, ai95: 13500, diesel: 19000 },
  { date: '10.12', ai92: 15800, ai95: 14000, diesel: 17500 },
  { date: '15.12', ai92: 17200, ai95: 15000, diesel: 20000 },
  { date: '20.12', ai92: 18000, ai95: 16000, diesel: 21000 },
  { date: '25.12', ai92: 17500, ai95: 15500, diesel: 20500 },
];

const qualityData = [
  { parameter: 'Плотность', value: '725.3', unit: 'кг/м³', norm: '720-730', status: 'ok' },
  { parameter: 'Октановое число', value: '95.2', unit: 'RON', norm: '≥95', status: 'ok' },
  { parameter: 'Содержание серы', value: '8.5', unit: 'мг/кг', norm: '≤10', status: 'ok' },
  { parameter: 'Температура вспышки', value: '62', unit: '°C', norm: '≥55', status: 'ok' },
  { parameter: 'Вязкость', value: '2.1', unit: 'мм²/с', norm: '1.5-4.0', status: 'ok' },
];

const recentOperations = [
  { id: 1, type: 'Приёмка', product: 'АИ-95', volume: 24000, facility: 'Нефтебаза №1', time: '10:45', status: 'completed' },
  { id: 2, type: 'Отгрузка', product: 'Дизель', volume: 18500, facility: 'Терминал №5', time: '11:20', status: 'in_progress' },
  { id: 3, type: 'Приёмка', product: 'АИ-92', volume: 32000, facility: 'Нефтебаза №3', time: '12:05', status: 'completed' },
  { id: 4, type: 'Отгрузка', product: 'АИ-95', volume: 5600, facility: 'АЗС №147', time: '13:30', status: 'pending' },
];

export function VolumeQuality() {
  const [selectedFacility, setSelectedFacility] = useState<number | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'warning':
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
        return 'Активно';
      case 'warning':
        return 'Предупреждение';
      case 'maintenance':
        return 'Обслуживание';
      case 'completed':
        return 'Завершено';
      case 'in_progress':
        return 'В процессе';
      case 'pending':
        return 'Ожидание';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Учёт объёмов и качества</h1>
          <p className="text-muted-foreground">
            Мониторинг продукции в реальном времени
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Экспорт
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Новая операция
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 bg-white/50 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <Droplet className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Общий объём</p>
              <p className="text-2xl font-bold">45,240 т</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm text-green-600">
            <TrendingUp className="w-4 h-4" />
            +12.5% за месяц
          </div>
        </Card>

        <Card className="p-6 bg-white/50 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Качество</p>
              <p className="text-2xl font-bold">99.2%</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Соответствие нормам</p>
        </Card>

        <Card className="p-6 bg-white/50 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Объектов</p>
              <p className="text-2xl font-bold">5</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Активных точек</p>
        </Card>

        <Card className="p-6 bg-white/50 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Операций</p>
              <p className="text-2xl font-bold">127</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">За сегодня</p>
        </Card>
      </div>

      {/* Volume Trend Chart */}
      <Card className="p-6 bg-white/50 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Динамика объёмов по видам топлива</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Фильтры
            </Button>
          </div>
        </div>
        <SimpleLineChart 
          data={volumeTrend}
          xKey="date"
          lines={[
            { key: 'ai92', color: '#7B00E5', name: 'АИ-92' },
            { key: 'ai95', color: '#4CAF50', name: 'АИ-95' },
            { key: 'diesel', color: '#FF9800', name: 'Дизель' }
          ]}
        />
      </Card>

      {/* Facilities and Quality */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Facilities List */}
        <Card className="p-6 bg-white/50 backdrop-blur-sm">
          <h2 className="text-xl font-semibold mb-4">Объекты учёта</h2>
          <div className="space-y-3">
            {facilityData.map((facility) => (
              <div
                key={facility.id}
                className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  selectedFacility === facility.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => setSelectedFacility(facility.id)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold">{facility.name}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {facility.location}
                    </p>
                  </div>
                  <Badge className={getStatusColor(facility.status)}>
                    {getStatusText(facility.status)}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <span className="text-muted-foreground">Объём: </span>
                    <span className="font-medium">{facility.volume.toLocaleString()} т</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Качество: </span>
                    <span className="font-medium text-green-600">{facility.quality}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quality Parameters */}
        <Card className="p-6 bg-white/50 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Показатели качества</h2>
            <Button variant="outline" size="sm">
              <Beaker className="w-4 h-4 mr-2" />
              Лаборатория
            </Button>
          </div>
          <div className="space-y-3">
            {qualityData.map((param, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div className="flex-1">
                  <p className="font-medium">{param.parameter}</p>
                  <p className="text-sm text-muted-foreground">Норма: {param.norm}</p>
                </div>
                <div className="text-right mr-4">
                  <p className="text-lg font-semibold">{param.value}</p>
                  <p className="text-xs text-muted-foreground">{param.unit}</p>
                </div>
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4">
            <FileText className="w-4 h-4 mr-2" />
            Паспорт качества
          </Button>
        </Card>
      </div>

      {/* Recent Operations */}
      <Card className="p-6 bg-white/50 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Последние операции</h2>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input className="pl-9 w-64" placeholder="Поиск операций..." />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Тип</TableHead>
                <TableHead>Продукт</TableHead>
                <TableHead>Объём (л)</TableHead>
                <TableHead>Объект</TableHead>
                <TableHead>Время</TableHead>
                <TableHead>Статус</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOperations.map((op) => (
                <TableRow key={op.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium">{op.type}</TableCell>
                  <TableCell>{op.product}</TableCell>
                  <TableCell>{op.volume.toLocaleString()}</TableCell>
                  <TableCell>{op.facility}</TableCell>
                  <TableCell>{op.time}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(op.status)}>
                      {getStatusText(op.status)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}