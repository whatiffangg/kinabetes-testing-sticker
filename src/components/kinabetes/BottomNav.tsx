import { Camera, MessageCircle, History, LayoutDashboard } from 'lucide-react';

interface BottomNavProps {
  active: string;
  onHome: () => void;
  onScan: () => void;
  onChat: () => void;
  onHistory: () => void;
}

export default function BottomNav({ active, onHome, onScan, onChat, onHistory }: BottomNavProps) {
  const items = [
    { key: 'HOME', icon: LayoutDashboard, label: 'หน้าหลัก', action: onHome },
    { key: 'CAMERA', icon: Camera, label: 'สแกน', action: onScan },
    { key: 'CHAT', icon: MessageCircle, label: 'แพทย์', action: onChat },
    { key: 'HISTORY', icon: History, label: 'ประวัติ', action: onHistory },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-card border-t border-border">
      <div className="max-w-md mx-auto flex items-center justify-around py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {items.map(item => {
          const isActive = active === item.key;
          return (
            <button
              key={item.key}
              onClick={item.action}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 transition-colors ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <item.icon size={22} />
              <span className="text-[11px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
