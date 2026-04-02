import SubPageLayout from "@/components/SubPageLayout";
import { useNavigate } from "react-router-dom";
import { MessageCircle, Bell, Sparkles } from "lucide-react";

const notifications = [
  {
    id: "msg",
    icon: MessageCircle,
    title: "ข้อความใหม่จากเภสัชกร",
    desc: "ภญ. สุภาพร ตอบกลับข้อความของคุณแล้ว",
    time: "2 นาทีที่แล้ว",
    unread: true,
    chatId: "1",
  },
  {
    id: "remind",
    icon: Bell,
    title: "ถึงเวลาตรวจประจำสัปดาห์",
    desc: "อย่าลืมตรวจปัสสาวะเพื่อติดตามสุขภาพไตของคุณ",
    time: "1 ชั่วโมงที่แล้ว",
    unread: false,
  },
  {
    id: "update",
    icon: Sparkles,
    title: "อัปเดตระบบใหม่",
    desc: "Kinabetes AI เวอร์ชัน 1.0.5 พร้อมใช้งานแล้ว",
    time: "1 วันที่แล้ว",
    unread: false,
  },
];

const NotificationsPage = () => {
  const navigate = useNavigate();

  const handleClick = (n: (typeof notifications)[0]) => {
    if (n.chatId) {
      navigate(`/chat/${n.chatId}`);
    }
  };

  return (
    <SubPageLayout title="การแจ้งเตือน">
      <div className="space-y-3">
        {notifications.map((n) => {
          const Icon = n.icon;
          return (
            <button
              key={n.id}
              onClick={() => handleClick(n)}
              className="w-full bg-card border border-border rounded-xl p-4 flex items-start gap-3 text-left"
            >
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                <Icon size={20} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-foreground flex items-center gap-1.5">
                  {n.title}
                  {n.unread && <span className="w-2 h-2 bg-notification rounded-full" />}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{n.desc}</p>
                <p className="text-xs text-primary mt-1">{n.time}</p>
              </div>
            </button>
          );
        })}
      </div>
    </SubPageLayout>
  );
};

export default NotificationsPage;
