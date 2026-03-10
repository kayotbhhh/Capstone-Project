import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Screen, PatientData } from './types';
import { LoginScreen } from './components/LoginScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { PatientInfoScreen } from './components/PatientInfoScreen';
import { UploadScreen } from './components/UploadScreen';
import { ResultScreen } from './components/ResultScreen';
import { RecordsScreen } from './components/RecordsScreen';
import { AnalyticsScreen } from './components/AnalyticsScreen';
import { SetupScreen } from './components/SetupScreen';
import { SettingsDetailScreen } from './components/SettingsDetailScreen';

export default function App() {
  const [screen, setScreen] = useState<Screen>('LOGIN');
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [resultBackScreen, setResultBackScreen] = useState<Screen>('DASHBOARD');
  const [selectedSettingId, setSelectedSettingId] = useState<string | null>(null);

  const navigate = (newScreen: Screen) => {
    setScreen(newScreen);
    window.scrollTo(0, 0);
  };

  const selectPatient = (id: string) => {
    setSelectedPatientId(id);
    setResultBackScreen(screen);
    navigate('RESULT');
  };

  const openSetting = (id: string) => {
    setSelectedSettingId(id);
    navigate('SETTINGS_DETAIL');
  };

  return (
    <div className="max-w-md mx-auto min-h-screen relative shadow-2xl overflow-x-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {screen === 'LOGIN' && (
            <LoginScreen onLogin={() => navigate('DASHBOARD')} />
          )}
          {screen === 'DASHBOARD' && (
            <DashboardScreen 
              onNavigate={navigate}
              onUploadNew={() => navigate('PATIENT_INFO')} 
              onSelectPatient={selectPatient}
            />
          )}
          {screen === 'RECORDS' && (
            <RecordsScreen 
              onNavigate={navigate}
              onUploadNew={() => navigate('PATIENT_INFO')}
              onSelectPatient={selectPatient}
            />
          )}
          {screen === 'ANALYTICS' && (
            <AnalyticsScreen 
              onNavigate={navigate}
              onUploadNew={() => navigate('PATIENT_INFO')}
            />
          )}
          {screen === 'SETUP' && (
            <SetupScreen 
              onNavigate={navigate}
              onUploadNew={() => navigate('PATIENT_INFO')}
              onLogout={() => navigate('LOGIN')}
              onOpenSetting={openSetting}
            />
          )}
          {screen === 'SETTINGS_DETAIL' && (
            <SettingsDetailScreen 
              settingId={selectedSettingId || 'profile'}
              onBack={() => navigate('SETUP')}
            />
          )}
          {screen === 'PATIENT_INFO' && (
            <PatientInfoScreen 
              onBack={() => navigate('DASHBOARD')}
              onNext={(data) => {
                setPatientData(data);
                navigate('UPLOAD');
              }} 
            />
          )}
          {screen === 'UPLOAD' && (
            <UploadScreen 
              onNavigate={navigate}
              onBack={() => navigate('PATIENT_INFO')}
              onAnalyze={() => {
                setResultBackScreen('DASHBOARD');
                navigate('RESULT');
              }} 
            />
          )}
          {screen === 'RESULT' && (
            <ResultScreen 
              onNavigate={navigate}
              onBack={() => navigate(resultBackScreen)}
              onUploadNew={() => navigate('PATIENT_INFO')}
              patientId={selectedPatientId || 'PX-8821'}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

