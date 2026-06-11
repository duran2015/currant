import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { ChevronLeft, Info, HelpCircle, ArrowRight } from "lucide-react";
import { useAppStore } from "../../store";
import { mockCounselors } from "../../data";

export function TextChat() {
  const { popView, pushView, bookingOrder, selectedCounselorId } =
    useAppStore();

  const counselor =
    mockCounselors.find(
      (c) => c.id === (bookingOrder?.counselorId || selectedCounselorId),
    ) || mockCounselors[0];

  const [messages, setMessages] = useState<
    { id: string; role: "user" | "counselor"; text: string }[]
  >([
    {
      id: "1",
      role: "counselor",
      text: `你好，我是你的倾听师 ${counselor.name}。我们的文字沟通时间为 30 分钟。在这段时间里，请随时留下你想说的话，我会逐一认真阅读并回复。我可以为你提供情感上的陪伴和倾听。`,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  
  // 模拟服务期：如果在服务期内则可以打字，否则为只读模式
  // 实际业务中，这应该由订单状态和时间(例如：预约开始前24h ~ 结束后24h)决定
  const isSessionValid = bookingOrder?.status !== "completed" && bookingOrder?.status !== "cancelled";

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((t) => Math.max(0, t - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userText = inputValue;
    const newMsgId = Date.now().toString();
    setMessages((prev) => [
      ...prev,
      { id: newMsgId, role: "user", text: userText },
    ]);
    setInputValue("");

    // Simulate counselor reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "_2",
          role: "counselor",
          text: "我也能感受到你的情绪，慢慢讲，我在这里。",
        },
      ]);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      className="flex flex-col h-full bg-[#f4f5f7] absolute inset-0 z-[100] overflow-hidden"
    >
      {/* Header */}
      <div className="pt-14 pb-3 px-4 bg-white sticky top-0 z-20 flex items-center justify-between border-b border-gray-100 shadow-sm">
        <div className="flex items-center">
          <button
            onClick={popView}
            className="w-10 h-10 -ml-2 flex items-center justify-center text-gray-900 active:bg-gray-50 rounded-full transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="ml-2 flex items-center">
            <img
              src={counselor.avatar}
              alt=""
              className="w-8 h-8 rounded-full object-cover mr-2"
            />
            <div>
              <h1 className="text-[15px] font-bold text-gray-900 leading-tight">
                {counselor.name}
              </h1>
              <div className="text-[10px] text-green-500 font-medium">
                {isSessionValid
                  ? "服务期内 · 可留言沟通"
                  : "服务已结束 · 当前为只读模式"}
              </div>
            </div>
          </div>
        </div>
        <button className="w-8 h-8 flex items-center justify-center text-gray-400 active:bg-gray-50 rounded-full">
          <Info size={20} />
        </button>
      </div>

      {/* Notice Banner */}
      <div className="bg-amber-50/80 backdrop-blur border-b border-amber-100/50 py-2 px-4 flex items-center text-[11px] text-amber-700/80 absolute top-[72px] w-full z-10 shadow-sm">
        <HelpCircle size={14} className="mr-1.5 shrink-0" />
        单次文字咨询限时 30 分钟，倾听师手动回复可能需要等待，请不要着急。
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto p-4 pt-16 space-y-5"
        ref={scrollRef}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "counselor" && (
              <img
                src={counselor.avatar}
                alt=""
                className="w-8 h-8 rounded-full object-cover mr-2 shrink-0 border border-gray-100 mt-1"
              />
            )}
            <div className="max-w-[75%]">
              <div
                className={`p-3 text-[14px] leading-relaxed shadow-sm ${msg.role === "user" ? "rounded-2xl rounded-tr-sm bg-primary text-white" : "rounded-2xl rounded-tl-sm bg-white border border-gray-100 text-gray-800"}`}
              >
                {msg.text}
              </div>
            </div>
          </div>
        ))}

        {!isSessionValid && (
          <div className="flex justify-center mt-6">
            <div className="bg-gray-200/60 text-gray-500 text-[12px] px-4 py-2 rounded-full">
              本次咨询服务期已结束，沟通通道已关闭
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-white px-4 py-3 pb-8 border-t border-gray-100 shadow-[0_-2px_10px_rgba(0,0,0,0.02)] flex items-center">
        {isSessionValid ? (
          <>
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              disabled={timeLeft <= 0}
              placeholder={timeLeft <= 0 ? "咨询已结束" : "输入你想说的..."}
              className="flex-1 bg-gray-50 border border-gray-100 px-4 py-3 rounded-full outline-none text-[14px] disabled:bg-gray-100 disabled:text-gray-400"
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || timeLeft <= 0}
              className={`ml-2 w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${inputValue.trim() && timeLeft > 0 ? "bg-primary text-white" : "bg-gray-200 text-gray-400"}`}
            >
              <ArrowRight size={20} />
            </button>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50 rounded-full px-4 py-3 border border-gray-200">
            <span className="text-gray-400 text-[14px]">
              如需继续沟通，请重新预约咨询
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
