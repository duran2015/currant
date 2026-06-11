import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAppStore } from "../../store";
import { ChevronRight } from "lucide-react";

const mockQuestions = [
  {
    id: 1,
    text: "在过去的两周里，你是否感到情绪低落、沮丧或绝望？",
    options: ["完全没有", "好几天", "一半以上天数", "几乎每天"],
  },
  {
    id: 2,
    text: "在过去的两周里，你是否感到紧张、焦虑或急躁？",
    options: ["完全没有", "好几天", "一半以上天数", "几乎每天"],
  },
  {
    id: 3,
    text: "最近一个月，你觉得难以控制生活中的重要事情吗？",
    options: ["从不", "偶尔", "有时", "经常", "总是"],
  },
];

export function Assessment() {
  const { pushView } = useAppStore();
  const [step, setStep] = useState(0);

  const handleSelect = () => {
    if (step < mockQuestions.length - 1) {
      setStep(step + 1);
    } else {
      pushView("ai-interview");
    }
  };

  const question = mockQuestions[step];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-full bg-white p-6"
    >
      <div className="mt-16 mb-8 flex space-x-2">
        {mockQuestions.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full ${i <= step ? "bg-primary" : "bg-gray-100"}`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          className="flex-1 flex flex-col"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8 leading-relaxed">
            {question.text}
          </h2>

          <div className="space-y-4">
            {question.options.map((opt, i) => (
              <button
                key={i}
                onClick={handleSelect}
                className="w-full p-4 rounded-2xl border border-gray-100 bg-surface flex items-center justify-between hover:border-primary active:bg-primary-light transition-colors text-left"
              >
                <span className="text-gray-800 font-medium">{opt}</span>
                <ChevronRight className="text-gray-400" size={20} />
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
