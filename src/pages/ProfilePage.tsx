import SubPageLayout from "@/components/SubPageLayout";
import { useNavigate } from "react-router-dom";
import { History, FileText, Stethoscope, Bell, Shield, LogOut, ChevronRight, User } from "lucide-react";

const ProfilePage = () => {
  const navigate = useNavigate();

  const healthItems = [
    { icon: History, label: "ประวัติการตรวจทั้งหมด", path: "/history" },
    { icon: FileText, label: "รายงานสุขภาพรายเดือน", path: "/report" },
    { icon: Stethoscope, label: "เภสัชกรที่เคยปรึกษา", path: "/pharmacist" },
  ];

  const settingsItems = [
    { icon: Bell, label: "การแจ้งเตือน", path: "/notifications" },
    { icon: Shield, label: "ความปลอดภัยและความเป็นส่วนตัว", path: "/security" },
  ];

  return (
    <SubPageLayout title="บัญชีผู้ใช้">
      {/* Avatar */}
      <div className="flex flex-col items-center py-6">
        <div className="w-24 h-24 rounded-2xl gradient-primary flex items-center justify-center mb-3 relative">
          <User size={44} className="text-primary-foreground" />
          <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-primary flex items-center justify-center border-2 border-card">
            <span className="text-primary-foreground text-[10px]">✏️</span>
          </div>
        </div>
        <h2 className="font-heading font-semibold text-foreground">คุณสิรกุต กุหลาบเพ็ชรเงิน</h2>
        <p className="text-sm text-muted-foreground">sirakut.k@email.com</p>
        <button className="text-sm text-primary font-medium mt-1">แก้ไขโปรไฟล์</button>
      </div>

      {/* Health section */}
      <p className="text-xs font-semibold text-muted-foreground mb-2 px-1">ข้อมูลสุขภาพ</p>
      <div className="bg-card border border-border rounded-xl divide-y divide-border mb-5">
        {healthItems.map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
          >
            <item.icon size={18} className="text-muted-foreground" />
            <span className="flex-1 text-sm text-foreground">{item.label}</span>
            <ChevronRight size={16} className="text-muted-foreground" />
          </button>
        ))}
      </div>

      {/* Settings section */}
      <p className="text-xs font-semibold text-muted-foreground mb-2 px-1">ตั้งค่าแอป</p>
      <div className="bg-card border border-border rounded-xl divide-y divide-border mb-5">
        {settingsItems.map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
          >
            <item.icon size={18} className="text-muted-foreground" />
            <span className="flex-1 text-sm text-foreground">{item.label}</span>
            <ChevronRight size={16} className="text-muted-foreground" />
          </button>
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl">
        <button className="w-full flex items-center gap-3 px-4 py-3.5 text-left">
          <LogOut size={18} className="text-destructive" />
          <span className="flex-1 text-sm text-destructive font-medium">ออกจากระบบ</span>
          <ChevronRight size={16} className="text-muted-foreground" />
        </button>
      </div>
    </SubPageLayout>
  );
};

export default ProfilePage;
