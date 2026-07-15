import { useAppStore } from "../store";
import { Home, MessageCircle, MessageSquare, User, Briefcase, CalendarClock, Users, Wallet } from "lucide-react";
import { motion } from "motion/react";

export function BottomNav() {
  const { currentTab, setTab, pushView, appMode } = useAppStore();

  const isCounselorMode = appMode === "counselor";

  const userTabs = [
    { id: "home", icon: Home, label: "首页" },
    { id: "ai", icon: MessageCircle, label: "小鹿" },
    { id: "messages", icon: MessageSquare, label: "消息" },
    { id: "profile", icon: User, label: "我的" },
  ] as const;

  const counselorTabs = [
    { id: "home", icon: Briefcase, label: "工作台" },
    { id: "appointments", icon: CalendarClock, label: "预约" },
    { id: "clients", icon: Users, label: "客户" },
    { id: "earnings", icon: Wallet, label: "收入" },
    { id: "profile", icon: User, label: "我的" },
  ] as const;

  const tabs = isCounselorMode ? counselorTabs : userTabs;

  return (
    <div className="w-full shrink-0 h-20 bg-white/95 backdrop-blur-md border-t border-gray-100 flex pb-4 items-center justify-around z-30 relative">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => {
              if (tab.id === "ai") {
                pushView("ai-chat");
              } else {
                setTab(tab.id as any);
              }
            }}
            className="flex flex-col items-center justify-center w-20 relative pt-2"
          >
            <div
              className={`relative flex items-center justify-center h-8 w-8 mb-1 ${isActive ? "text-primary" : "text-gray-400"}`}
            >
              <Icon strokeWidth={isActive ? 2.5 : 2} size={24} />
              {isActive && (
                <motion.div
                  layoutId="bubble"
                  className="absolute inset-0 bg-primary-light rounded-full -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </div>
            <span
              className={`text-[10px] ${isActive ? "text-primary font-medium" : "text-gray-400"}`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
