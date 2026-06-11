import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAppStore } from "../../store";
import { ChevronRight, ArrowRight } from "lucide-react";

export function Assessment() {
  const { pushView, resetToView, updateUser } = useAppStore();
  const [step, setStep] = useState(0);

  // 统一收集所有的信息（包含基础信息和问卷）
  const [answers, setAnswers] = useState({
    name: "",
    stage: "",
    q1: "",
    q2: "",
    q3: "",
  });

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (step === 1) {
      inputRef.current?.focus();
    }
  }, [step]);

  const handleSkip = () => {
    // 如果用户跳过，依然保存当前已填写的信息并标记为新用户
    updateUser({
      name: answers.name || "新用户",
      isNewUser: true,
    });
    resetToView("main");
  };

  const handleNext = () => {
    if (step === 1 && !answers.name.trim()) return;

    if (step < flow.length - 1) {
      setStep(step + 1);
    } else {
      // 完成所有流程
      updateUser({
        name: answers.name,
        isNewUser: true,
      });
      pushView("ai-interview");
    }
  };

  const handleSelect = (key: keyof typeof answers, val: string) => {
    setAnswers((prev) => ({ ...prev, [key]: val }));
    setTimeout(() => {
      handleNext();
    }, 300); // 稍微延迟一下，让用户看到点击反馈
  };

  const flow = [
    {
      type: "intro",
      title: "认领你的心灵水獭",
      desc: "在这个世界里，每个人都有一只专属于自己的小水獭。它会在你疲惫时给你抱抱，在你倾诉时安静聆听。为了让它更好地懂你，我们需要几分钟来建立连接...",
      button: "开始连接",
    },
    {
      type: "input",
      key: "name",
      title: "给你的小水獭取个名字吧？",
      desc: "一个让你觉得舒服、亲切的称呼，它将永远这样陪伴你。",
      placeholder: "输入水獭的名字...",
    },
    {
      type: "select",
      key: "stage",
      title: "你现在正处于哪个人生阶段？",
      desc: "不同的人生阶段有不同的风景，这能帮助小水獭更好地理解你的处境。",
      options: ["校园时光 (学生)", "初入职场", "职场打拼", "其他阶段"],
    },
    {
      type: "select",
      key: "q1",
      title: "小水獭感知到了你最近的情绪底色...",
      desc: "在过去的两周里，你是否感到情绪低落、沮丧或绝望？",
      options: ["完全没有", "好几天", "一半以上天数", "几乎每天"],
    },
    {
      type: "select",
      key: "q2",
      title: "它也察觉到了你周围的压力波纹...",
      desc: "在过去的两周里，你是否感到紧张、焦虑或急躁？",
      options: ["完全没有", "好几天", "一半以上天数", "几乎每天"],
    },
    {
      type: "select",
      key: "q3",
      title: "最后一点关于生活节奏的确认...",
      desc: "最近一个月，你觉得难以控制生活中的重要事情吗？",
      options: ["从不", "偶尔", "有时", "经常", "总是"],
    },
  ];

  const currentStep = flow[step];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-full bg-white p-6 relative overflow-hidden"
    >
      {/* 顶部进度条和跳过按钮 (Intro 阶段不显示) */}
      <div className="mt-12 mb-8 flex items-center justify-between min-h-[24px]">
        {step > 0 && (
          <>
            <div className="flex space-x-2 flex-1 mr-6">
              {flow.slice(1).map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-colors ${
                    i <= step - 1 ? "bg-primary" : "bg-gray-100"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={handleSkip}
              className="text-[13px] font-bold text-gray-400 shrink-0 hover:text-gray-600 transition-colors"
            >
              先去逛逛
            </button>
          </>
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -30, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex-1 flex flex-col pt-4"
        >
          {currentStep.type === "intro" && (
            <div className="flex-1 flex flex-col items-center justify-center text-center pb-20">
              <div className="w-32 h-32 bg-orange-50 rounded-full flex items-center justify-center mb-8 relative">
                <div className="absolute inset-0 bg-orange-100/50 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
                <span className="text-6xl relative z-10">🦦</span>
              </div>
              <h2 className="text-[26px] font-black text-gray-900 mb-4">
                {currentStep.title}
              </h2>
              <p className="text-[15px] text-gray-500 leading-relaxed max-w-[280px]">
                {currentStep.desc}
              </p>
              <div className="mt-16 w-full">
                <button
                  onClick={handleNext}
                  className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl flex items-center justify-center space-x-2 active:scale-95 transition-transform shadow-lg"
                >
                  <span>{currentStep.button}</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}

          {currentStep.type === "input" && (
            <div className="flex-1 flex flex-col">
              <h2 className="text-[24px] font-bold text-gray-900 mb-3 leading-tight">
                {currentStep.title}
              </h2>
              <p className="text-gray-500 text-[15px] mb-10 leading-relaxed">
                {currentStep.desc}
              </p>
              <input
                ref={inputRef}
                type="text"
                value={answers[currentStep.key as keyof typeof answers]}
                onChange={(e) =>
                  setAnswers({ ...answers, [currentStep.key]: e.target.value })
                }
                placeholder={currentStep.placeholder}
                className="w-full bg-surface border border-gray-100 px-5 py-5 rounded-2xl outline-none focus:border-primary text-gray-900 text-lg placeholder-gray-300 font-medium transition-colors"
              />
              <div className="mt-auto pb-10">
                <button
                  onClick={handleNext}
                  className={`w-full py-4 rounded-xl font-bold flex justify-center items-center space-x-2 transition-all ${
                    answers.name.trim()
                      ? "bg-gray-900 text-white shadow-lg"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <span>继续</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}

          {currentStep.type === "select" && (
            <div className="flex-1 flex flex-col">
              <h2 className="text-[24px] font-bold text-gray-900 mb-3 leading-tight">
                {currentStep.title}
              </h2>
              <p className="text-gray-500 text-[15px] mb-10 leading-relaxed">
                {currentStep.desc}
              </p>
              <div className="space-y-4">
                {currentStep.options?.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() =>
                      handleSelect(currentStep.key as keyof typeof answers, opt)
                    }
                    className="w-full p-5 rounded-2xl border border-gray-100 bg-surface flex items-center justify-between hover:border-primary active:bg-primary-light transition-all text-left group"
                  >
                    <span className="text-gray-800 font-medium text-[16px]">
                      {opt}
                    </span>
                    <ChevronRight
                      className="text-gray-300 group-hover:text-primary transition-colors"
                      size={20}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
