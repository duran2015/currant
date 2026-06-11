import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { ChevronLeft, Send, Clock, MoreHorizontal } from "lucide-react";
import { useAppStore } from "../../store";

export function AIChatView() {
  const { popView, pushView } = useAppStore();
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState([
    {
      id: "1",
      role: "ai",
      type: "text",
      text: "嗨，今天过得怎么样？我在这里陪你。",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
  ]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg = input;
    setInput("");
    
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role: "user", type: "text", text: newMsg, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
    ]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "_reply",
          role: "ai",
          type: "text",
          text: "我听到了。慢慢说，不要着急。",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
      ]);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      className="flex flex-col h-full bg-[#f8f9fa] absolute inset-0 z-50 overflow-hidden"
    >
      <div className="pt-14 pb-3 px-4 bg-white/95 backdrop-blur-md sticky top-0 z-20 flex items-center justify-between border-b border-gray-100 shadow-sm">
        <div className="flex items-center">
          <button
            onClick={popView}
            className="w-10 h-10 -ml-2 flex items-center justify-center text-gray-900 active:bg-gray-50 rounded-full transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="ml-1 flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-50 rounded-full flex items-center justify-center text-lg border border-orange-100">
              🦦
            </div>
            <div>
              <h1 className="text-[15px] font-bold text-gray-900 leading-tight">心灵水獭 小愈</h1>
              <div className="text-[10px] text-gray-500 font-medium flex items-center mt-0.5">
                随时陪伴你 <div className="w-1.5 h-1.5 bg-green-500 rounded-full ml-1.5 opacity-80"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <button onClick={() => pushView("ai-chat-records")} className="text-gray-600 p-2 hover:bg-gray-50 rounded-full transition-colors">
            <Clock size={20} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "ai" && (
              <div className="w-8 h-8 bg-orange-50 rounded-full flex items-center justify-center text-lg mr-2 shrink-0">
                🦦
              </div>
            )}
            <div className={`max-w-[75%] ${msg.role === "user" ? "bg-gray-900 text-white" : "bg-white text-gray-900"} px-4 py-3 rounded-2xl shadow-sm text-[15px] leading-relaxed whitespace-pre-line`}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div className="bg-white p-4 border-t border-gray-100 pb-8">
        <div className="flex items-center space-x-2 bg-surface rounded-full px-4 py-2 border border-gray-200">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="和水獭说点什么..."
            className="flex-1 bg-transparent py-2 outline-none text-[15px] text-gray-900 placeholder-gray-400"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className={`p-2 rounded-full transition-colors ${
              input.trim() ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-400"
            }`}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}