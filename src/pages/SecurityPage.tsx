import SubPageLayout from "@/components/SubPageLayout";
import { useNavigate } from "react-router-dom";
import { Lock, Fingerprint, ShieldCheck, Eye, BellRing, FileText, Trash2, ChevronRight } from "lucide-react";
import { useState } from "react";

const SecurityPage = () => {
  const navigate = useNavigate();
  const [faceId, setFaceId] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [shareHealth, setShareHealth] = useState(true);
  const [securityAlert, setSecurityAlert] = useState(true);

  const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <button
      onClick={onChange}
      className={`w-11 h-6 rounded-full transition-colors relative ${checked ? "bg-primary" : "bg-border"}`}
    >
      <span
        className={`absolute top-0.5 w-5 h-5 rounded-full bg-card shadow transition-transform ${
          checked ? "translate-x-[22px]" : "translate-x-0.5"
        }`}
      />
    </button>
  );

  return (
    <SubPageLayout title="ความปลอดภัยและความเป็นส่วนตัว">
      {/* Banner */}
      <div className="gradient-primary rounded-xl p-5 text-center mb-5">
        <ShieldCheck size={36} className="text-primary-foreground mx-auto mb-2" />
        <h3 className="font-heading font-semibold text-primary-foreground">บัญชีของคุณปลอดภัย</h3>
        <p className="text-xs text-primary-foreground/70 mt-1">ข้อมูลสุขภาพของคุณได้รับการเข้ารหัสและปกป้อง</p>
      </div>

      {/* Security */}
      <p className="text-xs font-semibold text-muted-foreground mb-2 px-1">ความปลอดภัย</p>
      <div className="bg-card border border-border rounded-xl divide-y divide-border mb-5">
        <button onClick={() => navigate("/change-password")} className="w-full flex items-center gap-3 px-4 py-3.5 text-left">
          <Lock size={18} className="text-muted-foreground" />
          <div className="flex-1">
            <p className="text-sm text-foreground">เปลี่ยนรหัสผ่าน</p>
            <p className="text-xs text-muted-foreground">อัปเดตรหัสผ่านของคุณ</p>
          </div>
          <ChevronRight size={16} className="text-muted-foreground" />
        </button>
        <div className="flex items-center gap-3 px-4 py-3.5">
          <Fingerprint size={18} className="text-muted-foreground" />
          <div className="flex-1">
            <p className="text-sm text-foreground">ปลดล็อกด้วย Face ID</p>
            <p className="text-xs text-muted-foreground">เข้าแอปด้วยใบหน้า</p>
          </div>
          <Toggle checked={faceId} onChange={() => setFaceId(!faceId)} />
        </div>
        <div className="flex items-center gap-3 px-4 py-3.5">
          <ShieldCheck size={18} className="text-muted-foreground" />
          <div className="flex-1">
            <p className="text-sm text-foreground">ยืนยันตัวตน 2 ขั้นตอน</p>
            <p className="text-xs text-muted-foreground">เพิ่มความปลอดภัยอีกขั้น</p>
          </div>
          <Toggle checked={twoFactor} onChange={() => setTwoFactor(!twoFactor)} />
        </div>
      </div>

      {/* Privacy */}
      <p className="text-xs font-semibold text-muted-foreground mb-2 px-1">ความเป็นส่วนตัว</p>
      <div className="bg-card border border-border rounded-xl divide-y divide-border mb-5">
        <div className="flex items-center gap-3 px-4 py-3.5">
          <Eye size={18} className="text-muted-foreground" />
          <div className="flex-1">
            <p className="text-sm text-foreground">แชร์ข้อมูลสุขภาพกับเภสัชกร</p>
            <p className="text-xs text-muted-foreground">อนุญาตให้เภสัชกรดูผลตรวจ</p>
          </div>
          <Toggle checked={shareHealth} onChange={() => setShareHealth(!shareHealth)} />
        </div>
        <div className="flex items-center gap-3 px-4 py-3.5">
          <BellRing size={18} className="text-muted-foreground" />
          <div className="flex-1">
            <p className="text-sm text-foreground">แจ้งเตือนความปลอดภัย</p>
            <p className="text-xs text-muted-foreground">รับการแจ้งเตือนเมื่อมีการเข้าใช้งานใหม่</p>
          </div>
          <Toggle checked={securityAlert} onChange={() => setSecurityAlert(!securityAlert)} />
        </div>
        <button onClick={() => navigate("/privacy-policy")} className="w-full flex items-center gap-3 px-4 py-3.5 text-left">
          <FileText size={18} className="text-muted-foreground" />
          <div className="flex-1">
            <p className="text-sm text-foreground">นโยบายความเป็นส่วนตัว</p>
            <p className="text-xs text-muted-foreground">อ่านรายละเอียดนโยบาย</p>
          </div>
          <ChevronRight size={16} className="text-muted-foreground" />
        </button>
      </div>

      {/* Danger zone */}
      <p className="text-xs font-semibold text-destructive mb-2 px-1">โซนอันตราย</p>
      <div className="bg-card border border-border rounded-xl">
        <button className="w-full flex items-center gap-3 px-4 py-3.5 text-left">
          <Trash2 size={18} className="text-destructive" />
          <div className="flex-1">
            <p className="text-sm text-destructive font-medium">ลบบัญชีผู้ใช้</p>
            <p className="text-xs text-muted-foreground">ลบข้อมูลทั้งหมดอย่างถาวร</p>
          </div>
          <ChevronRight size={16} className="text-muted-foreground" />
        </button>
      </div>
    </SubPageLayout>
  );
};

export default SecurityPage;
