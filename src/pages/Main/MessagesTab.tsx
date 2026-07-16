import { motion } from "motion/react";
import { useAppStore } from "../../store";
import { mockCounselors, mockConsultationRecords, mockNotifications } from "../../data";
import { ChevronRight, Bell, ShieldAlert, Mic, MessageSquare, Video, ArrowRight } from "lucide-react";

export function MessagesTab() {
  const { pushView, setTab, user, setSelectedConsultationId, setActiveCallSession, setIsCallMinimized, setBookingOrder, setSelectedCounselorOrder, orders, appMode, counselorStatus } = useAppStore();

  const isCounselorMode = appMode === "counselor";

  // Load chat list from valid orders (paid or completed)
  const chats = orders.filter(o => o.status === "paid" || o.status === "completed").map(record => {
    const counselor = mockCounselors.find(c => c.id === record.counselorId);
    return { record, counselor };
  }).filter(item => item.counselor);

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

      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-24">
        {/* Group 1: AI 倾诉分组 */}
        <div className="mb-6">
          <h2 className="text-[13px] font-bold text-gray-400 mb-3 px-2">AI 倾诉</h2>
          
          <button
            onClick={() => pushView("ai-chat")}
            className="w-full bg-white p-4 rounded-2xl flex items-center shadow-sm border border-gray-100 active:scale-[0.98] transition-transform mb-3"
          >
            <div className="relative mr-4 shrink-0">
              <div className="w-12 h-12 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-[24px]">
                🦌
              </div>
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div className="flex-1 text-left min-w-0">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center space-x-2 truncate">
                  <h3 className="font-bold text-gray-900 text-[16px] truncate">可鹿 AI 情绪助手</h3>
                  <span className="text-[10px] bg-orange-50 text-orange-600 px-1.5 py-0.5 rounded border border-orange-100 font-medium shrink-0">
                    平台 AI
                  </span>
                </div>
              </div>
              <div className="flex items-center text-[13px] text-gray-500">
                <p className="line-clamp-1">我可以继续陪你梳理刚才的问题。</p>
              </div>
            </div>
          </button>
        </div>

        {/* Group 2: 咨询服务分组 */}
        <div>
          <h2 className="text-[13px] font-bold text-gray-400 mb-3 px-2">咨询服务</h2>

          {/* System Notifications Chat */}
          <button
            onClick={() => pushView("notifications-list")}
            className="w-full bg-white p-4 rounded-2xl flex items-center shadow-sm border border-gray-100 active:scale-[0.98] transition-transform mb-3"
          >
            <div className="relative mr-4 shrink-0">
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-inner">
                <Bell size={24} />
              </div>
              {mockNotifications.some(n => !n.isRead) && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full" />
              )}
            </div>
            <div className="flex-1 text-left min-w-0">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center space-x-2 truncate">
                  <h3 className="font-bold text-gray-900 text-[16px] truncate">系统通知</h3>
                  <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded border border-blue-100 font-medium shrink-0">
                    官方
                  </span>
                </div>
                <span className="text-[11px] text-gray-400 shrink-0 ml-2">
                  {mockNotifications.length > 0 ? mockNotifications[0].date.split(" ")[0] : "今天"}
                </span>
              </div>
              <div className="flex items-center text-[13px] text-gray-500">
                <p className="line-clamp-1">
                  {mockNotifications.length > 0 ? mockNotifications[0].preview : "暂无新通知"}
                </p>
              </div>
            </div>
          </button>

          {/* Crisis Intervention Channel (Highest Priority) */}
          {user.hasRisk && (
            <button
              onClick={() => pushView("counseling-text-chat")}
              className="w-full bg-[#FFF0F0] p-4 rounded-2xl flex items-center shadow-sm border border-red-100 active:scale-[0.98] transition-transform mb-3 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-500 mr-4 shrink-0">
                <ShieldAlert size={24} />
              </div>
              <div className="flex-1 text-left">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-bold text-red-600 text-[16px]">危机干预专线</h3>
                  <span className="text-[11px] text-red-400">进行中</span>
                </div>
                <p className="text-[13px] text-red-500/80 line-clamp-1 font-medium">
                  专业干预员已接入，请随时与我联系
                </p>
              </div>
            </button>
          )}

          {/* Human Counselors Chats */}
          {chats.map(({ record, counselor }) => {
            const isText = record.type === "text";
            let lastMsg = "";
            let subStatus = "待咨询前准备";
            
            // Mock subStatus logic for demonstration
            if (record.status === "paid") {
               if (record.type === "voice" || record.type === "video") {
                 lastMsg = record.type === "voice" ? "语音咨询待履约..." : "视频咨询待履约...";
                 subStatus = "已同步摘要";
               } else {
                 lastMsg = record.messages && record.messages.length > 0 
                  ? record.messages[record.messages.length - 1].content 
                  : `${counselor?.name}的小助理：正式咨询前，我可以先帮你整理问题。`;
               }
            } else if (record.status === "completed") {
               lastMsg = "服务已完成";
               subStatus = "服务已完成";
            }
            
            const displayAvatar = isCounselorMode ? (record.avatar || "https://ui-avatars.com/api/?name=User&background=random") : counselor?.avatar;
            const displayName = isCounselorMode ? (record.userName || "匿名用户") : `${counselor?.name} · 45分钟心理咨询`;
              
            return (
              <button
                key={record.id}
                onClick={() => {
                  if (isCounselorMode) {
                    setSelectedCounselorOrder(record);
                  } else {
                    setBookingOrder(record);
                  }
                  setSelectedConsultationId(record.id);
                  pushView("counseling-text-chat");
                }}
                className="w-full bg-white p-4 rounded-2xl flex items-center shadow-sm border border-gray-100 active:scale-[0.98] transition-transform mb-3"
              >
                <div className="relative mr-4 shrink-0">
                  <img src={displayAvatar} alt="" className="w-12 h-12 rounded-full object-cover" />
                  {!isCounselorMode && (counselor?.id === 'c1' ? counselorStatus === 'active' : counselor?.status === 'online') && (
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                  {!isCounselorMode && !(counselor?.id === 'c1' ? counselorStatus === 'active' : counselor?.status === 'online') && (
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-gray-400 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center space-x-2 truncate">
                      <h3 className="font-bold text-gray-900 text-[15px] truncate">{displayName}</h3>
                    </div>
                    <span className="text-[11px] text-gray-400 shrink-0 ml-2">
                      {isText ? "今天" : record.date}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <div className="flex items-center text-[12px] text-gray-500 truncate mr-2">
                      <p className="line-clamp-1 truncate">
                        {lastMsg}
                      </p>
                    </div>
                    {!isCounselorMode && (
                      <span className="text-[10px] text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded shrink-0">
                        {subStatus}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
          
          {chats.length === 0 && !user.hasRisk && (
            <div className="pt-10 flex flex-col items-center justify-center text-gray-400">
              <div className="text-4xl mb-3 opacity-50">💭</div>
              <p className="text-[13px]">暂无沟通记录</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
