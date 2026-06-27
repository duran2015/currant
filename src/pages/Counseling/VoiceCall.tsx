import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAppStore } from "../../store";
import {
  Mic,
  MicOff,
  PhoneOff,
  Video as VideoIcon,
  VideoOff,
  MessageSquare,
  Volume2,
  ShieldAlert,
  Loader2,
  MoreVertical,
  SwitchCamera,
  Minimize2,
  Send,
  X
} from "lucide-react";
import { mockCounselors, mockUser } from "../../data";

type CallState = "connecting" | "in-call";

export function VoiceCall() {
  const { popView, pushView, bookingOrder, selectedCounselorOrder, selectedCounselorId, isCallMinimized, setIsCallMinimized, setActiveCallSession, updateOrder } = useAppStore();
  
  // Determine roles and order context
  const isCounselorView = !!selectedCounselorOrder;
  const order = isCounselorView ? selectedCounselorOrder : bookingOrder;
  const isVideo = order?.type === "video";
  
  const counselor = mockCounselors.find((c) => c.id === (order?.counselorId || selectedCounselorId)) || mockCounselors[0];
  const user = mockUser;

  const [callState, setCallState] = useState<CallState>("connecting");
  const [muted, setMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(!isVideo);
  const [speaker, setSpeaker] = useState(true);
  const [duration, setDuration] = useState(0);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<{ id: string; sender: "me" | "other"; text: string; time: string }[]>([]);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, showChat]);

  useEffect(() => {
    // Simulate connection delay
    const connectTimer = setTimeout(() => {
      setCallState("in-call");
    }, 2000);

    return () => clearTimeout(connectTimer);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (callState === "in-call") {
      timer = setInterval(() => {
        setDuration((d) => d + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [callState]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleHangup = () => {
    setActiveCallSession(null);
    if (order) {
      updateOrder(order.id, { status: "completed" });
    }
    setIsCallMinimized(false);
    popView();
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    const newMsg = {
      id: Date.now().toString(),
      sender: "me" as const,
      text: inputValue.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMsg]);
    setInputValue("");
    
    // Simulate reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: "other",
          text: isCounselorView ? "收到，请继续讲。" : "好的，我看到了。",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1000);
  };

  if (isCallMinimized) {
    return (
      <motion.div
        drag
        dragConstraints={{ left: 10, right: 300, top: 50, bottom: 700 }}
        dragElastic={0.1}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="absolute top-20 right-4 w-24 h-32 bg-gray-900 rounded-2xl shadow-2xl z-[200] overflow-hidden border-2 border-white/20 flex flex-col items-center justify-center"
        onClick={() => setIsCallMinimized(false)}
      >
        {isVideo && !cameraOff ? (
          <img 
            src={isCounselorView ? counselor.avatar : user.avatar} 
            alt="Self Stream" 
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-indigo-900/80 flex flex-col items-center justify-center">
            <img 
              src={isCounselorView ? user.avatar : counselor.avatar} 
              alt="Avatar" 
              className="w-10 h-10 rounded-full border-2 border-white/30 object-cover shadow-lg mb-2"
            />
            {callState === "connecting" ? (
              <Loader2 size={14} className="text-white/70 animate-spin" />
            ) : (
              <span className="text-[10px] text-white/90 font-mono bg-black/40 px-2 py-0.5 rounded-full">{formatTime(duration)}</span>
            )}
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="flex flex-col items-center justify-between h-full absolute inset-0 z-[100] bg-[#1a1c23] overflow-hidden"
    >
      {/* Background for Voice Mode */}
      {!isVideo && (
        <div className="absolute inset-0 bg-indigo-900/20 blur-[100px] opacity-60" />
      )}
      
      {/* Video Background for Video Mode (Main Stream) */}
      {isVideo && callState === "in-call" && !cameraOff && (
        <div className="absolute inset-0 z-0">
          <img 
            src={isCounselorView ? user.avatar : counselor.avatar} 
            alt="Main Stream" 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
        </div>
      )}

      {/* Top Bar Navigation */}
      <div className="relative z-20 w-full flex justify-between items-center px-4 pt-14 pb-4">
        <button
          onClick={() => setIsCallMinimized(true)}
          className="w-10 h-10 flex items-center justify-center text-white/70 active:bg-white/10 rounded-full transition-colors"
        >
          <Minimize2 size={22} />
        </button>
        
        <div className="flex flex-col items-center">
            <div className="flex bg-white/10 rounded-full px-2.5 py-1 space-x-1.5 items-center backdrop-blur-md mb-1">
              <ShieldAlert size={12} className="text-green-400" />
              <span className="text-[10px] text-white/90 font-medium tracking-wide">
                会议号: 849 201 394
              </span>
            </div>
            <span className="text-[12px] text-white/60 font-medium tracking-widest font-mono mt-0.5">
              {callState === "connecting" ? "连接中..." : formatTime(duration)}
            </span>
          </div>

        <button className="w-10 h-10 flex items-center justify-center text-white/70 active:bg-white/10 rounded-full">
          {isVideo ? <SwitchCamera size={20} /> : <MoreVertical size={20} />}
        </button>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 w-full px-8">
        
        {/* Voice Mode Layout */}
        {!isVideo && (
            <div className="flex flex-col items-center space-y-12 mt-4">
              <div className="flex items-center space-x-6">
                {/* User Avatar */}
                <div className="relative">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-[84px] h-[84px] rounded-full border-[1.5px] border-white/20 object-cover relative z-10"
                  />
                </div>
                
                {/* Connection Animation */}
                <div className="flex space-x-1.5 px-2">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
                      className="w-1.5 h-1.5 rounded-full bg-white/40"
                    />
                  ))}
                </div>
 
                {/* Counselor Avatar */}
                <div className="relative">
                  <AnimatePresence>
                    {callState === "in-call" && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: [1, 1.2, 1] }}
                        transition={{
                          repeat: Infinity,
                          duration: 2.5,
                          ease: "easeInOut",
                        }}
                        className="absolute inset-0 bg-indigo-500/40 rounded-full blur-md"
                      />
                    )}
                  </AnimatePresence>
                  <img
                    src={counselor.avatar}
                    alt={counselor.name}
                    className="w-[84px] h-[84px] rounded-full border-[2px] border-indigo-400/80 object-cover shadow-[0_0_20px_rgba(99,102,241,0.3)] relative z-10"
                  />
                </div>
              </div>
              
              <div className="text-center">
                <h1 className="text-[24px] font-bold text-white mb-2">
                  {isCounselorView ? order?.userName : counselor.name}
                </h1>
                {callState === "connecting" && (
                  <div className="flex items-center justify-center text-white/60 space-x-2 mt-1">
                    <span className="text-[13px] font-medium tracking-wide">
                      等待对方加入会议...
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

        {/* Video Mode Layout (PIP) */}
        {isVideo && callState === "in-call" && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="absolute bottom-8 right-6 w-28 h-40 bg-gray-800 rounded-xl overflow-hidden shadow-2xl border-2 border-white/20 z-30"
          >
            {cameraOff ? (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gray-800">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mb-2">
                  <VideoOff size={16} className="text-gray-400" />
                </div>
                <span className="text-[10px] text-gray-400">摄像头已关</span>
              </div>
            ) : (
              <img 
                src={isCounselorView ? counselor.avatar : user.avatar} 
                alt="Self Stream" 
                className="w-full h-full object-cover"
              />
            )}
          </motion.div>
        )}
        
        {isVideo && callState === "connecting" && (
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center mb-6 backdrop-blur-md">
              <VideoIcon size={32} className="text-white/50" />
            </div>
            <div className="flex items-center justify-center text-white/80 space-x-2">
              <Loader2 size={18} className="animate-spin" />
              <span className="text-[15px] font-medium tracking-wide">
                等待对方加入视频会议...
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Controls */}
        <div className="relative z-30 w-full px-8 pb-12 pt-6 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex items-center justify-between max-w-sm mx-auto">
            {/* Mute Button */}
            <button
              onClick={() => setMuted(!muted)}
              className="flex flex-col items-center space-y-2 w-16"
            >
              <div
                className={`w-[60px] h-[60px] rounded-full flex items-center justify-center transition-colors ${
                  muted ? "bg-white/90 text-black" : "bg-white/10 text-white backdrop-blur-md border border-white/10"
                }`}
              >
                {muted ? <MicOff size={24} /> : <Mic size={24} />}
              </div>
              <span className="text-[12px] text-white/80 font-medium">
                {muted ? "解除静音" : "静音"}
              </span>
            </button>

            {isVideo && (
              <button
                onClick={() => setCameraOff(!cameraOff)}
                className="flex flex-col items-center space-y-2 w-16"
              >
                <div
                  className={`w-[60px] h-[60px] rounded-full flex items-center justify-center transition-colors ${
                    cameraOff ? "bg-white/90 text-black" : "bg-white/10 text-white backdrop-blur-md border border-white/10"
                  }`}
                >
                  {cameraOff ? <VideoOff size={24} /> : <VideoIcon size={24} />}
                </div>
                <span className="text-[12px] text-white/80 font-medium">
                  {cameraOff ? "开启视频" : "关闭视频"}
                </span>
              </button>
            )}
            
            {!isVideo && (
              <button
                className="flex flex-col items-center space-y-2 w-16"
              >
                <div className="w-[60px] h-[60px] rounded-full flex items-center justify-center bg-white/10 text-white backdrop-blur-md border border-white/10">
                  <Volume2 size={24} />
                </div>
                <span className="text-[12px] text-white/80 font-medium">
                  免提
                </span>
              </button>
            )}

            {/* Chat Button */}
            <button
              onClick={() => setShowChat(true)}
              className="flex flex-col items-center space-y-2 w-16 relative"
            >
              <div className="w-[60px] h-[60px] rounded-full flex items-center justify-center bg-white/10 text-white backdrop-blur-md border border-white/10 relative">
                <MessageSquare size={24} />
                {messages.length > 0 && messages[messages.length - 1].sender === "other" && !showChat && (
                  <div className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#1a1c23]" />
                )}
              </div>
              <span className="text-[12px] text-white/80 font-medium">
                聊天
              </span>
            </button>

            {/* Hangup Button */}
            <button
              onClick={handleHangup}
              className="flex flex-col items-center space-y-2 w-16"
            >
              <div className="w-[60px] h-[60px] rounded-full flex items-center justify-center bg-[#FF3B30] text-white shadow-lg shadow-red-500/30 active:scale-95 transition-transform">
                <PhoneOff size={24} />
              </div>
              <span className="text-[12px] text-white/80 font-medium">
                挂断
              </span>
            </button>
          </div>
        </div>

      {/* Chat Overlay */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute inset-0 z-[110] bg-[#1a1c23]/95 backdrop-blur-lg flex flex-col"
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
              <h2 className="text-white font-medium">会议聊天</h2>
              <button
                onClick={() => setShowChat(false)}
                className="w-8 h-8 flex items-center justify-center text-white/70 active:bg-white/10 rounded-full"
              >
                <X size={24} />
              </button>
            </div>

            {/* Messages List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-white/40">
                  <MessageSquare size={32} className="mb-2 opacity-50" />
                  <span className="text-[13px]">暂无聊天记录</span>
                  <span className="text-[11px] mt-1">这里发送的消息仅在会议中可见</span>
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === "me" ? "items-end" : "items-start"}`}
                  >
                    <span className="text-[10px] text-white/40 mb-1 px-1">{msg.sender === "me" ? "我" : (isCounselorView ? order?.userName : counselor.name)} {msg.time}</span>
                    <div
                      className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-[14px] leading-relaxed ${
                        msg.sender === "me"
                          ? "bg-indigo-500 text-white rounded-tr-sm"
                          : "bg-white/10 text-white/90 rounded-tl-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-black/20 border-t border-white/5">
              <div className="flex items-center bg-white/10 rounded-full p-1 border border-white/10">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="输入消息..."
                  className="flex-1 bg-transparent text-white placeholder-white/40 px-4 text-[14px] outline-none"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors shrink-0 ${
                    inputValue.trim() ? "bg-indigo-500 text-white" : "bg-white/5 text-white/30"
                  }`}
                >
                  <Send size={16} className={inputValue.trim() ? "ml-0.5" : ""} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
