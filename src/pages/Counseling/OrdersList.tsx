import { motion } from "motion/react";
import { useAppStore } from "../../store";
import {
  ChevronLeft,
  CalendarClock,
  MessageSquare,
  Video,
  ArrowRight,
} from "lucide-react";
import { mockCounselors } from "../../data";

export function OrdersList() {
  const { popView, pushView, orders, setBookingOrder } = useAppStore();

  const getCounselor = (id: string) => {
    return mockCounselors.find((c) => c.id === id) || mockCounselors[0];
  };

  const handleEnterConsultation = (order: any) => {
    setBookingOrder(order);
    if (order.type === "text") {
      pushView("counseling-text-chat");
    } else {
      pushView("counseling-call");
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
                          {order.type === "text" ? "文字沟通" : "语音/视频咨询"}
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

                  {order.status === "paid" && (
                    <button
                      onClick={() => handleEnterConsultation(order)}
                      className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold flex items-center justify-center transition-transform active:scale-[0.98]"
                    >
                      进入咨询空间 <ArrowRight size={16} className="ml-1" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}
