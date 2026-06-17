import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useAppStore } from "../../store";
import {
  ChevronLeft,
  CalendarClock,
  MessageSquare,
  Video,
  ArrowRight,
  Lock,
} from "lucide-react";
import { mockCounselors } from "../../data";

export function OrdersList() {
  const { popView, pushView, orders, setBookingOrder, setActiveCallSession, setIsCallMinimized } = useAppStore();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const getCounselor = (id: string) => {
    return mockCounselors.find((c) => c.id === id) || mockCounselors[0];
  };

  const getLockStatus = (order: any) => {
    if (order.type === "text") return { isLocked: false, lockMessage: "" };
    
    let scheduledTime = new Date();
    const timeStr = order.timeStr || order.time;
    const dateStr = order.dateStr || order.date;

    if (timeStr) {
      const [hourStr, minStr] = timeStr.split(":");
      scheduledTime.setHours(parseInt(hourStr), parseInt(minStr), 0, 0);
    }
    
    if (dateStr && dateStr.includes("-")) {
      const [month, day] = dateStr.split("-");
      scheduledTime.setMonth(parseInt(month) - 1);
      scheduledTime.setDate(parseInt(day));
    } else if (dateStr === "明天") {
      scheduledTime.setDate(scheduledTime.getDate() + 1);
    }

    const diffMinutes = (scheduledTime.getTime() - now.getTime()) / 60000;
    if (diffMinutes > 10) {
      const openTime = new Date(scheduledTime.getTime() - 10 * 60000);
      const openDateStr = `${openTime.getMonth() + 1}月${openTime.getDate()}日`;
      const openTimeStr = `${openTime.getHours().toString().padStart(2, '0')}:${openTime.getMinutes().toString().padStart(2, '0')}`;
      return { isLocked: true, lockMessage: `预计 ${openDateStr} ${openTimeStr} 开放` };
    }
    return { isLocked: false, lockMessage: "" };
  };

  const handleEnterConsultation = (order: any, isLocked: boolean, lockMessage: string) => {
    if (isLocked) {
      alert(`会议室将在开始前10分钟开放，请稍后再试\n（${lockMessage}）`);
      return;
    }
    setBookingOrder(order);
    if (order.type === "text") {
      pushView("counseling-text-chat");
    } else {
      setActiveCallSession(order);
      setIsCallMinimized(false);
    }
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="flex flex-col h-full bg-[#f8f9fa] absolute inset-0 z-50 overflow-hidden"
    >
      <div className="pt-14 pb-4 px-4 bg-white sticky top-0 z-20 flex items-center shadow-sm">
        <button
          onClick={popView}
          className="w-10 h-10 -ml-2 flex items-center justify-center text-gray-900 border border-transparent active:bg-gray-50 rounded-full transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-[17px] font-bold text-gray-900 ml-2">
          我的预约订单
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <CalendarClock size={48} className="mb-4 text-gray-300" />
            <p>暂无预约订单</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, ind) => {
              const counselor = getCounselor(order.counselorId);
              return (
                <div
                  key={ind}
                  className="bg-white p-5 rounded-[1.5rem] shadow-sm border border-gray-100"
                >
                  <div className="flex justify-between items-start mb-4 pb-4 border-b border-gray-50">
                    <div className="flex items-center space-x-3">
                      <img
                        src={counselor.avatar}
                        alt=""
                        className="w-10 h-10 rounded-full object-cover shadow-sm bg-gray-100"
                      />
                      <div>
                        <h3 className="font-bold text-gray-900 text-[15px]">
                          {counselor.name}
                        </h3>
                        <p className="text-[11px] text-gray-500">
                          {order.type === "text"
                            ? "文字沟通"
                            : order.type === "voice"
                              ? "语音咨询"
                              : "视频咨询"}
                        </p>
                      </div>
                    </div>
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[11px] font-bold">
                      {order.status === "paid" ? "待履约" : order.status}
                    </span>
                  </div>

                  <div className="space-y-2 mb-5">
                    <div className="flex items-center text-gray-600 text-[13px]">
                      <CalendarClock size={16} className="mr-2 text-gray-400" />
                      <span className="font-medium">
                        {order.date} · {order.time}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600 text-[13px]">
                      {order.type === "text" ? (
                        <MessageSquare
                          size={16}
                          className="mr-2 text-gray-400"
                        />
                      ) : (
                        <Video size={16} className="mr-2 text-gray-400" />
                      )}
                      <span className="font-medium">
                        {order.type === "text" ? "全天异步可留言" : "50 分钟"}
                      </span>
                    </div>
                  </div>

                  {order.status === "paid" && (() => {
                    const { isLocked, lockMessage } = getLockStatus(order);
                    return (
                      <div className="relative mt-4">
                        {/* 加锁和倒计时作为悬浮提示层 */}
                        {order.type !== "text" && isLocked && (
                          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[12px] px-3 py-1.5 rounded-lg whitespace-nowrap flex items-center shadow-lg pointer-events-none z-20">
                            <Lock size={12} className="mr-1.5 text-gray-300" />
                            {lockMessage}
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                          </div>
                        )}
                        <button
                          onClick={() => handleEnterConsultation(order, isLocked, lockMessage)}
                          disabled={isLocked}
                          className={`w-full py-3 rounded-xl font-bold flex items-center justify-center transition-all ${
                            isLocked 
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200" 
                              : "bg-gray-900 text-white active:scale-[0.98]"
                          }`}
                        >
                          {order.type === "text" ? (
                            <>进入文字咨询室 <MessageSquare size={16} className="ml-2" /></>
                          ) : (
                            <>进入视频/语音会议室 <Video size={16} className="ml-2" /></>
                          )}
                        </button>
                      </div>
                    );
                  })()}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}
