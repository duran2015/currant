import { motion } from "motion/react";
import { useAppStore } from "../../store";
import { mockCounselors } from "../../data";
import { ChevronRight } from "lucide-react";

export function MessagesTab() {
  const { pushView, orders } = useAppStore();

  // Find counselors we have orders with
  const contactedCounselorIds = Array.from(new Set(orders.map(o => o.counselorId)));
  const humanChats = contactedCounselorIds.map(id => {
    return mockCounselors.find(c => c.id === id);
  }).filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-full bg-[#f8f9fa]"
    >
      <div className="pt-14 pb-4 px-6 bg-white sticky top-0 z-20 shadow-[0_1px_10px_rgba(0,0,0,0.02)]">
        <h1 className="text-[22px] font-bold text-gray-900">消息</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-24 space-y-3">
        {/* AI Chat Entry */}
        <button
          onClick={() => pushView("ai-chat")}
          className="w-full bg-white p-4 rounded-2xl flex items-center shadow-sm border border-gray-100 active:scale-[0.98] transition-transform"
        >
          <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-2xl mr-4 shrink-0 border border-orange-100">
            🦦
          </div>
          <div className="flex-1 text-left">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-bold text-gray-900 text-[16px]">心灵水獭 小愈</h3>
              <span className="text-[11px] text-gray-400">刚刚</span>
            </div>
            <p className="text-[13px] text-gray-500 line-clamp-1">
              随时在这里陪你，今天感觉怎么样？
            </p>
          </div>
        </button>

        {/* System Notifications Entry */}
        <button
          onClick={() => pushView("orders-list")}
          className="w-full bg-white p-4 rounded-2xl flex items-center shadow-sm border border-gray-100 active:scale-[0.98] transition-transform"
        >
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-xl mr-4 shrink-0 border border-blue-100 text-blue-500">
            🔔
          </div>
          <div className="flex-1 text-left">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-bold text-gray-900 text-[16px]">系统与预约通知</h3>
            </div>
            <p className="text-[13px] text-gray-500 line-clamp-1">
              查看你的咨询预约与系统消息
            </p>
          </div>
        </button>

        {/* Human Counselors Chats */}
        {humanChats.length > 0 && (
          <div className="pt-4">
            <h2 className="text-[13px] font-bold text-gray-400 mb-3 px-2">倾听师沟通</h2>
            {humanChats.map((counselor) => (
              <button
                key={counselor?.id}
                onClick={() => pushView("counseling-text-chat")}
                className="w-full bg-white p-4 rounded-2xl flex items-center shadow-sm border border-gray-100 active:scale-[0.98] transition-transform mb-3"
              >
                <img src={counselor?.avatar} alt="" className="w-12 h-12 rounded-full object-cover mr-4 shrink-0" />
                <div className="flex-1 text-left">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-bold text-gray-900 text-[16px]">{counselor?.name}</h3>
                    <span className="text-[11px] text-gray-400">预约相关</span>
                  </div>
                  <p className="text-[13px] text-gray-500 line-clamp-1">
                    进入文字沟通通道...
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
        
        {humanChats.length === 0 && (
          <div className="pt-10 flex flex-col items-center justify-center text-gray-400">
            <div className="text-4xl mb-3 opacity-50">💭</div>
            <p className="text-[13px]">暂无倾听师沟通记录</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
