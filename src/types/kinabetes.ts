export type AppState =
  | 'HOME'
  | 'CAMERA'
  | 'ANALYZING'
  | 'RESULT'
  | 'CHAT'
  | 'NOTIFICATIONS'
  | 'ACCOUNT'
  | 'HISTORY'
  | 'MONTHLY_REPORT'
  | 'PHARMACIST_HISTORY'
  | 'PRIVACY_SECURITY';

export type AnalysisResult = 'NORMAL' | 'ALBUMIN' | 'HIGH_RISK';

export interface Indicator {
  label: string;
  value: string;
  type: 'normal' | 'warn' | 'danger';
}

export interface ResultData {
  status: AnalysisResult;
  title: string;
  message: string;
  color: string;
  indicators: Indicator[];
}
