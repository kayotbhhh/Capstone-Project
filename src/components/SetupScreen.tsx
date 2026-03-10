import React from 'react';
import { User, Bell, Shield, Lock, HelpCircle, LogOut, ChevronRight, Moon, Globe, Smartphone } from 'lucide-react';
import { Navigation } from './Navigation';
import { Screen } from '../types';

interface SetupScreenProps {
  onNavigate: (screen: Screen) => void;
  onUploadNew: () => void;
  onLogout: () => void;
  onOpenSetting: (id: string) => void;
}

export const SetupScreen: React.FC<SetupScreenProps> = ({ onNavigate, onUploadNew, onLogout, onOpenSetting }) => {
  const sections = [
    {
      title: 'Account Settings',
      items: [
        { id: 'profile', label: 'Profile Information', icon: User, color: 'text-blue-500 bg-blue-500/10' },
        { id: 'notifications', label: 'Notification Preferences', icon: Bell, color: 'text-orange-500 bg-orange-500/10' },
        { id: 'security', label: 'Security & Password', icon: Shield, color: 'text-emerald-500 bg-emerald-500/10' },
      ]
    },
    {
      title: 'App Preferences',
      items: [
        { id: 'appearance', label: 'Appearance', icon: Moon, color: 'text-purple-500 bg-purple-500/10', value: 'Dark Mode' },
        { id: 'language', label: 'Language', icon: Globe, color: 'text-blue-500 bg-blue-500/10', value: 'English (US)' },
        { id: 'devices', label: 'Connected Devices', icon: Smartphone, color: 'text-slate-500 bg-slate-500/10' },
      ]
    },
    {
      title: 'Support & Legal',
      items: [
        { id: 'help', label: 'Help Center', icon: HelpCircle, color: 'text-primary bg-primary/10' },
        { id: 'privacy', label: 'Privacy Policy', icon: Lock, color: 'text-slate-500 bg-slate-500/10' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background-dark pb-24">
      <header className="px-6 pt-12 pb-6 flex flex-col items-center justify-center sticky top-0 bg-background-dark/80 ios-blur z-10 border-b border-white/5">
        <div className="size-20 rounded-full overflow-hidden border-4 border-primary/20 mb-3 shadow-xl">
          <img src="https://picsum.photos/seed/doctor/200/200" alt="Dr. Sarah Jenkins" referrerPolicy="no-referrer" />
        </div>
        <h2 className="text-xl font-bold text-white">Dr. Sarah Jenkins</h2>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Medical Officer • ID: #8821</p>
      </header>

      <main className="px-6 space-y-8 pt-6">
        {sections.map((section) => (
          <section key={section.title} className="space-y-3">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">{section.title}</h3>
            <div className="bg-slate-800/50 border border-white/5 rounded-3xl overflow-hidden">
              {section.items.map((item, i) => (
                <button 
                  key={item.id} 
                  onClick={() => onOpenSetting(item.id)}
                  className={`w-full px-5 py-4 flex items-center justify-between group hover:bg-slate-800 transition-colors ${i !== section.items.length - 1 ? 'border-b border-white/5' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`size-10 rounded-xl flex items-center justify-center ${item.color}`}>
                      <item.icon size={20} />
                    </div>
                    <span className="text-sm font-medium text-slate-200">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.value && <span className="text-xs font-bold text-slate-500">{item.value}</span>}
                    <ChevronRight size={18} className="text-slate-600 group-hover:text-primary transition-transform group-hover:translate-x-1" />
                  </div>
                </button>
              ))}
            </div>
          </section>
        ))}

        <button 
          onClick={onLogout}
          className="w-full bg-red-500/10 border border-red-500/20 text-red-500 font-bold py-4 rounded-3xl flex items-center justify-center gap-2 hover:bg-red-500/20 transition-colors active:scale-[0.98]"
        >
          <LogOut size={20} />
          <span>Sign Out of Portal</span>
        </button>

        <div className="text-center space-y-1">
          <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Breast Cancer Detection AI • v4.2.1 Stable</p>
          <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">HIPAA Compliant • ISO 27001 Certified</p>
        </div>
      </main>

      <Navigation currentScreen="SETUP" onNavigate={onNavigate} onPlusClick={onUploadNew} />
    </div>
  );
};
