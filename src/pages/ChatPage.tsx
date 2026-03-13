import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Video, Send } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo.png";

const messages = [
  {
    from: "pharmacist",
    text: "สวัสดีค่ะ ภญ. สุภาพร ยินดีให้บริการค่ะ จากผลตรวจพบ Albumin เบื้องต้น ไม่ต้องกังวลนะคะ\n\nขออนุญาตสอบถามข้อมูลเพิ่มเติมนะคะ ช่วงนี้มีการทานยาหรือวิตามินซีปริมาณมากไหมคะ? เพราะอาจส่งผลต่อการอ่านค่าลีได้ค่ะ",
  },
  { from: "user", text: "ทานวิตามินซี 1000mg ทุกวันครับ" },
];

const ChatPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [input, setInput] = useState("");

  return (
    <div className="min-h-screen bg-background max-w-lg lg:max-w-3xl xl:max-w-5xl mx-auto flex flex-col">
      {/* Header */}
      <header className="sticky top-0 bg-card border-b border-border z-40">
        <div className="flex items-center px-4 md:px-6 lg:px-8 h-14">
          <div className="flex items-center gap-3 px-4 py-2">
            <img src={logo} alt="Kinabetes" className="w-9 h-9 rounded-full" />
            <div>
              <p className="text-sm font-heading font-semibold text-foreground">Kinabetes</p>
              <p className="text-[11px] text-muted-foreground">Testing Sticker AI</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between px-4 md:px-6 lg:px-8 pb-2">
          <div className="flex items-center gap-2">
            <button onClick={() => navigate(-1)}>
              <ChevronLeft size={22} className="text-primary" />
            </button>
            <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground text-xs font-bold">ภ</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">ภญ. สุภาพร ชาญเวช</p>
              <p className="text-xs text-success flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-success rounded-full" />
                กำลังออนไลน์
              </p>
            </div>
          </div>
          <button className="p-2 rounded-full hover:bg-muted">
            <Video size={20} className="text-primary" />
          </button>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 md:px-6 lg:px-8 py-4 space-y-3">
        <p className="text-center text-xs text-muted-foreground">วันนี้</p>
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
            {msg.from === "pharmacist" && (
              <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center mr-2 mt-1 shrink-0">
                <span className="text-primary-foreground text-xs font-bold">ภ</span>
              </div>
            )}
            <div
              className={`max-w-[75%] lg:max-w-[60%] rounded-2xl px-4 py-3 text-sm whitespace-pre-line ${
                msg.from === "user"
                  ? "gradient-primary text-primary-foreground rounded-br-md"
                  : "bg-secondary text-secondary-foreground rounded-bl-md"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="sticky bottom-0 bg-card border-t border-border p-3 md:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="พิมพ์ข้อความ..."
            className="flex-1 bg-muted rounded-full px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground"
          />
          <button className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
            <Send size={18} className="text-primary-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
