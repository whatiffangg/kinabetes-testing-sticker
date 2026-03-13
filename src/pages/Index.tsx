import React, { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import HomeScreen from '@/components/kinabetes/HomeScreen';
import CameraScreen from '@/components/kinabetes/CameraScreen';
import AnalyzingScreen from '@/components/kinabetes/AnalyzingScreen';
import ResultScreen from '@/components/kinabetes/ResultScreen';
import ChatScreen from '@/components/kinabetes/ChatScreen';
import NotificationsScreen from '@/components/kinabetes/NotificationsScreen';
import AccountScreen from '@/components/kinabetes/AccountScreen';
import HistoryScreen from '@/components/kinabetes/HistoryScreen';
import MonthlyReportScreen from '@/components/kinabetes/MonthlyReportScreen';
import PharmacistHistoryScreen from '@/components/kinabetes/PharmacistHistoryScreen';
import PrivacySecurityScreen from '@/components/kinabetes/PrivacySecurityScreen';
import BottomNav from '@/components/kinabetes/BottomNav';
import AppHeader from '@/components/kinabetes/AppHeader';
import type { AppState, AnalysisResult, ResultData } from '@/types/kinabetes';

export default function Index() {
  const [state, setState] = useState<AppState>('HOME');
  const [result, setResult] = useState<ResultData | null>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraReady(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("ไม่สามารถเข้าถึงกล้องได้ กรุณาอนุญาตการเข้าถึงกล้อง");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    setIsCameraReady(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        stopCamera();
        setState('ANALYZING');
        analyzeImage();
      }
    }
  };

  const analyzeImage = async () => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    const statuses: AnalysisResult[] = ['NORMAL', 'ALBUMIN', 'HIGH_RISK'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const resultsMap: Record<AnalysisResult, ResultData> = {
      NORMAL: {
        status: 'NORMAL', title: 'Healthy Kidney',
        message: 'ยอดเยี่ยม! ไตของคุณยังกรองของเสียได้ดี ไม่พบน้ำตาลรั่ว ไม่พบโปรตีนในปัสสาวะ ผลตรวจอยู่ในเกณฑ์ปกติทุกค่า',
        color: 'green',
        indicators: [
          { label: 'Albumin', value: 'ปกติ', type: 'normal' },
          { label: 'Glucose', value: 'ปกติ', type: 'normal' },
          { label: 'pH', value: '6.0', type: 'normal' },
        ],
      },
      ALBUMIN: {
        status: 'ALBUMIN', title: 'พบ Albumin',
        message: 'พบสัญญาณเตือนระยะแรก! ไตเริ่มทำงานหนักขึ้น โปรดปรึกษาเภสัชกรผ่านแอปฯ (ฟรี)',
        color: 'yellow',
        indicators: [
          { label: 'Albumin', value: '+1 (สีเขียวมะนาว)', type: 'warn' },
          { label: 'Glucose', value: 'ปกติ', type: 'normal' },
          { label: 'ต้องตรวจซ้ำ', value: 'แนะนำ', type: 'warn' },
        ],
      },
      HIGH_RISK: {
        status: 'HIGH_RISK', title: 'พบทั้งน้ำตาล + โปรตีน',
        message: 'ความเสี่ยงสูง! พบทั้งน้ำตาลและโปรตีนในปัสสาวะ ระบบแนะนำให้ท่านตรวจเลือดยืนยันที่โรงพยาบาลโดยด่วน',
        color: 'red',
        indicators: [
          { label: 'Albumin', value: '++ (สูง)', type: 'danger' },
          { label: 'Glucose', value: '++ (สูง)', type: 'danger' },
          { label: 'ต้องพบแพทย์ด่วน', value: 'ทันที', type: 'danger' },
        ],
      },
    };
    setResult(resultsMap[randomStatus]);
    setState('RESULT');
  };

  const showBottomNav = ['HOME', 'HISTORY'].includes(state);
  const showHeader = state !== 'CAMERA';

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative">
      {showHeader && (
        <AppHeader
          onNotifications={() => setState('NOTIFICATIONS')}
          onAccount={() => setState('ACCOUNT')}
        />
      )}

      <div className={showHeader ? 'min-h-[calc(100vh-56px)]' : 'h-screen'}>
        <AnimatePresence mode="wait">
          {state === 'HOME' && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <HomeScreen onScan={() => { setState('CAMERA'); startCamera(); }} onChat={() => setState('CHAT')} onHistory={() => setState('HISTORY')} />
            </motion.div>
          )}
          {state === 'CAMERA' && (
            <motion.div key="camera" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-screen">
              <CameraScreen videoRef={videoRef} canvasRef={canvasRef} isCameraReady={isCameraReady} onCapture={capturePhoto} onBack={() => { stopCamera(); setState('HOME'); }} />
            </motion.div>
          )}
          {state === 'ANALYZING' && (
            <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-[calc(100vh-56px)] flex">
              <AnalyzingScreen />
            </motion.div>
          )}
          {state === 'RESULT' && result && (
            <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ResultScreen result={result} onChat={() => setState('CHAT')} onHome={() => setState('HOME')} />
            </motion.div>
          )}
          {state === 'CHAT' && (
            <motion.div key="chat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-[calc(100vh-56px)]">
              <ChatScreen onBack={() => setState('HOME')} />
            </motion.div>
          )}
          {state === 'NOTIFICATIONS' && (
            <motion.div key="notifs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <NotificationsScreen onBack={() => setState('HOME')} onChat={() => setState('CHAT')} />
            </motion.div>
          )}
          {state === 'ACCOUNT' && (
            <motion.div key="account" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <AccountScreen onBack={() => setState('HOME')} onHistory={() => setState('HISTORY')} onMonthlyReport={() => setState('MONTHLY_REPORT')} onPharmacistHistory={() => setState('PHARMACIST_HISTORY')} onNotifications={() => setState('NOTIFICATIONS')} onPrivacySecurity={() => setState('PRIVACY_SECURITY')} />
            </motion.div>
          )}
          {state === 'HISTORY' && (
            <motion.div key="history" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <HistoryScreen onBack={() => setState('HOME')} />
            </motion.div>
          )}
          {state === 'MONTHLY_REPORT' && (
            <motion.div key="monthly" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <MonthlyReportScreen onBack={() => setState('ACCOUNT')} />
            </motion.div>
          )}
          {state === 'PHARMACIST_HISTORY' && (
            <motion.div key="pharma" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <PharmacistHistoryScreen onBack={() => setState('ACCOUNT')} onChat={() => setState('CHAT')} />
            </motion.div>
          )}
          {state === 'PRIVACY_SECURITY' && (
            <motion.div key="privacy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <PrivacySecurityScreen onBack={() => setState('ACCOUNT')} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {showBottomNav && (
        <BottomNav
          active={state}
          onHome={() => setState('HOME')}
          onScan={() => { setState('CAMERA'); startCamera(); }}
          onChat={() => setState('CHAT')}
          onHistory={() => setState('HISTORY')}
        />
      )}
    </div>
  );
}
