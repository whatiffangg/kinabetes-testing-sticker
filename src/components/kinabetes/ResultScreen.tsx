import { CheckCircle2, AlertTriangle, AlertCircle, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import type { ResultData } from '@/types/kinabetes';

interface ResultScreenProps {
  result: ResultData;
  onChat: () => void;
  onHome: () => void;
}

const statusConfig = {
  NORMAL: { icon: CheckCircle2, bg: 'bg-kina-green-light', iconColor: 'text-kina-green' },
  ALBUMIN: { icon: AlertTriangle, bg: 'bg-kina-amber-light', iconColor: 'text-kina-amber' },
  HIGH_RISK: { icon: AlertCircle, bg: 'bg-kina-red-light', iconColor: 'text-kina-red' },
};

export default function ResultScreen({ result, onChat, onHome }: ResultScreenProps) {
  const config = statusConfig[result.status];
  const Icon = config.icon;

  return (
    <div className="px-5 py-6 pb-10 space-y-5">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={`rounded-2xl p-6 text-center ${config.bg}`}>
        <div className="w-14 h-14 rounded-full mx-auto flex items-center justify-center bg-card shadow-card">
          <Icon size={28} className={config.iconColor} />
        </div>
        <h2 className="mt-3 text-lg font-bold text-foreground">{result.title}</h2>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{result.message}</p>
      </motion.div>

      <div className="space-y-2">
        {result.indicators.map((ind, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.05 }}
            className="bg-card rounded-xl p-4 shadow-card flex items-center justify-between">
            <span className="text-sm text-foreground font-medium">{ind.label}</span>
            <span className={`text-sm font-semibold ${ind.type === 'normal' ? 'text-kina-green' : ind.type === 'warn' ? 'text-kina-amber' : 'text-kina-red'}`}>{ind.value}</span>
          </motion.div>
        ))}
      </div>

      {result.status !== 'NORMAL' && (
        <button onClick={onChat} className="w-full py-3.5 rounded-xl gradient-primary text-primary-foreground font-semibold flex items-center justify-center gap-2">
          <MessageCircle size={20} /> ปรึกษาแพทย์หญิง (ฟรี)
        </button>
      )}
      <button onClick={onHome} className="w-full py-3.5 rounded-xl bg-muted text-foreground font-semibold">กลับหน้าหลัก</button>
    </div>
  );
}
