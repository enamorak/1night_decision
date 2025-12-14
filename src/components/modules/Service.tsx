import React from 'react';
import { Wrench, Clock, CheckCircle, AlertTriangle, User, Calendar, Plus, Filter } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

const serviceStats = [
  { title: 'Открытые заявки', value: '34', change: '+5 новых', icon: AlertTriangle, color: '#FF9800' },
  { title: 'В работе', value: '18', change: '8 критических', icon: Wrench, color: '#2196F3' },
  { title: 'Завершено сегодня', value: '12', change: 'SLA: 94%', icon: CheckCircle, color: '#4CAF50' },
  { title: 'Среднее время', value: '4.2 ч', change: '-15% к норме', icon: Clock, color: '#7B00E5' },
];

const tickets = [
  { id: 'SRV-2024-089', title: 'Отказ ТРК №3', facility: 'АЗС №147', priority: 'high', status: 'in_progress', assignee: 'Смирнов А.', created: '14.12 09:30' },
  { id: 'SRV-2024-090', title: 'Плановое ТО резервуара', facility: 'Нефтебаза №1', priority: 'medium', status: 'scheduled', assignee: 'Федоров В.', created: '14.12 10:15' },
  { id: 'SRV-2024-091', title: 'Замена фильтров', facility: 'Терминал №5', priority: 'low', status: 'pending', assignee: 'Не назначен', created: '14.12 11:00' },
  { id: 'SRV-2024-092', title: 'Ремонт освещения', facility: 'АЗС №92', priority: 'medium', status: 'in_progress', assignee: 'Кузнецов Д.', created: '14.12 12:20' },
  { id: 'SRV-2024-093', title: 'Утечка в системе', facility: 'Нефтебаза №3', priority: 'high', status: 'pending', assignee: 'Не назначен', created: '14.12 13:45' },
];

const kanbanColumns = [
  {
    title: 'Новые',
    status: 'pending',
    color: '#9E9E9E',
    count: 8,
    items: tickets.filter(t => t.status === 'pending')
  },
  {
    title: 'В работе',
    status: 'in_progress',
    color: '#2196F3',
    count: 12,
    items: tickets.filter(t => t.status === 'in_progress')
  },
  {
    title: 'Запланировано',
    status: 'scheduled',
    color: '#FF9800',
    count: 6,
    items: tickets.filter(t => t.status === 'scheduled')
  },
  {
    title: 'Завершено',
    status: 'completed',
    color: '#4CAF50',
    count: 14,
    items: []
  }
];

export function Service() {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
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

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'Высокий';
      case 'medium':
        return 'Средний';
      case 'low':
        return 'Низкий';
      default:
        return priority;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Учёт сервисных работ</h1>
          <p className="text-muted-foreground">
            Управление заявками и обслуживанием оборудования
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Фильтры
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Новая заявка
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {serviceStats.map((stat, idx) => {
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
              <p className="text-sm text-muted-foreground">{stat.change}</p>
            </Card>
          );
        })}
      </div>

      {/* Kanban Board */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Канбан-доска заявок</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kanbanColumns.map((column) => (
            <Card key={column.status} className="p-4 bg-white/50 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: column.color }}
                  />
                  <h3 className="font-semibold">{column.title}</h3>
                </div>
                <Badge variant="outline">{column.count}</Badge>
              </div>
              <div className="space-y-3">
                {column.items.length > 0 ? (
                  column.items.map((ticket) => (
                    <Card key={ticket.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-start justify-between mb-2">
                        <p className="text-sm font-medium text-muted-foreground">{ticket.id}</p>
                        <Badge className={getPriorityColor(ticket.priority)}>
                          {getPriorityText(ticket.priority)}
                        </Badge>
                      </div>
                      <h4 className="font-semibold mb-2">{ticket.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{ticket.facility}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          <span>{ticket.assignee}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{ticket.created}</span>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8 text-sm text-muted-foreground">
                    Нет заявок
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-white/50 backdrop-blur-sm">
          <h2 className="text-xl font-semibold mb-4">График обслуживания</h2>
          <div className="space-y-4">
            {[
              { date: '15.12.2024', item: 'ТО резервуара №5', location: 'Нефтебаза №1', type: 'planned' },
              { date: '18.12.2024', item: 'Калибровка ТРК', location: 'АЗС №147', type: 'planned' },
              { date: '20.12.2024', item: 'Проверка систем безопасности', location: 'Терминал №5', type: 'planned' },
              { date: '22.12.2024', item: 'Замена фильтров', location: 'Нефтебаза №3', type: 'planned' },
            ].map((event, idx) => (
              <div key={idx} className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium">{event.item}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{event.location}</p>
                  <p className="text-xs text-muted-foreground mt-1">{event.date}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-white/50 backdrop-blur-sm">
          <h2 className="text-xl font-semibold mb-4">Популярные проблемы</h2>
          <div className="space-y-4">
            {[
              { issue: 'Отказ ТРК', count: 12, trend: '-15%' },
              { issue: 'Утечки в системе', count: 8, trend: '+5%' },
              { issue: 'Электрика', count: 6, trend: '0%' },
              { issue: 'Фильтры и очистка', count: 5, trend: '-10%' },
              { issue: 'Автоматика', count: 3, trend: '+20%' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-sm font-semibold text-purple-600">
                    {idx + 1}
                  </div>
                  <p className="font-medium">{item.issue}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">{item.count}</p>
                  <p className={`text-xs ${item.trend.startsWith('+') ? 'text-red-600' : item.trend.startsWith('-') ? 'text-green-600' : 'text-muted-foreground'}`}>
                    {item.trend}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
