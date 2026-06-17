import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAppStore } from "../../store";
import { 
  Clock, 
  MessageSquare,
  Phone,
  Video,
  Target,
  Repeat2,
  ChevronRight,
  TrendingUp,
  Settings,
  Sparkles
} from "lucide-react";
import { mockUser } from "../../data";

export function CounselorWorkbench() {
  const { pushView, enterAppMode, setSelectedCounselorOrder } = useAppStore();
  const [activeTab, setActiveTab] = useState<"appointments" | "completed" | "messages">("appointments");

  // Mock data for appointments
  const appointments = [
    {
      id: "ord-1",
      timeStr: "14:00",
      dateStr: "今天",
      userName: "匿名用户 0495",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
      userProfile: "21岁 · 大学生",
      type: "voice",
      duration: "50分钟",
      aiSummary: "职业倦怠，情绪低落，近期压力较大",
      tags: ["高敏焦虑", "考研压力", "近期失眠", "脆弱敏感"],
      timestamp: new Date().setHours(14, 0, 0, 0),
      status: "pending"
    },
    {
      id: "ord-2",
      timeStr: "20:00",
      dateStr: "今天",
      userName: "陈小希",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
      userProfile: "25岁 · 财务",
      type: "voice",
      duration: "50分钟",
      aiSummary: "亲密关系冲突，缺乏安全感",
      tags: ["焦虑依恋", "缺乏安全感"],
      timestamp: new Date().setHours(20, 0, 0, 0),
      status: "pending"
    },
    {
      id: "ord-3",
      timeStr: "10:00",
      dateStr: "明天",
      userName: "小林",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
      userProfile: "28岁 · 互联网运营",
      type: "video",
      duration: "50分钟",
      aiSummary: "长期失眠，人际关系紧张，自我效能感低",
      tags: ["职业倦怠", "情绪低落", "讨好型人格"],
      timestamp: new Date().setDate(new Date().getDate() + 1),
      status: "pending"
    }
  ].sort((a, b) => a.timestamp - b.timestamp); // 按照预约临近时间做正排序

  const completed = [
    {
      id: "ord-4",
      timeStr: "10:00",
      dateStr: "昨天",
      userName: "李某某",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=11",
      userProfile: "32岁 · 自由职业",
      type: "voice",
      duration: "50分钟",
      aiSummary: "职业发展迷茫，轻度抑郁倾向",
      tags: ["职业规划", "轻度抑郁"],
      status: "completed",
      counselorAdvice: "建议结合 MBTI 和霍兰德职业兴趣测试做一次深度探索，同时每天保持30分钟的有氧运动以缓解抑郁情绪。"
    },
    {
      id: "ord-5",
      timeStr: "14:00",
      dateStr: "前天",
      userName: "王小明",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=12",
      userProfile: "19岁 · 大学生",
      type: "text",
      duration: "30分钟",
      aiSummary: "学业焦虑，对未来迷茫",
      tags: ["学业焦虑", "迷茫"],
      status: "completed",
      counselorAdvice: "" // 空字符串代表尚未补充建议
    }
  ];

  const isBusy = appointments.length > 0 && appointments[0].dateStr === "今天"; // 简单判断是否有今天的预约
  const status = isBusy ? "busy" : "online";

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
             </div>
             <div>
                <h1 className="text-[20px] font-bold text-gray-900 mb-1 leading-tight">林安 <span className="text-[12px] font-medium text-gray-500 font-normal">高级咨询师</span></h1>
                <div className="text-gray-600 text-[13px] font-medium mt-1">
                  {status === "online" ? "🟢 在线" : "🟠 咨询中"}
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
               <div className="text-gray-400 font-medium text-[12px] mt-1">暂无，还需努力</div>
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
             onClick={() => setActiveTab("appointments")}
             className={`pb-2 text-[16px] font-bold transition-all relative ${activeTab === 'appointments' ? 'text-gray-900' : 'text-gray-400'}`}
           >
             待咨询 <span className="absolute top-1 -right-2 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
             {activeTab === 'appointments' && (
               <motion.div layoutId="counselorTab" className="absolute bottom-0 left-0 right-0 h-1 bg-gray-900 rounded-full" />
             )}
           </button>
           <button 
             onClick={() => setActiveTab("completed")}
             className={`pb-2 text-[16px] font-bold transition-all relative ${activeTab === 'completed' ? 'text-gray-900' : 'text-gray-400'}`}
           >
             已咨询
             {activeTab === 'completed' && (
               <motion.div layoutId="counselorTab" className="absolute bottom-0 left-0 right-0 h-1 bg-gray-900 rounded-full" />
             )}
           </button>
           <button 
             onClick={() => setActiveTab("messages")}
             className={`pb-2 text-[16px] font-bold transition-all relative ${activeTab === 'messages' ? 'text-gray-900' : 'text-gray-400'}`}
           >
             消息
             {activeTab === 'messages' && (
               <motion.div layoutId="counselorTab" className="absolute bottom-0 left-0 right-0 h-1 bg-gray-900 rounded-full" />
             )}
           </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "appointments" ? (
             <motion.div
               key="appointments"
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               className="space-y-4"
             >
               {appointments.map(req => (
                 <button 
                   key={req.id} 
                   onClick={() => {
                     setSelectedCounselorOrder(req);
                     pushView("counselor-order-detail");
                   }}
                   className="w-full text-left bg-white rounded-[14px] p-4 shadow-sm border border-gray-100 relative active:scale-[0.98] transition-transform flex flex-col"
                 >
                    {/* 第一行：时间、方式与头像姓名 */}
                    <div className="flex justify-between items-center w-full mb-3">
                       <div className="flex items-center space-x-2 flex-1 min-w-0 mr-2">
                          <span className="text-[18px] font-black text-gray-900 tracking-tight leading-none shrink-0">{req.timeStr}</span>
                          <span className="text-[11px] font-bold text-gray-500 shrink-0">{req.dateStr}</span>
                          <div className="h-3 w-px bg-gray-200 mx-1 shrink-0"></div>
                          <img src={req.avatar} alt="" className="w-5 h-5 rounded-full object-cover border border-gray-100 shrink-0" />
                          <span className="text-[14px] font-bold text-gray-900 leading-none truncate">{req.userName}</span>
                       </div>
                       <div className="flex items-center shrink-0 text-[11px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 whitespace-nowrap">
                          {req.type === 'voice' ? <Phone size={10} className="mr-1" /> : req.type === 'video' ? <Video size={10} className="mr-1" /> : <MessageSquare size={10} className="mr-1" />}
                          {req.type === 'voice' ? '语音' : req.type === 'video' ? '视频' : '文字'}
                       </div>
                    </div>
                    
                    {/* 第二行：标签混合展示（防挤压自动换行） */}
                    <div className="flex flex-wrap gap-1.5 w-full mb-3 items-center">
                       <span className="text-[11px] text-gray-500 bg-gray-50 px-1.5 py-0.5 rounded shrink-0">{req.userProfile}</span>
                       {req.tags.map(tag => (
                          <span key={tag} className="bg-gray-50 text-gray-400 border border-gray-100 px-1.5 py-0.5 rounded text-[10px] font-medium shrink-0 whitespace-nowrap">{tag}</span>
                       ))}
                    </div>

                    {/* 第三行：AI 解读诉求 */}
                    <div className="bg-blue-50/40 rounded-xl p-2.5 border border-blue-100/30 w-full flex items-start space-x-1.5">
                       <Sparkles size={14} className="text-blue-500 shrink-0 mt-[1px]" />
                       <div className="text-[12px] text-gray-600 leading-snug font-medium line-clamp-2">
                         {req.aiSummary}
                       </div>
                    </div>
                 </button>
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
                 <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="" className="w-12 h-12 rounded-full object-cover mr-4 shrink-0" />
                 <div className="flex-1 text-left min-w-0">
                   <div className="flex justify-between items-center mb-1">
                     <h3 className="font-bold text-gray-900 text-[16px] truncate pr-2">小林</h3>
                     <span className="text-[11px] text-gray-400 shrink-0">10:30</span>
                   </div>
                   <p className="text-[13px] text-gray-500 line-clamp-1">
                     (未读) 咨询师你好，我想问一下...
                   </p>
                 </div>
               </button>
             </motion.div>
          ) : activeTab === "completed" ? (
             <motion.div
               key="completed"
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               className="space-y-4"
             >
               {completed.map(item => (
                 <button 
                   key={item.id} 
                   onClick={() => {
                     setSelectedCounselorOrder(item);
                     pushView("counselor-patient-profile");
                   }}
                   className="w-full text-left bg-white rounded-[14px] p-4 shadow-sm border border-gray-100 relative flex flex-col opacity-80 active:scale-[0.98] transition-transform"
                 >
                    {/* 第一行：时间、方式与头像姓名 */}
                    <div className="flex justify-between items-center w-full mb-3">
                       <div className="flex items-center space-x-2 flex-1 min-w-0 mr-2">
                          <span className="text-[16px] font-black text-gray-400 tracking-tight leading-none shrink-0">{item.timeStr}</span>
                          <span className="text-[11px] font-bold text-gray-400 shrink-0">{item.dateStr}</span>
                          <div className="h-3 w-px bg-gray-100 mx-1 shrink-0"></div>
                          <img src={item.avatar} alt="" className="w-5 h-5 rounded-full object-cover border border-gray-100 grayscale shrink-0" />
                          <span className="text-[14px] font-bold text-gray-500 leading-none truncate">{item.userName}</span>
                       </div>
                       <div className="flex items-center shrink-0 text-[11px] font-bold px-1.5 py-0.5 rounded bg-gray-50 text-gray-500 whitespace-nowrap">
                          {item.type === 'voice' ? <Phone size={10} className="mr-1" /> : item.type === 'video' ? <Video size={10} className="mr-1" /> : <MessageSquare size={10} className="mr-1" />}
                          {item.type === 'voice' ? '语音' : item.type === 'video' ? '视频' : '文字'}
                       </div>
                    </div>
                    
                    {/* 第二行：标签混合展示（防挤压自动换行） */}
                    <div className="flex flex-wrap gap-1.5 w-full mb-3 items-center">
                       <span className="text-[11px] text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded shrink-0">{item.userProfile}</span>
                       {item.tags.map(tag => (
                          <span key={tag} className="bg-gray-50 text-gray-400 border border-gray-100 px-1.5 py-0.5 rounded text-[10px] font-medium shrink-0 whitespace-nowrap">{tag}</span>
                       ))}
                    </div>

                    {/* 第三行：AI 解读诉求 */}
                    <div className="bg-gray-50/50 rounded-xl p-2.5 border border-gray-100/50 w-full flex items-start space-x-1.5 grayscale opacity-80 mb-3">
                       <Sparkles size={14} className="text-gray-400 shrink-0 mt-[1px]" />
                       <div className="text-[12px] text-gray-500 leading-snug font-medium line-clamp-2">
                         {item.aiSummary}
                       </div>
                    </div>
                    
                    {/* 底部：点击查看详情入口 */}
                    <div className="flex items-center justify-center w-full pt-1.5 border-t border-gray-50/50 text-[11px] font-bold text-blue-500">
                      查看该用户画像与定性总结 <ChevronRight size={12} className="ml-0.5" />
                    </div>
                 </button>
               ))}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
