import { useState } from "react";
import { motion } from "motion/react";
import { useAppStore } from "../../store";
import { ChevronLeft, ShieldAlert, Check, AlertTriangle } from "lucide-react";

const BOUNDARIES = [
  "我不进行医学诊断",
  "我不承诺治疗焦虑、抑郁等心理疾病",
  "我不替用户做重大人生决定",
  "我不提供法律判断或法律结论",
  "我不私下导流、不私下收款",
  "我会保护用户隐私，不泄露个案信息",
  "遇到自伤、自杀、严重心理危机，我会立即上报平台",
  "我会以倾听、澄清、支持和专业边界为基础开展服务"
];

const RISKS = [
  "高危心理状态",
  "自伤/自杀表达",
  "暴力威胁",
  "未成年人风险",
  "复杂法律纠纷"
];

export function CounselorBoundary() {
  const { popView, pushView } = useAppStore();
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());

  const toggleCheck = (index: number) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(index)) {
      newChecked.delete(index);
    } else {
      newChecked.add(index);
    }
    setCheckedItems(newChecked);
  };

  const isAllChecked = checkedItems.size === BOUNDARIES.length;

  const handleConfirm = () => {
    if (!isAllChecked) return;
    // 确认后直接返回上一页，不再强制跳转到入驻资料页
    popView();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex flex-col h-full bg-[#f8f9fa] absolute inset-0 z-50 overflow-hidden"
    >
      <div className="pt-14 pb-4 px-4 bg-white sticky top-0 z-20 flex items-center shadow-sm">
        <button
          onClick={popView}
          className="w-10 h-10 -ml-2 flex items-center justify-center text-gray-900 border border-transparent active:bg-gray-50 rounded-full transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-[17px] font-bold text-gray-900 ml-2">服务边界确认</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-6 pb-28">
        {/* Intro Card */}
        <div className="bg-red-50 border border-red-100 rounded-2xl p-5 mb-6 relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 text-red-500/10">
            <ShieldAlert size={100} />
          </div>
          <div className="relative z-10 flex items-start">
            <ShieldAlert size={24} className="text-red-500 mr-3 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-[16px] font-bold text-red-800 mb-2">平台严正声明</h2>
              <p className="text-[13px] text-red-700/90 leading-relaxed font-medium">
                你在可鹿心理提供的是心理支持、心理咨询预约及相关服务，不提供医学诊断、精神科诊疗或紧急危机干预。
              </p>
            </div>
          </div>
        </div>

        {/* Boundary Checklist */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-6">
          <h3 className="text-[15px] font-bold text-gray-900 mb-4 flex items-center">
            <span className="w-1 h-4 bg-primary rounded-full mr-2"></span>
            请逐项阅读并勾选确认
          </h3>
          <div className="space-y-3">
            {BOUNDARIES.map((item, index) => {
              const isChecked = checkedItems.has(index);
              return (
                <div 
                  key={index} 
                  onClick={() => toggleCheck(index)}
                  className={`flex items-start p-3 rounded-xl border transition-colors cursor-pointer active:scale-[0.98] ${
                    isChecked ? 'bg-primary/5 border-primary/30' : 'bg-gray-50 border-transparent hover:bg-gray-100'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mr-3 mt-0.5 transition-colors ${
                    isChecked ? 'border-primary bg-primary' : 'border-gray-300 bg-white'
                  }`}>
                    {isChecked && <Check size={12} className="text-white" strokeWidth={3} />}
                  </div>
                  <span className={`text-[13px] leading-snug font-medium transition-colors ${
                    isChecked ? 'text-gray-900' : 'text-gray-600'
                  }`}>
                    {item}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Risk Scenarios */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4">
          <h3 className="text-[15px] font-bold text-gray-900 mb-4 flex items-center">
            <span className="w-1 h-4 bg-orange-400 rounded-full mr-2"></span>
            遇到以下情况，请立即上报
          </h3>
          <div className="flex flex-wrap gap-2">
            {RISKS.map((risk, idx) => (
              <div key={idx} className="flex items-center bg-orange-50 text-orange-700 px-3 py-1.5 rounded-full text-[12px] font-medium border border-orange-100">
                <AlertTriangle size={12} className="mr-1" />
                {risk}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-8 z-30 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <button 
          onClick={handleConfirm}
          disabled={!isAllChecked}
          className={`w-full py-3.5 rounded-xl font-bold text-[15px] transition-all flex items-center justify-center ${
            isAllChecked 
              ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/20 active:scale-[0.98]' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isAllChecked ? "我已阅读并确认" : `请确认全部条款 (${checkedItems.size}/${BOUNDARIES.length})`}
        </button>
      </div>
    </motion.div>
  );
}