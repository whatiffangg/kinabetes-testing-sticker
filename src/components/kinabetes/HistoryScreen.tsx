import { ChevronLeft } from 'lucide-react';
import { motion } from 'motion/react';

interface HistoryScreenProps {
  onBack: () => void;
}

const historyData = [
  { date: '27 ก.พ. 2569', time: '09:15 น.', status: 'NORMAL' as const, label: 'ปกติ — Healthy Kidney', desc: 'ไม่พบสัญญาณผิดปกติ' },
  { date: '18 ก.พ. 2569', time: '14:30 น.', status: 'ALBUMIN' as const, label: 'พบ Albumin เบื้องต้น', desc: 'แนะนำตรวจซ้ำ' },
  { date: '5 ก.พ. 2569', time: '10:00 น.', status: 'NORMAL' as const, label: 'ปกติ — Healthy Kidney', desc: 'ไม่พบสัญญาณผิดปกติ' },
  { date: '28 ม.ค. 2569', time: '08:45 น.', status: 'NORMAL' as const, label: 'ปกติ — Healthy Kidney', desc: 'ไม่พบสัญญาณผิดปกติ' },
  { date: '10 ม.ค. 2569', time: '11:20 น.', status: 'HIGH_RISK' as const, label: 'ความเสี่ยงสูง', desc: 'พบทั้ง Albumin และ Glucose' },
];

const statusStyles = {
  NORMAL: { bg: 'bg-kina-green-light', text: 'text-kina-green', dot: 'bg-kina-green' },
  ALBUMIN: { bg: 'bg-kina-amber-light', text: 'text-kina-amber', dot: 'bg-kina-amber' },
  HIGH_RISK: { bg: 'bg-kina-red-light', text: 'text-kina-red', dot: 'bg-kina-red' },
};

export default function HistoryScreen({ onBack }: HistoryScreenProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-5 py-4">
        <button onClick={onBack} className="text-primary">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-foreground">ประวัติการตรวจ</h1>
      </div>
      <div className="flex-1 px-5 pb-24 space-y-2.5">
        {historyData.map((item, i) => {
          const style = statusStyles[item.status];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="bg-card rounded-2xl p-4 shadow-card flex items-center gap-3"
            >
              <div className={`w-3 h-3 rounded-full ${style.dot} shrink-0`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{item.date} · {item.time}</p>
              </div>
              <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full shrink-0 ${style.bg} ${style.text}`}>
                {item.status === 'NORMAL' ? 'ปกติ' : item.status === 'ALBUMIN' ? 'ระวัง' : 'เสี่ยง'}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
