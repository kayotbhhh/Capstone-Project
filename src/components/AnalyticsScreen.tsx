import React from 'react';
import { Activity, TrendingUp, Users, Clock, ShieldCheck, ChevronRight } from 'lucide-react';
import { Navigation } from './Navigation';
import { Screen } from '../types';

interface AnalyticsScreenProps {
  onNavigate: (screen: Screen) => void;
  onUploadNew: () => void;
}

export const AnalyticsScreen: React.FC<AnalyticsScreenProps> = ({ onNavigate, onUploadNew }) => {
  return (
    <div className="min-h-screen bg-background-dark pb-24">
      <header className="px-6 pt-12 pb-6 flex items-center justify-between sticky top-0 bg-background-dark/80 ios-blur z-10 border-b border-white/5">
        <h2 className="text-2xl font-bold text-white">Analytics</h2>
        <div className="flex items-center gap-1 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
          <ShieldCheck size={14} className="text-primary" />
          <span className="text-[10px] font-bold tracking-wide uppercase text-primary">Live Data</span>
        </div>
      </header>

      <main className="px-6 space-y-6 pt-4">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-800/50 border border-white/5 rounded-3xl p-5">
            <div className="size-8 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp size={18} className="text-emerald-500" />
            </div>
            <p className="text-xs font-medium text-slate-400">Detection Rate</p>
            <h3 className="text-3xl font-bold text-white my-1">98.2%</h3>
            <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">+2.4% vs last Q</p>
          </div>
          <div className="bg-slate-800/50 border border-white/5 rounded-3xl p-5">
            <div className="size-8 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
              <Clock size={18} className="text-blue-500" />
            </div>
            <p className="text-xs font-medium text-slate-400">Avg. Process</p>
            <h3 className="text-3xl font-bold text-white my-1">3.8s</h3>
            <p className="text-[10px] font-bold text-blue-500 uppercase tracking-wider">-0.5s optimized</p>
          </div>
        </div>

        {/* Performance Chart Placeholder */}
        <section className="bg-slate-800/50 border border-white/5 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white">Screening Volume</h3>
            <select className="bg-transparent text-xs font-bold text-primary outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-40 w-full flex items-end justify-between gap-2">
            {[40, 65, 45, 90, 55, 75, 85].map((height, i) => (
              <div key={i} className="flex-1 bg-primary/20 rounded-t-lg relative group">
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-lg transition-all duration-500" 
                  style={{ height: `${height}%` }}
                ></div>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-[10px] font-bold text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {height}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </section>

        {/* Detailed Stats */}
        <section className="space-y-3">
          <h3 className="font-bold text-white">Diagnostic Distribution</h3>
          <div className="space-y-3">
            {[
              { label: 'Normal Screening', value: '842', percentage: 65, color: 'bg-emerald-500' },
              { label: 'Benign Findings', value: '324', percentage: 25, color: 'bg-blue-500' },
              { label: 'High Suspicion', value: '118', percentage: 10, color: 'bg-red-500' },
            ].map((stat) => (
              <div key={stat.label} className="bg-slate-800/50 border border-white/5 rounded-2xl p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-300">{stat.label}</span>
                  <span className="text-sm font-bold text-white">{stat.value}</span>
                </div>
                <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                  <div className={`h-full ${stat.color} rounded-full`} style={{ width: `${stat.percentage}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Action Item */}
        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 flex items-center justify-between group cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="size-10 bg-primary/20 rounded-xl flex items-center justify-center">
              <Users size={20} className="text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Patient Demographics</h4>
              <p className="text-xs text-slate-400">View detailed population data</p>
            </div>
          </div>
          <ChevronRight size={20} className="text-primary group-hover:translate-x-1 transition-transform" />
        </div>
      </main>

      <Navigation currentScreen="ANALYTICS" onNavigate={onNavigate} onPlusClick={onUploadNew} />
    </div>
  );
};
