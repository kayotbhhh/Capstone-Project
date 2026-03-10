export type Screen = 'LOGIN' | 'DASHBOARD' | 'PATIENT_INFO' | 'UPLOAD' | 'RESULT' | 'RECORDS' | 'ANALYTICS' | 'SETUP' | 'SETTINGS_DETAIL';

export interface PatientData {
  name: string;
  age: string;
  id: string;
  familyHistory: string[];
  symptoms: string;
}
