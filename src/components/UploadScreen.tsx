import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  HelpCircle, 
  Upload, 
  ShieldCheck, 
  User, 
  History, 
  LayoutDashboard, 
  Activity,
  X
} from 'lucide-react';

import { Navigation } from './Navigation';
import { Screen } from '../types';

interface UploadScreenProps {
  onNavigate: (screen: Screen) => void;
  onAnalyze: () => void;
  onBack: () => void;
}

export const UploadScreen: React.FC<UploadScreenProps> = ({ onNavigate, onAnalyze, onBack }) => {
  const [modality, setModality] = useState<'mammography' | 'ultrasound'>('mammography');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (uploading && progress < 100) {
      const timer = setTimeout(() => setProgress(p => p + 5), 100);
      return () => clearTimeout(timer);
    } else if (progress >= 100) {
      setUploading(false);
    }
  }, [uploading, progress]);

  const startUpload = () => {
    setUploading(true);
    setProgress(0);
  };

  return (
    <div className="min-h-screen bg-background-dark text-slate-100 flex flex-col font-sans">
      <header className="sticky top-0 z-50 bg-background-dark/80 ios-blur border-b border-primary/10 px-4 py-4 flex items-center justify-between">
        <button onClick={onBack} className="flex items-center justify-center p-2 rounded-full hover:bg-primary/10 transition-colors">
          <ChevronLeft size={24} className="text-primary" />
        </button>
        <h1 className="text-lg font-bold tracking-tight">Scan Upload Portal</h1>
        <button className="flex items-center justify-center p-2 rounded-full hover:bg-primary/10 transition-colors">
          <HelpCircle size={24} className="text-primary" />
        </button>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 ml-1">Imaging Modality</label>
          <div className="flex p-1 bg-primary/10 rounded-xl">
            <button 
              onClick={() => setModality('mammography')}
              className={`flex-1 py-2 text-center text-sm font-medium rounded-lg transition-all ${modality === 'mammography' ? 'bg-primary text-white shadow-sm' : 'text-slate-400'}`}
            >
              Mammography
            </button>
            <button 
              onClick={() => setModality('ultrasound')}
              className={`flex-1 py-2 text-center text-sm font-medium rounded-lg transition-all ${modality === 'ultrasound' ? 'bg-primary text-white shadow-sm' : 'text-slate-400'}`}
            >
              Ultrasound
            </button>
          </div>
        </div>

        <div className="relative group" onClick={startUpload}>
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-primary/20 bg-primary/5 rounded-2xl py-12 px-6 text-center transition-all hover:border-primary/50 cursor-pointer">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
              <Upload size={32} className="text-primary" />
            </div>
            <h3 className="text-lg font-bold mb-1">Tap to upload scans</h3>
            <p className="text-sm text-slate-400 mb-6">Supported: DICOM, JPEG, PNG (Max 50MB)</p>
            <button className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-transform">
              Select Files
            </button>
          </div>
        </div>

        {(uploading || progress > 0) && (
          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <div className="flex items-center gap-2">
                <Activity size={16} className="text-primary animate-spin" />
                <p className="text-sm font-medium">Uploading scans...</p>
              </div>
              <p className="text-xs font-bold text-primary">{progress}%</p>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Selected Images (3)</h3>
            <button className="text-xs font-bold text-primary">Clear All</button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {[
              "https://lh3.googleusercontent.com/aida-public/AB6AXuCNFiEc-bQfxhOMiwa8uQyNzy3S4Tu9FWU5r-XTzk5CmK7XBw2bQKD9cp1mzITEjBbQZoEO9AmIvXfPCLBJ9hZrQRgwAeHly_SPruBwJIGMiO-_bnZSyh5KxlPbvruqTyBKS1QifnMwYa5VmXM6WTq98n0CHIO3OFBpi2bDBqHmj2axUjJMpvcWtHIXqF6zrocGfTbPDKSUARftKvLHlmGiiylMiFPJjYqe3f_sctctXj8rKjntthVfn-euX__2XIRGrJ7mn8h5SFM",
              "https://lh3.googleusercontent.com/aida-public/AB6AXuCVNqXNxhBtw3Zd9Wy9L1iF9ybfUw61JeGTJi-vXOPR8tOpqcQTjoivLx3vXvICR7XIrgIqIv1FhIO8pNjKRpl3QpuGbGI9bn_pcp0gLxNxNncmyX9b7OQfx-fOyvO6ebaQ3Bbt_WYL04x8O_bm_qh9NJEjUYnkHzbu5uY9XGB81I3o7BeJIZRKCabSK5p84zSE9BdnIyT-2octJ0er5M-2FUzPie8VBTvH99ckpTeZ1A4D3fnMlJYsfoRaVAEziEDOH9HwYTSIFjQ",
              "https://lh3.googleusercontent.com/aida-public/AB6AXuAV5oPp9TyfbRHKjyzrDB37QqBgaeQ3VetKf-AClj-kuL--HR2amg_jjhclPUOfxs91S2cTBq-qylvLTehXlcYBOip4grjtWYuUJAt4YkiyvA-0SUXufWuy180ZaqhxHCiYDM7mjVYg8jLPTFZpxvH4mI_0NKaq6UQ9npYkyn6F7Mpd4Rr-PpvdELAjwG9g0cxnMAR4k_o-SCYCDs4M9hSBbmo2XQVOGrwzpgCXvt888RYITqISWp50476olrJKvRqtxy-dgGlMw4A"
            ].map((src, i) => (
              <div key={i} className="relative flex-shrink-0">
                <div className="w-24 h-24 rounded-xl overflow-hidden border border-slate-800 bg-slate-900">
                  <img className="w-full h-full object-cover grayscale opacity-80" src={src} alt="Scan" referrerPolicy="no-referrer" />
                </div>
                <button className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 shadow-md">
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-primary/5 rounded-xl p-4 flex gap-3 items-start">
          <ShieldCheck size={20} className="text-primary shrink-0" />
          <div>
            <h4 className="text-sm font-bold">Secure DICOM Transmission</h4>
            <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">Your data is encrypted end-to-end and HIPAA compliant. Images are used strictly for AI diagnostic assistance.</p>
          </div>
        </div>
      </main>

      <div className="bg-background-dark p-4 border-t border-primary/10 pb-10">
        <button 
          onClick={onAnalyze}
          className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-primary/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          <Activity size={24} />
          Run AI Analysis
        </button>
      </div>

      <Navigation currentScreen="UPLOAD" onNavigate={onNavigate} onPlusClick={() => {}} />
    </div>
  );
};
