import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import HomePage from "./pages/HomePage";
import ScanPage from "./pages/ScanPage";
import PharmacistPage from "./pages/PharmacistPage";
import ChatPage from "./pages/ChatPage";
import HistoryPage from "./pages/HistoryPage";
import NotificationsPage from "./pages/NotificationsPage";
import ProfilePage from "./pages/ProfilePage";
import SecurityPage from "./pages/SecurityPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import ReportPage from "./pages/ReportPage";
import NearbyPharmacyPage from "./pages/NearbyPharmacyPage";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./hooks/use-theme";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/scan" element={<ScanPage />} />
          <Route path="/pharmacist" element={<PharmacistPage />} />
          <Route path="/chat/:id" element={<ChatPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/nearby-pharmacy" element={<NearbyPharmacyPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
