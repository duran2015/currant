import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAppStore } from "../../store";
import { mockCounselors } from "../../data";
import { Booking } from "./Booking";
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
    const { popView, pushView, selectedCounselorId, isSessionCounselorDetail, setIsSessionCounselorDetail, counselorStatus } = useAppStore();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const counselor =
    mockCounselors.find((c) => c.id === selectedCounselorId) ||
    mockCounselors[0];

  // Provide mock schedules if not exist so the UI is fully populated
  if (!counselor.schedules) {
    counselor.schedules = [
      {
        label: "今天",
        date: "06.24",
        isFull: false,
        times: ["14:00", "15:00", "16:00"],
      },
      {
        label: "明天",
        date: "06.25",
        isFull: false,
        times: ["10:00", "11:00", "14:00"],
      },
      {
        label: "周三",
        date: "06.26",
        isFull: true,
        times: [],
      },
    ];
  }

  const credentials = counselor.credentials || [
    "国家注册系统心理咨询师",
    "CBT 认知行为学派认证",
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
          onClick={() => {
            popView();
            if (isSessionCounselorDetail) {
              setTimeout(() => setIsSessionCounselorDetail(false), 300);
            }
          }}
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
              <div className={`absolute bottom-0 right-0 w-5 h-5 border-2 border-white rounded-full ${(counselor.id === 'c1' ? counselorStatus === 'active' : counselor.status === 'online') ? 'bg-green-500' : 'bg-gray-400'}`}></div>
            </div>

            <div className="flex-1 pt-2">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center mb-2">
                <span className="mr-1.5">{counselor.name}</span>
                <BadgeCheck size={20} className="text-primary mr-2" />
                <span className={`px-2 py-0.5 rounded text-[12px] font-normal ${(counselor.id === 'c1' ? counselorStatus === 'active' : counselor.status === 'online') ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-gray-50 text-gray-500 border border-gray-100'}`}>
                  {(counselor.id === 'c1' ? counselorStatus === 'active' : counselor.status === 'online') ? '在线' : '离线'}
                </span>
              </h2>

              <div className="flex items-center space-x-1.5 flex-wrap">
                {counselor.specialties?.slice(0, 1).map((spec, i) => (
                  <span key={`spec-${i}`} className="text-[11px] bg-blue-50 text-blue-600 border border-blue-100/50 px-2 py-0.5 rounded-md font-medium mb-1">
                    擅长: {spec}
                  </span>
                ))}
                {counselor.styles?.slice(0, 1).map((style, i) => (
                  <span key={`style-${i}`} className="text-[11px] bg-purple-50 text-purple-600 border border-purple-100/50 px-2 py-0.5 rounded-md font-medium mb-1">
                    风格: {style}
                  </span>
                ))}
                {counselor.credentials?.slice(0, 1).map((cred, i) => (
                  <span key={`cred-${i}`} className="text-[11px] bg-amber-50 text-amber-600 border border-amber-100/50 px-2 py-0.5 rounded-md font-medium mb-1">
                    资质: {cred}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="flex items-center justify-between mt-8 bg-surface rounded-2xl p-4 border border-gray-50">
            <div className="text-center flex-1 border-r border-gray-200 last:border-0">
              <p className="text-lg font-bold text-gray-900">
                {counselor.serviceHours || (counselor.type === "pro" ? 5000 : 1000)}+
              </p>
              <p className="text-[11px] text-gray-500 mt-1">服务时长(小时)</p>
            </div>
            <div className="text-center flex-1 border-r border-gray-200 last:border-0">
              <p className="text-lg font-bold text-gray-900">
                {counselor.consultationCount || counselor.reviewsCount}
              </p>
              <p className="text-[11px] text-gray-500 mt-1">累计服务人次</p>
            </div>
            <div className="text-center flex-1 border-r border-gray-200 last:border-0">
              <p className="text-lg font-bold text-gray-900">{counselor.type === "pro" ? "8年+" : "5年+"}</p>
              <p className="text-[11px] text-gray-500 mt-1">从业经验</p>
            </div>
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

        {/* Credentials & Specialties & Styles */}
        <div className="bg-white p-6 mb-3 shadow-sm">
          <h3 className="text-[15px] font-bold text-gray-900 mb-4 flex items-center">
            <ShieldCheck size={18} className="text-primary mr-2" />
            获得认知资质证书
          </h3>
          <div className="grid grid-cols-1 gap-3 mb-6">
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
          <div className="flex flex-wrap gap-2 mb-6">
            {counselor.specialties.map((spec, i) => (
              <div
                key={i}
                className="bg-surface rounded-xl px-3 py-1.5 flex items-center text-[13px] text-gray-700 font-medium border border-gray-50"
              >
                {spec}
              </div>
            ))}
          </div>

          <div className="h-px w-full bg-gray-50 mb-6"></div>

          <h3 className="text-[15px] font-bold text-gray-900 mb-4 flex items-center">
            <Quote size={18} className="text-primary mr-2" />
            咨询风格
          </h3>
          <div className="flex flex-wrap gap-2">
            {counselor.styles?.map((style, i) => (
              <div
                key={i}
                className="bg-purple-50 rounded-xl px-3 py-1.5 flex items-center text-[13px] text-purple-700 font-medium border border-purple-100/50"
              >
                {style}
              </div>
            ))}
          </div>
        </div>

        {/* Schedule Preview */}
        {!isSessionCounselorDetail && counselor.schedules && counselor.schedules.length > 0 && (
          <div className="bg-white p-6 mb-3 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[15px] font-bold text-gray-900 flex items-center">
                <CalendarCheck size={18} className="text-primary mr-2" />
                最近可约时间
              </h3>
              <button
                onClick={() => setIsBookingOpen(true)}
                className="text-[13px] text-primary font-medium flex items-center"
              >
                查看全部 <ArrowLeft size={14} className="rotate-180 ml-0.5" />
              </button>
            </div>
            <div className="flex space-x-3 overflow-x-auto pb-1 scrollbar-hide">
              {counselor.schedules
                .filter((s: any) => !s.isFull)
                .map((schedule: any, i: number) => (
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
        )}

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
      {!isSessionCounselorDetail && (
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-8 shadow-[0_-10px_40px_rgba(0,0,0,0.03)] z-20">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex flex-col ml-2">
              <span className="text-[11px] text-gray-500 font-medium tracking-wide mb-0.5">
                文字/语音/视频支持
              </span>
              <div className="flex items-end">
                <span className="text-sm font-bold text-primary mr-0.5 mb-0.5">
                  ¥
                </span>
                <span className="text-[24px] font-bold text-primary leading-none">
                  {counselor.price || 500}
                </span>
                <span className="text-[12px] text-gray-500 ml-1 mb-1">
                  /次
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsBookingOpen(true)}
              className="flex-1 bg-gray-900 text-white font-bold py-3.5 rounded-full flex items-center justify-center space-x-2 active:bg-gray-800 transition-colors shadow-md shadow-gray-900/10"
            >
              <Clock size={16} />
              <span className="text-[15px]">查看排期并预约</span>
            </button>
          </div>
        </div>
      )}

      <AnimatePresence>
        {isBookingOpen && <Booking onClose={() => setIsBookingOpen(false)} />}
      </AnimatePresence>
    </motion.div>
  );
}
