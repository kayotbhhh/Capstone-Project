import React from 'react';
import { 
  ChevronLeft, 
  ShieldCheck, 
  History, 
  LayoutDashboard, 
  Search, 
  MoreHorizontal, 
  Share2, 
  Download, 
  Printer, 
  Edit3
} from 'lucide-react';

import { Navigation } from './Navigation';
import { Screen } from '../types';

interface ResultScreenProps {
  onNavigate: (screen: Screen) => void;
  onBack: () => void;
  onUploadNew: () => void;
  patientId: string;

  image?: string;
  prediction?: string;
  confidence?: number;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  onNavigate,
  onBack,
  onUploadNew,
  patientId,
  image,
  prediction,
  confidence
}) => {

  const confPercent = confidence ? Math.round(confidence * 100) : 0;

  const downloadReport = async () => {

    const response = await fetch("http://127.0.0.1:8000/generate-report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prediction,
        confidence
      })
    });

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "AI_Breast_Cancer_Report.pdf";
    a.click();
  };

  return (
    <div className="min-h-screen bg-background-dark text-slate-100 font-sans pb-24">

      <header className="sticky top-0 z-50 bg-background-dark/80 ios-blur border-b border-white/5 px-4 py-4 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <button onClick={onBack} className="size-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300">
            <ChevronLeft size={24} />
          </button>

          <div>
            <h2 className="text-sm font-bold text-white">
              Patient ID: #{patientId}
            </h2>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Analysis Result • May 24, 2024
            </p>
          </div>

        </div>

        <div className="flex items-center gap-2">
          <button className="size-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300">
            <Share2 size={20} />
          </button>
          <button className="size-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300">
            <MoreHorizontal size={20} />
          </button>
        </div>

      </header>



      <main className="px-4 py-6 space-y-6">


        {/* Uploaded Image */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 aspect-square bg-black">

          {image && (
            <img
              src={image}
              alt="Uploaded scan"
              className="w-full h-full object-contain"
            />
          )}

          {/* AI overlay box */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="w-24 h-24 border-2 border-red-500 rounded-lg shadow-[0_0_20px_rgba(239,68,68,0.5)]"></div>
              <div className="absolute -top-8 left-0 bg-red-500 text-white px-2 py-1 rounded text-[8px] font-bold whitespace-nowrap shadow-lg">
                HIGH SUSPICION (ROI_1)
              </div>
            </div>
          </div>

        </div>



        <div className="flex items-center justify-between px-1">

          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            AI Analysis: Active Overlays (1 Detected)
          </p>

          <div className="flex items-center gap-1.5">
            <div className="size-1.5 bg-emerald-500 rounded-full"></div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              Model V4.2.1 Stable
            </p>
          </div>

        </div>



        {/* Prediction Result */}
        <div className="bg-slate-800/50 border border-white/5 rounded-3xl p-6 flex items-center justify-between">

          <div>

            <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">
              AI Classification
            </p>

            <h3 className={`text-3xl font-bold ${prediction === "Malignant" ? "text-red-500" : "text-emerald-400"}`}>
              {prediction}
            </h3>

            <p className="text-xs text-slate-400 mt-1">
              Model diagnostic confidence
            </p>

          </div>



          {/* Confidence Circle */}
          <div className="relative size-20">

            <svg className="size-full -rotate-90" viewBox="0 0 36 36">

              <path
                className="text-slate-700"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />

              <path
                className="text-primary"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray={`${confPercent}, 100`}
                strokeLinecap="round"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />

            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-bold text-white">
                {confPercent}
              </span>
              <span className="text-[6px] font-bold text-slate-500 uppercase">
                Conf. %
              </span>
            </div>

          </div>

        </div>



        <div className="flex gap-3">
          
        <button
          onClick={downloadReport}
          className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
        >
          <Download size={20} />
          <span>Download PDF Report</span>
        </button>

          <button className="size-14 bg-slate-800 rounded-2xl flex items-center justify-center text-slate-300 border border-white/5">
            <Printer size={24} />
          </button>

        </div>



        <div className="bg-primary/5 rounded-xl p-3 flex items-center justify-center gap-2 border border-primary/10">

          <ShieldCheck size={14} className="text-primary" />

          <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">
            HIPAA Compliant • AES-256 Encrypted
          </span>

        </div>

      </main>



      <Navigation
        currentScreen="RESULT"
        onNavigate={onNavigate}
        onPlusClick={onUploadNew}
      />

    </div>
  );
};