import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, Info, HelpCircle, ArrowRight, ArrowUp, Camera, Image as ImageIcon, Keyboard, Mic, Smile, PlayCircle, Video, FileText, Plus, PlusCircle, ClipboardList } from "lucide-react";
import { useAppStore } from "../../store";
import { mockCounselors, mockConsultationRecords } from "../../data";

export function TextChat() {
    const { popView, pushView, bookingOrder, selectedCounselorId, setSelectedCounselorId, selectedConsultationId, appMode, selectedCounselorOrder, setActiveCallSession, setIsSessionCounselorDetail } =
      useAppStore();

  const isCounselorMode = appMode === "counselor";

  // Get current order context
  const order = isCounselorMode ? selectedCounselorOrder : bookingOrder;
  const isVoiceOrVideo = order?.type === "voice" || order?.type === "video";

  const record = mockConsultationRecords.find(r => r.id === selectedConsultationId);
  const targetCounselorId = record?.counselorId || order?.counselorId || selectedCounselorId;
  const counselor = mockCounselors.find((c) => c.id === targetCounselorId) || mockCounselors[0];
  
  // For counselor mode, the "other party" is the user
  const otherParty = isCounselorMode ? {
    name: order?.userName || "匿名用户",
    avatar: order?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  } : {
    name: counselor.name,
    avatar: counselor.avatar,
  };

  const myParty = isCounselorMode ? {
    name: counselor.name,
    avatar: counselor.avatar,
  } : {
    name: "我",
    avatar: order?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  };

  const handleAvatarClick = () => {
    if (!isCounselorMode) {
      setSelectedCounselorId(targetCounselorId);
      // We pass a flag to indicate this detail view is opened from a session (read-only mode)
      setIsSessionCounselorDetail(true);
      pushView("counseling-detail");
    }
  };

  const baseMessages = [
    {
      id: "sys-0",
      role: "system",
      text: `交易已建立，专属沟通通道已开启。双方可在此沟通准备事项。临近咨询开始时，系统会在此通知双方。`,
      type: "system"
    },
    {
      id: "sys-1-booking",
      role: "system",
      text: `【预约成功】${order?.type === "text" ? "文字沟通" : order?.type === "voice" ? "语音咨询" : "视频咨询"}`,
      type: "booking_success"
    }
  ];

  const defaultMessages = [
    ...baseMessages,
    ...(record?.messages ? record.messages.map((m, i) => ({ id: i.toString(), role: m.role as "user" | "counselor", text: m.content, type: "text" })) : []),
    ...(order?.status === "paid" && isVoiceOrVideo ? [
      {
        id: "sys-upcoming-invite",
        role: "system",
        text: `距离您的${order?.type === 'video' ? '视频' : '语音'}咨询开始还有 5 分钟，请点击下方卡片进入咨询室。`,
        type: "system"
      },
      {
        id: "sys-room-invite",
        role: "system",
        text: "咨询室已开放",
        type: "room_invite"
      }
    ] : []),
    ...(order?.status === "completed" ? [
      {
        id: "sys-evaluation-prompt",
        role: "system",
        text: "本次咨询已结束，沟通记录已永久沉淀",
        type: "evaluation_prompt"
      }
    ] : []),
    ...(order?.status === "completed" && order?.counselorNotesWritten ? [
      {
        id: "sys-counselor-notes",
        role: "counselor",
        text: "这是一份关于您本次咨询的小结与下一步建议...",
        type: "counselor_notes"
      }
    ] : [])
  ];

  // Provide initial mock messages for the completed order
  const [messages, setMessages] = useState<{ id: string; role: "user" | "counselor" | "system"; text: string; type?: "text" | "scale" | "system" | "booking_success" | "room_invite" | "counselor_notes" | "evaluation_prompt" }[]>(() => {
    if (order?.id === "req-1" || order?.status === "completed") {
      return [
        ...defaultMessages,
        {
          id: "mock-1",
          role: "counselor",
          text: "你好，我是张医生。今天感觉怎么样？",
          type: "text"
        },
        {
          id: "mock-2",
          role: "user",
          text: "最近工作压力有点大，老是睡不好...",
          type: "text"
        }
      ] as any;
    }
    return defaultMessages as any;
  });
  const [inputValue, setInputValue] = useState("");
  const [inputMode, setInputMode] = useState<"text" | "voice">("text");
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [showPlusMenu, setShowPlusMenu] = useState(false);
  const [showEmojiMenu, setShowEmojiMenu] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const commonEmojis = ["😀","😂","😊","😍","🥰","😘","😎","🤔","🙄","😣","😪","😫","😌","😛","😜","🤤","😓","😔","🙃","😭","😱","😡","🤯","🤡","👻","💩","👍","👎","❤️","💔","✨","🎉","🔥","🌟","💯"];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const myRole = isCounselorMode ? "counselor" : "user";
  const otherRole = isCounselorMode ? "user" : "counselor";

  // Watch for counselor notes being written and append to chat
  useEffect(() => {
    if (order?.status === "completed" && order?.counselorNotesWritten) {
      setMessages(prev => {
        if (!prev.some(m => m.type === "counselor_notes")) {
          return [
            ...prev,
            {
              id: "sys-counselor-notes-new",
              role: "counselor",
              text: "这是一份关于您本次咨询的小结与下一步建议...",
              type: "counselor_notes"
            }
          ];
        }
        return prev;
      });
    }
  }, [order?.status, order?.counselorNotesWritten]);

  const handleSend = (text?: string) => {
    const userText = text || inputValue;
    if (!userText.trim()) return;

    const newMsgId = Date.now().toString();
    setMessages((prev) => [
      ...prev,
      { id: newMsgId, role: myRole, text: userText, type: "text" },
    ]);
    setInputValue("");
    setShowPlusMenu(false);
    setShowEmojiMenu(false);

    // reset textarea height
    const ta = document.querySelector('textarea');
    if (ta) ta.style.height = 'auto';

    // Simulate other party reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "_2",
          role: otherRole,
          text: isCounselorMode ? "好的，我明白了。" : "收到，请问还有其他需要准备的吗？",
          type: "text"
        },
      ]);
    }, 1500);
  };

  const handleSendScale = () => {
    const newMsgId = Date.now().toString();
    setMessages((prev) => [
      ...prev,
      { id: newMsgId, role: myRole, text: "【PHQ-9 抑郁症状评估】量表", type: "scale" },
    ]);
  };

  const handleEnterRoom = () => {
    if (!order) return;
    setActiveCallSession({
      orderId: order.id,
      type: order.type === "video" ? "video" : "voice",
      startTime: Date.now(),
    });
    pushView("voice-call");
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      className="flex flex-col h-full bg-[#f4f5f7] absolute inset-0 z-[100] overflow-hidden"
    >
      {/* Header */}
      <div className="pt-14 pb-3 px-4 bg-white z-20 flex items-center justify-between border-b border-gray-100 shadow-sm shrink-0">
        <div className="flex items-center">
          <button
            onClick={popView}
            className="w-10 h-10 -ml-2 flex items-center justify-center text-gray-900 active:bg-gray-50 rounded-full transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="ml-2 flex items-center">
            <img
              src={otherParty.avatar}
              alt=""
              onClick={handleAvatarClick}
              className={`w-8 h-8 rounded-full object-cover mr-2 ${!isCounselorMode ? 'cursor-pointer active:scale-95' : ''}`}
            />
            {order?.status === "completed" ? (
              <span className="text-[13px] font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                已结束本次咨询
              </span>
            ) : (
              <div>
                <h1 className="text-[15px] font-bold text-gray-900 leading-tight">
                  {otherParty.name}
                </h1>
                <div className="text-[10px] text-gray-500 bg-white/50 px-2 py-0.5 rounded-full inline-block backdrop-blur-sm shadow-sm border border-gray-100 mt-0.5">
                  {!isCounselorMode ? (counselor.type === "pro" ? "专业心理咨询师" : "专业心理倾听师") : "抑郁倾向 / 睡眠障碍"}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50" ref={scrollRef}>
        <div className="flex justify-center mb-6">
          <div className="bg-gray-100 text-gray-500 text-[11px] px-3 py-1 rounded-full flex items-center">
            知情同意书已签署
          </div>
        </div>
        
        {messages.map((msg) => {
          if (msg.type === "room_invite") {
            return (
              <div key={msg.id} className="flex justify-center my-4">
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl shadow-sm text-center w-64 max-w-[85%]">
                  <div className="flex items-center justify-center text-blue-600 mb-2">
                    {order?.type === "video" ? <Video size={20} className="mr-1.5" /> : <Mic size={20} className="mr-1.5" />}
                    <span className="font-bold text-[14px]">咨询室已开放</span>
                  </div>
                  <p className="text-[12px] text-gray-600 mb-4">请双方准时进入咨询室，开启本次履约</p>
                  <button 
                    onClick={handleEnterRoom}
                    className="w-full py-2.5 rounded-xl text-[14px] font-bold bg-blue-600 text-white active:bg-blue-700 transition-colors shadow-sm"
                  >
                    进入咨询室
                  </button>
                </div>
              </div>
            );
          }

          if (msg.type === "booking_success") {
            return (
              <div key={msg.id} className="flex justify-center my-4">
                <div className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm text-center w-64 max-w-[85%]">
                  <div className="flex items-center justify-center text-green-600 mb-2">
                    <PlayCircle size={18} className="mr-1.5" />
                    <span className="font-bold text-[14px]">预约订单已生成</span>
                  </div>
                  <p className="text-[13px] text-gray-800 font-medium mb-1">
                    【预约成功】{order?.type === "text" ? "文字沟通" : order?.type === "voice" ? "语音咨询" : "视频咨询"}
                  </p>
                  <p className="text-[11px] text-gray-500">时间: {order?.date} {order?.time}</p>
                </div>
              </div>
            );
          }

          if (msg.type === "evaluation_prompt") {
            return (
              <div key={msg.id} className="flex justify-center my-4">
                <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm w-64 max-w-[85%]">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mb-2">
                      <FileText size={24} />
                    </div>
                    <h3 className="font-bold text-gray-900 text-[15px] mb-1">本次咨询已结束</h3>
                    <p className="text-[12px] text-gray-500 mb-4">沟通记录已永久沉淀</p>
                    {isCounselorMode ? (
                      <button 
                        onClick={() => pushView("counselor-session-notes" as any)}
                        disabled={order?.counselorNotesWritten}
                        className={`w-full py-2.5 rounded-xl text-[14px] font-bold shadow-sm transition-all flex items-center justify-center ${order?.counselorNotesWritten ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-900 text-white active:scale-95'}`}
                      >
                        {order?.counselorNotesWritten ? "已发送小结" : "写小结与建议"}
                      </button>
                    ) : (
                      <button 
                        onClick={() => pushView("user-evaluation" as any)}
                        disabled={order?.isEvaluated}
                        className={`w-full py-2.5 rounded-xl text-[14px] font-bold shadow-sm transition-all flex items-center justify-center ${order?.isEvaluated ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-primary text-white active:scale-95'}`}
                      >
                        {order?.isEvaluated ? "已评价" : "去评价本次咨询"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          }

          if (msg.type === "scale") {
            return (
              <div
                key={msg.id}
                className={`flex ${msg.role === myRole ? "justify-end" : "justify-start"}`}
              >
                {msg.role === otherRole && (
                  <img
                    src={otherParty.avatar}
                    alt=""
                    onClick={handleAvatarClick}
                    className={`w-8 h-8 rounded-full object-cover mr-2 shrink-0 border border-gray-100 mt-1 ${!isCounselorMode ? 'cursor-pointer active:scale-95' : ''}`}
                  />
                )}
                <div className="max-w-[75%]">
                  <div className="bg-white border border-gray-100 p-3 rounded-2xl shadow-sm text-left w-56">
                    <div className="flex items-center text-primary mb-1.5">
                      <ClipboardList size={16} className="mr-1.5" />
                      <span className="font-bold text-[14px]">专业测评邀请</span>
                    </div>
                    <p className="text-[13px] text-gray-600 mb-3 leading-snug">{msg.text}</p>
                    <button 
                      onClick={() => !isCounselorMode && pushView("assessment-test" as any)}
                      className={`w-full py-2 rounded-xl text-[13px] font-bold transition-colors ${isCounselorMode ? 'bg-gray-50 text-gray-400 cursor-default' : 'bg-primary/10 text-primary active:bg-primary/20'}`}
                    >
                      {isCounselorMode ? "等待用户填写" : "点击填写"}
                    </button>
                  </div>
                </div>
                {msg.role === myRole && (
                  <img
                    src={myParty.avatar}
                    alt=""
                    className="w-8 h-8 rounded-full object-cover ml-2 shrink-0 border border-gray-100 mt-1"
                  />
                )}
              </div>
            );
          }

          if (msg.type === "counselor_notes") {
            return (
              <div
                key={msg.id}
                className={`flex ${msg.role === myRole ? "justify-end" : "justify-start"}`}
              >
                {msg.role === otherRole && (
                  <img
                    src={otherParty.avatar}
                    alt=""
                    onClick={handleAvatarClick}
                    className={`w-8 h-8 rounded-full object-cover mr-2 shrink-0 border border-gray-100 mt-1 ${!isCounselorMode ? 'cursor-pointer active:scale-95' : ''}`}
                  />
                )}
                <div className="max-w-[85%]">
                  <div className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm text-left w-64">
                    <div className="flex items-center text-green-600 mb-2">
                      <FileText size={16} className="mr-1.5" />
                      <span className="font-bold text-[14px]">咨询小结与建议</span>
                    </div>
                    <div className="bg-green-50/50 rounded-xl p-3 mb-3 border border-green-50">
                      <p className="text-[12px] text-gray-700 leading-relaxed mb-2"><span className="font-bold text-gray-900">小结：</span>本次沟通中，我们探讨了职场人际压力与自我认同感的问题。你在会话后半段展现出了很好的觉察力。</p>
                      <p className="text-[12px] text-gray-700 leading-relaxed"><span className="font-bold text-gray-900">建议：</span>本周可以尝试记录一次“自动思维”，并在感到压力时使用 4-7-8 呼吸法放松。我们下次见。</p>
                    </div>
                    <button 
                      onClick={() => pushView("counseling-summary-detail")}
                      className={`w-full py-2 rounded-xl text-[13px] font-bold transition-colors bg-green-50 text-green-600 active:bg-green-100`}
                    >
                      点击查看详情
                    </button>
                  </div>
                </div>
                {msg.role === myRole && (
                  <img
                    src={myParty.avatar}
                    alt=""
                    className="w-8 h-8 rounded-full object-cover ml-2 shrink-0 border border-gray-100 mt-1"
                  />
                )}
              </div>
            );
          }

          if (msg.type === "system" || msg.role === "system") {
            return (
              <div key={msg.id} className="flex justify-center my-4">
                <div className="bg-gray-100 text-gray-500 text-[11px] px-4 py-1.5 rounded-full text-center max-w-[85%] leading-relaxed">
                  {msg.text}
                </div>
              </div>
            );
          }

          return (
            <div
              key={msg.id}
              className={`flex ${msg.role === myRole ? "justify-end" : "justify-start"}`}
            >
              {msg.role === otherRole && (
                <img
                  src={otherParty.avatar}
                  alt=""
                  onClick={handleAvatarClick}
                  className={`w-8 h-8 rounded-full object-cover mr-2 shrink-0 border border-gray-100 mt-1 ${!isCounselorMode ? 'cursor-pointer active:scale-95' : ''}`}
                />
              )}
              <div className="max-w-[75%]">
                <div
                  className={`p-3 text-[14px] leading-relaxed shadow-sm ${msg.role === myRole ? "rounded-2xl rounded-tr-sm bg-primary text-white" : "rounded-2xl rounded-tl-sm bg-white border border-gray-100 text-gray-800"}`}
                >
                  {msg.text}
                </div>
              </div>
              {msg.role === myRole && (
                <img
                  src={myParty.avatar}
                  alt=""
                  className="w-8 h-8 rounded-full object-cover ml-2 shrink-0 border border-gray-100 mt-1"
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Input Area */}
      <div className={`absolute bottom-0 left-0 right-0 border-t pt-2 z-20 flex flex-col transition-colors duration-200 bg-[#f8f9fa] border-gray-200/60`}>
        {/* Input Row */}
        <div className={`px-3 pb-2 flex items-end space-x-2.5 relative z-10 transition-colors bg-[#f8f9fa]`}>
          <div className={`flex-1 rounded-[22px] border shadow-sm flex items-end min-h-[44px] relative transition-all overflow-hidden p-1 pl-1.5 ${isFocused ? 'ring-2 ring-primary/20 border-primary/40' : ''} bg-white border-gray-200`}>
            {/* + Menu Trigger (Inside input) */}
            <button 
              onClick={() => setShowPlusMenu(!showPlusMenu)} 
              className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors ${showPlusMenu ? 'text-gray-500 active:text-gray-400' : 'text-gray-400 active:text-gray-600'}`}
            >
              <PlusCircle size={24} strokeWidth={1.5} className={showPlusMenu ? 'rotate-45 transition-transform' : 'transition-transform'} />
            </button>

            {inputMode === "text" ? (
              <>
                <textarea
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    e.target.style.height = 'auto';
                    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
                    if (showPlusMenu) setShowPlusMenu(false);
                    if (showEmojiMenu) setShowEmojiMenu(false);
                  }}
                  onFocus={() => {
                    setIsFocused(true);
                    if (showPlusMenu) setShowPlusMenu(false);
                    if (showEmojiMenu) setShowEmojiMenu(false);
                  }}
                  onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                  onKeyDown={(e) => { 
                    if(e.key === "Enter" && !e.shiftKey) { 
                      e.preventDefault();
                      handleSend(); 
                    } 
                  }}
                  rows={1}
                  className={`flex-1 bg-transparent border-none outline-none text-[15px] px-2 py-2 resize-none max-h-[120px] self-center leading-relaxed text-gray-800 placeholder-gray-400`}
                  placeholder="发消息..."
                />
                <button 
                  onClick={() => { setShowEmojiMenu(!showEmojiMenu); setShowPlusMenu(false); }} 
                  className={`w-9 h-9 transition-colors flex items-center justify-center shrink-0 text-gray-400 active:text-primary`}
                >
                  <Smile size={22} strokeWidth={1.5} className={showEmojiMenu ? 'text-primary' : ''} />
                </button>
                {!inputValue.trim() && (
                  <button onClick={() => setInputMode("voice")} className={`w-9 h-9 transition-colors flex items-center justify-center shrink-0 text-gray-400 active:text-primary`}>
                    <Mic size={22} strokeWidth={1.5} />
                  </button>
                )}
              </>
            ) : (
              <div className="flex-1 flex items-center h-[36px] mt-0.5 pr-1">
                <button onClick={() => { setInputMode("text"); setShowEmojiMenu(false); }} className={`pl-1 pr-3 transition-colors flex items-center h-full shrink-0 text-gray-400 active:text-primary`}>
                  <Keyboard size={20} strokeWidth={1.5} />
                </button>
                <div 
                  className={`flex-1 h-[32px] rounded-full flex items-center justify-center font-bold text-[14px] select-none transition-colors cursor-pointer ${isRecording ? "bg-primary text-white" : "bg-gray-100 text-gray-700"}`}
                  onPointerDown={() => setIsRecording(true)}
                  onPointerUp={() => {
                    setIsRecording(false);
                    setIsTranscribing(true);
                    setTimeout(() => {
                      setIsTranscribing(false);
                      handleSend(isCounselorMode ? "好的，我来帮你看看。" : "我现在感觉有点焦虑，能陪我聊聊吗？");
                      setInputMode("text");
                    }, 1500);
                  }}
                  onPointerCancel={() => setIsRecording(false)}
                >
                  {isTranscribing ? "转译中..." : isRecording ? "松开 发送" : "按住 说话"}
                </div>
              </div>
            )}
          </div>

          {/* Send Button outside (only when typing) */}
          <AnimatePresence>
            {inputValue.trim() && (
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="shrink-0 mb-1"
              >
                <button onClick={() => handleSend()} className="w-[38px] h-[38px] bg-primary text-white rounded-full flex items-center justify-center shadow-md active:scale-95 transition-transform">
                  <ArrowUp size={22} strokeWidth={2.5} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Expandable Emoji Menu */}
          <AnimatePresence>
            {showEmojiMenu && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className={`overflow-hidden z-10 relative transition-colors bg-[#f8f9fa]`}
              >
                <div className={`p-4 border-t mt-3 mx-auto border-gray-200/50`}>
                  <div className="grid grid-cols-7 gap-2">
                    {commonEmojis.map((emoji, i) => (
                      <button 
                        key={i} 
                        onClick={() => {
                          setInputValue(prev => prev + emoji);
                        }}
                        className="text-[24px] flex items-center justify-center h-10 hover:bg-gray-100 active:bg-gray-200 rounded-lg transition-colors"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Expandable Plus Menu */}
        <AnimatePresence>
          {showPlusMenu && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className={`overflow-hidden z-10 relative transition-colors bg-[#f8f9fa]`}
            >
              <div className={`pt-4 pb-6 px-8 flex justify-center space-x-6 border-t mt-3 mx-auto border-gray-200/50`}>
                {[
                  { icon: ImageIcon, label: "相册", color: "text-blue-500", onClick: () => setShowPlusMenu(false) },
                  { icon: Camera, label: "拍摄", color: "text-gray-400", onClick: () => setShowPlusMenu(false) },
                  ...(isCounselorMode && order?.status === "paid" ? [
                    { icon: ClipboardList, label: "发送量表", color: "text-primary", onClick: () => { handleSendScale(); setShowPlusMenu(false); } }
                  ] : [
                    { icon: FileText, label: "文件", color: "text-orange-500", onClick: () => setShowPlusMenu(false) }
                  ])
                ].map((item, i) => (
                  <button key={i} onClick={item.onClick} className="flex flex-col items-center active:scale-95 transition-transform w-16">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm border mb-2 bg-white border-gray-100`}>
                      <item.icon size={26} strokeWidth={1.5} className={item.color} />
                    </div>
                    <span className={`text-[11px] font-medium text-gray-500`}>{item.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mock iOS Keyboard Presentation */}
        <AnimatePresence>
          {isFocused && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 260, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="w-full bg-[#D1D4D9] flex flex-col justify-start px-1 pt-3 pb-8 select-none overflow-hidden"
              onMouseDown={(e) => e.preventDefault()}
            >
              <div className="flex justify-center space-x-1.5 mb-3 px-1">
                {['Q','W','E','R','T','Y','U','I','O','P'].map(k => (
                  <div key={k} className="w-[9%] h-11 bg-white rounded-lg flex items-center justify-center text-[17px] font-medium text-gray-900 shadow-sm">{k}</div>
                ))}
              </div>
              <div className="flex justify-center space-x-1.5 mb-3 px-5">
                {['A','S','D','F','G','H','J','K','L'].map(k => (
                  <div key={k} className="w-[10%] h-11 bg-white rounded-lg flex items-center justify-center text-[17px] font-medium text-gray-900 shadow-sm">{k}</div>
                ))}
              </div>
              <div className="flex justify-center space-x-1.5 mb-3 px-1">
                <div className="w-[13%] h-11 bg-[#B3B6BE] rounded-lg flex items-center justify-center shadow-sm">
                  <ArrowUp size={18} strokeWidth={2.5} className="text-gray-900" />
                </div>
                {['Z','X','C','V','B','N','M'].map(k => (
                  <div key={k} className="w-[10%] h-11 bg-white rounded-lg flex items-center justify-center text-[17px] font-medium text-gray-900 shadow-sm">{k}</div>
                ))}
                <div className="w-[13%] h-11 bg-[#B3B6BE] rounded-lg flex items-center justify-center shadow-sm">
                  <svg width="22" height="16" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.5 1L1 7L5.5 13H16C16.5523 13 17 12.5523 17 12V2C17 1.44772 16.5523 1 16 1H5.5Z" stroke="#111" strokeWidth="1.5" strokeLinejoin="round"/>
                    <path d="M9 4.5L14 9.5M14 4.5L9 9.5" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <div className="flex justify-center space-x-1.5 px-1">
                <div className="w-[22%] h-11 bg-[#B3B6BE] rounded-lg flex items-center justify-center text-[15px] font-medium text-gray-900 shadow-sm">123</div>
                <div className="w-[12%] h-11 bg-[#B3B6BE] rounded-lg flex items-center justify-center shadow-sm"><Mic size={20} className="text-gray-900"/></div>
                <div className="w-[42%] h-11 bg-white rounded-lg flex items-center justify-center text-[15px] font-medium text-gray-900 shadow-sm">换行 (Shift+Enter)</div>
                <div className="w-[22%] h-11 bg-blue-500 rounded-lg flex items-center justify-center text-[15px] font-bold text-white shadow-sm" onClick={() => {
                  handleSend();
                  setIsFocused(false);
                }}>发送</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
