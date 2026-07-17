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
    <nav aria-label={isCounselorMode ? "咨询师主导航" : "用户主导航"} className="client-bottom-nav w-full shrink-0 min-h-[68px] flex px-2 items-start justify-around z-30 relative">
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
            className={`nav-item flex flex-col items-center justify-center flex-1 min-w-0 relative py-1 ${isActive ? "is-active" : ""}`}
          >
            <div
              className={`relative flex items-center justify-center h-9 w-11 mb-0.5 rounded-[14px] ${isActive ? "text-primary" : "text-gray-400"}`}
            >
              <Icon strokeWidth={isActive ? 2.5 : 2} size={24} />
              {isActive && (
                <motion.div
                  layoutId="bubble"
                  className="nav-active-mark absolute -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </div>
            <span
              className={`text-[10px] tracking-wide ${isActive ? "text-primary font-bold" : "text-gray-400 font-medium"}`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
