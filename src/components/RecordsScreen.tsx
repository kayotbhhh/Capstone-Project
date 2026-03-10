import React, { useState } from 'react';
import { Search, ChevronLeft, History, FileText, MoreHorizontal, X } from 'lucide-react';
import { Navigation } from './Navigation';
import { Screen } from '../types';

interface RecordsScreenProps {
  onNavigate: (screen: Screen) => void;
  onUploadNew: () => void;
  onSelectPatient: (id: string) => void;
}

export const RecordsScreen: React.FC<RecordsScreenProps> = ({ onNavigate, onUploadNew, onSelectPatient }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const records = [
    { id: 'BR-8821', patient: 'Sarah Jenkins', type: 'Mammogram (Left/Right)', date: 'Oct 24, 2023 • 10:24 AM', status: 'ANALYZED', statusColor: 'text-emerald-500 bg-emerald-500/10' },
    { id: 'BR-8819', patient: 'Michael Brown', type: 'Full Screening DICOM', date: 'Oct 24, 2023 • 09:15 AM', status: 'PENDING', statusColor: 'text-orange-500 bg-orange-500/10' },
    { id: 'BR-8790', patient: 'Emily Davis', type: 'Biopsy Core Imaging', date: 'Oct 23, 2023 • 04:45 PM', status: 'ANALYZED', statusColor: 'text-emerald-500 bg-emerald-500/10' },
    { id: 'BR-8785', patient: 'Jessica Wilson', type: 'Ultrasound Scan', date: 'Oct 22, 2023 • 11:30 AM', status: 'ANALYZED', statusColor: 'text-emerald-500 bg-emerald-500/10' },
    { id: 'BR-8770', patient: 'Linda Taylor', type: 'Mammogram Screening', date: 'Oct 21, 2023 • 02:15 PM', status: 'ANALYZED', statusColor: 'text-emerald-500 bg-emerald-500/10' },
    { id: 'BR-8765', patient: 'Barbara Miller', type: 'Full Screening DICOM', date: 'Oct 20, 2023 • 09:00 AM', status: 'ANALYZED', statusColor: 'text-emerald-500 bg-emerald-500/10' },
  ];

  const filteredRecords = records.filter(record => 
    record.patient.toLowerCase().includes(searchQuery.toLowerCase()) || 
    record.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background-dark pb-24">
      <header className="px-6 pt-12 pb-6 flex items-center justify-between sticky top-0 bg-background-dark/80 ios-blur z-10 border-b border-white/5">
        <h2 className="text-2xl font-bold text-white">Medical Records</h2>
        <button className="size-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300">
          <Search size={20} />
        </button>
      </header>

      <main className="px-6 space-y-4 pt-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search patient or ID..." 
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

        <div className="space-y-3">
          {filteredRecords.length > 0 ? (
            filteredRecords.map((record) => (
              <div 
                key={record.id} 
                onClick={() => onSelectPatient(record.id)}
                className="bg-slate-800/50 border border-white/5 rounded-2xl p-4 flex items-center justify-between group cursor-pointer hover:bg-slate-800 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="size-12 bg-slate-900 rounded-xl flex items-center justify-center border border-white/5">
                    <FileText size={24} className="text-slate-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-white">{record.patient}</h4>
                      <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${record.statusColor}`}>{record.status}</span>
                    </div>
                    <p className="text-xs text-slate-400">{record.type} • {record.id}</p>
                    <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
                      <History size={10} />
                      {record.date}
                    </p>
                  </div>
                </div>
                <MoreHorizontal size={20} className="text-slate-600 group-hover:text-primary transition-colors" />
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-slate-800/30 rounded-3xl border border-dashed border-white/5">
              <Search size={48} className="text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 font-medium">No records matching your search</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="text-primary text-sm font-bold mt-2 hover:underline"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </main>

      <Navigation currentScreen="RECORDS" onNavigate={onNavigate} onPlusClick={onUploadNew} />
    </div>
  );
};
