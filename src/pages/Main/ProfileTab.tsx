import { motion } from "motion/react";
import { mockUser } from "../../data";
import {
  Settings,
  Shield,
  User,
  FileText,
  WalletCards,
  ChevronRight,
  Lock,
  MessageSquare,
  CalendarClock,
  History,
  Edit3,
} from "lucide-react";
import { useAppStore } from "../../store";

export function ProfileTab() {
  const { resetToView, pushView } = useAppStore();

  const menuGroups = [
    {
      title: "我的心灵档案",
      items: [
        { icon: User, label: "心理画像", tag: "NEW" },
        { icon: FileText, label: "量表记录" },
        { icon: MessageSquare, label: "AI 倾听记录" },
      ],
    },
    {
      title: "预约与服务",
      items: [
        { icon: CalendarClock, label: "预约记录" },
        { icon: History, label: "咨询记录" },
        { icon: WalletCards, label: "订单管理" },
      ],
    },
    {
      title: "设置与安全",
      items: [
        { icon: Shield, label: "隐私管理" },
        { icon: Lock, label: "账号安全" },
        { icon: Settings, label: "系统设置" },
      ],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="p-5 pb-8 overflow-y-auto h-full"
    >
      <div className="pt-12 pb-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={mockUser.avatar}
              alt="avatar"
              className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover"
            />
            <button className="absolute bottom-0 right-0 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100">
              <Edit3 size={12} className="text-gray-600" />
            </button>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              {mockUser.name}
            </h1>
            <p className="text-gray-500 text-sm">在这里，关注最真实的自己</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-4 rounded-[1.5rem] border border-primary/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-bl-full" />
          <p className="text-gray-600 text-[13px] font-medium mb-1 relative z-10">
            倾诉时长
          </p>
          <div className="flex items-end relative z-10">
            <span className="text-3xl font-bold text-gray-900 mr-1 tracking-tight">
              128
            </span>
            <span className="text-xs text-gray-500 mb-1">分钟</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-50/50 p-4 rounded-[1.5rem] border border-orange-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-orange-100/50 rounded-bl-full" />
          <p className="text-gray-600 text-[13px] font-medium mb-1 relative z-10">
            累积画像
          </p>
          <div className="flex items-end relative z-10">
            <span className="text-3xl font-bold text-gray-900 mr-1 tracking-tight">
              3
            </span>
            <span className="text-xs text-gray-500 mb-1">份</span>
          </div>
        </div>
      </div>

      <div className="space-y-8 mt-4">
        {menuGroups.map((group, idx) => (
          <div key={idx} className="space-y-3">
            <h3 className="text-[14px] font-bold text-gray-900 flex items-center">
              <span className="w-1 h-3.5 bg-primary rounded-full mr-2"></span>
              {group.title}
            </h3>
            <div className="bg-white rounded-[1.5rem] border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
              {group.items.map((item, i) => {
                const Icon = item.icon;
                return (
                  <button
                    key={i}
                    onClick={() => {
                      if (
                        ["预约记录", "咨询记录", "订单管理"].includes(
                          item.label,
                        )
                      ) {
                        pushView("orders-list");
                      } else if (item.label === "心理画像") {
                        pushView("profile-report");
                      } else if (item.label === "量表记录") {
                        pushView("assessment-records");
                      } else if (item.label === "AI 倾听记录") {
                        pushView("ai-chat-records");
                      }
                    }}
                    className="w-full px-5 py-4 flex items-center justify-between active:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 group"
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
                      {item.tag && (
                        <span className="bg-red-50 text-red-500 text-[10px] px-2 py-0.5 rounded-full font-bold">
                          {item.tag}
                        </span>
                      )}
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

      <div className="mt-8 flex justify-center">
        <button
          onClick={() => resetToView("login")}
          className="text-gray-400 font-medium py-4 active:text-gray-600 transition-colors text-[14px] px-8"
        >
          安全退出登录
        </button>
      </div>
    </motion.div>
  );
}
