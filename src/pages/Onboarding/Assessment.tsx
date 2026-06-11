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
    domain: "",
  });
  
  const [phq2Scores, setPhq2Scores] = useState<number[]>([-1, -1]);
  const [phq2Step, setPhq2Step] = useState(0);

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
    if (step === 3 && !answers.name.trim()) return;

    if (step < flow.length - 1) {
      setStep(step + 1);
    } else {
      // 完成所有流程
      updateUser({
        name: answers.name || "新朋友",
        isNewUser: false,
      });
      resetToView("main");
    }
  };

  const handleSelect = (key: keyof typeof answers, val: string) => {
    if (val === "跳过") {
      setAnswers((prev) => ({ ...prev, [key]: "" }));
    } else {
      setAnswers((prev) => ({ ...prev, [key]: val }));
    }
    setTimeout(() => {
      handleNext();
    }, 300);
  };

  const handlePhq2Select = (score: number) => {
    const newScores = [...phq2Scores];
    newScores[phq2Step] = score;
    setPhq2Scores(newScores);
    
    setTimeout(() => {
      if (phq2Step === 0) {
        setPhq2Step(1);
      } else {
        handleNext();
      }
    }, 300);
  };

  const flow = [
    {
      type: "intro",
      title: "嗨，我是小愈。",
      desc: "用2分钟，让我认识你。",
      button: "开始",
    },
    {
      type: "phq2",
      title: "先问你两个小问题——",
      desc: "不是考试，凭感觉选就好。",
    },
    {
      type: "feedback",
      // feedback content is generated dynamically
    },
    {
      type: "input",
      key: "name",
      title: "我叫小愈，你呢？",
      desc: "你的名字将是我对你最温暖的呼唤",
      placeholder: "小名也行...",
    },
    {
      type: "select",
      key: "stage",
      title: "你现在是在...",
      desc: "",
      options: ["大学生", "研究生", "刚工作", "其他"],
    },
    {
      type: "select",
      key: "domain",
      title: "最近主要烦什么？（可选）",
      desc: "",
      options: ["学业", "工作", "感情", "人际", "说不清", "跳过"],
    },
    {
      type: "finish",
      // finish content is generated dynamically
    }
  ];

  const getFeedback = () => {
    const total = phq2Scores[0] + phq2Scores[1];
    if (total <= 1) return { text: "看起来你最近状态不错！继续保持~", mood: "微笑" };
    if (total <= 3) return { text: "最近有点辛苦吧？没关系，我陪你。", mood: "轻微担心" };
    return { text: "谢谢你愿意告诉我这些。我想帮你。", mood: "认真" };
  };

  const phq2Questions = [
    {
      q: "最近两周，有没有觉得开心不起来，\n或者心里像压了块石头？",
      options: ["没有", "偶尔", "经常", "几乎每天"]
    },
    {
      q: "有没有觉得以前喜欢的事，\n突然不想做了？",
      options: ["没有", "偶尔", "经常", "几乎每天"]
    }
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
              <h2 className="text-[26px] font-black text-gray-900 mb-4">
                {currentStep.title}
              </h2>
              <p className="text-[15px] text-gray-500 leading-relaxed max-w-[280px]">
                {currentStep.desc}
              </p>
              
              <div className="absolute bottom-6 right-6 w-24 h-24 flex items-center justify-center">
                <span className="text-6xl animate-bounce" style={{ animationDuration: '3s' }}>🦦</span>
              </div>

              <div className="mt-16 w-full px-6">
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

          {currentStep.type === "phq2" && (
            <div className="flex-1 flex flex-col">
              <h2 className="text-[24px] font-bold text-gray-900 mb-3 leading-tight">
                {currentStep.title}
              </h2>
              <p className="text-gray-500 text-[15px] mb-8 leading-relaxed">
                {currentStep.desc}
              </p>

              <div className="flex-1 space-y-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`phq2-${phq2Step}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
                  >
                    <p className="text-[18px] font-bold text-gray-900 mb-6 whitespace-pre-line">
                      {phq2Questions[phq2Step].q}
                    </p>
                    <div className="space-y-3">
                      {phq2Questions[phq2Step].options.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => handlePhq2Select(i)}
                          className="w-full py-4 rounded-xl border border-gray-200 bg-surface flex items-center justify-center hover:border-gray-400 active:bg-gray-50 transition-all font-medium text-gray-800"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="flex justify-center pt-4">
                  <span className="text-4xl transition-transform duration-500" style={{ transform: phq2Step === 1 ? 'rotate(90deg)' : 'rotate(0deg)' }}>🦦</span>
                </div>
              </div>
            </div>
          )}

          {currentStep.type === "feedback" && (
            <div className="flex-1 flex flex-col items-center justify-center text-center pb-20 px-4">
              <div className="text-7xl mb-8">🦦</div>
              <h2 className="text-[24px] font-bold text-gray-900 mb-12 leading-relaxed">
                "{getFeedback().text}"
              </h2>
              
              <div className="w-full space-y-4">
                <p className="text-gray-500 text-[15px] mb-6">
                  接下来帮我填几个基本信息，<br/>这样我能更懂你。
                </p>
                <button
                  onClick={handleNext}
                  className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl flex items-center justify-center space-x-2 active:scale-95 transition-transform shadow-lg"
                >
                  <span>继续</span>
                  <ArrowRight size={18} />
                </button>
                <button
                  onClick={handleSkip}
                  className="w-full py-4 text-gray-400 font-medium active:text-gray-600 transition-colors"
                >
                  跳过
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

            {currentStep.type === "finish" && (
              <div className="flex-1 flex flex-col items-center justify-center text-center pb-20 px-4">
                <div className="text-7xl mb-8 animate-pulse">🦦👋</div>
                <h2 className="text-[26px] font-black text-gray-900 mb-4">
                  谢谢你，{answers.name || "新朋友"}。
                </h2>
                <p className="text-[16px] text-gray-500 leading-relaxed mb-12">
                  我已经记住你啦。<br/>下次来，我会在这里等你。
                </p>
                
                <div className="w-full">
                  <button
                    onClick={handleNext}
                    className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl flex items-center justify-center space-x-2 active:scale-95 transition-transform shadow-lg"
                  >
                    <span>进入首页</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
    </motion.div>
  );
}
