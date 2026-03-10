import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  HelpCircle, 
  Upload, 
  ShieldCheck, 
  Activity
} from 'lucide-react';

import { Navigation } from './Navigation';
import { Screen } from '../types';

interface UploadScreenProps {
  onNavigate: (screen: Screen, data?: any) => void;
  onAnalyze: () => void;
  onBack: () => void;
}

export const UploadScreen: React.FC<UploadScreenProps> = ({ onNavigate, onBack }) => {

  const [modality, setModality] = useState<'mammography' | 'ultrasound'>('mammography');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {

    if (uploading && progress < 100) {
      const timer = setTimeout(() => setProgress(p => p + 5), 100);
      return () => clearTimeout(timer);
    }

    if (progress >= 100) {
      setUploading(false);
    }

  }, [uploading, progress]);


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    const file = event.target.files?.[0];

    if (!file) return;

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));

    setUploading(true);
    setProgress(0);

  };


  const runAnalysis = async () => {

    if (!selectedFile) {
      alert("Please upload a scan first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {

      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        body: formData
      });

      const result = await response.json();

      onNavigate("RESULT", {
      image: preview,
      prediction: result.prediction,
      confidence: result.confidence
    });

    } catch (error) {

      console.error("Prediction error:", error);
      alert("AI analysis failed.");

    }

  };


  return (

    <div className="min-h-screen bg-background-dark text-slate-100 flex flex-col font-sans">

      <header className="sticky top-0 z-50 bg-background-dark/80 ios-blur border-b border-primary/10 px-4 py-4 flex items-center justify-between">
        
        <button onClick={onBack} className="flex items-center justify-center p-2 rounded-full hover:bg-primary/10 transition-colors">
          <ChevronLeft size={24} className="text-primary" />
        </button>

        <h1 className="text-lg font-bold tracking-tight">
          Scan Upload Portal
        </h1>

        <button className="flex items-center justify-center p-2 rounded-full hover:bg-primary/10 transition-colors">
          <HelpCircle size={24} className="text-primary" />
        </button>

      </header>


      <main className="flex-1 overflow-y-auto px-4 py-6 space-y-6">


        <div className="space-y-2">

          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 ml-1">
            Imaging Modality
          </label>

          <div className="flex p-1 bg-primary/10 rounded-xl">

            <button 
              onClick={() => setModality('mammography')}
              className={`flex-1 py-2 text-center text-sm font-medium rounded-lg transition-all ${
                modality === 'mammography'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-slate-400'
              }`}
            >
              Mammography
            </button>

            <button 
              onClick={() => setModality('ultrasound')}
              className={`flex-1 py-2 text-center text-sm font-medium rounded-lg transition-all ${
                modality === 'ultrasound'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-slate-400'
              }`}
            >
              Ultrasound
            </button>

          </div>

        </div>



        <div className="relative group">

          <div className="flex flex-col items-center justify-center border-2 border-dashed border-primary/20 bg-primary/5 rounded-2xl py-12 px-6 text-center transition-all hover:border-primary/50 cursor-pointer">

            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
              <Upload size={32} className="text-primary" />
            </div>

            <h3 className="text-lg font-bold mb-1">
              Tap to upload scans
            </h3>

            <p className="text-sm text-slate-400 mb-6">
              Supported: DICOM, JPEG, PNG (Max 50MB)
            </p>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-transform"
            >
              Select Files
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

          </div>

        </div>



        {(uploading || progress > 0) && (

          <div className="space-y-3">

            <div className="flex justify-between items-end">

              <div className="flex items-center gap-2">
                <Activity size={16} className="text-primary animate-spin" />
                <p className="text-sm font-medium">
                  Uploading scans...
                </p>
              </div>

              <p className="text-xs font-bold text-primary">
                {progress}%
              </p>

            </div>

            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">

              <div
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />

            </div>

          </div>

        )}



        {preview && (

          <div className="space-y-3">

            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              Selected Image
            </h3>

            <div className="w-32 h-32 rounded-xl overflow-hidden border border-slate-800 bg-slate-900">

              <img
                src={preview}
                className="w-full h-full object-cover"
              />

            </div>

          </div>

        )}



        <div className="bg-primary/5 rounded-xl p-4 flex gap-3 items-start">

          <ShieldCheck size={20} className="text-primary shrink-0" />

          <div>

            <h4 className="text-sm font-bold">
              Secure DICOM Transmission
            </h4>

            <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
              Your data is encrypted end-to-end and HIPAA compliant. Images are used strictly for AI diagnostic assistance.
            </p>

          </div>

        </div>

      </main>



      <div className="bg-background-dark p-4 border-t border-primary/10 pb-10">

        <button 
          onClick={runAnalysis}
          className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-primary/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          <Activity size={24} />
          Run AI Analysis
        </button>

      </div>


      <Navigation
        currentScreen="UPLOAD"
        onNavigate={onNavigate}
        onPlusClick={() => {}}
      />

    </div>

  );

};