import { Camera, ChevronRight, CheckCircle2, AlertTriangle, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

interface HomeScreenProps {
  onScan: () => void;
  onChat: () => void;
  onHistory: () => void;
}

export default function HomeScreen({ onScan, onChat, onHistory }: HomeScreenProps) {
  const stats = [
    { value: '12', label: 'ผลปกติ', icon: <CheckCircle2 size={24} className="text-kina-green" />, bg: 'bg-kina-green-light' },
    { value: '2', label: 'ต้องระวัง', icon: <AlertTriangle size={24} className="text-kina-amber" />, bg: 'bg-kina-amber-light' },
    { value: '30', label: 'วันต่อไป', icon: <Calendar size={24} className="text-primary" />, bg: 'bg-accent' },
  ];

  return (
    <div className="px-5 py-5 pb-24 space-y-5">
      {/* Greeting */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-xl font-bold text-foreground">สวัสดีครับ คุณสมชาย 👋</h1>
        <p className="text-sm text-muted-foreground mt-0.5">ตรวจปัสสาวะล่าสุด: 3 วันที่แล้ว · ผลปกติ</p>
      </motion.div>

      {/* Hero Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="rounded-2xl gradient-hero p-5 text-primary-foreground"
      >
        <p className="text-[11px] font-semibold tracking-widest uppercase text-primary-foreground/70 mb-1">S-Curve Calibration AI</p>
        <h2 className="text-lg font-bold leading-snug">ถ่ายรูปแผ่นแปะเพื่อตรวจ</h2>
        <p className="text-sm text-primary-foreground/75 mt-1.5 leading-relaxed">
          วางแผ่นแปะคู่กับ Reference Card แล้วถ่ายรูป AI จะวิเคราะห์ค่าอย่างแม่นยำ
        </p>
        <button
          onClick={onScan}
          className="mt-4 inline-flex items-center gap-2 bg-primary-foreground/20 backdrop-blur-sm rounded-full px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/30 transition-colors"
        >
          <Camera size={18} />
          เริ่มสแกนเลย
        </button>
        <p className="text-[11px] text-primary-foreground/50 mt-2.5 flex items-center gap-1">
          <span className="inline-block w-3.5 h-3.5 rounded-full border border-primary-foreground/40 flex items-center justify-center text-[8px]">i</span>
          ต้องใช้ Reference Card ทุกครั้ง
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-3 gap-3"
      >
        {stats.map((s, i) => (
          <div key={i} className="bg-card rounded-2xl p-4 shadow-card flex flex-col items-center text-center">
            {s.icon}
            <span className="text-2xl font-bold text-foreground mt-1.5">{s.value}</span>
            <span className="text-[11px] text-muted-foreground">{s.label}</span>
          </div>
        ))}
      </motion.div>

      {/* Recent Results */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-foreground">ผลตรวจล่าสุด</h3>
          <button onClick={onHistory} className="text-sm text-primary font-medium flex items-center gap-0.5">
            ดูทั้งหมด <span>→</span>
          </button>
        </div>
        <div className="bg-card rounded-2xl shadow-card overflow-hidden">
          {[
            { status: 'ปกติ', label: 'Healthy Kidney', desc: 'ไม่พบสัญญาณผิดปกติ', date: '20 ก.พ. 2568 · 08:32 น.', color: 'bg-kina-green', dot: '🟢' },
          ].map((item, i) => (
            <button key={i} onClick={onHistory} className="w-full flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors">
              <div className={`w-10 h-10 rounded-full ${item.color}/20 flex items-center justify-center text-lg`}>
                {item.dot}
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold text-foreground">• {item.status} — {item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{item.date}</p>
              </div>
              <ChevronRight size={18} className="text-muted-foreground" />
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
