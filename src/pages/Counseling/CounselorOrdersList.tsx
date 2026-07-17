import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useAppStore } from "../../store";
import { ChevronLeft, CalendarClock, Clock, MoreHorizontal } from "lucide-react";
import { mockCounselors } from "../../data";
import { EmptyState } from "../../components/EmptyState";

export function CounselorOrdersList({ isTab = false }: { isTab?: boolean; key?: string }) {
  const { popView, pushView, orders, appMode, activeOrderTab, setActiveOrderTab, setSelectedCounselorOrder } = useAppStore();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const displayOrders = orders.filter(o => o.counselorId === 'c1').filter(o => {
    if (activeOrderTab === "pending") return o.status === "paid" || o.status === "pending";
    if (activeOrderTab === "completed") return o.status === "completed";
    if (activeOrderTab === "cancelled") return o.status === "cancelled" || o.status === "refunded" || o.status === "failed";
    if (activeOrderTab === "settlement") return o.status === "completed"; // Mock logic for settlement
    return true;
  });

  const tabs = [
    { id: "pending", label: "待服务" },
    { id: "completed", label: "已完成" },
    { id: "cancelled", label: "已取消" },
    { id: "settlement", label: "待结算" },
  ];

  return (
    <motion.div
      initial={isTab ? { opacity: 0 } : { x: "100%" }}
      animate={isTab ? { opacity: 1 } : { x: 0 }}
      exit={isTab ? { opacity: 0 } : { x: "100%" }}
      transition={isTab ? undefined : { type: "spring", damping: 25, stiffness: 200 }}
      className={`flex flex-col h-full bg-[#f8f9fa] overflow-hidden ${isTab ? 'relative w-full' : 'absolute inset-0 z-50'}`}
    >
      <div className="pt-14 pb-0 px-4 bg-white sticky top-0 z-20 shadow-sm border-b border-gray-100">
        <div className="flex items-center mb-3">
          {!isTab && (
            <button
              onClick={popView}
              aria-label="返回"
              className="w-10 h-10 -ml-2 flex items-center justify-center text-gray-900 border border-transparent active:bg-gray-50 rounded-full transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
          )}
          <h1 className={`text-[17px] font-bold text-gray-900 ${!isTab ? 'ml-2' : ''}`}>
            我的预约
          </h1>
        </div>

        {/* Custom Tabs */}
        <div className="flex space-x-6 px-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveOrderTab(tab.id as any)}
              className={`pb-3 text-[14px] font-bold transition-all relative ${
                activeOrderTab === tab.id
                  ? "text-gray-900"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab.label}
              {activeOrderTab === tab.id && (
                <motion.div
                  layoutId="orderTab"
                  className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary rounded-t-full"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className={`flex-1 overflow-y-auto p-4 ${isTab ? 'pb-28' : ''}`}>
        {displayOrders.length === 0 ? (
          <EmptyState
            icon={CalendarClock}
            title={activeOrderTab === "pending" ? "暂时没有待服务预约" : "这个分类还没有订单"}
            description={activeOrderTab === "pending" ? "开放更多可预约时段，用户就能更方便地找到你。" : "新的订单状态变化后，会自动归档到这里。"}
            actionLabel="设置可预约时间"
            onAction={() => pushView("counselor-schedule" as any)}
          />
        ) : (
          <div className="space-y-4">
            {displayOrders.map((order, ind) => {
              const isPending = activeOrderTab === "pending";
              const isStartingSoon = isPending && ind === 0; // Mock: first pending order is starting soon

              return (
                <div
                  key={ind}
                  className="bg-white rounded-[1.2rem] shadow-sm border border-gray-100 overflow-hidden"
                >
                  {/* Top Status Bar */}
                  <div className={`px-4 py-2.5 flex justify-between items-center border-b border-gray-50 ${isStartingSoon ? 'bg-orange-50/50' : ''}`}>
                    <div className="flex items-center space-x-2">
                      <span className="text-[12px] font-medium text-gray-500">订单号: {order.id?.substring(0, 8)}</span>
                      {order.status === 'paid' && <span className="bg-blue-50 text-blue-600 text-[10px] px-1.5 py-0.5 rounded font-medium border border-blue-100">平台分发</span>}
                    </div>
                    <span className={`text-[12px] font-bold ${
                      order.status === 'paid' ? 'text-orange-500' :
                      order.status === 'completed' ? 'text-green-500' : 'text-gray-400'
                    }`}>
                      {order.status === 'paid' ? (isStartingSoon ? '即将开始' : '待服务') : 
                       order.status === 'completed' ? '已完成' : '已取消'}
                    </span>
                  </div>

                  <div className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center">
                        <img
                          src={order.avatar || "https://ui-avatars.com/api/?name=User&background=random"}
                          alt="avatar"
                          className="w-10 h-10 rounded-full bg-gray-100 object-cover mr-3 border border-gray-100"
                        />
                        <div>
                          <h3 className="font-bold text-[15px] text-gray-900 mb-0.5">{order.userName || "小鹿用户3821"}</h3>
                          <div className="text-[12px] text-gray-500 flex items-center">
                            {order.type === 'voice' ? '语音' : order.type === 'video' ? '视频' : '文字'}
                            <span className="mx-1.5">·</span>
                            45分钟心理咨询
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[16px] font-bold text-gray-900">¥199</div>
                        <div className="text-[11px] text-green-600 font-medium">已支付</div>
                      </div>
                    </div>

                    <div className={`p-3 rounded-xl flex items-center mb-4 ${isStartingSoon ? 'bg-orange-50 border border-orange-100' : 'bg-gray-50'}`}>
                      <Clock size={16} className={`mr-2 ${isStartingSoon ? 'text-orange-500' : 'text-gray-400'}`} />
                      <div className="flex-1 flex justify-between items-center">
                        <span className={`text-[13px] font-bold ${isStartingSoon ? 'text-orange-700' : 'text-gray-700'}`}>
                          {order.date} {order.time || "20:00"}
                        </span>
                        {isStartingSoon && (
                          <span className="text-[12px] text-orange-600 font-medium flex items-center">
                            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-1.5 animate-pulse"></span>
                            距开始 15:00
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex space-x-2 pt-1">
                      <button 
                        onClick={() => pushView("counselor-order-detail" as any)}
                        className="flex-1 py-2.5 rounded-xl border border-gray-200 text-[13px] font-bold text-gray-700 active:bg-gray-50 transition-colors"
                      >
                        查看详情
                      </button>
                      {isPending && (
                        <button className="flex-1 py-2.5 rounded-xl border border-gray-200 text-[13px] font-bold text-gray-700 active:bg-gray-50 transition-colors">
                          改约
                        </button>
                      )}
                      {isPending && (
                        <button 
                          onClick={() => {
                          setSelectedCounselorOrder(order);
                          pushView("counselor-service-chat");
                        }}
                          className="flex-[1.5] py-2.5 rounded-xl bg-gray-900 text-white text-[13px] font-bold active:bg-gray-800 transition-colors shadow-md shadow-gray-900/10"
                        >
                          开始服务
                        </button>
                      )}
                    </div>
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
