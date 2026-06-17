import { ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAppStore } from "../store";
import { BottomNav } from "./BottomNav";
import { HomeTab } from "../pages/Main/HomeTab";
import { MessagesTab } from "../pages/Main/MessagesTab";
import { AITab } from "../pages/Main/AITab";
import { ProfileTab } from "../pages/Main/ProfileTab";

export function MainLayout() {
  const { currentTab } = useAppStore();

  return (
    <div className="flex flex-col h-full bg-surface relative overflow-hidden">
      <div className="flex-1 relative overflow-hidden flex flex-col">
        <AnimatePresence mode="wait">
          {currentTab === "home" && <HomeTab key="home" />}
          {currentTab === "messages" && <MessagesTab key="messages" />}
          {currentTab === "profile" && <ProfileTab key="profile" />}
        </AnimatePresence>
      </div>
      <BottomNav />
    </div>
  );
}
