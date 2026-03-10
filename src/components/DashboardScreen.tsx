import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Upload, 
  ShieldCheck, 
  User, 
  History, 
  LayoutDashboard, 
  Settings, 
  Plus, 
  Search, 
  Bell, 
  Activity,
  FileText,
  X
} from 'lucide-react';

import { Navigation } from './Navigation';
import { Screen } from '../types';

interface DashboardScreenProps {
  onNavigate: (screen: Screen) => void;
  onUploadNew: () => void;
  onSelectPatient: (id: string) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ onNavigate, onUploadNew, onSelectPatient }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const reports = [
    { id: 'BR-8821', type: 'Mammogram (Left/Right)', date: 'Oct 24, 2023 • 10:24 AM', status: 'ANALYZED', statusColor: 'text-emerald-500 bg-emerald-500/10' },
    { id: 'BR-8819', type: 'Full Screening DICOM', date: 'Oct 24, 2023 • 09:15 AM', status: 'PENDING', statusColor: 'text-orange-500 bg-orange-500/10' },
    { id: 'BR-8790', type: 'Biopsy Core Imaging', date: 'Oct 23, 2023 • 04:45 PM', status: 'ANALYZED', statusColor: 'text-emerald-500 bg-emerald-500/10' },
  ];

  const filteredReports = reports.filter(report => 
    report.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
    report.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background-dark pb-24">
      <header className="px-6 pt-12 pb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-12 rounded-full overflow-hidden border-2 border-primary/20">
            <img src="https://picsum.photos/seed/doctor/100/100" alt="Dr. Sarah Jenkins" referrerPolicy="no-referrer" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Medical Officer</p>
            <h2 className="text-lg font-bold text-white">Dr. Sarah Jenkins</h2>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsSearching(!isSearching)}
            className={`size-10 rounded-full flex items-center justify-center transition-colors ${isSearching ? 'bg-primary text-white' : 'bg-slate-800 text-slate-300'}`}
          >
            <Search size={20} />
          </button>
          <button className="size-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 relative">
            <Bell size={20} />
            <div className="absolute top-2.5 right-2.5 size-2 bg-red-500 rounded-full border-2 border-background-dark"></div>
          </button>
        </div>
      </header>

      <main className="px-6 space-y-6">
        {isSearching && (
          <div className="relative animate-in slide-in-from-top-2 duration-200">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              autoFocus
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reports or patient ID..." 
              className="w-full bg-slate-800/50 border border-white/5 rounded-2xl py-3.5 pl-12 pr-12 text-white placeholder-slate-500 focus:border-primary outline-none transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
              >
                <X size={18} />
              </button>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-primary rounded-3xl p-5 shadow-xl shadow-primary/10">
            <div className="size-8 bg-white/20 rounded-lg flex items-center justify-center mb-4">
              <Activity size={18} className="text-white" />
            </div>
            <p className="text-xs font-medium text-white/70">Analyzed Scans</p>
            <h3 className="text-3xl font-bold text-white my-1">1,284</h3>
            <p className="text-[10px] font-bold text-white/50">+12% from last month</p>
          </div>
          <div className="bg-slate-800/50 border border-white/5 rounded-3xl p-5">
            <div className="size-8 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
              <ShieldCheck size={18} className="text-primary" />
            </div>
            <p className="text-xs font-medium text-slate-400">AI Accuracy</p>
            <h3 className="text-3xl font-bold text-white my-1">99.4%</h3>
            <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">High Confidence</p>
          </div>
        </div>

        <button 
          onClick={onUploadNew}
          className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
        >
          <Upload size={20} />
          <span>Upload New Scan</span>
        </button>

        <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          <Lock size={12} className="inline" />
          <span>HIPAA Compliant • Encrypted DICOM Transfer</span>
        </div>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Health Summary</h3>
            <button className="text-xs font-bold text-primary">View All</button>
          </div>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
            <div className="min-w-[140px] bg-slate-800/50 border border-white/5 rounded-2xl p-4">
              <div className="size-8 bg-blue-500/10 rounded-lg flex items-center justify-center mb-3">
                <Activity size={16} className="text-blue-500" />
              </div>
              <p className="text-[10px] font-medium text-slate-400">Processing Time</p>
              <p className="text-lg font-bold text-white">4.2s <span className="text-xs font-normal text-slate-500">Avg</span></p>
            </div>
            <div className="min-w-[140px] bg-slate-800/50 border border-white/5 rounded-2xl p-4">
              <div className="size-8 bg-purple-500/10 rounded-lg flex items-center justify-center mb-3">
                <User size={16} className="text-purple-500" />
              </div>
              <p className="text-[10px] font-medium text-slate-400">Active Patients</p>
              <p className="text-lg font-bold text-white">42</p>
            </div>
            <div className="min-w-[140px] bg-slate-800/50 border border-white/5 rounded-2xl p-4">
              <div className="size-8 bg-orange-500/10 rounded-lg flex items-center justify-center mb-3">
                <History size={16} className="text-orange-500" />
              </div>
              <p className="text-[10px] font-medium text-slate-400">Data Points</p>
              <p className="text-lg font-bold text-white">100k+</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Recent Imaging Reports</h3>
            <button className="text-xs font-bold text-primary">View All</button>
          </div>
          <div className="space-y-3">
            {filteredReports.length > 0 ? (
              filteredReports.map((report) => (
                <div 
                  key={report.id} 
                  onClick={() => onSelectPatient(report.id)}
                  className="bg-slate-800/50 border border-white/5 rounded-2xl p-4 flex items-center justify-between group cursor-pointer hover:bg-slate-800 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="size-12 bg-slate-900 rounded-xl flex items-center justify-center border border-white/5">
                      <FileText size={24} className="text-slate-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-white">Patient #{report.id}</h4>
                        <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${report.statusColor}`}>{report.status}</span>
                      </div>
                      <p className="text-xs text-slate-400">{report.type}</p>
                      <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
                        <History size={10} />
                        {report.date}
                      </p>
                    </div>
                  </div>
                  <ChevronLeft size={20} className="text-slate-600 rotate-180 group-hover:text-primary transition-colors" />
                </div>
              ))
            ) : (
              <div className="text-center py-10 bg-slate-800/30 rounded-3xl border border-dashed border-white/5">
                <Search size={32} className="text-slate-600 mx-auto mb-3" />
                <p className="text-slate-500 text-sm">No matching reports found</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Navigation currentScreen="DASHBOARD" onNavigate={onNavigate} onPlusClick={onUploadNew} />
    </div>
  );
};


const Lock = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
