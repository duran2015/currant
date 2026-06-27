import { useState } from "react";
import { motion } from "motion/react";
import { useAppStore } from "../../store";
import { ArrowLeft, Sparkles, FileText, CheckCircle2, Bot } from "lucide-react";
import { mockCounselors } from "../../data";

export function CounselorSessionNotes() {
  const { popView, selectedCounselorOrder, updateOrder } = useAppStore();
  const [userDesc, setUserDesc] = useState("");
  const [nextSteps, setNextSteps] = useState("");

  if (!selectedCounselorOrder) return null;

  const counselor = mockCounselors.find((c) => c.id === selectedCounselorOrder.counselorId);

  const handleAIGenerate = () => {
    setUserDesc("本次沟通中，我们深入探讨了职场人际关系带给你的压力，以及背后潜藏的自我认同感问题。\n\n你在会话后半段展现出了很好的觉察力，能够清晰地描述出“害怕犯错导致回避行为”的心理机制。这是一个非常好的开始，看见即是疗愈的一半。");
    setNextSteps("1. 记录自动思维：本周在感到焦虑或害怕犯错时，尝试拿出纸笔，或者在备忘录里写下那一刻脑海中冒出的第一个想法。\n2. 4-7-8 呼吸放松法：如果在会议前或汇报时感到胸闷、心跳加快，请尝试做 3-5 轮 4-7-8 呼吸放松法，让身体先平静下来。");
  };

  const handleSubmit = () => {
    if (!userDesc.trim() || !nextSteps.trim()) {
      alert("请填写完整的小结与建议内容");
      return;
    }
    updateOrder(selectedCounselorOrder.id, { counselorNotesWritten: true });
    alert("会话小结与建议已发送给用户！");
    popView();
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="absolute inset-0 bg-[#f8f9fa] z-[80] flex flex-col"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white sticky top-0 z-10 shadow-sm">
        <button
          onClick={popView}
          className="w-8 h-8 flex items-center justify-center active:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft size={20} className="text-gray-900" />
        </button>
        <span className="font-bold text-gray-900 text-[16px]">发给用户的小结与建议</span>
        <div className="w-8"></div>
      </div>

      <div className="flex-1 overflow-y-auto w-full pb-32 p-4">
        
        {/* AI Summary */}
        <div className="bg-white rounded-[1.25rem] p-5 shadow-sm border border-gray-100 mb-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full pointer-events-none"></div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-gray-900 text-[15px] flex items-center">
              <Sparkles size={18} className="text-primary mr-2" />
              AI 会话内容提取
            </h3>
            <button 
              onClick={handleAIGenerate}
              className="text-[12px] bg-primary/10 text-primary px-3 py-1.5 rounded-full font-bold flex items-center active:scale-95 transition-transform"
            >
              <Bot size={14} className="mr-1" /> 一键生成小结
            </button>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-[13px] text-gray-600 leading-relaxed border border-gray-100">
            <p className="mb-2"><span className="font-bold text-gray-800">主要议题：</span>职场人际压力与自我认同感低。</p>
            <p className="mb-2"><span className="font-bold text-gray-800">情绪状态：</span>会话前段表现出焦虑、轻度抑郁，后段经过倾听与共情后情绪趋于平稳。</p>
            <p><span className="font-bold text-gray-800">核心冲突：</span>渴望获得上级认可，但害怕犯错导致回避行为。</p>
          </div>
        </div>

        {/* Counselor Evaluation */}
        <div className="bg-white rounded-[1.25rem] p-5 shadow-sm border border-gray-100 mb-4">
          <h3 className="font-bold text-gray-900 text-[15px] mb-3 flex items-center">
            <FileText size={18} className="text-blue-500 mr-2" />
            咨询师小结 (用户可见)
          </h3>
          <textarea
            value={userDesc}
            onChange={(e) => setUserDesc(e.target.value)}
            placeholder="请输入本次咨询的小结，帮助用户回顾和梳理..."
            className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-[13px] h-32 resize-none focus:outline-none focus:ring-1 focus:ring-blue-500/30 leading-relaxed"
          />
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-[1.25rem] p-5 shadow-sm border border-gray-100 mb-4">
          <h3 className="font-bold text-gray-900 text-[15px] mb-3 flex items-center">
            <CheckCircle2 size={18} className="text-green-500 mr-2" />
            行动建议与练习 (用户可见)
          </h3>
          <textarea
            value={nextSteps}
            onChange={(e) => setNextSteps(e.target.value)}
            placeholder="请输入下一步的建议、需要用户完成的作业或练习..."
            className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-[13px] h-32 resize-none focus:outline-none focus:ring-1 focus:ring-green-500/30 leading-relaxed"
          />
        </div>

      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5 bg-white border-t border-gray-100 shadow-[0_-10px_40px_rgba(0,0,0,0.03)] z-20">
        <button
          onClick={handleSubmit}
          className="w-full bg-gray-900 text-white font-bold py-4 rounded-full active:bg-gray-800 transition-colors shadow-md shadow-gray-900/10 flex justify-center items-center"
        >
          <Sparkles size={18} className="mr-2" /> 发送给用户
        </button>
      </div>
    </motion.div>
  );
}
