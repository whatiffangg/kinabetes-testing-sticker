import { ChevronLeft, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface PharmacistHistoryScreenProps {
  onBack: () => void;
  onChat: () => void;
}

const chatHistory = [
  { id: 1, name: 'พญ. สุภาพร ชาญเวช', date: '25 ก.พ. 2569', preview: 'ผลตรวจพบ Albumin เล็กน้อย แนะนำลดวิตามินซี...', status: 'เสร็จสิ้น' },
  { id: 2, name: 'พญ. นภัสสร สุขสมบูรณ์', date: '12 ก.พ. 2569', preview: 'สอบถามเรื่องยาลดความดัน...', status: 'เสร็จสิ้น' },
  { id: 3, name: 'พญ. สุภาพร ชาญเวช', date: '5 ม.ค. 2569', preview: 'ผลตรวจความเสี่ยงสูง ต้องการคำแนะนำ...', status: 'เสร็จสิ้น' },
];

export default function PharmacistHistoryScreen({ onBack, onChat }: PharmacistHistoryScreenProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-5 py-4">
        <button onClick={onBack} className="text-primary">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-foreground">แพทย์หญิงที่เคยปรึกษา</h1>
      </div>
      <div className="flex-1 px-5 space-y-3 pb-6">
        {chatHistory.map((chat, i) => (
          <motion.div
            key={chat.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card rounded-2xl p-4 shadow-card"
          >
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-sm font-bold text-foreground">{chat.name}</p>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-kina-green-light text-kina-green">{chat.status}</span>
            </div>
            <p className="text-xs text-muted-foreground">{chat.preview}</p>
            <p className="text-[11px] text-muted-foreground mt-1.5">{chat.date}</p>
          </motion.div>
        ))}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          onClick={onChat}
          className="w-full py-3.5 rounded-xl gradient-primary text-primary-foreground font-semibold flex items-center justify-center gap-2"
        >
          <MessageCircle size={20} />
          เริ่มแชทใหม่
        </motion.button>
      </div>
    </div>
  );
}
