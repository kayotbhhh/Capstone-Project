import React from 'react';
import { LayoutDashboard, History, Activity, Settings, Plus } from 'lucide-react';
import { Screen } from '../types';

interface NavigationProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  onPlusClick?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentScreen, onNavigate, onPlusClick }) => {
  const navItems = [
    { id: 'DASHBOARD' as Screen, label: 'Home', icon: LayoutDashboard },
    { id: 'RECORDS' as Screen, label: 'Records', icon: History },
    { id: 'ANALYTICS' as Screen, label: 'Analytics', icon: Activity },
    { id: 'SETUP' as Screen, label: 'Setup', icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background-dark/95 ios-blur border-t border-white/5 px-6 py-3 flex justify-between items-center z-50 max-w-md mx-auto">
      {navItems.slice(0, 2).map((item) => (
        <button 
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className={`flex flex-col items-center gap-1 transition-colors ${currentScreen === item.id ? 'text-primary' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <item.icon size={24} />
          <span className={`text-[10px] uppercase tracking-wider ${currentScreen === item.id ? 'font-bold' : 'font-medium'}`}>{item.label}</span>
        </button>
      ))}

      <div className="relative -top-8">
        <button 
          onClick={onPlusClick}
          className="size-14 bg-primary rounded-full flex items-center justify-center text-white shadow-lg shadow-primary/40 border-4 border-background-dark active:scale-95 transition-transform"
        >
          <Plus size={32} />
        </button>
      </div>

      {navItems.slice(2).map((item) => (
        <button 
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className={`flex flex-col items-center gap-1 transition-colors ${currentScreen === item.id ? 'text-primary' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <item.icon size={24} />
          <span className={`text-[10px] uppercase tracking-wider ${currentScreen === item.id ? 'font-bold' : 'font-medium'}`}>{item.label}</span>
        </button>
      ))}
    </nav>
  );
};
