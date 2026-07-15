import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAppStore } from "../../store";
import { 
    Clock, 
    MessageSquare,
    Phone,
    Target,
    Repeat2,
    ChevronRight,
    TrendingUp,
    Settings,
    Sparkles,
    Video,
    Wallet,
    CalendarCheck,
    FileText,
    ShieldAlert,
    UserCheck,
    Power,
    CheckCircle,
    XCircle,
    ShoppingBag,
    Star
  } from "lucide-react";
import { mockUser } from "../../data";

export function CounselorWorkbench() {
  const { pushView, enterAppMode, resetToView, counselorStatus, setCounselorStatus, orders, setActiveOrderTab, setTab } = useAppStore();

  const pendingOrdersCount = orders.filter(o => o.counselorId === 'c1' && (o.status === 'paid' || o.status === 'pending')).length;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-full bg-[#f8f9fa] relative pb-24 overflow-y-auto w-full"
    >
      <div className="pt-14 pb-6 px-5 bg-white relative shadow-sm border-b border-gray-100">
         <div className="flex justify-between items-start mb-6">
           <div className="flex items-center space-x-3">
             <div className="relative">
                <img src={mockUser.avatar} alt="counselor" className="w-12 h-12 rounded-full border border-gray-100 object-cover shadow-sm" />
             </div>
             <div>
                <h1 className="text-[18px] font-bold text-gray-900 mb-0.5 leading-tight flex items-center">
                  林安
                  <span className="ml-2 bg-blue-50 text-blue-600 text-[10px] px-1.5 py-0.5 rounded font-medium">
                    已入驻
                  </span>
                </h1>
                <div className="text-gray-500 text-[12px] font-medium">
                  职场支持师
                </div>
             </div>
           </div>
           <button 
              onClick={() => enterAppMode("user")}
              className="text-white/80 bg-white/10 hover:bg-white/20 border border-white/20 text-[12px] font-medium px-3 py-1.5 rounded-full active:scale-95 transition-all"
            >
              切回用户端
            </button>
         </div>

         {/* Core Stats */}
         <div className="bg-gray-900 rounded-[1.2rem] p-5 text-white mb-2 shadow-md relative overflow-hidden">
           <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
           <div className="absolute -left-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
           
           <div className="flex justify-between items-center mb-5 relative z-10">
             <div className="flex flex-col">
               <span className="text-white/70 text-[12px] font-medium mb-1">本月预估收入 (元)</span>
               <div className="flex items-baseline">
                 <span className="text-[28px] font-bold">2,450.00</span>
               </div>
             </div>
             <button 
               onClick={() => pushView("counselor-earnings" as any)}
               className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm active:scale-95"
             >
               <ChevronRight size={18} className="text-white" />
             </button>
           </div>
           
           <div className="flex items-center space-x-6 relative z-10">
             <div>
               <span className="text-white/70 text-[11px] font-medium block mb-0.5">今日待服务</span>
               <span className="text-[16px] font-bold">{pendingOrdersCount}</span>
             </div>
             <div className="w-[1px] h-6 bg-white/10"></div>
             <div>
               <span className="text-white/70 text-[11px] font-medium block mb-0.5">今日已完成</span>
               <span className="text-[16px] font-bold">{orders.filter(o => o.counselorId === 'c1' && o.status === 'completed' && (o.date === '今天' || o.date === new Date().toISOString().split('T')[0])).length || 1}</span>
             </div>
           </div>
         </div>
      </div>

      <div className="px-4 pt-5 pb-12 w-full space-y-4">
        
        {/* Toggle Status */}
        <div className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${counselorStatus === 'active' ? 'bg-green-50 text-green-500' : 'bg-gray-50 text-gray-400'}`}>
              <Power size={20} />
            </div>
            <div>
              <div className="text-[15px] font-bold text-gray-900 mb-0.5">
                {counselorStatus === 'active' ? '当前在线接单中' : '已暂停接单'}
              </div>
              <div className="text-[11px] text-gray-500">
                {counselorStatus === 'active' ? '用户可以预约您的服务' : '用户暂时无法预约您的服务'}
              </div>
            </div>
          </div>
          <button 
            onClick={() => setCounselorStatus(counselorStatus === 'active' ? 'paused' : 'active')}
            className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 ${counselorStatus === 'active' ? 'bg-green-500' : 'bg-gray-200'}`}
          >
            <motion.div 
              layout
              className="w-6 h-6 bg-white rounded-full shadow-sm"
              animate={{ x: counselorStatus === 'active' ? 24 : 0 }}
            />
          </button>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h2 className="text-[15px] font-bold text-gray-900 mb-4 px-1">工作台捷径</h2>
          <div className="grid grid-cols-4 gap-y-5 gap-x-2">
            {[
              { icon: MessageSquare, label: "待咨询", color: "text-blue-500", bg: "bg-blue-50", view: "appointments", badge: pendingOrdersCount, tab: "pending" },
              { icon: CheckCircle, label: "已咨询", color: "text-green-500", bg: "bg-green-50", view: "appointments", tab: "completed" },
              { icon: ShoppingBag, label: "服务商品", color: "text-pink-500", bg: "bg-pink-50", view: "counselor-services" },
              { icon: Clock, label: "可服务时间", color: "text-purple-500", bg: "bg-purple-50", view: "counselor-schedule" },
              { icon: Star, label: "用户评价", color: "text-indigo-500", bg: "bg-indigo-50", view: "counselor-evaluations" },
              { icon: Wallet, label: "收入明细", color: "text-orange-500", bg: "bg-orange-50", view: "earnings" },
              { icon: UserCheck, label: "入驻资料", color: "text-teal-500", bg: "bg-teal-50", view: "counselor-onboarding" },
              { icon: CalendarCheck, label: "服务规则", color: "text-gray-500", bg: "bg-gray-50", view: "counselor-boundary" },
            ].map((item, i) => (
              <button 
                key={i} 
                onClick={() => {
                  if (item.tab) setActiveOrderTab(item.tab as any);
                  if (item.view === "appointments" || item.view === "earnings") {
                    setTab(item.view as any);
                  } else {
                    pushView(item.view as any);
                  }
                }}
                className="flex flex-col items-center active:scale-95 transition-transform relative"
              >
                <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center mb-1.5 relative`}>
                  <item.icon size={22} className={item.color} />
                  {item.badge ? (
                    <div className="absolute -top-1 -right-1 min-w-4 h-4 px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                      {item.badge}
                    </div>
                  ) : null}
                </div>
                <span className="text-[11px] text-gray-700 font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Risk Reminder */}
        <div 
          onClick={() => pushView("counselor-boundary" as any)}
          className="bg-red-50 border border-red-100 rounded-2xl p-4 flex items-start active:scale-[0.98] transition-transform cursor-pointer"
        >
          <ShieldAlert size={20} className="text-red-500 mr-3 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-[14px] font-bold text-red-800 mb-1">平台服务边界与风险提醒</h3>
            <p className="text-[12px] text-red-600/80 leading-relaxed">
              您提供的是职场支持服务，不是心理治疗、医学诊断或法律咨询。遇到危机事件请立即上报。点击查看完整规范。
            </p>
          </div>
          <ChevronRight size={16} className="text-red-300 mt-0.5 shrink-0" />
        </div>

      </div>
    </motion.div>
  );
}
