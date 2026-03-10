import React, { useState } from 'react';
import { ChevronLeft, ShieldCheck, Lock, Bell, User, Moon, Globe, Smartphone, HelpCircle, FileText } from 'lucide-react';
import { Screen } from '../types';

interface SettingsDetailScreenProps {
  settingId: string;
  onBack: () => void;
}

export const SettingsDetailScreen: React.FC<SettingsDetailScreenProps> = ({ settingId, onBack }) => {
  // State for notifications
  const [notifications, setNotifications] = useState([
    { id: 'analysis', label: 'New Analysis Ready', desc: 'Alert when AI completes a scan analysis', active: true },
    { id: 'updates', label: 'Patient Updates', desc: 'Changes to patient medical history', active: true },
    { id: 'alerts', label: 'System Alerts', desc: 'Maintenance and security updates', active: false },
    { id: 'summary', label: 'Weekly Summary', desc: 'Performance and screening metrics', active: true },
  ]);

  // State for appearance
  const [appearance, setAppearance] = useState('Dark Mode');

  // State for language
  const [language, setLanguage] = useState('English (US)');

  // State for 2FA
  const [is2FAEnabled, setIs2FAEnabled] = useState(true);

  const toggleNotification = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, active: !n.active } : n));
  };

  const getSettingContent = () => {
    switch (settingId) {
      case 'profile':
        return {
          title: 'Profile Information',
          icon: User,
          content: (
            <div className="space-y-6">
              <div className="flex flex-col items-center py-6">
                <div className="size-24 rounded-full overflow-hidden border-4 border-primary/20 mb-4">
                  <img src="https://picsum.photos/seed/doctor/200/200" alt="Dr. Sarah Jenkins" referrerPolicy="no-referrer" />
                </div>
                <button className="text-primary text-sm font-bold">Change Photo</button>
              </div>
              <div className="space-y-4">
                <div className="space-y-1.5 px-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Full Name</label>
                  <input readOnly value="Dr. Sarah Jenkins" className="w-full bg-slate-800/50 border border-white/5 rounded-2xl py-4 px-5 text-white outline-none" />
                </div>
                <div className="space-y-1.5 px-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Medical License ID</label>
                  <input readOnly value="ML-8821-XJ" className="w-full bg-slate-800/50 border border-white/5 rounded-2xl py-4 px-5 text-white outline-none" />
                </div>
                <div className="space-y-1.5 px-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
                  <input readOnly value="s.jenkins@medical.org" className="w-full bg-slate-800/50 border border-white/5 rounded-2xl py-4 px-5 text-white outline-none" />
                </div>
              </div>
            </div>
          )
        };
      case 'notifications':
        return {
          title: 'Notifications',
          icon: Bell,
          content: (
            <div className="space-y-4">
              {notifications.map((item) => (
                <button 
                  key={item.id} 
                  onClick={() => toggleNotification(item.id)}
                  className="w-full bg-slate-800/50 border border-white/5 rounded-3xl p-5 flex items-center justify-between text-left"
                >
                  <div className="space-y-1">
                    <h4 className="font-bold text-white">{item.label}</h4>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
                  <div className={`w-12 h-6 rounded-full relative transition-colors ${item.active ? 'bg-primary' : 'bg-slate-700'}`}>
                    <div className={`absolute top-1 size-4 bg-white rounded-full transition-all ${item.active ? 'right-1' : 'left-1'}`}></div>
                  </div>
                </button>
              ))}
            </div>
          )
        };
      case 'security':
        return {
          title: 'Security',
          icon: ShieldCheck,
          content: (
            <div className="space-y-4">
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-3xl p-5 flex gap-4 items-start">
                <ShieldCheck className="text-emerald-500 shrink-0" size={24} />
                <div>
                  <h4 className="font-bold text-emerald-500">Security Status: {is2FAEnabled ? 'High' : 'Moderate'}</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    {is2FAEnabled 
                      ? 'Your account is protected by 2FA and hardware security keys.' 
                      : 'Enable Two-Factor Authentication to better protect your medical data.'}
                  </p>
                </div>
              </div>
              <button className="w-full bg-slate-800/50 border border-white/5 rounded-3xl p-5 flex items-center justify-between">
                <span className="font-bold text-white">Change Password</span>
                <ChevronLeft size={20} className="text-slate-600 rotate-180" />
              </button>
              <button 
                onClick={() => setIs2FAEnabled(!is2FAEnabled)}
                className="w-full bg-slate-800/50 border border-white/5 rounded-3xl p-5 flex items-center justify-between"
              >
                <span className="font-bold text-white">Two-Factor Auth</span>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-bold ${is2FAEnabled ? 'text-emerald-500' : 'text-slate-500'}`}>
                    {is2FAEnabled ? 'ENABLED' : 'DISABLED'}
                  </span>
                  <div className={`w-12 h-6 rounded-full relative transition-colors ${is2FAEnabled ? 'bg-primary' : 'bg-slate-700'}`}>
                    <div className={`absolute top-1 size-4 bg-white rounded-full transition-all ${is2FAEnabled ? 'right-1' : 'left-1'}`}></div>
                  </div>
                </div>
              </button>
            </div>
          )
        };
      case 'appearance':
        return {
          title: 'Appearance',
          icon: Moon,
          content: (
            <div className="space-y-4">
              {['System Default', 'Light Mode', 'Dark Mode', 'OLED Black'].map((mode) => (
                <button 
                  key={mode} 
                  onClick={() => setAppearance(mode)}
                  className="w-full bg-slate-800/50 border border-white/5 rounded-3xl p-5 flex items-center justify-between"
                >
                  <span className="font-bold text-white">{mode}</span>
                  <div className={`size-5 rounded-full border-2 flex items-center justify-center ${appearance === mode ? 'border-primary' : 'border-white/10'}`}>
                    {appearance === mode && <div className="size-2.5 bg-primary rounded-full"></div>}
                  </div>
                </button>
              ))}
            </div>
          )
        };
      case 'language':
        return {
          title: 'Language',
          icon: Globe,
          content: (
            <div className="space-y-4">
              {['English (US)', 'Spanish (ES)', 'French (FR)', 'German (DE)', 'Japanese (JP)'].map((lang) => (
                <button 
                  key={lang} 
                  onClick={() => setLanguage(lang)}
                  className="w-full bg-slate-800/50 border border-white/5 rounded-3xl p-5 flex items-center justify-between"
                >
                  <span className="font-bold text-white">{lang}</span>
                  <div className={`size-5 rounded-full border-2 flex items-center justify-center ${language === lang ? 'border-primary' : 'border-white/10'}`}>
                    {language === lang && <div className="size-2.5 bg-primary rounded-full"></div>}
                  </div>
                </button>
              ))}
            </div>
          )
        };
      case 'help':
        return {
          title: 'Help Center',
          icon: HelpCircle,
          content: (
            <div className="space-y-4">
              <div className="bg-primary/10 border border-primary/20 rounded-3xl p-6 text-center">
                <HelpCircle className="text-primary mx-auto mb-3" size={40} />
                <h4 className="font-bold text-white text-lg">How can we help?</h4>
                <p className="text-sm text-slate-400 mt-2">Search our documentation or contact our 24/7 technical support team.</p>
              </div>
              <div className="space-y-3">
                {['Getting Started Guide', 'AI Analysis Methodology', 'DICOM Upload Troubleshooting', 'HIPAA Compliance FAQ'].map((topic) => (
                  <button key={topic} className="w-full bg-slate-800/50 border border-white/5 rounded-3xl p-5 flex items-center justify-between">
                    <span className="font-bold text-white">{topic}</span>
                    <FileText size={18} className="text-slate-600" />
                  </button>
                ))}
              </div>
            </div>
          )
        };
      case 'privacy':
        return {
          title: 'Privacy Policy',
          icon: Lock,
          content: (
            <div className="space-y-6">
              <div className="bg-slate-800/50 border border-white/5 rounded-3xl p-6 space-y-4">
                <h4 className="font-bold text-white">Data Protection Commitment</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  We take patient privacy seriously. All medical data is processed in accordance with HIPAA and GDPR standards.
                </p>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Imaging data is encrypted using AES-256 both in transit and at rest. We do not sell or share patient data with third parties.
                </p>
                <div className="pt-4 border-t border-white/5">
                  <p className="text-xs text-slate-500 italic">Last updated: January 15, 2024</p>
                </div>
              </div>
              <button className="w-full bg-primary text-white font-bold py-4 rounded-3xl">Download Full Policy (PDF)</button>
            </div>
          )
        };
      default:
        return {
          title: 'Settings',
          icon: Smartphone,
          content: <div className="text-center py-20 text-slate-500">Content for {settingId} coming soon.</div>
        };
    }
  };

  const { title, icon: Icon, content } = getSettingContent();

  return (
    <div className="min-h-screen bg-background-dark text-slate-100 pb-10">
      <header className="sticky top-0 z-50 bg-background-dark/80 ios-blur border-b border-white/5 px-6 py-6 flex items-center gap-4">
        <button onClick={onBack} className="size-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300">
          <ChevronLeft size={24} />
        </button>
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <Icon size={18} />
          </div>
          <h2 className="text-lg font-bold text-white">{title}</h2>
        </div>
      </header>

      <main className="px-6 py-8">
        {content}
      </main>
      
      <div className="px-6 mt-10">
        <div className="bg-primary/5 rounded-xl p-4 flex gap-3 items-start border border-primary/10">
          <ShieldCheck size={20} className="text-primary shrink-0" />
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-primary">End-to-End Encryption</h4>
            <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">This is a secure end-screen. All changes are saved locally and synced with your secure medical portal.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
