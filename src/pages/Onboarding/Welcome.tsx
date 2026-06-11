import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAppStore } from "../../store";
import { ArrowRight, Leaf, ShieldCheck, MessageSquare } from "lucide-react";

export function Welcome() {
  const { pushView, resetToView, setTab } = useAppStore();
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "欢迎来到心愈",
      subtitle: "在这里，听见自己的声音",
      desc: "心愈是一个纯净、安全的心理健康陪伴空间。无论你是感到焦虑、压力还是仅仅需要倾吐，我们都在这里。",
      icon: Leaf,
      color: "text-green-500",
      bg: "bg-green-50",
    },
    {
      title: "随时陪伴你的 AI",
      subtitle: "24小时专属「树洞」",
      desc: "我们的 AI 倾听者能够无条件接纳你的情绪，并初步评估你的状态。随时随地，想说就说。",
      icon: MessageSquare,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      title: "专业温暖的真人支持",
      subtitle: "更深层的心理梳理",
      desc: "当你觉得 AI 的陪伴还不够时，这里有专业的心理咨询师和倾听者，给你更长久、更深度的支持。",
      icon: ShieldCheck,
      color: "text-rose-500",
      bg: "bg-rose-50",
    },
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      console.log("[Event Analytics] New user completed onboarding guide");
      pushView("assessment");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col flex-1 h-full bg-white px-6 pb-8 absolute inset-0 z-50 pt-20"
    >
      <div className="flex justify-between items-center mb-12">
        <div className="flex space-x-1.5">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === step ? "w-6 bg-primary" : "w-1.5 bg-gray-200"}`}
            />
          ))}
        </div>
        <button
          onClick={() => {
            console.log("[Event Analytics] New user skipped onboarding guide");
            pushView("assessment");
          }}
          className="text-[13px] font-bold text-gray-400"
        >
          跳过
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center text-center"
          >
            {(() => {
              const Icon = steps[step].icon;
              return (
                <div
                  className={`w-32 h-32 rounded-full ${steps[step].bg} flex items-center justify-center mb-8 shadow-sm`}
                >
                  <Icon size={56} className={steps[step].color} />
                </div>
              );
            })()}
            <h1 className="text-[26px] font-black text-gray-900 mb-2">
              {steps[step].title}
            </h1>
            <h2 className="text-[16px] font-bold text-primary mb-4">
              {steps[step].subtitle}
            </h2>
            <p className="text-[14px] text-gray-500 leading-relaxed max-w-[280px]">
              {steps[step].desc}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div>
        <button
          onClick={handleNext}
          className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl flex items-center justify-center space-x-2 active:scale-95 transition-transform shadow-lg"
        >
          <span>{step === steps.length - 1 ? "去和 AI 聊聊" : "继续"}</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </motion.div>
  );
}
