import { useState } from 'react';
import { ChevronLeft, Send, Video } from 'lucide-react';
import { motion } from 'motion/react';

interface ChatScreenProps {
  onBack: () => void;
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'pharmacist';
  time: string;
}

export default function ChatScreen({ onBack }: ChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'สวัสดีค่ะ พญ. สุภาพร ยินดีให้บริการค่ะ จากผลตรวจพบ Albumin เบื้องต้น ไม่ต้องกังวลนะคะ\n\nขออนุญาตสอบถามข้อมูลเพิ่มเติมนะคะ ช่วงนี้มีการทานยาหรือวิตามินซีปริมาณมากไหมคะ? เพราะอาจส่งผลต่อการอ่านค่าสีได้ค่ะ',
      sender: 'pharmacist',
      time: '10:30',
    },
    {
      id: 2,
      text: 'ทานวิตามินซี 1000mg ทุกวันครับ',
      sender: 'user',
      time: '10:32',
    },
  ]);
  const [input, setInput] = useState('');

  const send = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { id: Date.now(), text: input, sender: 'user', time: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }) }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: 'ขอบคุณค่ะ ข้อมูลนี้มีประโยชน์มากค่ะ วิตามินซีปริมาณสูงอาจทำให้ผลตรวจคลาดเคลื่อนได้ แนะนำให้หยุดทาน 3 วันแล้วตรวจซ้ำนะคะ',
        sender: 'pharmacist',
        time: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
      }]);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-card border-b border-border">
        <button onClick={onBack} className="text-primary">
          <ChevronLeft size={24} />
        </button>
        <div className="w-10 h-10 rounded-full gradient-hero flex items-center justify-center text-primary-foreground text-sm">👩‍⚕️</div>
        <div className="flex-1">
          <p className="text-sm font-bold text-foreground">พญ. สุภาพร ชาญเวช</p>
          <p className="text-xs text-kina-green flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-kina-green inline-block" />
            กำลังออนไลน์
          </p>
        </div>
        <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-primary">
          <Video size={20} />
        </button>
      </div>

      {/* Date divider */}
      <div className="text-center py-3">
        <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">วันนี้</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 space-y-3 pb-2">
        {messages.map(msg => (
          <motion.div key={msg.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender === 'pharmacist' && (
              <div className="w-8 h-8 rounded-full gradient-hero flex items-center justify-center text-primary-foreground text-xs mr-2 mt-1 shrink-0">👩‍⚕️</div>
            )}
            <div className={`max-w-[75%] rounded-2xl px-4 py-3 ${
              msg.sender === 'user'
                ? 'gradient-primary text-primary-foreground rounded-br-md'
                : 'bg-accent text-foreground rounded-bl-md'
            }`}>
              <p className="text-sm leading-relaxed whitespace-pre-line">{msg.text}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input */}
      <div className="px-4 py-3 bg-card border-t border-border flex items-center gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="พิมพ์ข้อความ..."
          className="flex-1 bg-muted rounded-full px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30"
        />
        <button onClick={send} className="w-11 h-11 rounded-full gradient-primary flex items-center justify-center text-primary-foreground">
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
