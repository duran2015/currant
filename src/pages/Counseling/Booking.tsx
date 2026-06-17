import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useAppStore } from "../../store";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { mockUser } from "../../data";
import { BookingOrder, AvailableSlot } from "../../types";

export function Booking() {
  const { popView, pushView, setBookingOrder } = useAppStore();

  // 模拟从后端获取的数据
  const [availableDates, setAvailableDates] = useState<string[]>([
    "2026-06-20",
    "2026-06-21",
    "2026-06-22",
  ]);
  const [selectedDate, setSelectedDate] = useState(availableDates[0]);
  const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [price, setPrice] = useState(99);
  const [isTrial, setIsTrial] = useState(false);

  // 模拟 GET /api/appointments/available-slots?date={selectedDate}
  useEffect(() => {
    const fetchAvailableSlots = () => {
      // 模拟后端根据 user_id 查询使用次数计算价格
      const usedTrialCount = mockUser.usedTrialCount || 0;
      const calculatedPrice = usedTrialCount < 2 ? 9.9 : 99;
      const calculatedIsTrial = usedTrialCount < 2;

      setPrice(calculatedPrice);
      setIsTrial(calculatedIsTrial);

      // 模拟返回的时段
      if (selectedDate === "2026-06-20") {
        setAvailableSlots([
          { time: "09:00", shift: "morning", available: true },
          { time: "10:30", shift: "morning", available: false },
          { time: "13:00", shift: "afternoon", available: true },
          { time: "14:15", shift: "afternoon", available: true },
          { time: "15:30", shift: "afternoon", available: false },
          { time: "16:45", shift: "afternoon", available: true },
          { time: "19:00", shift: "evening", available: true },
        ]);
      } else if (selectedDate === "2026-06-21") {
        setAvailableSlots([
          { time: "09:00", shift: "morning", available: false },
          { time: "10:30", shift: "morning", available: true },
          { time: "14:15", shift: "afternoon", available: true },
        ]);
      } else {
        setAvailableSlots([]);
      }
      setSelectedTime("");
    };

    fetchAvailableSlots();
  }, [selectedDate]);

  const handleConfirm = () => {
    if (!selectedTime) return;

    // 注意：MVP 阶段不需要选择具体咨询师，后端会自动分配。
    // 这里前端只负责将预约时间和价格传给支付页
    const newOrder: BookingOrder = {
      id: `ord_${Date.now()}`,
      counselorId: "auto-assigned", // 占位
      date: selectedDate,
      time: selectedTime,
      type: "video", // MVP 默认视频或由后端决定，这里仅作展示
      price: price,
      status: "pending",
    };

    setBookingOrder(newOrder);
    pushView("counseling-payment");
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="flex flex-col h-full bg-white absolute inset-0 z-50 overflow-hidden"
    >
      <div className="pt-14 pb-4 px-4 bg-white sticky top-0 z-10 flex items-center border-b border-gray-50">
        <button
          onClick={popView}
          className="mr-3 p-2 rounded-full active:bg-gray-100"
        >
          <ArrowLeft size={24} className="text-gray-900" />
        </button>
        <h1 className="text-[17px] font-bold flex-1 text-center pr-10 text-gray-900">
          选择预约时间
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto pb-32">
        <div className="p-5">
          <h2 className="text-[15px] font-bold mb-4 flex items-center text-gray-900">
            <span className="w-1 h-3.5 bg-primary rounded-full mr-2"></span>
            选择日期
          </h2>

          {/* Scrollable Date Strip */}
          <div className="flex space-x-3 overflow-x-auto pb-2 mb-6 scrollbar-hide -mx-5 px-5">
            {availableDates.map((date) => (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`flex-shrink-0 w-[5rem] py-3 rounded-2xl border-2 transition-colors flex flex-col items-center justify-center ${
                  selectedDate === date
                    ? "border-gray-900 bg-gray-900 text-white shadow-md"
                    : "border-gray-100 bg-white text-gray-600 hover:border-gray-200"
                }`}
              >
                <span
                  className={`text-[15px] font-bold tracking-tighter`}
                >
                  {date.slice(5)}
                </span>
              </button>
            ))}
          </div>

          <h2 className="text-[15px] font-bold mb-4 flex items-center text-gray-900">
            <span className="w-1 h-3.5 bg-primary rounded-full mr-2"></span>
            选择时段
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {availableSlots.map((slot) => (
              <button
                key={`${slot.shift}-${slot.time}`}
                onClick={() => slot.available && setSelectedTime(slot.time)}
                disabled={!slot.available}
                className={`py-4 px-4 rounded-[1.5rem] border-2 transition-transform flex items-center justify-between ${
                  selectedTime === slot.time
                    ? "border-primary bg-primary-light/50 text-primary font-bold shadow-sm"
                    : !slot.available
                      ? "border-transparent bg-gray-50 text-gray-400 opacity-60 cursor-not-allowed"
                      : "border-gray-100 text-gray-700 bg-white hover:border-gray-200 font-medium active:scale-[0.98]"
                }`}
              >
                <span className={`text-[17px] tracking-tight ${!slot.available ? "line-through" : ""}`}>{slot.time}</span>
                {selectedTime === slot.time && (
                  <CheckCircle2 size={20} className="text-primary fall-in" />
                )}
                {!slot.available && (
                   <span className="text-[10px] text-gray-400 font-bold">已满</span>
                )}
              </button>
            ))}
            {availableSlots.length === 0 && (
              <div className="col-span-2 py-8 text-center text-gray-400 text-sm bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                该日期暂无可约时间
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5 bg-white border-t border-gray-100 shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
        <div className="flex justify-between items-end mb-4 px-1">
          <div>
            <span className="text-[13px] text-gray-500 font-medium">
              合计金额
            </span>
            <div className="text-gray-400 text-[11px] mt-0.5">
              1对1 心理咨询 50分钟
            </div>
          </div>
          <div className="flex flex-col items-end">
             {isTrial && (
                <span className="text-[10px] text-primary bg-primary-light/30 px-1.5 py-0.5 rounded font-bold mb-1">
                  新用户体验价
                </span>
             )}
            <div className="flex items-end">
              <span className="text-sm font-bold text-gray-900 mr-0.5">¥</span>
              <span className="text-[26px] font-bold text-gray-900 leading-none">
                {price}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={handleConfirm}
          disabled={!selectedTime}
          className={`w-full font-bold py-4 rounded-full transition-all flex justify-center items-center shadow-md ${
            selectedTime
              ? "bg-gray-900 text-white active:bg-gray-800 shadow-gray-900/20"
              : "bg-gray-100 text-gray-400 shadow-none"
          }`}
        >
          {selectedTime ? "确认预约，去支付" : "请先选择时间"}
        </button>
      </div>
    </motion.div>
  );
}
