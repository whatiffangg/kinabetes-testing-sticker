import { ChevronLeft, ChevronRight, Lock, Eye, Shield, Fingerprint, Smartphone, FileText, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface PrivacySecurityScreenProps {
  onBack: () => void;
}

export default function PrivacySecurityScreen({ onBack }: PrivacySecurityScreenProps) {
  const [faceId, setFaceId] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [shareData, setShareData] = useState(true);
  const [notifications, setNotifications] = useState(true);

  const securityItems = [
    { icon: Lock, label: 'เปลี่ยนรหัสผ่าน', desc: 'อัปเดตรหัสผ่านของคุณ', hasToggle: false },
    { icon: Fingerprint, label: 'ปลดล็อกด้วย Face ID', desc: 'เข้าแอปด้วยใบหน้า', hasToggle: true, value: faceId, onChange: setFaceId },
    { icon: Smartphone, label: 'ยืนยันตัวตน 2 ขั้นตอน', desc: 'เพิ่มความปลอดภัยอีกชั้น', hasToggle: true, value: twoFactor, onChange: setTwoFactor },
  ];

  const privacyItems = [
    { icon: Eye, label: 'แชร์ข้อมูลสุขภาพกับแพทย์', desc: 'อนุญาตให้แพทย์ดูผลตรวจ', hasToggle: true, value: shareData, onChange: setShareData },
    { icon: Shield, label: 'แจ้งเตือนความปลอดภัย', desc: 'รับการแจ้งเตือนเมื่อมีการเข้าใช้งานใหม่', hasToggle: true, value: notifications, onChange: setNotifications },
    { icon: FileText, label: 'นโยบายความเป็นส่วนตัว', desc: 'อ่านรายละเอียดนโยบาย', hasToggle: false },
  ];

  const Toggle = ({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) => (
    <button
      onClick={() => onChange(!value)}
      className={`relative w-11 h-6 rounded-full transition-colors ${value ? 'bg-primary' : 'bg-muted'}`}
    >
      <motion.div
        className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow"
        animate={{ left: value ? 22 : 2 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </button>
  );

  const renderSection = (title: string, items: typeof securityItems, delay: number) => (
    <div>
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-1">{title}</p>
      <div className="bg-card rounded-2xl shadow-card overflow-hidden divide-y divide-border">
        {items.map((item, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + i * 0.05 }}
            onClick={item.hasToggle ? undefined : () => {}}
            className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-muted/50 transition-colors"
          >
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <item.icon size={18} className="text-primary" />
            </div>
            <div className="flex-1 text-left">
              <span className="text-sm font-medium text-foreground block">{item.label}</span>
              <span className="text-xs text-muted-foreground">{item.desc}</span>
            </div>
            {item.hasToggle ? (
              <Toggle value={item.value!} onChange={item.onChange!} />
            ) : (
              <ChevronRight size={18} className="text-muted-foreground" />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-5 py-4">
        <button onClick={onBack} className="text-primary">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-foreground">ความปลอดภัยและความเป็นส่วนตัว</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 space-y-6">
        {/* Security Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="gradient-hero rounded-2xl p-5 text-center"
        >
          <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-3">
            <Shield size={28} className="text-primary-foreground" />
          </div>
          <h2 className="text-primary-foreground font-bold text-base">บัญชีของคุณปลอดภัย</h2>
          <p className="text-primary-foreground/80 text-xs mt-1">ข้อมูลสุขภาพของคุณได้รับการเข้ารหัสและปกป้อง</p>
        </motion.div>

        {renderSection('ความปลอดภัย', securityItems, 0.1)}
        {renderSection('ความเป็นส่วนตัว', privacyItems, 0.25)}

        {/* Danger Zone */}
        <div>
          <p className="text-xs font-semibold text-destructive uppercase tracking-wider mb-2 px-1">โซนอันตราย</p>
          <div className="bg-card rounded-2xl shadow-card overflow-hidden">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-destructive/5 transition-colors"
            >
              <div className="w-9 h-9 rounded-xl bg-destructive/10 flex items-center justify-center shrink-0">
                <Trash2 size={18} className="text-destructive" />
              </div>
              <div className="flex-1 text-left">
                <span className="text-sm font-medium text-destructive block">ลบบัญชีผู้ใช้</span>
                <span className="text-xs text-muted-foreground">ลบข้อมูลทั้งหมดอย่างถาวร</span>
              </div>
              <ChevronRight size={18} className="text-muted-foreground" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
