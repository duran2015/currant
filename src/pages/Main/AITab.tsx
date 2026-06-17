import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  Send,
  Mic,
  Filter,
  Star,
  Clock,
  Settings,
  Camera,
  Image as ImageIcon,
  FileText,
  ChevronRight,
  MoreVertical,
  Activity,
  ArrowRight,
  ShieldAlert,
  Phone,
  PlusCircle,
  Wind,
  AlertTriangle,
  ChevronDown,
  Check,
  Lightbulb,
  Moon,
  Plus,
  MoreHorizontal,
  AudioLines
} from "lucide-react";
import { useAppStore } from "../../store";
import { mockCounselors } from "../../data";

export function AITab() {
  const { currentTab, pushView, popView, setSelectedCounselorId } = useAppStore();
  const [activeTab, setActiveTab] = useState<"ai" | "human">("ai");

  // AI Chat State
  const [messages, setMessages] = useState<{
    id: string;
    role: "ai" | "user";
    type?: "text" | "referral" | "task";
    text: string;
    time?: string;
    task?: {
      title: string;
      desc: string;
      actionText: string;
      duration?: string;
    };
    recommendations?: {
      level: string;
      title: string;
      desc: string;
      type: "ai" | "info" | "human";
    }[];
  }>([
    {
      id: "1",
      role: "ai",
      type: "text",
      text: "晚上好，小林 👋\n今天过得怎么样？想和我聊聊吗？",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
  ]);
  const [input, setInput] = useState("");
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [showCrisisAlert, setShowCrisisAlert] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  // Human Counseling State
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [sortBy, setSortBy] = useState<
    "comprehensive" | "rating" | "experience" | "price"
  >("comprehensive");

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, currentTab]);

  const sortedAndFilteredCounselors = [...mockCounselors];
  if (sortBy) {
    switch (sortBy) {
      case "rating":
        sortedAndFilteredCounselors.sort((a, b) => b.rating - a.rating);
        break;
      case "experience":
        sortedAndFilteredCounselors.sort((a, b) => b.reviewsCount - a.reviewsCount);
        break;
      case "price":
        sortedAndFilteredCounselors.sort((a, b) => a.price - b.price);
        break;
      case "comprehensive":
      default:
        sortedAndFilteredCounselors.sort(
          (a, b) => b.rating * b.reviewsCount - a.rating * a.reviewsCount,
        );
        break;
    }
  }

  const handleSend = (text?: string) => {
    const newMsg = text || input;
    if (!newMsg.trim()) return;
    setInput("");
    
    const newMsgId = Date.now().toString();
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setMessages((prev) => [
      ...prev,
      { id: newMsgId, role: "user", type: "text", text: newMsg, time },
    ]);

    console.log("[Event Analytics] AI Chat user message sent");

    // 危机词库识别 (模拟 L4 危机识别与转介 - 功能 8)
    const crisisKeywords = ["死", "不想活", "没意思", "绝望", "结束"];
    const isCrisis = crisisKeywords.some((keyword) =>
      newMsg.includes(keyword),
    );

    if (isCrisis) {
      console.log("[Event Analytics] L4 Crisis risk detected & intercepted");
      setTimeout(() => setShowCrisisAlert(true), 500);
      return;
    }

    const taskKeywords = ["睡眠", "专注", "放松", "冥想"];
    const needsTask = taskKeywords.some((keyword) => newMsg.includes(keyword));

    // 模拟 L1 转 L2 的逻辑 
    const stressKeywords = ["焦虑", "压力", "烦", "累", "失眠", "考试", "睡"];
    const isStressed = stressKeywords.some((keyword) =>
      newMsg.includes(keyword),
    );

    setTimeout(() => {
      const responseTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      if (isStressed || needsTask) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString() + "_1",
            role: "ai",
            type: "text",
            text: "听起来确实让你很难受，导致状态也受到了影响 🥺\n\n你愿意多和我说说，最近具体是什么让你感到压力最大吗？",
            time: responseTime,
          },
          {
            id: Date.now().toString() + "_2",
            role: "ai",
            type: "task",
            text: "",
            time: responseTime,
            task: {
              title: "呼吸放松练习",
              desc: "深呼吸可以帮助缓解焦虑，试试这个5分钟练习吧",
              actionText: "开始练习",
              duration: "持续5分钟"
            }
          }
        ]);
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "_3",
          role: "ai",
          text: "了解你的状况了。为了更好地帮助你，根据我们目前的交流，我为你整理了分层的心理支持方案，你可以选择最舒服的方式：",
          time: responseTime,
          recommendations: [
            {
              level: "L1",
              title: "AI 心理疏导",
              desc: "适合较轻的情绪压力，随时陪伴，无等待。",
              type: "ai",
            },
            {
              level: "L2",
              title: "真人倾听辅导",
              desc: "需要真实人类的情感共鸣与倾听，缓解孤独。",
              type: "human",
            },
          ],
        },
      ]);
    }, 1500);
  };

  const quickReplies = ["我很焦虑", "我睡不着", "感觉很有压力", "我想倾诉"];

  // Determine if we should show the SOS option in input based on recent crisis attempts,
  // For demo, we can just show it if messages length > 0
  const hasRiskContext = messages.some(m => m.role === 'user' && ["死", "不想活"].some(k => m.text.includes(k)));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-full bg-[#f8f9fa] relative"
    >
      <div className="pt-12 pb-2 px-6 bg-white sticky top-0 z-20 flex flex-col shadow-[0_1px_10px_rgba(0,0,0,0.02)] relative">
        <button
          onClick={popView}
          className="absolute left-4 top-12 w-8 h-8 flex items-center justify-center text-gray-900 z-30 active:scale-95 transition-transform"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="flex justify-center space-x-8 mb-2 relative">
          <button
            onClick={() => setActiveTab("ai")}
            className={`pb-2 text-[16px] font-bold transition-all relative ${
              activeTab === "ai"
                ? "text-primary"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            心愈 AI
            {activeTab === "ai" && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full"
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab("human")}
            className={`pb-2 text-[16px] font-bold transition-all relative ${
              activeTab === "human"
                ? "text-gray-900"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            真人倾听师
            {activeTab === "human" && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-1 bg-gray-900 rounded-full"
              />
            )}
          </button>
        </div>
      </div>

      {activeTab === "ai" && (
        <div className="bg-white/95 backdrop-blur-md px-4 py-3 border-b border-gray-100 flex items-center justify-between sticky top-[92px] z-20">
           <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-[#e0f4f4] rounded-full flex items-center justify-center border border-primary/10 overflow-hidden">
                  <img src="https://api.dicebear.com/7.x/bottts/svg?seed=xinyu&backgroundColor=e0f4f4" alt="bot" className="w-8 h-8 rounded-full" />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div>
                 <div className="text-[15px] font-bold text-gray-900 leading-tight">心愈</div>
                 <div className="text-[11px] text-gray-500 font-medium flex items-center mt-0.5">
                   随时陪伴你 <div className="w-1.5 h-1.5 bg-green-500 rounded-full ml-1.5 opacity-80"></div>
                 </div>
              </div>
           </div>
           <div className="flex items-center space-x-2">
             <button onClick={() => pushView("ai-settings")} className="text-gray-600 p-2 hover:bg-gray-50 rounded-full transition-colors flex items-center">
                <Settings size={20} />
             </button>
           </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto w-full relative">
        {activeTab === "human" && (
          <div className="pb-2 space-y-2 sticky top-0 bg-white/90 backdrop-blur-md z-10 box-border px-6 pt-2">
            <div className="flex items-center justify-between relative">
              <button
                onClick={() => setShowSortMenu(!showSortMenu)}
                className="flex items-center space-x-1 text-gray-600 text-[14px] font-medium bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm"
              >
                <Filter size={14} />
                <span>综合推荐</span>
              </button>

              <AnimatePresence>
                {showSortMenu && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-40 bg-black/20"
                      onClick={() => setShowSortMenu(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      className="absolute top-10 left-0 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 w-40"
                    >
                      {[
                        { id: "comprehensive", label: "综合推荐" },
                        { id: "rating", label: "好评优先" },
                        { id: "experience", label: "经验优先" },
                        { id: "price", label: "价格最低" },
                      ].map((option) => (
                        <button
                          key={option.id}
                          onClick={() => {
                            setSortBy(option.id as any);
                            setShowSortMenu(false);
                          }}
                          className={`w-full text-left px-4 py-3 text-[14px] hover:bg-gray-50 transition-colors ${sortBy === option.id ? "text-primary font-bold bg-primary/5" : "text-gray-700"}`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>

              <div className="flex space-x-2">
                <span className="bg-blue-50 text-blue-600 text-[11px] px-2 py-1 rounded-md font-bold">
                  响应快
                </span>
                <span className="bg-purple-50 text-purple-600 text-[11px] px-2 py-1 rounded-md font-bold">
                  新客特惠
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "ai" ? (
          <div className="p-4 bg-[#f8f9fa] pb-48 min-h-full">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} px-1 mb-5`}
              >
                {msg.role === "user" ? (
                  <div className="flex flex-col items-end">
                    <div className="max-w-[280px] rounded-[1.2rem] p-3 text-gray-900 rounded-tr-sm shadow-[0_2px_10px_rgba(0,0,0,0.03)] bg-[#E8E2FF] border border-[#DCD6FC]">
                      <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    </div>
                    {msg.time && <div className="text-[11px] text-gray-400 mt-1.5 mr-1 flex items-center">{msg.time} <Check size={14} className="ml-1 text-[#C4BCE8]" /></div>}
                  </div>
                ) : (
                  <div className="w-full">
                    {msg.type === "text" && msg.text && (
                      <div className="flex items-start">
                        <div className="flex flex-col items-start w-full">
                          <div className="bg-white border border-gray-100 rounded-[1.2rem] p-3 shadow-sm rounded-tl-sm inline-block max-w-[280px]">
                            <p className="text-[15px] text-gray-800 leading-relaxed whitespace-pre-wrap">
                              {msg.text}
                            </p>
                          </div>
                          {msg.time && <div className="text-[11px] text-gray-400 mt-1.5 ml-1">{msg.time}</div>}
                        </div>
                      </div>
                    )}

                    {idx === 0 && (
                      <div className="mt-3 w-full overflow-x-auto no-scrollbar pb-2">
                        <div className="flex space-x-2 w-max pr-4">
                          {quickReplies.map((reply, rIdx) => (
                            <button
                              key={rIdx}
                              onClick={() => handleSend(reply)}
                              className="bg-white border border-primary/20 text-primary text-[13px] font-medium px-4 py-1.5 rounded-full whitespace-nowrap shadow-sm active:scale-95 transition-transform"
                            >
                              {reply}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {msg.type === "task" && msg.task && (
                      <div className="flex items-start mt-2">
                        <div className="w-[280px] bg-white p-4 rounded-[1.2rem] border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.03)] relative overflow-hidden">
                           <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-gradient-to-br from-blue-50 to-transparent rounded-full pointer-events-none opacity-60"></div>
                           
                           <h4 className="font-bold text-gray-900 text-[16px] mb-2 flex items-center">
                             {msg.task.title} <Wind className="ml-1 text-[#2CC1C1]" size={16} />
                           </h4>
                           <p className="text-[13px] text-gray-500 mb-4 relative z-10 leading-relaxed">
                             {msg.task.desc}
                           </p>

                           <div className="flex items-end justify-between relative z-10 mt-2">
                             <div className="text-[11px] text-[#2CC1C1] font-bold flex items-center bg-[#2CC1C1]/10 px-2 py-1 rounded-md">
                               {msg.task.duration}
                             </div>
                             <button className="bg-primary text-white px-5 py-2 hover:bg-[#20A6A6] font-bold rounded-xl text-[13px] transition-colors shadow-sm">
                               {msg.task.actionText}
                             </button>
                           </div>
                        </div>
                      </div>
                    )}

                    {msg.type === "referral" && (
                      <div className="flex items-start space-x-2 mt-1">
                        <div className="flex-1 bg-white p-4 rounded-[1.2rem] border border-primary/20 shadow-[0_4px_20px_-4px_rgba(44,193,193,0.15)] relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full pointer-events-none"></div>
                          <div className="flex items-center mb-3">
                            <Activity className="text-primary mr-2" size={18} />
                            <span className="font-bold text-gray-900 text-[14px]">真人倾听师支持</span>
                          </div>
                          <p className="text-[12px] text-gray-600 mb-4 leading-relaxed">
                            为您推荐了适合缓解当前状态的资深倾听师，他们非常有经验。
                          </p>
                          <button
                            onClick={() => {
                              setActiveTab("human");
                            }}
                            className="w-full bg-primary text-white font-bold py-2 rounded-xl text-[13px] hover:bg-[#20A6A6] active:scale-[0.98] transition-all flex justify-center items-center"
                          >
                            查看推荐倾听师 <ArrowRight size={14} className="ml-1" />
                          </button>
                        </div>
                      </div>
                    )}

                    {msg.recommendations && (
                      <div className="mt-1 space-y-3 max-w-[280px]">
                        {msg.recommendations.map((rec, rIdx) => (
                          <div
                            key={rIdx}
                            className="bg-white rounded-[1.2rem] p-4 shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-50 flex flex-col pt-4 relative overflow-hidden"
                          >
                            <div
                              className={`absolute top-0 left-0 w-full h-1 ${
                                rec.level === "L1"
                                  ? "bg-[#2CC1C1]"
                                  : rec.level === "L2"
                                    ? "bg-blue-500"
                                    : rec.level === "L3"
                                      ? "bg-orange-500"
                                      : "bg-red-500"
                              }`}
                            />
                            <div className="flex items-center space-x-2 mb-2">
                              <span
                                className={`text-[10px] font-black px-1.5 py-0.5 rounded ${
                                  rec.level === "L1"
                                    ? "bg-[#2CC1C1]/10 text-[#2CC1C1]"
                                    : rec.level === "L2"
                                      ? "bg-blue-50 text-blue-500"
                                      : rec.level === "L3"
                                        ? "bg-orange-50 text-orange-500"
                                        : "bg-red-50 text-red-500"
                                }`}
                              >
                                {rec.level}
                              </span>
                              <h4 className="text-[14px] font-bold text-gray-900 truncate">
                                {rec.title}
                              </h4>
                            </div>
                            <p className="text-[12px] text-gray-500 mb-4 leading-relaxed">
                              {rec.desc}
                            </p>
                            <button
                              onClick={() => {
                                if (rec.type === "ai")
                                  handleSend("我想继续跟你聊聊");
                              }}
                              className={`w-full py-2.5 rounded-xl text-[12px] font-bold transition-transform active:scale-[0.98] ${
                                rec.level === "L1" || rec.level === "L2"
                                  ? "bg-gray-900 text-white shadow-sm"
                                  : "bg-surface text-gray-600 border border-gray-100"
                              }`}
                            >
                              {rec.level === "L1"
                                ? "继续跟我聊聊"
                                : rec.level === "L2"
                                  ? "查看在线心愈师"
                                  : rec.level === "L3"
                                    ? "了解专业咨询"
                                    : "获取危机热线"}
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
            <div ref={endRef} />
          </div>
        ) : (
          <div className="p-4 space-y-4 pb-32 min-h-full">
            {sortedAndFilteredCounselors.map((counselor) => (
              <div
                key={counselor.id}
                onClick={() => {
                  setSelectedCounselorId(counselor.id);
                  pushView("counseling-detail");
                }}
                className="bg-white rounded-3xl p-4 shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-gray-50 flex active:scale-[0.98] transition-transform cursor-pointer overflow-hidden relative"
              >
                {counselor.type === "pro" && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-[#FFD700] to-[#F5A623] text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl z-10 shadow-sm border-b border-l border-white/20">
                    专家团
                  </div>
                )}
                {counselor.type === "listener" && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-[#2CC1C1] to-[#20A6A6] text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl z-10 shadow-sm border-b border-l border-white/20">
                    优选倾听师
                  </div>
                )}
                <div className="relative mr-4 shrink-0">
                  <img
                    src={counselor.avatar}
                    alt={counselor.name}
                    className="w-16 h-16 rounded-2xl object-cover shadow-sm border border-gray-100"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-sm">
                    {counselor.status === "online" ? (
                      <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    ) : counselor.status === "busy" ? (
                      <div className="w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
                    ) : (
                      <div className="w-3 h-3 bg-gray-300 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1 pt-1">
                    <h3 className="font-bold text-[16px] text-gray-900 truncate">
                      {counselor.name}
                    </h3>
                  </div>

                  <div className="flex items-center space-x-3 mb-2 flex-wrap">
                    <div className="flex items-center text-orange-500">
                      <Star size={12} className="fill-current mr-1" />
                      <span className="text-[12px] font-bold">
                        {counselor.rating}
                      </span>
                    </div>
                    <span className="text-gray-300 text-[10px]">|</span>
                    <span className="text-[12px] text-gray-500">
                      {counselor.reviewsCount}次服务
                    </span>
                  </div>

                  <p className="text-[12px] text-gray-500 line-clamp-1 mb-2 font-medium">
                    {counselor.title}
                  </p>

                  <div className="flex items-center justify-between mt-3 mb-1">
                    <div className="flex space-x-1.5">
                      {counselor.tags.slice(0, 2).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 bg-surface text-gray-600 rounded-md text-[10px] font-medium border border-gray-100"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-baseline text-primary">
                      <span className="text-[10px] font-bold mr-0.5">¥</span>
                      <span className="text-[16px] font-black tracking-tight leading-none">
                        {counselor.price}
                      </span>
                      <span className="text-[10px] text-gray-400 font-medium ml-0.5">
                        /次
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {activeTab === "ai" && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#f8f9fa] via-[#f8f9fa] to-transparent pt-6 pb-6 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
          {/* Quick Replies */}
          <div className="px-4 pb-3 flex space-x-2 overflow-x-auto scrollbar-hide">
             <button onClick={() => setInput("我想进行担忧管理")} className="shrink-0 bg-white border border-gray-100 shadow-sm text-gray-700 text-[12px] px-3 py-1.5 rounded-full font-medium flex items-center active:scale-95 transition-transform">
               <Wind size={14} className="text-blue-500 mr-1.5" /> 担忧管理
             </button>
             <button onClick={() => setInput("我想做认知调整")} className="shrink-0 bg-white border border-gray-100 shadow-sm text-gray-700 text-[12px] px-3 py-1.5 rounded-full font-medium flex items-center active:scale-95 transition-transform">
               <Lightbulb size={14} className="text-green-500 mr-1.5" /> 认知调整
             </button>
             <button onClick={() => setInput("我想改善睡眠")} className="shrink-0 bg-white border border-gray-100 shadow-sm text-gray-700 text-[12px] px-3 py-1.5 rounded-full font-medium flex items-center active:scale-95 transition-transform">
               <Moon size={14} className="text-purple-500 mr-1.5" /> 睡眠改善
             </button>
             <button className="shrink-0 bg-white border border-gray-100 shadow-sm text-gray-600 px-2 py-1.5 rounded-full flex items-center active:scale-95 transition-transform">
               <ChevronDown size={14} />
             </button>
          </div>

          <div className="px-4 pb-4">
             <div className="flex items-end space-x-2 mb-2 bg-white rounded-3xl border border-gray-200 shadow-sm p-1.5 focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-primary/10 transition-all">
               <button onClick={() => setShowAttachMenu(!showAttachMenu)} className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 shrink-0 active:bg-gray-100 transition-colors">
                 <Plus size={20} className={showAttachMenu ? "rotate-45 transition-transform" : "transition-transform"} />
               </button>
               <div className="flex-1 flex items-center bg-transparent px-2 py-1 min-h-[36px]">
                 <textarea
                   value={input}
                   onChange={(e) => setInput(e.target.value)}
                   onKeyPress={(e) => { if(e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                   className="flex-1 bg-transparent border-none outline-none text-[15px] text-gray-800 placeholder-gray-400 w-full resize-none max-h-[100px]"
                   placeholder="想对心愈说点什么..."
                   rows={1}
                   style={{ minHeight: '24px' }}
                 />
                 {input.trim() ? (
                   <button onClick={() => handleSend()} className="text-white bg-primary rounded-full w-8 h-8 ml-2 flex items-center justify-center shadow-md active:scale-95 transition-transform shrink-0">
                     <Send size={14} className="translate-x-[-1px] translate-y-[1px]" />
                   </button>
                 ) : (
                   <button className="text-gray-400 ml-2 w-8 h-8 flex items-center justify-center active:text-primary transition-colors shrink-0">
                     <Mic size={18} />
                   </button>
                 )}
               </div>
             </div>
             
             <AnimatePresence>
               {showAttachMenu && (
                 <motion.div 
                   initial={{ height: 0, opacity: 0 }}
                   animate={{ height: 'auto', opacity: 1 }}
                   exit={{ height: 0, opacity: 0 }}
                   className="overflow-hidden"
                 >
                   <div className="flex items-center space-x-6 px-4 py-2 mt-2 mb-2">
                     <div className="flex flex-col items-center">
                       <button className="w-12 h-12 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center justify-center text-gray-600 mb-1 active:scale-95 transition-transform">
                         <Camera size={22} />
                       </button>
                       <span className="text-[11px] text-gray-500">拍照</span>
                     </div>
                     <div className="flex flex-col items-center">
                       <button className="w-12 h-12 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center justify-center text-gray-600 mb-1 active:scale-95 transition-transform">
                         <ImageIcon size={22} />
                       </button>
                       <span className="text-[11px] text-gray-500">相册</span>
                     </div>
                     <div className="flex flex-col items-center">
                       <button className="w-12 h-12 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center justify-center text-gray-600 mb-1 active:scale-95 transition-transform">
                         <FileText size={22} />
                       </button>
                       <span className="text-[11px] text-gray-500">文件</span>
                     </div>
                   </div>
                 </motion.div>
               )}
             </AnimatePresence>
             
             {hasRiskContext && (
               <div className="flex justify-center mt-2 h-6">
                 <button onClick={() => setShowCrisisAlert(true)} className="flex items-center text-[11px] bg-red-50 text-red-500 px-3 py-1 rounded-full font-bold border border-red-100 shadow-sm">
                   <AlertTriangle size={12} className="mr-1" />
                   SOS 紧急求助
                 </button>
               </div>
             )}
          </div>
        </div>
      )}

      {/* 危机预警弹窗 (L4 发现风险词拦截) */}
      <AnimatePresence>
        {showCrisisAlert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 z-[100] flex items-center justify-center p-6 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-[2rem] p-6 w-full max-w-sm shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-red-500"></div>
              <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4 border border-red-100">
                <ShieldAlert size={24} />
              </div>
              <h2 className="text-xl font-black text-gray-900 mb-2">
                生命安全预警拦截
              </h2>
              <p className="text-[14px] text-gray-600 mb-6 leading-relaxed">
                系统检测到您的情绪可能处于
                <span className="font-bold text-red-500">高危状态</span>
                。在这个艰难的时刻，请让专业的医生和公益力量帮助你，你不是一个人。
              </p>
              <div className="space-y-3">
                <a
                  href="tel:400-161-9995"
                  className="w-full bg-red-50 text-red-600 border border-red-200 font-bold py-3.5 rounded-xl flex justify-center items-center active:scale-95 transition-transform text-[15px]"
                >
                  <Phone size={18} className="mr-2" />
                  拨打 400-161-9995 热线
                </a>
                <button
                  onClick={() => setShowCrisisAlert(false)}
                  className="w-full bg-white text-gray-500 font-bold py-3 rounded-xl border border-gray-100 active:scale-95 transition-transform text-[14px]"
                >
                  我只是随口一说
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
