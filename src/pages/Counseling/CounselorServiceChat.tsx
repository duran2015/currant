import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAppStore } from "../../store";
import {
  ChevronLeft,
  AlertTriangle,
  Clock,
  FileText,
  User,
  Phone,
  Video,
  Send,
  Mic,
  CheckCircle,
  MoreVertical,
  Info
} from "lucide-react";

export function CounselorServiceChat() {
  const { popView, pushView, selectedCounselorOrder } = useAppStore();
  
  // States
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([
    { id: "1", role: "system", content: "服务已开始。当前服务类型：45分钟文字咨询。" },
    { id: "2", role: "user", content: "医生你好，我最近压力很大，总觉得什么都做不好。", timestamp: "14:00" },
    { id: "3", role: "counselor", content: "我听到了。可以具体说说是什么事情让你有这种感觉吗？慢慢来，我在这里听你讲。", timestamp: "14:02" }
  ]);
  const [showSummary, setShowSummary] = useState(true);
  const [showProcess, setShowProcess] = useState(true);
  
  // Auto-scroll
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    setMessages(prev => [
      ...prev,
      { id: Date.now().toString(), role: "counselor", content: inputText, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
    setInputText("");
  };

  // Mock order info
  const order = selectedCounselorOrder || {
    userName: "新用户",
    type: "text",
    time: "45"
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="absolute inset-0 z-[60] flex flex-col bg-[#f8f9fa] overflow-hidden"
    >
      {/* 1. 顶部服务信息 */}
      <div className="bg-white px-4 pt-14 pb-3 shadow-sm border-b border-gray-100 flex flex-col z-20">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <button
              onClick={popView}
              className="w-10 h-10 -ml-2 flex items-center justify-center text-gray-900 border border-transparent active:bg-gray-50 rounded-full transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="ml-1">
              <h1 className="text-[17px] font-bold text-gray-900 leading-tight">
                {order.userName || "小鹿用户3821"}
              </h1>
              <div className="flex items-center text-[12px] text-gray-500 mt-1">
                <span className="font-medium bg-gray-100 px-1.5 py-0.5 rounded text-[10px] mr-2">文字咨询</span>
                <span className="flex items-center text-orange-600 font-medium">
                  <Clock size={12} className="mr-1" /> 剩余 43:20
                </span>
              </div>
            </div>
          </div>
          <div className="flex space-x-3">
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-50">
              <Phone size={20} />
            </button>
            <button className="p-2 text-gray-300 rounded-full" onClick={() => alert("视频通话功能即将上线")}>
              <Video size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* 4. 快捷工具栏 (放置在顶部下方，方便随时点击) */}
      <div className="bg-white px-4 py-2 border-b border-gray-100 flex items-center justify-between z-10 overflow-x-auto hide-scrollbar">
        <div className="flex space-x-2 shrink-0">
          <button 
            onClick={() => setShowSummary(!showSummary)}
            className={`px-3 py-1.5 rounded-full text-[12px] font-medium flex items-center transition-colors ${showSummary ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-600'}`}
          >
            <Info size={14} className="mr-1" />
            摘要
          </button>
          <button 
            onClick={() => pushView("counselor-patient-profile" as any)}
            className="px-3 py-1.5 rounded-full text-[12px] font-medium flex items-center bg-gray-100 text-gray-600 active:bg-gray-200 transition-colors"
          >
            <User size={14} className="mr-1" />
            资料
          </button>
          <button className="px-3 py-1.5 rounded-full text-[12px] font-medium flex items-center bg-gray-100 text-gray-600 active:bg-gray-200 transition-colors">
            <FileText size={14} className="mr-1" />
            记要点
          </button>
          <button 
            onClick={() => pushView("counselor-risk-report")}
            className="px-3 py-1.5 rounded-full text-[12px] font-medium flex items-center bg-red-50 text-red-600 active:bg-red-100 transition-colors"
          >
            <AlertTriangle size={14} className="mr-1" />
            风险上报
          </button>
        </div>
        <button 
          onClick={() => pushView("counselor-session-notes" as any)}
          className="ml-4 shrink-0 px-3 py-1.5 rounded-full text-[12px] font-bold bg-gray-900 text-white active:scale-95 transition-transform"
        >
          结束服务
        </button>
      </div>

      <div className="flex-1 overflow-y-auto relative">
        {/* 2. 用户信息摘要卡 */}
        <AnimatePresence>
          {showSummary && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="px-4 pt-4 pb-2"
            >
              <div className="bg-white p-4 rounded-[1.2rem] shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-[14px] font-bold text-gray-900 flex items-center">
                    <Info size={16} className="text-primary mr-1.5" />
                    本单情况摘要
                  </h3>
                  <span className="text-[10px] bg-red-50 text-red-600 px-2 py-0.5 rounded font-bold border border-red-100">
                    含有轻度抑郁倾向
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start text-[13px]">
                    <span className="text-gray-400 w-16 shrink-0">主要困扰</span>
                    <span className="text-gray-800 font-medium">职场压力大，怀疑自我价值</span>
                  </div>
                  <div className="flex items-start text-[13px]">
                    <span className="text-gray-400 w-16 shrink-0">预约提问</span>
                    <span className="text-gray-800">"我不知道该不该离职，每天去公司都很痛苦..."</span>
                  </div>
                  <div className="flex items-start text-[13px]">
                    <span className="text-gray-400 w-16 shrink-0">量表状态</span>
                    <span className="text-gray-800">PHQ-9 (8分) 轻度，近期睡眠差</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 5. 接待流程卡 (作为置顶浮窗或消息流内的系统卡片) */}
        <AnimatePresence>
          {showProcess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mx-4 my-2 bg-blue-50/50 border border-blue-100 rounded-xl p-3 relative"
            >
              <button 
                onClick={() => setShowProcess(false)}
                className="absolute top-2 right-2 p-1 text-blue-300 hover:text-blue-500"
              >
                ×
              </button>
              <h4 className="text-[12px] font-bold text-blue-800 mb-2">接待流程指引 (仅自己可见)</h4>
              <div className="flex items-center justify-between text-[11px] text-blue-600/80 font-medium px-1">
                <div className="flex flex-col items-center opacity-50">
                  <CheckCircle size={16} className="mb-1 text-blue-500" />
                  <span>接住情绪</span>
                </div>
                <div className="h-[1px] flex-1 bg-blue-200 mx-2 mt-[-14px]"></div>
                <div className="flex flex-col items-center text-blue-700">
                  <div className="w-4 h-4 rounded-full border-2 border-blue-500 flex items-center justify-center mb-1 bg-white">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  </div>
                  <span>澄清问题</span>
                </div>
                <div className="h-[1px] flex-1 bg-blue-200 mx-2 mt-[-14px]"></div>
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full border-2 border-blue-300 mb-1"></div>
                  <span>区分事实</span>
                </div>
                <div className="h-[1px] flex-1 bg-blue-200 mx-2 mt-[-14px]"></div>
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full border-2 border-blue-300 mb-1"></div>
                  <span>梳理下一步</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3. 聊天消息列表 */}
        <div className="p-4 space-y-4 pb-6">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'system' ? 'justify-center' : msg.role === 'counselor' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'system' ? (
                <div className="bg-black/5 px-3 py-1 rounded-full text-[11px] text-gray-500 font-medium">
                  {msg.content}
                </div>
              ) : (
                <div className={`flex max-w-[85%] ${msg.role === 'counselor' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {msg.role === 'user' && (
                    <img 
                      src={order.avatar || "https://ui-avatars.com/api/?name=User&background=random"} 
                      className="w-8 h-8 rounded-full bg-gray-200 shrink-0 mr-2" 
                      alt="avatar" 
                    />
                  )}
                  <div className={`flex flex-col ${msg.role === 'counselor' ? 'items-end' : 'items-start'}`}>
                    <div className={`px-4 py-2.5 rounded-[1.2rem] text-[15px] ${
                      msg.role === 'counselor' 
                        ? 'bg-primary text-white rounded-tr-sm' 
                        : 'bg-white text-gray-800 rounded-tl-sm shadow-sm border border-gray-100'
                    }`}>
                      {msg.content}
                    </div>
                    <span className="text-[10px] text-gray-400 mt-1 px-1">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 6. 底部固定输入区 */}
      <div className="bg-white border-t border-gray-100 p-3 pb-safe z-20">
        {/* 快捷回复建议 */}
        <div className="flex space-x-2 mb-3 overflow-x-auto hide-scrollbar">
          <button 
            onClick={() => setInputText("你现在感觉怎么样？身体有什么具体的反应吗？")}
            className="shrink-0 px-3 py-1.5 bg-gray-50 text-gray-600 rounded-full text-[12px] active:bg-gray-100 transition-colors whitespace-nowrap"
          >
            你现在感觉怎么样？
          </button>
          <button 
            onClick={() => setInputText("我理解这种感受一定很难熬，慢慢来。")}
            className="shrink-0 px-3 py-1.5 bg-gray-50 text-gray-600 rounded-full text-[12px] active:bg-gray-100 transition-colors whitespace-nowrap"
          >
            共情/接纳
          </button>
          <button 
            onClick={() => setInputText("刚才发生的事情里，哪些是别人确实做的，哪些是你自己猜测的呢？")}
            className="shrink-0 px-3 py-1.5 bg-gray-50 text-gray-600 rounded-full text-[12px] active:bg-gray-100 transition-colors whitespace-nowrap"
          >
            区分事实与猜测
          </button>
        </div>

        <div className="flex items-end space-x-2">
          <button className="p-2.5 text-gray-400 hover:text-gray-600 rounded-full active:bg-gray-50 shrink-0">
            <Mic size={24} />
          </button>
          <div className="flex-1 bg-gray-100 rounded-2xl relative min-h-[44px]">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="回复用户..."
              className="w-full bg-transparent outline-none px-4 py-3 text-[15px] text-gray-800 resize-none max-h-[120px]"
              rows={1}
              style={{ minHeight: '44px' }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
          </div>
          <button 
            onClick={handleSend}
            disabled={!inputText.trim()}
            className={`p-2.5 rounded-full shrink-0 transition-colors ${
              inputText.trim() 
                ? 'bg-primary text-white shadow-md shadow-primary/20' 
                : 'bg-gray-100 text-gray-400'
            }`}
          >
            <Send size={20} className={inputText.trim() ? "ml-0.5" : ""} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
