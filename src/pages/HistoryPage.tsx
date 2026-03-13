import SubPageLayout from "@/components/SubPageLayout";
import { ChevronRight } from "lucide-react";

const results = [
  { title: "ปกติ — Healthy Kidney", desc: "ไม่พบสัญญาณผิดปกติ", date: "27 ก.พ. 2569 · 09:15 น.", status: "ปกติ", color: "bg-success" },
  { title: "พบ Albumin เบื้องต้น", desc: "แนะนำตรวจซ้ำ", date: "18 ก.พ. 2569 · 14:30 น.", status: "ระวัง", color: "bg-warning" },
  { title: "ปกติ — Healthy Kidney", desc: "ไม่พบสัญญาณผิดปกติ", date: "5 ก.พ. 2569 · 10:00 น.", status: "ปกติ", color: "bg-success" },
  { title: "ปกติ — Healthy Kidney", desc: "ไม่พบสัญญาณผิดปกติ", date: "28 ม.ค. 2569 · 08:45 น.", status: "ปกติ", color: "bg-success" },
  { title: "ความเสี่ยงสูง", desc: "พบทั้ง Albumin และ Glucose", date: "10 ม.ค. 2569 · 11:20 น.", status: "เสี่ยง", color: "bg-destructive" },
];

const statusStyle: Record<string, string> = {
  ปกติ: "bg-success/15 text-success",
  ระวัง: "bg-warning/15 text-warning",
  เสี่ยง: "bg-destructive/15 text-destructive",
};

const HistoryPage = () => (
  <SubPageLayout title="ประวัติการตรวจ">
    <div className="space-y-3">
      {results.map((r, i) => (
        <button key={i} className="w-full bg-card border border-border rounded-xl p-4 flex items-center gap-3 text-left">
          <div className={`w-3 h-3 rounded-full ${r.color} shrink-0`} />
          <div className="flex-1">
            <p className="font-semibold text-sm text-foreground">{r.title}</p>
            <p className="text-xs text-muted-foreground">{r.desc}</p>
            <p className="text-xs text-muted-foreground">{r.date}</p>
          </div>
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${statusStyle[r.status]}`}>
            {r.status}
          </span>
        </button>
      ))}
    </div>
  </SubPageLayout>
);

export default HistoryPage;
