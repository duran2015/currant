import { useState } from "react";
import { motion } from "motion/react";
import { useAppStore } from "../../store";
import { ArrowLeft, Star } from "lucide-react";
import { mockCounselors } from "../../data";

export function UserEvaluation() {
  const { popView, bookingOrder, updateOrder } = useAppStore();
  const [rating, setRating] = useState(5);
  const [tags, setTags] = useState<string[]>([]);
  const [comment, setComment] = useState("");

  const availableTags = ["温柔耐心", "专业见解深", "认知行为学派", "倾听者", "一针见血"];

  if (!bookingOrder) return null;

  const counselor = mockCounselors.find((c) => c.id === bookingOrder.counselorId);

  const toggleTag = (tag: string) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = () => {
    updateOrder(bookingOrder.id, { isEvaluated: true });
    alert("评价提交成功，感谢您的反馈！");
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
        <span className="font-bold text-gray-900 text-[16px]">评价咨询师</span>
        <div className="w-8"></div>
      </div>

      <div className="flex-1 overflow-y-auto w-full pb-32 p-4">
        <div className="bg-white rounded-[1.25rem] p-6 shadow-sm border border-gray-100 mb-4 text-center">
          <img
            src={counselor?.avatar}
            alt=""
            className="w-16 h-16 rounded-full object-cover shadow-sm mx-auto mb-3"
          />
          <h3 className="font-bold text-gray-900 text-[16px] mb-1">
            {counselor?.name}
          </h3>
          <p className="text-[12px] text-gray-500 mb-6">本次咨询已结束，请为咨询师打分</p>

          <div className="flex justify-center space-x-3 mb-8">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="focus:outline-none transition-transform active:scale-90"
              >
                <Star
                  size={32}
                  className={`${
                    star <= rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-200"
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="text-left mb-4">
            <p className="font-bold text-[14px] text-gray-800 mb-3">
              选择符合的标签
            </p>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1.5 rounded-full text-[12px] font-medium border transition-colors ${
                    tags.includes(tag)
                      ? "bg-primary/10 border-primary/30 text-primary"
                      : "bg-gray-50 border-gray-100 text-gray-600"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="text-left">
            <p className="font-bold text-[14px] text-gray-800 mb-3">
              补充想说的话
            </p>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="您的评价对我们非常重要..."
              className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-[14px] h-28 resize-none focus:outline-none focus:ring-1 focus:ring-primary/30"
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5 bg-white border-t border-gray-100 shadow-[0_-10px_40px_rgba(0,0,0,0.03)] z-20">
        <button
          onClick={handleSubmit}
          className="w-full bg-gray-900 text-white font-bold py-4 rounded-full active:bg-gray-800 transition-colors shadow-md shadow-gray-900/10"
        >
          提交评价
        </button>
      </div>
    </motion.div>
  );
}
