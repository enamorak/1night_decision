import React from 'react';
import { Shield, AlertCircle, TrendingDown, BarChart, Download, Plus, Wrench, Package } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { SimpleBarChart, SimplePieChart } from '../SimpleChart';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

const warrantyStats = [
  { title: 'Всего случаев', value: '89', icon: Shield, color: '#7B00E5', change: '-12%' },
  { title: 'Открытые случаи', value: '12', icon: AlertCircle, color: '#FF9800', change: '3 новых' },
  { title: 'Средняя стоимость', value: '₽145К', icon: Package, color: '#F44336', change: '-8%' },
  { title: 'Время устранения', value: '6.2 дня', icon: Wrench, color: '#4CAF50', change: '-15%' },
];

const failuresByMonth = [
  { month: 'Янв', count: 12, cost: 1850 },
  { month: 'Фев', count: 9, cost: 1320 },
  { month: 'Мар', count: 11, cost: 1580 },
  { month: 'Апр', count: 8, cost: 1150 },
  { month: 'Май', count: 7, cost: 980 },
  { month: 'Июн', count: 6, cost: 870 },
];

const failureTypes = [
  { name: 'ТРК', value: 35, color: '#7B00E5' },
  { name: 'Резервуары', value: 25, color: '#4CAF50' },
  { name: 'Насосы', value: 20, color: '#FF9800' },
  { name: 'Автоматика', value: 12, color: '#2196F3' },
  { name: 'Прочее', value: 8, color: '#F44336' },
];

const warrantyCases = [
  { id: 'WRN-2024-034', equipment: 'ТРК Gilbarco Horizon', defect: 'Отказ дисплея', facility: 'АЗС №147', date: '10.12.2024', status: 'in_progress', cost: 125000 },
  { id: 'WRN-2024-035', equipment: 'Резервуар 50м³', defect: 'Коррозия стенок', facility: 'Нефтебаза №1', date: '08.12.2024', status: 'analysis', cost: 380000 },
  { id: 'WRN-2024-036', equipment: 'Насос Grundfos', defect: 'Износ подшипников', facility: 'Терминал №5', date: '05.12.2024', status: 'resolved', cost: 95000 },
  { id: 'WRN-2024-037', equipment: 'Система автоматики', defect: 'Сбой контроллера', facility: 'АЗС №92', date: '03.12.2024', status: 'resolved', cost: 67000 },
];

const supplierReliability = [
  { supplier: 'Gilbarco', cases: 18, mtbf: 12500, rating: 4.2 },
  { supplier: 'Grundfos', cases: 12, mtbf: 15200, rating: 4.5 },
  { supplier: 'Schneider Electric', cases: 8, mtbf: 18900, rating: 4.7 },
  { supplier: 'Emerson', cases: 15, mtbf: 11800, rating: 4.0 },
  { supplier: 'Прочие', cases: 36, mtbf: 9500, rating: 3.8 },
];

export function Warranty() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'in_progress':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'analysis':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'Устранено';
      case 'in_progress':
        return 'В работе';
      case 'analysis':
        return 'Анализ';
      default:
        return status;
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-blue-600';
    if (rating >= 3.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Учёт гарантийных случаев</h1>
          <p className="text-muted-foreground">
            Анализ отказов оборудования и управление гарантией
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Отчёт для поставщика
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Зарегистрировать случай
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {warrantyStats.map((stat, idx) => {
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
              <p className="text-sm text-green-600">{stat.change}</p>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Failures Trend */}
        <Card className="col-span-1 lg:col-span-2 p-6 bg-white/50 backdrop-blur-sm">
          <h2 className="text-xl font-semibold mb-4">Динамика отказов и затрат</h2>
          <SimpleBarChart 
            data={failuresByMonth}
            xKey="month"
            bars={[
              { key: 'count', color: '#7B00E5', name: 'Количество случаев' },
              { key: 'cost', color: '#F44336', name: 'Затраты (тыс. ₽)' }
            ]}
          />
        </Card>

        {/* Failure Types */}
        <Card className="p-6 bg-white/50 backdrop-blur-sm">
          <h2 className="text-xl font-semibold mb-4">Типы отказов</h2>
          <SimplePieChart data={failureTypes} />
        </Card>
      </div>

      {/* Warranty Cases */}
      <Card className="p-6 bg-white/50 backdrop-blur-sm">
        <h2 className="text-xl font-semibold mb-4">Гарантийные случаи</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Номер</TableHead>
                <TableHead>Оборудование</TableHead>
                <TableHead>Дефект</TableHead>
                <TableHead>Объект</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead>Стоимость</TableHead>
                <TableHead>Статус</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {warrantyCases.map((wCase) => (
                <TableRow key={wCase.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium">{wCase.id}</TableCell>
                  <TableCell>{wCase.equipment}</TableCell>
                  <TableCell>{wCase.defect}</TableCell>
                  <TableCell>{wCase.facility}</TableCell>
                  <TableCell>{wCase.date}</TableCell>
                  <TableCell>₽{wCase.cost.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(wCase.status)}>
                      {getStatusText(wCase.status)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Supplier Reliability */}
      <Card className="p-6 bg-white/50 backdrop-blur-sm">
        <h2 className="text-xl font-semibold mb-4">Надёжность поставщиков</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Поставщик</TableHead>
                <TableHead>Гарантийных случаев</TableHead>
                <TableHead>MTBF (часы)</TableHead>
                <TableHead>Рейтинг</TableHead>
                <TableHead>Тренд</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {supplierReliability.map((supplier, idx) => (
                <TableRow key={idx} className="hover:bg-muted/30">
                  <TableCell className="font-medium">{supplier.supplier}</TableCell>
                  <TableCell>{supplier.cases}</TableCell>
                  <TableCell>{supplier.mtbf.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`w-4 h-4 ${star <= supplier.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className={`font-medium ${getRatingColor(supplier.rating)}`}>
                        {supplier.rating.toFixed(1)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <TrendingDown className={`w-5 h-5 ${supplier.rating >= 4.5 ? 'text-green-500' : supplier.rating >= 4.0 ? 'text-blue-500' : 'text-red-500'}`} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Analysis Tools */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-white border-purple-200 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
              <BarChart className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold">Диаграмма Ишикавы</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Анализ причин и следствий отказов
          </p>
          <Button variant="outline" size="sm" className="w-full">
            Открыть анализ
          </Button>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-50 to-white border-orange-200 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold">Прогноз отказов</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            AI-предсказание вероятных отказов
          </p>
          <Button variant="outline" size="sm" className="w-full">
            Запустить модель
          </Button>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-white border-green-200 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold">Отчёт поставщику</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Формирование претензии по гарантии
          </p>
          <Button variant="outline" size="sm" className="w-full">
            Создать документ
          </Button>
        </Card>
      </div>
    </div>
  );
}