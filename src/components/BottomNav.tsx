import { useNavigate, useLocation } from "react-router-dom";
import { LayoutGrid, Camera, MessageCircle, History, MapPin } from "lucide-react";

const tabs = [
  { path: "/", label: "หน้าหลัก", icon: LayoutGrid },
  { path: "/scan", label: "สแกน", icon: Camera },
  { path: "/nearby-pharmacy", label: "ร้านยา", icon: MapPin },
  { path: "/chat/1", label: "เภสัชกร", icon: MessageCircle },
  { path: "/history", label: "ประวัติ", icon: History },
];

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="max-w-lg lg:max-w-3xl xl:max-w-5xl mx-auto flex justify-around items-center h-16">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          const Icon = tab.icon;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center gap-0.5 px-4 py-1.5 transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
              <span className="text-[11px] font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
