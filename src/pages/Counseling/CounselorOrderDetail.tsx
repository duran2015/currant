import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useAppStore } from "../../store";
import { ArrowLeft, Clock, MessageSquare, AlertTriangle, User2, BookOpen, Sparkles, Phone, Video, Target, ChevronRight, Lock } from "lucide-react";

export function CounselorOrderDetail() {
  const { popView, pushView, selectedCounselorOrder, setActiveCallSession, setIsCallMinimized } = useAppStore();
  const [now, setNow] = useState(new Date());
  const [isRecordsExpanded, setIsRecordsExpanded] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const isVoiceOrVideo = selectedCounselorOrder?.type === 'voice' || selectedCounselorOrder?.type === 'video';
  
  let isLocked = false;
  let lockMessage = "";
  if (isVoiceOrVideo && selectedCounselorOrder) {
    let scheduledTime = new Date();
    const timeStr = selectedCounselorOrder.timeStr || selectedCounselorOrder.time;
    const dateStr = selectedCounselorOrder.dateStr || selectedCounselorOrder.date;
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
      isLocked = true;
      const openTime = new Date(scheduledTime.getTime() - 10 * 60000);
      const openDateStr = `${openTime.getMonth() + 1}月${openTime.getDate()}日`;
      lockMessage = `预计 ${openDateStr} ${openTime.getHours().toString().padStart(2, '0')}:${openTime.getMinutes().toString().padStart(2, '0')} 开放`;
    }
  }

  const handleEnterRoom = () => {
    if (!selectedCounselorOrder) return;
    if (isLocked) {
      alert(`咨询室将在开始前10分钟开放，请稍后再试\n（${lockMessage}）`);
      return;
    }
    if (isVoiceOrVideo) {
      setActiveCallSession(selectedCounselorOrder);
      setIsCallMinimized(false);
    } else {
      pushView("counseling-text-chat");
    }
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="absolute inset-0 bg-[#f8f9fa] z-[60] flex flex-col"
    >
      {/* 顶部导航 */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <button
          onClick={popView}
          className="w-8 h-8 flex items-center justify-center active:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft size={20} className="text-gray-900" />
        </button>
        <span className="font-bold text-gray-900 text-[16px]">预约详情</span>
        <div className="w-8"></div>
      </div>

      <div className="flex-1 overflow-y-auto w-full pb-32 px-3 pt-3">
         {/* 核心预约卡片（类似挂号单） */}
         <div className="bg-white rounded-[1.25rem] p-4 shadow-sm border border-gray-100 mb-3 relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <div className="text-[11px] text-gray-400 font-bold mb-0.5">预约时间</div>
                  <div className="flex items-baseline space-x-1.5">
                     <span className="text-[24px] font-black text-gray-900 tracking-tight leading-none">{selectedCounselorOrder?.timeStr || "14:00"}</span>
                     <span className="text-[12px] font-bold text-gray-500">{selectedCounselorOrder?.dateStr || "今天"}</span>
                  </div>
               </div>
               <div className="flex items-center text-[11px] font-bold px-2 py-1 rounded bg-gray-50 text-gray-700 mt-2">
                  {selectedCounselorOrder?.type === 'voice' ? <Phone size={12} className="mr-1 text-indigo-500" /> : selectedCounselorOrder?.type === 'video' ? <Video size={12} className="mr-1 text-green-500" /> : <MessageSquare size={12} className="mr-1 text-blue-500" />}
                  {selectedCounselorOrder?.type === 'voice' ? '语音咨询' : selectedCounselorOrder?.type === 'video' ? '视频咨询' : '文字沟通'}
               </div>
            </div>

            <button 
               onClick={() => pushView("counselor-patient-profile")}
               className="w-full flex items-center justify-between pt-4 border-t border-gray-50 active:opacity-70 transition-opacity text-left"
            >
               <div className="flex items-center space-x-2.5">
                 <img src={selectedCounselorOrder?.avatar || "https://ui-avatars.com/api/?name=User&background=random"} alt="" className="w-10 h-10 rounded-full object-cover border border-gray-100" />
                 <div>
                    <div className="text-[15px] font-bold text-gray-900 mb-0.5">{selectedCounselorOrder?.userName || "匿名用户 0495"}</div>
                    <div className="text-[11px] text-gray-500 font-medium">{selectedCounselorOrder?.userProfile || "21岁 · 大学生"}</div>
                 </div>
               </div>
               <ChevronRight size={16} className="text-gray-300" />
            </button>
         </div>

         {/* 临床档案 / 主诉与小鹿解读 */}
         <h3 className="font-bold text-[13px] text-gray-500 mb-2 px-1">就诊档案</h3>
         <div className="bg-white rounded-[1.25rem] p-4 shadow-sm border border-gray-100 mb-3">
            
            <div className="mb-4">
               <div className="text-[11px] text-gray-400 font-bold mb-2 flex items-center">
                 <Target size={12} className="mr-1" /> 用户主诉标签
               </div>
               <div className="flex flex-wrap gap-1.5">
                  {selectedCounselorOrder?.tags ? selectedCounselorOrder.tags.map((tag: string) => (
                    <span key={tag} className="bg-gray-50 text-gray-600 px-2 py-1 rounded text-[11px] font-medium border border-gray-100">{tag}</span>
                  )) : (
                    <>
                      <span className="bg-gray-50 text-gray-600 px-2 py-1 rounded text-[11px] font-medium border border-gray-100">高敏焦虑</span>
                      <span className="bg-gray-50 text-gray-600 px-2 py-1 rounded text-[11px] font-medium border border-gray-100">考研压力</span>
                      <span className="bg-gray-50 text-gray-600 px-2 py-1 rounded text-[11px] font-medium border border-gray-100">近期失眠</span>
                    </>
                  )}
               </div>
            </div>
            
            <div className="bg-blue-50/40 rounded-xl p-3 border border-blue-100/50">
               <div className="text-[11px] font-bold text-blue-500 mb-1.5 flex items-center">
                 <Sparkles size={12} className="mr-1" /> 小鹿初判摘要
              </div>
              <p className="text-[13px] text-gray-700 leading-relaxed">
                {selectedCounselorOrder?.aiSummary || "用户与小鹿对话时表现出较高的焦虑感，提及“考研复习进度落后”、“每天晚上愁得睡不着想哭”。目前判定处于中度压力状态，主要诉求点为考研压力导致的焦虑与失眠，无自伤自杀风险倾向。"}
               </p>
            </div>
         </div>

         {/* 过往记录 */}
         <div className="bg-white rounded-[1.25rem] p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
               <div className="flex items-center text-[13px] font-bold text-gray-700">
                 <BookOpen size={14} className="mr-1.5 text-gray-400" /> 过往接待记录 <span className="text-[11px] text-gray-400 font-normal ml-1">(2)</span>
               </div>
               <button 
                 onClick={() => setIsRecordsExpanded(!isRecordsExpanded)}
                 className="text-[11px] text-blue-500 font-bold active:opacity-70 transition-opacity flex items-center"
               >
                 {isRecordsExpanded ? '收起全部' : '查看全部'}
                 <ChevronRight size={12} className={`ml-0.5 transition-transform ${isRecordsExpanded ? '-rotate-90' : 'rotate-90'}`} />
               </button>
            </div>
            
            <div className="space-y-2">
               <div className="bg-gray-50 rounded-xl p-2.5 border border-gray-100">
                  <div className="flex justify-between items-center mb-1">
                     <span className="text-[12px] font-bold text-gray-900">2026年05月20日</span>
                     <span className="text-[10px] bg-white border border-gray-200 text-gray-600 px-1.5 py-0.5 rounded font-medium">文字沟通</span>
                  </div>
                  <p className={`text-[11px] text-gray-500 leading-relaxed ${!isRecordsExpanded ? 'line-clamp-2' : ''}`}>
                    上次咨询主要围绕期中考试压力展开，用户情绪平稳，布置了放松呼吸作业。
                    {isRecordsExpanded && (
                      <span className="block mt-1 pt-1 border-t border-gray-200/50">
                        【补充记录】：用户提到在宿舍容易受室友噪音影响，建议尝试沟通或者使用白噪音工具。需要在此次咨询中跟进沟通效果。
                      </span>
                    )}
                  </p>
               </div>
               
               <div className="bg-gray-50 rounded-xl p-2.5 border border-gray-100">
                  <div className="flex justify-between items-center mb-1">
                     <span className="text-[12px] font-bold text-gray-900">2026年05月12日</span>
                     <span className="text-[10px] bg-white border border-gray-200 text-gray-600 px-1.5 py-0.5 rounded font-medium">语音咨询</span>
                  </div>
                  <p className={`text-[11px] text-gray-500 leading-relaxed ${!isRecordsExpanded ? 'line-clamp-2' : ''}`}>
                    首次接触，建立咨访关系。用户倾诉了宿舍人际关系带来的困扰，进行了共情与倾听。
                    {isRecordsExpanded && (
                      <span className="block mt-1 pt-1 border-t border-gray-200/50">
                        【补充记录】：评估初步判断无重度抑郁或自杀倾向。用户属于高敏感人群，容易内耗。布置了每日写情绪日记的任务。
                      </span>
                    )}
                  </p>
               </div>
            </div>
         </div>
      </div>

      {/* 底部操作栏 */}
        <div className="absolute bottom-0 left-0 right-0 bg-white p-3 pb-8 border-t border-gray-100 flex space-x-2.5">
           <button 
             onClick={() => popView()}
             className="flex-1 bg-gray-50 text-gray-700 font-bold py-3 rounded-xl text-[14px] border border-gray-200 active:scale-95 transition-transform"
           >
              返回列表
           </button>
           {selectedCounselorOrder?.status === 'completed' ? (
             <div className="flex-[2]">
                <button 
                  onClick={() => {
                    if (selectedCounselorOrder.counselorNotesWritten) {
                      alert("您已完成本次会话的总结与评估。");
                    } else {
                      pushView("counselor-session-notes" as any);
                    }
                  }}
                  className={`w-full font-bold py-3 rounded-xl text-[14px] shadow-sm flex items-center justify-center transition-all active:scale-95 ${
                    selectedCounselorOrder.counselorNotesWritten
                      ? "bg-gray-100 text-gray-400 border border-gray-200"
                      : "bg-gray-900 text-white"
                  }`}
                >
                   <BookOpen size={16} className="mr-1.5" /> 
                   {selectedCounselorOrder.counselorNotesWritten ? "已填写会话总结" : "填写会话总结"}
                </button>
             </div>
           ) : (
             <div className="flex-[2] relative">
                 <div className="flex w-full space-x-2">
                   <button 
                     onClick={() => pushView("counseling-text-chat")}
                     className={`w-full font-bold py-3 rounded-xl text-[14px] shadow-sm flex items-center justify-center transition-all bg-gray-900 text-white active:scale-95`}
                   >
                     <MessageSquare size={16} className="mr-1.5" /> 联系用户
                   </button>
                 </div>
               </div>
           )}
        </div>
    </motion.div>
  );
}
