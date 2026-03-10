import React, { useState } from 'react';
import { 
  ChevronLeft, 
  CheckCircle2, 
  ArrowRight, 
  User, 
  History, 
  FileText, 
  Info
} from 'lucide-react';
import { PatientData } from '../types';

interface PatientInfoScreenProps {
  onNext: (data: PatientData) => void;
  onBack: () => void;
}

export const PatientInfoScreen: React.FC<PatientInfoScreenProps> = ({ onNext, onBack }) => {
  const [formData, setFormData] = useState<PatientData>({
    name: '',
    age: '',
    id: '',
    familyHistory: [],
    symptoms: ''
  });

  const toggleHistory = (member: string) => {
    setFormData(prev => ({
      ...prev,
      familyHistory: prev.familyHistory.includes(member) 
        ? prev.familyHistory.filter(m => m !== member)
        : [...prev.familyHistory, member]
    }));
  };

  return (
    <div className="min-h-screen bg-background-dark text-slate-100 font-sans">
      <header className="sticky top-0 z-50 bg-background-dark/80 ios-blur border-b border-white/10">
        <div className="flex items-center justify-between px-4 h-16">
          <button onClick={onBack} className="flex items-center justify-center w-10 h-10 -ml-2 text-primary">
            <ChevronLeft size={28} />
          </button>
          <h1 className="text-lg font-semibold tracking-tight">Patient Information</h1>
          <div className="w-10"></div>
        </div>
        <div className="px-4 pb-4">
          <div className="flex justify-between items-end mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Step 1 of 3</span>
            <span className="text-xs font-medium text-primary">Demographics</span>
          </div>
          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full w-1/3 transition-all duration-500"></div>
          </div>
        </div>
      </header>

      <main className="p-4 pb-32 space-y-8 max-w-md mx-auto">
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <User size={20} className="text-primary" />
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500">General Details</h2>
          </div>
          <div className="space-y-4">
            <label className="block">
              <span className="block text-sm font-medium mb-1.5 ml-1">Full Name</span>
              <input 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-600" 
                placeholder="e.g. Sarah Jenkins" 
                type="text" 
              />
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="block text-sm font-medium mb-1.5 ml-1">Age</span>
                <input 
                  value={formData.age}
                  onChange={e => setFormData({...formData, age: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
                  placeholder="45" 
                  type="number" 
                />
              </label>
              <label className="block">
                <span className="block text-sm font-medium mb-1.5 ml-1">Patient ID</span>
                <input 
                  value={formData.id}
                  onChange={e => setFormData({...formData, id: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
                  placeholder="ID-00123" 
                  type="text" 
                />
              </label>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <History size={20} className="text-primary" />
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500">Family History</h2>
          </div>
          <p className="text-xs text-slate-500 ml-1">Select all relatives with a history of breast cancer:</p>
          <div className="grid grid-cols-2 gap-3">
            {['Mother', 'Sister', 'Maternal Aunt', 'Grandmother'].map(member => (
              <label key={member} className="relative flex items-center p-4 rounded-xl border border-white/10 bg-white/5 active:scale-95 transition-transform cursor-pointer">
                <input 
                  type="checkbox" 
                  className="peer hidden" 
                  checked={formData.familyHistory.includes(member)}
                  onChange={() => toggleHistory(member)}
                />
                <div className="w-5 h-5 border-2 border-white/20 rounded-md peer-checked:bg-primary peer-checked:border-primary flex items-center justify-center transition-colors">
                  <CheckCircle2 size={14} className="text-white scale-0 peer-checked:scale-100 transition-transform" />
                </div>
                <span className="ml-3 text-sm font-medium">{member}</span>
              </label>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <FileText size={20} className="text-primary" />
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500">Clinical Observations</h2>
          </div>
          <label className="block">
            <span className="block text-sm font-medium mb-1.5 ml-1">Observed Symptoms</span>
            <textarea 
              value={formData.symptoms}
              onChange={e => setFormData({...formData, symptoms: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-600 resize-none" 
              placeholder="e.g. Palpable lump in the upper outer quadrant, skin dimpling, or persistent pain..." 
              rows={4}
            />
          </label>
        </section>

        <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 flex gap-4 items-start">
          <Info size={20} className="text-primary shrink-0" />
          <p className="text-xs leading-relaxed text-slate-300">
            All data is encrypted following HIPAA standards. Information provided will be used to enhance the accuracy of the AI diagnostic model.
          </p>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background-dark border-t border-white/10 ios-blur bg-opacity-90">
        <div className="max-w-md mx-auto">
          <button 
            onClick={() => onNext(formData)}
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-lg shadow-primary/20"
          >
            <span>Next: Upload Scans</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
