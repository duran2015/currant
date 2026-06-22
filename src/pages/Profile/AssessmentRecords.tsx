import { motion } from "motion/react";
import {
  ChevronLeft,
  FileSpreadsheet,
  Activity,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { useAppStore } from "../../store";

export function AssessmentRecords() {
  const { popView } = useAppStore();

  const records = [
    {
      id: 1,
      title: "广泛性焦虑量表 (GAD-7)",
      date: "2024-05-12",
      score: 9,
      maxScore: 21,
      level: "轻度焦虑",
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      isRecent: true,
    },
    {
      id: 2,
      title: "抑郁症自评量表 (PHQ-9)",
      date: "2024-05-01",
      score: 4,
      maxScore: 27,
      level: "无抑郁/极轻度",
      color: "text-green-600",
      bg: "bg-green-50",
      isRecent: false,
    },
    {
      id: 3,
      title: "感知压力暴露量表 (PSS-10)",
      date: "2024-04-15",
      score: 18,
      maxScore: 40,
      level: "中度压力",
      color: "text-orange-600",
      bg: "bg-orange-50",
      isRecent: false,
    },
    {
      id: 4,
      title: "广泛性焦虑量表 (GAD-7)",
      date: "2024-03-20",
      score: 12,
      maxScore: 21,
      level: "中度焦虑",
      color: "text-orange-600",
      bg: "bg-orange-50",
      isRecent: false,
    },
  ];

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="flex flex-col h-full bg-[#f8f9fa] absolute inset-0 z-50 overflow-hidden"
    >
      <div className="pt-14 pb-4 px-4 bg-white/80 backdrop-blur-md sticky top-0 z-20 flex items-center border-b border-gray-100">
        <button
          onClick={popView}
          className="w-10 h-10 -ml-2 flex items-center justify-center text-gray-900 border border-transparent active:bg-gray-50 rounded-full transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-[17px] font-bold text-gray-900 ml-2">
          量表测试记录
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto pb-32">
        <div className="p-4 space-y-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-5 rounded-[1.5rem] border border-blue-100/50 flex items-start">
            <AlertCircle
              className="text-blue-500 mr-3 shrink-0 mt-0.5"
              size={20}
            />
            <div>
              <h3 className="font-bold text-[14px] text-gray-900 mb-1">
                评估 Agent 提示
              </h3>
              <p className="text-[12px] text-gray-600 leading-relaxed">
                可鹿的量表评估主要用于动态追踪你的心理数值变迁，不可替代专业医疗诊断。如遇严重不适，请及时就医。
              </p>
            </div>
          </div>

          <div className="space-y-3 mt-6">
            <h2 className="text-[14px] font-bold text-gray-500 px-1 mb-2">
              历史记录
            </h2>
            {records.map((record) => (
              <div
                key={record.id}
                className="bg-white p-5 rounded-[1.5rem] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 relative overflow-hidden group"
              >
                {record.isRecent && (
                  <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-lg">
                    最新数据
                  </div>
                )}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-[15px] text-gray-900 flex items-center mb-1">
                      <FileSpreadsheet
                        size={16}
                        className="text-gray-400 mr-2"
                      />
                      {record.title}
                    </h3>
                    <span className="text-[11px] text-gray-400 font-medium">
                      {record.date}
                    </span>
                  </div>
                  <div
                    className={`mt-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${record.bg} ${record.color}`}
                  >
                    {record.level}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pb-2">
                  <div className="flex items-baseline space-x-1">
                    <span className="text-2xl font-black text-gray-900 tracking-tight">
                      {record.score}
                    </span>
                    <span className="text-xs text-gray-400">
                      / {record.maxScore} 分
                    </span>
                  </div>
                  <button className="w-8 h-8 flex items-center justify-center bg-gray-50 rounded-full text-gray-400 group-hover:bg-primary group-hover:text-white transition-colors">
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent pb-8">
        <button className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl flex items-center justify-center space-x-2 active:scale-95 transition-transform">
          <Activity size={18} />
          <span>重新发起深度评估</span>
        </button>
      </div>
    </motion.div>
  );
}
