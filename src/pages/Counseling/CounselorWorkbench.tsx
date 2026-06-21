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
    Video
  } from "lucide-react";
import { mockUser } from "../../data";

export function CounselorWorkbench() {
    const { pushView, enterAppMode, setSelectedCounselorOrder, activeCallSession } = useAppStore();
  const [activeTab, setActiveTab] = useState<"upcoming" | "requests" | "messages">("requests");
  
  // Status is now derived automatically: if there's an active call, counselor is busy; otherwise online.
  const isBusy = !!activeCallSession;

  // Mock data for requests
  const requests = [
      {
        id: "req-1",
        time: "14:00",
        dateLabel: "今天",
        userName: "匿名用户 0495",
        avatar: "https://i.pravatar.cc/150?img=47",
        type: "voice",
        tags: ["21岁·大学生", "高敏焦虑", "考研压力", "近期失眠", "脆弱敏感"],
        summary: "职业倦怠，情绪低落，近期压力较大"
      },
      {
        id: "req-2",
        time: "20:00",
        dateLabel: "今天",
        userName: "陈小希",
        avatar: "https://i.pravatar.cc/150?img=12",
        type: "voice",
        tags: ["25岁·财务", "焦虑依恋", "缺乏安全感"],
        summary: "亲密关系冲突，缺乏安全感"
      },
      {
        id: "req-3",
        time: "10:00",
        dateLabel: "明天",
        userName: "小林",
        avatar: "https://i.pravatar.cc/150?img=33",
        type: "video",
        tags: ["28岁·互联网运营", "职业倦怠", "情绪低落", "讨好型人格"],
        summary: "长期失眠，人际关系紧张，自我效能感低"
      }
    ];

  const upcoming = [
    {
      id: "ord-8890",
      userName: "陈小希",
      avatar: "https://i.pravatar.cc/150?img=12",
      type: "voice",
      time: "14:00",
      dateLabel: "昨天",
      tags: ["25岁·财务", "焦虑依恋", "缺乏安全感"],
      summary: "亲密关系冲突，缺乏安全感",
      status: "completed",
      counselorAdvice: "建议结合 MBTI 和霍兰德职业兴趣测试做一次深度探索，同时每天保持30分钟的有氧运动以缓解抑郁情绪。"
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
                <div className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-white ${isBusy ? "bg-orange-500" : "bg-green-500"}`}></div>
             </div>
             <div>
                <h1 className="text-[20px] font-bold text-gray-900 mb-1 leading-tight">林安 <span className="text-[12px] font-medium text-gray-500 font-normal">高级咨询师</span></h1>
                <div className="text-gray-600 text-[13px] font-medium flex items-center">
                  {isBusy ? (
                    <>🟠 忙线中</>
                  ) : (
                    <>🟢 在线接单</>
                  )}
                </div>
             </div>
           </div>
           <button 
             onClick={() => {
               enterAppMode("user");
             }}
             className="text-primary text-sm font-medium px-3 py-1.5 bg-primary/5 rounded-full"
           >
             切换为用户身份
           </button>
         </div>

         <div className="grid grid-cols-3 gap-3">
             <div className="bg-gray-50/50 border border-gray-100 p-3.5 rounded-2xl flex flex-col items-center">
                <div className="text-gray-500 text-[11px] mb-1 font-medium">用户评价</div>
                <div className="text-gray-400 font-bold text-[14px]">暂无</div>
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
                 className={`pb-2 text-[16px] font-bold transition-all relative ${activeTab === 'requests' ? 'text-gray-900' : 'text-[#999999]'}`}
               >
                 待咨询
                 <span className="absolute -top-1.5 -right-4 bg-[#FF3B30] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full rounded-bl-none leading-none shadow-sm">3</span>
                 {activeTab === 'requests' && (
                   <motion.div layoutId="counselorTab" className="absolute bottom-0 left-0 right-0 h-[3px] bg-gray-900 rounded-full" />
                 )}
               </button>
             <button 
               onClick={() => setActiveTab("upcoming")}
               className={`pb-2 text-[16px] font-bold transition-all relative ${activeTab === 'upcoming' ? 'text-gray-900' : 'text-[#999999]'}`}
             >
               已咨询
               {activeTab === 'upcoming' && (
                 <motion.div layoutId="counselorTab" className="absolute bottom-0 left-0 right-0 h-[3px] bg-gray-900 rounded-full" />
               )}
             </button>
             <button 
               onClick={() => setActiveTab("messages")}
               className={`pb-2 text-[16px] font-bold transition-all relative ${activeTab === 'messages' ? 'text-gray-900' : 'text-[#999999]'}`}
             >
               消息
               {activeTab === 'messages' && (
                 <motion.div layoutId="counselorTab" className="absolute bottom-0 left-0 right-0 h-[3px] bg-gray-900 rounded-full" />
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
                     <div 
                       key={req.id} 
                       onClick={() => {
                         setSelectedCounselorOrder(req);
                         pushView("counselor-order-detail");
                       }}
                       className="bg-white rounded-[16px] p-3 shadow-sm border border-[#F5F6F8] cursor-pointer active:scale-[0.98] transition-transform"
                     >
                        <div className="flex justify-between items-center mb-2">
                           <div className="flex items-center space-x-2">
                              <span className="text-[17px] font-bold text-gray-900 leading-none">{req.time}</span>
                              <span className="text-[12px] text-[#999999]">{req.dateLabel}</span>
                              <span className="text-[#E5E6EB]">|</span>
                              <img src={req.avatar} alt="user" className="w-[20px] h-[20px] rounded-full object-cover shrink-0" />
                              <span className="text-[14px] font-bold text-gray-900">{req.userName}</span>
                           </div>
                           <div className={`px-2 py-0.5 rounded-[4px] text-[10px] font-medium flex items-center ${req.type === 'voice' ? 'bg-[#F2F3FF] text-[#5C66FF]' : 'bg-[#E8F8F5] text-[#00BFA5]'}`}>
                              {req.type === 'voice' ? <Phone size={10} className="mr-1" /> : <Video size={10} className="mr-1" />}
                              {req.type === 'voice' ? '语音' : '视频'}
                           </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1.5 mb-2">
                           {req.tags.map(tag => (
                              <span key={tag} className="bg-[#F7F8FA] text-[#666666] px-1.5 py-[2px] rounded text-[10px] font-medium">{tag}</span>
                           ))}
                        </div>
 
                        <div className="bg-[#F4F9FF] rounded-md py-1.5 px-2.5 flex items-start">
                           <Sparkles size={12} className="text-[#5C66FF] mr-1 mt-0.5 shrink-0" />
                           <span className="text-[12px] text-[#333333] leading-snug">{req.summary}</span>
                        </div>
                     </div>
                   ))}
             </motion.div>
          ) : activeTab === "upcoming" ? (
               <motion.div
                 key="upcoming"
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 className="space-y-4"
               >
                 {upcoming.map(req => (
                  <div 
                    key={req.id} 
                    onClick={() => {
                      setSelectedCounselorOrder({ ...req, status: 'completed' });
                      pushView("counselor-patient-profile");
                    }}
                    className="bg-white rounded-[16px] p-3 shadow-sm border border-[#F5F6F8] cursor-pointer active:scale-[0.98] transition-transform"
                  >
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center space-x-2">
                           <span className="text-[17px] font-bold text-gray-900 leading-none">{req.time}</span>
                           <span className="text-[12px] text-[#999999]">{req.dateLabel}</span>
                           <span className="text-[#E5E6EB]">|</span>
                           <img src={req.avatar} alt="user" className="w-[20px] h-[20px] rounded-full object-cover shrink-0" />
                           <span className="text-[14px] font-bold text-gray-900">{req.userName}</span>
                        </div>
                        <div className={`px-2 py-0.5 rounded-[4px] text-[10px] font-medium flex items-center ${req.type === 'voice' ? 'bg-[#F2F3FF] text-[#5C66FF]' : 'bg-[#E8F8F5] text-[#00BFA5]'}`}>
                           {req.type === 'voice' ? <Phone size={10} className="mr-1" /> : <Video size={10} className="mr-1" />}
                           {req.type === 'voice' ? '语音' : '视频'}
                        </div>
                     </div>
                     
                     <div className="flex flex-wrap gap-1.5 mb-2">
                        {req.tags?.map(tag => (
                           <span key={tag} className="bg-[#F7F8FA] text-[#666666] px-1.5 py-[2px] rounded text-[10px] font-medium">{tag}</span>
                        ))}
                     </div>

                     <div className="bg-[#F9F9F9] rounded-md py-1.5 px-2.5 flex justify-between items-center mt-2">
                        <div className="flex items-center text-[12px] text-[#666666]">
                           <Sparkles size={12} className="text-[#5C66FF] mr-1" />
                           咨询已完成
                        </div>
                        <button className="text-[12px] font-medium text-[#5C66FF]">查看记录</button>
                     </div>
                   </div>
                 ))}
               </motion.div>
           ) : activeTab === "messages" ? (
             <motion.div
               key="messages"
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               className="space-y-3"
             >
               <button
                 onClick={() => pushView("counseling-text-chat")}
                 className="w-full bg-white p-4 rounded-3xl flex items-center shadow-sm border border-gray-50 active:scale-[0.98] transition-transform"
               >
                 <img src="https://i.pravatar.cc/150?img=12" alt="" className="w-12 h-12 rounded-full object-cover mr-4 shrink-0" />
                 <div className="flex-1 text-left">
                   <div className="flex justify-between items-center mb-1">
                     <h3 className="font-bold text-gray-900 text-[16px]">小林</h3>
                     <span className="text-[11px] text-gray-400">10:30</span>
                   </div>
                   <p className="text-[13px] text-gray-500 line-clamp-1">
                     (未读) 咨询师你好，我想问一下...
                   </p>
                 </div>
               </button>
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
