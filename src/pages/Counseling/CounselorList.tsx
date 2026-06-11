import { motion } from "motion/react";
import { useAppStore } from "../../store";
import { mockCounselors } from "../../data";
import {
  ArrowLeft,
  Star,
  ChevronRight,
  Search,
  SlidersHorizontal,
} from "lucide-react";

export function CounselorList() {
  const { popView, pushView, setSelectedCounselorId } = useAppStore();

  const handleSelect = (id: string) => {
    setSelectedCounselorId(id);
    pushView("counseling-detail");
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="flex flex-col h-full bg-surface absolute inset-0 z-50 overflow-hidden"
    >
      <div className="pt-14 pb-2 px-4 bg-white sticky top-0 z-10 font-bold flex flex-col shadow-sm">
        <div className="flex items-center mb-4">
          <button
            onClick={popView}
            className="mr-3 p-2 rounded-full active:bg-gray-100 transition-colors"
          >
            <ArrowLeft size={24} className="text-gray-900" />
          </button>
          <h1 className="text-xl font-bold flex-1 text-gray-900">倾听与咨询</h1>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex space-x-3 pb-2">
          <div className="flex-1 bg-gray-50 border border-gray-100 rounded-full px-4 py-2.5 flex items-center text-gray-400">
            <Search size={18} className="mr-2" />
            <span className="text-sm">搜索咨询师 / 擅长领域</span>
          </div>
          <button className="w-11 h-11 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center text-gray-600 active:bg-gray-100 transition-colors">
            <SlidersHorizontal size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-12">
        {mockCounselors.map((counselor) => (
          <div
            key={counselor.id}
            onClick={() => handleSelect(counselor.id)}
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
                className="w-20 h-20 rounded-2xl object-cover shadow-sm border border-gray-100"
              />
              <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-sm">
                {counselor.status === "online" ? (
                  <div className="w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
                ) : counselor.status === "busy" ? (
                  <div className="w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white"></div>
                ) : (
                  <div className="w-3.5 h-3.5 bg-gray-300 rounded-full border-2 border-white"></div>
                )}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1 pt-1">
                <h3 className="font-bold text-[18px] text-gray-900 truncate">
                  {counselor.name}
                </h3>
              </div>

              <div className="flex items-center text-[12px] text-gray-500 mb-2">
                <span className="flex items-center text-[#F5A623] font-bold mr-2 bg-[#F5A623]/10 px-1.5 py-0.5 rounded">
                  <Star size={12} className="fill-current mr-1 text-[#F5A623]" />
                  {counselor.rating}
                </span>
                <span>{counselor.reviewsCount}次服务</span>
              </div>

              <p className="text-[13px] text-gray-600 line-clamp-1 mb-2 font-medium">
                {counselor.title}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {counselor.tags.slice(0, 3).map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-gray-50 text-gray-500 rounded-md text-[10px] font-medium border border-gray-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between mt-2 pt-3 border-t border-gray-50">
                <span className="text-[11px] text-gray-400">
                  最早可约：{counselor.schedules.find((s) => !s.isFull)?.label || "暂无排班"}{" "}
                  {counselor.schedules.find((s) => !s.isFull)?.times[0] || ""}
                </span>
                <div className="flex items-baseline text-primary">
                  <span className="text-[12px] font-bold mr-0.5">¥</span>
                  <span className="text-[18px] font-black tracking-tight leading-none">
                    {counselor.price}
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium ml-0.5">/次</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
