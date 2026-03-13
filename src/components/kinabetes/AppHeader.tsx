import { Bell, User, Stethoscope } from 'lucide-react';

interface AppHeaderProps {
  onNotifications: () => void;
  onAccount: () => void;
}

export default function AppHeader({ onNotifications, onAccount }: AppHeaderProps) {
  return (
    <header className="flex items-center justify-between px-5 py-3 bg-card sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full gradient-hero flex items-center justify-center">
          <Stethoscope size={20} className="text-primary-foreground" />
        </div>
        <div>
          <span className="font-bold text-foreground text-base">Kinabetes</span>
          <p className="text-[11px] text-muted-foreground leading-tight">Testing Sticker AI</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onNotifications}
          className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <Bell size={20} />
        </button>
        <button
          onClick={onAccount}
          className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground"
        >
          <User size={20} />
        </button>
      </div>
    </header>
  );
}
