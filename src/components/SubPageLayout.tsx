import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
  showBack?: boolean;
}

const SubPageLayout = ({ title, children, showBack = true }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background max-w-lg lg:max-w-3xl xl:max-w-5xl mx-auto">
      <header className="sticky top-0 bg-card border-b border-border z-40">
        <div className="flex items-center gap-2 px-4 md:px-6 lg:px-8 h-14">
          {showBack && (
            <button onClick={() => navigate(-1)} className="p-1 -ml-1">
              <ChevronLeft size={24} className="text-primary" />
            </button>
          )}
          <h1 className="text-lg font-heading font-semibold text-foreground">{title}</h1>
        </div>
      </header>
      <main className="px-4 py-4 md:px-6 lg:px-8">{children}</main>
    </div>
  );
};

export default SubPageLayout;
