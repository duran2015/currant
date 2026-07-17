import { motion } from "motion/react";
import {
  Settings,
  FileText,
  ChevronRight,
  CalendarClock,
  Briefcase,
  LogOut,
} from "lucide-react";
import { useAppStore } from "../../store";

export function ProfileTab() {
  const { pushView, enterAppMode, user } = useAppStore();

  const menuGroups = [
    {
      title: "我的心灵档案",
      items: [
        { icon: FileText, label: "量表记录" },
      ],
    },
    {
      title: "预约与服务",
      items: [
        { icon: CalendarClock, label: "预约记录" },
        { icon: FileText, label: "小结与建议" },
      ],
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="px-5 pb-28 overflow-y-auto h-full"
    >
      <div className="pt-12 pb-5">
        <div className="page-kicker mb-4">MY WELLBEING</div>
        <div className="hero-panel p-5 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={user.avatar}
              alt="avatar"
              className="w-[68px] h-[68px] rounded-[22px] border-2 border-white/70 shadow-md object-cover"
            />
          </div>
          <div>
            <h1 className="text-xl font-black text-white mb-1 flex items-center">
              {user.name}
            </h1>
            <p className="text-white/65 text-xs">在这里，关注最真实的自己</p>
          </div>
        </div>
        <button 
          onClick={() => pushView("profile-edit")}
          aria-label="编辑个人资料"
          className="relative z-10 w-10 h-10 bg-white/12 rounded-[14px] flex items-center justify-center text-white border border-white/15 active:scale-95 transition-transform"
        >
          <Settings size={20} />
        </button>
        </div>
      </div>



      <div className="space-y-8 mt-4">
        {user.role === "active" && (
          <button 
            onClick={() => enterAppMode("counselor")}
            className="ui-card ui-row w-full flex items-center justify-between p-4"
          >
            <div className="flex items-center space-x-3 text-primary">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Briefcase size={18} />
              </div>
              <span className="font-bold text-[15px]">切换为咨询师身份</span>
            </div>
            <ChevronRight size={20} className="text-gray-300" />
          </button>
        )}

        {menuGroups.map((group, idx) => (
          <div key={idx} className="space-y-3">
            <h3 className="text-[14px] font-bold text-gray-900 flex items-center">
              <span className="w-1 h-3.5 bg-primary rounded-full mr-2"></span>
              {group.title}
            </h3>
            <div className="ui-card overflow-hidden">
              {group.items.map((item, i) => {
                const Icon = item.icon;
                return (
                  <button
                    key={i}
                    onClick={() => {
                      if (item.label === "预约记录" || item.label === "订单管理") {
                        pushView("orders-list");
                      } else if (item.label === "咨询记录") {
                        pushView("consultation-records");
                      } else if (item.label === "量表记录") {
                        pushView("assessment-records");
                      } else if (item.label === "小结与建议") {
                        pushView("counseling-summary-list");
                      }
                    }}
                    className="ui-row w-full px-5 py-4 flex items-center justify-between border-b border-gray-50 last:border-0 group"
                  >
                    <div className="flex items-center space-x-3 text-gray-800">
                      <div className="w-8 h-8 rounded-full bg-surface group-hover:bg-primary/10 flex items-center justify-center text-gray-500 group-hover:text-primary transition-colors">
                        <Icon size={18} />
                      </div>
                      <span className="font-medium text-[15px]">
                        {item.label}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 border-none">
                      <ChevronRight
                        size={18}
                        className="text-gray-300 group-hover:text-gray-400 transition-colors"
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <div className="space-y-3">
          <h3 className="text-[14px] font-bold text-gray-900 flex items-center">
            <span className="w-1 h-3.5 bg-primary rounded-full mr-2"></span>
            账号设置
          </h3>
          <div className="bg-white rounded-[1.5rem] border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
            <button
              onClick={() => pushView("account-security" as any)}
              className="ui-row w-full px-5 py-4 flex items-center justify-between group"
            >
              <div className="flex items-center space-x-3 text-gray-800">
                <div className="w-8 h-8 rounded-full bg-surface group-hover:bg-primary/10 flex items-center justify-center text-gray-500 group-hover:text-primary transition-colors">
                  <LogOut size={18} />
                </div>
                <div className="text-left">
                  <p className="font-medium text-[15px] text-gray-900">账号与安全</p>
                  <p className="text-[12px] text-gray-500">退出登录、注销账号</p>
                </div>
              </div>
              <ChevronRight
                size={18}
                className="text-gray-300 group-hover:text-gray-400 transition-colors"
              />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
