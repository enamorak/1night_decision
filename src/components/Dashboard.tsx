import React, { useState } from 'react';
import { 
  Droplet, 
  BarChart3, 
  Truck, 
  Wrench, 
  Leaf, 
  Shield,
  Home,
  Settings,
  User,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { Button } from './ui/button';
import { VolumeQuality } from './modules/VolumeQuality';
import { FinanceInventory } from './modules/FinanceInventory';
import { Logistics } from './modules/Logistics';
import { Service } from './modules/Service';
import { Ecology } from './modules/Ecology';
import { Warranty } from './modules/Warranty';
import { Overview } from './modules/Overview';

interface DashboardProps {
  onNavigateHome: () => void;
}

export type ModuleType = 'overview' | 'volume-quality' | 'finance' | 'logistics' | 'service' | 'ecology' | 'warranty';

const menuItems = [
  { id: 'overview' as ModuleType, label: 'Обзор', icon: Home },
  { id: 'volume-quality' as ModuleType, label: 'Объёмы и качество', icon: Droplet },
  { id: 'finance' as ModuleType, label: 'Финансы и товары', icon: BarChart3 },
  { id: 'logistics' as ModuleType, label: 'Логистика', icon: Truck },
  { id: 'service' as ModuleType, label: 'Сервис', icon: Wrench },
  { id: 'ecology' as ModuleType, label: 'Экология', icon: Leaf },
  { id: 'warranty' as ModuleType, label: 'Гарантия', icon: Shield },
];

export function Dashboard({ onNavigateHome }: DashboardProps) {
  const [activeModule, setActiveModule] = useState<ModuleType>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderModule = () => {
    switch (activeModule) {
      case 'overview':
        return <Overview onNavigateToModule={setActiveModule} />;
      case 'volume-quality':
        return <VolumeQuality />;
      case 'finance':
        return <FinanceInventory />;
      case 'logistics':
        return <Logistics />;
      case 'service':
        return <Service />;
      case 'ecology':
        return <Ecology />;
      case 'warranty':
        return <Warranty />;
      default:
        return <Overview onNavigateToModule={setActiveModule} />;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-border">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#7B00E5] to-[#32005D] flex items-center justify-center">
              <Droplet className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-foreground">PetroControl</div>
              <div className="text-xs text-muted-foreground">PRO</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeModule === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveModule(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Menu */}
        <div className="p-4 border-t border-border space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-muted transition-all">
            <Settings className="w-5 h-5" />
            <span className="text-sm">Настройки</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-muted transition-all">
            <User className="w-5 h-5" />
            <span className="text-sm">Профиль</span>
          </button>
          <button 
            onClick={onNavigateHome}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-destructive hover:bg-destructive/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm">Выход</span>
          </button>
        </div>
      </aside>

      {/* Sidebar - Mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-white border-r border-border flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#7B00E5] to-[#32005D] flex items-center justify-center">
                  <Droplet className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-foreground">PetroControl</div>
                  <div className="text-xs text-muted-foreground">PRO</div>
                </div>
              </div>
              <button onClick={() => setSidebarOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeModule === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveModule(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* User Menu */}
            <div className="p-4 border-t border-border space-y-1">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-muted transition-all">
                <Settings className="w-5 h-5" />
                <span className="text-sm">Настройки</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-muted transition-all">
                <User className="w-5 h-5" />
                <span className="text-sm">Профиль</span>
              </button>
              <button 
                onClick={onNavigateHome}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-destructive hover:bg-destructive/10 transition-all"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-sm">Выход</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Mobile Header */}
        <div className="lg:hidden sticky top-0 z-40 bg-white border-b border-border px-4 py-3 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7B00E5] to-[#32005D] flex items-center justify-center">
              <Droplet className="w-5 h-5 text-white" />
            </div>
            <div className="font-bold text-foreground">PetroControl PRO</div>
          </div>
          <div className="w-6" />
        </div>

        {/* Module Content */}
        <div className="p-4 md:p-6 lg:p-8">
          {renderModule()}
        </div>
      </main>
    </div>
  );
}
