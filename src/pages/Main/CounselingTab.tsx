import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Filter, Star, Check } from "lucide-react";
import { useAppStore } from "../../store";
import { mockCounselors } from "../../data";

export function CounselingTab() {
  const { pushView, setSelectedCounselorId } = useAppStore();

  const [showSortMenu, setShowSortMenu] = useState(false);
  const [sortBy, setSortBy] = useState<
    "comprehensive" | "rating" | "experience" | "price"
  >("comprehensive");

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-full bg-[#f8f9fa] relative"
    >
      <div className="pt-14 pb-2 px-6 bg-white sticky top-0 z-20 flex flex-col shadow-[0_1px_10px_rgba(0,0,0,0.02)]">
        <h1 className="text-[22px] font-bold text-gray-900 mb-2">预约咨询</h1>
      </div>

      <div className="flex-1 overflow-y-auto w-full relative pb-20">
        <div className="pb-2 space-y-2 sticky top-0 bg-white/90 backdrop-blur-md z-10 box-border px-6 pt-2">
          <div className="flex items-center justify-between relative">
            <button
              onClick={() => setShowSortMenu(!showSortMenu)}
              className="flex items-center space-x-1 text-gray-600 text-[14px] font-medium bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm"
            >
              <Filter size={14} />
              <span>
                {sortBy === "comprehensive" && "综合推荐"}
                {sortBy === "rating" && "好评优先"}
                {sortBy === "experience" && "经验优先"}
                {sortBy === "price" && "价格最低"}
              </span>
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
                        className={`w-full text-left px-4 py-3 text-[14px] flex items-center justify-between transition-colors ${
                          sortBy === option.id
                            ? "text-primary font-bold bg-primary/5"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {option.label}
                        {sortBy === option.id && <Check size={16} />}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="px-4 py-2 space-y-4">
          {sortedAndFilteredCounselors.map((counselor) => (
            <motion.div
              key={counselor.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onClick={() => {
                setSelectedCounselorId(counselor.id);
                pushView("counseling-detail");
              }}
              className="bg-white rounded-[1.5rem] p-5 shadow-sm border border-gray-100 cursor-pointer active:scale-[0.98] transition-transform"
            >
              <div className="flex space-x-4 mb-4">
                <div className="relative shrink-0">
                  <img
                    src={counselor.avatar}
                    alt={counselor.name}
                    className="w-16 h-16 rounded-full object-cover shadow-sm"
                  />
                  {counselor.status === "online" && (
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-[18px] text-gray-900 truncate pr-2">
                      {counselor.name}
                    </h3>
                    <div className="flex items-center space-x-1 bg-orange-50 px-1.5 py-0.5 rounded text-orange-600 shrink-0">
                      <Star size={12} className="fill-current" />
                      <span className="text-[12px] font-bold">
                        {counselor.rating}
                      </span>
                    </div>
                  </div>
                  <p className="text-[13px] text-gray-500 mb-2 truncate">
                    {counselor.title}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {counselor.tags.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2 py-0.5 bg-gray-50 text-gray-600 rounded-md whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                <div className="text-[12px] text-gray-400">
                  已咨询 {counselor.reviewsCount} 人次
                </div>
                <div className="text-primary font-bold text-[16px]">
                  ¥{counselor.price}
                  <span className="text-[12px] text-gray-400 font-normal">
                    /次
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}