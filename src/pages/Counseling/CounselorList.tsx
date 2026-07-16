import { motion } from "motion/react";
import { ChevronLeft, Star } from "lucide-react";
import { useAppStore } from "../../store";
import { mockCounselors } from "../../data";

export function CounselorList() {
  const { popView, pushView, setSelectedCounselorId } = useAppStore();

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="absolute inset-0 bg-[#f8f9fa] z-50 flex flex-col"
    >
      <div className="pt-12 pb-3 px-4 bg-white sticky top-0 z-20 flex items-center shadow-sm">
        <button onClick={() => popView()} className="p-2 -ml-2 text-gray-500 hover:text-gray-900 transition-colors">
          <ChevronLeft size={24} />
        </button>
        <div className="flex-1 text-center font-bold text-[16px] text-gray-900 pr-8">
          选择咨询师
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-24">
        <div className="space-y-4">
          {mockCounselors.map(c => (
            <div key={c.id} className="bg-white rounded-[1.5rem] p-4 border border-gray-100 shadow-sm">
              <div className="flex items-start mb-3">
                <img src={c.avatar} alt={c.name} className="w-[60px] h-[60px] rounded-[1rem] object-cover mr-3 bg-gray-100" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-[16px] text-gray-900 flex items-center">
                      {c.name}
                      <span className="ml-2 text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded border border-blue-100/50">
                        {c.title}
                      </span>
                    </h4>
                    <div className="text-[13px] font-bold text-orange-500 flex items-center">
                      <Star size={14} className="fill-current mr-0.5" /> {c.rating}
                    </div>
                  </div>
                  <div className="text-[11px] text-gray-500 mt-1.5 flex items-center space-x-2">
                    <span>从业 {c.type === 'pro' ? '6' : '3'}年</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span>服务 {c.consultationCount || 128}次</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span>好评 {c.rating >= 4.9 ? '98%' : '95%'}</span>
                  </div>
                  <div className="text-[12px] text-gray-600 mt-2 line-clamp-1">
                    擅长：{c.specialties.join("、")}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="text-[12px] font-medium text-gray-500 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>
                  最近可约：今天 19:00
                </div>
                <div className="text-[15px] font-black text-primary">
                  <span className="text-[11px] font-bold mr-0.5">¥</span>{c.price}<span className="text-[10px] text-gray-400 font-normal ml-0.5">起</span>
                </div>
              </div>

              <div className="flex space-x-3 mt-4 pt-4 border-t border-gray-50">
                <button 
                  onClick={() => {
                    setSelectedCounselorId(c.id);
                    pushView("counseling-detail");
                  }}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-bold text-[13px] active:bg-gray-50 transition-colors"
                >
                  查看主页
                </button>
                <button 
                  onClick={() => {
                    setSelectedCounselorId(c.id);
                    pushView("counseling-booking");
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-gray-900 text-white font-bold text-[13px] active:scale-95 transition-transform"
                >
                  立即预约
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
