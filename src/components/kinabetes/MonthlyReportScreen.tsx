import { ChevronLeft, TrendingUp, Minus, Calendar, Activity, Shield, Droplets } from 'lucide-react';
import { motion } from 'motion/react';

interface MonthlyReportScreenProps {
  onBack: () => void;
}

export default function MonthlyReportScreen({ onBack }: MonthlyReportScreenProps) {
  const monthlyData = [
    { month: 'ก.พ.', tests: 3, normal: 2, warning: 1, danger: 0 },
    { month: 'ม.ค.', tests: 4, normal: 2, warning: 1, danger: 1 },
    { month: 'ธ.ค.', tests: 2, normal: 2, warning: 0, danger: 0 },
  ];

  const current = monthlyData[0];
  const prev = monthlyData[1];
  const improved = prev.danger > current.danger;

  const maxTests = Math.max(...monthlyData.map(d => d.tests));

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-5 py-4">
        <button onClick={onBack} className="text-primary">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-foreground">รายงานสุขภาพรายเดือน</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 space-y-4">
        {/* Month Hero */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl gradient-hero p-5 text-primary-foreground">
          <div className="flex items-center gap-2 mb-2">
            <Calendar size={16} />
            <span className="text-sm text-primary-foreground/80 font-medium">กุมภาพันธ์ 2569</span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-4xl font-bold">{current.tests}</p>
              <p className="text-sm text-primary-foreground/70">การตรวจทั้งหมด</p>
            </div>
            <div className="flex items-center gap-1 bg-primary-foreground/20 rounded-full px-3 py-1.5">
              {improved ? <TrendingUp size={14} /> : <Minus size={14} />}
              <span className="text-xs font-semibold">{improved ? 'ดีขึ้น' : 'คงที่'}</span>
            </div>
          </div>
        </motion.div>

        {/* Summary cards */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="grid grid-cols-3 gap-3">
          {[
            { icon: <Activity size={18} className="text-primary" />, value: current.tests, label: 'ตรวจ', bg: 'bg-accent' },
            { icon: <Shield size={18} className="text-kina-green" />, value: current.normal, label: 'ปกติ', bg: 'bg-kina-green-light' },
            { icon: <Droplets size={18} className="text-kina-amber" />, value: current.warning, label: 'ระวัง', bg: 'bg-kina-amber-light' },
          ].map((c, i) => (
            <div key={i} className="bg-card rounded-2xl p-3 shadow-card flex flex-col items-center">
              <div className={`w-9 h-9 rounded-lg ${c.bg} flex items-center justify-center mb-1.5`}>{c.icon}</div>
              <span className="text-xl font-bold text-foreground">{c.value}</span>
              <span className="text-[11px] text-muted-foreground">{c.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Bar Chart */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card rounded-2xl p-5 shadow-card">
          <h3 className="text-sm font-bold text-foreground mb-4">สรุป 3 เดือนล่าสุด</h3>
          <div className="space-y-3">
            {monthlyData.map((d, i) => (
              <div key={i}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground font-medium w-10">{d.month}</span>
                  <span className="text-muted-foreground">{d.tests} ครั้ง</span>
                </div>
                <div className="flex gap-0.5 h-5 rounded-md overflow-hidden bg-muted">
                  {d.normal > 0 && (
                    <motion.div initial={{ width: 0 }} animate={{ width: `${(d.normal / maxTests) * 100}%` }} transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }} className="bg-kina-green h-full rounded-l-md" />
                  )}
                  {d.warning > 0 && (
                    <motion.div initial={{ width: 0 }} animate={{ width: `${(d.warning / maxTests) * 100}%` }} transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }} className="bg-kina-amber h-full" />
                  )}
                  {d.danger > 0 && (
                    <motion.div initial={{ width: 0 }} animate={{ width: `${(d.danger / maxTests) * 100}%` }} transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }} className="bg-kina-red h-full rounded-r-md" />
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border">
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-kina-green" /><span className="text-[11px] text-muted-foreground">ปกติ</span></div>
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-kina-amber" /><span className="text-[11px] text-muted-foreground">เฝ้าระวัง</span></div>
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-kina-red" /><span className="text-[11px] text-muted-foreground">เสี่ยง</span></div>
          </div>
        </motion.div>

        {/* Detail list */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-card rounded-2xl p-5 shadow-card">
          <h3 className="text-sm font-bold text-foreground mb-3">รายละเอียดเดือนนี้</h3>
          <div className="divide-y divide-border">
            {[
              { date: '27 ก.พ.', result: 'ปกติ', cls: 'bg-kina-green-light text-kina-green' },
              { date: '18 ก.พ.', result: 'พบ Albumin', cls: 'bg-kina-amber-light text-kina-amber' },
              { date: '5 ก.พ.', result: 'ปกติ', cls: 'bg-kina-green-light text-kina-green' },
            ].map((r, i) => (
              <div key={i} className="flex items-center justify-between py-3">
                <span className="text-sm text-foreground">{r.date}</span>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${r.cls}`}>{r.result}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recommendations */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card rounded-2xl p-5 shadow-card">
          <h3 className="text-sm font-bold text-foreground mb-3">💡 คำแนะนำจากระบบ</h3>
          <div className="space-y-2.5">
            <div className="flex items-start gap-2.5">
              <span className="text-kina-green mt-0.5 text-sm">✓</span>
              <p className="text-xs text-muted-foreground leading-relaxed">ความถี่ในการตรวจดีมาก ควรรักษาระดับนี้ไว้</p>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="text-kina-amber mt-0.5 text-sm">!</span>
              <p className="text-xs text-muted-foreground leading-relaxed">พบ Albumin 1 ครั้ง แนะนำให้ดื่มน้ำมากขึ้นและลดอาหารเค็ม</p>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="text-primary mt-0.5 text-sm">→</span>
              <p className="text-xs text-muted-foreground leading-relaxed">ตรวจครั้งถัดไปแนะนำภายใน 2 สัปดาห์</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
