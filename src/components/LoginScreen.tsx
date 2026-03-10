import React from 'react';
import { 
  ChevronLeft, 
  ShieldCheck, 
  ArrowRight, 
  Fingerprint,
  Smile,
  Mail,
  Lock,
  Eye,
  Microscope
} from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen w-full flex flex-col medical-gradient relative overflow-hidden">
      <div className="flex items-center px-4 pt-6 pb-2 justify-between">
        <div className="text-slate-400 flex size-10 items-center justify-center rounded-full bg-slate-800/50 hover:bg-slate-800 cursor-pointer">
          <ChevronLeft size={24} />
        </div>
        <div className="flex items-center gap-1 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
          <ShieldCheck size={16} className="text-primary" />
          <span className="text-[10px] font-bold tracking-wide uppercase text-primary">Secure</span>
        </div>
      </div>

      <div className="flex flex-col items-center px-6 pt-8 pb-10">
        <div className="relative mb-6">
          <div className="absolute -inset-1 bg-gradient-to-tr from-primary to-accent-pink rounded-2xl blur opacity-25"></div>
          <div className="relative w-20 h-20 bg-background-dark rounded-2xl flex items-center justify-center border border-white/10 shadow-2xl">
            <Microscope size={48} className="text-primary" />
          </div>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Welcome Back</h1>
        <p className="text-slate-400 text-center max-w-[280px]">Access the Breast Cancer Detection AI Diagnostic Portal</p>
      </div>

      <div className="flex-1 px-6 space-y-5">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300 ml-1">Institutional Email</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            <input 
              className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl py-4 pl-12 pr-4 text-white placeholder-slate-500 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none" 
              placeholder="dr.smith@oncology.org" 
              type="email" 
            />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center px-1">
            <label className="block text-sm font-medium text-slate-300">Secure Password</label>
            <button className="text-xs font-medium text-primary hover:text-primary/80">Forgot?</button>
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            <input 
              className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl py-4 pl-12 pr-12 text-white placeholder-slate-500 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none" 
              placeholder="••••••••••••" 
              type="password" 
            />
            <Eye className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 cursor-pointer" size={20} />
          </div>
        </div>
        <div className="pt-4">
          <button 
            onClick={onLogin}
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
          >
            <span>Sign In to Portal</span>
            <ArrowRight size={20} />
          </button>
        </div>

        <div className="flex flex-col items-center pt-6">
          <p className="text-slate-500 text-xs font-medium uppercase tracking-widest mb-6">Or continue with</p>
          <div className="flex gap-4">
            <button className="size-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-slate-800 transition-colors group">
              <Smile className="text-slate-400 group-hover:text-primary" size={32} />
            </button>
            <button className="size-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-slate-800 transition-colors group">
              <Fingerprint className="text-slate-400 group-hover:text-primary" size={32} />
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 py-8 text-center">
        <p className="text-slate-500 text-sm">
          Need access to the platform? 
          <a className="text-primary font-semibold hover:underline ml-1" href="#">Contact Admin</a>
        </p>
        <div className="mt-6 flex items-center justify-center gap-4 grayscale opacity-40">
          <div className="flex items-center gap-1">
            <ShieldCheck size={14} />
            <span className="text-[10px] font-bold uppercase">HIPAA Compliant</span>
          </div>
          <div className="flex items-center gap-1">
            <Lock size={14} />
            <span className="text-[10px] font-bold uppercase">ISO 27001</span>
          </div>
        </div>
      </div>
    </div>
  );
};
