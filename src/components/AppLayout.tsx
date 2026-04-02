import { ReactNode } from "react";
import AppHeader from "./AppHeader";
import BottomNav from "./BottomNav";

const AppLayout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen bg-background max-w-lg lg:max-w-3xl xl:max-w-5xl mx-auto relative">
    <AppHeader />
    <main className="pb-20 px-4 pt-4 md:px-6 lg:px-8">{children}</main>
    <BottomNav />
  </div>
);

export default AppLayout;
