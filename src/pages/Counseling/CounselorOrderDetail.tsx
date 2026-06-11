import { motion } from "motion/react";
import { useAppStore } from "../../store";
import { ArrowLeft, Clock, MessageSquare, AlertTriangle, Check, X, User2, BookOpen } from "lucide-react";

export function CounselorOrderDetail() {
  const { popView } = useAppStore();

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed inset-0 bg-white z-[60] flex flex-col"
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white sticky top-0 z-10">
        <button
          onClick={popView}
          className="w-10 h-10 flex items-center justify-center active:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft size={24} className="text-gray-900" />
        </button>
        <span className="font-bold text-gray-900 text-lg">派单详情</span>
        <div className="w-10 inline-flex items-center justify-center text-[18px] font-bold text-primary"></div>
      </div>

      <div className="flex-1 overflow-y-auto w-full bg-[#f8f9fa] pb-24">
         <div className="bg-white p-6 pb-8 border-b border-gray-100 shadow-sm relative">
           <div className="absolute top-4 right-4 bg-orange-50 text-orange-600 text-[11px] font-bold px-2 py-1 rounded">
             等待接单 (还剩 4:59)
           </div>
           <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center text-indigo-500 border border-indigo-50">
                 <User2 size={24} />
              </div>
              <div>
                 <h2 className="text-2xl font-bold text-gray-900">匿名用户 0495</h2>
                 <p className="text-[13px] text-gray-500 mt-1">21岁 · 大学生</p>
              </div>
           </div>

           <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                 <div className="text-[12px] text-gray-500 mb-1 flex items-center"><MessageSquare size={14} className="mr-1" /> 服务项目</div>
                 <div className="text-[15px] font-bold text-gray-900">文字倾听 (30分钟)</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                 <div className="text-[12px] text-gray-500 mb-1 flex items-center"><Clock size={14} className="mr-1" /> 期望时间</div>
                 <div className="text-[15px] font-bold text-gray-900">现在马上</div>
              </div>
           </div>
         </div>

         <div className="p-6">
            <h3 className="font-bold text-[16px] text-gray-900 mb-3 flex items-center">
              <AlertTriangle className="mr-2 text-primary" size={18} /> 主诉标签与 AI 画像摘要
            </h3>
            
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-red-50 text-red-500 px-3 py-1.5 rounded-md text-[13px] font-medium border border-red-100">高敏焦虑</span>
                <span className="bg-orange-50 text-orange-600 px-3 py-1.5 rounded-md text-[13px] font-medium border border-orange-100">考研压力</span>
                <span className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-md text-[13px] font-medium border border-blue-100">失眠持续1周</span>
              </div>
              
              <div className="space-y-3">
                 <div className="pt-3 border-t border-gray-50">
                    <div className="text-[12px] font-bold text-gray-400 mb-1">AI 情绪风险初判</div>
                    <p className="text-[14px] text-gray-800 leading-relaxed font-medium">
                      用户与 AI 对话时表现出较高的焦虑感，提及“考研复习进度落后”、“每天晚上愁得睡不着想哭”。目前判定处于中度压力状态，无自伤自杀风险倾向。
                    </p>
                 </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
               <div className="flex items-center text-[14px] font-bold text-gray-900">
                 <BookOpen size={18} className="mr-2 text-indigo-500" /> 用户过往接待记录
               </div>
               <span className="text-[12px] text-gray-400">无 (这是用户第一次使用)</span>
            </div>
         </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white p-4 pb-8 border-t border-gray-100 shadow-[0_-10px_20px_rgba(0,0,0,0.02)] flex space-x-3">
         <button className="flex-1 bg-surface text-gray-600 font-bold py-4 rounded-xl text-[15px] flex justify-center items-center active:scale-95 transition-transform">
            <X size={18} className="mr-1.5" /> 无法接单
         </button>
         <button 
           onClick={() => popView()}
           className="flex-1 bg-gray-900 text-white font-bold py-4 rounded-xl text-[15px] shadow-lg flex justify-center items-center active:scale-95 transition-transform"
         >
            <Check size={18} className="mr-1.5" /> 确认接单 (¥69)
         </button>
      </div>
    </motion.div>
  );
}
