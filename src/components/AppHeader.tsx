import { useNavigate } from "react-router-dom";
import { Moon, Sun, Bell, User } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import logo from "@/assets/logo.png";

const AppHeader = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 bg-card border-b border-border z-40">
      <div className="max-w-lg lg:max-w-3xl xl:max-w-5xl mx-auto flex items-center justify-between px-4 md:px-6 lg:px-8 h-14">
        <div className="flex items-center gap-2.5">
          <img src={logo} alt="Kinabetes" className="w-9 h-9 rounded-full object-cover" />
          <div>
            <h1 className="text-sm font-heading font-semibold text-foreground leading-tight">Kinabetes</h1>
            <p className="text-[11px] text-muted-foreground leading-tight">Testing Sticker AI</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-muted transition-colors">
            {theme === "light" ? <Moon size={20} className="text-muted-foreground" /> : <Sun size={20} className="text-muted-foreground" />}
          </button>
          <button
            onClick={() => navigate("/notifications")}
            className="p-2 rounded-full hover:bg-muted transition-colors relative"
          >
            <Bell size={20} className="text-muted-foreground" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-notification rounded-full" />
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center"
          >
            <User size={18} className="text-primary-foreground" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
