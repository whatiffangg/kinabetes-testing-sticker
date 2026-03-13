import AppLayout from "@/components/AppLayout";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, AlertTriangle, Calendar, ChevronRight, Camera } from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <AppLayout>
      {/* Greeting */}
      <div className="mb-5">
        <h2 className="text-xl font-heading font-bold text-foreground">
          สวัสดีครับ คุณสมชาย 👋
        </h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          ตรวจปัสสาวะล่าสุด: 3 วันที่แล้ว · ผลปกติ
        </p>
      </div>

      {/* Scan CTA */}
      <div className="gradient-primary rounded-xl p-5 mb-5">
        <p className="text-xs font-semibold tracking-wider text-primary-foreground/70 mb-1 uppercase">
          S-Curve Calibration AI
        </p>
        <h3 className="text-lg font-heading font-bold text-primary-foreground mb-1">
          ถ่ายรูปแผ่นแปะเพื่อตรวจ
        </h3>
        <p className="text-sm text-primary-foreground/80 mb-4">
          วางแผ่นแปะคู่กับ Reference Card แล้วถ่ายรูป AI จะวิเคราะห์ค่าอย่างแม่นยำ
        </p>
        <button
          onClick={() => navigate("/scan")}
          className="bg-primary-foreground/20 hover:bg-primary-foreground/30 transition-colors text-primary-foreground font-semibold px-5 py-2.5 rounded-lg flex items-center gap-2 text-sm"
        >
          <Camera size={18} />
          เริ่มสแกนเลย
        </button>
        <p className="text-xs text-primary-foreground/60 mt-2.5 flex items-center gap-1">
          ⓘ ต้องใช้ Reference Card ทุกครั้ง
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { icon: CheckCircle2, color: "text-success", value: "12", label: "ผลปกติ" },
          { icon: AlertTriangle, color: "text-warning", value: "2", label: "ต้องระวัง" },
          { icon: Calendar, color: "text-primary", value: "30", label: "วันต่อไป" },
        ].map((stat) => (
          <div key={stat.label} className="bg-card rounded-xl p-4 text-center border border-border">
            <stat.icon size={24} className={`mx-auto mb-1.5 ${stat.color}`} />
            <p className="text-2xl font-heading font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Results */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-heading font-semibold text-foreground">ผลตรวจล่าสุด</h3>
        <button onClick={() => navigate("/history")} className="text-sm text-primary font-medium">
          ดูทั้งหมด →
        </button>
      </div>
      <button
        onClick={() => navigate("/history")}
        className="w-full bg-card border border-border rounded-xl p-4 flex items-center gap-3 text-left"
      >
        <div className="w-3 h-3 rounded-full bg-success" />
        <div className="flex-1">
          <p className="font-semibold text-sm text-foreground">ปกติ — Healthy Kidney</p>
          <p className="text-xs text-muted-foreground">ไม่พบสัญญาณผิดปกติ</p>
          <p className="text-xs text-muted-foreground">20 ก.พ. 2568 · 08:32 น.</p>
        </div>
        <ChevronRight size={18} className="text-muted-foreground" />
      </button>
    </AppLayout>
  );
};

export default HomePage;
