import { motion } from "motion/react";
import { useAppStore } from "../../store";
import { mockCounselors } from "../../data";
import {
  ArrowLeft,
  Star,
  Clock,
  ShieldCheck,
  BadgeCheck,
  FileText,
  CalendarCheck,
  Quote,
} from "lucide-react";

export function CounselorDetail() {
  const { popView, pushView, selectedCounselorId } = useAppStore();
  const counselor =
    mockCounselors.find((c) => c.id === selectedCounselorId) ||
    mockCounselors[0];

  const credentials = [
    "国家注册系统心理咨询师",
    "CBT 认知行为学派认证",
    "8年+ 临床咨询经验",
    "心理学硕士",
  ];

  const reviews = [
    {
      id: 1,
      text: "老师很温柔，一团乱麻的情绪被一点点理清了，感觉自己又有了面对生活的力量。",
      tag: "温柔耐心",
      date: "2天前",
    },
    {
      id: 2,
      text: "很专业，能一针见血地指出我一直逃避的核心问题，虽然过程有些戳心，但对我帮助特别大。",
      tag: "专业见解深",
      date: "1周前",
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
      <div className="pt-14 pb-4 px-4 bg-white sticky top-0 z-20 flex items-center shadow-sm">
        <button
          onClick={popView}
          className="mr-3 p-2 rounded-full active:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={24} className="text-gray-900" />
        </button>
        <h1 className="text-[17px] font-bold flex-1 text-gray-900">
          咨询师主页
        </h1>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 overflow-y-auto pb-32">
        {/* Header Profile - Trust Building */}
        <div className="bg-white px-6 pt-6 pb-8 mb-3 shadow-sm relative">
          <div className="flex items-start space-x-5">
            <div className="relative shrink-0">
              <img
                src={counselor.avatar}
                alt={counselor.name}
                className="w-24 h-24 rounded-[2rem] border border-gray-100 shadow-sm object-cover"
              />
              <div className="absolute -bottom-2 -right-2 bg-green-500 border-2 border-white w-6 h-6 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>

            <div className="flex-1 pt-2">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-1.5 mb-1">
                <span>{counselor.name}</span>
                <BadgeCheck size={20} className="text-primary" />
              </h2>
              <div className="text-[13px] font-medium text-gray-500 mb-3 line-clamp-1">
                {counselor.title}
              </div>

              <div className="flex items-center space-x-1 flex-wrap">
                {counselor.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] bg-primary/5 text-primary border border-primary/10 px-2 py-0.5 rounded-md font-medium mb-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="flex items-center justify-between mt-8 bg-surface rounded-2xl p-4 border border-gray-50">
            <div className="text-center flex-1 border-r border-gray-200 last:border-0">
              <p className="text-lg font-bold text-gray-900 flex items-center justify-center">
                {counselor.rating}
                <Star
                  size={14}
                  className="text-yellow-500 fill-yellow-500 ml-1"
                />
              </p>
              <p className="text-[11px] text-gray-500 mt-1">综合评分</p>
            </div>
            <div className="text-center flex-1 border-r border-gray-200 last:border-0">
              <p className="text-lg font-bold text-gray-900">
                {counselor.reviewsCount}
              </p>
              <p className="text-[11px] text-gray-500 mt-1">服务人次</p>
            </div>
            <div className="text-center flex-1 border-r border-gray-200 last:border-0">
              <p className="text-lg font-bold text-gray-900">8年+</p>
              <p className="text-[11px] text-gray-500 mt-1">从业经验</p>
            </div>
          </div>
        </div>

        {/* Consultation Methods */}
        <div className="bg-white p-6 mb-3 shadow-sm">
          <h3 className="text-[15px] font-bold text-gray-900 mb-4 flex items-center">
            <BadgeCheck size={18} className="text-primary mr-2" />
            支持的咨询方式
          </h3>
          <div className="space-y-3">
            <div className="border border-primary/20 bg-primary/5 rounded-2xl p-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-bl-full pointer-events-none" />
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-bold text-[14px] text-gray-900 flex items-center">
                  <span className="text-primary mr-1.5">💬</span> 文字沟通
                </h4>
                <span className="text-primary font-bold text-[14px]">
                  ¥{counselor.price * 0.7}/次
                </span>
              </div>
              <p className="text-[12px] text-gray-600 mb-2 leading-relaxed">
                异步或轻量级同步回复，适合不方便接听电话，或需要打字来梳理思绪的阶段。
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] bg-white text-gray-500 border border-gray-100 px-2 py-0.5 rounded">
                  陪伴感强
                </span>
                <span className="text-[10px] bg-white text-gray-500 border border-gray-100 px-2 py-0.5 rounded">
                  随时留言
                </span>
              </div>
            </div>

            <div className="border border-gray-100 bg-surface rounded-2xl p-4">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-bold text-[14px] text-gray-900 flex items-center">
                  <span className="text-blue-500 mr-1.5">🎙️</span> 视频/语音沟通
                </h4>
                <span className="text-gray-900 font-bold text-[14px]">
                  ¥{counselor.price}/50分钟
                </span>
              </div>
              <p className="text-[12px] text-gray-500 mb-2 leading-relaxed">
                传统的 50
                分钟单次深度咨询，适合需要系统性梳理问题、深层挖掘潜意识的阶段。
              </p>
            </div>
          </div>
        </div>

        {/* Schedule Preview */}
        <div className="bg-white p-6 mb-3 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[15px] font-bold text-gray-900 flex items-center">
              <CalendarCheck size={18} className="text-primary mr-2" />
              最近可约时间
            </h3>
            <button
              onClick={() => pushView("counseling-booking")}
              className="text-[13px] text-primary font-medium flex items-center"
            >
              查看全部 <ArrowLeft size={14} className="rotate-180 ml-0.5" />
            </button>
          </div>
          <div className="flex space-x-3 overflow-x-auto pb-1 scrollbar-hide">
            {counselor.schedules
              .filter((s) => !s.isFull)
              .map((schedule, i) => (
                <div
                  key={i}
                  className="shrink-0 w-24 border border-gray-100 rounded-2xl p-3 text-center bg-surface"
                >
                  <div className="text-[11px] text-gray-500 mb-1">
                    {schedule.label}
                  </div>
                  <div className="font-bold text-gray-900">{schedule.date}</div>
                  <div className="text-[11px] text-primary font-medium mt-1.5">
                    {schedule.times.length}个时段
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Credentials & Specialties */}
        <div className="bg-white p-6 mb-3 shadow-sm">
          <h3 className="text-[15px] font-bold text-gray-900 mb-4 flex items-center">
            <ShieldCheck size={18} className="text-primary mr-2" />
            认证资质
          </h3>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {credentials.map((cred, i) => (
              <div key={i} className="flex items-start space-x-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0"></div>
                <span className="text-[13px] text-gray-600 leading-snug">
                  {cred}
                </span>
              </div>
            ))}
          </div>

          <div className="h-px w-full bg-gray-50 mb-6"></div>

          <h3 className="text-[15px] font-bold text-gray-900 mb-4 flex items-center">
            <Star size={18} className="text-primary mr-2" />
            擅长领域
          </h3>
          <div className="space-y-3">
            {counselor.specialties.map((spec, i) => (
              <div
                key={i}
                className="bg-surface rounded-xl p-3 flex items-center text-[14px] text-gray-700 font-medium border border-gray-50"
              >
                {spec}
              </div>
            ))}
          </div>
        </div>

        {/* About */}
        <div className="bg-white p-6 mb-3 shadow-sm">
          <h3 className="text-[15px] font-bold text-gray-900 mb-4 flex items-center">
            <FileText size={18} className="text-primary mr-2" />
            咨询师介绍
          </h3>
          <p className="text-[14px] text-gray-600 leading-loose tracking-wide">
            {counselor.about}
          </p>
        </div>

        {/* User Reviews */}
        <div className="bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-[15px] font-bold text-gray-900 flex items-center">
              <Quote size={18} className="text-primary mr-2" />
              来访者评价
            </h3>
            <span className="text-[12px] text-gray-400">
              共 {counselor.reviewsCount} 条评价
            </span>
          </div>

          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="border-b border-gray-50 pb-4 last:border-0 last:pb-0"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-[10px] text-gray-400 mr-2">
                      匿
                    </div>
                    <span className="text-[12px] text-gray-500">匿名用户</span>
                  </div>
                  <span className="text-[11px] text-gray-400">
                    {review.date}
                  </span>
                </div>
                <p className="text-[13px] text-gray-700 leading-relaxed mb-2">
                  {review.text}
                </p>
                <div className="bg-surface inline-block px-2 py-1 rounded text-[10px] text-gray-500">
                  Ta 认为咨询师：{review.tag}
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-4 py-3 bg-surface rounded-xl text-[13px] text-gray-600 font-medium active:bg-gray-100 transition-colors">
            查看更多评价
          </button>
        </div>
      </div>

      {/* Sticky Bottom Booking Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-8 shadow-[0_-10px_40px_rgba(0,0,0,0.03)] z-20">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center text-xs text-gray-500 bg-surface px-3 py-1.5 rounded-full absolute -top-10 left-1/2 -translate-x-1/2 border border-gray-100 shadow-sm whitespace-nowrap">
            <ShieldCheck size={14} className="text-green-500 mr-1" />
            首次不满意可申请退款
          </div>

          <div className="flex flex-col ml-2">
            <span className="text-[11px] text-gray-500 font-medium tracking-wide mb-0.5">
              文字/语音/视频支持
            </span>
            <div className="flex items-end">
              <span className="text-[11px] text-gray-500 mr-1 mb-1">
                起步价
              </span>
              <span className="text-sm font-bold text-primary mr-0.5 mb-0.5">
                ¥
              </span>
              <span className="text-[24px] font-bold text-primary leading-none">
                {counselor.price * 0.7}
              </span>
              <span className="text-[11px] text-gray-400 ml-1 mb-1 line-through">
                ¥{counselor.price + 200}
              </span>
            </div>
          </div>
          <button
            onClick={() => pushView("counseling-booking")}
            className="flex-1 bg-gray-900 text-white font-bold py-3.5 rounded-full flex items-center justify-center space-x-2 active:bg-gray-800 transition-colors shadow-md shadow-gray-900/10"
          >
            <Clock size={16} />
            <span className="text-[15px]">查看排期并预约</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
