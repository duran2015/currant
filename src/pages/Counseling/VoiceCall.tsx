import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAppStore } from "../../store";
import {
  Mic,
  MicOff,
  PhoneOff,
  VideoOff,
  MessageSquare,
  Volume2,
  ShieldAlert,
  Loader2,
} from "lucide-react";
import { mockCounselors } from "../../data";

type CallState = "connecting" | "in-call";

export function VoiceCall() {
  const { pushView, resetToView, bookingOrder, selectedCounselorId } =
    useAppStore();
  const counselor =
    mockCounselors.find(
      (c) => c.id === (bookingOrder?.counselorId || selectedCounselorId),
    ) || mockCounselors[0];

  const isTextMode = bookingOrder?.type === "text";
  const [callState, setCallState] = useState<CallState>("connecting");
  const [muted, setMuted] = useState(false);
  const [speaker, setSpeaker] = useState(true);
  const [duration, setDuration] = useState(0);

  const [textInput, setTextInput] = useState("");
  const [chatMessages, setChatMessages] = useState<
    { role: "user" | "counselor"; text: string }[]
  >([
    {
      role: "counselor",
      text: "你好，我是你的咨询师。现在我们开始了文字咨询。",
    },
  ]);

  useEffect(() => {
    // Simulate connection delay
    const connectTimer = setTimeout(() => {
      setCallState("in-call");
    }, 2500);

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
    // Move to summary
    pushView("counseling-summary");
  };

  const handleSendText = () => {
    if (!textInput.trim()) return;
    setChatMessages((prev) => [...prev, { role: "user", text: textInput }]);
    setTextInput("");
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          role: "counselor",
          text: "恩，我理解您的感受，这部分我们可以慢慢梳理。",
        },
      ]);
    }, 1500);
  };

  if (isTextMode) {
    return (
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="flex flex-col h-full bg-[#f8f9fa] absolute inset-0 z-[100] overflow-hidden"
      >
        <div className="pt-14 pb-4 px-4 bg-white sticky top-0 z-20 flex items-center shadow-sm">
          <div className="flex-1 text-center">
            <h1 className="text-[17px] font-bold text-gray-900">
              {counselor.name}
            </h1>
            <p className="text-[11px] text-gray-400 mt-0.5">文字沟通进行中</p>
          </div>
          <button
            onClick={handleHangup}
            className="text-sm font-bold text-red-500 absolute right-4"
          >
            结束
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chatMessages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start mt-6"}`}
            >
              {msg.role === "counselor" && (
                <img
                  src={counselor.avatar}
                  alt=""
                  className="w-10 h-10 rounded-full object-cover mr-3 shadow-sm border border-gray-100"
                />
              )}
              <div
                className={`max-w-[75%] p-3 text-[14px] leading-relaxed shadow-sm ${msg.role === "user" ? "rounded-2xl rounded-br-none bg-primary text-white" : "rounded-2xl rounded-tl-none bg-white border border-gray-100 text-gray-800"}`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white p-4 pb-8 border-t border-gray-100 flex items-center space-x-3">
          <input
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendText()}
            placeholder="发送消息给咨询师..."
            className="flex-1 bg-gray-50 border border-gray-100 px-4 py-2.5 rounded-full outline-none text-[14px]"
          />
          <button
            onClick={handleSendText}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${textInput.trim() ? "bg-primary" : "bg-gray-300"}`}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="19" x2="12" y2="5"></line>
              <polyline points="5 12 12 5 19 12"></polyline>
            </svg>
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="flex flex-col items-center justify-between h-full absolute inset-0 z-[100] bg-[#1a1c23]"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-primary/10 blur-[80px] opacity-40" />

      {/* Top Bar Navigation */}
      <div className="relative z-10 w-full flex justify-between items-center px-6 pt-14 pb-4">
        <button
          onClick={() => {
            /* Minimize call logic to PIP */
          }}
          className="w-10 h-10 flex items-center justify-center text-white/70 active:bg-white/10 rounded-full"
        >
          <div className="w-4 h-4 border-2 border-current rounded-sm"></div>
        </button>
        <div className="flex bg-white/10 rounded-full px-3 py-1 space-x-1.5 items-center backdrop-blur-md">
          <ShieldAlert size={14} className="text-white/60" />
          <span className="text-xs text-white/80 font-medium tracking-wide">
            全程录音及加密保护
          </span>
        </div>
        <button className="w-10 h-10 flex items-center justify-center text-white/70 active:bg-white/10 rounded-full">
          <MessageSquare size={20} />
        </button>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center flex-1 w-full px-8">
        {/* Avatar Area */}
        <div className="relative mb-8 mt-10">
          <AnimatePresence>
            {callState === "in-call" && !muted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: [1, 1.15, 1] }}
                transition={{
                  repeat: Infinity,
                  duration: 2.5,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-primary/40 rounded-full blur-xl"
              />
            )}
          </AnimatePresence>
          <img
            src={counselor.avatar}
            alt={counselor.name}
            className="w-36 h-36 rounded-full border-[3px] border-white/20 object-cover shadow-2xl relative z-10"
          />
        </div>

        {/* Texts */}
        <h1 className="text-[28px] font-bold text-white mb-3">
          {counselor.name}
        </h1>

        <div className="h-8 flex items-center justify-center">
          {callState === "connecting" ? (
            <div className="flex items-center text-white/60 space-x-2">
              <Loader2 size={16} className="animate-spin" />
              <span className="text-sm font-medium tracking-wide">
                等待对方接受邀请...
              </span>
            </div>
          ) : (
            <span className="text-white/80 text-lg font-medium tracking-widest font-mono">
              {formatTime(duration)}
            </span>
          )}
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="relative z-10 w-full px-12 pb-16 pt-10">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setMuted(!muted)}
            className="flex flex-col items-center space-y-3"
          >
            <div
              className={`w-[60px] h-[60px] rounded-[1.5rem] flex items-center justify-center transition-all ${muted ? "bg-white text-gray-900 border border-transparent shadow-lg shadow-white/20" : "bg-white/15 text-white border border-white/10 hover:bg-white/20"}`}
            >
              {muted ? <MicOff size={26} /> : <Mic size={26} />}
            </div>
            <span className="text-[11px] text-white/50">
              {muted ? "麦克风已关" : "静音"}
            </span>
          </button>

          <button
            onClick={handleHangup}
            className="flex flex-col items-center space-y-3"
          >
            <div className="w-[72px] h-[72px] rounded-full bg-[#FF453A] flex items-center justify-center text-white shadow-xl shadow-red-500/30 active:scale-95 transition-transform">
              <PhoneOff size={30} />
            </div>
            <span className="text-[11px] text-[#FF453A]/80 font-medium">
              挂断
            </span>
          </button>

          <button
            onClick={() => setSpeaker(!speaker)}
            className="flex flex-col items-center space-y-3"
          >
            <div
              className={`w-[60px] h-[60px] rounded-[1.5rem] flex items-center justify-center transition-all ${!speaker ? "bg-white text-gray-900 border border-transparent shadow-lg shadow-white/20" : "bg-white/15 text-white border border-white/10 hover:bg-white/20"}`}
            >
              <Volume2 size={26} className={!speaker ? "opacity-50" : ""} />
            </div>
            <span className="text-[11px] text-white/50">
              {speaker ? "免提" : "听筒"}
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
