import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign,
  FileText,
  AlertCircle,
  Download,
  Plus,
  Filter,
  Calendar,
  CreditCard,
  Package
} from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { SimpleBarChart, SimplePieChart } from '../SimpleChart';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

const financialStats = [
  { title: 'Выручка', value: '₽842.5М', change: '+8.3%', trend: 'up' },
  { title: 'Дебиторская задолженность', value: '₽124.2М', change: '-3.5%', trend: 'down' },
  { title: 'Кредиторская задолженность', value: '₽89.7М', change: '+1.2%', trend: 'up' },
  { title: 'Маржинальность', value: '22.4%', change: '+0.8%', trend: 'up' },
];

const revenueData = [
  { month: 'Янв', revenue: 720, costs: 580 },
  { month: 'Фев', revenue: 750, costs: 590 },
  { month: 'Мар', revenue: 780, costs: 610 },
  { month: 'Апр', revenue: 800, costs: 620 },
  { month: 'Май', revenue: 820, costs: 640 },
  { month: 'Июн', revenue: 842, costs: 655 },
];

const productMargin = [
  { name: 'АИ-95', value: 35, color: '#7B00E5' },
  { name: 'АИ-92', value: 28, color: '#4CAF50' },
  { name: 'Дизель', value: 25, color: '#FF9800' },
  { name: 'Масла', value: 12, color: '#2196F3' },
];

const invoices = [
  { id: 'INV-2024-001', client: 'ООО "Транспорт+"', amount: 2450000, date: '14.12.2024', status: 'paid' },
  { id: 'INV-2024-002', client: 'ПАО "Логистика"', amount: 3820000, date: '13.12.2024', status: 'pending' },
  { id: 'INV-2024-003', client: 'ИП Иванов А.А.', amount: 890000, date: '12.12.2024', status: 'overdue' },
  { id: 'INV-2024-004', client: 'ООО "Автопарк"', amount: 1560000, date: '11.12.2024', status: 'paid' },
];

const inventory = [
  { product: 'АИ-92', stock: 125000, reserved: 24000, available: 101000, unit: 'л' },
  { product: 'АИ-95', stock: 98000, reserved: 18000, available: 80000, unit: 'л' },
  { product: 'Дизель', stock: 156000, reserved: 32000, available: 124000, unit: 'л' },
  { product: 'Масло 5W-40', stock: 2400, reserved: 450, available: 1950, unit: 'л' },
  { product: 'Масло 10W-40', stock: 1800, reserved: 320, available: 1480, unit: 'л' },
];

export function FinanceInventory() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'overdue':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Оплачено';
      case 'pending':
        return 'Ожидание';
      case 'overdue':
        return 'Просрочено';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Финансовый и товарный учёт</h1>
          <p className="text-muted-foreground">
            Управление финансами и инвентаризация
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Экспорт
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Новый документ
          </Button>
        </div>
      </div>

      {/* Financial Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {financialStats.map((stat, idx) => (
          <Card key={idx} className="p-6 bg-white/50 backdrop-blur-sm">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              {stat.trend === 'up' ? (
                <TrendingUp className="w-5 h-5 text-green-500" />
              ) : (
                <TrendingUp className="w-5 h-5 text-red-500 rotate-180" />
              )}
            </div>
            <p className={`text-sm ${stat.trend === 'up' && !stat.title.includes('задолженность') ? 'text-green-600' : stat.trend === 'down' ? 'text-green-600' : 'text-red-600'}`}>
              {stat.change} к пред. периоду
            </p>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue vs Costs */}
        <Card className="col-span-1 lg:col-span-2 p-6 bg-white/50 backdrop-blur-sm">
          <h2 className="text-xl font-semibold mb-4">Выручка и расходы</h2>
          <SimpleBarChart 
            data={revenueData}
            xKey="month"
            bars={[
              { key: 'revenue', color: '#7B00E5', name: 'Выручка (млн ₽)' },
              { key: 'costs', color: '#FF9800', name: 'Расходы (млн ₽)' }
            ]}
          />
        </Card>

        {/* Product Margin */}
        <Card className="p-6 bg-white/50 backdrop-blur-sm">
          <h2 className="text-xl font-semibold mb-4">Маржинальность по продуктам</h2>
          <SimplePieChart data={productMargin} />
        </Card>
      </div>

      {/* Invoices */}
      <Card className="p-6 bg-white/50 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Счета-фактуры</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Фильтры
            </Button>
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Период
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Номер</TableHead>
                <TableHead>Клиент</TableHead>
                <TableHead>Сумма</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.client}</TableCell>
                  <TableCell>₽{invoice.amount.toLocaleString()}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(invoice.status)}>
                      {getStatusText(invoice.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <FileText className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Inventory */}
      <Card className="p-6 bg-white/50 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Складские остатки</h2>
          <Button variant="outline" size="sm">
            <Package className="w-4 h-4 mr-2" />
            Инвентаризация
          </Button>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Продукт</TableHead>
                <TableHead>На складе</TableHead>
                <TableHead>Резерв</TableHead>
                <TableHead>Доступно</TableHead>
                <TableHead>Статус</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventory.map((item, idx) => {
                const availablePercent = (item.available / item.stock) * 100;
                return (
                  <TableRow key={idx} className="hover:bg-muted/30">
                    <TableCell className="font-medium">{item.product}</TableCell>
                    <TableCell>{item.stock.toLocaleString()} {item.unit}</TableCell>
                    <TableCell>{item.reserved.toLocaleString()} {item.unit}</TableCell>
                    <TableCell>{item.available.toLocaleString()} {item.unit}</TableCell>
                    <TableCell>
                      {availablePercent > 50 ? (
                        <Badge className="bg-green-100 text-green-700 border-green-300">
                          В наличии
                        </Badge>
                      ) : availablePercent > 20 ? (
                        <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300">
                          Низкий запас
                        </Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-700 border-red-300">
                          Критический
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-white border-purple-200 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold">Создать счёт-фактуру</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Оформление нового счёта для клиента
          </p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-white border-green-200 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold">Регистрация платежа</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Внести информацию о поступлении средств
          </p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-50 to-white border-orange-200 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
              <Package className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold">Провести инвентаризацию</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Сверка фактических остатков с учётными
          </p>
        </Card>
      </div>
    </div>
  );
}