import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAppStore } from "../../store";
import { 
  Clock, 
  MessageSquare,
  Phone,
  Target,
  LogOut,
  ChevronRight,
  TrendingUp,
  Settings
} from "lucide-react";
import { mockUser } from "../../data";

export function CounselorWorkbench() {
  const { pushView, resetToView, setAppMode } = useAppStore();
  const [status, setStatus] = useState<"online" | "busy" | "offline">("online");
  const [activeTab, setActiveTab] = useState<"upcoming" | "requests">("requests");

  // Mock data for requests
  const requests = [
    {
      id: "req-1",
      userName: "匿名用户 0495",
      type: "voice",
      duration: "30分钟",
      price: 159,
      tags: ["高敏焦虑", "考研压力"],
      timeRequested: "10分钟前",
    },
    {
      id: "req-2",
      userName: "小林",
      type: "text",
      duration: "30分钟",
      price: 69,
      tags: ["情绪低落", "失眠"],
      timeRequested: "15分钟前",
    }
  ];

  const upcoming = [
    {
      id: "ord-8890",
      userName: "陈小希",
      avatar: "https://i.pravatar.cc/150?img=12",
      type: "voice",
      time: "今天 20:00 - 20:30",
      status: "pending_call"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-full bg-[#f8f9fa] absolute inset-0 z-50 w-full overflow-y-auto"
    >
      <div className="pt-14 pb-6 px-6 bg-white relative shadow-[0_2px_20px_rgba(0,0,0,0.02)]">
         <div className="flex justify-between items-start mb-6">
           <div className="flex items-center space-x-4">
             <div className="relative">
                <img src={mockUser.avatar} alt="counselor" className="w-14 h-14 rounded-full border border-gray-100 object-cover shadow-sm" />
                <div className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-white ${status === "online" ? "bg-green-500" : status === "busy" ? "bg-orange-500" : "bg-gray-400"}`}></div>
             </div>
             <div>
                <h1 className="text-[20px] font-bold text-gray-900 mb-1 leading-tight">林安 <span className="text-[12px] font-medium text-gray-500 font-normal">高级咨询师</span></h1>
                <select 
                  value={status} 
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="bg-transparent text-gray-600 text-[13px] font-medium p-0 border-none outline-none focus:ring-0 active:bg-transparent"
                >
                  <option value="online">🟢 在线接单的</option>
                  <option value="busy">🟠 忙线中</option>
                  <option value="offline">⚫ 休息中</option>
                </select>
             </div>
           </div>
           <button 
             onClick={() => {
                setAppMode("user");
                resetToView("login");
             }}
             className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-50 active:text-gray-600 transition-colors"
           >
             <LogOut size={20} />
           </button>
         </div>

         <div className="grid grid-cols-3 gap-3">
            <div className="bg-gray-50/50 border border-gray-100 p-3.5 rounded-2xl flex flex-col items-center">
               <div className="text-gray-500 text-[11px] mb-1 font-medium">今日收益</div>
               <div className="text-gray-900 font-bold text-[18px]">¥850</div>
            </div>
            <div className="bg-gray-50/50 border border-gray-100 p-3.5 rounded-2xl flex flex-col items-center">
               <div className="text-gray-500 text-[11px] mb-1 font-medium">待服务</div>
               <div className="text-gray-900 font-bold text-[18px]">3</div>
            </div>
            <div className="bg-gray-50/50 border border-gray-100 p-3.5 rounded-2xl flex flex-col items-center">
               <div className="text-gray-500 text-[11px] mb-1 font-medium">接单率</div>
               <div className="text-gray-900 font-bold text-[18px] flex items-baseline">98<span className="text-[12px]">%</span></div>
            </div>
         </div>
      </div>

      <div className="px-5 pt-4 pb-12 w-full">
        <div className="flex space-x-6 mb-4 px-2">
           <button 
             onClick={() => setActiveTab("requests")}
             className={`pb-2 text-[16px] font-bold transition-all relative ${activeTab === 'requests' ? 'text-gray-900' : 'text-gray-400'}`}
           >
             新派单 <span className="absolute top-1 -right-2 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
             {activeTab === 'requests' && (
               <motion.div layoutId="counselorTab" className="absolute bottom-0 left-0 right-0 h-1 bg-gray-900 rounded-full" />
             )}
           </button>
           <button 
             onClick={() => setActiveTab("upcoming")}
             className={`pb-2 text-[16px] font-bold transition-all relative ${activeTab === 'upcoming' ? 'text-gray-900' : 'text-gray-400'}`}
           >
             即将开始
             {activeTab === 'upcoming' && (
               <motion.div layoutId="counselorTab" className="absolute bottom-0 left-0 right-0 h-1 bg-gray-900 rounded-full" />
             )}
           </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "requests" ? (
             <motion.div
               key="requests"
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               className="space-y-4"
             >
               {requests.map(req => (
                 <div key={req.id} className="bg-white rounded-3xl p-5 shadow-[0_2px_15px_rgba(0,0,0,0.02)] border border-gray-50 relative overflow-hidden">
                    <div className="flex justify-between items-start mb-4">
                       <div className="flex items-center space-x-3">
                         <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${req.type === 'voice' ? 'bg-indigo-50/50 text-indigo-500 border-indigo-100' : 'bg-blue-50/50 text-blue-500 border-blue-100'}`}>
                           {req.type === 'voice' ? <Phone size={16} /> : <MessageSquare size={16} />}
                         </div>
                         <div>
                            <div className="text-[16px] font-bold text-gray-900 mb-0.5">{req.userName}</div>
                            <div className="text-[12px] text-gray-500">{req.type === 'voice' ? '语音连线' : '文字倾听'} · {req.duration}</div>
                         </div>
                       </div>
                       <div className="text-right">
                          <div className="text-[18px] font-black tracking-tight text-gray-900 flex items-baseline justify-end"><span className="text-[12px] font-bold mr-0.5">¥</span>{req.price}</div>
                          <div className="text-[10px] text-gray-400 mt-1 flex items-center"><Clock size={10} className="mr-0.5" />{req.timeRequested}</div>
                       </div>
                    </div>
                    
                    <div className="flex space-x-2 mb-5">
                       {req.tags.map(tag => (
                          <span key={tag} className="bg-gray-50 text-gray-600 border border-gray-100 px-2.5 py-1 rounded-md text-[11px] font-medium">{tag}</span>
                       ))}
                    </div>

                    <div className="flex space-x-3 pt-4 border-t border-gray-50">
                       <button className="flex-1 bg-white border border-gray-200 text-gray-600 font-bold py-3 rounded-2xl text-[13px] active:bg-gray-50 transition-colors">
                         婉拒
                       </button>
                       <button 
                         onClick={() => pushView("counselor-order-detail")}
                         className="flex-[2] bg-gray-900 text-white font-bold py-3 rounded-2xl text-[13px] hover:bg-gray-800 shadow-sm flex items-center justify-center transition-colors"
                       >
                         查看详情接单 <ChevronRight size={14} className="ml-1" />
                       </button>
                    </div>
                 </div>
               ))}
             </motion.div>
          ) : (
            <motion.div
               key="upcoming"
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               className="space-y-4"
             >
               {upcoming.map(item => (
                 <div key={item.id} className="bg-white rounded-3xl p-5 shadow-[0_2px_15px_rgba(0,0,0,0.02)] border border-gray-50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-green-50 text-green-600 text-[10px] font-bold px-3 py-1.5 rounded-bl-xl z-10 border-b border-l border-green-100/50">
                      待接听
                    </div>
                    
                    <div className="flex items-center space-x-3 mb-5 mt-1">
                       <img src={item.avatar} alt={item.userName} className="w-14 h-14 rounded-full border border-gray-100 object-cover" />
                       <div>
                          <div className="text-[18px] font-bold text-gray-900 mb-1">{item.userName}</div>
                          <div className="flex items-center text-[12px] text-gray-500 font-medium bg-gray-50 px-2 py-0.5 rounded-md w-fit">
                             <Clock size={12} className="mr-1" /> {item.time}
                          </div>
                       </div>
                    </div>

                    <div className="bg-gray-50/50 p-3.5 rounded-2xl mb-5 border border-gray-100 flex items-center justify-between">
                       <span className="text-[13px] text-gray-500 font-medium">服务项目</span>
                       <span className="text-[13px] font-bold text-gray-900 flex items-center">
                         {item.type === 'voice' ? <Phone size={14} className="mr-1.5 text-indigo-500" /> : <MessageSquare size={14} className="mr-1.5 text-blue-500" />}
                         {item.type === 'voice' ? '语音倾听' : '文字聊天'} (30分钟)
                       </span>
                    </div>

                    <div className="flex space-x-3">
                       <button 
                         onClick={() => pushView("counselor-patient-profile")}
                         className="flex-1 bg-white text-gray-700 font-bold py-3.5 rounded-2xl text-[13px] flex items-center justify-center border border-gray-200 transition-colors active:bg-gray-50"
                       >
                         <Target size={16} className="mr-1.5" /> 画像档案
                       </button>
                       <button 
                         onClick={() => pushView("counseling-call")}
                         className="flex-1 bg-gray-900 text-white font-bold py-3.5 rounded-2xl text-[13px] shadow-sm flex items-center justify-center transition-colors hover:bg-gray-800"
                       >
                         <Phone size={16} className="mr-1.5" /> 进入连线
                       </button>
                    </div>
                 </div>
               ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

