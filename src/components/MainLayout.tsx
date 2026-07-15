import { ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAppStore } from "../store";
import { BottomNav } from "./BottomNav";
import { HomeTab } from "../pages/Main/HomeTab";
import { MessagesTab } from "../pages/Main/MessagesTab";
import { AITab } from "../pages/Main/AITab";
import { ProfileTab } from "../pages/Main/ProfileTab";
import { CounselorWorkbench } from "../pages/Counseling/CounselorWorkbench";
import { OrdersList } from "../pages/Counseling/OrdersList";
import { CounselorOrdersList } from "../pages/Counseling/CounselorOrdersList";
import { CounselorEarnings } from "../pages/Counseling/CounselorEarnings";
import { CounselorClientsTab } from "../pages/Counseling/CounselorClientsTab";
import { CounselorProfileTab } from "../pages/Counseling/CounselorProfileTab";
import { Users, Wallet } from "lucide-react";

export function MainLayout() {
  const { currentTab, appMode } = useAppStore();
  const isCounselorMode = appMode === "counselor";

  return (
    <div className="flex flex-col h-full bg-surface relative overflow-hidden">
      <div className="flex-1 relative overflow-hidden flex flex-col">
        <AnimatePresence mode="wait">
          {currentTab === "home" && (isCounselorMode ? <CounselorWorkbench key="counselor-home" /> : <HomeTab key="home" />)}
          {currentTab === "messages" && !isCounselorMode && <MessagesTab key="messages" />}
          {currentTab === "profile" && (isCounselorMode ? <CounselorProfileTab key="counselor-profile" /> : <ProfileTab key="profile" />)}
          {currentTab === "appointments" && isCounselorMode && <CounselorOrdersList key="appointments" />}
          {currentTab === "clients" && isCounselorMode && <CounselorClientsTab key="clients" />}
          {currentTab === "earnings" && isCounselorMode && <CounselorEarnings key="earnings" />}
        </AnimatePresence>
      </div>
      <BottomNav />
    </div>
  );
}
