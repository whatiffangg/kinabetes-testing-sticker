import { ChevronLeft, ChevronRight, History, FileText, Stethoscope, Bell, Shield, LogOut, User, Pencil } from 'lucide-react';
import { motion } from 'motion/react';

interface AccountScreenProps {
  onBack: () => void;
  onHistory: () => void;
  onMonthlyReport: () => void;
  onPharmacistHistory: () => void;
  onNotifications: () => void;
  onPrivacySecurity: () => void;
}

export default function AccountScreen({ onBack, onHistory, onMonthlyReport, onPharmacistHistory, onNotifications, onPrivacySecurity }: AccountScreenProps) {
  const healthMenu = [
    { icon: History, label: 'ประวัติการตรวจทั้งหมด', action: onHistory },
    { icon: FileText, label: 'รายงานสุขภาพรายเดือน', action: onMonthlyReport },
    { icon: Stethoscope, label: 'แพทย์หญิงที่เคยปรึกษา', action: onPharmacistHistory },
  ];

  const settingsMenu = [
    { icon: Bell, label: 'การแจ้งเตือน', action: onNotifications },
    { icon: Shield, label: 'ความปลอดภัยและความเป็นส่วนตัว', action: onPrivacySecurity },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-5 py-4">
        <button onClick={onBack} className="text-primary">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-foreground">บัญชีผู้ใช้</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 space-y-6">
        {/* Profile */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center py-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl gradient-hero flex items-center justify-center text-primary-foreground">
              <User size={36} />
            </div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-elevated">
              <Pencil size={12} />
            </button>
          </div>
          <h2 className="mt-3 text-lg font-bold text-foreground">คุณสมชาย รักสุขภาพ</h2>
          <p className="text-sm text-muted-foreground">somchai.h@email.com</p>
          <button className="text-sm text-primary font-medium mt-1">แก้ไขโปรไฟล์</button>
        </motion.div>

        {/* Health Section */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-1">ข้อมูลสุขภาพ</p>
          <div className="bg-card rounded-2xl shadow-card overflow-hidden divide-y divide-border">
            {healthMenu.map((item, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 + i * 0.03 }}
                onClick={item.action}
                className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-muted/50 transition-colors"
              >
                <item.icon size={20} className="text-primary" />
                <span className="flex-1 text-left text-sm font-medium text-foreground">{item.label}</span>
                <ChevronRight size={18} className="text-muted-foreground" />
              </motion.button>
            ))}
          </div>
        </div>

        {/* Settings Section */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-1">ตั้งค่าแอป</p>
          <div className="bg-card rounded-2xl shadow-card overflow-hidden divide-y divide-border">
            {settingsMenu.map((item, i) => (
              <button key={i} onClick={item.action} className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-muted/50 transition-colors">
                <item.icon size={20} className="text-muted-foreground" />
                <span className="flex-1 text-left text-sm font-medium text-foreground">{item.label}</span>
                <ChevronRight size={18} className="text-muted-foreground" />
              </button>
            ))}
            <button className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-muted/50 transition-colors">
              <LogOut size={20} className="text-destructive" />
              <span className="flex-1 text-left text-sm font-medium text-destructive">ออกจากระบบ</span>
              <ChevronRight size={18} className="text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
