import React from 'react';
import { Leaf, AlertTriangle, TrendingDown, FileText, Download, Plus, Droplet, Wind, Trash2 } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { SimpleLineChart } from '../SimpleChart';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

const ecoStats = [
  { title: 'Соответствие нормам', value: '98.2%', icon: Leaf, color: '#4CAF50', change: '+2.1%' },
  { title: 'Выбросы CO₂', value: '124 т', icon: Wind, color: '#FF9800', change: '-8.5%' },
  { title: 'Отходы переработано', value: '89%', icon: Trash2, color: '#2196F3', change: '+5.2%' },
  { title: 'Водопотребление', value: '2,340 м³', icon: Droplet, color: '#7B00E5', change: '-3.1%' },
];

const emissionsData = [
  { month: 'Янв', co2: 145, norm: 150 },
  { month: 'Фев', co2: 138, norm: 150 },
  { month: 'Мар', co2: 142, norm: 150 },
  { month: 'Апр', co2: 135, norm: 150 },
  { month: 'Май', co2: 128, norm: 150 },
  { month: 'Июн', co2: 124, norm: 150 },
];

const wasteData = [
  { category: 'Нефтешламы', generated: 45, recycled: 42, disposed: 3, class: 3 },
  { category: 'Промасленная ветошь', generated: 12, recycled: 11, disposed: 1, class: 4 },
  { category: 'Фильтры', generated: 8, recycled: 7, disposed: 1, class: 4 },
  { category: 'Упаковка', generated: 15, recycled: 15, disposed: 0, class: 5 },
  { category: 'Прочее', generated: 6, recycled: 5, disposed: 1, class: 4 },
];

const incidents = [
  { id: 'INC-2024-012', date: '10.12.2024', type: 'Превышение лимита', facility: 'Нефтебаза №3', severity: 'medium', status: 'resolved' },
  { id: 'INC-2024-013', date: '05.12.2024', type: 'Разлив нефтепродуктов', facility: 'АЗС №92', severity: 'high', status: 'resolved' },
  { id: 'INC-2024-014', date: '01.12.2024', type: 'Некорректная утилизация', facility: 'Терминал №5', severity: 'low', status: 'resolved' },
];

const complianceMetrics = [
  { parameter: 'Выбросы в атмосферу', current: 98.5, target: 95, status: 'ok' },
  { parameter: 'Сброс сточных вод', current: 99.2, target: 95, status: 'ok' },
  { parameter: 'Обращение с отходами', current: 97.8, target: 95, status: 'ok' },
  { parameter: 'Углеродный след', current: 94.2, target: 95, status: 'warning' },
];

export function Ecology() {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-700 border-green-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'Высокая';
      case 'medium':
        return 'Средняя';
      case 'low':
        return 'Низкая';
      default:
        return severity;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Экологический и регуляторный учёт</h1>
          <p className="text-muted-foreground">
            Мониторинг экологических показателей и соответствие нормам
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Отчёт для Росприроднадзора
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Зарегистрировать инцидент
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {ecoStats.map((stat, idx) => {
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
              <p className={`text-sm ${stat.change.startsWith('+') && !stat.title.includes('Соответствие') ? 'text-red-600' : 'text-green-600'}`}>
                {stat.change} к пред. периоду
              </p>
            </Card>
          );
        })}
      </div>

      {/* Emissions Chart */}
      <Card className="p-6 bg-white/50 backdrop-blur-sm">
        <h2 className="text-xl font-semibold mb-4">Динамика выбросов CO₂</h2>
        <SimpleLineChart 
          data={emissionsData}
          xKey="month"
          lines={[
            { key: 'co2', color: '#FF9800', name: 'Фактические выбросы (тонн)' },
            { key: 'norm', color: '#F44336', name: 'Нормативный предел', dashed: true }
          ]}
        />
      </Card>

      {/* Compliance Metrics */}
      <Card className="p-6 bg-white/50 backdrop-blur-sm">
        <h2 className="text-xl font-semibold mb-4">Показатели соответствия нормативам</h2>
        <div className="space-y-4">
          {complianceMetrics.map((metric, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="font-medium">{metric.parameter}</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Цель: {metric.target}%</span>
                  <span className="text-lg font-semibold">{metric.current}%</span>
                  {metric.status === 'ok' ? (
                    <Leaf className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  )}
                </div>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div 
                  className={`h-full transition-all ${metric.status === 'ok' ? 'bg-green-500' : 'bg-yellow-500'}`}
                  style={{ width: `${metric.current}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Waste Management */}
      <Card className="p-6 bg-white/50 backdrop-blur-sm">
        <h2 className="text-xl font-semibold mb-4">Управление отходами</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Категория отходов</TableHead>
                <TableHead>Класс</TableHead>
                <TableHead>Образовано (т)</TableHead>
                <TableHead>Переработано (т)</TableHead>
                <TableHead>Утилизировано (т)</TableHead>
                <TableHead>% переработки</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {wasteData.map((waste, idx) => {
                const recyclingRate = (waste.recycled / waste.generated) * 100;
                return (
                  <TableRow key={idx} className="hover:bg-muted/30">
                    <TableCell className="font-medium">{waste.category}</TableCell>
                    <TableCell>
                      <Badge variant="outline">Класс {waste.class}</Badge>
                    </TableCell>
                    <TableCell>{waste.generated}</TableCell>
                    <TableCell>{waste.recycled}</TableCell>
                    <TableCell>{waste.disposed}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden max-w-[100px]">
                          <div 
                            className="h-full bg-green-500 transition-all"
                            style={{ width: `${recyclingRate}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{recyclingRate.toFixed(1)}%</span>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Recent Incidents */}
      <Card className="p-6 bg-white/50 backdrop-blur-sm">
        <h2 className="text-xl font-semibold mb-4">Экологические инциденты</h2>
        <div className="space-y-3">
          {incidents.map((incident) => (
            <div key={incident.id} className="flex items-center justify-between p-4 rounded-lg border-2 border-border hover:border-primary/50 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium">{incident.type}</p>
                    <Badge className={getSeverityColor(incident.severity)}>
                      {getSeverityText(incident.severity)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{incident.facility}</p>
                  <p className="text-xs text-muted-foreground mt-1">{incident.date}</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-700 border-green-300">
                Устранено
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Regulatory Reports */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-gradient-to-br from-green-50 to-white border-green-200 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold">Отчёт 2-ТП (отходы)</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Годовая отчётность по обращению с отходами
          </p>
          <Button variant="outline" size="sm" className="w-full">
            Сформировать отчёт
          </Button>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-50 to-white border-blue-200 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold">Отчёт 2-ТП (воздух)</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Выбросы загрязняющих веществ в атмосферу
          </p>
          <Button variant="outline" size="sm" className="w-full">
            Сформировать отчёт
          </Button>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-white border-purple-200 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold">Отчёт об углеродном следе</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Расчёт парниковых газов и углеродного следа
          </p>
          <Button variant="outline" size="sm" className="w-full">
            Сформировать отчёт
          </Button>
        </Card>
      </div>
    </div>
  );
}