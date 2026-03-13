import { ChevronLeft, MessageCircle, Bell, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface NotificationsScreenProps {
  onBack: () => void;
  onChat: () => void;
}

const notifications = [
  {
    id: 1,
    icon: <MessageCircle size={22} className="text-primary" />,
    title: 'ข้อความใหม่จากแพทย์หญิง',
    desc: 'พญ. สุภาพร ตอบกลับข้อความของคุณแล้ว',
    time: '2 นาทีที่แล้ว',
    unread: true,
    type: 'chat' as const,
  },
  {
    id: 2,
    icon: <Bell size={22} className="text-kina-amber" />,
    title: 'ถึงเวลาตรวจประจำสัปดาห์',
    desc: 'อย่าลืมตรวจปัสสาวะเพื่อติดตามสุขภาพไตของคุณ',
    time: '1 ชั่วโมงที่แล้ว',
    unread: false,
    type: 'reminder' as const,
  },
  {
    id: 3,
    icon: <Sparkles size={22} className="text-kina-purple" />,
    title: 'อัปเดตระบบใหม่',
    desc: 'Kinabetes AI เวอร์ชัน 1.0.5 พร้อมใช้งานแล้ว',
    time: '1 วันที่แล้ว',
    unread: false,
    type: 'update' as const,
  },
];

export default function NotificationsScreen({ onBack, onChat }: NotificationsScreenProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-5 py-4">
        <button onClick={onBack} className="text-primary">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-foreground">การแจ้งเตือน</h1>
      </div>
      <div className="flex-1 px-5 space-y-3 pb-6">
        {notifications.map((n, i) => (
          <motion.button
            key={n.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={n.type === 'chat' ? onChat : undefined}
            className="w-full bg-card rounded-2xl p-4 shadow-card flex items-start gap-3.5 text-left hover:shadow-elevated transition-shadow"
          >
            <div className="w-11 h-11 rounded-full bg-muted flex items-center justify-center shrink-0">
              {n.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-foreground">{n.title}</p>
                {n.unread && <span className="w-2 h-2 rounded-full bg-primary shrink-0" />}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{n.desc}</p>
              <p className="text-[11px] text-primary mt-1">{n.time}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
