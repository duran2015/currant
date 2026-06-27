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
  const { popView, pushView, orders, setBookingOrder, setSelectedCounselorId } = useAppStore();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const getCounselor = (id: string) => {
    return mockCounselors.find((c) => c.id === id) || mockCounselors[0];
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
                  onClick={() => {
                    setBookingOrder(order);
                    pushView("user-order-detail");
                  }}
                  className="bg-white p-5 rounded-[1.5rem] shadow-sm border border-gray-100 cursor-pointer active:scale-[0.98] transition-transform"
                >
                  <div className="flex justify-between items-start mb-4 pb-4 border-b border-gray-50">
                    <div className="flex items-start space-x-3">
                      <img
                        src={counselor.avatar}
                        alt=""
                        className="w-12 h-12 rounded-[1rem] object-cover shadow-sm bg-gray-100 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 flex-wrap gap-y-1 mb-1">
                          <h3 className="font-bold text-gray-900 text-[15px] leading-none">
                            {counselor.name}
                          </h3>
                          <span className="text-[10px] bg-gray-50 text-gray-500 px-1.5 py-0.5 rounded font-medium shrink-0">
                            累计服务 {counselor.serviceHours || "1000+"} 小时
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-1.5">
                          {counselor.specialties?.slice(0, 1).map((spec: string, i: number) => (
                            <span key={`spec-${i}`} className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-medium">
                              擅长: {spec}
                            </span>
                          ))}
                          {counselor.styles?.slice(0, 1).map((style: string, i: number) => (
                            <span key={`style-${i}`} className="text-[10px] bg-purple-50 text-purple-600 px-1.5 py-0.5 rounded font-medium">
                              风格: {style}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                      order.status === 'paid' ? 'bg-primary/10 text-primary' :
                      order.status === 'pending' ? 'bg-orange-50 text-orange-500' :
                      'bg-gray-100 text-gray-500'
                    }`}>
                      {order.status === "paid" ? "待咨询" : 
                       order.status === "pending" ? "待支付" : 
                       order.status === "completed" ? "履约完成" : 
                       order.status === "cancelled" ? "已取消" : 
                       order.status === "failed" ? "预约/支付失败" : "已退款"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
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
                          {order.type === "text" ? "全天随时可留言" : "50 分钟"}
                        </span>
                      </div>
                    </div>

                    {order.status === "paid" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCounselorId(order.counselorId);
                          pushView("counseling-text-chat");
                        }}
                        className="px-3.5 py-1.5 rounded-lg text-[12px] font-bold flex items-center justify-center transition-all bg-gray-900 text-white active:scale-[0.98] shrink-0"
                      >
                        联系咨询师
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}
