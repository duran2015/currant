import { motion } from "motion/react";
import { useAppStore } from "../../store";
import { ChevronLeft, CheckCircle2, Circle, MessageSquare, Mic, User, Headphones } from "lucide-react";
import { mockConsultationRecords, mockCounselors } from "../../data";

export function ConsultationDetail() {
  const { popView, selectedConsultationId } = useAppStore();

  const record = mockConsultationRecords.find(r => r.id === selectedConsultationId) || mockConsultationRecords[0];
  const counselor = mockCounselors.find((c) => c.id === record.counselorId) || mockCounselors[0];

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
          咨询记录详情
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Header Info */}
        <div className="bg-white px-6 py-6 mb-2">
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={counselor.avatar}
              alt=""
              className="w-16 h-16 rounded-full object-cover shadow-sm border border-gray-100"
            />
            <div>
              <h2 className="font-bold text-gray-900 text-[18px] mb-1">
                {counselor.name}
              </h2>
              <p className="text-[13px] text-gray-500">
                {record.date} · {record.type === "text" ? "文字沟通" : `语音咨询 ${record.duration}分钟`}
              </p>
            </div>
            <div className="ml-auto w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center">
              {record.type === "text" ? <MessageSquare size={20} /> : <Mic size={20} />}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-[15px] font-bold text-gray-900 mb-2 flex items-center">
                <span className="w-1 h-3.5 bg-primary rounded-full mr-2"></span>
                沟通摘要
              </h3>
              <p className="text-[14px] text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-2xl">
                {record.summary}
              </p>
            </div>

            <div>
              <h3 className="text-[15px] font-bold text-gray-900 mb-2 flex items-center">
                <span className="w-1 h-3.5 bg-primary rounded-full mr-2"></span>
                咨询师建议
              </h3>
              <p className="text-[14px] text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-2xl">
                {record.counselorNotes}
              </p>
            </div>

            {record.actionItems.length > 0 && (
              <div>
                <h3 className="text-[15px] font-bold text-gray-900 mb-2 flex items-center">
                  <span className="w-1 h-3.5 bg-primary rounded-full mr-2"></span>
                  行动计划 (Action Items)
                </h3>
                <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
                  {record.actionItems.map((item, idx) => (
                    <div key={idx} className="flex items-center px-4 py-3 border-b border-gray-50 last:border-0">
                      {item.completed ? (
                        <CheckCircle2 size={18} className="text-green-500 mr-3 shrink-0" />
                      ) : (
                        <Circle size={18} className="text-gray-300 mr-3 shrink-0" />
                      )}
                      <span className={`text-[14px] ${item.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Chat History Section (if applicable) */}
        {record.messages && record.messages.length > 0 && (
          <div className="bg-white px-6 py-6 mb-8">
            <h3 className="text-[15px] font-bold text-gray-900 mb-4 flex items-center">
              <span className="w-1 h-3.5 bg-primary rounded-full mr-2"></span>
              历史聊天记录片段
            </h3>
            <div className="space-y-4">
              {record.messages.map((msg, idx) => {
                const isCounselor = msg.role === "counselor";
                return (
                  <div key={idx} className={`flex ${isCounselor ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-[80%] ${isCounselor ? 'order-1' : 'order-2'}`}>
                      <div className={`flex items-end mb-1 ${isCounselor ? 'justify-start' : 'justify-end'}`}>
                        <span className="text-[11px] text-gray-400 mx-2">{msg.timestamp}</span>
                      </div>
                      <div className={`p-3 rounded-2xl text-[14px] leading-relaxed ${
                        isCounselor 
                          ? 'bg-gray-100 text-gray-800 rounded-tl-sm' 
                          : 'bg-primary text-white rounded-tr-sm'
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}