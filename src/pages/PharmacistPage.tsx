import SubPageLayout from "@/components/SubPageLayout";
import { useNavigate } from "react-router-dom";
import { MessageCircle } from "lucide-react";

const pharmacists = [
  { id: "1", name: "ภญ. สุภาพร ชาญเวช", lastMsg: "ผลตรวจพบ Albumin เล็กน้อย แนะนำลดวิตามินซี...", date: "25 ก.พ. 2569", status: "เสร็จสิ้น" },
  { id: "2", name: "ภญ. นภัสสร สุขสมบูรณ์", lastMsg: "สอบถามเรื่องยาลดความดัน...", date: "12 ก.พ. 2569", status: "เสร็จสิ้น" },
  { id: "3", name: "ภญ. สุภาพร ชาญเวช", lastMsg: "ผลตรวจความเสี่ยงสูง ต้องการคำแนะนำ...", date: "5 ม.ค. 2569", status: "เสร็จสิ้น" },
];

const PharmacistPage = () => {
  const navigate = useNavigate();

  return (
    <SubPageLayout title="เภสัชกรที่เคยปรึกษา">
      <div className="space-y-3">
        {pharmacists.map((p) => (
          <button
            key={p.id + p.date}
            onClick={() => navigate(`/chat/${p.id}`)}
            className="w-full bg-card border border-border rounded-xl p-4 text-left flex items-center justify-between"
          >
            <div>
              <p className="font-semibold text-sm text-foreground">{p.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{p.lastMsg}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{p.date}</p>
            </div>
            <span className="text-xs bg-success/15 text-success font-medium px-2.5 py-1 rounded-full whitespace-nowrap">
              {p.status}
            </span>
          </button>
        ))}
      </div>
      <button
        onClick={() => navigate("/chat/new")}
        className="w-full mt-5 gradient-primary text-primary-foreground font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2"
      >
        <MessageCircle size={20} />
        เริ่มแชทใหม่
      </button>
    </SubPageLayout>
  );
};

export default PharmacistPage;
