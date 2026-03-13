import SubPageLayout from "@/components/SubPageLayout";
import { Activity, CheckCircle2, AlertTriangle, Calendar } from "lucide-react";

const ReportPage = () => {
  const months = [
    { label: "ก.พ.", count: 3, normal: 2, warning: 1, danger: 0 },
    { label: "ม.ค.", count: 4, normal: 2, warning: 1, danger: 1 },
    { label: "ธ.ค.", count: 2, normal: 2, warning: 0, danger: 0 },
  ];

  return (
    <SubPageLayout title="รายงานสุขภาพรายเดือน">
      {/* Header card */}
      <div className="gradient-primary rounded-xl p-5 mb-5">
        <div className="flex items-center gap-2 text-primary-foreground/70 text-xs mb-1">
          <Calendar size={14} />
          กุมภาพันธ์ 2569
        </div>
        <p className="text-3xl font-heading font-bold text-primary-foreground">3</p>
        <p className="text-sm text-primary-foreground/70">การตรวจทั้งหมด</p>
        <div className="mt-3 bg-primary-foreground/15 text-primary-foreground text-xs font-medium px-3 py-1.5 rounded-full w-fit flex items-center gap-1">
          📈 ดีขึ้น
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { icon: Activity, value: "3", label: "ตรวจ", color: "text-primary" },
          { icon: CheckCircle2, value: "2", label: "ปกติ", color: "text-success" },
          { icon: AlertTriangle, value: "1", label: "ระวัง", color: "text-warning" },
        ].map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-4 text-center">
            <s.icon size={22} className={`mx-auto mb-1 ${s.color}`} />
            <p className="text-xl font-heading font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div className="bg-card border border-border rounded-xl p-5 mb-5">
        <h3 className="font-heading font-semibold text-foreground mb-4">สรุป 3 เดือนล่าสุด</h3>
        {months.map((m) => {
          const total = Math.max(m.count, 1);
          return (
            <div key={m.label} className="mb-3">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>{m.label}</span>
                <span>{m.count} ครั้ง</span>
              </div>
              <div className="flex h-5 rounded-full overflow-hidden bg-muted">
                {m.normal > 0 && <div className="bg-success" style={{ width: `${(m.normal / total) * 100}%` }} />}
                {m.warning > 0 && <div className="bg-warning" style={{ width: `${(m.warning / total) * 100}%` }} />}
                {m.danger > 0 && <div className="bg-destructive" style={{ width: `${(m.danger / total) * 100}%` }} />}
              </div>
            </div>
          );
        })}
        <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-success" /> ปกติ</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-warning" /> เฝ้าระวัง</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-destructive" /> เสี่ยง</span>
        </div>
      </div>
    </SubPageLayout>
  );
};

export default ReportPage;
