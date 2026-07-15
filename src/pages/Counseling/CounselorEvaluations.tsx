import { useState } from "react";
import { motion } from "motion/react";
import { useAppStore } from "../../store";
import { ChevronLeft, Star, ThumbsUp, HeartHandshake, Share2, ShieldAlert, EyeOff } from "lucide-react";

export function CounselorEvaluations() {
  const { popView } = useAppStore();

  const [evaluations] = useState([
    {
      id: "e1",
      userName: "小鹿用户3821",
      avatar: "https://ui-avatars.com/api/?name=U1&background=random",
      type: "文字咨询",
      rating: 5,
      content: "咨询师非常温柔耐心，在我最崩溃的时候接住了我的情绪。通过这次咨询，我厘清了很多之前想不通的问题，非常感谢！",
      time: "今天 15:30",
      tags: ["感觉被理解", "有帮助", "愿意推荐"],
      isPublic: true,
      status: "passed", // passed, pending, warning
    },
    {
      id: "e2",
      userName: "匿名用户",
      avatar: "https://ui-avatars.com/api/?name=U2&background=random",
      type: "语音咨询",
      rating: 5,
      content: "第一次做心理咨询，原本很紧张，但老师的声音让人很安心。虽然问题没有马上解决，但心里轻松多了。",
      time: "昨天 20:15",
      tags: ["感觉被理解", "有帮助"],
      isPublic: false,
      status: "passed",
    },
    {
      id: "e3",
      userName: "小鹿用户9920",
      avatar: "https://ui-avatars.com/api/?name=U3&background=random",
      type: "视频咨询",
      rating: 4,
      content: "整体还不错，咨询师指出了我一直回避的问题。不过时间稍微有点赶，最后总结的部分可以再详细一点。",
      time: "11-18 14:00",
      tags: ["有帮助", "愿意再次预约"],
      isPublic: true,
      status: "passed",
    }
  ]);

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="absolute inset-0 bg-[#f8f9fa] z-[80] flex flex-col"
    >
      {/* 1. 顶部标题 */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white sticky top-0 z-20 shadow-sm pt-14">
        <button
          onClick={popView}
          className="w-10 h-10 -ml-2 flex items-center justify-center active:bg-gray-50 rounded-full transition-colors"
        >
          <ChevronLeft size={24} className="text-gray-900" />
        </button>
        <span className="font-bold text-gray-900 text-[17px]">用户评价</span>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 overflow-y-auto w-full pb-8 p-4">
        
        {/* 2. 评价总览卡 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex flex-col items-center flex-1">
              <span className="text-[32px] font-bold text-gray-900 leading-none mb-1">4.9</span>
              <div className="flex text-orange-400 mb-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={12} fill="currentColor" />
                ))}
              </div>
              <span className="text-[11px] text-gray-500">综合评分</span>
            </div>
            <div className="w-[1px] h-12 bg-gray-100 mx-2"></div>
            <div className="flex flex-col items-center flex-1">
              <span className="text-[20px] font-bold text-gray-900 mb-1 mt-2">128<span className="text-[12px] font-medium ml-0.5">次</span></span>
              <span className="text-[11px] text-gray-500 mt-2">服务次数</span>
            </div>
            <div className="w-[1px] h-12 bg-gray-100 mx-2"></div>
            <div className="flex flex-col items-center flex-1">
              <span className="text-[20px] font-bold text-gray-900 mb-1 mt-2">98<span className="text-[12px] font-medium ml-0.5">%</span></span>
              <span className="text-[11px] text-gray-500 mt-2">好评率</span>
            </div>
            <div className="w-[1px] h-12 bg-gray-100 mx-2"></div>
            <div className="flex flex-col items-center flex-1">
              <span className="text-[20px] font-bold text-gray-900 mb-1 mt-2">36<span className="text-[12px] font-medium ml-0.5">%</span></span>
              <span className="text-[11px] text-gray-500 mt-2">复购率</span>
            </div>
          </div>

          {/* 3. 结构化反馈 (Tag 统计) */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="text-[12px] font-bold text-gray-700 mb-3">结构化反馈统计</h4>
            <div className="space-y-3">
              <div className="flex items-center text-[12px]">
                <HeartHandshake size={14} className="text-pink-500 mr-2 shrink-0" />
                <span className="text-gray-600 w-24 shrink-0">感觉被理解</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden mx-3">
                  <div className="h-full bg-pink-400 rounded-full" style={{ width: '95%' }}></div>
                </div>
                <span className="font-bold text-gray-900 w-8 text-right">95%</span>
              </div>
              <div className="flex items-center text-[12px]">
                <ThumbsUp size={14} className="text-blue-500 mr-2 shrink-0" />
                <span className="text-gray-600 w-24 shrink-0">觉得有帮助</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden mx-3">
                  <div className="h-full bg-blue-400 rounded-full" style={{ width: '92%' }}></div>
                </div>
                <span className="font-bold text-gray-900 w-8 text-right">92%</span>
              </div>
              <div className="flex items-center text-[12px]">
                <Star size={14} className="text-orange-500 mr-2 shrink-0" />
                <span className="text-gray-600 w-24 shrink-0">愿意再次预约</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden mx-3">
                  <div className="h-full bg-orange-400 rounded-full" style={{ width: '88%' }}></div>
                </div>
                <span className="font-bold text-gray-900 w-8 text-right">88%</span>
              </div>
              <div className="flex items-center text-[12px]">
                <Share2 size={14} className="text-green-500 mr-2 shrink-0" />
                <span className="text-gray-600 w-24 shrink-0">愿意推荐</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden mx-3">
                  <div className="h-full bg-green-400 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <span className="font-bold text-gray-900 w-8 text-right">85%</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. 评价列表 */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-bold text-gray-900 text-[15px]">近期评价</h3>
            <span className="text-[12px] text-gray-500">共 128 条</span>
          </div>

          {evaluations.map((review) => (
            <div key={review.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center">
                  <img src={review.avatar} alt="avatar" className="w-10 h-10 rounded-full bg-gray-100 object-cover mr-3 border border-gray-100" />
                  <div>
                    <h4 className="font-bold text-[14px] text-gray-900">{review.userName}</h4>
                    <div className="flex items-center mt-0.5">
                      <div className="flex text-orange-400 mr-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={10} fill={i < review.rating ? "currentColor" : "none"} className={i >= review.rating ? "text-gray-300" : ""} />
                        ))}
                      </div>
                      <span className="text-[10px] text-gray-400">{review.type} · {review.time}</span>
                    </div>
                  </div>
                </div>
                
                {/* 5. 平台质检状态 & 主页展示标签 */}
                <div className="flex flex-col items-end space-y-1.5">
                  {review.status === 'passed' && (
                    <span className="text-[10px] bg-green-50 text-green-600 px-1.5 py-0.5 rounded font-medium">质检通过</span>
                  )}
                  {review.isPublic && (
                    <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-medium border border-blue-100 flex items-center">
                      <Star size={8} className="mr-0.5" fill="currentColor" /> 可展示到主页
                    </span>
                  )}
                </div>
              </div>

              <p className="text-[14px] text-gray-800 leading-relaxed mb-3">
                {review.content}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {review.tags.map((tag, idx) => (
                  <span key={idx} className="text-[10px] bg-gray-50 text-gray-600 px-2 py-1 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex justify-end pt-3 border-t border-gray-50">
                <button className="flex items-center text-[11px] text-gray-400 hover:text-gray-600 transition-colors" onClick={() => alert("已提交隐藏申请，平台审核中")}>
                  <EyeOff size={12} className="mr-1" />
                  申请隐藏
                </button>
              </div>
            </div>
          ))}
        </div>

        {evaluations.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-gray-400">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Star size={24} className="text-gray-300" />
            </div>
            <p className="text-[14px] font-bold text-gray-700 mb-1">暂无评价</p>
            <p className="text-[12px] text-gray-400">完成服务后用户评价会显示在这里</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
